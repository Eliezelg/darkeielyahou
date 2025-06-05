export interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phoneCountryCode: string;
  phoneNumber: string;
  city: string;
  maleAttendees: string;
  femaleAttendees: string;
  phone?: string;
  totalAttendees?: number;
}

export function generateUserEmailTemplate(values: FormData, primaryBlue: string = "#006989"): string {
  return `
    <!DOCTYPE html>
    <html lang="fr">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Confirmation d'inscription au gala</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; }
        .header { background-color: ${primaryBlue}; padding: 25px 20px; text-align: center; border-radius: 6px 6px 0 0; }
        .logo { max-width: 180px; margin: 0 auto 15px; display: block; background-color: white; border-radius: 5px; padding: 10px; }
        .header h1 { color: white; margin: 0; font-weight: 600; }
        .content { padding: 25px; border-left: 1px solid #e5e5e5; border-right: 1px solid #e5e5e5; }
        .footer { background-color: ${primaryBlue}; color: white; padding: 15px; text-align: center; font-size: 12px; border-radius: 0 0 6px 6px; }
        .details { background-color: #f9f9f9; padding: 20px; margin: 20px 0; border-left: 4px solid ${primaryBlue}; border-radius: 4px; }
        h1 { color: white; }
        h2 { color: ${primaryBlue}; margin-top: 0; }
        p { margin-bottom: 15px; }
        .gala-info { background-color: #fafafa; border: 1px solid #eaeaea; padding: 15px; margin-top: 20px; text-align: center; }
        .gala-info h3 { color: ${primaryBlue}; margin-top: 0; }
        .button { display: inline-block; background-color: ${primaryBlue}; color: white; text-decoration: none; padding: 10px 20px; border-radius: 4px; margin-top: 10px; }
      </style>
    </head>
    <body>
      <div class="header">
        <img src="https://darkei-elyahou.org/logo/logo.png" alt="Darkei Elyahou" class="logo">
        <h1>Confirmation d'inscription au gala</h1>
      </div>
      <div class="content">
        <p>Bonjour ${values.firstName},</p>
        <p>Nous avons bien reçu votre inscription au <strong>gala de ${values.city}</strong> de Darkei Elyahou. Nous vous remercions pour votre confiance.</p>
        
        <div class="details">
          <h2>Détails de votre inscription</h2>
          <p><strong>Prénom:</strong> ${values.firstName}</p>
          <p><strong>Nom:</strong> ${values.lastName}</p>
          <p><strong>Email:</strong> ${values.email}</p>
          <p><strong>Téléphone:</strong> ${values.phoneCountryCode}${values.phoneNumber}</p>
          <p><strong>Ville du gala:</strong> ${values.city}</p>
          <p><strong>Participants:</strong> ${Number(values.maleAttendees) + Number(values.femaleAttendees)} personnes (${values.maleAttendees} hommes, ${values.femaleAttendees} femmes)</p>
        </div>
        
        <div class="gala-info">
          <h3>Informations sur le gala de ${values.city}</h3>
          <p>Vous trouverez en pièce jointe l'affiche officielle de l'événement.</p>
          <p>Nous vous contacterons prochainement avec plus de détails concernant le déroulement de la soirée.</p>
        </div>
        
        <p>Cordialement,<br>L'équipe Darkei Elyahou</p>
      </div>
      <div class="footer">
        <p>&copy; ${new Date().getFullYear()} Darkei Elyahou. Tous droits réservés.</p>
      </div>
    </body>
    </html>
  `;
}
