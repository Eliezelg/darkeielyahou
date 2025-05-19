'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/use-toast';

// Type définissant la structure d'une demande de formulaire
type FormRequest = {
  id: string;
  formType: string;
  status: 'PENDING' | 'IN_REVIEW' | 'COMPLETED' | 'REJECTED';
  formData: Record<string, any>;
  createdAt: string;
  updatedAt: string;
  notes?: string;
};

export default function AdminRequests() {
  const router = useRouter();
  const { toast } = useToast();
  const [requests, setRequests] = useState<FormRequest[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('all');

  // Vérifier l'authentification avant de charger les données
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  useEffect(() => {
    // Vérifier l'authentification d'abord
    const checkAuth = async () => {
      try {
        // Vérifier si le token est présent dans localStorage
        const authToken = typeof window !== 'undefined' ? localStorage.getItem('darkei_admin_auth_token') : null;
        
        if (!authToken) {
          // Pas de token, rediriger vers la page de login
          router.replace('/admin?logout=true');
          return;
        }
        
        const response = await callBackendApi('/api/admin/profile');
        
        if (response.ok) {
          // Authentifié, charger les données
          setIsAuthenticated(true);
          fetchRequests();
        } else {
          // Non authentifié malgré le token, rediriger
          router.replace('/admin?logout=true');
        }
      } catch (error) {
        console.error('Erreur de vérification d\'authentification:', error);
        router.replace('/admin?logout=true');
      }
    };
    
    checkAuth();
  }, []);
  
  // Charger les données quand l'onglet actif change et qu'on est authentifié
  useEffect(() => {
    if (isAuthenticated) {
      fetchRequests();
    }
  }, [activeTab, isAuthenticated]);

  // Fonction utilitaire pour les appels API au backend avec authentification
  const callBackendApi = async (endpoint: string, options: RequestInit = {}) => {
    const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
    
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
      
      // Gérer les erreurs d'authentification (401)
      if (response.status === 401) {
        // Rediriger vers la page de connexion
        localStorage.removeItem('darkei_admin_auth_token');
        router.push('/admin');
        console.error('Session expirée ou invalide');
      }
      
      return response;
    } catch (error) {
      console.error(`Erreur lors de l'appel à ${endpoint}:`, error);
      throw error;
    }
  };
  
  const fetchRequests = async () => {
    try {
      setIsLoading(true);
      const status = activeTab === 'all' ? undefined : activeTab;
      const query = status ? `?status=${status}` : '';
      
      const response = await callBackendApi(`/api/admin/requests${query}`);

      // La gestion du 401 est déjà faite dans callBackendApi
      if (!response.ok && response.status !== 401) {
        // Gestion des autres erreurs (pas 401 qui est déjà traité)
        toast({
          title: 'Erreur',
          description: 'Impossible de charger les demandes'
        });
        return;
      }

      const data = await response.json();
      
      if (data.success) {
        setRequests(data.data);
      } else {
        throw new Error(data.error || 'Erreur lors du chargement des demandes');
      }
    } catch (error) {
      console.error('Erreur:', error);
      toast({
        title: 'Erreur',
        description: 'Impossible de charger les demandes'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      const response = await callBackendApi(`/api/admin/requests/${id}/status`, {
        method: 'PUT',
        body: JSON.stringify({ status: newStatus }),
      });

      const data = await response.json();

      if (data.success) {
        toast({
          title: 'Succès',
          description: 'Statut mis à jour avec succès',
        });
        
        // Mettre à jour localement
        setRequests(prevRequests => 
          prevRequests.map(req => 
            req.id === id ? { ...req, status: newStatus as any } : req
          )
        );
      } else {
        throw new Error(data.error || 'Erreur lors de la mise à jour du statut');
      }
    } catch (error) {
      console.error('Erreur:', error);
      toast({
        title: 'Erreur',
        description: 'Impossible de mettre à jour le statut'
      });
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'PENDING':
        return <Badge variant="secondary">En attente</Badge>;
      case 'IN_REVIEW':
        return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-300">En cours</Badge>;
      case 'COMPLETED':
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-300">Terminé</Badge>;
      case 'REJECTED':
        return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-300">Rejeté</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="container mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Gestion des demandes</h1>
      </div>

      <Tabs defaultValue="all" className="w-full" onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-5 mb-6">
          <TabsTrigger value="all">Tous</TabsTrigger>
          <TabsTrigger value="PENDING">En attente</TabsTrigger>
          <TabsTrigger value="IN_REVIEW">En cours</TabsTrigger>
          <TabsTrigger value="COMPLETED">Terminé</TabsTrigger>
          <TabsTrigger value="REJECTED">Rejeté</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab}>
          <Card>
            <CardHeader>
              <CardTitle>Liste des demandes</CardTitle>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="flex justify-center items-center h-64">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
                </div>
              ) : requests.length === 0 ? (
                <p className="text-center text-gray-500 py-8">Aucune demande trouvée</p>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Statut</TableHead>
                      <TableHead>Créé le</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {requests.map((request) => (
                      <TableRow key={request.id}>
                        <TableCell className="font-medium">{request.id.substring(0, 8)}...</TableCell>
                        <TableCell>{request.formType}</TableCell>
                        <TableCell>
                          <Select
                            value={request.status}
                            onValueChange={(value) => handleStatusChange(request.id, value)}
                          >
                            <SelectTrigger className="w-[180px]">
                              <SelectValue placeholder="Statut" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="PENDING">En attente</SelectItem>
                              <SelectItem value="IN_REVIEW">En cours</SelectItem>
                              <SelectItem value="COMPLETED">Terminé</SelectItem>
                              <SelectItem value="REJECTED">Rejeté</SelectItem>
                            </SelectContent>
                          </Select>
                        </TableCell>
                        <TableCell>{formatDate(request.createdAt)}</TableCell>
                        <TableCell>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => router.push(`/admin/requests/${request.id}`)}
                          >
                            Voir
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
