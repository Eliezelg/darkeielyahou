import { Request, Response } from 'express';
import { PrismaClient, FormType, RequestStatus } from '@prisma/client';
import * as XLSX from 'xlsx';

const prisma = new PrismaClient();

// Récupérer toutes les demandes
export const getRequests = async (req: Request, res: Response) => {
  try {
    const { type, status, page = '1', limit = '10' } = req.query;
    
    const pageNumber = parseInt(page as string, 10) || 1;
    const pageSize = parseInt(limit as string, 10) || 10;
    const skip = (pageNumber - 1) * pageSize;

    // Construction du filtre
    const where: any = {};
    if (type) where.formType = type;
    if (status) where.status = status;

    // Récupération des demandes avec pagination
    const [requests, total] = await Promise.all([
      prisma.formRequest.findMany({
        where,
        orderBy: { createdAt: 'desc' },
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

// Exporter les demandes en Excel
export const exportToExcel = async (req: Request, res: Response) => {
  try {
    const { type, status } = req.query;

    // Construction du filtre
    const where: any = {};
    if (type) where.formType = type;
    if (status) where.status = status;

    // Récupération des données
    const requests = await prisma.formRequest.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    });

    // Préparation des données pour l'export
    const data = requests.map((request) => ({
      ID: request.id,
      'Type de formulaire': request.formType,
      Statut: request.status,
      'Créé le': request.createdAt.toISOString(),
      'Mis à jour le': request.updatedAt.toISOString(),
      'Créé par': request.createdBy || 'Anonyme',
      'Assigné à': request.assignedTo || 'Non assigné',
      'Données': JSON.stringify(request.formData, null, 2),
      'Notes': request.notes || '',
    }));

    // Création du classeur Excel
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(data);
    
    // Ajout de la feuille au classeur
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Demandes');
    
    // Génération du fichier Excel en mémoire
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'buffer' });
    
    // Configuration de la réponse pour le téléchargement
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', `attachment; filename=demandes-${new Date().toISOString().split('T')[0]}.xlsx`);
    
    // Envoi du fichier
    res.send(excelBuffer);
  } catch (error) {
    console.error('Erreur lors de l\'export des demandes:', error);
    res.status(500).json({
      success: false,
      error: 'Une erreur est survenue lors de l\'export des demandes',
    });
  }
};

// Mettre à jour le statut d'une demande
export const updateRequestStatus = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status, notes } = req.body;

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
