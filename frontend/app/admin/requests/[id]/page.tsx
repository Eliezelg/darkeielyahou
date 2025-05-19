'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';

type FormRequest = {
  id: string;
  formType: string;
  status: 'PENDING' | 'IN_REVIEW' | 'COMPLETED' | 'REJECTED';
  formData: Record<string, any>;
  createdAt: string;
  updatedAt: string;
  notes?: string;
};

export default function RequestDetails() {
  const { id } = useParams();
  const router = useRouter();
  const { toast } = useToast();
  const [request, setRequest] = useState<FormRequest | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [notes, setNotes] = useState('');
  const [status, setStatus] = useState('PENDING');

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

  useEffect(() => {
    fetchRequest();
  }, [id]);

  const fetchRequest = async () => {
    try {
      setIsLoading(true);
      const response = await callBackendApi(`/api/admin/requests/${id}`);

      // La gestion du 401 est déjà faite dans callBackendApi
      if (!response.ok && response.status !== 401) {
        toast({
          title: 'Erreur',
          description: 'Impossible de charger la demande'
        });
        router.push('/admin/dashboard');
        return;
      }

      if (response.status === 404) {
        router.push('/admin/dashboard');
        return;
      }

      const data = await response.json();
      
      if (data.success) {
        setRequest(data.data);
        setStatus(data.data.status);
        setNotes(data.data.notes || '');
      } else {
        throw new Error(data.error || 'Erreur lors du chargement de la demande');
      }
    } catch (error) {
      console.error('Erreur:', error);
      toast({
        title: 'Erreur',
        description: 'Impossible de charger la demande'
      });
      router.push('/admin/dashboard');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      setIsSaving(true);
      const response = await callBackendApi(`/api/admin/requests/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
          status,
          notes,
        }),
      });

      const data = await response.json();

      if (data.success) {
        toast({
          title: 'Succès',
          description: 'Demande mise à jour avec succès',
        });
        fetchRequest();
      } else {
        throw new Error(data.error || 'Erreur lors de la mise à jour de la demande');
      }
    } catch (error) {
      console.error('Erreur:', error);
      toast({
        title: 'Erreur',
        description: 'Impossible de mettre à jour la demande'
      });
    } finally {
      setIsSaving(false);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'PENDING':
        return <Badge variant="outline" className="bg-yellow-100 text-yellow-800">En attente</Badge>;
      case 'IN_REVIEW':
        return <Badge variant="outline" className="bg-blue-100 text-blue-800">En cours</Badge>;
      case 'COMPLETED':
        return <Badge variant="outline" className="bg-green-100 text-green-800">Terminé</Badge>;
      case 'REJECTED':
        return <Badge variant="outline" className="bg-red-100 text-red-800">Rejeté</Badge>;
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

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (!request) {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl font-semibold">Demande non trouvée</h2>
        <p className="text-gray-500 mt-2">La demande que vous recherchez n'existe pas ou a été supprimée.</p>
        <Button className="mt-4" onClick={() => router.push('/admin/dashboard')}>
          Retour au tableau de bord
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Détails de la demande</h1>
          <p className="text-sm text-gray-500">ID: {request.id}</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={() => router.push('/admin/dashboard')}>
            Retour
          </Button>
          <Button onClick={handleSave} disabled={isSaving}>
            {isSaving ? 'Enregistrement...' : 'Enregistrer les modifications'}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Données du formulaire</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {Object.entries(request.formData).map(([key, value]) => (
                  <div key={key} className="space-y-1">
                    <Label className="font-medium capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</Label>
                    <Input
                      value={typeof value === 'string' ? value : JSON.stringify(value)}
                      readOnly
                      className="bg-gray-50"
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Statut</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Statut actuel</Label>
                <Select value={status} onValueChange={setStatus}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner un statut" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="PENDING">En attente</SelectItem>
                    <SelectItem value="IN_REVIEW">En cours</SelectItem>
                    <SelectItem value="COMPLETED">Terminé</SelectItem>
                    <SelectItem value="REJECTED">Rejeté</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Créé le</Label>
                <Input value={formatDate(request.createdAt)} readOnly className="bg-gray-50" />
              </div>

              <div className="space-y-2">
                <Label>Dernière mise à jour</Label>
                <Input value={formatDate(request.updatedAt)} readOnly className="bg-gray-50" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Notes</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Ajoutez des notes internes ici..."
                className="min-h-[120px]"
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
