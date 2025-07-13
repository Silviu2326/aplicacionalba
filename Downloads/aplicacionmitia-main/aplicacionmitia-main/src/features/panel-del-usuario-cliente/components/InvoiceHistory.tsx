import React, { useState } from 'react';
import { InvoiceRow } from './InvoiceRow';
import Table from '@/components/Table';
import { Button } from '@/components/Button';

interface Invoice {
  id: string;
  date: string;
  professional: string;
  service: string;
  amount: number;
}

interface InvoiceHistoryProps {
  invoices: Invoice[];
  onDownloadInvoice: (invoiceId: string) => void;
}

export const InvoiceHistory: React.FC<InvoiceHistoryProps> = ({ invoices, onDownloadInvoice }) => {
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  const sortedInvoices = [...invoices].sort((a, b) => {
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();
    return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
  });

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  const columns = [
    { Header: 'Fecha', accessor: 'date' },
    { Header: 'Profesional', accessor: 'professional' },
    { Header: 'Servicio', accessor: 'service' },
    { Header: 'Monto', accessor: 'amount' },
    { Header: 'Acciones', accessor: 'actions' },
  ];

  return (
    <div className="p-6 bg-card border border-border rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-text">Historial de Pagos</h2>
        <Button onClick={toggleSortOrder} variant="secondary">
          Ordenar por fecha ({sortOrder === 'asc' ? 'Ascendente' : 'Descendente'})
        </Button>
      </div>
      <Table
        columns={columns}
        data={sortedInvoices}
        renderRow={(invoice) => (
          <InvoiceRow
            key={invoice.id}
            invoice={invoice}
            onDownload={onDownloadInvoice}
          />
        )}
      />
    </div>
  );
};
