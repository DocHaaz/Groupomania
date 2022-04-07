const { PrismaClient, prisma } = require("@prisma/client")

const { message } = new PrismaClient()

//router.get('/:id', auth, messageController.getOneMessage);
exports.getOneMessage = async (req, res, next) => {
    const oneMessage = await message.findUnique({
        where: {
            id: parseInt(req.params.id)
        }
    })
    res.json(oneMessage)
}

//router.post('/', auth, messageController.createMessage);
exports.createMessage = async (req, res) => {
    const { userid, message, post_id } = req.body
    const postcreated = await message.create({
        data: {
            userid: parseInt(userid),
            message,
            post_id: parseInt(post_id)
        }
    })
    res.json(postcreated)
}

//router.put('/:id', auth, messageController.modifyMessage)
exports.modifyMessage = async (req, res) => {
    const message = req.body.message
    const messageModified = await message.update({
        where: {
            id: parseInt(req.params.id)
        },
        data: {
            message
        }
    })
    res.json(messageModified)
}

//router.delete('/:id', auth, messageController.deleteMessage)
exports.deleteMessage = async (req, res) => {
    const messageDeleted = await message.delete({
        where: {
            id: parseInt(req.params.id)
        }
    })
    res.json(messageDeleted)
}