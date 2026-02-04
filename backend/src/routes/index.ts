/**
 * Agrégateur de toutes les routes de l'API
 */

import { Router, Request, Response } from 'express';
import emailRoutes from './email.routes';
import formsRoutes from './forms.routes';
import { validateCsrfToken, getCsrfToken } from '../middleware/csrf';

// Import des routes (utilise require car ces modules utilisent export =)
import adminRoutes = require('./admin/index');
import exportRoutes = require('./export');

const router = Router();

/**
 * Configure toutes les routes sur le router
 */
export function configureRoutes(): Router {
  // Route de santé
  router.get('/health', (_req: Request, res: Response) => {
    res.status(200).json({ status: 'OK', message: 'Le serveur fonctionne correctement' });
  });

  // Route pour obtenir un token CSRF
  router.get('/csrf-token', getCsrfToken);

  // Routes publiques
  router.use('/', emailRoutes);
  router.use('/forms', formsRoutes);

  // Routes d'administration
  router.use('/admin', adminRoutes);

  // Routes d'exportation (protégées par CSRF)
  router.use('/export', validateCsrfToken, exportRoutes);

  return router;
}

export { router };
