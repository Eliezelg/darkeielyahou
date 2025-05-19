// Configuration de l'application
export const APP_CONFIG = {
  // URL de l'API (utilisée pour les appels API côté client)
  API_BASE_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001',
  
  // Configuration de l'administration
  ADMIN: {
    // Durée de la session en millisecondes (1 jour par défaut)
    SESSION_DURATION: 24 * 60 * 60 * 1000,
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
    ] as const,
    // Statuts possibles des demandes
    STATUS: {
      PENDING: 'En attente',
      IN_REVIEW: 'En cours',
      COMPLETED: 'Terminé',
      REJECTED: 'Rejeté',
    },
  },
} as const;

// Types dérivés de la configuration
export type FormType = typeof APP_CONFIG.FORMS.TYPES[number];
export type FormStatus = keyof typeof APP_CONFIG.FORMS.STATUS;

// Configuration des métadonnées par défaut
export const DEFAULT_METADATA = {
  title: 'Darkei Elyahou',
  description: 'Association Darkei Elyahou - Soutien aux familles et aux érudits de la Torah',
  keywords: ['Darkei Elyahou', 'Association', 'Torah', 'Kollel', 'Aide sociale'],
  author: 'Darkei Elyahou',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
  image: '/images/logo.png',
} as const;
