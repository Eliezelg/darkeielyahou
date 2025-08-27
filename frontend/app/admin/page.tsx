'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { Eye, EyeOff, Lock, Mail } from 'lucide-react';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);
  const [loginAttempts, setLoginAttempts] = useState(0);
  const router = useRouter();
  const { toast } = useToast();
  
  // Fonction utilitaire pour les appels API au backend avec authentification
  const callBackendApi = async (endpoint: string, options: RequestInit = {}) => {
    const API_URL = process.env.NEXT_PUBLIC_API_URL;
    
    // Récupérer le token d'authentification du localStorage s'il existe
    const authToken = typeof window !== 'undefined' ? localStorage.getItem('darkei_admin_auth_token') : null;
    
    const defaultOptions: RequestInit = {
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      }
    };
    
    // Ajouter le token d'authentification dans les headers si disponible
    if (authToken) {
      defaultOptions.headers = {
        ...defaultOptions.headers,
        'Authorization': `Bearer ${authToken}`
      };
    }
    
    try {
      const response = await fetch(`${API_URL}${endpoint}`, {
        ...defaultOptions,
        ...options,
        headers: {
          ...defaultOptions.headers,
          ...(options.headers || {})
        }
      });
      
      return response;
    } catch (error) {
      console.error(`Erreur lors de l'appel à ${endpoint}:`, error);
      throw error;
    }
  };

  // Vérifier si l'utilisateur est déjà connecté
  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Vérifier si on vient de se déconnecter
        const urlParams = new URLSearchParams(window.location.search);
        const hasLogoutParam = urlParams.has('logout');
        
        // Si on vient de se déconnecter, ne pas vérifier l'authentification
        if (hasLogoutParam) {
          // Nettoyer URL pour une meilleure UX
          if (window.history && window.history.replaceState) {
            const cleanUrl = window.location.pathname;
            window.history.replaceState({}, document.title, cleanUrl);
          }
          
          setAuthLoading(false);
          return;
        }

        const response = await callBackendApi('/api/admin/profile');
        
        if (response.ok) {
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error('Erreur de vérification d\'authentification:', error);
      } finally {
        setAuthLoading(false);
      }
    };
    
    checkAuth();
  }, []);

  // Rediriger si déjà connecté
  useEffect(() => {
    if (isAuthenticated) {
      router.push('/admin/forms/gala');
    }
  }, [isAuthenticated, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast({
        title: 'Erreur',
        description: 'Veuillez entrer votre email et mot de passe'
      });
      return;
    }
    
    // Validation email basique
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast({
        title: 'Erreur',
        description: 'Email invalide'
      });
      return;
    }

    setIsLoading(true);
    try {
      // Supprimer tout token existant
      localStorage.removeItem('darkei_admin_auth_token');
      
      // Effacer les cookies de session avant la tentative de connexion
      document.cookie = 'darkei.sid=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
      document.cookie = 'connect.sid=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
      
      const response = await callBackendApi('/api/admin/login', {
        method: 'POST',
        body: JSON.stringify({ email, password })
      });
      
      const data = await response.json();
      
      if (response.ok && data.success) {
        // Stocker le token dans localStorage pour les futures requêtes
        if (data.authToken) {
          localStorage.setItem('darkei_admin_auth_token', data.authToken);
          console.log('Token d\'authentification stocké dans localStorage');
        } else {
          console.error('Aucun token retourné par le serveur');
          throw new Error('Erreur d\'authentification: token manquant');
        }
        
        toast({
          title: 'Connexion réussie',
          description: 'Redirection en cours...'
        });
        
        // Utilisez une redirection complète plutôt que la navigation Next.js
        // pour s'assurer que l'état est correctement réinitialisé
        setIsAuthenticated(true);
        setTimeout(() => {
          window.location.href = '/admin/forms/gala';
        }, 500); // Court délai pour permettre au toast de s'afficher
      } else {
        // Incrémenter le compteur de tentatives échouées
        setLoginAttempts(prev => prev + 1);
        
        // Afficher un message d'erreur approprié
        if (data.error?.includes('Trop de tentatives')) {
          throw new Error(data.error);
        } else {
          throw new Error('Email ou mot de passe incorrect');
        }
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Erreur de connexion';
      
      toast({
        title: 'Erreur de connexion',
        description: errorMessage
      });
      
      // Si trop de tentatives, désactiver le formulaire temporairement
      if (errorMessage.includes('Trop de tentatives')) {
        setIsLoading(true);
        setTimeout(() => setIsLoading(false), 15 * 60 * 1000); // 15 minutes
      }
    } finally {
      if (!isLoading) {
        setIsLoading(false);
      }
    }
  };

  // Afficher un indicateur de chargement pendant la vérification de l'authentification
  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-center mb-4">
            <div className="p-3 bg-primary/10 rounded-full">
              <Lock className="h-8 w-8 text-primary" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold text-center">Connexion administrateur</CardTitle>
          <CardDescription className="text-center">
            Connectez-vous pour accéder à l'interface d'administration
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={isLoading}
                  autoComplete="email"
                  className="pl-10"
                  placeholder="admin@example.com"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Mot de passe</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={isLoading}
                  autoComplete="current-password"
                  className="pl-10 pr-10"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>
            {loginAttempts >= 3 && loginAttempts < 5 && (
              <p className="text-sm text-orange-600">
                Attention : {5 - loginAttempts} tentative(s) restante(s) avant le verrouillage temporaire
              </p>
            )}
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? 'Connexion en cours...' : 'Se connecter'}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
