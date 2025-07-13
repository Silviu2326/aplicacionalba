import React, { useState } from 'react';
import Table from '../../../components/Table';
import { Button } from '../../../components/Button';
import TicketDetailsModal from './TicketDetailsModal';

const SupportTickets = ({ tickets, onTicketSelect, onStatusChange, onReply }) => {
  const [filter, setFilter] = useState('Todos');
  const [selectedTicket, setSelectedTicket] = useState(null);

  const handleTicketClick = (ticket) => {
    setSelectedTicket(ticket);
    if (onTicketSelect) {
      onTicketSelect(ticket);
    }
  };

  const handleCloseModal = () => {
    setSelectedTicket(null);
  };

  const filteredTickets = tickets.filter(ticket => {
    if (filter === 'Todos') return true;
    return ticket.status === filter;
  });

  const columns = [
    { Header: 'ID', accessor: 'id' },
    { Header: 'Usuario', accessor: 'user' },
    { Header: 'Asunto', accessor: 'subject' },
    { Header: 'Fecha', accessor: 'date' },
    { Header: 'Estado', accessor: 'status' },
    {
      Header: 'Acciones',
      Cell: ({ row }) => (
        <Button onClick={() => handleTicketClick(row.original)}>
          Ver Detalles
        </Button>
      ),
    },
  ];

  return (
    <div className="p-6 bg-surface rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-text">Tickets de Soporte</h2>
      <div className="mb-4">
        <select
          onChange={(e) => setFilter(e.target.value)}
          className="p-2 border rounded"
          value={filter}
        >
          <option value="Todos">Todos</option>
          <option value="Abierto">Abierto</option>
          <option value="En Progreso">En Progreso</option>
          <option value="Cerrado">Cerrado</option>
        </select>
      </div>
      <Table columns={columns} data={filteredTickets} />
      <TicketDetailsModal
        ticket={selectedTicket}
        onClose={handleCloseModal}
        onReply={onReply}
        onStatusChange={onStatusChange}
      />
    </div>
  );
};

export default SupportTickets;
