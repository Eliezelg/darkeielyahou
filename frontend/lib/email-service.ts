// Service d'envoi d'emails via Resend

interface EmailData {
  to: string;
  from: string;
  subject: string;
  text: string;
  html?: string;
}

// URL de l'API backend (à adapter selon l'environnement)
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

// Email par défaut - doit être un domaine vérifié dans Resend
const DEFAULT_EMAIL = process.env.NEXT_PUBLIC_RESEND_FROM_EMAIL || 'contact@darkei-elyahou.org';

/**
 * Fonction pour envoyer un email via l'API backend
 */
export async function sendEmail(data: EmailData): Promise<boolean> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/send-email`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...data,
        // S'assurer que l'email d'expéditeur est défini
        from: data.from || DEFAULT_EMAIL,
      }),
    });
    
    if (!response.ok) {
      const error = await response.json();
      console.error('Erreur lors de l\'envoi de l\'email:', error);
      return false;
    }
    
    return true;
  } catch (error) {
    console.error('Erreur lors de l\'envoi de l\'email:', error);
    return false;
  }
}

/**
 * Formatage des données du formulaire pour l'envoi d'emails
 */
export function formatFormDataForEmail(formData: Record<string, any>, formName: string): EmailData {
  // Créer une version HTML et texte du contenu
  const textContent = Object.entries(formData)
    .map(([key, value]) => `${key}: ${value}`)
    .join('\n');
  
  const htmlContent = Object.entries(formData)
    .map(([key, value]) => `<p><strong>${key}:</strong> ${value}</p>`)
    .join('');
  
  return {
    to: DEFAULT_EMAIL,
    from: DEFAULT_EMAIL, 
    subject: `Nouveau message - Formulaire ${formName}`,
    text: `Nouveau message reçu depuis le formulaire ${formName}:\n\n${textContent}`,
    html: `
      <h1>Nouveau message - Formulaire ${formName}</h1>
      <div>
        ${htmlContent}
      </div>
    `,
  };
}
