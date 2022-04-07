const { PrismaClient, prisma } = require("@prisma/client")

const { post } = new PrismaClient()
const { message } = new PrismaClient()

//router.get('/', auth, postController.getAllPost);
exports.getAllPost = async (req, res) => {
    const posts = await post.findMany()
    res.json(posts)
}

//router.get('/:id', auth, postController.getOnePost);
exports.getOnePost = async (req, res, next) => {
    const onePost = await post.findUnique({
        where: {
            id: parseInt(req.params.id)
        }
    })
    const messagePost = await message.findMany({
        where: {
            post_id: parseInt(req.params.id)
        }
    })
    const allData = {
        post: onePost,
        messages: messagePost
    }
    res.json(allData)
}

//router.post('/', auth, postController.createPost);
exports.createPost = async (req, res) => {
    const { userid, message } = req.body
    const postcreated = await post.create({
        data: {
            userid: parseInt(userid),
            message
        }
    })
    res.json(postcreated)
}

//router.put('/:id', auth, postController.modifyPost)
exports.modifyPost = async (req, res) => {
    const message = req.body.message
    const postModified = await post.update({
        where: {
            id: parseInt(req.params.id)
        },
        data: {
            message
        }
    })
    res.json(postModified)
}

//router.delete('/:id, auth, postController.deletePost)
exports.deletePost = async (req, res) => {
    const postDeleted = await post.delete({
        where: {
            id: parseInt(req.params.id)
        }
    })
    res.json(postDeleted)
}