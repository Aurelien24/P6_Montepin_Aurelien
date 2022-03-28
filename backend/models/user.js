const mongoose = require('mongoose');
// plugin pour avoir de meilleur erreur que celle de base
//const uniqueValidator = require('mongoose-unique-validator');

// donne un schéma de base pour se simplifier la vie. TOUT les paramètre Data Models y son (a séparer ?)
const userModel = mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});

// Permet d'avoir un message en francais en cas de doublon de mail. Le frontend ne peut pas l'interpréter.
// userModel.plugin(uniqueValidator, { message : 'Erreur, un compte avec le même {PATH} est déjà enregistrer.'  });

module.exports = mongoose.model('User', userModel);