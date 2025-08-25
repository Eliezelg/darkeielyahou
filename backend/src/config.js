// Configuration de l'administration
const ADMIN_CONFIG = {
  // Mot de passe admin (à changer en production)
  PASSWORD: 'admin123',
  
  // Clé de session
  SESSION_SECRET: process.env.SESSION_SECRET || 'votre_clé_secrète_très_longue_et_sécurisée',
  
  // Durée de validité de la session (en millisecondes)
  SESSION_MAX_AGE: 24 * 60 * 60 * 1000, // 24 heures
};

module.exports = { ADMIN_CONFIG };
