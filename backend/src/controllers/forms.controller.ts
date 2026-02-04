/**
 * Controller pour la soumission des formulaires
 */

import type { Request, Response } from 'express';
import { PrismaClient, $Enums } from '../../generated/prisma';
import emailService from '../services/email.service';
import * as path from 'path';
import type { GalaFormData, SocialAidFormData, LoanRequestFormData, ContactFormData } from '../types';

const prisma = new PrismaClient();
const BASE_DIR = path.join(__dirname, '../..');

// Types de formulaires valides
export const VALID_TYPES = [
  'SOCIAL_AID',
  'LOAN_REQUEST',
  'GALA_REGISTRATION',
  'DONATION',
  'CONTACT',
  'OTHER'
] as const;

export type FormType = typeof VALID_TYPES[number];

// Mapping types frontend → Prisma
export const FORM_TYPE_MAPPING: Record<string, $Enums.FormType> = {
  'SOCIAL_AID': $Enums.FormType.SOCIAL_AID,
  'LOAN_REQUEST': $Enums.FormType.LOAN_REQUEST,
  'GALA_REGISTRATION': $Enums.FormType.GALA,
  'DONATION': $Enums.FormType.DONATION,
  'CONTACT': $Enums.FormType.OTHER,
  'OTHER': $Enums.FormType.OTHER
};

// Messages de confirmation par type
const CONFIRMATION_MESSAGES: Record<string, string> = {
  'CONTACT': 'Votre message a été envoyé avec succès. Nous vous répondrons dans les plus brefs délais.',
  'SOCIAL_AID': 'Votre demande d\'aide sociale a été enregistrée. Un de nos représentants vous contactera prochainement.',
  'GALA': 'Votre inscription au gala a été confirmée. Merci pour votre participation.',
  'GALA_REGISTRATION': 'Votre inscription au gala a été confirmée. Merci pour votre participation.',
  'LOAN_REQUEST': 'Votre demande de prêt a été soumise. Elle sera étudiée dans les plus brefs délais.',
  'KOLLEL': 'Votre inscription au Kollel a été enregistrée. Nous vous contacterons pour la suite des démarches.',
  'DEFAULT': 'Votre demande a été soumise avec succès.'
};

/**
 * Soumet un formulaire et envoie les notifications appropriées
 */
export async function submit(req: Request, res: Response): Promise<void | Response> {
  try {
    const { type } = req.params;
    const formData = req.body as Record<string, unknown>;
    const userEmail = req.session?.user?.email || null;

    // Log minimal (pas de données sensibles)
    if (process.env.NODE_ENV !== 'production') {
      console.log(`Réception d'un formulaire de type: ${type}`);
    }

    // Validation du type de formulaire
    if (!VALID_TYPES.includes(type as FormType)) {
      console.log('Type de formulaire invalide:', type);
      console.log('Types valides:', VALID_TYPES);
      return res.status(400).json({
        success: false,
        error: 'Type de formulaire invalide',
      });
    }

    // Convertir le type de formulaire frontend vers le type Prisma
    const prismaFormType = FORM_TYPE_MAPPING[type] || $Enums.FormType.OTHER;

    // Création de la demande en BDD
    const request = await prisma.formRequest.create({
      data: {
        formType: prismaFormType,
        formData: formData as any,
        createdBy: userEmail,
        status: 'PENDING',
      },
    });

    // Envoi des emails selon le type de formulaire
    await sendEmailsByType(type, formData);

    // Message de confirmation
    const confirmationMessage = CONFIRMATION_MESSAGES[type] || CONFIRMATION_MESSAGES.DEFAULT;

    res.status(201).json({
      success: true,
      message: confirmationMessage,
      data: request,
    });
  } catch (error) {
    const err = error as Error;
    console.error('Erreur lors de la soumission du formulaire:', err);
    res.status(500).json({
      success: false,
      error: 'Une erreur est survenue lors de la soumission du formulaire',
      details: process.env.NODE_ENV === 'development' ? err.message : undefined,
    });
  }
}

/**
 * Envoie les emails appropriés selon le type de formulaire
 */
async function sendEmailsByType(type: string, formData: Record<string, unknown>): Promise<void> {
  try {
    switch (type) {
      case 'GALA_REGISTRATION':
        const galaData = formData as unknown as GalaFormData;
        if (galaData.email) {
          // Email de confirmation à l'utilisateur
          const { error: userError } = await emailService.sendGalaUserConfirmation(galaData, BASE_DIR);
          if (userError) {
            console.error('Erreur email utilisateur gala:', userError.message);
          }

          // Notification à l'admin
          const { error: adminError } = await emailService.sendGalaAdminNotification(galaData, BASE_DIR);
          if (adminError) {
            console.error('Erreur email admin gala:', adminError.message);
          }
        }
        break;

      case 'SOCIAL_AID':
        const { error: socialError } = await emailService.sendSocialAidAdminNotification(formData as unknown as SocialAidFormData);
        if (socialError) {
          console.error('Erreur email aide sociale:', socialError.message);
        }
        break;

      case 'LOAN_REQUEST':
        const { error: loanError } = await emailService.sendLoanRequestAdminNotification(formData as unknown as LoanRequestFormData);
        if (loanError) {
          console.error('Erreur email prêt:', loanError.message);
        }
        break;

      case 'CONTACT':
        const { error: contactError } = await emailService.sendContactAdminNotification(formData as unknown as ContactFormData);
        if (contactError) {
          console.error('Erreur email contact:', contactError.message);
        }
        break;

      default:
        console.log(`Pas d'email configuré pour le type: ${type}`);
    }
  } catch (error) {
    console.error("Erreur lors de l'envoi des emails:", error);
    // On ne propage pas l'erreur pour ne pas bloquer la soumission
  }
}

/**
 * Ferme la connexion Prisma proprement
 */
export async function closePrismaConnection(): Promise<void> {
  await prisma.$disconnect();
}
