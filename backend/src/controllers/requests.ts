/**
 * Controller pour la gestion des demandes (requests)
 */

import { Request, Response } from 'express';
import { PrismaClient, $Enums } from '../../generated/prisma';
import ExcelJS from 'exceljs';

const prisma = new PrismaClient();

interface RequestQuery {
  type?: string;
  status?: string;
  page?: string;
  limit?: string;
}

interface UpdateRequestBody {
  status?: $Enums.RequestStatus;
  notes?: string;
}

/**
 * Récupérer toutes les demandes
 */
export async function getRequests(req: Request, res: Response): Promise<void> {
  try {
    const { type, status, page = '1', limit = '10' } = req.query as RequestQuery;

    const pageNumber = parseInt(page, 10) || 1;
    const pageSize = parseInt(limit, 10) || 10;
    const skip = (pageNumber - 1) * pageSize;

    // Construction du filtre
    const where: Record<string, string> = {};
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
}

/**
 * Exporter les demandes en Excel
 */
export async function exportToExcel(req: Request, res: Response): Promise<void> {
  try {
    const { type, status } = req.query as RequestQuery;

    // Construction du filtre
    const where: Record<string, string> = {};
    if (type) where.formType = type;
    if (status) where.status = status;

    // Récupération des données
    const requests = await prisma.formRequest.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    });

    // Création du classeur Excel avec ExcelJS
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Demandes');

    // Définir les colonnes
    worksheet.columns = [
      { header: 'ID', key: 'id', width: 40 },
      { header: 'Type de formulaire', key: 'formType', width: 20 },
      { header: 'Statut', key: 'status', width: 15 },
      { header: 'Créé le', key: 'createdAt', width: 25 },
      { header: 'Mis à jour le', key: 'updatedAt', width: 25 },
      { header: 'Créé par', key: 'createdBy', width: 20 },
      { header: 'Assigné à', key: 'assignedTo', width: 20 },
      { header: 'Données', key: 'formData', width: 50 },
      { header: 'Notes', key: 'notes', width: 30 },
    ];

    // Style des en-têtes
    const headerRow = worksheet.getRow(1);
    headerRow.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF4A6670' } };
    headerRow.font = { bold: true, color: { argb: 'FFFFFFFF' } };

    // Ajouter les données
    requests.forEach((request) => {
      worksheet.addRow({
        id: request.id,
        formType: request.formType,
        status: request.status,
        createdAt: request.createdAt.toISOString(),
        updatedAt: request.updatedAt.toISOString(),
        createdBy: request.createdBy || 'Anonyme',
        assignedTo: request.assignedTo || 'Non assigné',
        formData: JSON.stringify(request.formData, null, 2),
        notes: request.notes || '',
      });
    });

    // Génération du fichier Excel en mémoire
    const excelBuffer = await workbook.xlsx.writeBuffer();

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
}

/**
 * Mettre à jour le statut d'une demande
 */
export async function updateRequestStatus(req: Request, res: Response): Promise<void | Response> {
  try {
    const { id } = req.params;
    const { status, notes } = req.body as UpdateRequestBody;

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
}

/**
 * Récupérer une demande spécifique par ID
 */
export async function getRequestById(req: Request, res: Response): Promise<void | Response> {
  try {
    const { id } = req.params;

    // Récupération de la demande
    const request = await prisma.formRequest.findUnique({
      where: { id },
    });

    if (!request) {
      return res.status(404).json({
        success: false,
        error: 'Demande non trouvée',
      });
    }

    res.status(200).json({
      success: true,
      data: request,
    });
  } catch (error) {
    console.error('Erreur lors de la récupération de la demande:', error);
    res.status(500).json({
      success: false,
      error: 'Une erreur est survenue lors de la récupération de la demande',
    });
  }
}

/**
 * Mettre à jour une demande complète
 */
export async function updateRequest(req: Request, res: Response): Promise<void | Response> {
  try {
    const { id } = req.params;
    const { status, notes } = req.body as UpdateRequestBody;

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
}
