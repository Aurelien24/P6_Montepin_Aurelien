require('dotenv').config()

const express = require('express');
const mongoose = require('mongoose');

const sauceRoutes = require('./routes/sauceRoutes');
const userRoutes = require('./routes/userRoutes');
const path = require('path');

mongoose.connect(process.env.MONGOOSE_CONNECT,
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

const app = express();

// Permet de controler les accès au server a partir de l'API. Sinon le système bloque automatiquement en raison d'un manque d'autorisation. Considérer comme piratage
// Autorise un peut tout ^^'
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use(express.json());

app.use('/api/sauces', sauceRoutes);
app.use('/api/auth', userRoutes);
app.use('/images', express.static(path.join(__dirname, 'images')));

module.exports = app;