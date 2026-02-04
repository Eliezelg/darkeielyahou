/**
 * Routes d'administration des formulaires
 */

import { Router, Request, Response } from 'express';
import { PrismaClient, $Enums } from '../../../generated/prisma';
import { requireAuth } from '../../middleware/auth';
import { validateCsrfToken } from '../../middleware/csrf';

const router = Router();
const prisma = new PrismaClient();

// Middleware d'authentification pour toutes les routes
router.use(requireAuth);

// Middleware CSRF pour les requêtes mutantes (POST, PUT, DELETE, PATCH)
router.use(validateCsrfToken);

// Mapping des types de formulaires frontend vers les types Prisma
const formTypeMapping: Record<string, $Enums.FormType> = {
  'GALA_REGISTRATION': $Enums.FormType.GALA,
  'SOCIAL_AID': $Enums.FormType.SOCIAL_AID,
  'LOAN': $Enums.FormType.LOAN_REQUEST,
  'DONATION': $Enums.FormType.DONATION,
  'OTHER': $Enums.FormType.OTHER
};

// Validation des IDs (format CUID)
function isValidCuid(id: string): boolean {
  return typeof id === 'string' && /^c[a-z0-9]{24,}$/.test(id);
}

// Route pour récupérer les formulaires par type (avec pagination)
router.get('/', async (req: Request, res: Response): Promise<void | Response> => {
  try {
    const { type, page = '1', limit = '50' } = req.query as { type?: string; page?: string; limit?: string };

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

    // Pagination
    const pageNum = Math.max(1, parseInt(page) || 1);
    const limitNum = Math.min(100, Math.max(1, parseInt(limit) || 50));
    const skip = (pageNum - 1) * limitNum;

    // Convertir le type frontend en type Prisma
    const prismaFormType = formTypeMapping[type];

    // Compter le total pour la pagination
    const total = await prisma.formRequest.count({
      where: { formType: prismaFormType }
    });

    const forms = await prisma.formRequest.findMany({
      where: {
        formType: prismaFormType,
      },
      orderBy: {
        createdAt: 'desc',
      },
      skip,
      take: limitNum,
    });

    return res.status(200).json({
      success: true,
      forms: forms,
      pagination: {
        page: pageNum,
        limit: limitNum,
        total,
        totalPages: Math.ceil(total / limitNum)
      }
    });

  } catch (error) {
    const err = error as Error;
    console.error('Erreur lors de la récupération des formulaires:', err.message);
    return res.status(500).json({
      success: false,
      error: 'Une erreur est survenue lors de la récupération des formulaires',
      details: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  }
});

// Obtenir un formulaire par ID
router.get('/:id', async (req: Request, res: Response): Promise<void | Response> => {
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
    const err = error as Error;
    console.error('Erreur lors de la récupération du formulaire:', err.message);
    res.status(500).json({
      success: false,
      error: 'Une erreur est survenue lors de la récupération du formulaire',
      details: process.env.NODE_ENV === 'development' ? err.message : undefined,
    });
  }
});

// Mettre à jour le statut d'un formulaire
router.patch('/:id/status', async (req: Request, res: Response): Promise<void | Response> => {
  try {
    const { id } = req.params;
    const { status } = req.body as { status?: string };

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
      data: { status: status as $Enums.RequestStatus },
    });

    res.status(200).json({
      success: true,
      form: updatedForm,
    });
  } catch (error) {
    const err = error as Error;
    console.error('Erreur lors de la mise à jour du statut:', err.message);
    res.status(500).json({
      success: false,
      error: 'Une erreur est survenue lors de la mise à jour du statut',
      details: process.env.NODE_ENV === 'development' ? err.message : undefined,
    });
  }
});

// Supprimer un formulaire
router.delete('/:id', async (req: Request, res: Response): Promise<void | Response> => {
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
    const err = error as Error;
    console.error('Erreur lors de la suppression du formulaire:', err.message);
    res.status(500).json({
      success: false,
      error: 'Une erreur est survenue lors de la suppression du formulaire',
      details: process.env.NODE_ENV === 'development' ? err.message : undefined,
    });
  }
});

// Mettre à jour les données d'un formulaire
router.put('/:id', async (req: Request, res: Response): Promise<void | Response> => {
  try {
    const { id } = req.params;
    const { formData } = req.body as { formData?: Record<string, unknown> };

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
        formData: formData as any,
        updatedAt: new Date()
      },
    });

    res.status(200).json({
      success: true,
      form: updatedForm,
      message: 'Formulaire mis à jour avec succès',
    });
  } catch (error) {
    const err = error as Error;
    console.error('Erreur lors de la mise à jour du formulaire:', err.message);
    res.status(500).json({
      success: false,
      error: 'Une erreur est survenue lors de la mise à jour du formulaire',
      details: process.env.NODE_ENV === 'development' ? err.message : undefined,
    });
  }
});

export = router;
