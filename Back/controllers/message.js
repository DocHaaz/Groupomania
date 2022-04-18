const { PrismaClient, prisma } = require("@prisma/client")

const { message } = new PrismaClient()

// Lecture d'un message
exports.getOneMessage = async (req, res) => {
    const oneMessage = await message.findMany({
        where: {
            post_id: parseInt(req.params.id)
        }
    })
    return res.status(200).json(oneMessage)
}

// Création d'un message
exports.createMessage = async (req, res) => {
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

// Modification d'un message
exports.modifyMessage = async (req, res) => {
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

// Suppression d'un message
exports.deleteMessage = async (req, res) => {
    const messageDeleted = await message.delete({
        where: {
            id: parseInt(req.params.id)
        }
    })
    return res.status(200).json(messageDeleted)
}