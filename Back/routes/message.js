// Importation des modules / package
const express = require('express')
const auth = require('../middleware/auth')
const owner = require('../middleware/owner')
const messageController = require('../controllers/message')

// Création du router
const router = express.Router()

// Création des routes Message
router.get('/:id', auth, messageController.getOneMessage);
router.post('/', auth, messageController.createMessage);
router.put('/:id', auth, owner, messageController.modifyMessage)
router.delete('/:id', auth, owner, messageController.deleteMessage)

// Exportation du router
module.exports = router;