/**
 * Configuration de l'application Express
 * Point d'entrée principal de l'application
 */

import express, { Application, Request, Response, NextFunction } from 'express';
import { configureExpress } from './config/express.config';
import { configureSession } from './config/session.config';
import { csrfTokenMiddleware } from './middleware/csrf';
import { configureRoutes } from './routes/index';

/**
 * Crée et configure l'application Express
 */
export function createApp(): Application {
  const app = express();

  // Configuration des middlewares de base (Helmet, CORS, JSON)
  configureExpress(app);

  // Configuration de la session (Redis si disponible)
  configureSession(app);

  // Middleware CSRF
  app.use(csrfTokenMiddleware);

  // Configuration des routes
  const apiRouter = configureRoutes();
  app.use('/api', apiRouter);

  // Gestion des erreurs 404
  app.use((_req: Request, res: Response) => {
    res.status(404).json({
      success: false,
      error: 'Route non trouvée',
    });
  });

  // Gestion des erreurs globales
  app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
    console.error('Erreur non gérée:', err);
    res.status(500).json({
      success: false,
      error: 'Une erreur est survenue sur le serveur',
      details: process.env.NODE_ENV === 'development' ? err.message : undefined,
    });
  });

  return app;
}
