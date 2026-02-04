/**
 * Service d'envoi d'emails pour Darkei Elyahou
 * Centralise tous les envois d'emails via Resend
 */

import { Resend } from 'resend';
import * as templates from './email-templates.service';
import * as attachments from './attachment.service';
import type {
  GalaFormData,
  SocialAidFormData,
  LoanRequestFormData,
  ContactFormData,
  EmailAttachment,
  SendEmailResult
} from '../types';

interface GenericEmailOptions {
  to: string;
  subject?: string;
  text?: string;
  html?: string;
  formData?: Partial<GalaFormData> | null;
}

class EmailService {
  private resend: Resend;
  private defaultFrom: string;
  private adminEmail: string;
  private fromName: string;

  constructor() {
    this.resend = new Resend(process.env.RESEND_API_KEY);
    this.defaultFrom = process.env.DEFAULT_FROM_EMAIL || 'contact@darkei-elyahou.org';
    this.adminEmail = process.env.ADMIN_EMAIL || 'contact@darkei-elyahou.org';
    this.fromName = 'Darkei Elyahou';
  }

  /**
   * Envoie un email via Resend
   */
  async send(options: {
    to: string;
    subject: string;
    text?: string;
    html?: string;
    emailAttachments?: EmailAttachment[];
  }): Promise<SendEmailResult> {
    const { to, subject, text, html, emailAttachments = [] } = options;

    try {
      const { data, error } = await this.resend.emails.send({
        from: `${this.fromName} <${this.defaultFrom}>`,
        to,
        subject,
        text,
        html,
        attachments: emailAttachments.map(att => ({
          filename: att.filename,
          content: att.content
        }))
      } as any);

      if (error) {
        console.error('Erreur Resend:', error.message);
        return { data: null, error: new Error(error.message) };
      }

      console.log(`Email envoyé avec succès à: ${to}, ID: ${data?.id}`);
      return { data, error: null };
    } catch (error) {
      const err = error as Error;
      console.error('Erreur lors de l\'envoi:', err.message);
      return { data: null, error: err };
    }
  }

  /**
   * Envoie la confirmation d'inscription au gala à l'utilisateur
   */
  async sendGalaUserConfirmation(formData: GalaFormData, baseDir: string): Promise<SendEmailResult> {
    const emailAttachments = await attachments.buildGalaAttachments(formData, baseDir);

    return this.send({
      to: formData.email,
      subject: `Confirmation d'inscription au gala de ${formData.city}`,
      text: templates.getGalaUserTextTemplate(formData),
      html: templates.getGalaUserTemplate(formData),
      emailAttachments
    });
  }

  /**
   * Envoie la notification d'inscription au gala à l'admin
   */
  async sendGalaAdminNotification(formData: GalaFormData, baseDir: string): Promise<SendEmailResult> {
    const emailAttachments = await attachments.buildGalaAttachments(formData, baseDir);

    return this.send({
      to: this.adminEmail,
      subject: `Nouvelle inscription au gala de ${formData.city} - ${formData.firstName} ${formData.lastName}`,
      html: templates.getGalaAdminTemplate(formData),
      emailAttachments
    });
  }

  /**
   * Envoie la notification de demande d'aide sociale à l'admin
   */
  async sendSocialAidAdminNotification(formData: SocialAidFormData): Promise<SendEmailResult> {
    return this.send({
      to: this.adminEmail,
      subject: `[AIDE SOCIALE] Nouvelle demande - ${formData.name || 'Anonyme'}`,
      text: templates.getSocialAidAdminTextTemplate(formData),
      html: templates.getSocialAidAdminTemplate(formData)
    });
  }

  /**
   * Envoie la notification de demande de prêt à l'admin
   */
  async sendLoanRequestAdminNotification(formData: LoanRequestFormData): Promise<SendEmailResult> {
    return this.send({
      to: this.adminEmail,
      subject: `[PRÊT] Nouvelle demande - ${formData.name || 'Anonyme'} - ${formData.amount || 'Montant non spécifié'}`,
      text: templates.getLoanRequestAdminTextTemplate(formData),
      html: templates.getLoanRequestAdminTemplate(formData)
    });
  }

  /**
   * Envoie la notification de message de contact à l'admin
   */
  async sendContactAdminNotification(formData: ContactFormData): Promise<SendEmailResult> {
    return this.send({
      to: this.adminEmail,
      subject: `[CONTACT] ${formData.subject || 'Message'} - ${formData.firstName || ''} ${formData.lastName || ''}`,
      text: templates.getContactAdminTextTemplate(formData),
      html: templates.getContactAdminTemplate(formData)
    });
  }

  /**
   * Envoie un email générique (route /api/send-email)
   */
  async sendGenericEmail(options: GenericEmailOptions, baseDir: string): Promise<SendEmailResult> {
    const { to, subject, text, html, formData } = options;

    // Construire les pièces jointes si formData contient une ville
    let emailAttachments: EmailAttachment[] = [];
    if (formData && formData.city) {
      emailAttachments = await attachments.buildGalaAttachments(formData, baseDir);
    }

    return this.send({
      to,
      subject: subject || 'Message du site Darkei Elyahou',
      text: text || '',
      html: html || text || '',
      emailAttachments
    });
  }

  /**
   * Envoie une copie de l'email à l'admin (route /api/send-email)
   */
  async sendAdminCopy(formData: GalaFormData): Promise<SendEmailResult> {
    return this.send({
      to: this.adminEmail,
      subject: `[ADMIN] Nouvelle inscription au gala de ${formData.city} - ${formData.firstName} ${formData.lastName}`,
      text: templates.getEmailCopyAdminTextTemplate(formData),
      html: templates.getEmailCopyAdminTemplate(formData)
    });
  }
}

// Singleton
const emailService = new EmailService();

export default emailService;
