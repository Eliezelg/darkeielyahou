'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/use-toast';
import { FileSpreadsheet, Loader2, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

type GalaRegistration = {
  id: string;
  formType: string;
  status: 'PENDING' | 'IN_REVIEW' | 'COMPLETED' | 'REJECTED';
  formData: {
    firstName: string;
    lastName: string;
    email: string;
    phoneCountryCode: string;
    phoneNumber: string;
    city: string;
    maleAttendees: string;
    femaleAttendees: string;
    dietaryRestrictions?: string;
    message?: string;
    [key: string]: any;
  };
  createdAt: string;
  updatedAt: string;
};

export default function GalaRegistrationsPage() {
  const [registrations, setRegistrations] = useState<GalaRegistration[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isExporting, setIsExporting] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const { toast } = useToast();

  // Vérifier l'authentification et charger les données
  useEffect(() => {
    const fetchRegistrations = async () => {
      try {
        setIsLoading(true);
        // Récupérer le token JWT du localStorage
        const token = localStorage.getItem('darkei_admin_auth_token');
        if (!token) {
          window.location.href = '/admin?logout=true';
          return;
        }

        // Appeler l'API pour récupérer les inscriptions au gala
        const API_URL = process.env.NEXT_PUBLIC_API_URL;
        const response = await fetch(`${API_URL}/api/admin/forms?type=GALA_REGISTRATION`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (response.status === 401) {
          // Non authentifié, rediriger
          window.location.href = '/admin?logout=true';
          return;
        }

        if (!response.ok) {
          throw new Error('Erreur lors de la récupération des inscriptions');
        }

        const data = await response.json();
        setRegistrations(data.forms || []);
      } catch (error) {
        console.error('Erreur:', error);
        toast({
          title: "Erreur",
          description: "Impossible de charger les inscriptions au gala."
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchRegistrations();
  }, [toast]);

  const handleExport = async () => {
    try {
      setIsExporting(true);
      // Récupérer le token JWT du localStorage
      const token = localStorage.getItem('darkei_admin_auth_token');
      
      if (!token) {
        toast({
          title: "Erreur d'authentification",
          description: "Vous devez être connecté pour exporter les données."
        });
        return;
      }
      
      // Faire une requête au serveur pour télécharger l'Excel
      const API_URL = process.env.NEXT_PUBLIC_API_URL;
      const response = await fetch(`${API_URL}/api/export/gala-registrations`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Erreur lors de l\'exportation');
      }
      
      // Convertir la réponse en blob pour le téléchargement
      const blob = await response.blob();
      
      // Créer un lien de téléchargement et le déclencher
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = url;
      
      // Déterminer le nom du fichier à partir de l'en-tête Content-Disposition ou utiliser un nom par défaut
      const contentDisposition = response.headers.get('content-disposition');
      let filename = 'inscriptions_gala.xlsx';
      
      if (contentDisposition) {
        const filenameMatch = contentDisposition.match(/filename="(.+)"/);
        if (filenameMatch && filenameMatch[1]) {
          filename = filenameMatch[1];
        }
      }
      
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      
      toast({
        title: "Exportation réussie",
        description: "Le fichier Excel a été téléchargé avec succès.",
      });
    } catch (error) {
      console.error('Erreur lors de l\'exportation:', error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de l'exportation des inscriptions au gala."
      });
    } finally {
      setIsExporting(false);
    }
  };

  // Filtrer les inscriptions selon le terme de recherche
  const filteredRegistrations = registrations.filter(registration => {
    if (!searchTerm.trim()) return true;
    
    const searchLower = searchTerm.toLowerCase();
    const { formData } = registration;
    
    return (
      (formData.firstName && formData.firstName.toLowerCase().includes(searchLower)) ||
      (formData.lastName && formData.lastName.toLowerCase().includes(searchLower)) ||
      (formData.email && formData.email.toLowerCase().includes(searchLower)) ||
      (formData.city && formData.city.toLowerCase().includes(searchLower)) ||
      (registration.id.toLowerCase().includes(searchLower))
    );
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'PENDING':
        return <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-300">En attente</Badge>;
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

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Inscriptions au Gala</h1>
        <Button 
          onClick={handleExport} 
          disabled={isLoading || isExporting || registrations.length === 0}
          className="bg-green-600 hover:bg-green-700"
        >
          {isExporting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Exportation en cours...
            </>
          ) : (
            <>
              <FileSpreadsheet className="mr-2 h-4 w-4" />
              Exporter en Excel
            </>
          )}
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Liste des inscriptions ({filteredRegistrations.length})</CardTitle>
            <div className="flex items-center space-x-2 w-64">
              <Search className="h-4 w-4 text-gray-500" />
              <Input
                placeholder="Rechercher..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="h-8"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <Loader2 className="h-12 w-12 animate-spin text-gray-500" />
            </div>
          ) : registrations.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              Aucune inscription au gala trouvée
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[180px]">Nom complet</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Téléphone</TableHead>
                    <TableHead>Ville</TableHead>
                    <TableHead className="text-center">Hommes</TableHead>
                    <TableHead className="text-center">Femmes</TableHead>
                    <TableHead className="text-center">Total</TableHead>
                    <TableHead>Statut</TableHead>
                    <TableHead className="w-[150px]">Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredRegistrations.map((registration) => {
                    const formData = registration.formData;
                    const maleCount = parseInt(formData.maleAttendees || '0');
                    const femaleCount = parseInt(formData.femaleAttendees || '0');
                    const totalAttendees = maleCount + femaleCount;

                    return (
                      <TableRow key={registration.id}>
                        <TableCell className="font-medium">
                          {formData.firstName} {formData.lastName}
                        </TableCell>
                        <TableCell>{formData.email}</TableCell>
                        <TableCell>
                          {formData.phoneCountryCode}{formData.phoneNumber}
                        </TableCell>
                        <TableCell>{formData.city}</TableCell>
                        <TableCell className="text-center">{maleCount}</TableCell>
                        <TableCell className="text-center">{femaleCount}</TableCell>
                        <TableCell className="text-center font-medium">{totalAttendees}</TableCell>
                        <TableCell>{getStatusBadge(registration.status)}</TableCell>
                        <TableCell>{formatDate(registration.createdAt)}</TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
