const express = require('express');
const router = express.Router();
const { PrismaClient, $Enums } = require('../../../generated/prisma');
const prisma = new PrismaClient();
const { requireAuth } = require('../../middleware/auth');

// Middleware d'authentification pour toutes les routes
router.use(requireAuth);

// Mapping des types de formulaires frontend vers les types Prisma
const formTypeMapping = {
  'GALA_REGISTRATION': $Enums.FormType.GALA,
  'SOCIAL_AID': $Enums.FormType.SOCIAL_AID,
  'LOAN': $Enums.FormType.LOAN_REQUEST,
  'DONATION': $Enums.FormType.DONATION,
  'OTHER': $Enums.FormType.OTHER
};

// Validation des IDs (format CUID)
const isValidCuid = (id) => {
  return typeof id === 'string' && /^c[a-z0-9]{24,}$/.test(id);
};

// Route pour récupérer les formulaires par type
router.get('/', async (req, res) => {
  try {
    const { type } = req.query;

    if (!type) {
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

    const forms = await prisma.formRequest.findMany({
      where: {
        formType: prismaFormType,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return res.status(200).json({
      success: true,
      forms: forms
    });

  } catch (error) {
    console.error('Erreur lors de la récupération des formulaires:', error.message);
    return res.status(500).json({
      success: false,
      error: 'Une erreur est survenue lors de la récupération des formulaires',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Obtenir un formulaire par ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // Validation de l'ID
    if (!isValidCuid(id)) {
      return res.status(400).json({
        success: false,
        error: 'ID de formulaire invalide',
      });
    }

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
    console.error('Erreur lors de la récupération du formulaire:', error.message);
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

    // Validation de l'ID
    if (!isValidCuid(id)) {
      return res.status(400).json({
        success: false,
        error: 'ID de formulaire invalide',
      });
    }

    if (!status) {
      return res.status(400).json({
        success: false,
        error: 'Le paramètre "status" est requis',
      });
    }

    // Valider le statut contre les valeurs de l'enum RequestStatus
    const validStatuses = ['PENDING', 'IN_REVIEW', 'COMPLETED', 'REJECTED'];

    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        error: 'Statut invalide',
        validStatuses: validStatuses
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
    console.error('Erreur lors de la mise à jour du statut:', error.message);
    res.status(500).json({
      success: false,
      error: 'Une erreur est survenue lors de la mise à jour du statut',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
});

// Supprimer un formulaire
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // Validation de l'ID
    if (!isValidCuid(id)) {
      return res.status(400).json({
        success: false,
        error: 'ID de formulaire invalide',
      });
    }

    // Vérifier si le formulaire existe
    const existingForm = await prisma.formRequest.findUnique({
      where: { id },
    });

    if (!existingForm) {
      return res.status(404).json({
        success: false,
        error: 'Formulaire non trouvé',
      });
    }

    // Supprimer le formulaire
    await prisma.formRequest.delete({
      where: { id },
    });

    res.status(200).json({
      success: true,
      message: 'Formulaire supprimé avec succès',
    });
  } catch (error) {
    console.error('Erreur lors de la suppression du formulaire:', error.message);
    res.status(500).json({
      success: false,
      error: 'Une erreur est survenue lors de la suppression du formulaire',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
});

// Mettre à jour les données d'un formulaire
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { formData } = req.body;

    // Validation de l'ID
    if (!isValidCuid(id)) {
      return res.status(400).json({
        success: false,
        error: 'ID de formulaire invalide',
      });
    }

    if (!formData || typeof formData !== 'object') {
      return res.status(400).json({
        success: false,
        error: 'Les données du formulaire sont requises et doivent être un objet',
      });
    }

    // Vérifier si le formulaire existe
    const existingForm = await prisma.formRequest.findUnique({
      where: { id },
    });

    if (!existingForm) {
      return res.status(404).json({
        success: false,
        error: 'Formulaire non trouvé',
      });
    }

    // Mettre à jour le formulaire
    const updatedForm = await prisma.formRequest.update({
      where: { id },
      data: {
        formData: formData,
        updatedAt: new Date()
      },
    });

    res.status(200).json({
      success: true,
      form: updatedForm,
      message: 'Formulaire mis à jour avec succès',
    });
  } catch (error) {
    console.error('Erreur lors de la mise à jour du formulaire:', error.message);
    res.status(500).json({
      success: false,
      error: 'Une erreur est survenue lors de la mise à jour du formulaire',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
});

module.exports = router;
