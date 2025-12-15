const { ADMIN_CONFIG } = require('../../lib/config');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('../../generated/prisma');

const prisma = new PrismaClient();

// Vérifier le token JWT
// SÉCURITÉ: Utilise uniquement SESSION_SECRET défini via variable d'environnement
const verifyToken = (token) => {
  try {
    if (!token) return null;

    // SÉCURITÉ: Pas de fallback - SESSION_SECRET est obligatoire (vérifié dans config.js)
    const secret = ADMIN_CONFIG.SESSION_SECRET;

    return jwt.verify(token, secret);
  } catch (error) {
    console.error('Erreur de vérification du token:', error.message);
    return null;
  }
};

// Middleware to require authentication
const requireAuth = async (req, res, next) => {
  // Vérifier le token dans le header Authorization
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.split(' ')[1];
    
    try {
      const decodedToken = verifyToken(token);
      
      if (decodedToken) {
        // Vérifier que l'utilisateur existe toujours et est actif
        if (decodedToken.userId) {
          const admin = await prisma.adminUser.findUnique({
            where: { id: decodedToken.userId }
          });
          
          if (!admin || !admin.isActive) {
            return res.status(401).json({
              success: false,
              error: 'Compte administrateur inactif ou supprimé'
            });
          }
          
          req.user = {
            userId: admin.id,
            email: admin.email,
            fullName: admin.fullName,
            isAdmin: true
          };
        } else {
          // Support ancien format de token
          req.user = decodedToken;
        }
        
        return next();
      }
    } catch (error) {
      console.error('Erreur lors de la vérification JWT:', error.message);
    }
  }
  
  // Vérifier la session (fallback)
  if (req.session?.user) {
    
    if (req.session.user.userId) {
      const admin = await prisma.adminUser.findUnique({
        where: { id: req.session.user.userId }
      });
      
      if (!admin || !admin.isActive) {
        req.session.destroy();
        return res.status(401).json({
          success: false,
          error: 'Compte administrateur inactif ou supprimé'
        });
      }
    }
    
    req.user = req.session.user;
    return next();
  }

  // Si aucune authentification n'est fournie ou valide, retourner une erreur
  res.status(401).json({
    success: false,
    error: 'Authentification requise',
  });
};

// NOTE: La fonction login legacy a été supprimée pour des raisons de sécurité.
// L'authentification se fait désormais via /api/admin/login avec email/mot de passe
// et vérification bcrypt (voir backend/src/routes/admin/index.js)

// Middleware for logout
const logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error('Erreur lors de la déconnexion:', err);
      return res.status(500).json({
        success: false,
        error: 'Erreur lors de la déconnexion',
      });
    }
    
    res.clearCookie('connect.sid'); // Session cookie name
    res.status(200).json({
      success: true,
      message: 'Déconnexion réussie',
    });
  });
};

module.exports = {
  requireAuth,
  logout
};
