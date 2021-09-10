const mongoose = require('mongoose');

// donne un schéma de base pour se simplifier la vie. TOUT les paramètre Data Models y son (a séparer ?)
const userModel = mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});

module.exports = mongoose.model('User', userModel);