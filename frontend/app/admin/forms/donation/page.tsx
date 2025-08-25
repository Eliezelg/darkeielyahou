'use client';

import { GenericFormsTable } from '@/components/admin/generic-forms-table';

export default function DonationFormsPage() {
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
      key: 'donationAmount',
      label: 'Montant',
      sortable: true,
      render: (formData: any) => `${formData.donationAmount || 0}€`
    },
    {
      key: 'donationType',
      label: 'Type de don',
      sortable: true
    },
    {
      key: 'paymentMethod',
      label: 'Moyen de paiement',
      sortable: true
    }
  ];

  return (
    <GenericFormsTable
      formType="DONATION"
      title="Dons"
      columns={columns}
    />
  );
}