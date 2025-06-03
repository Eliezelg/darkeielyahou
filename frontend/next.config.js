/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configuration ESLint
  eslint: {
    ignoreDuringBuilds: true,
  },
  
  // Configuration des images
  images: {
    // Désactive l'optimisation des images pour le développement
    unoptimized: process.env.NODE_ENV !== 'production',
    // Configuration des modèles d'URL distantes pour les images
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'darkei-elyahou.vercel.app',
      },
      {
        protocol: 'https',
        hostname: 'www.darkei-elyahou.org',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: process.env.NODE_ENV === 'development' ? '3000' : ''
      },
    ],
  },
  
  // Configuration des en-têtes de sécurité
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
        ],
      },
    ];
  },
  
  // Configuration des redirections et réécritures
  async rewrites() {
    return [
      // Exemple de réécriture d'API
      // {
      //   source: '/api/:path*',
      //   destination: 'http://localhost:3001/api/:path*',
      // },
    ];
  },
  
  // Configuration des variables d'environnement
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001',
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
  },
  
  // Configuration pour la compilation
  reactStrictMode: true,
  
  // Configuration pour les pages statiques
  // output: 'standalone',
  
  // Configuration pour la compression
  compress: true,
  
  // Configuration pour la gestion des erreurs
  onDemandEntries: {
    // Période (en ms) pendant laquelle la page sera maintenue dans le tampon
    maxInactiveAge: 25 * 1000,
    // Nombre de pages mises en mémoire tampon en même temps
    pagesBufferLength: 5,
  },
};

// Configuration spécifique à l'environnement
if (process.env.ANALYZE === 'true') {
  const withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: true,
  });
  module.exports = withBundleAnalyzer(nextConfig);
} else {
  module.exports = nextConfig;
}
