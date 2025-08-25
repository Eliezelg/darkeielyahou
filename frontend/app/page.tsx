import dynamic from 'next/dynamic';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Darkei Elyahou | Association caritative francophone en Israël',
  description: 'Darkei Elyahou œuvre depuis plus de 20 ans pour la communauté francophone en Israël. Kollelim, aide sociale, prêts sans intérêt, soutien éducatif et actions de solidarité à Jérusalem et dans tout Israël.',
  keywords: 'Darkei Elyahou, association juive Israël, aide sociale Jérusalem, kollel francophone, gmah Israel, tsedaka, communauté francophone Israël',
  openGraph: {
    title: 'Darkei Elyahou - Plus de 20 ans d\'actions sociales en Israël',
    description: 'Soutenez nos actions pour la communauté francophone : 6 Kollelim, 2 GMA\'H, aide sociale pour 500+ familles, projets éducatifs et solidarité.',
    images: [
      {
        url: '/images/og-home.jpg',
        width: 1200,
        height: 630,
        alt: 'Darkei Elyahou - Actions sociales et Torah en Israël',
      }
    ],
  },
};

// Composant de chargement de secours
const LoadingFallback = () => (
  <div className="flex items-center justify-center h-64">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
  </div>
);

// Import dynamique des composants avec chargement différé
const GalaCancellationSection = dynamic(() => import('@/components/gala-cancellation-section'), { ssr: true, loading: LoadingFallback });
const Hero = dynamic(() => import('@/components/hero'), { ssr: true, loading: LoadingFallback });
const Statistics = dynamic(() => import('@/components/statistics'), { ssr: true, loading: LoadingFallback });
const ActionLinks = dynamic(() => import('@/components/action-links'), { ssr: true, loading: LoadingFallback });
const ClosingBanner = dynamic(() => import('@/components/closing-banner'), { ssr: true, loading: () => null });

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <GalaCancellationSection />
      <Hero />
      <Statistics />
      <ActionLinks />
      <ClosingBanner />
    </div>
  );
}