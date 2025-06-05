module.exports = {
  apps : [
    {
      name          : 'darkeielyahou-frontend',
      cwd           : './frontend',
      script        : 'npm',
      args          : 'start',
      instances     : 'max',               // Exécuter sur tous les CPU disponibles
      exec_mode     : 'cluster',           // Mode cluster pour une meilleure performance
      watch         : false,               // Désactiver le watch en production
      max_memory_restart: '500M',          // Redémarrer si l'utilisation mémoire dépasse cette limite
      env_production: {
        NODE_ENV: 'production',
        PORT: 3000,
        NEXT_PUBLIC_API_URL: 'https://darkei-elyahou.org/api',
        NEXT_PUBLIC_SITE_URL: 'https://darkei-elyahou.org',
      },
    },
    {
      name          : 'darkeielyahou-backend',
      cwd           : './backend',
      script        : 'npm',
      args          : 'start',
      instances     : 'max',               // Exécuter sur tous les CPU disponibles
      exec_mode     : 'cluster',           // Mode cluster pour une meilleure performance
      watch         : false,               // Désactiver le watch en production
      max_memory_restart: '500M',          // Redémarrer si l'utilisation mémoire dépasse cette limite
      env_production: {
        NODE_ENV: 'production',
        PORT: 3001,
        // Utiliser les variables d'environnement au lieu de coder en dur les secrets
        FRONTEND_URL: 'https://darkei-elyahou.org',
        ALLOWED_ORIGINS: 'https://darkei-elyahou.org,https://www.darkei-elyahou.org',
        // Les secrets sensibles doivent être stockés dans le fichier .env.production
      }
    }
  ]
};
