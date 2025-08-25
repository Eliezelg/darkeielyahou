'use client';

import { GenericFormsTable } from '@/components/admin/generic-forms-table';

export default function SocialAidPage() {
  const columns = [
    {
      key: 'name',
      label: 'Nom complet',
      sortable: true,
      render: (formData: any) => `${formData.firstName || ''} ${formData.lastName || ''}`
    },
    {
      key: 'email',
      label: 'Email',
      sortable: true
    },
    {
      key: 'phone',
      label: 'Téléphone',
      sortable: false
    },
    {
      key: 'aidType',
      label: 'Type d\'aide',
      sortable: true
    },
    {
      key: 'familySize',
      label: 'Taille famille',
      sortable: true
    },
    {
      key: 'city',
      label: 'Ville',
      sortable: true
    }
  ];

  return (
    <GenericFormsTable
      formType="SOCIAL_AID"
      title="Demandes d'aide sociale"
      columns={columns}
    />
  );
}