/**
 * Service de templates d'emails pour Darkei Elyahou
 * Centralise tous les templates HTML pour les emails
 */

import type { GalaFormData, SocialAidFormData, LoanRequestFormData, ContactFormData } from '../types';

export const PRIMARY_COLOR = 'hsl(240, 85%, 25%)';

interface BaseTemplateOptions {
  showLogo?: boolean;
}

/**
 * Template de base pour les emails avec header et footer
 */
export function getBaseTemplate(content: string, options: BaseTemplateOptions = {}): string {
  const { showLogo = true } = options;

  return `
    <!DOCTYPE html>
    <html lang="fr">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>
        body {
          font-family: Arial, sans-serif;
          line-height: 1.6;
          color: #333;
          margin: 0;
          padding: 0;
          background-color: #f5f5f5;
        }
        .email-container {
          max-width: 600px;
          margin: 0 auto;
          background-color: white;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        .header-banner {
          background-color: ${PRIMARY_COLOR};
          background: linear-gradient(135deg, ${PRIMARY_COLOR} 0%, hsl(240, 85%, 30%) 100%);
          padding: 30px 20px;
          text-align: center;
          border-top-left-radius: 8px;
          border-top-right-radius: 8px;
        }
        .header-banner img {
          max-width: 180px;
          height: auto;
          filter: brightness(1.1);
        }
        .content {
          padding: 30px 25px;
          background-color: white;
        }
        h1 {
          color: ${PRIMARY_COLOR};
          font-size: 24px;
          margin-bottom: 20px;
          border-bottom: 2px solid ${PRIMARY_COLOR};
          padding-bottom: 10px;
        }
        h2 {
          color: ${PRIMARY_COLOR};
          font-size: 18px;
          margin-top: 25px;
          margin-bottom: 15px;
        }
        .details-table {
          background-color: #f8f9fa;
          border-radius: 8px;
          padding: 20px;
          margin: 20px 0;
        }
        .details-table p {
          margin: 8px 0;
          line-height: 1.5;
        }
        table {
          width: 100%;
          border-collapse: collapse;
          margin: 20px 0;
        }
        th, td {
          padding: 12px;
          border: 1px solid #ddd;
          text-align: left;
        }
        th {
          background-color: #f2f2f2;
          font-weight: bold;
        }
        .footer {
          background-color: ${PRIMARY_COLOR};
          color: white;
          text-align: center;
          padding: 20px;
          font-size: 12px;
          border-bottom-left-radius: 8px;
          border-bottom-right-radius: 8px;
        }
        .signature {
          margin-top: 30px;
          padding-top: 20px;
          border-top: 1px solid #e0e0e0;
          font-style: italic;
        }
        .highlight {
          background-color: #fff3cd;
          border-left: 4px solid #ffc107;
          padding: 15px;
          margin: 20px 0;
          border-radius: 4px;
        }
        .info {
          background-color: #e7f3ff;
          border-left: 4px solid #2196F3;
          padding: 15px;
          margin: 20px 0;
        }
        .urgent {
          background-color: #fff3cd;
          border-left: 4px solid #ffc107;
          padding: 15px;
          margin: 20px 0;
        }
        .message-box {
          background-color: #f9f9f9;
          border: 1px solid #ddd;
          padding: 20px;
          margin: 20px 0;
          border-radius: 8px;
        }
      </style>
    </head>
    <body>
      <div class="email-container">
        ${showLogo ? `
        <div class="header-banner">
          <img src="cid:logo" alt="Logo Darkei Elyahou" />
        </div>
        ` : ''}

        <div class="content">
          ${content}
        </div>

        <div class="footer">
          <p>&copy; ${new Date().getFullYear()} Darkei Elyahou - Tous droits réservés</p>
          <p>Association à but non lucratif - Soutien à la communauté</p>
        </div>
      </div>
    </body>
    </html>
  `;
}

/**
 * Template email confirmation inscription Gala (utilisateur)
 */
export function getGalaUserTemplate(formData: GalaFormData): string {
  const totalAttendees = Number(formData.maleAttendees) + Number(formData.femaleAttendees);
  const phone = `${formData.phoneCountryCode || ''}${formData.phoneNumber || formData.phone || ''}`;

  const content = `
    <h1>Confirmation d'inscription</h1>

    <p>Bonjour <strong>${formData.firstName}</strong>,</p>

    <div class="highlight">
      <p>Nous avons bien reçu votre inscription pour le gala de <strong>${formData.city}</strong>.</p>
    </div>

    <h2>Détails de votre inscription</h2>
    <div class="details-table">
      <p><strong>Prénom :</strong> ${formData.firstName}</p>
      <p><strong>Nom :</strong> ${formData.lastName}</p>
      <p><strong>Email :</strong> ${formData.email}</p>
      <p><strong>Téléphone :</strong> ${phone}</p>
      <p><strong>Ville du gala :</strong> ${formData.city}</p>
      <p><strong>Nombre de participants :</strong> ${totalAttendees} personnes (${formData.maleAttendees} hommes, ${formData.femaleAttendees} femmes)</p>
    </div>

    <p>Vous trouverez ci-joint l'affiche du gala de <strong>${formData.city}</strong> avec tous les détails de l'événement.</p>

    <p>Nous vous contacterons prochainement avec plus d'informations concernant le déroulement de la soirée.</p>

    <div class="signature">
      <p>Cordialement,<br><strong>L'équipe Darkei Elyahou</strong></p>
    </div>
  `;

  return getBaseTemplate(content);
}

