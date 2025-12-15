// Configuration de l'administration
// SÉCURITÉ: Les secrets doivent être définis via variables d'environnement
if (!process.env.SESSION_SECRET) {
  throw new Error('ERREUR CRITIQUE: SESSION_SECRET non défini. Définissez cette variable d\'environnement avec une valeur sécurisée (minimum 32 caractères).');
}

if (process.env.SESSION_SECRET.length < 32) {
  throw new Error('ERREUR CRITIQUE: SESSION_SECRET doit contenir au moins 32 caractères.');
}

const ADMIN_CONFIG = {
  // Clé de session (obligatoire via variable d'environnement)
  SESSION_SECRET: process.env.SESSION_SECRET,

  // Durée de validité de la session (en millisecondes)
  SESSION_MAX_AGE: 24 * 60 * 60 * 1000, // 24 heures
};

module.exports = { ADMIN_CONFIG };
