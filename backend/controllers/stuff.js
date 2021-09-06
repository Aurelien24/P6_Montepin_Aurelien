const Thing = require('../models/thing');

// mdp a hacher + saler idéalement. Ne fonctionne pas du tout !!!
exports.addUser = (req, res, next) => {
  const thing = new Thing({
    //email: req.body.email, ???
    //password: req.body.password, ???
    ...req.body
  });

  // thing.save() ??? A retirer ?
  thing.save()
    .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
    .catch(error => res.status(400).json( error ));
};

exports.login = (req, res, next) => {

  // recherche 1 compte
  Thing.findOne({
    email: req.body.email,
    password: req.body.password,
  })

  .then(() => res.status(201).json({ message: 'Requete valable'}))
  .catch(error => res.status(400).json( error ));
};

exports.sauces = (req, res, next) => {

  // Recherche toute les sauces
  Thing.find({
    // Hum... Rien ?
  })
  
  .then(() => res.status(201).json({ message: 'Requete valable'}))
  .catch(error => res.status(400).json( error ));
};

exports.oneSauces = (req, res, next) => {
  // Je recherche 1 sauce donc...
  Thing.findOne({
    // Nom de la sauce ou peut etre : ...req.body
  })
  
  .then(() => res.status(201).json({ message: 'Requete valable'}))
  .catch(error => res.status(400).json( error ));
};

exports.saveSauces = (req, res, next) => {
  // Je save une sauce...
  // A renommer sauce. Quelque chose pour tout n'aide pas
  Thing.save({
    // n'existe pas dans thing.js a ajouté ? Ailleur ????
    sauce: req.body.sauce,
    image: req.body.image,
    // Ou ...req.body
  })

  .then(() => res.status(201).json({ message: 'Requete valable'}))
  .catch(error => res.status(400).json( error ));
};

exports.majSauces = (req, res, next) => {
  // mise a jour d'une sauce
  Thing.updateOne({
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
  Thing.deleteOne({
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
  Thing.updateOne({
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