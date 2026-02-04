// Configuration globale de l'application
// SÉCURITÉ: Validation des variables d'environnement critiques
if (!process.env.SESSION_SECRET) {
  throw new Error('ERREUR CRITIQUE: SESSION_SECRET non défini. Définissez cette variable d\'environnement avec une valeur sécurisée (minimum 32 caractères).');
}

if (process.env.SESSION_SECRET.length < 32) {
  throw new Error('ERREUR CRITIQUE: SESSION_SECRET doit contenir au moins 32 caractères.');
}

const APP_CONFIG = {
  // URL du frontend
  FRONTEND_URL: process.env.FRONTEND_URL,

  // Configuration de l'administration
  ADMIN: {
    // Clé de session (obligatoire via variable d'environnement)
    SESSION_SECRET: process.env.SESSION_SECRET,

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
      'DONATION',
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

// Pour la rétrocompatibilité (NOTE: PASSWORD supprimé pour sécurité - utiliser bcrypt + DB)
const ADMIN_CONFIG = {
  SESSION_SECRET: APP_CONFIG.ADMIN.SESSION_SECRET,
  SESSION_MAX_AGE: APP_CONFIG.ADMIN.SESSION_MAX_AGE,
};

module.exports = { APP_CONFIG, ADMIN_CONFIG };
