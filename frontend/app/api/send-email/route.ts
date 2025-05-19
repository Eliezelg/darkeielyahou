import { NextResponse } from 'next/server';
import sgMail from '@sendgrid/mail';

// Indique que cette route est dynamique (ne pas mettre en cache)
export const dynamic = 'force-dynamic';

// Désactive le rendu statique pour cette route
export const revalidate = 0;

// Vérifier que la clé API SendGrid est configurée
const apiKey = process.env.SENDGRID_API_KEY;
if (!apiKey) {
  console.error('Erreur: SENDGRID_API_KEY non configurée');
} else {
  sgMail.setApiKey(apiKey);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { to, from, subject, text, html } = body;

    // Validation des champs nécessaires
    if (!to || !from || !subject || !text) {
      return NextResponse.json(
        { error: 'Champs manquants: to, from, subject et text sont requis' },
        { status: 400 }
      );
    }

    // Envoyer l'email via SendGrid
    if (apiKey) {
      await sgMail.send({
        to,
        from: {
          email: from,
          name: 'Darkei Elyahou',
        },
        subject,
        text,
        html: html || text,
      });

      console.log('Email envoyé avec succès à:', to);
      return NextResponse.json({ success: true });
    } else {
      console.error('Erreur: SENDGRID_API_KEY non configurée');
      return NextResponse.json(
        { error: 'Erreur de configuration du serveur' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Erreur lors de l\'envoi de l\'email:', error);
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    );
  }
}
