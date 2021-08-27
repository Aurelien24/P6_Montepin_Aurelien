const mongoose = require('mongoose');


// donne un schéma de base pour se simplifier la vie. TOUT les paramètre Data Models y son (a séparer ?)
const thingSchema = mongoose.Schema({
  userId: { type: String, required: true },
  name: { type: String, required: true },
  manufacturer: { type: String, required: true },
  description: { type: String, required: true },
  mainPepper: { type: String, required: true },
  imageUrl: { type: String, required: true },
  heat: { type: Number, required: true },
  likes: { type: Number, required: true },
  dislikes: { type: Number, required: true },
  usersLiked: { type: Number, required: true },
  usersDisliked: { type: Number, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
});

module.exports = mongoose.model('Thing', thingSchema);