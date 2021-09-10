const Sauce = require('../models/sauce');

exports.sauces = (req, res, next) => {

  // Recherche toute les sauces
  Sauce.find({
    // Hum... Rien ?
  })
  
  .then(() => res.status(201).json({ message: 'Requete valable'}))
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
  // Je save une sauce...
  // A renommer sauce. Quelque chose pour tout n'aide pas

  console.log("Aezaeza", req.body)
  let sauceData = JSON.parse(req.body.sauce);

  const sauce = new Sauce({
    //sauce: req.body.sauce,
    //image: req.body.image,

    userId: sauceData.userId,
    name: sauceData.name,
    manufacturer: sauceData.manufacturer,
    description: sauceData.description,
    mainPepper: sauceData.mainPepper,
    imageUrl: "req.file.filename",
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
  }).then(
    // pas de thing.save(), ont enregistre pas
    // (xxxxx) => {  - Y auras t'il un paramètre ? Normalement oui
    /*thing.save() => {
      res.status(201).json({
        message: 'Requete valable'
      });
    }
    ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }*/
  );
};

exports.likes = (req, res, next) => {
  // a changer ? Ont change le nombre de like...
  Sauce.updateOne({
    userId: req.body.userId,
    like: req.body.likes,
  }).then(
    // pas de thing.save(), ont enregistre pas
    // (xxxxx) => {  - Y auras t'il un paramètre ? Normalement oui
    /*thing.save() => {
      res.status(201).json({
        message: 'Requete valable'
      });
    }
    ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }/*/
  );
};