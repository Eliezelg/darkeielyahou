import { Router } from 'express';
import { login, logout, requireAuth } from '../middleware/auth';
import { getRequests, exportToExcel, updateRequestStatus } from '../controllers/requests';

const router = Router();

// Route de connexion
router.post('/login', login);

// Route de déconnexion
router.post('/logout', logout);

// Routes protégées
router.use(requireAuth);

// Récupérer les demandes
router.get('/requests', getRequests);

// Exporter les demandes en Excel
router.get('/requests/export', exportToExcel);

// Mettre à jour le statut d'une demande
router.put('/requests/:id/status', updateRequestStatus);

export default router;
