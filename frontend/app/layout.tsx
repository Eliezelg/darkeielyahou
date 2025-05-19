import './globals.css';
import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { ThemeProvider } from '@/components/theme-provider';
import Header from '@/components/header';
import Footer from '@/components/footer';
import { defaultMetadata } from './metadata';

// Configuration des polices
const inter = localFont({
  src: './fonts/inter-var.woff2',
  variable: '--font-inter',
  display: 'swap',
});

const playfair = localFont({
  src: [
    {
      path: './fonts/playfair-display-var.ttf',
      weight: '400 900',
      style: 'normal',
    }
  ],
  variable: '--font-playfair',
  display: 'swap',
});

// Export des métadonnées par défaut
export const metadata = defaultMetadata;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Check if we're on an admin page
  const isAdminPage = typeof window !== 'undefined' ? 
    window.location.pathname.startsWith('/admin') : 
    false;
    
  return (
    <html lang="fr" suppressHydrationWarning>
      <body className={`${inter.variable} ${playfair.variable} font-sans`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
        >
          {/* Hide header and footer on admin pages */}
          {!isAdminPage && <Header />}
          <main className={`min-h-screen ${isAdminPage ? 'pt-0' : 'pt-32'}`}>
            {children}
          </main>
          {!isAdminPage && <Footer />}
        </ThemeProvider>
      </body>
    </html>
  );
}