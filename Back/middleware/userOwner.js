// Variables d'environnement
require('dotenv').config();

// Importation des modules
const jsonWebToken = require('jsonwebtoken');



module.exports = (req, res, next) => {
    const token = req.headers.authorization
    const decodedToken = jsonWebToken.verify(token, process.env.TokenSecret);
    const userAdmin = decodedToken.userAdmin;
    const userId = JSON.stringify(decodedToken.userId);
    console.log(decodedToken)
    if(userAdmin === false) {
        if(req.params.id && req.params.id != userId) {
            throw 'User ID non valide';
        } else {
            next()
        }
    } else if(userAdmin === true) {
        next()
    }
}