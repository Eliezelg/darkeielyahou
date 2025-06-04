require('dotenv').config();
const express = require('express');
const cors = require('cors');
const session = require('express-session');
const { createClient } = require('redis');
const connectRedis = require('connect-redis');
const RedisStore = connectRedis(session);
const sgMail = require('@sendgrid/mail');
const { PrismaClient } = require('./generated/prisma');
const { ADMIN_CONFIG } = require('./lib/config');
const path = require('path'); // Ajout de l'import du module path

// Initialisation de Prisma
const prisma = new PrismaClient();

// Configuration de SendGrid
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware de sécurité et CORS
const corsOrigins = process.env.ALLOWED_ORIGINS || process.env.CORS_ORIGINS
  ? (process.env.ALLOWED_ORIGINS || process.env.CORS_ORIGINS).split(',').map(origin => origin.trim())
  : ['http://localhost:3000', 'https://darkei-elyahou.org'];

console.log('CORS Origins autorisées:', corsOrigins);

app.use(cors({
  origin: function(origin, callback) {
    // Permettre les requêtes sans origine (comme les applications mobiles ou Postman)
    if (!origin) return callback(null, true);
    
    // En développement, permettre tous les localhost
    if (process.env.NODE_ENV !== 'production' && origin.includes('localhost')) {
      return callback(null, true);
    }
    
    if (corsOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.log('Origine CORS bloquée:', origin);
      console.log('Origines autorisées:', corsOrigins);
      callback(new Error(`Non autorisé par CORS: ${origin}`));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  preflightContinue: false,
  optionsSuccessStatus: 204
}));

app.use(express.json());

// Configuration du client Redis
const redisClient = createClient({
  url: process.env.REDIS_URL || 'redis://localhost:6379',
  password: process.env.REDIS_PASSWORD || '',
  legacyMode: true // Changer à true pour compatibilité
});

// Connexion au client Redis
(async () => {
  try {
    await redisClient.connect();
    console.log('Connexion à Redis établie');
  } catch (err) {
    console.error('Erreur de connexion à Redis:', err);
  }
})();

// Gestion des erreurs Redis
redisClient.on('error', (err) => {
  console.error('Erreur Redis:', err);
});

redisClient.on('connect', () => {
  console.log('Connexion à Redis établie');
});

// Création du store Redis - s'assurer que le client est correctement passé
const redisStore = new RedisStore({ 
  client: redisClient,
  prefix: 'darkei:sess:' // Ajout d'un préfixe pour éviter les collisions
});

// Configuration de la session
const sessionConfig = {
  store: redisStore,
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

// Middleware de logging pour déboguer les requêtes
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  if (req.url.startsWith('/api/admin')) {
    console.log('Requête admin détectée - Headers:', JSON.stringify(req.headers, null, 2));
  }
  next();
});

// Route de test
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'Le serveur fonctionne correctement' });
});

