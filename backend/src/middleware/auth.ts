/**
 * Middleware d'authentification pour l'administration
 */

import jwt from 'jsonwebtoken';
import type { Request, Response, NextFunction } from 'express';
import { ADMIN_CONFIG } from '../../lib/config';
import { PrismaClient } from '../../generated/prisma';

const prisma = new PrismaClient();

// Étendre les types Express
declare global {
  namespace Express {
    interface Request {
      user?: UserPayload;
    }
  }
}

// Étendre les types de session
declare module 'express-session' {
  interface SessionData {
    user?: UserPayload;
  }
}

interface UserPayload {
  userId?: string;
  email?: string;
  fullName?: string;
  isAdmin?: boolean;
  loginTime?: Date;
}

interface DecodedToken extends UserPayload {
  iat?: number;
  exp?: number;
}

/**
 * Vérifie le token JWT
 */
function verifyToken(token: string | undefined): DecodedToken | null {
  try {
    if (!token) return null;

    // SÉCURITÉ: Pas de fallback - SESSION_SECRET est obligatoire (vérifié dans config.js)
    const secret = ADMIN_CONFIG.SESSION_SECRET;

    return jwt.verify(token, secret) as DecodedToken;
  } catch (error) {
    const err = error as Error;
    console.error('Erreur de vérification du token:', err.message);
    return null;
  }
}

/**
 * Middleware pour exiger l'authentification
 */
export async function requireAuth(req: Request, res: Response, next: NextFunction): Promise<void | Response> {
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
      const err = error as Error;
      console.error('Erreur lors de la vérification JWT:', err.message);
    }
  }

  // Vérifier la session (fallback)
  if (req.session?.user) {
    if (req.session.user.userId) {
      const admin = await prisma.adminUser.findUnique({
        where: { id: req.session.user.userId }
      });

      if (!admin || !admin.isActive) {
        req.session.destroy(() => {});
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
  return res.status(401).json({
    success: false,
    error: 'Authentification requise',
  });
}

/**
 * Middleware pour la déconnexion
 */
export function logout(req: Request, res: Response): void {
  req.session.destroy((err) => {
    if (err) {
      console.error('Erreur lors de la déconnexion:', err);
      res.status(500).json({
        success: false,
        error: 'Erreur lors de la déconnexion',
      });
      return;
    }

    res.clearCookie('darkei.sid'); // Session cookie name
    res.status(200).json({
      success: true,
      message: 'Déconnexion réussie',
    });
  });
}

/**
 * Ferme la connexion Prisma
 */
export async function closePrismaConnection(): Promise<void> {
  await prisma.$disconnect();
}
