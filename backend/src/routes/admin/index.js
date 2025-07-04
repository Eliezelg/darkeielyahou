const express = require('express');
const router = express.Router();
const { PrismaClient } = require('../../../generated/prisma');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { ADMIN_CONFIG } = require('../../../lib/config');
const { requireAuth } = require('../../middleware/auth');

const prisma = new PrismaClient();

// Sous-routes
console.log('Tentative d\'importation du module forms avec chemin absolu...');
const path = require('path');
try {
  const formsRouter = require(path.join(__dirname, 'forms'));
  console.log('Module forms importé avec succès');
  // Debug: afficher ce qui est exporté par forms.js
  console.log('Contenu exporté par forms.js:', Object.keys(formsRouter));
  console.log('formsRouter est un routeur Express:', formsRouter && typeof formsRouter.use === 'function');
  
  router.use('/forms', formsRouter);
  console.log('Route /forms montée sur le routeur admin à ' + new Date().toISOString());
} catch (error) {
  console.error('ERREUR lors de l\'importation du module forms:', error);
}

// Route de connexion admin
router.post('/login', async (req, res) => {
  try {
    const { password } = req.body;
    
    // Affichage des détails de la requête pour débogage
    console.log('Tentative de connexion admin');
    console.log('Corps de la requête:', req.body);
    console.log('Mot de passe reçu:', password ? '****' : 'non fourni');
    console.log('Mot de passe admin configuré (caché):', ADMIN_CONFIG.PASSWORD ? '****' : 'non configuré');
    
    // Vérification uniquement du mot de passe
    if (!password || password !== ADMIN_CONFIG.PASSWORD) {
      console.log('Échec de l\'authentification: mot de passe incorrect ou manquant');
      return res.status(401).json({
        success: false,
        error: 'Mot de passe incorrect'
      });
    }
    console.log('Authentification réussie');
    
    // Création du token JWT
    console.log('Génération du token JWT avec SESSION_SECRET');
    const token = jwt.sign(
      { username: 'admin', isAdmin: true },
      ADMIN_CONFIG.SESSION_SECRET || process.env.JWT_SECRET || 'votre_clé_secrète_jwt',
      { expiresIn: '24h' } // Expiration par défaut de 24 heures
    );
    console.log('Token JWT généré avec succès');
    
    // Définir une variable de session pour l'admin
    req.session.user = {
      username: 'admin',
      isAdmin: true,
      loginTime: new Date()
    };
    
    await new Promise((resolve, reject) => {
      req.session.save(err => {
        if (err) {
          console.error('Erreur lors de l\'enregistrement de la session:', err);
          reject(err);
        } else {
          resolve();
        }
      });
    });
    
    console.log('Envoi de la réponse avec le token JWT');
    res.status(200).json({
      success: true,
      message: 'Connexion réussie',
      authToken: token,                // Renommé token en authToken pour correspondre à ce qu'attend le frontend
      expiresIn: '24h'                 // Valeur fixe pour correspondre à la durée configurée plus haut
    });
    console.log('Réponse envoyée avec succès');
  } catch (error) {
    console.error('Erreur lors de la connexion admin:', error);
    res.status(500).json({
      success: false,
      error: 'Une erreur est survenue lors de la connexion',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
});

// Route de déconnexion
router.post('/logout', (req, res) => {
  try {
    // Destruction de la session
    req.session.destroy((err) => {
      if (err) {
        console.error('Erreur lors de la déconnexion:', err);
        return res.status(500).json({
          success: false,
          error: 'Erreur lors de la déconnexion'
        });
      }
      
      res.clearCookie('darkei.sid');
      
      res.status(200).json({
        success: true,
        message: 'Déconnexion réussie'
      });
    });
  } catch (error) {
    console.error('Erreur lors de la déconnexion:', error);
    res.status(500).json({
      success: false,
      error: 'Une erreur est survenue lors de la déconnexion',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
});

// Vérification du profil admin (authentification)
router.get('/profile', requireAuth, (req, res) => {
  res.status(200).json({
    success: true,
    user: {
      username: req.user.username,
      isAdmin: req.user.isAdmin
    }
  });
});

// Aucune route requests - Ce code a été nettoyé pour garder uniquement les fonctionnalités de formulaires

module.exports = router;