// Route pour l'envoi d'emails
app.post('/api/send-email', async (req, res) => {
  try {
    // Extraction des données avec valeurs par défaut pour compatibilité
    const { to, from, subject = 'Message du site Darkei Elyahou', text = '', html = '', sendCopy = false, formData = null } = req.body;
    
    // Log des données reçues pour débogage
    console.log('Données reçues:', { to, from, subject, textLength: text?.length || 0, sendCopy });
    
    // Vérification basique qu'il y a du contenu à envoyer
    if ((!text || text.trim() === '') && (!html || html.trim() === '')) {
      return res.status(400).json({
        success: false,
        error: 'Le contenu du message est vide',
      });
    }
    
    // Préparation du message pour le destinataire
    let userMsg = {
      to: to, // Destinataire spécifié dans la requête
      from: process.env.DEFAULT_FROM_EMAIL, // Toujours envoyé depuis l'email par défaut
      subject,
      text,
      html: html || text
    };
    
    // Gestion des pièces jointes (logo et affiche du gala) via le module fs
    try {
      const fs = require('fs');
      const logoPath = path.join(__dirname, '../frontend/public/logo/logo.jpg'); // Utilisation du logo en .jpg comme demandé
      const attachments = [];
      
      // Ajouter le logo s'il existe
      if (fs.existsSync(logoPath)) {
        const logoContent = fs.readFileSync(logoPath).toString('base64');
        
        attachments.push({
          content: logoContent,
          filename: 'logo.jpg',
          type: 'image/jpeg', 
          disposition: 'inline',
          content_id: 'logo' // Cet identifiant doit correspondre à celui utilisé dans le HTML: <img src="cid:logo">
        });
        console.log('Logo trouvé et ajouté en pièce jointe');
      } else {
        console.error('Fichier logo non trouvé:', logoPath);
      }
      
      // Ajouter l'affiche du gala selon la ville sélectionnée
      if (formData && formData.city) {
        let posterPath;
        const cityLowerCase = formData.city.toLowerCase();
        
        // Définir le chemin de l'affiche selon la ville
        switch(cityLowerCase) {
          case 'paris':
            posterPath = path.join(__dirname, '../frontend/public/images/gala/paris.png');
            break;
          case 'Jerusalem':
            posterPath = path.join(__dirname, '../frontend/public/images/gala/Jerusalem.png');
            break;
          case 'strasbourg':
            posterPath = path.join(__dirname, '../frontend/public/images/gala/strasbourg.w');
            break;
          default:
            console.log('Ville non reconnue pour l\'affiche:', formData.city);
        }
        
        // Si un chemin d'affiche a été défini et que le fichier existe
        if (posterPath && fs.existsSync(posterPath)) {
          const posterContent = fs.readFileSync(posterPath).toString('base64');
          
          attachments.push({
            content: posterContent,
            filename: `gala-${cityLowerCase}.png`,
            type: 'image/png',
            disposition: 'attachment' // En pièce jointe et non inline
          });
          console.log(`Affiche du gala de ${formData.city} ajoutée en pièce jointe`);
        } else if (posterPath) {
          console.error('Fichier d\'affiche non trouvé:', posterPath);
        }
      }
      
      // Ajouter les pièces jointes à l'email
      if (attachments.length > 0) {
        userMsg.attachments = attachments;
      }
    } catch (error) {
      console.error('Erreur lors de la lecture des pièces jointes:', error);
      // On continue l'envoi de l'email même sans les pièces jointes
    }
    
    // Envoi de l'email à l'utilisateur
    await sgMail.send(userMsg);
    console.log('Email envoyé avec succès à l\'utilisateur:', to);
    
    // Si demandé, envoi d'une copie à l'administrateur avec toutes les données du formulaire
    if (sendCopy && formData) {
      // Préparation du contenu de l'email admin avec un meilleur formatage
      const adminEmailContent = `
        <!DOCTYPE html>
        <html lang="fr">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Nouvelle inscription au gala</title>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 800px; margin: 0 auto; padding: 20px; }
            h1 { color: #006989; border-bottom: 2px solid #006989; padding-bottom: 10px; }
            table { width: 100%; border-collapse: collapse; margin: 20px 0; }
            th, td { padding: 12px; border: 1px solid #ddd; text-align: left; }
            th { background-color: #f2f2f2; font-weight: bold; }
            .highlight { background-color: #e5f2f7; }
          </style>
        </head>
        <body>
          <div class="container">
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
              <tr class="highlight">
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
          </div>
        </body>
        </html>
      `;
      
      // Préparation de l'email administrateur
      const adminMsg = {
        to: process.env.ADMIN_EMAIL || 'contact@darkei-elyahou.org',
        from: process.env.DEFAULT_FROM_EMAIL,
        subject: `[ADMIN] Nouvelle inscription au gala de ${formData.city} - ${formData.firstName} ${formData.lastName}`,
        html: adminEmailContent,
        text: `Nouvelle inscription au gala de ${formData.city} reçue de ${formData.firstName} ${formData.lastName}. Email: ${formData.email}, Téléphone: ${formData.phone}. Nombre de participants: ${formData.totalAttendees} (${formData.maleAttendees} hommes, ${formData.femaleAttendees} femmes).`
      };
      
      await sgMail.send(adminMsg);
      console.log('Copie de l\'email envoyée à l\'administrateur:', process.env.DEFAULT_FROM_EMAIL);
    }
    
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
      'GALA_REGISTRATION': 'GALA_REGISTRATION',
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

    // Pour les inscriptions au gala, envoyer un email de confirmation
    if (type === 'GALA_REGISTRATION' && formData.email) {
      try {
        const fs = require('fs');
        const logoPath = path.join(__dirname, '../frontend/public/logo/logo.jpg');
        const attachments = [];
        
        // Ajouter le logo s'il existe
        if (fs.existsSync(logoPath)) {
          const logoContent = fs.readFileSync(logoPath).toString('base64');
          attachments.push({
            filename: 'logo.png',
            content: logoContent,
            type: 'image/png',
            disposition: 'inline',
            content_id: 'logo' // ID pour référence dans le HTML de l'email
          });
          console.log('Logo trouvé et ajouté en pièce jointe');
        } else {
          console.error('Fichier logo non trouvé:', logoPath);
        }

        // Ajouter l'affiche du gala selon la ville sélectionnée
        if (formData.city) {
          let posterPath;
          const cityLowerCase = formData.city.toLowerCase();
          
          // Définir le chemin de l'affiche selon la ville
          switch(cityLowerCase) {
            case 'paris':
              posterPath = path.join(__dirname, '../frontend/public/images/gala/paris.webp');
              break;
            case 'Jerusalem':
              posterPath = path.join(__dirname, '../frontend/public/images/gala/Jerusalem.webp');
              break;
            case 'strasbourg':
              posterPath = path.join(__dirname, '../frontend/public/images/gala/strasbourg.webp');
              break;
            default:
              posterPath = null;
          }
          
          if (posterPath && fs.existsSync(posterPath)) {
            const posterContent = fs.readFileSync(posterPath).toString('base64');
            attachments.push({
              filename: `gala-${cityLowerCase}.jpg`,
              content: posterContent,
              type: 'image/jpeg',
              disposition: 'inline',
              content_id: 'poster' // ID pour référence dans le HTML de l'email
            });
            console.log(`Affiche pour ${formData.city} trouvée et ajoutée en pièce jointe`);
          } else if (posterPath) {
            console.error('Fichier d\'affiche non trouvé:', posterPath);
          }
        }

        // Générer un template HTML pour l'email utilisateur
        const primaryBlue = '#006989'; // Couleur principale du site
        const userHtmlContent = `
          <!DOCTYPE html>
          <html lang="fr">
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { text-align: center; padding: 20px 0; }
              .header img { max-width: 200px; height: auto; }
              .content { padding: 20px; background-color: #f9f9f9; border-radius: 5px; }
              h1, h2 { color: ${primaryBlue}; }
              .footer { text-align: center; margin-top: 20px; font-size: 12px; color: #666; }
              table { width: 100%; border-collapse: collapse; margin: 20px 0; }
              th, td { padding: 10px; text-align: left; border-bottom: 1px solid #ddd; }
              .btn { display: inline-block; padding: 10px 20px; background-color: ${primaryBlue}; color: white; text-decoration: none; border-radius: 5px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <img src="cid:logo" alt="Logo Darkei Elyahou" />
              </div>
              <div class="content">
                <h1>Confirmation d'inscription</h1>
                <p>Bonjour ${formData.firstName},</p>
                <p>Nous avons bien reçu votre inscription pour le gala de <strong>${formData.city}</strong>.</p>
                
                <h2>Détails de votre inscription</h2>
                <p><strong>Prénom:</strong> ${formData.firstName}</p>
                <p><strong>Nom:</strong> ${formData.lastName}</p>
                <p><strong>Email:</strong> ${formData.email}</p>
                <p><strong>Téléphone:</strong> ${formData.phoneCountryCode}${formData.phoneNumber}</p>
                <p><strong>Ville du gala:</strong> ${formData.city}</p>
                <p><strong>Participants:</strong> ${Number(formData.maleAttendees) + Number(formData.femaleAttendees)} personnes (${formData.maleAttendees} hommes, ${formData.femaleAttendees} femmes)</p>

                <p>Vous trouverez ci-joint l'affiche du gala de ${formData.city}.</p>
               </div>
              
              <p>Cordialement,<br>L'équipe Darkei Elyahou</p>
            </div>
            <div class="footer">
              <p>&copy; ${new Date().getFullYear()} Darkei Elyahou. Tous droits réservés.</p>
            </div>
          </body>
          </html>
        `;

        // Créer un texte simple pour les clients de messagerie qui ne supportent pas HTML
        const textContent = `
Bonjour ${formData.firstName},

Nous avons bien reçu votre inscription pour le gala de ${formData.city}.

Détails de votre inscription :
- Prénom: ${formData.firstName}
- Nom: ${formData.lastName}
- Email: ${formData.email}
- Téléphone: ${formData.phoneCountryCode}${formData.phoneNumber}
- Ville du gala: ${formData.city}
- Participants: ${Number(formData.maleAttendees) + Number(formData.femaleAttendees)} personnes (${formData.maleAttendees} hommes, ${formData.femaleAttendees} femmes)

Nous vous contacterons prochainement avec plus de détails concernant le déroulement de la soirée.

Cordialement,
L'équipe Darkei Elyahou
`;

        // Configuration de l'email utilisateur
        const userMsg = {
          to: formData.email,
          from: process.env.DEFAULT_FROM_EMAIL || 'noreply@darkeielyahou.com',
          subject: `Confirmation d'inscription au gala de ${formData.city}`,
          text: textContent,
          html: userHtmlContent,
          attachments: attachments
        };

        // Envoi de l'email à l'utilisateur
        await sgMail.send(userMsg);
        console.log('Email envoyé avec succès à:', formData.email);

        // Envoi d'une copie à l'administrateur
        const adminHtmlContent = `
          <!DOCTYPE html>
          <html lang="fr">
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              h1 { color: ${primaryBlue}; }
              table { width: 100%; border-collapse: collapse; margin: 20px 0; }
              th, td { padding: 12px; border: 1px solid #ddd; text-align: left; }
              th { background-color: #f2f2f2; font-weight: bold; }
              .highlight { background-color: #e5f2f7; }
            </style>
          </head>
          <body>
            <div class="container">
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
                  <td>${formData.phoneCountryCode}${formData.phoneNumber}</td>
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
            </div>
          </body>
          </html>
        `;

        // Configuration de l'email admin
        const adminMsg = {
          to: process.env.ADMIN_EMAIL || 'contact@darkei-elyahou.org',
          from: process.env.DEFAULT_FROM_EMAIL || 'contact@darkeielyahou.com',
          subject: `Nouvelle inscription au gala de ${formData.city} - ${formData.firstName} ${formData.lastName}`,
          html: adminHtmlContent,
          attachments: attachments
        };

        // Envoi de l'email à l'administrateur
        await sgMail.send(adminMsg);
        console.log('Email envoyé avec succès à l\'administrateur');
      } catch (emailError) {
        console.error("Erreur lors de l'envoi des emails:", emailError);
        // On continue l'exécution même en cas d'erreur d'envoi d'email
      }
    }

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
console.log('Importation du routeur admin depuis ./src/routes/admin/index.js');
const adminRouter = require('./src/routes/admin/index');
console.log('Routeur admin importé avec succès');
app.use('/api/admin', adminRouter);
console.log('Routeur admin monté sur /api/admin');

// Routes d'exportation de données
const exportRouter = require('./src/routes/export');
app.use('/api/export', exportRouter);

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
    
    // Fermer la connexion Redis
    try {
      await redisClient.disconnect();
      console.log('Connexion Redis fermée');
    } catch (err) {
      console.error('Erreur lors de la fermeture de Redis:', err);
    }
    
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
