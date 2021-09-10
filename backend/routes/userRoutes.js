const express = require('express');
const router = express.Router();

const stuffCtrl = require('../controllers/user');
const auth = require('../middleware/auth');

// Utilisateur
router.post('/signup', stuffCtrl.addUser); // Hachage du mot de passe de l'utilisateur, ajout de l'utilisateur à la base de données
router.post('/login', stuffCtrl.login); // Vérification des informations d'identification de l'utilisateur, renvoie l _id de l'utilisateur depuis la base de données et un token web JSON signé

module.exports = router;