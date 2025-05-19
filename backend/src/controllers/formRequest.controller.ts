import { PrismaClient, FormType, RequestStatus } from '@prisma/client';
import { Request, Response } from 'express';

const prisma = new PrismaClient();

// Types pour les requêtes
interface CreateFormRequestInput {
  formType: FormType;
  formData: any;
  createdBy?: string;
  metadata?: any;
}

interface UpdateFormRequestInput {
  status?: RequestStatus;
  notes?: string;
  assignedTo?: string | null;
  metadata?: any;
}

// Créer une nouvelle demande de formulaire
export const createFormRequest = async (req: Request, res: Response) => {
  try {
    const { formType, formData, createdBy, metadata }: CreateFormRequestInput = req.body;

    // Validation des données
    if (!formType || !formData) {
      return res.status(400).json({
        success: false,
        error: 'Les champs formType et formData sont requis',
      });
    }


    // Création de la demande
    const formRequest = await prisma.formRequest.create({
      data: {
        formType,
        formData,
        createdBy: createdBy || null,
        metadata: metadata || {},
      },
    });

    res.status(201).json({
      success: true,
      data: formRequest,
    });
  } catch (error) {
    console.error('Erreur lors de la création de la demande:', error);
    res.status(500).json({
      success: false,
      error: 'Une erreur est survenue lors de la création de la demande',
    });
  }
};

// Récupérer toutes les demandes avec filtrage
export const getFormRequests = async (req: Request, res: Response) => {
  try {
    const { 
      formType, 
      status, 
      page = '1', 
      limit = '10',
      sortBy = 'createdAt',
      sortOrder = 'desc'
    } = req.query;

    const pageNumber = parseInt(page as string, 10) || 1;
    const pageSize = parseInt(limit as string, 10) || 10;
    const skip = (pageNumber - 1) * pageSize;

    // Construction du filtre
    const where: any = {};
    
    if (formType) where.formType = formType;
    if (status) where.status = status;

    // Récupération des demandes avec pagination
    const [requests, total] = await Promise.all([
      prisma.formRequest.findMany({
        where,
        include: {
          createdByUser: {
            select: { fullName: true, email: true },
          },
          assignedToUser: {
            select: { fullName: true, email: true },
          },
        },
        orderBy: {
          [sortBy as string]: sortOrder,
        },
        skip,
        take: pageSize,
      }),
      prisma.formRequest.count({ where }),
    ]);

    res.status(200).json({
      success: true,
      data: requests,
      pagination: {
        page: pageNumber,
        pageSize,
        total,
        totalPages: Math.ceil(total / pageSize),
      },
    });
  } catch (error) {
    console.error('Erreur lors de la récupération des demandes:', error);
    res.status(500).json({
      success: false,
      error: 'Une erreur est survenue lors de la récupération des demandes',
    });
  }
};

// Récupérer une demande par son ID
export const getFormRequestById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const formRequest = await prisma.formRequest.findUnique({
      where: { id },
      include: {
        createdByUser: {
          select: { fullName: true, email: true },
        },
        assignedToUser: {
          select: { fullName: true, email: true },
        },
      },
    });

    if (!formRequest) {
      return res.status(404).json({
        success: false,
        error: 'Demande non trouvée',
      });
    }

    res.status(200).json({
      success: true,
      data: formRequest,
    });
  } catch (error) {
    console.error('Erreur lors de la récupération de la demande:', error);
    res.status(500).json({
      success: false,
      error: 'Une erreur est survenue lors de la récupération de la demande',
    });
  }
};

// Mettre à jour une demande
export const updateFormRequest = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status, notes, assignedTo, metadata }: UpdateFormRequestInput = req.body;

    // Vérifier si la demande existe
    const existingRequest = await prisma.formRequest.findUnique({
      where: { id },
    });

    if (!existingRequest) {
      return res.status(404).json({
        success: false,
        error: 'Demande non trouvée',
      });
    }

    // Mise à jour de la demande
    const updatedRequest = await prisma.formRequest.update({
      where: { id },
      data: {
        status,
        notes,
        assignedTo,
        metadata: metadata ? { ...existingRequest.metadata, ...metadata } : undefined,
      },
    });

    res.status(200).json({
      success: true,
      data: updatedRequest,
    });
  } catch (error) {
    console.error('Erreur lors de la mise à jour de la demande:', error);
    res.status(500).json({
      success: false,
      error: 'Une erreur est survenue lors de la mise à jour de la demande',
    });
  }
};

// Supprimer une demande
export const deleteFormRequest = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // Vérifier si la demande existe
    const existingRequest = await prisma.formRequest.findUnique({
      where: { id },
    });

    if (!existingRequest) {
      return res.status(404).json({
        success: false,
        error: 'Demande non trouvée',
      });
    }

    // Suppression de la demande
    await prisma.formRequest.delete({
      where: { id },
    });

    res.status(200).json({
      success: true,
      data: {},
    });
  } catch (error) {
    console.error('Erreur lors de la suppression de la demande:', error);
    res.status(500).json({
      success: false,
      error: 'Une erreur est survenue lors de la suppression de la demande',
    });
  }
};

// Exporter les données au format Excel
export const exportToExcel = async (req: Request, res: Response) => {
  try {
    const { formType, status } = req.query;

    // Construction du filtre
    const where: any = {};
    if (formType) where.formType = formType;
    if (status) where.status = status;

    // Récupération des données
    const requests = await prisma.formRequest.findMany({
      where,
      include: {
        createdByUser: {
          select: { fullName: true, email: true },
        },
        assignedToUser: {
          select: { fullName: true, email: true },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    // Préparation des données pour l'export
    const data = requests.map((request) => ({
      ID: request.id,
      'Type de formulaire': request.formType,
      Statut: request.status,
      'Créé le': request.createdAt.toISOString(),
      'Mis à jour le': request.updatedAt.toISOString(),
      'Créé par': request.createdByUser?.email || request.createdBy || 'Anonyme',
      'Assigné à': request.assignedToUser?.email || request.assignedTo || 'Non assigné',
      'Données': JSON.stringify(request.formData, null, 2),
      'Notes': request.notes || '',
    }));

    // Configuration de la réponse pour le téléchargement
    res.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    );
    res.setHeader(
      'Content-Disposition',
      `attachment; filename=demandes-${new Date().toISOString().split('T')[0]}.xlsx`
    );

    // Convertir en Excel et envoyer (à implémenter avec xlsx)
    res.status(200).json({
      success: true,
      data,
      // Dans une implémentation réelle, on utiliserait xlsx pour générer le fichier Excel
      // Pour l'instant, on renvoie les données JSON
    });
  } catch (error) {
    console.error('Erreur lors de l\'export des demandes:', error);
    res.status(500).json({
      success: false,
      error: 'Une erreur est survenue lors de l\'export des demandes',
    });
  }
};
