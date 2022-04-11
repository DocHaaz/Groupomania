// Importation des modules / package
const express = require('express')
const auth = require('../middleware/auth')
const owner = require('../middleware/postOwner')
const postController = require('../controllers/post')

// Création du router
const router = express.Router()

// Création des routes Post
router.get('/', auth, postController.getAllPost);
router.get('/:id', auth, postController.getOnePost);
router.post('/', auth, postController.createPost);
router.put('/:id', auth, owner, postController.modifyPost)
router.delete('/:id', auth, owner, postController.deletePost)

// Exportation du router
module.exports = router;