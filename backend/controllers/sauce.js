const Sauce = require('../models/sauce');
const jwt = require('jsonwebtoken');

exports.sauces = (req, res, next) => {
  // Recherche toute les sauces
  Sauce.find()
  
  .then((sauces) => res.status(200).json( sauces ))
  .catch(error => res.status(400).json( error ));
};

exports.oneSauces = (req, res, next) => {
  // Je recherche 1 sauce donc...
  Sauce.findOne({
    // Nom de la sauce ou peut etre : ...req.body
  })
  
  .then(() => res.status(201).json({ message: 'Requete valable'}))
  .catch(error => res.status(400).json( error ));
};

exports.saveSauces = (req, res, next) => {

  const sauceData = JSON.parse(req.body.sauce);
  console.log("Aezaeza", req.body.sauce)

  const sauce = new Sauce({
    //sauce: req.body.sauce,
    //image: req.body.image,

    userId: sauceData.userId,
    name: sauceData.name,
    manufacturer: sauceData.manufacturer,
    description: sauceData.description,
    mainPepper: sauceData.mainPepper,
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
    heat: sauceData.heat,
    likes: 0,
    dislikes: 0,
  });

  sauce.save()
    .then(() => res.status(201).json({ message: 'Requete valable'}))
    .catch(error => res.status(400).json( error ));
};

exports.majSauces = (req, res, next) => {
  // mise a jour d'une sauce
  Sauce.updateOne({
    sauce: req.body.sauce,
    image: req.body.image,

    // ou  ?

    files: req.body.sauce.json
  })
    // sauce déja mise a jour. Pas besoin de think.save
    // argument de uptade one pour frontend
    .then(() => res.status(201).json({ message: 'Requete valable'}))
    .catch(error => res.status(400).json( error ));
};

exports.delSauces = (req, res, next) => {
  // supprime 1 sauces et son id
  Sauce.deleteOne({
    // franchement étrange comme ligne... sauceId sort de nul part. _id de "Supprime la sauce avec l'_id fourni."
    _id: req.body.sauceId
  })
  .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
  .catch(error => res.status(400).json({ error }));
};

exports.likes = (req, res, next) => {
  // a changer ? Ont change le nombre de like...
  Sauce.updateOne({
    userId: req.body.userId,
    like: req.body.likes,
  })
  .then(() => res.status(201).json({ message: 'like ajouté' }))
  .catch(error => res.status(400).json({ error }));
};

exports.dislikes = (req, res, next) => {
  // a changer ? Ont change le nombre de like...
  Sauce.updateOne({
    userId: req.body.userId,
    like: req.body.dislikes,
  })
  .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
  .catch(error => res.status(400).json({ error }));
};