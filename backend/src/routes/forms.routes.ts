/**
 * Routes pour la soumission des formulaires
 */

import { Router } from 'express';
import * as formsController from '../controllers/forms.controller';

const router = Router();

/**
 * POST /api/forms/:type
 * Soumet un formulaire du type spécifié
 */
router.post('/:type', formsController.submit);

export default router;
