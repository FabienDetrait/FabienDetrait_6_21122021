const emailValidator = require('email-validator');  // Importer email-validator

module.exports = (req, res, next) => {
    if (!emailValidator.validate(req.body.email)) {
        res.status(401).json({ message: "Veuillez entrer une adresse email valide" });
    } else {
        next();
    }
}