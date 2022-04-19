// Variables d'environnement
require('dotenv').config();

// Importation des modules
const jsonWebToken = require('jsonwebtoken');
const { PrismaClient, prisma } = require("@prisma/client")

const { post } = new PrismaClient()

// Gestion de propriété de post
module.exports = async (req, res, next) => {
    const getId = await post.findUnique({
        where: {
            id: parseInt(req.params.id)
        },
    })
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jsonWebToken.verify(token, process.env.TokenSecret);
    const userAdmin = decodedToken.userAdmin;
    const userId = decodedToken.userId;
    if(userAdmin === false) {
        if(userId && userId != getId.userid) {
            return res.status(403).json({ message: 'Requête non authorisée'})
        } else {
            next()
        }
    } else if(userAdmin === true) {
        next()
    }
}