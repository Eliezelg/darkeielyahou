/**
 * Routes d'envoi d'emails publiques
 */

import { Router, Request, Response } from 'express';
import * as path from 'path';
import { emailRateLimiter } from '../middleware/rate-limit';
import emailService from '../services/email.service';
import type { GalaFormData } from '../types';

const router = Router();

// Répertoire de base pour les pièces jointes
const BASE_DIR = path.join(__dirname, '../..');

interface SendEmailBody {
  to: string;
  subject?: string;
  text?: string;
  html?: string;
  sendCopy?: boolean;
  formData?: Partial<GalaFormData> | null;
}

/**
 * POST /api/send-email
 * Envoie un email avec pièces jointes optionnelles
 */
router.post('/send-email', emailRateLimiter, async (req: Request, res: Response): Promise<void | Response> => {
  try {
    const {
      to,
      subject = 'Message du site Darkei Elyahou',
      text = '',
      html = '',
      sendCopy = false,
      formData = null
    } = req.body as SendEmailBody;

    // Validation de l'email destinataire
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!to || !emailRegex.test(to)) {
      return res.status(400).json({
        success: false,
        error: 'Adresse email destinataire invalide'
      });
    }

    // Vérification qu'il y a du contenu à envoyer
    if ((!text || text.trim() === '') && (!html || html.trim() === '')) {
      return res.status(400).json({
        success: false,
        error: 'Le contenu du message est vide',
      });
    }

    // Envoi de l'email à l'utilisateur
    const { error: userError } = await emailService.sendGenericEmail({
      to,
      subject,
      text,
      html,
      formData
    }, BASE_DIR);

    if (userError) {
      throw new Error(`Erreur lors de l'envoi de l'email à l'utilisateur: ${userError.message}`);
    }

    // Si demandé, envoi d'une copie à l'administrateur
    if (sendCopy && formData) {
      const { error: adminError } = await emailService.sendAdminCopy(formData as GalaFormData);

      if (adminError) {
        console.error(`Erreur lors de l'envoi de la copie à l'administrateur: ${adminError.message}`);
      }
    }

    res.status(200).json({
      success: true,
      message: 'Email envoyé avec succès',
    });
  } catch (error) {
    const err = error as Error;
    console.error('Erreur lors de l\'envoi de l\'email:', err);

    res.status(500).json({
      success: false,
      error: 'Une erreur est survenue lors de l\'envoi de l\'email',
      details: process.env.NODE_ENV === 'development' ? err.message : undefined,
    });
  }
});

export default router;
