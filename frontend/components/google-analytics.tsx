'use client';

import Script from 'next/script';

interface GoogleAnalyticsProps {
  measurementId: string;
}

export function GoogleAnalytics({ measurementId }: GoogleAnalyticsProps) {
  if (!measurementId || process.env.NODE_ENV !== 'production') {
    return null;
  }

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${measurementId}', {
            page_path: window.location.pathname,
            anonymize_ip: true,
            cookie_flags: 'secure;samesite=strict'
          });
        `}
      </Script>
    </>
  );
}

// Hook pour envoyer des événements personnalisés
export function useGoogleAnalytics() {
  const sendEvent = (action: string, category: string, label?: string, value?: number) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', action, {
        event_category: category,
        event_label: label,
        value: value,
      });
    }
  };

  return { sendEvent };
}