const { APP_CONFIG } = require('../../lib/config');
const ADMIN_CONFIG = APP_CONFIG.ADMIN;
const jwt = require('jsonwebtoken');

// Vérifier le token JWT
const verifyToken = (token) => {
  try {
    if (!token) return null;
    
    // Si le JWT_SECRET n'est pas défini, utiliser PASSWORD comme fallback
    const secret = process.env.JWT_SECRET || ADMIN_CONFIG.PASSWORD;
    return jwt.verify(token, secret);
  } catch (error) {
    console.error('Erreur de vérification du token:', error.message);
    return null;
  }
};

// Middleware to require authentication
const requireAuth = (req, res, next) => {
  console.log('Auth check - Session ID:', req.sessionID);
  console.log('Auth check - Session contenu:', req.session);
  console.log('Auth check - Headers:', req.headers);
  
  // 1. Check if the user is authenticated via session
  if (req.session?.isAuthenticated) {
    console.log('Authentification réussie via session');
    return next();
  }

  // 2. Vérifier le token dans le header Authorization
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.split(' ')[1];
    console.log('Tentative d\'authentification par token dans Authorization header');
    console.log('Token reçu:', token.slice(0, 10) + '...');
    
    // Vérifier si le token est le mot de passe admin (pour compatibilité)
    if (token === ADMIN_CONFIG.PASSWORD) {
      console.log('Mot de passe administrateur utilisé comme token, authentification réussie');
      req.session.isAuthenticated = true;
      return next();
    }
    
    // Vérifier si le token est un JWT valide
    try {
      console.log('Tentative de vérification JWT avec secret:', process.env.JWT_SECRET ? 'JWT_SECRET présent' : 'JWT_SECRET absent, utilisation de PASSWORD');
      const secret = process.env.JWT_SECRET || ADMIN_CONFIG.PASSWORD;
      console.log('Secret utilisé (partiel):', typeof secret === 'string' ? secret.slice(0, 3) + '...' : 'non string');
      
      const decodedToken = verifyToken(token);
      console.log('Résultat décodage JWT:', decodedToken ? 'Token valide' : 'Token invalide');
      
      if (decodedToken) {
        console.log('JWT valide, authentification réussie');
        req.session.isAuthenticated = true;
        req.user = decodedToken;
        return next();
      }
    } catch (error) {
      console.error('Erreur lors de la vérification JWT:', error.message);
    }
    
    // Vérifier si le token correspond à un token de session stocké (rétrocompatibilité)
    console.log('Vérification token de session:', 
              'token de session:', req.session?.authToken ? req.session.authToken.slice(0, 10) + '...' : 'absent');
    
    if (req.session?.authToken === token) {
      console.log('Token de session valide, authentification réussie');
      req.session.isAuthenticated = true;
      return next();
    } else {
      console.log('Token invalide ou non présent dans la session');
    }
  }
  
  // 3. Vérifier le token dans un paramètre d'URL (pour les cas spéciaux comme les téléchargements)
  const urlToken = req.query.token;
  if (urlToken && req.session?.authToken === urlToken) {
    console.log('Token URL valide, authentification réussie');
    req.session.isAuthenticated = true;
    return next();
  }

  // Si aucune authentification n'est fournie ou valide, retourner une erreur
  console.log('Authentification échouée');
  res.status(401).json({
    success: false,
    error: 'Non autorisé',
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
    const secret = process.env.JWT_SECRET || ADMIN_CONFIG.PASSWORD;
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
