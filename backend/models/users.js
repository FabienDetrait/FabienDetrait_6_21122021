const mongoose = require('mongoose');   // Importer mongoose
const uniqueValidator = require('mongoose-unique-validator');   // Importer le Validator

// Schéma de données d'un utilisateur
const userSchema = mongoose.Schema({ 
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});

userSchema.plugin(uniqueValidator);  //Appliquer le Validator au Schéma

module.exports = mongoose.model('User', userSchema);  // Exporter ce modèle

