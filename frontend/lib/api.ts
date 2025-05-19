import { APP_CONFIG } from './config';

// Type pour les options de requête
type RequestOptions = {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  body?: any;
  headers?: Record<string, string>;
  credentials?: RequestCredentials;
  cache?: RequestCache;
};

// Fonction utilitaire pour effectuer des requêtes API
async function api<T = any>(
  endpoint: string,
  options: RequestOptions = {}
): Promise<{ data: T; response: Response }> {
  const {
    method = 'GET',
    body,
    headers = {},
    credentials = 'include',
    cache = 'default',
  } = options;

  // Configuration de la requête
  const config: RequestInit = {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    credentials,
    cache,
  };

  // Ajout du corps de la requête si nécessaire
  if (body && method !== 'GET' && method !== ('HEAD' as any)) {
    config.body = JSON.stringify(body);
  }

  // Construction de l'URL complète
  const url = `${APP_CONFIG.API_BASE_URL}${endpoint}`;

  try {
    const response = await fetch(url, config);
    let data;

    // Essayer de parser la réponse en JSON, sinon renvoyer le texte brut
    try {
      data = await response.json();
    } catch (error) {
      const text = await response.text();
      throw new Error(`Erreur lors de l'analyse de la réponse: ${text}`);
    }

    // Vérifier si la réponse est une erreur
    if (!response.ok) {
      throw new Error(
        data.message || `Erreur ${response.status}: ${response.statusText}`
      );
    }

    return { data, response };
  } catch (error) {
    console.error('Erreur API:', error);
    throw error;
  }
}

// Méthodes HTTP simplifiées
const http = {
  get: <T = any>(endpoint: string, options: Omit<RequestOptions, 'method' | 'body'> = {}) =>
    api<T>(endpoint, { ...options, method: 'GET' }),

  post: <T = any>(
    endpoint: string,
    body?: any,
    options: Omit<RequestOptions, 'method' | 'body'> = {}
  ) => api<T>(endpoint, { ...options, method: 'POST', body }),

  put: <T = any>(
    endpoint: string,
    body?: any,
    options: Omit<RequestOptions, 'method' | 'body'> = {}
  ) => api<T>(endpoint, { ...options, method: 'PUT', body }),

  delete: <T = any>(
    endpoint: string,
    options: Omit<RequestOptions, 'method' | 'body'> = {}
  ) => api<T>(endpoint, { ...options, method: 'DELETE' }),

  patch: <T = any>(
    endpoint: string,
    body?: any,
    options: Omit<RequestOptions, 'method' | 'body'> = {}
  ) => api<T>(endpoint, { ...options, method: 'PATCH', body }),
};

// API d'authentification
export const authApi = {
  login: (password: string) =>
    http.post<{ token: string }>('/api/admin/login', { password }),
  
  logout: () => http.post('/api/admin/logout'),
  
  getProfile: () => http.get<{ user: any }>('/api/admin/me'),
};

// API des demandes de formulaire
export const requestsApi = {
  // Récupérer toutes les demandes
  getAll: (status?: string) => {
    const query = status ? `?status=${status}` : '';
    return http.get<{ data: any[] }>(`/api/admin/requests${query}`);
  },
  
  // Récupérer une demande par son ID
  getById: (id: string) => 
    http.get<{ data: any }>(`/api/admin/requests/${id}`),
  
  // Mettre à jour le statut d'une demande
  updateStatus: (id: string, status: string, notes?: string) =>
    http.put(`/api/admin/requests/${id}/status`, { status, notes }),
  
  // Exporter les demandes
  export: () =>
    http.get('/api/admin/requests/export', {
      headers: { Accept: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' },
    }),
};

export default http;
