const express = require('express');
const router = express.Router();

const stuffCtrl = require('../controllers/sauce');

// Auth possède un faille : si il n'y as pas d'userId -> c'est bon. 
// Résultat : possibilisé de modifier les sauces des autre via postman avec son token si ont as retirer l'userId de la demande (bloquer directement sur les route avec une seconde vérification)
// Auth vérifie donc uniquement la validité du token.
const auth = require('../middleware/auth');

// Gestion des images
const multer = require('../middleware/multer-config');

// Sauces
router.get('', auth, stuffCtrl.sauces); // Renvoie un tableau detoutes les sauces de la base de données.
router.get('/:id', auth, stuffCtrl.oneSauces) // Renvoie la sauce avec l’_id fourni.
router.post('', auth, multer, stuffCtrl.saveSauces); // Enregistre une sauce avec imageUrl.
router.put('/:id', auth, multer, stuffCtrl.majSauces); // Met a jour une sauce et potentiellement sont image.
router.delete('/:id', auth, stuffCtrl.delSauces); // Supprime la sauce et son id
router.post('/:id/like', auth, stuffCtrl.likes); // Ajoute / retire les likes

module.exports = router;