/**
 * Template texte simple inscription Gala (utilisateur)
 */
export function getGalaUserTextTemplate(formData: GalaFormData): string {
  const totalAttendees = Number(formData.maleAttendees) + Number(formData.femaleAttendees);
  const phone = `${formData.phoneCountryCode || ''}${formData.phoneNumber || formData.phone || ''}`;

  return `
Bonjour ${formData.firstName},

Nous avons bien reçu votre inscription pour le gala de ${formData.city}.

Détails de votre inscription :
- Prénom: ${formData.firstName}
- Nom: ${formData.lastName}
- Email: ${formData.email}
- Téléphone: ${phone}
- Ville du gala: ${formData.city}
- Participants: ${totalAttendees} personnes (${formData.maleAttendees} hommes, ${formData.femaleAttendees} femmes)

Nous vous contacterons prochainement avec plus de détails concernant le déroulement de la soirée.

Cordialement,
L'équipe Darkei Elyahou
`.trim();
}

/**
 * Template email notification Gala (admin)
 */
export function getGalaAdminTemplate(formData: GalaFormData): string {
  const phone = `${formData.phoneCountryCode || ''}${formData.phoneNumber || formData.phone || ''}`;

  const content = `
    <h1>Nouvelle inscription au gala de ${formData.city}</h1>
    <p><strong>Date d'inscription:</strong> ${new Date().toLocaleString('fr-FR')}</p>

    <table>
      <tr>
        <td><strong>Prénom</strong></td>
        <td>${formData.firstName}</td>
      </tr>
      <tr>
        <td><strong>Nom</strong></td>
        <td>${formData.lastName}</td>
      </tr>
      <tr>
        <td><strong>Email</strong></td>
        <td>${formData.email}</td>
      </tr>
      <tr>
        <td><strong>Téléphone</strong></td>
        <td>${phone}</td>
      </tr>
      <tr>
        <td><strong>Ville</strong></td>
        <td>${formData.city}</td>
      </tr>
      <tr>
        <td><strong>Hommes</strong></td>
        <td>${formData.maleAttendees}</td>
      </tr>
      <tr>
        <td><strong>Femmes</strong></td>
        <td>${formData.femaleAttendees}</td>
      </tr>
    </table>

    <p>Ces informations ont été enregistrées dans la base de données et un email de confirmation a été envoyé au participant avec l'affiche du gala de ${formData.city}.</p>
  `;

  return getBaseTemplate(content, { showLogo: false });
}

/**
 * Template email notification Aide Sociale (admin)
 */
export function getSocialAidAdminTemplate(formData: SocialAidFormData): string {
  const content = `
    <h1>Nouvelle demande d'aide sociale</h1>
    <p><strong>Date:</strong> ${new Date().toLocaleString('fr-FR')}</p>

    <div class="urgent">
      <strong>Action requise:</strong> Veuillez contacter cette personne dans les plus brefs délais.
    </div>

    <table>
      <tr><td><strong>Nom</strong></td><td>${formData.name || 'Non spécifié'}</td></tr>
      <tr><td><strong>Téléphone</strong></td><td>${formData.phone || 'Non spécifié'}</td></tr>
      <tr><td><strong>Ville</strong></td><td>${formData.city || 'Non spécifié'}</td></tr>
      <tr><td><strong>Enfants</strong></td><td>${formData.children || 'Non spécifié'}</td></tr>
      <tr><td><strong>Type d'aide</strong></td><td>${formData.aidType || 'Non spécifié'}</td></tr>
      <tr><td><strong>Situation</strong></td><td>${formData.situation || 'Non spécifié'}</td></tr>
    </table>
  `;

  return getBaseTemplate(content, { showLogo: false });
}

/**
 * Template texte simple Aide Sociale (admin)
 */
export function getSocialAidAdminTextTemplate(formData: SocialAidFormData): string {
  return `Nouvelle demande d'aide sociale de ${formData.name}. Téléphone: ${formData.phone}. Ville: ${formData.city}. Type d'aide: ${formData.aidType}. Situation: ${formData.situation}`;
}

/**
 * Template email notification Prêt (admin)
 */
