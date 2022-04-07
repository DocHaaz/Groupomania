// Variables d'environnement
require('dotenv').config();

// Importation des modules / package
const bCrypt = require('bcrypt')
const jsonWebToken = require('jsonwebtoken')
const { PrismaClient, prisma } = require("@prisma/client")

const { user } = new PrismaClient()

exports.signup = async (req, res) => {
    const { lastname, firstname, birthdate, email, department } = req.body
    const userExist = await user.findUnique({
        where: {
            email
        }
    })
    if(userExist) {
        return res.status(401).json({ error: 'Un compte avec cette adresse email existe déjà'})
    }
    const hash = await bCrypt.hash(req.body.password, 10)
    const newUser = await user.create({
        data: {
            lastname,
            firstname,
            password: JSON.stringify(hash),
            birthdate,
            email,
            department
        }
    })
        res.json(newUser)
}

exports.login = async (req, res) => {
    const userLogin = await user.findUnique({
        where: {
            email: req.body.email
        }
    }) 
    if(!userLogin) {
        return res.status(401).json({ error: 'Utilisateur non trouvé'})
    }
    const login = await bCrypt.compare(req.body.password, JSON.parse(userLogin.password))
    if (!login) {
        return res.status(401).json({ error: 'Password incorrect'})
    }
    if (login) {
        return res.status(200).json({
            userId: user._id,
            token: jsonWebToken.sign({ userId: userLogin.id, userAdmin: userLogin.admin}, process.env.TokenSecret, { expiresIn: '24h'})
        })
    }
}

//router.get('/account', auth, userController.account);
exports.account = async (req, res) => {
    const userAccount = await user.findUnique({
        where: {
            id: parseInt(req.params.id)
        }
    })
    if (!userAccount) {
        return res.status(403).json({ message: 'Requête non authorisée'})
    }
    if (userAccount) {
        return res.json(userAccount)
    }
}

//router.put('/modify', auth, userController.modify);
exports.modify = async (req, res) => {
    const { lastname, firstname, birthdate, email, department } = req.body
    if( req.body.password) {
        const hash = await bCrypt.hash(req.body.password, 10)
        const userModify = await user.update({
            where: {
                id: parseInt(req.params.id)
            },
            data: {
                lastname,
                firstname,
                password: JSON.stringify(hash),
                birthdate,
                email,
                department
            }
        })
        return res.json(userModify)
    }   else {
        const userModify = await user.update({
            where: {
                id: parseInt(req.params.id)
            },
            data: {
                lastname,
                firstname,
                birthdate,
                email,
                department
            }
        })
        return res.json(userModify)
    }
}

//router.delete('/delete, auth, userController.delete);
exports.delete = async (req, res) => {
    const userDelete = await user.delete({
        where: {
            id: parseInt(req.params.id)
        }
    })
    return res.json(userDelete)
}