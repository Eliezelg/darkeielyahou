const express = require('express');
const router = express.Router();
const { PrismaClient } = require('../../../generated/prisma');
const prisma = new PrismaClient();
const { requireAuth } = require('../../middleware/auth');

console.log('=== Module forms.js chargé avec succès ===');
console.log('Router Express créé dans forms.js');
console.log('Chemin d\'importation pour Prisma:', '../../../generated/prisma');

// Middleware d'authentification pour toutes les routes
router.use(requireAuth);

console.log('Route admin/forms.js chargée');

// Mapping des types de formulaires frontend vers les types Prisma
const formTypeMapping = {
  'GALA_REGISTRATION': 'GALA_REGISTRATION',
  'SOCIAL_AID': 'SOCIAL_AID',
  'LOAN': 'LOAN_REQUEST',
  'KOLLEL': 'KOL_JOIN',
  'DONATION': 'DONATION',
  'OTHER': 'OTHER'
};

// Route pour récupérer les formulaires par type
router.get('/', async (req, res) => {
  console.log('==== ROUTE GET /api/admin/forms APPELÉE ====');
  console.log('Query params reçus:', req.query);
  console.log('Headers reçus:', req.headers);
  
  try {
    console.log('Route GET /api/admin/forms exécutée');
    const { type } = req.query;
    console.log('Route GET /api/admin/forms appelée avec type:', type);
    
    if (!type) {
      console.log('Erreur: paramètre type manquant');
      return res.status(400).json({
        success: false,
        error: 'Le paramètre "type" est requis',
      });
    }

    const validTypes = Object.keys(formTypeMapping);
    
    if (!validTypes.includes(type)) {
      return res.status(400).json({
        success: false,
        error: 'Type de formulaire invalide',
        validTypes: validTypes
      });
    }
    
    // Convertir le type frontend en type Prisma
    const prismaFormType = formTypeMapping[type];
    console.log('Type de formulaire Prisma correspondant:', prismaFormType);
    
    // Récupérer les formulaires du type demandé
    const forms = await prisma.formRequest.findMany({
      where: {
        formType: prismaFormType,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
    
    console.log(`Nombre de formulaires ${type} trouvés:`, forms.length);
    
    res.status(200).json({
      success: true,
      forms,
    });
  } catch (error) {
    console.error('Erreur lors de la récupération des formulaires:', error);
    res.status(500).json({
      success: false,
      error: 'Une erreur est survenue lors de la récupération des formulaires',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
});

// Obtenir un formulaire par ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    const form = await prisma.formRequest.findUnique({
      where: { id },
    });
    
    if (!form) {
      return res.status(404).json({
        success: false,
        error: 'Formulaire non trouvé',
      });
    }
    
    res.status(200).json({
      success: true,
      form,
    });
  } catch (error) {
    console.error('Erreur lors de la récupération du formulaire:', error);
    res.status(500).json({
      success: false,
      error: 'Une erreur est survenue lors de la récupération du formulaire',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
});

// Mettre à jour le statut d'un formulaire
router.patch('/:id/status', async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    
    if (!status) {
      return res.status(400).json({
        success: false,
        error: 'Le paramètre "status" est requis',
      });
    }
    
    const validStatuses = ['PENDING', 'IN_REVIEW', 'COMPLETED', 'REJECTED'];
    
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        error: 'Statut invalide',
      });
    }
    
    const updatedForm = await prisma.formRequest.update({
      where: { id },
      data: { status },
    });
    
    res.status(200).json({
      success: true,
      form: updatedForm,
    });
  } catch (error) {
    console.error('Erreur lors de la mise à jour du statut:', error);
    res.status(500).json({
      success: false,
      error: 'Une erreur est survenue lors de la mise à jour du statut',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
});

module.exports = router;
