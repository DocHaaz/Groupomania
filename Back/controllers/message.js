const { PrismaClient, prisma } = require("@prisma/client")

const { message } = new PrismaClient()

// Lecture d'un message
exports.getMessage = async (req, res) => {
    const oneMessage = await message.findMany({
        where: {
            post_id: parseInt(req.params.id)
        },
        select: {
            id: true,
            userid: true,
            message_text: true,
            created_at: true,
            post_id: true,
            user: {
                select: {
                    lastname: true,
                    firstname: true
                }
            }
        },
    })
    if (oneMessage) {
        return res.status(200).json(oneMessage)
    } else {
        return res.status(400).json({ message: 'Aucun message trouver' })
    }
}

// Création d'un message
exports.createMessage = async (req, res) => {
    if(req.body.userid == '' || !req.body.userid || req.body.message_text == '' || !req.body.message_text || req.body.post_id == '' || !req.body.post_id) {
        return res.status(400).json({ error: 'Veuillez remplir tout les champs de saisis' })
    } else {
        const { userid, message_text, post_id } = req.body
        const messagecreated = await message.create({
            data: {
                userid: parseInt(userid),
                message_text,
                post_id: parseInt(post_id)
            }
        })
        return res.status(200).json(messagecreated)
    }
}

// Modification d'un message
exports.modifyMessage = async (req, res) => {
    console.log(req.body)
    if(req.body.message_text == '' || !req.body.message_text) {
        return res.status(400).json({ error: 'Veuillez remplir tout les champs de saisis' })
    } else {
        const message_text = req.body.message_text
        const messageModified = await message.update({
            where: {
                id: parseInt(req.params.id)
            },
            data: {
                message_text
            }
        })
        return res.status(200).json(messageModified)
    }
}

// Suppression d'un message
exports.deleteMessage = async (req, res) => {
    if(req.params.id) {
        const messageDeleted = await message.delete({
            where: {
                id: parseInt(req.params.id)
            }
        })
        return res.status(200).json(messageDeleted)
    } else {
        return res.status(403).json({ message: 'Refus de traitement de la requête' })
    }
}