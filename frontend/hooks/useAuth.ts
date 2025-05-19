'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { authApi } from '../lib/api';
import { APP_CONFIG } from '../lib/config';

type User = {
  email: string;
  // Ajoutez d'autres propriétés utilisateur si nécessaire
};

type AuthState = {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
};

export function useAuth() {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
    error: null,
  });

  const router = useRouter();

  // Vérifier l'état d'authentification au chargement
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data } = await authApi.getProfile();
        setAuthState({
          user: data.user,
          isAuthenticated: true,
          isLoading: false,
          error: null,
        });
      } catch (error) {
        setAuthState({
          user: null,
          isAuthenticated: false,
          isLoading: false,
          error: 'Non authentifié',
        });
      }
    };

    checkAuth();
  }, []);

  // Fonction de connexion
  const login = async (password: string) => {
    setAuthState(prev => ({ ...prev, isLoading: true, error: null }));
    
    try {
      const { data } = await authApi.login(password);
      
      // Stocker le token dans un cookie sécurisé
      document.cookie = `${APP_CONFIG.ADMIN.SESSION_KEY}=${data.token}; path=/; max-age=${APP_CONFIG.ADMIN.SESSION_DURATION / 1000}; SameSite=Lax; ${window.location.protocol === 'https:' ? 'Secure;' : ''}`;
      
      setAuthState({
        user: { email: 'admin@darkei-elyahou.com' }, // Remplacer par les données utilisateur réelles
        isAuthenticated: true,
        isLoading: false,
        error: null,
      });
      
      return { success: true };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Une erreur est survenue lors de la connexion';
      setAuthState(prev => ({
        ...prev,
        isLoading: false,
        error: errorMessage,
      }));
      return { success: false, error: errorMessage };
    }
  };

  // Fonction de déconnexion
  const logout = async () => {
    try {
      await authApi.logout();
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error);
    } finally {
      // Supprimer le cookie de session
      document.cookie = `${APP_CONFIG.ADMIN.SESSION_KEY}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
      
      setAuthState({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
      });
      
      // Rediriger vers la page de connexion
      router.push('/admin');
    }
  };

  return {
    ...authState,
    login,
    logout,
  };
}

// Hook pour protéger les routes
export function useRequireAuth(redirectUrl = '/admin') {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push(redirectUrl);
    }
  }, [isAuthenticated, isLoading, router, redirectUrl]);

  return { isAuthenticated, isLoading };
}
