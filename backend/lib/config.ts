/**
 * Configuration globale de l'application
 */

// SÉCURITÉ: Validation des variables d'environnement critiques
if (!process.env.SESSION_SECRET) {
  throw new Error('ERREUR CRITIQUE: SESSION_SECRET non défini. Définissez cette variable d\'environnement avec une valeur sécurisée (minimum 32 caractères).');
}

if (process.env.SESSION_SECRET.length < 32) {
  throw new Error('ERREUR CRITIQUE: SESSION_SECRET doit contenir au moins 32 caractères.');
}

export interface AdminConfigType {
  SESSION_SECRET: string;
  SESSION_MAX_AGE: number;
  SESSION_KEY: string;
}

export interface FormsConfigType {
  TYPES: string[];
  STATUS: {
    PENDING: string;
    IN_REVIEW: string;
    COMPLETED: string;
    REJECTED: string;
  };
}

export interface AppConfigType {
  FRONTEND_URL: string | undefined;
  ADMIN: AdminConfigType;
  FORMS: FormsConfigType;
}

export const APP_CONFIG: AppConfigType = {
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

// Pour la rétrocompatibilité
export const ADMIN_CONFIG = {
  SESSION_SECRET: APP_CONFIG.ADMIN.SESSION_SECRET,
  SESSION_MAX_AGE: APP_CONFIG.ADMIN.SESSION_MAX_AGE,
};
