import { Metadata, Viewport } from 'next';

// Titre par défaut de l'application
const DEFAULT_TITLE = 'Darkei Elyahou | Aidez-nous à vous aider';

export const defaultMetadata: Metadata = {
  metadataBase: new URL('https://darkei-elyahou.org'),
  title: DEFAULT_TITLE,
  description: 'Darkei Elyahou aide la communauté francophone en Israël à travers des actions concrètes de Torah, de \'Hessed et de soutien social. Kollelim, GMA\'H, aide sociale et plus encore.',
  keywords: [
    'Darkei Elyahou', 
    'Kollel', 
    "GMA'H", 
    'aide sociale', 
    'Jérusalem', 
    'Torah', 
    'communauté francophone', 
    'actions sociales', 
    'dons',
    'Israël',
    'association caritative',
    'aides financières',
    'cours de Torah',
    'soutien aux familles',
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
    title: 'Darkei Elyahou | Aidez-nous à vous aider',
    description: 'Une main tendue. Une Torah vivante. Une réponse à chaque besoin.',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Darkei Elyahou - Une main tendue, une Torah vivante',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Darkei Elyahou | Aidez-nous à vous aider',
    description: 'Une main tendue. Une Torah vivante. Une réponse à chaque besoin.',
    images: ['/images/og-image.jpg'],
    creator: '@darkeielyahou',
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
    yandex: 'YOUR_YANDEX_VERIFICATION_CODE',
    yahoo: 'YOUR_YAHOO_VERIFICATION_CODE',
  },
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
