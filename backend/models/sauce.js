const mongoose = require('mongoose');


// donne un schéma de base pour se simplifier la vie. TOUT les paramètre Data Models y son (a séparer ?)
const sauceModel = mongoose.Schema({
  userId: { type: String, required: false },
  name: { type: String, required: false },
  manufacturer: { type: String, required: false },
  description: { type: String, required: false },
  mainPepper: { type: String, required: false },
  imageUrl: { type: String, required: false },
  heat: { type: Number, required: false },
  likes: { type: Number, required: false },
  dislikes: { type: Number, required: false },
  usersLiked: { type: Number, required: false },
  usersDisliked: { type: Number, required: false },
});

module.exports = mongoose.model('Sauce', sauceModel);