/**
 * Middleware de rate limiting pour la protection anti-spam
 */

import type { Request, Response, NextFunction } from 'express';

interface RateLimitRecord {
  count: number;
  windowStart: number;
  blockedUntil: number;
}

interface RateLimitOptions {
  maxRequests?: number;
  windowMs?: number;
  blockDurationMs?: number;
}

/**
 * Crée un middleware de rate limiting personnalisé
 */
export function createRateLimiter(options: RateLimitOptions = {}) {
  const {
    maxRequests = 5,
    windowMs = 60 * 1000,       // 1 minute par défaut
    blockDurationMs = 15 * 60 * 1000  // 15 minutes par défaut
  } = options;

  const rateLimits = new Map<string, RateLimitRecord>();

  return (req: Request, res: Response, next: NextFunction): void | Response => {
    const ip = req.ip || (req.connection as any)?.remoteAddress || 'unknown';
    const now = Date.now();

    if (!rateLimits.has(ip)) {
      rateLimits.set(ip, { count: 1, windowStart: now, blockedUntil: 0 });
      return next();
    }

    const record = rateLimits.get(ip)!;

    // Vérifier si l'IP est bloquée
    if (record.blockedUntil > now) {
      const remainingMinutes = Math.ceil((record.blockedUntil - now) / 60000);
      return res.status(429).json({
        success: false,
        error: `Trop de requêtes. Réessayez dans ${remainingMinutes} minute(s).`
      });
    }

    // Réinitialiser la fenêtre si expirée
    if (now - record.windowStart > windowMs) {
      record.count = 1;
      record.windowStart = now;
      return next();
    }

    // Vérifier la limite
    record.count++;
    if (record.count > maxRequests) {
      record.blockedUntil = now + blockDurationMs;
      return res.status(429).json({
        success: false,
        error: 'Limite de requêtes atteinte. Veuillez patienter 15 minutes.'
      });
    }

    next();
  };
}

// Rate limiter préconfigurés pour différents cas d'usage
export const emailRateLimiter = createRateLimiter({
  maxRequests: 5,
  windowMs: 60 * 1000,
  blockDurationMs: 15 * 60 * 1000
});

export const loginRateLimiter = createRateLimiter({
  maxRequests: 5,
  windowMs: 15 * 60 * 1000,   // 15 minutes
  blockDurationMs: 30 * 60 * 1000  // 30 minutes
});

export const formRateLimiter = createRateLimiter({
  maxRequests: 10,
  windowMs: 60 * 1000,
  blockDurationMs: 10 * 60 * 1000
});
