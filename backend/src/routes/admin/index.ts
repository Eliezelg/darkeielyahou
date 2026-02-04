/**
 * Routes d'administration principales
 */

import { Router, Request, Response, NextFunction } from 'express';
import { PrismaClient } from '../../../generated/prisma';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { ADMIN_CONFIG } from '../../../lib/config';
import { requireAuth } from '../../middleware/auth';
import { validateCsrfToken } from '../../middleware/csrf';
import * as path from 'path';

const router = Router();
const prisma = new PrismaClient();

// Sous-routes
try {
  const formsRouter = require(path.join(__dirname, 'forms'));
  router.use('/forms', formsRouter);
} catch (error) {
  console.error('ERREUR lors de l\'importation du module forms:', error);
}

// Types
interface LoginAttempt {
  count: number;
  firstAttempt: number;
  lockedUntil: number;
}

// Middleware de rate limiting pour la connexion
const loginAttempts = new Map<string, LoginAttempt>();
const MAX_LOGIN_ATTEMPTS = 5;
const LOCKOUT_TIME = 15 * 60 * 1000; // 15 minutes

function rateLimitLogin(req: Request, res: Response, next: NextFunction): void | Response {
  const ip = req.ip || (req.connection as any)?.remoteAddress || 'unknown';
  const now = Date.now();

  if (!loginAttempts.has(ip)) {
    loginAttempts.set(ip, { count: 0, firstAttempt: now, lockedUntil: 0 });
  }

  const attempts = loginAttempts.get(ip)!;

  // Vérifier si l'IP est verrouillée
  if (attempts.lockedUntil > now) {
    const remainingTime = Math.ceil((attempts.lockedUntil - now) / 1000 / 60);
    return res.status(429).json({
      success: false,
      error: `Trop de tentatives de connexion. Réessayez dans ${remainingTime} minutes.`
    });
  }

  // Réinitialiser si la période est expirée
  if (attempts.firstAttempt + LOCKOUT_TIME < now) {
    attempts.count = 0;
    attempts.firstAttempt = now;
    attempts.lockedUntil = 0;
  }

  next();
}

// Route de connexion admin avec authentification par email/mot de passe
router.post('/login', rateLimitLogin, async (req: Request, res: Response): Promise<void | Response> => {
  const ip = req.ip || (req.connection as any)?.remoteAddress || 'unknown';
  const attempts = loginAttempts.get(ip)!;

  try {
    const { email, password } = req.body as { email?: string; password?: string };

    // Validation des entrées
    if (!email || !password) {
      attempts.count++;
      if (attempts.count >= MAX_LOGIN_ATTEMPTS) {
        attempts.lockedUntil = Date.now() + LOCKOUT_TIME;
      }
      return res.status(400).json({
        success: false,
        error: 'Email et mot de passe requis'
      });
    }

    // Rechercher l'utilisateur admin
    const admin = await prisma.adminUser.findUnique({
      where: { email: email.toLowerCase() }
    });

    if (!admin || !admin.isActive) {
      attempts.count++;
      if (attempts.count >= MAX_LOGIN_ATTEMPTS) {
        attempts.lockedUntil = Date.now() + LOCKOUT_TIME;
      }
      return res.status(401).json({
        success: false,
        error: 'Email ou mot de passe incorrect'
      });
    }

    // Vérifier le mot de passe
    const isValidPassword = await bcrypt.compare(password, admin.password);

    if (!isValidPassword) {
      attempts.count++;
      if (attempts.count >= MAX_LOGIN_ATTEMPTS) {
        attempts.lockedUntil = Date.now() + LOCKOUT_TIME;
      }
      return res.status(401).json({
        success: false,
        error: 'Email ou mot de passe incorrect'
      });
    }

    // Réinitialiser les tentatives en cas de succès
    loginAttempts.delete(ip);

    // Mettre à jour la dernière connexion
    await prisma.adminUser.update({
      where: { id: admin.id },
      data: { lastLoginAt: new Date() }
    });

    // Création du token JWT avec les informations de l'admin
    const token = jwt.sign(
      {
        userId: admin.id,
        email: admin.email,
        fullName: admin.fullName,
        isAdmin: true
      },
      ADMIN_CONFIG.SESSION_SECRET,
      { expiresIn: '24h' }
    );

    // Définir une variable de session pour l'admin
    req.session.user = {
      userId: admin.id,
      email: admin.email,
      fullName: admin.fullName,
      isAdmin: true,
      loginTime: new Date()
    };

    await new Promise<void>((resolve, reject) => {
      req.session.save(err => {
        if (err) {
          console.error('Erreur lors de l\'enregistrement de la session:', err);
          reject(err);
        } else {
          resolve();
        }
      });
    });

    res.status(200).json({
      success: true,
      message: 'Connexion réussie',
      authToken: token,
      expiresIn: '24h'
    });
  } catch (error) {
    const err = error as Error;
    console.error('Erreur lors de la connexion admin:', err);
    res.status(500).json({
      success: false,
      error: 'Une erreur est survenue lors de la connexion',
      details: process.env.NODE_ENV === 'development' ? err.message : undefined,
    });
  }
});

