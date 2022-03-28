const mongoose = require('mongoose');
// plugin pour avoir de meilleur erreur que celle de base
// const uniqueValidator = require('mongoose-unique-validator');

// donne un schéma de base pour se simplifier la vie. TOUT les paramètre Data Models y son (a séparer ?)
const sauceModel = mongoose.Schema({
  userId: { type: String, required: true },
  name: { type: String, required: true },
  manufacturer: { type: String, required: true },
  description: { type: String, required: true },
  mainPepper: { type: String, required: true },
  imageUrl: { type: String, required: true },
  heat: { type: Number, required: true },

  // vérif model doc
  likes: { type: Number, required: false },
  dislikes: { type: Number, required: false },
  usersLiked: { type: Array, required: false },
  usersDisliked: { type: Array, required: false }
});
//sauceModel.plugin(uniqueValidator);

module.exports = mongoose.model('Sauce', sauceModel);