const { PrismaClient } = require('../../generated/prisma');
const ExcelJS = require('exceljs');

const prisma = new PrismaClient();

// Récupérer toutes les demandes
const getRequests = async (req, res) => {
  try {
    const { type, status, page = '1', limit = '10' } = req.query;
    
    const pageNumber = parseInt(page, 10) || 1;
    const pageSize = parseInt(limit, 10) || 10;
    const skip = (pageNumber - 1) * pageSize;

    // Construction du filtre
    const where = {};
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
const exportToExcel = async (req, res) => {
  try {
    const { type, status } = req.query;

    // Construction du filtre
    const where = {};
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
    worksheet.getRow(1).font = { bold: true };
    worksheet.getRow(1).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '4A6670' } };
    worksheet.getRow(1).font = { bold: true, color: { argb: 'FFFFFFFF' } };

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
};

// Mettre à jour le statut d'une demande
const updateRequestStatus = async (req, res) => {
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

// Récupérer une demande spécifique par ID
const getRequestById = async (req, res) => {
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
};

// Mettre à jour une demande complète
const updateRequest = async (req, res) => {
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

module.exports = {
  getRequests,
  getRequestById,
  updateRequest,
  exportToExcel,
  updateRequestStatus
};
