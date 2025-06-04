import { NextResponse } from 'next/server';
import { Resend } from 'resend';

// Indique que cette route est dynamique (ne pas mettre en cache)
export const dynamic = 'force-dynamic';

// Désactive le rendu statique pour cette route
export const revalidate = 0;

// Initialiser Resend avec la clé API
const resendApiKey = process.env.RESEND_API_KEY;
const resend = resendApiKey ? new Resend(resendApiKey) : null;

if (!resendApiKey) {
  console.error('Erreur: RESEND_API_KEY non configurée');
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

    // Envoyer l'email via Resend
    if (resend) {
      const { data, error } = await resend.emails.send({
        from: `Darkei Elyahou <${from}>`,
        to,
        subject,
        text,
        html: html || text,
      });

      if (error) {
        console.error('Erreur lors de l\'envoi de l\'email:', error);
        return NextResponse.json(
          { error: 'Échec lors de l\'envoi de l\'email' },
          { status: 500 }
        );
      }

      console.log('Email envoyé avec succès à:', to, 'ID:', data?.id);
      return NextResponse.json({ success: true, id: data?.id });
    } else {
      console.error('Erreur: RESEND_API_KEY non configurée');
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
