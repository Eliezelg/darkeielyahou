'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/use-toast';
import { FileSpreadsheet, Loader2, Search, X, Save } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

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
  const [isDeleting, setIsDeleting] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [registrationToEdit, setRegistrationToEdit] = useState<GalaRegistration | null>(null);
  const [editFormData, setEditFormData] = useState<any>(null);
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

  // Formater la date pour l'affichage
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  // Modifier une inscription
  const handleEdit = (registration: GalaRegistration) => {
    setRegistrationToEdit(registration);
    setEditFormData({ ...registration.formData });
    setIsEditDialogOpen(true);
  };

  // Sauvegarder les modifications
  const handleSaveEdit = async () => {
    if (!registrationToEdit || !editFormData) return;

    try {
      setIsEditing(true);
      const token = localStorage.getItem('darkei_admin_auth_token');
      
      if (!token) {
        toast({
          title: "Erreur d'authentification",
          description: "Vous devez être connecté pour modifier une inscription."
        });
        return;
      }

      const API_URL = process.env.NEXT_PUBLIC_API_URL;
      const response = await fetch(`${API_URL}/api/admin/forms/${registrationToEdit.id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          formData: editFormData,
          status: registrationToEdit.status
        })
      });

      if (!response.ok) {
        throw new Error("Erreur lors de la mise à jour de l'inscription");
      }

      // Mettre à jour la liste des inscriptions
      setRegistrations(prev => 
        prev.map(reg => 
          reg.id === registrationToEdit.id 
            ? { ...reg, formData: editFormData } 
            : reg
        )
      );

      toast({
        title: "Succès",
        description: "L'inscription a été mise à jour avec succès."
      });
      
      setIsEditDialogOpen(false);
    } catch (error) {
      console.error('Erreur lors de la mise à jour:', error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la mise à jour de l'inscription."
      });
    } finally {
      setIsEditing(false);
    }
  };

  // Gérer le changement des champs du formulaire
  const handleInputChange = (field: string, value: string) => {
    setEditFormData((prev: any) => ({
      ...prev,
      [field]: value
    }));
  };

  // Supprimer une inscription
  const handleDelete = async (id: string) => {
    try {
      setIsDeleting(true);
      
      // Récupérer le token JWT du localStorage
      const token = localStorage.getItem('darkei_admin_auth_token');
      
      if (!token) {
        toast({
          title: "Erreur d'authentification",
          description: "Vous devez être connecté pour supprimer une inscription."
        });
        return;
      }
      
      // Confirmation de suppression
      if (!confirm("Êtes-vous sûr de vouloir supprimer cette inscription ? Cette action est irréversible.")) {
        setIsDeleting(false);
        return;
      }
      
      // Appeler l'API pour supprimer l'inscription
      const API_URL = process.env.NEXT_PUBLIC_API_URL;
      const response = await fetch(`${API_URL}/api/admin/forms/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.ok) {
        throw new Error("Erreur lors de la suppression de l'inscription");
      }
      
      // Mettre à jour la liste des inscriptions
      setRegistrations(prev => prev.filter(reg => reg.id !== id));
      
      toast({
        title: "Suppression réussie",
        description: "L'inscription au gala a été supprimée avec succès."
      });
      
    } catch (error) {
      console.error('Erreur lors de la suppression:', error);
      toast({
        title: "Erreur",
        description: "Impossible de supprimer l'inscription au gala."
      });
    } finally {
      setIsDeleting(false);
    }
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
                    <TableHead className="w-[130px]">Actions</TableHead>
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
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button 
                              variant="outline" 
                              size="sm" 
                              onClick={() => handleEdit(registration)}
                              title="Modifier"
                              className="h-8 w-8 p-0"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                                <path d="M17 3a2.85 2.85 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/>
                                <path d="m15 5 4 4"/>
                              </svg>
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm" 
                              onClick={() => handleDelete(registration.id)}
                              title="Supprimer"
                              className="h-8 w-8 p-0 text-red-500 hover:text-red-700 hover:bg-red-50"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                                <path d="M3 6h18"/>
                                <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/>
                                <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/>
                                <line x1="10" x2="10" y1="11" y2="17"/>
                                <line x1="14" x2="14" y1="11" y2="17"/>
                              </svg>
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Boîte de dialogue d'édition */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Modifier l'inscription</DialogTitle>
          </DialogHeader>
          
          {editFormData && registrationToEdit && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">Prénom</Label>
                  <Input
                    id="firstName"
                    value={editFormData.firstName || ''}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Nom</Label>
                  <Input
                    id="lastName"
                    value={editFormData.lastName || ''}
                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={editFormData.email || ''}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="city">Ville</Label>
                  <Input
                    id="city"
                    value={editFormData.city || ''}
                    onChange={(e) => handleInputChange('city', e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Code pays téléphone</Label>
                  <Input
                    value={editFormData.phoneCountryCode || ''}
                    onChange={(e) => handleInputChange('phoneCountryCode', e.target.value)}
                    placeholder="+33"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Téléphone</Label>
                  <Input
                    value={editFormData.phoneNumber || ''}
                    onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Nombre d'hommes</Label>
                  <Input
                    type="number"
                    min="0"
                    value={editFormData.maleAttendees || '0'}
                    onChange={(e) => handleInputChange('maleAttendees', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Nombre de femmes</Label>
                  <Input
                    type="number"
                    min="0"
                    value={editFormData.femaleAttendees || '0'}
                    onChange={(e) => handleInputChange('femaleAttendees', e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Régime alimentaire</Label>
                <Input
                  value={editFormData.dietaryRestrictions || ''}
                  onChange={(e) => handleInputChange('dietaryRestrictions', e.target.value)}
                  placeholder="Allergies ou restrictions alimentaires"
                />
              </div>

              <div className="space-y-2">
                <Label>Message</Label>
                <Input
                  value={editFormData.message || ''}
                  onChange={(e) => handleInputChange('message', e.target.value)}
                  placeholder="Message supplémentaire"
                />
              </div>

              <div className="space-y-2">
                <Label>Statut</Label>
                <Select
                  value={registrationToEdit.status}
                  onValueChange={(value) => 
                    setRegistrationToEdit({
                      ...registrationToEdit,
                      status: value as 'PENDING' | 'IN_REVIEW' | 'COMPLETED' | 'REJECTED'
                    })
                  }
                >
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
            </div>
          )}

          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setIsEditDialogOpen(false)}
              disabled={isEditing}
            >
              <X className="mr-2 h-4 w-4" /> Annuler
            </Button>
            <Button 
              onClick={handleSaveEdit}
              disabled={isEditing}
            >
              {isEditing ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Enregistrement...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Enregistrer
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
