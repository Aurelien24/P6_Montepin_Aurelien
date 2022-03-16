const sauce = require('../models/sauce');
const Sauce = require('../models/sauce');

exports.sauces = (req, res, next) => {
  // Recherche toute les sauces
  Sauce.find()
  
  .then((sauces) => res.status(200).json( sauces ))
  .catch(error => res.status(400).json( error ));
};

exports.oneSauces = (req, res, next) => {

  Sauce.findOne({_id: req.params.id})
  
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

  // y as t'il une modification de l'image
  if (req.body.heat <= 10){

    console.log ("Pas de modification d'image")

    // Vérification d'autorisation -> sauce.userId = userId utilisateur ?
    // Demander une modification ave le mauvais toket et userId seras bloquer. Une 200 seras cependant renvoyé
    Sauce.updateOne({$and: [{_id: req.params.id, userId: req.body.userId}]}, { ...req.body, _id: req.params.id })
      .then(() => res.status(200).json({ message: 'Sauce mise a jour...'}))
      .catch(error => res.status(400).json( error ));

  } else if (req.body.heat == undefined) {

    const sauceData = JSON.parse(req.body.sauce);
    const imageUrl = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`

    console.log ("modification d'image")
    Sauce.updateOne({$and: [{_id: req.params.id, userId: req.body.userId}]}, { ...sauceData, _id: req.params.id, imageUrl: imageUrl })
      .then(() => res.status(200).json({ message: 'Sauce mise a jour'}))
      .catch(error => res.status(400).json( error ));
  }
};

exports.delSauces = (req, res, next) => {
  // supprime 1 sauces et son id
  const jwt = require('jsonwebtoken');

  const token = req.headers.authorization.split(' ')[1];
  const decodedToken = jwt.verify(token, 'Mon_TOKEN_developpement');
  const userId = decodedToken.userId;

  Sauce.deleteOne({$and: [{_id: req.params.id, userId: userId}]})

  .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
  .catch(error => res.status(400).json({ error }));
};

exports.likes = (req, res, next) => {

  Sauce.findOne({_id:req.params.id})
  .then((sauce) => {

    let userId = req.body.userId;

    let like = req.body.like;
    let newLikes = sauce.likes;
    let newDislikes = sauce.dislikes;

    console.log(sauce.usersLiked)

    // Si l'utilisateur a déjà liké
    if ( sauce.usersLiked.includes(userId) ) {

      console.log("Déjà liké")
      
      if(like === 0){

        newLikes --
        console.log("like = 0", sauce.likes, newLikes)
        Sauce.updateOne({_id:req.params.id}, {$inc: {likes: -1}, $pull: {usersLiked: userId}})
        .then(() => res.status(200).json({ message : "donnée obtenu"}))
        .catch(() => res.status(200).json({ error : error }))
    
        // Si like != 0 alors ont plante, c'est pas normal
      }else{
        return;
      }
    
      // Si l'utisateur a disliké
    }else if ( sauce.usersDisliked.includes(userId) ) {

        if(like === 0){

          newDislikes ++
          console.log("Dislike = 1", sauce.dislikes, newDislikes)
          Sauce.updateOne({_id:req.params.id}, {$inc: {dislikes: -1}, $pull: {usersDisliked: userId}})
          .then(() => res.status(200).json({ message : "donnée obtenu"}))
          .catch(() => res.status(200).json({ error : error }))
      
          // Si dislike != 0 alors ont plante, c'est pas normal
        }else{
          return;
        }

      // sinon... L'utilisateur n'as ni like ni dislike
    }else{

      // On ajoute un like
      if(like === 1){
        newLikes ++
        console.log("like = 1", sauce.likes, "Utilisateur ajouté")
        Sauce.updateOne({_id:req.params.id}, {$inc: {likes: +1}, $push: {usersLiked: userId}}  // $pull -> retirer l'id
          
        )
        .then(() => res.status(200).json({ message : "donnée obtenu"}))
        .catch(() => res.status(200).json({ error : error }))
    
      // On ajoute un dislike
      }else if (like === -1){

        newDislikes ++
        Sauce.updateOne({_id:req.params.id}, {$inc: {dislikes: +1}, $push: {usersDisliked: userId}})
        .then(() => res.status(200).json({ message : "donnée obtenu"}))
        .catch(() => res.status(200).json({ error : error }))
    
        // Si like != 1 ou 2 alors ont plante, c'est pas normal
      }else{
        return;
      }
    }
  })
  .catch(() => res.status(200).json({ error : error }))
};