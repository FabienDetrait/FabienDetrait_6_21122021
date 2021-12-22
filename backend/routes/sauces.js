const express = require('express');     // Importer express
const router = express.Router();    // Créer un routeur
const ctrlSauce = require('../controllers/sauces'); // Importer le contrôleur des sauces

router.post('/', ctrlSauce.createSauce);
router.get('/', ctrlSauce.getAllSauces)
router.get('/:id', ctrlSauce.getOneSauce)
router.put('/:id', ctrlSauce.modifySauce)
router.delete('/:id', ctrlSauce.deleteSauce)

module.exports = router;    // Exporter le router
