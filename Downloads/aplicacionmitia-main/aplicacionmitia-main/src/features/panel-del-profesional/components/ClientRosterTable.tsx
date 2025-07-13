import React, { useState, useMemo } from 'react';

// Mock data for clients
const mockClients = [
  { id: 1, name: 'Juan Pérez', startDate: '2023-01-15', sessions: 12, status: 'Activo' },
  { id: 2, name: 'Ana Gómez', startDate: '2022-11-20', sessions: 25, status: 'Inactivo' },
  { id: 3, name: 'Carlos Sánchez', startDate: '2023-03-10', sessions: 8, status: 'Activo' },
  { id: 4, name: 'Laura Fernández', startDate: '2023-05-01', sessions: 5, status: 'Activo' },
  { id: 5, name: 'Miguel Rodríguez', startDate: '2021-09-05', sessions: 40, status: 'Inactivo' },
  { id: 6, name: 'Sofía Martínez', startDate: '2023-02-22', sessions: 15, status: 'Activo' },
];

type SortConfig = {
  key: keyof typeof mockClients[0];
  direction: 'ascending' | 'descending';
} | null;

const ClientRosterTable: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState<SortConfig>(null);

  const filteredClients = useMemo(() => {
    let searchableClients = [...mockClients];
    if (searchTerm) {
      searchableClients = searchableClients.filter(client =>
        client.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    return searchableClients;
  }, [searchTerm]);

  const sortedClients = useMemo(() => {
    let sortableClients = [...filteredClients];
    if (sortConfig !== null) {
      sortableClients.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableClients;
  }, [filteredClients, sortConfig]);

  const requestSort = (key: keyof typeof mockClients[0]) => {
    let direction: 'ascending' | 'descending' = 'ascending';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const handleRowClick = (clientId: number) => {
    // Navigate to client detail page (future implementation)
    console.log(`Navigating to details for client ${clientId}`);
  };

  return (
    <div className="p-6 bg-surface rounded-lg shadow-lg border border-border">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-text">Mis Clientes</h2>
        <div className="text-sm text-textMuted">
          {sortedClients.length} cliente{sortedClients.length !== 1 ? 's' : ''}
        </div>
      </div>
      <div className="mb-6">
        <div className="relative">
          <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-textMuted" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
          </svg>
          <input
            type="text"
            placeholder="Buscar cliente por nombre..."
            className="w-full pl-10 pr-4 py-3 bg-backgroundSecondary border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-focus focus:border-focus text-text placeholder-textMuted transition-colors duration-200"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      <div className="bg-backgroundSecondary rounded-lg overflow-hidden border border-border">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-card border-b border-border">
              <tr>
                <th 
                  className="px-6 py-4 text-left text-xs font-semibold text-textSecondary uppercase tracking-wider cursor-pointer hover:text-text transition-colors duration-200 select-none" 
                  onClick={() => requestSort('name')}
                >
                  <div className="flex items-center space-x-1">
                    <span>Nombre del Cliente</span>
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </div>
                </th>
                <th 
                  className="px-6 py-4 text-left text-xs font-semibold text-textSecondary uppercase tracking-wider cursor-pointer hover:text-text transition-colors duration-200 select-none" 
                  onClick={() => requestSort('startDate')}
                >
                  <div className="flex items-center space-x-1">
                    <span>Fecha de Inicio</span>
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </div>
                </th>
                <th 
                  className="px-6 py-4 text-left text-xs font-semibold text-textSecondary uppercase tracking-wider cursor-pointer hover:text-text transition-colors duration-200 select-none" 
                  onClick={() => requestSort('sessions')}
                >
                  <div className="flex items-center space-x-1">
                    <span>Nº de Sesiones</span>
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </div>
                </th>
                <th 
                  className="px-6 py-4 text-left text-xs font-semibold text-textSecondary uppercase tracking-wider cursor-pointer hover:text-text transition-colors duration-200 select-none" 
                  onClick={() => requestSort('status')}
                >
                  <div className="flex items-center space-x-1">
                    <span>Estado</span>
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {sortedClients.length > 0 ? (
                sortedClients.map((client) => (
                  <tr 
                    key={client.id} 
                    onClick={() => handleRowClick(client.id)} 
                    className="hover:bg-surface cursor-pointer transition-colors duration-200 group"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center mr-3">
                          <span className="text-textInverse font-semibold text-sm">
                            {client.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                          </span>
                        </div>
                        <div>
                          <div className="text-sm font-medium text-text group-hover:text-primary transition-colors duration-200">
                            {client.name}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-textSecondary">
                      {new Date(client.startDate).toLocaleDateString('es-ES', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <span className="text-sm font-medium text-text mr-2">{client.sessions}</span>
                        <div className="w-16 bg-backgroundSecondary rounded-full h-2">
                          <div 
                            className="bg-primary h-2 rounded-full transition-all duration-300" 
                            style={{ width: `${Math.min((client.sessions / 50) * 100, 100)}%` }}
                          ></div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                        client.status === 'Activo' 
                          ? 'bg-successLight text-successDark border border-success' 
                          : 'bg-errorLight text-errorDark border border-error'
                      }`}>
                        <div className={`w-2 h-2 rounded-full mr-2 ${
                          client.status === 'Activo' ? 'bg-success' : 'bg-error'
                        }`}></div>
                        {client.status}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center">
                    <div className="flex flex-col items-center">
                      <svg className="w-12 h-12 text-textMuted mb-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                      </svg>
                      <p className="text-textMuted text-sm">
                        {searchTerm ? 'No se encontraron clientes que coincidan con tu búsqueda' : 'No tienes clientes registrados aún'}
                      </p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ClientRosterTable;
