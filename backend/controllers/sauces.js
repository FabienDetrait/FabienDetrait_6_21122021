const { resource } = require('../app');
const sauce = require('../models/sauces');  // Importer notre Schéma de données des sauces

exports.createSauce = (req, res, next) => {
    delete req.body._id;
    const newSauce = new sauce({
      ...req.body
    })
    newSauce.save()
        .then(() => res.status(201).json({ message: 'Sauce enregistrée !'}))
        .catch(error => res.status(400).json({ error }));
};

exports.getAllSauces = (req, res, next) => {
    sauce.find()
        .then((sauces) => res.status(20).json(sauces))
        .catch(error => res.status(400).json({ error }));
};

exports.getOneSauce = (req, res, next) => {
    sauce.findOne({ _id: req.params.id })
        .then((sauce) => res.status(20).json(sauce))
        .catch(error => res.status(400).json({ error }));
};

exports.modifySauce = (req, res, next) => {
    sauce.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Sauce modifiée !'}))
        .catch(error => res.status(400).json({ error }));
}

exports.deleteSauce = (req, res, next) => {
    sauce.findOne({ _id: req.params.id })
        .then((Sauce) => {
            if (!Sauce) {
                res.status(404).json({ error: new Error('Plus de sauce!') });
            }
            if (Sauce.userId !== req.auth.userId) {
                resource.status(400).json({ error: new Error('Requête non authorisée') });
            }
        })
    sauce.deleteOne({ _id: req.params.id })
        .then(() => { res.status(200).json({ message: 'Sauce supprimée !'})})
        .catch((error) => { res.status(400).json({ error })});
};





