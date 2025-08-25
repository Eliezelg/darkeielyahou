import Script from 'next/script';

interface StructuredDataProps {
  data: any;
}

export function StructuredData({ data }: StructuredDataProps) {
  return (
    <Script
      id="structured-data"
      type="application/ld+json"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data),
      }}
    />
  );
}

// Schema.org pour l'organisation
export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'NonProfit',
  name: 'Darkei Elyahou',
  alternateName: 'דרכי אליהו',
  url: 'https://darkei-elyahou.org',
  logo: 'https://darkei-elyahou.org/logo/logo.png',
  description: 'Association caritative œuvrant pour la communauté francophone en Israël depuis plus de 20 ans. Kollelim, aide sociale, prêts sans intérêt et actions de solidarité.',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Jérusalem',
    addressCountry: 'IL',
  },
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'customer service',
    availableLanguage: ['French', 'Hebrew'],
    areaServed: 'IL',
  },
  sameAs: [
    'https://www.facebook.com/darkeielyahou',
    'https://www.instagram.com/darkeielyahou',
  ],
  founder: {
    '@type': 'Person',
    name: 'Shemouel Marciano',
  },
  foundingDate: '2003',
  nonprofitStatus: 'Nonprofit501c3',
  areaServed: {
    '@type': 'Country',
    name: 'Israel',
  },
  knowsAbout: ['Torah', 'Aide sociale', 'Éducation juive', 'Solidarité'],
};

// Schema.org pour une page de donation
export const donateActionSchema = {
  '@context': 'https://schema.org',
  '@type': 'DonateAction',
  agent: {
    '@type': 'NonProfit',
    name: 'Darkei Elyahou',
  },
  description: 'Soutenez les actions de Darkei Elyahou pour la communauté francophone en Israël',
  url: 'https://darkei-elyahou.org/don',
  potentialAction: {
    '@type': 'DonateAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: 'https://darkei-elyahou.org/don',
    },
  },
};

// Schema.org pour un événement (gala)
export const eventSchema = (eventData: {
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  location: string;
  city: string;
}) => ({
  '@context': 'https://schema.org',
  '@type': 'Event',
  name: eventData.name,
  description: eventData.description,
  startDate: eventData.startDate,
  endDate: eventData.endDate,
  eventStatus: 'https://schema.org/EventScheduled',
  eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
  location: {
    '@type': 'Place',
    name: eventData.location,
    address: {
      '@type': 'PostalAddress',
      addressLocality: eventData.city,
      addressCountry: 'IL',
    },
  },
  organizer: {
    '@type': 'NonProfit',
    name: 'Darkei Elyahou',
    url: 'https://darkei-elyahou.org',
  },
});

// BreadcrumbList pour la navigation
export const breadcrumbSchema = (items: Array<{ name: string; url: string }>) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    item: item.url,
  })),
});