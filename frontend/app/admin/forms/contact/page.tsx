'use client';

import { GenericFormsTable } from '@/components/admin/generic-forms-table';

export default function ContactFormsPage() {
  const columns = [
    {
      key: 'name',
      label: 'Nom',
      sortable: true
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
      sortable: true
    },
    {
      key: 'message',
      label: 'Message',
      sortable: false,
      render: (formData: any) => {
        const message = formData.message || '';
        return message.length > 50 ? message.substring(0, 50) + '...' : message;
      }
    }
  ];

  return (
    <GenericFormsTable
      formType="OTHER"
      title="Formulaires de contact"
      columns={columns}
    />
  );
}