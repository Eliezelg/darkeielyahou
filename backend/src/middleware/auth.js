const { APP_CONFIG, ADMIN_CONFIG } = require('../../lib/config');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('../../generated/prisma');

const prisma = new PrismaClient();

// Vérifier le token JWT
const verifyToken = (token) => {
  try {
    if (!token) return null;
    
    console.log('Vérification du token JWT');
    // Utiliser SESSION_SECRET comme clé principale, puis JWT_SECRET, puis un fallback
    const secret = ADMIN_CONFIG.SESSION_SECRET || process.env.JWT_SECRET || 'votre_clé_secrète_jwt';
    console.log('Secret utilisé (partiel):', secret.substring(0, 3) + '...');
    
    return jwt.verify(token, secret);
  } catch (error) {
    console.error('Erreur de vérification du token:', error.message);
    return null;
  }
};

// Middleware to require authentication
const requireAuth = async (req, res, next) => {
  console.log('Auth check - Headers:', req.headers);
  
  // Vérifier le token dans le header Authorization
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.split(' ')[1];
    console.log('Tentative d\'authentification par token JWT');
    
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
    console.log('Authentification via session');
    
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
  console.log('Authentification échouée');
  res.status(401).json({
    success: false,
    error: 'Authentification requise',
  });
};

// Middleware for login page
const login = (req, res) => {
  const { password } = req.body;
  console.log('Tentative de connexion avec mot de passe:', password ? '******' : 'non fourni');
  console.log('Session avant authentification:', req.sessionID, req.session);

  if (password === ADMIN_CONFIG.PASSWORD) {
    // Authentication successful
    req.session.isAuthenticated = true;
    
    // Générer un token JWT pour l'authentification
    const secret = ADMIN_CONFIG.SESSION_SECRET || process.env.JWT_SECRET || 'votre_clé_secrète_jwt';
    const authToken = jwt.sign(
      { username: 'admin', isAdmin: true },
      secret,
      { expiresIn: '24h' }
    );
    
    // Générer aussi un token simple pour la session (rétrocompatibilité)
    const sessionToken = require('crypto').randomBytes(32).toString('hex');
    req.session.authToken = sessionToken;
    
    // Sauvegarder explicitement la session
    req.session.save((err) => {
      if (err) {
        console.error('Erreur lors de la sauvegarde de la session:', err);
        return res.status(500).json({
          success: false,
          error: 'Erreur lors de la sauvegarde de la session',
        });
      }
      
      console.log('Connexion réussie, session sauvegardée:', req.sessionID);
      return res.status(200).json({
        success: true,
        message: 'Connexion réussie',
        // Envoyer le token JWT au client pour stockage dans localStorage
        authToken: authToken
      });
    });
    return;
  }

  // Authentication failed
  console.log('Échec de connexion: mot de passe incorrect');
  res.status(401).json({
    success: false,
    error: 'Mot de passe incorrect',
  });
};

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
  login,
  logout
};
