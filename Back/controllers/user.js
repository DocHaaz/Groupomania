// Variables d'environnement
require('dotenv').config();

// Importation des modules / package
const bCrypt = require('bcrypt')
const jsonWebToken = require('jsonwebtoken')
const { PrismaClient, prisma } = require("@prisma/client")

// Importation du schéma via prismaclient
const { user } = new PrismaClient()

// Inscription d'un nouvel utilisateur
exports.signup = async (req, res) => {
    const { lastname, firstname, email } = req.body
    if  (lastname != '' && firstname != '' && email != '' && req.body.password != '') {
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
                email,
            }
        })
        return res.status(201).json({ message: 'Utilisateur créée'})
    } else {
        return res.status(401).json({ error: 'Veuillez remplir tout les champs'})
    }
}

// Connexion d'un utilisateur (existant)
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
            userId: userLogin.id,
            token: jsonWebToken.sign({ userId: userLogin.id, userAdmin: userLogin.admin}, process.env.TokenSecret, { expiresIn: '24h'})
        })
    }
}

// récupération de l'ensemble des utilisateur
exports.getAllUser = async (req, res) => {
    const Users = await user.findMany( {
        select: {
            id: true,
            lastname: true,
            firstname: true,
            email: true,
            admin: true
        }
    })
    return res.status(200).json(Users)
}

// Accès au compte de l'utilisateur
exports.account = async (req, res) => {
    const userAccount = await user.findUnique({
        where: {
            id: parseInt(req.params.id)
        },
        select: {
            id: true,
            lastname: true,
            firstname: true,
            email: true,
            admin: true
        }
    })
    if (!userAccount) {
        return res.status(401).json({ message: 'Utilisateur inconnu'})
    }
    if (userAccount) {
        return res.status(200).json(userAccount)
    }
}

// Modification d'un compte
exports.modify = async (req, res) => {
    if(req.body.lastname == '' || req.body.firstname == '' || req.body.email == '' || req.body.password == '') {
        return res.status(202).json({ message: 'requête accepter mais une ou plusieur donnée ne sont pas valides' })
    } else {
        const { lastname, firstname, email } = req.body
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
                    email,
                },
                select: {
                    id: true,
                    lastname: true,
                    firstname: true,
                    email: true,
                    admin: true
                }
            })
            return res.status(201).json(userModify)
        }   else {
            const userModify = await user.update({
                where: {
                    id: parseInt(req.params.id)
                },
                data: {
                    lastname,
                    firstname,
                    email,
                },
                select: {
                    id: true,
                    lastname: true,
                    firstname: true,
                    email: true,
                    admin: true
                }
            })
            return res.status(201).json(userModify)
        }
    }
}

// Suppression d'un compte
exports.delete = async (req, res) => {
    if(req.params.id) {
        const userDelete = await user.delete({
            where: {
                id: parseInt(req.params.id)
            }
        })
        return res.status(200).json(userDelete)
    } else {
        return res.status(403).json({ message: 'Refus de traitement de la requête' })
    }
}