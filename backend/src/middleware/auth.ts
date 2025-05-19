import { Request, Response, NextFunction } from 'express';
import { ADMIN_CONFIG } from '../config';

// Interface pour étendre le type Request d'Express
declare module 'express-session' {
  interface SessionData {
    isAuthenticated?: boolean;
  }
}

export const requireAuth = (req: Request, res: Response, next: NextFunction) => {
  // Vérifier si l'utilisateur est authentifié via la session
  if (req.session?.isAuthenticated) {
    return next();
  }

  // Si l'en-tête Authorization est présent, vérifier le token
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.split(' ')[1];
    
    // Vérifier le token (dans ce cas, c'est simplement le mot de passe)
    if (token === ADMIN_CONFIG.PASSWORD) {
      req.session.isAuthenticated = true;
      return next();
    }
  }

  // Si aucune authentification n'est fournie, retourner une erreur
  res.status(401).json({
    success: false,
    error: 'Non autorisé',
  });
};

// Middleware pour la page de connexion
export const login = (req: Request, res: Response) => {
  const { password } = req.body;

  if (password === ADMIN_CONFIG.PASSWORD) {
    // Authentification réussie
    req.session.isAuthenticated = true;
    
    return res.status(200).json({
      success: true,
      message: 'Connexion réussie',
    });
  }

  // Échec de l'authentification
  res.status(401).json({
    success: false,
    error: 'Mot de passe incorrect',
  });
};

// Middleware pour la déconnexion
export const logout = (req: Request, res: Response) => {
  req.session.destroy((err) => {
    if (err) {
      console.error('Erreur lors de la déconnexion:', err);
      return res.status(500).json({
        success: false,
        error: 'Erreur lors de la déconnexion',
      });
    }
    
    res.clearCookie('connect.sid'); // Le nom du cookie de session
    res.status(200).json({
      success: true,
      message: 'Déconnexion réussie',
    });
  });
};
