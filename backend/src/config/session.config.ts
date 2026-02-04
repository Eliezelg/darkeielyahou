/**
 * Configuration Redis et Session Express
 */

import session from 'express-session';
import type { Application } from 'express';
import type { RedisClientType } from 'redis';
import { ADMIN_CONFIG } from '../../lib/config';

// Variables globales pour l'état Redis
let redisClient: RedisClientType | null = null;
let sessionStore: session.Store | null = null;
let redisAvailable = false;

interface RedisError extends Error {
  code?: string;
}

/**
 * Initialise le client Redis (uniquement en production ou si REDIS_URL est défini)
 */
async function initRedisClient(): Promise<RedisClientType | null> {
  // En développement sans REDIS_URL, ne pas essayer Redis
  if (process.env.NODE_ENV !== 'production' && !process.env.REDIS_URL) {
    console.log('Mode développement: utilisation de la session en mémoire (Redis non configuré)');
    return null;
  }

  try {
    const { createClient } = await import('redis');
    const connectRedis = (await import('connect-redis')).default;
    const RedisStore = connectRedis(session);

    const client = createClient({
      url: process.env.REDIS_URL || 'redis://localhost:6379',
      legacyMode: true,
      socket: {
        connectTimeout: 5000,
        reconnectStrategy: (retries: number) => {
          if (retries > 3) {
            console.log('Redis indisponible après 3 tentatives, utilisation de la session en mémoire');
            return false;
          }
          return 1000;
        }
      }
    });

    // Gestion des erreurs Redis sans arrêter l'application
    client.on('error', (err: RedisError) => {
      // Ignorer les erreurs ECONNREFUSED silencieusement
      if (err.code !== 'ECONNREFUSED' && !err.message?.includes('ECONNREFUSED')) {
        console.error('Erreur Redis:', err.message);
      }
    });

    client.on('connect', () => {
      if (!redisAvailable) {
        console.log('✅ Connexion à Redis établie');
        redisAvailable = true;
      }
    });

    // Tentative de connexion à Redis
    await client.connect();
    redisAvailable = true;

    // Créer le store Redis
    sessionStore = new RedisStore({
      client: client as any,
      prefix: 'darkei:sess:',
      ttl: 86400 // 24 heures
    });

    return client as unknown as RedisClientType;
  } catch (err) {
    console.warn('⚠️ Redis non disponible, utilisation de la session en mémoire');
    if (process.env.NODE_ENV !== 'production') {
      console.warn('Pour activer Redis: sudo apt install redis-server && sudo systemctl start redis');
    }
    return null;
  }
}

interface SessionConfigResult {
  redisClient: RedisClientType | null;
  sessionStore: session.Store | null;
}

/**
 * Configure la session Express avec Redis (si disponible)
 */
export function configureSession(app: Application): SessionConfigResult {
  // Initialiser Redis de manière asynchrone (non-bloquant)
  initRedisClient()
    .then(client => {
      redisClient = client;
    })
    .catch(err => {
      console.warn('Erreur initialisation Redis:', (err as Error).message);
    });

  // Configuration de la session (utilise MemoryStore par défaut)
  const sessionConfig: session.SessionOptions = {
    store: sessionStore || undefined,
    secret: ADMIN_CONFIG.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === 'production',
      maxAge: ADMIN_CONFIG.SESSION_MAX_AGE,
      httpOnly: true,
      path: '/',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax'
    },
    name: 'darkei.sid',
  };

  app.use(session(sessionConfig));

  return { redisClient, sessionStore };
}

/**
 * Ferme la connexion Redis proprement
 */
export async function closeRedisConnection(): Promise<void> {
  if (redisClient) {
    try {
      await (redisClient as any).quit();
      console.log('Connexion Redis fermée');
    } catch (error) {
      console.log('Redis déjà fermé ou erreur:', (error as Error).message);
    }
  }
}

/**
 * Retourne l'état de Redis
 */
export function isRedisAvailable(): boolean {
  return redisAvailable;
}

/**
 * Retourne le client Redis
 */
export function getRedisClient(): RedisClientType | null {
  return redisClient;
}
