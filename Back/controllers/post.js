// Importation des modules / package
const { PrismaClient, prisma } = require("@prisma/client")

// Importation du schéma via prismaclient
const { post } = new PrismaClient()
const { message } = new PrismaClient()

// Lecture de l'ensemble des posts
exports.getAllPost = async (req, res) => {
    const posts = await post.findMany()
    res.json(posts)
}

// Lecture d'un post avec ces message
exports.getOnePost = async (req, res, next) => {
    const onePost = await post.findUnique({
        where: {
            id: parseInt(req.params.id)
        }
    })
    res.json(onePost)
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
    res.json(postcreated)
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
    res.json(postModified)
}

// Suppression d'un post
exports.deletePost = async (req, res) => {
    const postDeleted = await post.delete({
        where: {
            id: parseInt(req.params.id)
        }
    })
    res.json(postDeleted)
}