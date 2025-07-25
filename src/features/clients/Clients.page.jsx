import React, { useState } from 'react';
import { Search, Plus, Filter, MoreVertical, Phone, Mail } from 'lucide-react';
import Button from '../../components/Button';
import CreateClient from './CreateClient';
import ClientProfile from './ClientProfile';

const ClientsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);

  const [clients, setClients] = useState([
    {
      id: 1,
      name: 'María López',
      email: 'maria.lopez@email.com',
      phone: '+34 600 123 456',
      status: 'active',
      joinDate: '2023-12-15',
      lastSession: '2024-01-10',
      progress: '+5kg',
      avatar: 'ML'
    },
    {
      id: 2,
      name: 'Carlos Ruiz',
      email: 'carlos.ruiz@email.com',
      phone: '+34 600 654 321',
      status: 'active',
      joinDate: '2024-01-05',
      lastSession: '2024-01-12',
      progress: '-3kg',
      avatar: 'CR'
    },
    {
      id: 3,
      name: 'Alba Martín',
      email: 'alba.martin@email.com',
      phone: '+34 600 987 654',
      status: 'inactive',
      joinDate: '2023-11-20',
      lastSession: '2024-01-08',
      progress: '+2kg',
      avatar: 'AM'
    }
  ]);

  const handleSaveClient = (newClient) => {
    setClients(prev => [newClient, ...prev]);
  };

  const handleViewProfile = (client) => {
    setSelectedClient(client);
    setIsProfileModalOpen(true);
  };

  const filteredClients = clients.filter(client => {
    const matchesSearch = client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         client.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || client.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'inactive':
        return 'bg-gray-100 text-gray-800';
      case 'suspended':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'active':
        return 'Activo';
      case 'inactive':
        return 'Inactivo';
      case 'suspended':
        return 'Suspendido';
      default:
        return 'Desconocido';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-light/20 via-white to-brand/10 p-6">
      <div className="container mx-auto space-y-8 animate-fade-in-up">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-display font-bold bg-gradient-to-r from-brand-dark to-brand bg-clip-text text-transparent">
            Gestión de Clientes
          </h1>
          <p className="text-neutral-600 mt-2 text-lg">Administra y da seguimiento a todos tus clientes</p>
        </div>
        <Button 
          onClick={() => setIsCreateModalOpen(true)}
          className="glass-mid hover:glass border-0 text-brand-dark hover:text-brand font-semibold px-6 py-3 transition-all duration-300 hover:scale-105"
        >
          <Plus size={16} className="mr-2" />
          Nuevo Cliente
        </Button>
      </div>

      {/* Filtros y búsqueda */}
      <div className="glass p-6 animate-glass-pop">
        <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Buscar clientes por nombre o email..."
              className="pl-10 pr-4 py-3 w-full glass border-0 placeholder-neutral-500 text-neutral-800 focus:ring-2 focus:ring-brand/50 focus:outline-none transition-all duration-300"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex items-center space-x-4">
            <select
              className="glass border-0 px-4 py-3 text-neutral-800 focus:ring-2 focus:ring-brand/50 focus:outline-none transition-all duration-300"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="all">Todos</option>
              <option value="active">Activos</option>
              <option value="inactive">Inactivos</option>
              <option value="suspended">Suspendidos</option>
            </select>
            <Button className="glass-mid hover:glass border-0 text-brand-dark hover:text-brand px-4 py-3 transition-all duration-300">
              <Filter size={16} className="mr-2" />
              Filtros
            </Button>
          </div>
        </div>
      </div>

      {/* Lista de clientes */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredClients.map((client) => (
          <div key={client.id} className="glass-mid hover:glass transition-all duration-500 hover:scale-105 animate-glass-pop p-6 group">
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center space-x-3">
                <div className="w-14 h-14 bg-gradient-to-br from-brand to-brand-light rounded-2xl flex items-center justify-center shadow-frosted">
                  <span className="text-white font-bold text-lg">{client.avatar}</span>
                </div>
                <div>
                  <h3 className="font-display font-bold text-neutral-900 text-lg">{client.name}</h3>
                  <span className={`inline-block px-2 py-1 text-xs rounded-full ${getStatusColor(client.status)}`}>
                    {getStatusText(client.status)}
                  </span>
                </div>
              </div>
              <button className="p-2 hover:bg-white/20 rounded-xl transition-all duration-300 opacity-0 group-hover:opacity-100">
                <MoreVertical size={18} className="text-neutral-600" />
              </button>
            </div>

            <div className="space-y-3 mb-6">
              <div className="flex items-center space-x-3 text-sm text-neutral-600">
                <Mail size={14} />
                <span>{client.email}</span>
              </div>
              <div className="flex items-center space-x-3 text-sm text-neutral-600">
                <Phone size={14} />
                <span>{client.phone}</span>
              </div>
            </div>

            <div className="border-t border-white/20 pt-4">
              <div className="flex justify-between text-sm">
                <div>
                  <p className="text-neutral-500">Última sesión</p>
                  <p className="font-semibold text-neutral-800">{new Date(client.lastSession).toLocaleDateString()}</p>
                </div>
                <div className="text-right">
                  <p className="text-neutral-500">Progreso</p>
                  <p className={`font-bold ${client.progress.startsWith('+') ? 'text-green-600' : 'text-brand'}`}>
                    {client.progress}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 flex space-x-3">
              <Button 
                onClick={() => handleViewProfile(client)}
                className="flex-1 glass border-0 text-neutral-700 hover:text-brand transition-all duration-300 py-2"
              >
                Ver Perfil
              </Button>
              <Button className="flex-1 bg-gradient-to-r from-brand to-brand-light text-white hover:from-brand-light hover:to-brand transition-all duration-300 py-2 shadow-frosted">
                Nueva Sesión
              </Button>
            </div>
          </div>
        ))}
      </div>

      {filteredClients.length === 0 && (
        <div className="glass-mid text-center py-16 animate-glass-pop">
          <div className="w-20 h-20 bg-gradient-to-br from-neutral-200 to-neutral-300 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Search size={32} className="text-neutral-500" />
          </div>
          <h3 className="text-xl font-display font-bold text-neutral-900 mb-3">No se encontraron clientes</h3>
          <p className="text-neutral-600 mb-8 text-lg">
            {searchTerm ? 'Intenta con otros términos de búsqueda' : 'Comienza agregando tu primer cliente'}
          </p>
          <Button className="bg-gradient-to-r from-brand to-brand-light text-white hover:from-brand-light hover:to-brand transition-all duration-300 px-8 py-3 shadow-frosted">
            Agregar Nuevo Cliente
          </Button>
        </div>
      )}
      </div>
      
      {/* Modal de Crear Cliente */}
      <CreateClient 
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSave={handleSaveClient}
      />
      
      {/* Modal de Perfil de Cliente */}
      <ClientProfile
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        client={selectedClient}
      />
    </div>
  );
};

export default ClientsPage;