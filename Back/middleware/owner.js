// Variables d'environnement
require('dotenv').config();

// Importation des modules
const jsonWebToken = require('jsonwebtoken')

// Vérification de l'identité de l'initiateur de la requête
module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jsonWebToken.verify(token, process.env.TokenSecret);
        const userId = JSON.stringify(decodedToken.userId);
        const userAdmin = JSON.stringify(decodedToken.userAdmin);
        const reqType = req.baseUrl
        req.auth = { userId: userId };
        console.log(userAdmin)
        // console.log(req)
        console.log(req.baseUrl)
        if(userAdmin){
            next()
        }
        switch(reqType) {
            case '/api/user':
                if(req.params.id && req.params.id !== userId) {
                    throw 'User ID non valide'
                } else {
                    next ()
                }
                console.log('case')
                break
            case '/api/post':
                if(req.params.id && req.params.id !== userId) {
                    throw 'User ID non valide'
                } else {
                    next ()
                }
                break;
            case '/api/post/message':
                if(req.params.id && req.params.id !== userId) {
                    throw 'User ID non valide'
                } else {
                    next ()
                }
                break
        }
        // if(req.params.id && req.params.id !== userId) {
        //     throw 'User ID non valide';
        // } else {
        //     console.log('owner')
        //     next();
        // }
    } catch (error) {
        return res.status(403).json({ message: 'Requête non authorisée'})
    }
}