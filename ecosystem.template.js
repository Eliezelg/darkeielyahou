// FICHIER TEMPLATE - NE PAS METTRE DE VRAIES CLÉS ICI
// Copiez ce fichier en tant que 'ecosystem.config.js' et remplacez les valeurs

module.exports = {
  apps: [
    {
      name: 'darkeielyahou-frontend',
      cwd: './frontend',
      script: 'npm',
      args: 'start',
      env_production: {
        NODE_ENV: 'production',
        PORT: 3000,
        NEXT_PUBLIC_API_URL: 'https://votredomaine.com:3001', // Remplacer par votre domaine
        SENDGRID_API_KEY: 'votre_cle_sendgrid_ici',
      },
    },
    {
      name: 'darkeielyahou-backend',
      cwd: './backend',
      script: 'npm',
      args: 'start',
      env_production: {
        NODE_ENV: 'production',
        PORT: 3001,
        DATABASE_URL: "postgresql://utilisateur:motdepasse@localhost:5432/nom_bdd?schema=public",
        SESSION_SECRET: "une_phrase_secrete_tres_longue_et_aleatoire",
        DEFAULT_FROM_EMAIL: "contact@votredomaine.com",
        SENDGRID_API_KEY: 'votre_cle_sendgrid_ici',
        FRONTEND_URL: 'https://votredomaine.com',
        ALLOWED_ORIGINS: 'https://votredomaine.com,http://votredomaine.com,https://www.votredomaine.com,http://www.votredomaine.com'
      }
    }
  ]
};
