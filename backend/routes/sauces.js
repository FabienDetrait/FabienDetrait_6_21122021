const express = require('express');     // Importer express
const router = express.Router();    // Créer un routeur
const ctrlSauce = require('../controllers/sauces'); // Importer le contrôleur des sauces

// Importer nos middlewares
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

router.post('/', auth, multer, ctrlSauce.createSauce);
router.get('/', auth, ctrlSauce.getAllSauces)
router.get('/:id', auth, ctrlSauce.getOneSauce)
router.put('/:id', auth, multer, ctrlSauce.modifySauce)
router.delete('/:id', auth, ctrlSauce.deleteSauce)
router.post('/:id/like', auth, ctrlSauce.likesDislikes)

module.exports = router;    // Exporter le router
