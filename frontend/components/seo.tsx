import Head from 'next/head';

interface SEOProps {
  title: string;
  description: string;
  canonicalUrl?: string;
  ogImage?: string;
}

/**
 * Composant SEO pour optimiser le référencement des pages
 */
export default function SEO({
  title,
  description,
  canonicalUrl,
  ogImage = '/images/og-image.jpg',
}: SEOProps) {
  // Titre complet avec le nom du site
  const fullTitle = `${title} | Darkei Elyahou`;
  
  return (
    <Head>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      
      {/* Canonical URL */}
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      
      {/* Favicon */}
      <link rel="icon" href="/favicon.ico" />
    </Head>
  );
}
