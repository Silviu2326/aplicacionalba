
import React, { useState } from 'react';
import Table from '@/components/Table';

const mockAdmins = [
  'admin@example.com',
  'superadmin@example.com',
  'moderador@example.com',
];

interface AuditLogTableProps {
  auditLogs: any[];
  isLoading: boolean;
  onFilter: (filters: any) => void;
}

const AuditLogTable: React.FC<AuditLogTableProps> = ({ auditLogs, isLoading, onFilter }) => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [selectedAdmin, setSelectedAdmin] = useState('');

  const columns = [
    { key: 'timestamp', label: 'Marca de Tiempo' },
    { key: 'admin', label: 'Administrador' },
    { key: 'action', label: 'Acción' },
    { key: 'target', label: 'Objeto Afectado' },
  ];

  const handleFilter = (e: React.FormEvent) => {
    e.preventDefault();
    onFilter({ startDate, endDate, admin: selectedAdmin });
  };

  return (
    <div className="p-6 bg-backgroundSecondary rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-text mb-4">Registro de Auditoría</h2>
      
      <form onSubmit={handleFilter} className="flex flex-wrap gap-4 mb-6 p-4 bg-surface rounded-lg border border-border">
        <div className="flex-1 min-w-[200px]">
          <label htmlFor="startDate" className="block text-sm font-medium text-textSecondary mb-1">Desde</label>
          <input
            type="date"
            id="startDate"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="w-full p-2 bg-card border border-borderLight rounded-md text-text focus:ring-primary focus:border-primary"
          />
        </div>
        
        <div className="flex-1 min-w-[200px]">
          <label htmlFor="endDate" className="block text-sm font-medium text-textSecondary mb-1">Hasta</label>
          <input
            type="date"
            id="endDate"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="w-full p-2 bg-card border border-borderLight rounded-md text-text focus:ring-primary focus:border-primary"
          />
        </div>

        <div className="flex-1 min-w-[200px]">
          <label htmlFor="adminSelector" className="block text-sm font-medium text-textSecondary mb-1">Administrador</label>
          <select
            id="adminSelector"
            value={selectedAdmin}
            onChange={(e) => setSelectedAdmin(e.target.value)}
            className="w-full p-2 bg-card border border-borderLight rounded-md text-text focus:ring-primary focus:border-primary"
          >
            <option value="">Todos</option>
            {mockAdmins.map(admin => (
              <option key={admin} value={admin}>{admin}</option>
            ))}
          </select>
        </div>

        <div className="flex items-end">
          <button type="submit" className="px-4 py-2 bg-primary text-textInverse font-semibold rounded-md hover:bg-primaryHover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
            Filtrar
          </button>
        </div>
      </form>

      <Table columns={columns} data={auditLogs} loading={isLoading} />
    </div>
  );
};

export default AuditLogTable;
