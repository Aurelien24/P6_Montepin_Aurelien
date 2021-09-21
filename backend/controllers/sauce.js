const Sauce = require('../models/sauce');

exports.sauces = (req, res, next) => {
  // Recherche toute les sauces
  Sauce.find()
  
  .then((sauces) => res.status(200).json( sauces ))
  .catch(error => res.status(400).json( error ));
};

exports.oneSauces = (req, res, next) => {
  // Je recherche 1 sauce donc...  _id: req.body.id 
  console.log("bubu", req.body)
  console.log("bubu2", req.body.id)

  Sauce.findOne({_id: req.body.id})
  
  console.log("bubu", res.body)
  console.log("bubu2", res.body.id)

  //sauce en argument ?
  .then((sauce) => res.status(200).json(sauce))    //console.log('bubu', res.status(200).json(sauce))
  .catch(error => res.status(400).json( error ));
};

exports.saveSauces = (req, res, next) => {

  const sauceData = JSON.parse(req.body.sauce);

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
    .then(() => res.status(200).json({ message: 'Sauce sauvegarder'}))
    .catch(error => res.status(400).json( error ));
};

exports.majSauces = (req, res, next) => {
  // mise a jour d'une sauce. NE PREND PROBABLEMENT PAS L'IMAGE.  { ...req.body, _id: req.params.id } a garder ? Retirer protocole image ?
  Sauce.findOne({_id: req.body.id})
  .then((sauce) => Sauce.updateOne({ /*_id: req.body.id}, { ...req.body, _id: req.params.id }*/...req.body, imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`})
    .then(() => res.status(200).json({ message: 'Sauce mise a jour'}))
    .catch(error => res.status(400).json( error )))

  .catch(error => res.status(500).json( error ));

  // OU : ???
  Sauce.updateOne({_id: req.body.id}, { ...req.body, _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Sauce mise a jour'}))
    .catch(error => res.status(400).json( error ));
};

exports.delSauces = (req, res, next) => {
  // supprime 1 sauces et son id

  Sauce.deleteOne({_id: req.body.id})

  .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
  .catch(error => res.status(400).json({ error }));
};

exports.likes = (req, res, next) => {
  // 1-> regarder si l'utilisateur a liker la sauce précédament.(findOne)
  // 2-> Si non, mettre son like.
  // 3-> si oui, changer le like. (update)
  // 4-> Incrémenter le like au changement

  // like = 1 ? = True ? Si true +1 like ?

  // Sauce ? Pas like ? Crée une nouvelle table ?
  Sauce.findOne({
    userId: req.body.userId,
    sauceId: req.body.sauceId,
    dislikeOrLike: req.body.like
  })

  if (sauce.like == 1) {
    Sauce.updateOne({
      dislikeOrLike: sauceData.like
    })
    .then(() => res.status(200).json({ message: 'liké' }))
    .catch(error => res.status(400).json({ error }));
  } if (sauce.like == -1){
    Sauce.updateOne({
      dislikeOrLike: sauceData.like
    })
    .then(() => res.status(200).json({ message: 'disliké' }))
    .catch(error => res.status(400).json({ error }));
  }else{
    Sauce.updateOne({
      dislikeOrLike: sauceData.like
    })
    .then(() => res.status(200).json({ message: 'like/dislike retirer' }))
    .catch(error => res.status(400).json({ error }));
  }

  let like = req.body.like;

  // Autre facons potentiel (potentiellement plus stable)

  Sauce.findOne({
    userId: req.body.userId,
    sauceId: req.body.sauceId,
    dislikeOrLike: req.body.like
  })
  .then(() => res.status(200).json({ message : "donnée obtenu"}))
  .catch(() => res.status(200).json({ error : error }));

  // OldLike ne seras pas là
  let oldLike = res.body.like
  let likes = sauce.likes

  if(oldLike != null){
    if(oldLike === 1){
        if(like === -1){
          // Comment accéder a like et dislikes ?
          Sauce.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id }, {dislikes: +1}, {likes: -1})
            .then(() => res.status(200).json({ message : "dislike ajouter, like retirer"}))
            .catch(() => res.status(400).json({ error : error}));

        }else if(like === 0){
          // Mettre un update avec like =0 ? Rajouter alors 3ème possibilité de oldlike au code
          Sauce.deleteOne({ _id: req.params.id }, { ...req.body, _id: req.params.id }, {likes: -1})
            .then(() => res.status(200).json({ message : "like retirer"}))
            .catch(() => res.status(400).json({ error : error}));

        }else{
          return;
        }
    }else if(oldLike === -1){
      if(like === 1){
        Sauce.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id }, {dislikes: -1}, {likes: +1})
            .then(() => res.status(200).json({ message : "like ajouter, dislike retirer"}))
            .catch(() => res.status(400).json({ error : error}));

      }else if(like === 0){
        Sauce.deleteOne({ _id: req.params.id }, { ...req.body, _id: req.params.id }, {dislikes: -1})
            .then(() => res.status(200).json({ message : "dislike retirer"}))
            .catch(() => res.status(400).json({ error : error}));

      }else{
        return;
      }
    }
  }else{
    // Pas d'ancien like/dislike

    if(like === -1){
      // Comment accéder a like et dislikes ?
      Sauce.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id }, { dislikes: +1 })
        .then(() => res.status(200).json({ message : "dislike ajouter"}))
        .catch(() => res.status(400).json({ error : error}));

    }else if(like === 1){
      Sauce.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id }, {likes: +1})
          .then(() => res.status(200).json({ message : "like ajouter"}))
          .catch(() => res.status(400).json({ error : error}));
    }
  }
};

/* UNE SEUL FONCTION LIKE/DISLIKE !!!!
exports.dislikes = (req, res, next) => {
  // a changer ? Ont change le nombre de like...
  Sauce.updateOne({
    userId: req.body.userId,
    dislike: req.body.dislikes,
    sauceId: req.params.id
  })
  .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
  .catch(error => res.status(400).json({ error }));
};*/