export function getLoanRequestAdminTemplate(formData: LoanRequestFormData): string {
  const content = `
    <h1>Nouvelle demande de prêt</h1>
    <p><strong>Date:</strong> ${new Date().toLocaleString('fr-FR')}</p>

    <div class="info">
      <strong>Rappel:</strong> Contacter le demandeur pour convenir d'un rendez-vous.
    </div>

    <table>
      <tr><td><strong>Nom</strong></td><td>${formData.name || 'Non spécifié'}</td></tr>
      <tr><td><strong>Téléphone</strong></td><td>${formData.phone || 'Non spécifié'}</td></tr>
      <tr><td><strong>Montant souhaité</strong></td><td>${formData.amount || 'Non spécifié'}</td></tr>
      <tr><td><strong>Objet du prêt</strong></td><td>${formData.loanPurpose || 'Non spécifié'}</td></tr>
      <tr><td><strong>Disponibilité RDV</strong></td><td>${formData.availability || 'Non spécifié'}</td></tr>
    </table>
  `;

  return getBaseTemplate(content, { showLogo: false });
}

/**
 * Template texte simple Prêt (admin)
 */
export function getLoanRequestAdminTextTemplate(formData: LoanRequestFormData): string {
  return `Nouvelle demande de prêt de ${formData.name}. Téléphone: ${formData.phone}. Montant: ${formData.amount}. Objet: ${formData.loanPurpose}. Disponibilité: ${formData.availability}`;
}

/**
 * Template email notification Contact (admin)
 */
export function getContactAdminTemplate(formData: ContactFormData): string {
  const content = `
    <h1>Nouveau message de contact</h1>
    <p><strong>Date:</strong> ${new Date().toLocaleString('fr-FR')}</p>

    <table>
      <tr><td><strong>Nom</strong></td><td>${formData.lastName || ''} ${formData.firstName || ''}</td></tr>
      <tr><td><strong>Email</strong></td><td><a href="mailto:${formData.email}">${formData.email || 'Non spécifié'}</a></td></tr>
      <tr><td><strong>Téléphone</strong></td><td>${formData.phone || 'Non spécifié'}</td></tr>
      <tr><td><strong>Sujet</strong></td><td>${formData.subject || 'Non spécifié'}</td></tr>
    </table>

    <h2>Message</h2>
    <div class="message-box">
      ${(formData.message || 'Aucun message').replace(/\n/g, '<br>')}
    </div>
  `;

  return getBaseTemplate(content, { showLogo: false });
}

/**
 * Template texte simple Contact (admin)
 */
export function getContactAdminTextTemplate(formData: ContactFormData): string {
  return `Nouveau message de ${formData.firstName} ${formData.lastName}. Email: ${formData.email}. Sujet: ${formData.subject}. Message: ${formData.message}`;
}

/**
 * Template email copie admin (pour /api/send-email)
 */
export function getEmailCopyAdminTemplate(formData: GalaFormData): string {
  const content = `
    <h1>Nouvelle inscription au gala de ${formData.city}</h1>
    <p><strong>Date d'inscription:</strong> ${new Date().toLocaleString('fr-FR')}</p>

    <table>
      <tr>
        <th colspan="2">Informations personnelles</th>
      </tr>
      <tr>
        <td><strong>Prénom</strong></td>
        <td>${formData.firstName}</td>
      </tr>
      <tr>
        <td><strong>Nom</strong></td>
        <td>${formData.lastName}</td>
      </tr>
      <tr>
        <td><strong>Email</strong></td>
        <td><a href="mailto:${formData.email}">${formData.email}</a></td>
      </tr>
      <tr>
        <td><strong>Téléphone</strong></td>
        <td>${formData.phone}</td>
      </tr>
      <tr style="background-color: #e5f2f7;">
        <td><strong>Ville du gala</strong></td>
        <td>${formData.city}</td>
      </tr>
      <tr>
        <td><strong>Nombre total de participants</strong></td>
        <td>${formData.totalAttendees} personnes</td>
      </tr>
      <tr>
        <td><strong>Hommes</strong></td>
        <td>${formData.maleAttendees}</td>
      </tr>
      <tr>
        <td><strong>Femmes</strong></td>
        <td>${formData.femaleAttendees}</td>
      </tr>
    </table>

    <p>Ces informations ont été enregistrées dans la base de données et un email de confirmation a été envoyé au participant avec l'affiche du gala de ${formData.city}.</p>
  `;

  return getBaseTemplate(content, { showLogo: false });
}

/**
 * Template texte simple copie admin
 */
export function getEmailCopyAdminTextTemplate(formData: GalaFormData): string {
  return `Nouvelle inscription au gala de ${formData.city} reçue de ${formData.firstName} ${formData.lastName}. Email: ${formData.email}, Téléphone: ${formData.phone}. Nombre de participants: ${formData.totalAttendees} (${formData.maleAttendees} hommes, ${formData.femaleAttendees} femmes).`;
}
