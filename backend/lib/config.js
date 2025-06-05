// Configuration globale de l'application
const APP_CONFIG = {
  // URL du frontend
  FRONTEND_URL: process.env.FRONTEND_URL,
  
  // Configuration de l'administration
  ADMIN: {
    // Mot de passe admin (à changer en production)
    PASSWORD: process.env.ADMIN_PASSWORD || 'admin123',
    
    // Clé de session
    SESSION_SECRET: process.env.SESSION_SECRET || 'votre_clé_secrète_très_longue_et_sécurisée',
    
    // Durée de validité de la session (en millisecondes)
    SESSION_MAX_AGE: 24 * 60 * 60 * 1000, // 24 heures
    
    // Clé de stockage pour le token d'authentification
    SESSION_KEY: 'darkei_elyahou_admin_session',
  },
  
  // Configuration des formulaires
  FORMS: {
    // Types de formulaires disponibles
    TYPES: [
      'CONTACT',
      'SOCIAL_AID',
      'GALA_REGISTRATION',
      'LOAN_REQUEST',
      'KOLLEL_MEMBERSHIP',
    ],
    // Statuts possibles des demandes
    STATUS: {
      PENDING: 'En attente',
      IN_REVIEW: 'En cours',
      COMPLETED: 'Terminé',
      REJECTED: 'Rejeté',
    },
  },
};

// Pour la rétrocompatibilité
const ADMIN_CONFIG = {
  PASSWORD: APP_CONFIG.ADMIN.PASSWORD,
  SESSION_SECRET: APP_CONFIG.ADMIN.SESSION_SECRET,
  SESSION_MAX_AGE: APP_CONFIG.ADMIN.SESSION_MAX_AGE,
};

module.exports = { APP_CONFIG, ADMIN_CONFIG };
