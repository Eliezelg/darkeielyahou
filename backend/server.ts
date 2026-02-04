/**
 * Point d'entrée du serveur Darkei Elyahou
 * Fichier minimal qui démarre l'application
 */

import 'dotenv/config';

import { createApp } from './src/app';
import { closeRedisConnection } from './src/config/session.config';
import { closePrismaConnection } from './src/controllers/forms.controller';

const app = createApp();
const PORT = process.env.PORT || 3001;

// Démarrer le serveur
const server = app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
  console.log(`Environnement: ${process.env.NODE_ENV || 'development'}`);
});

// Gestion de la fermeture propre du serveur
const shutdown = async (): Promise<void> => {
  console.log('Arrêt du serveur en cours...');

  server.close(async () => {
    console.log('Serveur arrêté');

    // Fermer les connexions
    await closeRedisConnection();
    await closePrismaConnection();
    console.log('Connexions fermées');

    process.exit(0);
  });
};

// Gestion des signaux d'arrêt
process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);

// Gestion des erreurs non capturées
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

process.on('uncaughtException', (error: Error) => {
  console.error('Uncaught Exception:', error);
  process.exit(1);
});
