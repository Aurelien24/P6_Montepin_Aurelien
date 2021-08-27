const express = require('express');
const router = express.Router();

const stuffCtrl = require('../controllers/stuff');

// les chemains sont certainement faux exemple : router.delete('/:id', stuffCtrl.deleteThing);
router.post('/api/auth/signup', stuffCtrl.addUser); // Hachage du mot de passe de l'utilisateur, ajout de l'utilisateur à la base de données
router.post('/api/auth/login',  stuffCtrl.login); // Vérification des informations d'identification de l'utilisateur, renvoie l _id de l'utilisateur depuis la base de données et un token web JSON signé
router.get('/api/sauces',  stuffCtrl.sauces); // Renvoie un tableau detoutes les sauces de la base de données.
router.get('/api/sauces/:id', stuffCtrl.oneSauces) // Renvoie la sauce avec l’_id fourni.
router.post('/api/sauces', stuffCtrl.saveSauces); // Enregistre une sauce avec imageUrl.
router.put('/api/sauces/:id', stuffCtrl.majSauces); // Met a jour une sauce et potentiellement sont image.
router.delete('/api/sauces/:id', stuffCtrl.delSauces); // Supprime la sauce et son id
router.post('/api/sauces/:id/like', stuffCtrl.likes); // Ajoute / retire les likes

module.exports = router;