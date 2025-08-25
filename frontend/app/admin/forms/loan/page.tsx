'use client';

import { GenericFormsTable } from '@/components/admin/generic-forms-table';

export default function LoanRequestsPage() {
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
      key: 'loanAmount',
      label: 'Montant demandé',
      sortable: true,
      render: (formData: any) => `${formData.loanAmount || 0}€`
    },
    {
      key: 'reason',
      label: 'Motif',
      sortable: false
    },
    {
      key: 'repaymentPeriod',
      label: 'Période remboursement',
      sortable: true
    }
  ];

  return (
    <GenericFormsTable
      formType="LOAN"
      title="Demandes de prêt"
      columns={columns}
    />
  );
}