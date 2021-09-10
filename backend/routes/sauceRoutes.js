const express = require('express');
const router = express.Router();

const stuffCtrl = require('../controllers/sauce');

// Sauces
router.get('',  stuffCtrl.sauces); // Renvoie un tableau detoutes les sauces de la base de données.
router.get('/:id', stuffCtrl.oneSauces) // Renvoie la sauce avec l’_id fourni.
router.post('', stuffCtrl.saveSauces); // Enregistre une sauce avec imageUrl.
router.put('/:id', stuffCtrl.majSauces); // Met a jour une sauce et potentiellement sont image.
router.delete('/:id', stuffCtrl.delSauces); // Supprime la sauce et son id
router.post('/:id/like', stuffCtrl.likes); // Ajoute / retire les likes

module.exports = router;