// Route de déconnexion
router.post('/logout', (req: Request, res: Response): void => {
  try {
    // Destruction de la session
    req.session.destroy((err) => {
      if (err) {
        console.error('Erreur lors de la déconnexion:', err);
        res.status(500).json({
          success: false,
          error: 'Erreur lors de la déconnexion'
        });
        return;
      }

      res.clearCookie('darkei.sid');

      res.status(200).json({
        success: true,
        message: 'Déconnexion réussie'
      });
    });
  } catch (error) {
    const err = error as Error;
    console.error('Erreur lors de la déconnexion:', err);
    res.status(500).json({
      success: false,
      error: 'Une erreur est survenue lors de la déconnexion',
      details: process.env.NODE_ENV === 'development' ? err.message : undefined,
    });
  }
});

// Vérification du profil admin (authentification)
router.get('/profile', requireAuth, (req: Request, res: Response): void => {
  res.status(200).json({
    success: true,
    user: {
      userId: req.user?.userId,
      email: req.user?.email,
      fullName: req.user?.fullName,
      isAdmin: req.user?.isAdmin
    }
  });
});

// Route pour changer le mot de passe (protégée par CSRF)
router.post('/change-password', requireAuth, validateCsrfToken, async (req: Request, res: Response): Promise<void | Response> => {
  try {
    const { currentPassword, newPassword } = req.body as { currentPassword?: string; newPassword?: string };
    const userId = req.user?.userId;

    // Validation
    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        error: 'Mot de passe actuel et nouveau mot de passe requis'
      });
    }

    if (newPassword.length < 8) {
      return res.status(400).json({
        success: false,
        error: 'Le nouveau mot de passe doit contenir au moins 8 caractères'
      });
    }

    if (!userId) {
      return res.status(401).json({
        success: false,
        error: 'Utilisateur non authentifié'
      });
    }

    // Récupérer l'utilisateur
    const admin = await prisma.adminUser.findUnique({
      where: { id: userId }
    });

    if (!admin) {
      return res.status(404).json({
        success: false,
        error: 'Utilisateur non trouvé'
      });
    }

    // Vérifier le mot de passe actuel
    const isValidPassword = await bcrypt.compare(currentPassword, admin.password);

    if (!isValidPassword) {
      return res.status(401).json({
        success: false,
        error: 'Mot de passe actuel incorrect'
      });
    }

    // Hasher le nouveau mot de passe
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Mettre à jour le mot de passe
    await prisma.adminUser.update({
      where: { id: userId },
      data: { password: hashedPassword }
    });

    res.status(200).json({
      success: true,
      message: 'Mot de passe modifié avec succès'
    });
  } catch (error) {
    const err = error as Error;
    console.error('Erreur lors du changement de mot de passe:', err);
    res.status(500).json({
      success: false,
      error: 'Une erreur est survenue lors du changement de mot de passe'
    });
  }
});

export = router;
