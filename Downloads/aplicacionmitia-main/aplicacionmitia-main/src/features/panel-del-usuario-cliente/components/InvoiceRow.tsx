import React from 'react';
import { Button } from '@/components/Button';

interface InvoiceRowProps {
  invoice: {
    id: string;
    date: string;
    professional: string;
    service: string;
    amount: number;
  };
  onDownload: (invoiceId: string) => void;
}

export const InvoiceRow: React.FC<InvoiceRowProps> = ({ invoice, onDownload }) => {
  return (
    <tr className="border-b border-borderLight hover:bg-backgroundSecondary transition-colors duration-200">
      <td className="py-3 px-6 text-left whitespace-nowrap text-text">{invoice.date}</td>
      <td className="py-3 px-6 text-left text-textSecondary">{invoice.professional}</td>
      <td className="py-3 px-6 text-left text-textSecondary">{invoice.service}</td>
      <td className="py-3 px-6 text-right text-text font-semibold">${invoice.amount.toFixed(2)}</td>
      <td className="py-3 px-6 text-center">
        <Button onClick={() => onDownload(invoice.id)} variant="primary">
          Descargar
        </Button>
      </td>
    </tr>
  );
};
