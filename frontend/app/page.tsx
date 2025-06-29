import dynamic from 'next/dynamic';

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