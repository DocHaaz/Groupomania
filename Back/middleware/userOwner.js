// Variables d'environnement
require('dotenv').config();

// Importation des modules
const jsonWebToken = require('jsonwebtoken');


// Gestion de propriété de compte
module.exports = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jsonWebToken.verify(token, process.env.TokenSecret);
    const userAdmin = decodedToken.userAdmin;
    const userId = JSON.stringify(decodedToken.userId);
    if(userAdmin === false) {
        if(req.params.id && req.params.id != userId) {
            return res.status(403).json({ message: 'Requête non authorisée'})
        } else {
            next()
        }
    } else if(userAdmin === true) {
        next()
    }
}