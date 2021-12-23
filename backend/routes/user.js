const express = require('express');     // Importer express
const router = express.Router();    // Créer un routeur
const ctrlUser = require('../controllers/user'); // Importer le contrôleur des users

router.post('/signup', ctrlUser.signup);    // Route pour nouvel user 
router.post('/login', ctrlUser.login);  // Route pour utilisateur déjà créé

module.exports = router;    // Exporter le router