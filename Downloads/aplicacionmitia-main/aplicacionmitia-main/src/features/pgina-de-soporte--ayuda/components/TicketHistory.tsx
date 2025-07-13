
import React from 'react';
import Table from '../../../../components/Table';
import usePaginadeSoporteAyuda from '../hooks/usePaginadeSoporteAyuda';

const TicketHistory: React.FC = () => {
  const { tickets, loading, isAuthenticated } = usePaginadeSoporteAyuda();

  if (!isAuthenticated) {
    return null;
  }

  const columns = [
    { key: 'id', label: 'ID de Ticket' },
    { key: 'subject', label: 'Asunto' },
    { key: 'createdAt', label: 'Fecha de Creación' },
    { key: 'status', label: 'Estado' },
    { key: 'lastUpdate', label: 'Última Actualización' },
  ];

  const handleRowClick = (ticket: any) => {
    // Futura navegación al detalle del ticket
    console.log('Navegar a /ticket/', ticket.id);
  };

  if (loading) {
    return (
      <div className="w-full p-8 text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
        <p className="mt-4 text-textSecondary">Cargando historial...</p>
      </div>
    );
  }

  if (tickets.length === 0) {
    return (
      <div className="bg-card p-6 rounded-lg text-center">
        <h3 className="text-lg font-semibold text-text">No tienes incidencias</h3>
        <p className="text-textMuted mt-2">
          No has enviado ninguna incidencia de soporte todavía. Si tienes algún problema, no dudes en contactarnos.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-surface p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-text mb-4">Historial de Incidencias</h2>
      <Table 
        columns={columns} 
        data={tickets} 
        onRowClick={handleRowClick} 
      />
    </div>
  );
};

export default TicketHistory;
