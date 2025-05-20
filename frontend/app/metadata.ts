import { Metadata, Viewport } from 'next';

// Titre par défaut de l'application
const DEFAULT_TITLE = 'Darkei Elyahou | Actions sociales et Torah pour la communauté francophone en Israël';

export const defaultMetadata: Metadata = {
  metadataBase: new URL('https://darkei-elyahou.org'),
  title: DEFAULT_TITLE,
  description: 'Darkei Elyahou soutient la communauté francophone en Israël avec des Kollelim, GMA\'H, aide sociale, projets éducatifs et actions de solidarité. Découvrez nos initiatives et contribuez à notre mission.',
  keywords: [
    'Darkei Elyahou', 
    'Kollel Jérusalem', 
    "GMA'H Israël", 
    'aide sociale francophone', 
    'Jérusalem francophone', 
    'Torah étude', 
    'communauté juive francophone Israël', 
    'actions sociales Jérusalem', 
    'dons association juive',
    'Israël francophone',
    'association caritative juive',
    'aide financière Israël',
    'cours de Torah francophone',
    'soutien aux familles juives',
    'solidarité Israel',
    'Hesed',
    'actions solidaires',
    'Tsedaka',
  ],
  authors: [{ name: 'Darkei Elyahou' }],
  creator: 'Darkei Elyahou',
  publisher: 'Darkei Elyahou',
  formatDetection: {
    email: true,
    address: true,
    telephone: true,
  },
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: 'https://darkei-elyahou.org',
    siteName: 'Darkei Elyahou',
    title: 'Darkei Elyahou | Actions sociales et Torah pour la communauté francophone en Israël',
    description: 'Soutenez nos actions de solidarité et d"étude de la Torah pour la communauté francophone en Israël. Kollelim, GMA"H, aide sociale et projets éducatifs.',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Darkei Elyahou - Actions sociales et Torah pour la communauté francophone en Israël',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Darkei Elyahou | Actions sociales et Torah en Israël',
    description: 'Soutenez nos actions de solidarité et d"étude de la Torah pour la communauté francophone en Israël. #Kollelim #GMAH #AideSociale',
    images: ['/images/og-image.jpg'],
    creator: '@darkeielyahou',
    site: '@darkeielyahou',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-192x192.png', sizes: '192x192', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180' },
    ],
    other: [
      {
        rel: 'mask-icon',
        url: '/safari-pinned-tab.svg',
        color: '#1e40af',
      },
    ],
  },
  manifest: '/site.webmanifest',
  verification: {
    google: 'YOUR_GOOGLE_VERIFICATION_CODE',
  },
  alternates: {
    canonical: 'https://darkei-elyahou.org',
    languages: {
      'fr-FR': 'https://darkei-elyahou.org',
      'he-IL': 'https://darkei-elyahou.org/he',
    },
  },
  category: 'Association caritative',
  other: {
    'msapplication-TileColor': '#1e40af',
    'msapplication-config': '/browserconfig.xml',
  },
};

// Configuration du viewport séparée pour Next.js 15
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#1e293b' },
  ],
};

// Fonction utilitaire pour générer des métadonnées spécifiques à une page
export function generatePageMetadata(
  title: string,
  description?: string,
  image?: string
): Metadata {
  const pageTitle = `${title} | Darkei Elyahou`;
  const pageDescription = description || (defaultMetadata.description as string);
  
  return {
    ...defaultMetadata,
    title: pageTitle,
    description: pageDescription,
    openGraph: {
      ...defaultMetadata.openGraph,
      title: pageTitle,
      description: pageDescription,
      ...(image ? {
        images: [
          {
            url: image,
            width: 1200,
            height: 630,
            alt: title,
          },
        ],
      } : {}),
    },
    twitter: {
      ...defaultMetadata.twitter,
      title: pageTitle,
      description: pageDescription,
      ...(image ? { images: [image] } : {}),
    },
  };
}
