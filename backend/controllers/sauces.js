const Sauce = require("../models/sauces");
const fs = require("fs");
const req = require("express/lib/request");

// Créer une sauce
exports.createSauce = (req, res, next) => {
  const sauceObject = JSON.parse(req.body.sauce);
  delete sauceObject._id;
  const newSauce = new Sauce({
    ...sauceObject,
    imageUrl: `${ req.protocol }://${ req.get("host") }/images/${ req.file.filename }`,
    //initialiser les valeurs de like et dislike 
    likes: 0,
    dislikes: 0,
    usersLiked: [],
    usersDisliked: []
  });
  newSauce.save()
      .then(() => res.status(201).json({ message: 'Sauce enregistrée !'}))
      .catch(error => res.status(400).json({ error }));
};

// Afficher toutes les sauces  
exports.getAllSauces = (req, res, next) => {
  Sauce.find()
      .then((sauces) => res.status(200).json(sauces))
      .catch(error => res.status(400).json({ error }));
};

// Afficher une sauce sélectionnée
exports.getOneSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
      .then((sauce) => res.status(200).json(sauce))
      .catch(error => res.status(400).json({ error }));
};

// Modifier une sauce
exports.modifySauce = (req, res, next) => {
  const sauceObject = req.file ? 
      { 
          ...JSON.parse(req.body.sauce),
          imageUrl: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`,
      } 
      : { ...req.body };
  Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })
      .then(() => res.status(200).json({ message: 'Sauce modifiée !'}))
      .catch(error => res.status(400).json({ error }));
};

// Supprimer une sauce
exports.deleteSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
      .then(sauce => {
          const filename = sauce.imageUrl.split('/images/')[1];
          fs.unlink(`images/${filename}`, () => {
              Sauce.deleteOne({ _id: req.params.id })
                  .then(() => res.status(200).json({ message: 'Sauce supprimée !'}))
                  .catch(error => res.status(400).json({ error }));
          });
      })
      .catch(error => res.status(500).json({ error }));
};

// Like/Dislike
exports.likesDislikes = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
      .then((sauce) => {
        const userID = req.body.userId;        
        switch (req.body.like) {
          // Cas où l'utilisateur veut dislike
          case -1:
            if (userID != sauce.usersDisliked.find(user => user === userID)) {
              sauce.dislikes += 1;
              sauce.usersDisliked.push(userID);
              sauce.save()
                  .then(() => res.status(200).json({ message: "Vous n'aimez pas cette sauce !" }))
                  .catch(error => res.status(400).json({ error }));
            } else {
              res.status(403).json({ error: "Dislike déjà pris en compte !"});
            }
            break;
          
          // Cas où l'utilisateur annule ses choix
          case 0:
            if (userID === sauce.usersDisliked.find(user => user === userID)) {
              sauce.dislikes -= 1;
              sauce.usersDisliked.splice(sauce.usersDisliked.indexOf(userID), 1);
              sauce.save()
                  .then(() => res.status(200).json({ message: "Dislike annulé" }))
                  .catch(error => res.status(400).json({ error }));
            } else if (userID === sauce.usersLiked.find(user => user === userID)) {
              sauce.likes -= 1;
              sauce.usersLiked.splice(sauce.usersLiked.indexOf(userID), 1);
              sauce.save()
                  .then(() => res.status(200).json({ message: "Like annulé" }))
                  .catch(error => res.status(400).json({ error }));
            }
            break;

          // Cas où l'utilisateur veut like
          case 1:
            if (userID != sauce.usersLiked.find(user => user === userID)) {
              sauce.likes += 1;
              sauce.usersLiked.push(userID);
              sauce.save()
                  .then(() => res.status(200).json({ message: "Vous aimez cette sauce !" }))
                  .catch(error => res.status(400).json({ error }));
            } else {
              res.status(403).json({ error: "Like déjà pris en compte !"});
            }
            break;

          default:
            break;
        }
      })
      .catch(error => res.status(400).json({ error }));
};
