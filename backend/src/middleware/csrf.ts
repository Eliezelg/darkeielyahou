/**
 * Middleware CSRF pour la protection contre les attaques CSRF
 */

import crypto from 'crypto';
import type { Request, Response, NextFunction } from 'express';

// Étendre les types de session
declare module 'express-session' {
  interface SessionData {
    csrfToken?: string;
  }
}

interface CsrfTokenData {
  sessionId: string;
  expiresAt: number;
}

// Stockage des tokens CSRF (en production, utiliser Redis)
const csrfTokens = new Map<string, CsrfTokenData>();

// Durée de validité du token CSRF (1 heure)
const CSRF_TOKEN_EXPIRY = 60 * 60 * 1000;

/**
 * Génère un token CSRF sécurisé
 */
export function generateCsrfToken(): string {
  return crypto.randomBytes(32).toString('hex');
}

// Nettoyer les tokens expirés périodiquement
setInterval(() => {
  const now = Date.now();
  for (const [token, data] of csrfTokens.entries()) {
    if (data.expiresAt < now) {
      csrfTokens.delete(token);
    }
  }
}, 5 * 60 * 1000); // Toutes les 5 minutes

/**
 * Middleware pour générer et envoyer un token CSRF
 */
export function csrfTokenMiddleware(req: Request, res: Response, next: NextFunction): void {
  // Générer un nouveau token si nécessaire
  if (!req.session.csrfToken || !csrfTokens.has(req.session.csrfToken)) {
    const token = generateCsrfToken();
    req.session.csrfToken = token;
    csrfTokens.set(token, {
      sessionId: req.sessionID,
      expiresAt: Date.now() + CSRF_TOKEN_EXPIRY
    });
  }

  // Ajouter le token dans un cookie accessible au JavaScript (pour le frontend)
  res.cookie('XSRF-TOKEN', req.session.csrfToken, {
    httpOnly: false, // Le frontend doit pouvoir le lire
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
    maxAge: CSRF_TOKEN_EXPIRY
  });

  next();
}

/**
 * Middleware pour valider le token CSRF sur les requêtes mutantes
 */
export function validateCsrfToken(req: Request, res: Response, next: NextFunction): void | Response {
  // Ignorer les méthodes GET, HEAD, OPTIONS (safe methods)
  if (['GET', 'HEAD', 'OPTIONS'].includes(req.method)) {
    return next();
  }

  // Récupérer le token depuis le header ou le body
  const tokenFromHeader = req.headers['x-xsrf-token'] || req.headers['x-csrf-token'];
  const tokenFromBody = (req.body as Record<string, unknown>)?._csrf;
  const submittedToken = (tokenFromHeader || tokenFromBody) as string | undefined;

  // Récupérer le token attendu depuis la session
  const expectedToken = req.session?.csrfToken;

  // Vérifier la présence des tokens
  if (!submittedToken || !expectedToken) {
    return res.status(403).json({
      success: false,
      error: 'Token CSRF manquant'
    });
  }

  // Vérifier que les tokens correspondent
  if (submittedToken !== expectedToken) {
    return res.status(403).json({
      success: false,
      error: 'Token CSRF invalide'
    });
  }

  // Vérifier que le token est toujours valide
  const tokenData = csrfTokens.get(expectedToken);
  if (!tokenData || tokenData.expiresAt < Date.now()) {
    // Supprimer le token expiré
    csrfTokens.delete(expectedToken);
    delete req.session.csrfToken;

    return res.status(403).json({
      success: false,
      error: 'Token CSRF expiré'
    });
  }

  next();
}

/**
 * Route pour obtenir un token CSRF (utile pour les SPA)
 */
export function getCsrfToken(req: Request, res: Response): void {
  // S'assurer qu'un token existe
  if (!req.session.csrfToken || !csrfTokens.has(req.session.csrfToken)) {
    const token = generateCsrfToken();
    req.session.csrfToken = token;
    csrfTokens.set(token, {
      sessionId: req.sessionID,
      expiresAt: Date.now() + CSRF_TOKEN_EXPIRY
    });
  }

  res.json({
    success: true,
    csrfToken: req.session.csrfToken
  });
}
