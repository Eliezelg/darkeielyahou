/**
 * Configuration Express (Helmet, CORS, JSON parser)
 */

import helmet from 'helmet';
import cors from 'cors';
import express, { Application, Request, Response, NextFunction } from 'express';

/**
 * Configure les middlewares de sécurité Helmet
 */
export function configureHelmet(app: Application): void {
  app.use(helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        scriptSrc: ["'self'"],
        imgSrc: ["'self'", "data:", "https:"],
        connectSrc: ["'self'"],
        fontSrc: ["'self'"],
        objectSrc: ["'none'"],
        mediaSrc: ["'self'"],
        frameSrc: ["'none'"],
      },
    },
    crossOriginEmbedderPolicy: false, // Désactivé pour permettre les images externes
    hsts: {
      maxAge: 31536000, // 1 an
      includeSubDomains: true,
      preload: true
    }
  }));
}

/**
 * Retourne la liste des origines CORS autorisées
 */
export function getCorsOrigins(): string[] {
  if (process.env.NODE_ENV === 'production') {
    return (process.env.ALLOWED_ORIGINS || process.env.CORS_ORIGINS || 'https://darkei-elyahou.org')
      .split(',').map(origin => origin.trim());
  }
  return ['http://localhost:3000'];
}

/**
 * Configure le middleware CORS
 */
export function configureCors(app: Application): void {
  const corsOrigins = getCorsOrigins();
  console.log('CORS Origins autorisées:', corsOrigins);

  app.use(cors({
    origin: function(origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) {
      // Permettre les requêtes sans origine (applications mobiles, Postman)
      if (!origin) return callback(null, true);

      // En développement, permettre tous les localhost
      if (process.env.NODE_ENV !== 'production' && origin.includes('localhost')) {
        return callback(null, true);
      }

      if (corsOrigins.includes(origin)) {
        callback(null, true);
      } else {
        console.log('Origine CORS bloquée:', origin);
        console.log('Origines autorisées:', corsOrigins);
        callback(new Error(`Non autorisé par CORS: ${origin}`));
      }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    preflightContinue: false,
    optionsSuccessStatus: 204
  }));
}

/**
 * Configure le parser JSON
 */
export function configureJsonParser(app: Application): void {
  app.use(express.json());
}

/**
 * Configure le middleware de logging (dev uniquement)
 */
export function configureLogging(app: Application): void {
  if (process.env.NODE_ENV !== 'production') {
    app.use((req: Request, _res: Response, next: NextFunction) => {
      console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
      next();
    });
  }
}

/**
 * Configure tous les middlewares Express de base
 */
export function configureExpress(app: Application): void {
  configureHelmet(app);
  configureCors(app);
  configureJsonParser(app);
  configureLogging(app);
}
