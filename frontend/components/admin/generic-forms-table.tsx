'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/use-toast';
import { FileSpreadsheet, Loader2, Search, X, Save } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

type FormRequest = {
  id: string;
  formType: string;
  status: 'PENDING' | 'IN_REVIEW' | 'COMPLETED' | 'REJECTED';
  formData: any;
  createdAt: string;
  updatedAt: string;
};

interface GenericFormsTableProps {
  formType: string;
  title: string;
  columns: {
    key: string;
    label: string;
    sortable?: boolean;
    render?: (formData: any) => React.ReactNode;
  }[];
}

export function GenericFormsTable({ formType, title, columns }: GenericFormsTableProps) {
  const [requests, setRequests] = useState<FormRequest[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isExporting, setIsExporting] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [requestToEdit, setRequestToEdit] = useState<FormRequest | null>(null);
  const [editFormData, setEditFormData] = useState<any>(null);
  
  const [sortColumn, setSortColumn] = useState<string>('createdAt');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const { toast } = useToast();

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        setIsLoading(true);
        const token = localStorage.getItem('darkei_admin_auth_token');
        if (!token) {
          window.location.href = '/admin?logout=true';
          return;
        }

        const API_URL = process.env.NEXT_PUBLIC_API_URL;
        console.log('Fetching forms with:', {
          url: `${API_URL}/api/admin/forms?type=${formType}`,
          formType,
          token: token ? 'Present' : 'Missing'
        });
        
        const response = await fetch(`${API_URL}/api/admin/forms?type=${formType}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (response.status === 401) {
          window.location.href = '/admin?logout=true';
          return;
        }

        if (!response.ok) {
          throw new Error('Erreur lors de la récupération des demandes');
        }

        const data = await response.json();
        console.log('Response data:', data);
        setRequests(data.forms || []);
      } catch (error) {
        console.error('Erreur:', error);
        toast({
          title: "Erreur",
          description: "Impossible de charger les demandes."
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchRequests();
  }, [formType, toast]);

  const handleExport = async () => {
    try {
      setIsExporting(true);
      const token = localStorage.getItem('darkei_admin_auth_token');
      
      if (!token) {
        toast({
          title: "Erreur d'authentification",
          description: "Vous devez être connecté pour exporter les données."
        });
        return;
      }
      
      const API_URL = process.env.NEXT_PUBLIC_API_URL;
      const response = await fetch(`${API_URL}/api/export/requests?type=${formType}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Erreur lors de l\'exportation');
      }
      
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = url;
      
      const contentDisposition = response.headers.get('content-disposition');
      let filename = `${formType.toLowerCase()}_export.xlsx`;
      
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
        description: "Une erreur est survenue lors de l'exportation."
      });
    } finally {
      setIsExporting(false);
    }
  };

  const sortRequests = (a: FormRequest, b: FormRequest) => {
    let comparison = 0;
    
    if (sortColumn === 'createdAt') {
      const dateA = new Date(a.createdAt).getTime();
      const dateB = new Date(b.createdAt).getTime();
      comparison = dateA - dateB;
    } else {
      const valueA = a.formData[sortColumn]?.toString().toLowerCase() || '';
      const valueB = b.formData[sortColumn]?.toString().toLowerCase() || '';
      comparison = valueA.localeCompare(valueB);
    }
    
    return sortDirection === 'asc' ? comparison : -comparison;
  };
  
  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('desc');
    }
  };

  const getSortIndicator = (column: string) => {
    if (sortColumn !== column) return null;
    return sortDirection === 'asc' 
      ? <span className="ml-1">↑</span> 
      : <span className="ml-1">↓</span>;
  };

  const filteredRequests = requests
    .filter((request) => {
      const searchTermLower = searchTerm.toLowerCase();
      return Object.values(request.formData).some(value => 
        value?.toString().toLowerCase().includes(searchTermLower)
      );
    })
    .sort(sortRequests);

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

  const handleEdit = (request: FormRequest) => {
    setRequestToEdit(request);
    setEditFormData({ ...request.formData });
    setIsEditDialogOpen(true);
  };

  const handleSaveEdit = async () => {
    if (!requestToEdit || !editFormData) return;

    try {
      setIsEditing(true);
      const token = localStorage.getItem('darkei_admin_auth_token');
      
      if (!token) {
        toast({
          title: "Erreur d'authentification",
          description: "Vous devez être connecté pour modifier une demande."
        });
        return;
      }

      const API_URL = process.env.NEXT_PUBLIC_API_URL;
      const response = await fetch(`${API_URL}/api/admin/forms/${requestToEdit.id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          formData: editFormData,
          status: requestToEdit.status
        })
      });

      if (!response.ok) {
        throw new Error("Erreur lors de la mise à jour");
      }

      setRequests(prev => 
        prev.map(req => 
          req.id === requestToEdit.id 
            ? { ...req, formData: editFormData, status: requestToEdit.status } 
            : req
        )
      );

      toast({
        title: "Succès",
        description: "La demande a été mise à jour avec succès."
      });
      
      setIsEditDialogOpen(false);
    } catch (error) {
      console.error('Erreur lors de la mise à jour:', error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la mise à jour."
      });
    } finally {
      setIsEditing(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setEditFormData((prev: any) => ({
      ...prev,
      [field]: value
    }));
  };

  const handleDelete = async (id: string) => {
    try {
      setIsDeleting(true);
      
      const token = localStorage.getItem('darkei_admin_auth_token');
      
      if (!token) {
        toast({
          title: "Erreur d'authentification",
          description: "Vous devez être connecté pour supprimer une demande."
        });
        return;
      }
      
      if (!confirm("Êtes-vous sûr de vouloir supprimer cette demande ? Cette action est irréversible.")) {
        setIsDeleting(false);
        return;
      }
      
      const API_URL = process.env.NEXT_PUBLIC_API_URL;
      const response = await fetch(`${API_URL}/api/admin/forms/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.ok) {
        throw new Error("Erreur lors de la suppression");
      }
      
      setRequests(prev => prev.filter(req => req.id !== id));
      
      toast({
        title: "Suppression réussie",
        description: "La demande a été supprimée avec succès."
      });
      
    } catch (error) {
      console.error('Erreur lors de la suppression:', error);
      toast({
        title: "Erreur",
        description: "Impossible de supprimer la demande."
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
        <h1 className="text-2xl font-bold">{title}</h1>
        <Button 
          onClick={handleExport} 
          disabled={isLoading || isExporting || requests.length === 0}
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
            <CardTitle>Liste des demandes ({filteredRequests.length})</CardTitle>
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
          ) : requests.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              Aucune demande trouvée
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    {columns.map((column) => (
                      <TableHead 
                        key={column.key}
                        className={column.sortable ? "cursor-pointer hover:bg-gray-50" : ""}
                        onClick={column.sortable ? () => handleSort(column.key) : undefined}
                      >
                        {column.label} {column.sortable && getSortIndicator(column.key)}
                      </TableHead>
                    ))}
                    <TableHead>Statut</TableHead>
                    <TableHead 
                      className="cursor-pointer hover:bg-gray-50"
                      onClick={() => handleSort('createdAt')}
                    >
                      Date {getSortIndicator('createdAt')}
                    </TableHead>
                    <TableHead className="w-[130px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredRequests.map((request) => (
                    <TableRow key={request.id}>
                      {columns.map((column) => (
                        <TableCell key={column.key}>
                          {column.render 
                            ? column.render(request.formData)
                            : request.formData[column.key] || '-'
                          }
                        </TableCell>
                      ))}
                      <TableCell>{getStatusBadge(request.status)}</TableCell>
                      <TableCell>{formatDate(request.createdAt)}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={() => handleEdit(request)}
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
                            onClick={() => handleDelete(request.id)}
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
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Modifier la demande</DialogTitle>
          </DialogHeader>
          
          {editFormData && requestToEdit && (
            <div className="grid gap-4 py-4">
              {Object.entries(editFormData).map(([key, value]) => (
                <div key={key} className="space-y-2">
                  <Label htmlFor={key}>{key}</Label>
                  <Input
                    id={key}
                    value={value || ''}
                    onChange={(e) => handleInputChange(key, e.target.value)}
                  />
                </div>
              ))}

              <div className="space-y-2">
                <Label>Statut</Label>
                <Select
                  value={requestToEdit.status}
                  onValueChange={(value) => 
                    setRequestToEdit({
                      ...requestToEdit,
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