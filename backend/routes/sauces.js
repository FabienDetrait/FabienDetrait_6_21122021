const express = require('express');     // Importer express
const router = express.Router();    // Créer un routeur
const ctrlSauce = require('../controllers/sauces'); // Importer le contrôleur des sauces
const auth = require('../middleware/auth');

router.post('/', auth, ctrlSauce.createSauce);
router.get('/', auth, ctrlSauce.getAllSauces)
router.get('/:id', auth, ctrlSauce.getOneSauce)
router.put('/:id', auth, ctrlSauce.modifySauce)
router.delete('/:id', auth, ctrlSauce.deleteSauce)

module.exports = router;    // Exporter le router
