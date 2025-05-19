import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const isAdminPath = path.startsWith('/admin');
  const isLoginPath = path === '/admin' || path === '/admin/login';
  
  // Récupérer le token de session depuis les cookies appropriés
  const darkeiSession = request.cookies.get('darkei.sid');
  const connectSession = request.cookies.get('connect.sid'); 
  
  // Vérifier si l'une des sessions est présente
  const hasSessionCookie = !!darkeiSession?.value || !!connectSession?.value;
  
  // On ne peut pas vérifier le localStorage dans le middleware car c'est côté client
  // On se contente donc de vérifier la session côté serveur
  const isAuthenticated = hasSessionCookie;

  // Si l'utilisateur n'est pas authentifié et essaie d'accéder à une page admin (sauf la page de login)
  if (isAdminPath && !isLoginPath && !isAuthenticated) {
    // Vérifier si l'URL contient déjà un paramètre de déconnexion pour éviter les boucles
    const searchParams = new URL(request.url).searchParams;
    const hasLogoutParam = searchParams.has('logout');
    
    // Redirection vers la page de login avec paramètre pour éviter les boucles
    const url = new URL('/admin', request.url);
    if (!hasLogoutParam) {
      url.searchParams.set('logout', 'true');
    }
    return NextResponse.redirect(url);
  }

  // Si l'utilisateur est authentifié et essaie d'accéder à la page de login
  // Vérifier si l'utilisateur vient de se déconnecter (paramètre logout)
  const searchParams = new URL(request.url).searchParams;
  const isLogout = searchParams.has('logout');
  
  // Ne pas rediriger vers le dashboard si l'utilisateur vient de se déconnecter
  if (isLoginPath && isAuthenticated && !isLogout) {
    const url = new URL('/admin/dashboard', request.url);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/admin',
    '/admin/dashboard',
    '/admin/requests/:path*',
  ],
};
