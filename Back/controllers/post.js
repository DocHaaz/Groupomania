// Importation des modules / package
const { PrismaClient, prisma } = require("@prisma/client")

// Importation du schéma via prismaclient
const { post } = new PrismaClient()

// Lecture de l'ensemble des posts
exports.getAllPost = async (req, res) => {
    const posts = await post.findMany( {
        select: {
            id: true,
            userid: true,
            post_title: true,
            post_text: true,
            created_at: true,
            user: {
                select: {
                    lastname: true,
                    firstname: true
                }
            }
        },
    })
    if(posts) {
        return res.status(200).json(posts)     
    } else {
        return res.status(400).json({ message: 'Aucun post trouver' })
    }
}

// Lecture d'un post
exports.getOnePost = async (req, res) => {
    const onePost = await post.findUnique({
        where: {
            id: parseInt(req.params.id)
        },
        select: {
            id: true,
            userid: true,
            post_title: true,
            post_text: true,
            created_at: true,
            user: {
                select: {
                    lastname: true,
                    firstname: true
                }
            }
        },
    })
    if(onePost) {
        return res.status(200).json(onePost)     
    } else {
        return res.status(400).json({ message: 'Aucun post trouver' })
    }
}

// Création d'un post
exports.createPost = async (req, res) => {
    if(req.body.userid == '' || !req.body.userid || req.body.post_title == '' || !req.body.post_title || req.body.post_text == '' || !req.body.post_text) {
        return res.status(400).json({ error: 'Veuillez remplir tout les champs de saisis' })
    } else {
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
}

// Modification d'un post
exports.modifyPost = async (req, res) => {
    if(req.body.post_title == '' || !req.body.post_title || req.body.post_text == '' || !req.body.post_text) {
        return res.status(400).json({ error: 'Veuillez remplir tout les champs de saisis' })
    } else {
        const { post_title, post_text } = req.body
        const postModified = await post.update({
            where: {
                id: parseInt(req.params.id)
            },
            data: {
                post_title,
                post_text
            }
        })
        return res.status(200).json(postModified)
    }
}

// Suppression d'un post
exports.deletePost = async (req, res) => {
    if(req.params.id) {
        const postDeleted = await post.delete({
            where: {
                id: parseInt(req.params.id)
            }
        })
        return res.status(200).json(postDeleted)
    } else {
        return res.status(403).json({ message: 'Refus de traitement de la requête' })
    }
}