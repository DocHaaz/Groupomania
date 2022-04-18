// Importation des modules / package
const { PrismaClient, prisma } = require("@prisma/client")

// Importation du schéma via prismaclient
const { post } = new PrismaClient()

// Lecture de l'ensemble des posts
exports.getAllPost = async (req, res) => {
    const posts = await post.findMany()
    return res.status(200).json(posts)
}

// Lecture d'un post
exports.getOnePost = async (req, res) => {
    const onePost = await post.findUnique({
        where: {
            id: parseInt(req.params.id)
        },
        include: {
            messages: true
        }
    })
    console.log(onePost)
    return res.status(200).json(onePost)
}

// Création d'un post
exports.createPost = async (req, res) => {
    const { userid, post_title, post_text } = req.body
    const postcreated = await post.create({
        data: {
            userid: parseInt(userid),
            post_title,
            post_text
        }
    })
    return res.status(200).json(postcreated)
}

// Modification d'un post
exports.modifyPost = async (req, res) => {
    const post_text = req.body.post_text
    const postModified = await post.update({
        where: {
            id: parseInt(req.params.id)
        },
        data: {
            post_text
        }
    })
    return res.status(200).json(postModified)
}

// Suppression d'un post
exports.deletePost = async (req, res) => {
    const postDeleted = await post.delete({
        where: {
            id: parseInt(req.params.id)
        }
    })
    return res.status(200).json(postDeleted)
}