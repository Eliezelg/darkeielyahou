const { Router } = require('express');
const { login, logout, requireAuth } = require('../middleware/auth');
const { 
  getRequests, 
  getRequestById, 
  updateRequest, 
  exportToExcel, 
  updateRequestStatus 
} = require('../controllers/requests');

const router = Router();

// Route de connexion
router.post('/login', login);

// Route de déconnexion
router.post('/logout', logout);

// Routes protégées
router.use(requireAuth);

// Vérifier le profil/authentification
router.get('/profile', (req, res) => {
  // L'utilisateur est authentifié car requireAuth a été passé
  res.status(200).json({
    success: true,
    message: 'Authentifié',
    isAuthenticated: true
  });
});

// Récupérer les demandes
router.get('/requests', getRequests);

// Exporter les demandes en Excel
router.get('/requests/export', exportToExcel);

// Récupérer une demande spécifique par ID
router.get('/requests/:id', getRequestById);

// Mettre à jour une demande complète
router.put('/requests/:id', updateRequest);

// Mettre à jour le statut d'une demande
router.put('/requests/:id/status', updateRequestStatus);

module.exports = router;
