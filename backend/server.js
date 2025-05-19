require('dotenv').config();
const express = require('express');
const cors = require('cors');
const session = require('express-session');
const sgMail = require('@sendgrid/mail');
const { PrismaClient } = require('./generated/prisma');
const { ADMIN_CONFIG } = require('./lib/config');

// Initialisation de Prisma
const prisma = new PrismaClient();

// Configuration de SendGrid
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware de sécurité et CORS
const corsOrigins = process.env.CORS_ORIGINS 
  ? process.env.CORS_ORIGINS.split(',') 
  : ['http://localhost:3000'];

console.log('CORS Origins autorisées:', corsOrigins);

app.use(cors({
  origin: function(origin, callback) {
    // Permettre les requêtes sans origine (comme les applications mobiles ou Postman)
    if (!origin) return callback(null, true);
    
    if (corsOrigins.indexOf(origin) !== -1 || process.env.NODE_ENV !== 'production') {
      callback(null, true);
    } else {
      console.log('Origine CORS bloquée:', origin);
      callback(new Error('Non autorisé par CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json());

// Configuration de la session
const sessionConfig = {
  secret: ADMIN_CONFIG.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    // Cookies sécurisés uniquement en production et lorsque le proxy est défini
    secure: process.env.NODE_ENV === 'production',
    maxAge: ADMIN_CONFIG.SESSION_MAX_AGE,
    httpOnly: true,
    path: '/',
  },
  name: 'darkei.sid',
};

// En production, utiliser sameSite: 'none' uniquement avec HTTPS
if (process.env.NODE_ENV === 'production') {
  sessionConfig.cookie.sameSite = 'none';
  // S'assurer que secure est true si sameSite est 'none' (exigence des navigateurs)
  sessionConfig.cookie.secure = true;
} else {
  // En développement, utiliser 'lax' car nous n'avons pas HTTPS
  sessionConfig.cookie.sameSite = 'lax';
}

// Log de la configuration des cookies
console.log('Configuration des cookies de session:', {
  sameSite: sessionConfig.cookie.sameSite,
  secure: sessionConfig.cookie.secure,
  httpOnly: sessionConfig.cookie.httpOnly,
});

app.use(session(sessionConfig));

// Route de test
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'Le serveur fonctionne correctement' });
});

// Route pour l'envoi d'emails
app.post('/api/send-email', async (req, res) => {
  try {
    // Extraction des données avec valeurs par défaut pour compatibilité
    const { to, from, subject = 'Message du site Darkei Elyahou', text = '', html = '' } = req.body;
    
    // Log des données reçues pour débogage
    console.log('Données reçues:', { to, from, subject, textLength: text?.length || 0 });
    
    // Vérification basique qu'il y a du contenu à envoyer
    if ((!text || text.trim() === '') && (!html || html.trim() === '')) {
      return res.status(400).json({
        success: false,
        error: 'Le contenu du message est vide',
      });
    }

    // Préparation du message avec l'email vérifié
    const msg = {
      to: process.env.DEFAULT_FROM_EMAIL, // Envoi à contact@darkei-elyahou.org
      from: process.env.DEFAULT_FROM_EMAIL, // Format simplifié, juste l'adresse email
      subject,
      text,
      html: html || text,
    };
    
    console.log('Envoi d\'email avec l\'expéditeur:', process.env.DEFAULT_FROM_EMAIL);

    // Envoi de l'email
    await sgMail.send(msg);
    
    console.log('Email envoyé avec succès à:', process.env.DEFAULT_FROM_EMAIL);
    
    res.status(200).json({
      success: true,
      message: 'Email envoyé avec succès',
    });
  } catch (error) {
    console.error('Erreur lors de l\'envoi de l\'email:', error);
    
    // Gestion des erreurs spécifiques à SendGrid
    if (error.response) {
      console.error('Détails de l\'erreur SendGrid:', error.response.body);
    }
    
    res.status(500).json({
      success: false,
      error: 'Une erreur est survenue lors de l\'envoi de l\'email',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
});

// Route pour soumettre un formulaire
app.post('/api/forms/:type', async (req, res) => {
  try {
    const { type } = req.params;
    const formData = req.body;
    const userEmail = req.session?.user?.email || null;

    // Log détaillé pour débogage
    console.log(`Réception d'un formulaire de type: ${type}`);
    console.log('Données du formulaire:', JSON.stringify(formData, null, 2));

    // Définir manuellement les types de formulaires valides
    const validTypes = [
      'SOCIAL_AID',
      'LOAN_REQUEST',
      'KOLLEL_MEMBERSHIP',
      'GALA_REGISTRATION',
      'DONATION',
      'CONTACT',
      'OTHER'
    ];
    
    // Mapper les types de formulaires frontend vers les types Prisma
    const formTypeMapping = {
      'SOCIAL_AID': 'SOCIAL_AID',
      'LOAN_REQUEST': 'LOAN_REQUEST',
      'KOLLEL_MEMBERSHIP': 'KOL_JOIN',
      'GALA_REGISTRATION': 'GALA',
      'DONATION': 'DONATION',
      'CONTACT': 'OTHER',
      'OTHER': 'OTHER'
    };
    
    // Validation du type de formulaire
    if (!validTypes.includes(type)) {
      console.log('Type de formulaire invalide:', type);
      console.log('Types valides:', validTypes);
      return res.status(400).json({
        success: false,
        error: 'Type de formulaire invalide',
      });
    }
    
    // Convertir le type de formulaire frontend vers le type Prisma
    const prismaFormType = formTypeMapping[type] || 'OTHER';

    // Création de la demande
    const request = await prisma.formRequest.create({
      data: {
        formType: prismaFormType,
        formData,
        createdBy: userEmail,
        status: 'PENDING',
      },
    });

    // Déterminer un message approprié en fonction du type de formulaire
    let confirmationMessage = 'Votre demande a été soumise avec succès.';
    
    switch(type) {
      case 'CONTACT':
        confirmationMessage = 'Votre message a été envoyé avec succès. Nous vous répondrons dans les plus brefs délais.';
        break;
      case 'SOCIAL_AID':
        confirmationMessage = 'Votre demande d\'aide sociale a été enregistrée. Un de nos représentants vous contactera prochainement.';
        break;
      case 'GALA':
        confirmationMessage = 'Votre inscription au gala a été confirmée. Merci pour votre participation.';
        break;
      case 'LOAN':
        confirmationMessage = 'Votre demande de prêt a été soumise. Elle sera étudiée dans les plus brefs délais.';
        break;
      case 'KOLLEL':
        confirmationMessage = 'Votre inscription au Kollel a été enregistrée. Nous vous contacterons pour la suite des démarches.';
        break;
    }
    
    res.status(201).json({
      success: true,
      message: confirmationMessage,
      data: request,
    });
  } catch (error) {
    console.error('Erreur lors de la soumission du formulaire:', error);
    res.status(500).json({
      success: false,
      error: 'Une erreur est survenue lors de la soumission du formulaire',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
});

// Routes d'administration
const adminRouter = require('./src/routes/admin');
app.use('/api/admin', adminRouter);

// Gestion des erreurs 404
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: 'Route non trouvée',
  });
});

// Gestion des erreurs globales
app.use((err, req, res, next) => {
  console.error('Erreur non gérée:', err);
  res.status(500).json({
    success: false,
    error: 'Une erreur est survenue sur le serveur',
    details: process.env.NODE_ENV === 'development' ? err.message : undefined,
  });
});

// Démarrer le serveur
const server = app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
  console.log(`Environnement: ${process.env.NODE_ENV || 'development'}`);
});

// Gestion de la fermeture propre du serveur
const shutdown = async () => {
  console.log('Arrêt du serveur en cours...');
  
  // Fermer le serveur
  server.close(async () => {
    console.log('Serveur arrêté');
    
    // Fermer la connexion Prisma
    await prisma.$disconnect();
    console.log('Connexion à la base de données fermée');
    
    process.exit(0);
  });
};

// Gestion des signaux d'arrêt
process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);

// Gestion des erreurs non capturées
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
  process.exit(1);
});
