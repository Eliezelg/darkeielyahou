const express = require('express');
const router = express.Router();
const { PrismaClient, $Enums } = require('../../generated/prisma');
const ExcelJS = require('exceljs');
const path = require('path');
const fs = require('fs');
const { requireAuth } = require('../middleware/auth');
const prisma = new PrismaClient();

// Route pour exporter les inscriptions au gala en Excel
router.get('/gala-registrations', requireAuth, async (req, res) => {
  try {
    // L'authentification est déjà vérifiée par le middleware requireAuth
    // req.user contient les informations de l'utilisateur authentifié
    console.log('Export demandé par:', req.user);

    // Récupérer toutes les inscriptions au gala
    const registrations = await prisma.formRequest.findMany({
      where: {
        formType: $Enums.FormType.GALA_REGISTRATION
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
      { header: 'ID', key: 'id', width: 30 },
      { header: 'Prénom', key: 'firstName', width: 20 },
      { header: 'Nom', key: 'lastName', width: 20 },
      { header: 'Email', key: 'email', width: 30 },
      { header: 'Téléphone', key: 'phone', width: 20 },
      { header: 'Ville', key: 'city', width: 15 },
      { header: 'Participants Hommes', key: 'maleAttendees', width: 15 },
      { header: 'Participants Femmes', key: 'femaleAttendees', width: 15 },
      { header: 'Total Participants', key: 'totalAttendees', width: 15 },
      { header: 'Restrictions Alimentaires', key: 'dietaryRestrictions', width: 25 },
      { header: 'Message', key: 'message', width: 40 },
      { header: 'Date d\'inscription', key: 'createdAt', width: 25 },
      { header: 'Statut', key: 'status', width: 15 }
    ];

    // Style des en-têtes
    worksheet.getRow(1).font = { bold: true, color: { argb: 'FFFFFFFF' } };
    worksheet.getRow(1).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '4A6670' } };
    worksheet.getRow(1).alignment = { vertical: 'middle', horizontal: 'center' };

    // Ajouter les données
    registrations.forEach(registration => {
      const data = registration.formData;
      
      worksheet.addRow({
        id: registration.id,
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
        dietaryRestrictions: data.dietaryRestrictions || '',
        message: data.message || '',
        createdAt: registration.createdAt.toLocaleString('fr-FR'),
        status: registration.status
      });
    });

    // Alternance des couleurs de lignes pour une meilleure lisibilité
    worksheet.eachRow({ includeEmpty: false }, function(row, rowNumber) {
      if (rowNumber > 1) { // Ignorer la ligne d'en-tête
        const fill = rowNumber % 2 === 0 
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
        // Supprimer le fichier après l'avoir envoyé ou en cas d'erreur
        fs.unlink(filePath, (unlinkErr) => {
          if (unlinkErr) console.error('Erreur lors de la suppression du fichier temporaire:', unlinkErr);
        });
      } else {
        // Supprimer le fichier après l'avoir envoyé
        fs.unlink(filePath, (unlinkErr) => {
          if (unlinkErr) console.error('Erreur lors de la suppression du fichier temporaire:', unlinkErr);
        });
      }
    });
  } catch (error) {
    console.error('Erreur lors de l\'exportation des inscriptions au gala:', error);
    res.status(500).json({
      success: false,
      error: 'Une erreur est survenue lors de l\'exportation',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

module.exports = router;
