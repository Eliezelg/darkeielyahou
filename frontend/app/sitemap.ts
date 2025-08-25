import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://darkei-elyahou.org';
  
  // Pages statiques principales
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/notre-histoire`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/actions`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/don`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/galas`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/partenariats/metarei-halev`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/mentions-legales`,
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    },
  ];

  // Pages d'actions (kollelim et actions sociales)
  const actionPages = [
    // Kollelim
    'kollel-ohalei-esther',
    'kollel-or-gabriel',
    'kollel-nichmat-hava',
    'kollel-magen-david',
    'kollel-avrekhim-cheovdim',
    'kollel-daf-hayomi',
    // Actions sociales
    'aide-sociale',
    'operation-cartable',
    'soutien-hayalim',
    'habiller-dignite',
    // GMA'H
    'gmah-hasdei-esther',
    'gmah-voitures',
  ].map(action => ({
    url: `${baseUrl}/actions/${action}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [...staticPages, ...actionPages];
}