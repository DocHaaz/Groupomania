// Variables d'environnement
require('dotenv').config();

// Importation des modules / packages
const express = require('express');
const usersRoutes = require ('./routes/user')
const messageRoutes = require('./routes/message')
const postRoutes = require('./routes/post')

// Création de l'application express
const app = express();

// Gestion du CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

//  Gestion des requêtes POST
app.use(express.json())

// Router
app.use('/api/user', usersRoutes)
app.use('/api/post', postRoutes)
app.use('/api/post/message', messageRoutes)

module.exports = app;