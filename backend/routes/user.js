const express = require('express');     // Importer express
const router = express.Router();    // Créer un routeur
const ctrlUser = require('../controllers/user'); // Importer le contrôleur des users
const passwordSchema = require('../middleware/password');   // Importer notre middleware password
const emailValidator = require('../middleware/email');  // Importer notre middleware email

router.post('/signup', emailValidator, passwordSchema, ctrlUser.signup);    // Route pour nouvel user 
router.post('/login', ctrlUser.login);  // Route pour utilisateur déjà créé

module.exports = router;    // Exporter le router