// Importation des modules / package
const express = require('express')
const auth = require('../middleware/auth')
const owner = require('../middleware/owner')
const userController = require('../controllers/user')

// Création du router
const router = express.Router()

// Création des routes Users
router.post('/signup', userController.signup);
router.post('/login', userController.login);
router.get('/:id', auth, owner, userController.account);
router.put('/:id', auth, owner, userController.modify);
router.delete('/:id', auth, owner, userController.delete);

// Exportation du router
module.exports = router;