/**
 * Routes d'exportation des données
 */

import { Router, Request, Response } from 'express';
import { PrismaClient, $Enums } from '../../generated/prisma';
import ExcelJS from 'exceljs';
import * as path from 'path';
import * as fs from 'fs';
import { requireAuth } from '../middleware/auth';

const router = Router();
const prisma = new PrismaClient();

interface GalaFormData {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  phoneCountryCode?: string;
  phoneNumber?: string;
  city?: string;
  maleAttendees?: string | number;
  femaleAttendees?: string | number;
  attendees?: {
    male?: number;
    female?: number;
    total?: number;
  };
}

// Route pour exporter les inscriptions au gala en Excel
router.get('/gala-registrations', requireAuth, async (req: Request, res: Response): Promise<void | Response> => {
  try {
    // L'authentification est déjà vérifiée par le middleware requireAuth
    console.log('Export demandé par:', req.user);

    // Récupérer toutes les inscriptions au gala
    const registrations = await prisma.formRequest.findMany({
      where: {
        formType: $Enums.FormType.GALA
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    if (!registrations.length) {
      return res.status(404).json({
        success: false,
        error: 'Aucune inscription au gala trouvée'
      });
    }

    // Créer un nouveau classeur Excel
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Inscriptions Gala');

    // Définir les en-têtes
    worksheet.columns = [
      { header: 'Prénom', key: 'firstName', width: 20 },
      { header: 'Nom', key: 'lastName', width: 20 },
      { header: 'Email', key: 'email', width: 30 },
      { header: 'Téléphone', key: 'phone', width: 20 },
      { header: 'Ville', key: 'city', width: 15 },
      { header: 'Participants Hommes', key: 'maleAttendees', width: 15 },
      { header: 'Participants Femmes', key: 'femaleAttendees', width: 15 },
      { header: 'Total Participants', key: 'totalAttendees', width: 15 },
      { header: 'Date d\'inscription', key: 'createdAt', width: 25 },
      { header: 'Statut', key: 'status', width: 15 }
    ];

    // Style des en-têtes
    const headerRow = worksheet.getRow(1);
    headerRow.font = { bold: true, color: { argb: 'FFFFFFFF' } };
    headerRow.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF4A6670' } };
    headerRow.alignment = { vertical: 'middle', horizontal: 'center' };

    // Ajouter les données
    registrations.forEach(registration => {
      const data = registration.formData as GalaFormData;

      worksheet.addRow({
        firstName: data.firstName || '',
        lastName: data.lastName || '',
        email: data.email || '',
        phone: data.phone || `${data.phoneCountryCode || ''}${data.phoneNumber || ''}`,
        city: data.city || '',
        maleAttendees: data.maleAttendees || data.attendees?.male || '0',
        femaleAttendees: data.femaleAttendees || data.attendees?.female || '0',
        totalAttendees: data.attendees?.total ||
          (Number(data.maleAttendees || data.attendees?.male || 0) +
           Number(data.femaleAttendees || data.attendees?.female || 0)).toString(),
        createdAt: registration.createdAt.toLocaleString('fr-FR'),
        status: registration.status
      });
    });

    // Alternance des couleurs de lignes pour une meilleure lisibilité
    worksheet.eachRow({ includeEmpty: false }, function(row, rowNumber) {
      if (rowNumber > 1) { // Ignorer la ligne d'en-tête
        const fill: ExcelJS.Fill = rowNumber % 2 === 0
          ? { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFF9F9F9' } }
          : { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFFFFFFF' } };
        row.eachCell({ includeEmpty: true }, function(cell) {
          cell.fill = fill;
        });
      }
    });

    // Créer le dossier de sortie s'il n'existe pas
    const exportsDir = path.join(__dirname, '../../exports');
    if (!fs.existsSync(exportsDir)) {
      fs.mkdirSync(exportsDir, { recursive: true });
    }

    // Générer un nom de fichier unique avec la date
    const dateString = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);
    const fileName = `inscriptions_gala_${dateString}.xlsx`;
    const filePath = path.join(exportsDir, fileName);

    // Écrire le fichier Excel
    await workbook.xlsx.writeFile(filePath);

    // Envoyer le fichier au client
    res.download(filePath, fileName, (err) => {
      if (err) {
        console.error('Erreur lors de l\'envoi du fichier:', err);
      }
      // Supprimer le fichier après l'avoir envoyé
      fs.unlink(filePath, (unlinkErr) => {
        if (unlinkErr) console.error('Erreur lors de la suppression du fichier temporaire:', unlinkErr);
      });
    });
  } catch (error) {
    const err = error as Error;
    console.error('Erreur lors de l\'exportation des inscriptions au gala:', err);
    res.status(500).json({
      success: false,
      error: 'Une erreur est survenue lors de l\'exportation',
      details: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  }
});

export = router;
