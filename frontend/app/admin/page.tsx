'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
// Implémentation simplifiée  du hook d'autentification

export default function AdminLogin() {
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);
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
    
    if (!password) {
      toast({
        title: 'Erreur',
        description: 'Veuillez entrer un mot de passe'
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
        body: JSON.stringify({ password })
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
        throw new Error(data.error || 'Mot de passe incorrect');
      }
    } catch (error) {
      toast({
        title: 'Erreur de connexion',
        description: error instanceof Error ? error.message : 'Mot de passe incorrect'
      });
    } finally {
      setIsLoading(false);
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
          <CardTitle className="text-2xl font-bold text-center">Connexion administrateur</CardTitle>
          <CardDescription className="text-center">
            Veuillez entrer le mot de passe pour accéder à l'administration
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="password">Mot de passe</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={isLoading}
                autoComplete="current-password"
                className="w-full"
              />
            </div>
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
