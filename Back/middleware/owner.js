// Variables d'environnement
require('dotenv').config();

// Importation des modules
const jsonWebToken = require('jsonwebtoken')
const postOwner = require('../middleware/owner-config/post')

// Vérification de l'identité de l'initiateur de la requête
module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jsonWebToken.verify(token, process.env.TokenSecret);
        const userId = JSON.stringify(decodedToken.userId);
        const userAdmin = decodedToken.userAdmin;
        const reqType = req.baseUrl
        console.log(typeof userAdmin)
        console.log(req.baseUrl)
        if(userAdmin == false){
            switch(reqType) {
                case '/api/user':
                    if(req.params.id && req.params.id != userId) {
                        throw 'User ID non valide 1';
                    } else {
                        console.log('case user')
                        next()
                    }
                break
                case '/api/post':
                    next()
                break;
                case '/api/post/message':
                    next()
                break
            }
        } else if (userAdmin == true) {
            console.log("admin")
            next()
        }
    } catch (error) {
        return res.status(403).json({ message: 'Requête non authorisée'})
    }
}