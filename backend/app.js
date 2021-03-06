const express = require('express');     // Besoin d'express
const mongoose = require('mongoose');   // Importer mongosse
const path = require('path');   // Importer path
const helmet = require('helmet'); // Importer helmet
const app = express();      // Création de notre application express
const rateLimit = require('express-rate-limit');  // Importer express-rate-limit
const mongoSanitize = require('express-mongo-sanitize');  // Importer express-mongo-sanitize
const saucesRoutes = require('./routes/sauces');  // Importer le router des sauces
const userRoutes = require('./routes/user');  // Importer le router des users
const { application } = require('express');

require('dotenv').config();   // Sécuriser les données sensibles

// Connecter notre API à notre base de données
mongoose.connect(process.env.SECURE_MONGO,
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

// Permettre toutes demandes de toutes origines d'accéder à notre API
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers","Origin, X-Requested-With, Content, Accept, Content-Type, Authorization");
  res.setHeader("Access-Control-Allow-Methods","GET, POST, PUT, DELETE, PATCH, OPTIONS");
  next();
});

// Configuration du limiteur
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,  // 15 mins 
  max: 100                   // 100 requêtes autorisées par fenêtre
});

app.use(express.json());    // Extraire le corps JSON / donne accès au corps de la requête
app.use(helmet());  // Protéger l'application de vulnérabilités
app.use(limiter);   // Limiter les requêtes
app.use(mongoSanitize()); // Eliminer les entrées avec des caractères interdits dans MongoDB

app.use('/images', express.static(path.join(__dirname, 'images'))); 

app.use('/api/sauces', saucesRoutes); // Enregistrer les sauces
app.use('/api/auth', userRoutes); // Enregistrer les routes

module.exports = app;   // Exporter notre application