'use client';

import { GenericFormsTable } from '@/components/admin/generic-forms-table';

export default function OtherFormsPage() {
  const columns = [
    {
      key: 'name',
      label: 'Nom',
      sortable: true,
      render: (formData: any) => formData.name || `${formData.firstName || ''} ${formData.lastName || ''}`
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
      key: 'subject',
      label: 'Sujet',
      sortable: true,
      render: (formData: any) => formData.subject || formData.requestType || 'Autre'
    },
    {
      key: 'message',
      label: 'Message/Description',
      sortable: false,
      render: (formData: any) => {
        const text = formData.message || formData.description || formData.details || '';
        return text.length > 60 ? text.substring(0, 60) + '...' : text;
      }
    }
  ];

  return (
    <GenericFormsTable
      formType="OTHER"
      title="Autres demandes"
      columns={columns}
    />
  );
}