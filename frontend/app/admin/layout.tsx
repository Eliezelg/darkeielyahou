'use client';

import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { 
  LayoutDashboard, 
  FileText, 
  LogOut,
  Settings,
  ChevronRight
} from 'lucide-react';
import { FormCategorySidebar } from '@/components/admin/form-category-sidebar';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [isClient, setIsClient] = useState(false);

  // Ensure we're on client side before trying to access localStorage
  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleLogout = async () => {
    try {
      if (typeof window !== 'undefined') {
        // Supprimer d'abord le token du localStorage
        localStorage.removeItem('darkei_admin_auth_token');
        
        // Appel au backend pour détruire la session
        const API_URL = process.env.NEXT_PUBLIC_API_URL;
        await fetch(`${API_URL}/api/admin/logout`, {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json'
          }
        }).catch(e => console.error('Erreur API déconnexion:', e));
        
        // Forcer un délai court avant la redirection pour permettre au fetch de terminer
        setTimeout(() => {
          // Forcer une redirection complète avec le paramètre de déconnexion
          document.cookie = 'darkei.sid=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
          document.cookie = 'connect.sid=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
          window.location.replace('/admin?logout=true');
        }, 100);
      }
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error);
      // En cas d'échec, forcer quand même la redirection
      localStorage.removeItem('darkei_admin_auth_token');
      document.cookie = 'darkei.sid=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
      document.cookie = 'connect.sid=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
      window.location.replace('/admin?logout=true');
    }
  };

  // Check if we're on the login page
  const isLoginPage = pathname === '/admin' || pathname === '/admin/login';

  // Don't apply admin layout on login page
  if (isLoginPage) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Admin Header */}
      <header className="bg-gray-900 text-white py-4 px-6 flex justify-between items-center shadow-md sticky top-0 z-50">
        <div className="flex items-center space-x-2">
          <Link href="/admin/dashboard" className="flex items-center">
            <div className="relative h-10 w-40 mr-2">
              <Image 
                src="/logo/logo.png" 
                alt="Darkei Elyahou Admin" 
                fill
                style={{ objectFit: 'contain' }}
                priority
              />
            </div>
            <span className="font-semibold text-sm md:text-base">Administration</span>
          </Link>
        </div>
        
        {isClient && (
          <Button variant="ghost" size="sm" onClick={handleLogout}>
            <LogOut className="w-4 h-4 mr-2" />
            Déconnexion
          </Button>
        )}
      </header>

      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="bg-gray-800 text-white w-64 flex-shrink-0 hidden md:block">
          <nav className="p-4">
            <ul className="space-y-2">
              <li>
                <Link 
                  href="/admin/dashboard" 
                  className={`flex items-center p-3 rounded-lg transition-colors ${
                    pathname === '/admin/dashboard' 
                      ? 'bg-primary text-white' 
                      : 'hover:bg-gray-700'
                  }`}
                >
                  <LayoutDashboard className="w-5 h-5 mr-3" />
                  <span>Tableau de bord</span>
                </Link>
              </li>
              <li>
                <Link 
                  href="/admin/requests" 
                  className={`flex items-center p-3 rounded-lg transition-colors ${
                    pathname.startsWith('/admin/requests') 
                      ? 'bg-primary text-white' 
                      : 'hover:bg-gray-700'
                  }`}
                >
                  <FileText className="w-5 h-5 mr-3" />
                  <span>Demandes</span>
                </Link>
              </li>
              <li>
                <Link 
                  href="/admin/settings" 
                  className={`flex items-center p-3 rounded-lg transition-colors ${
                    pathname === '/admin/settings' 
                      ? 'bg-primary text-white' 
                      : 'hover:bg-gray-700'
                  }`}
                >
                  <Settings className="w-5 h-5 mr-3" />
                  <span>Paramètres</span>
                </Link>
              </li>
            </ul>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 bg-gray-50">
          {pathname !== '/admin/dashboard' && (
            <div className="flex items-center text-sm text-gray-500 mb-4">
              <Link href="/admin/dashboard" className="hover:text-primary">
                Administration
              </Link>
              <ChevronRight className="w-4 h-4 mx-2" />
              <span className="font-medium text-gray-700">
                {pathname.includes('/requests/') ? 'Détails demande' : 
                 pathname.includes('/requests') ? 'Demandes' : 
                 pathname.includes('/settings') ? 'Paramètres' : 'Page'}
              </span>
            </div>
          )}
          {children}
        </main>
      </div>
    </div>
  );
}
