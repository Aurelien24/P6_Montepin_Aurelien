const Thing = require('../models/thing');

/*app.put('/api/stuff/:id', (req, res, next) => {
  Thing.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Objet modifié !'}))
    .catch(error => res.status(400).json({ error }));
});


tentative pour condensé le code
exports.addUser = (req, res, next) => {
  const thing = new Thing({ email: req.body.email, password: req.body.password });

  // thing.save() ??? A retirer ? Changer ?
  thing.save().then(() => res.status(200).json({ message: 'Requete valable'}))})
  .catch(error => res.status(400).json({ error }));
};*/

// mdp a hacher + saler idéalement
exports.addUser = (req, res, next) => {
  const thing = new Thing({
    email: req.body.email,
    password: req.body.password,
  });

  // thing.save() ??? A retirer ?
  thing.save().then(
    () => {
      res.status(201).json({
        message: 'Requete valable'
      });
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
};

exports.login = (req, res, next) => {

  // recherche 1 compte
  Thing.findOne({
    email: req.body.email,
    password: req.body.password,
  }).then(
    // pas de thing.save(), ont enregistre pas
    // (xxxxx) => {  - Y auras t'il un paramètre ? Normalement oui
    () => {
      res.status(201).json({
        message: 'Requete valable'
      });
    }
    ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
};

exports.sauces = (req, res, next) => {

  // Recherche toute les sauces
  Thing.find({
    // Hum... Rien ?
  }).then(
    // pas de thing.save(), ont enregistre pas
    // (xxxxx) => {  - Y auras t'il un paramètre ? Normalement oui
    () => {
      res.status(201).json({
        message: 'Requete valable'
      });
    }
    ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
};

exports.oneSauces = (req, res, next) => {
  // Je recherche 1 sauce donc...
  Thing.findOne({
    // Hum... Rien ?
  }).then(
    // pas de thing.save(), ont enregistre pas
    // (xxxxx) => {  - Y auras t'il un paramètre ? Normalement oui
    () => {
      res.status(201).json({
        message: 'Requete valable'
      });
    }
    ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
};

exports.saveSauces = (req, res, next) => {
  // Je save une sauce...
  Thing.save({
    // n'existe pas dans thing.js a ajouté ? Ailleur ????
    sauce: req.body.sauce,
    image: req.body.image,
  }).then(
    // (xxxxx) => {  - Y auras t'il un paramètre ? Normalement oui
    // La consol veut une , avec thing.save
    thing.save() => {
      res.status(201).json({
        message: 'Requete valable'
      });
    }
    ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
};

exports.majSauces = (req, res, next) => {
  // mise a jour d'une sauce
  Thing.updateOne({
    sauce: req.body.sauce,
    image: req.body.image,

    // ou  ?

    files: req.body.sauce.json
  }).then(
    // pas de thing.save(), ont enregistre pas
    // (xxxxx) => {  - Y auras t'il un paramètre ? Normalement oui
    thing.save() => {
      res.status(201).json({
        message: 'Requete valable'
      });
    }
    ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
};

exports.delSauces = (req, res, next) => {
  // supprime 1 sauces et son id
  Thing.deleteOne({
    // franchement étrange comme ligne... sauceId sort de nul part. _id de "Supprime la sauce avec l'_id fourni."
    _id: req.body.sauceId
  }).then(
    // pas de thing.save(), ont enregistre pas
    // (xxxxx) => {  - Y auras t'il un paramètre ? Normalement oui
    thing.save() => {
      res.status(201).json({
        message: 'Requete valable'
      });
    }
    ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
};

exports.likes = (req, res, next) => {
  // a changer ? Ont change le nombre de like...
  Thing.updateOne({
    userId: req.body.userId
    like: req.body.likes
  }).then(
    // pas de thing.save(), ont enregistre pas
    // (xxxxx) => {  - Y auras t'il un paramètre ? Normalement oui
    thing.save() => {
      res.status(201).json({
        message: 'Requete valable'
      });
    }
    ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
};