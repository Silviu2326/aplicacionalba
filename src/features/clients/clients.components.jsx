import React, { useState } from 'react';
import { Phone, Mail, Calendar, User, Edit, Trash2, TrendingUp } from 'lucide-react';
import Card from '../../components/Card';
import Button from '../../components/Button';

// Componente para tarjeta de cliente
export const ClientCard = ({ client, onEdit, onDelete, onViewProfile }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-gray-100 text-gray-800';
      case 'suspended': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'active': return 'Activo';
      case 'inactive': return 'Inactivo';
      case 'suspended': return 'Suspendido';
      default: return 'Desconocido';
    }
  };

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
            <span className="text-white font-semibold">
              {client.name.split(' ').map(n => n[0]).join('')}
            </span>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">{client.name}</h3>
            <span className={`inline-block px-2 py-1 text-xs rounded-full ${getStatusColor(client.status)}`}>
              {getStatusText(client.status)}
            </span>
          </div>
        </div>
        <div className="flex space-x-1">
          <button 
            onClick={() => onEdit(client)}
            className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <Edit size={16} className="text-gray-500" />
          </button>
          <button 
            onClick={() => onDelete(client.id)}
            className="p-1 hover:bg-red-100 rounded-lg transition-colors"
          >
            <Trash2 size={16} className="text-red-500" />
          </button>
        </div>
      </div>

      <div className="space-y-2 mb-4">
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <Mail size={14} />
          <span>{client.email}</span>
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <Phone size={14} />
          <span>{client.phone}</span>
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <Calendar size={14} />
          <span>Cliente desde {new Date(client.joinDate).toLocaleDateString()}</span>
        </div>
      </div>

      <div className="mt-4 flex space-x-2">
        <Button 
          variant="outline" 
          size="sm" 
          className="flex-1"
          onClick={() => onViewProfile(client)}
        >
          Ver Perfil
        </Button>
        <Button size="sm" className="flex-1">
          Nueva Sesión
        </Button>
      </div>
    </Card>
  );
};

// Formulario para crear/editar cliente
export const ClientForm = ({ client = null, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    name: client?.name || '',
    email: client?.email || '',
    phone: client?.phone || '',
    birthDate: client?.birthDate || '',
    height: client?.height || '',
    weight: client?.weight || '',
    goals: client?.goals || '',
    medicalNotes: client?.medicalNotes || ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <Card title={client ? 'Editar Cliente' : 'Nuevo Cliente'}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nombre completo *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email *
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Teléfono *
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Fecha de nacimiento
            </label>
            <input
              type="date"
              name="birthDate"
              value={formData.birthDate}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Altura (cm)
            </label>
            <input
              type="number"
              name="height"
              value={formData.height}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Peso (kg)
            </label>
            <input
              type="number"
              name="weight"
              value={formData.weight}
              onChange={handleChange}
              step="0.1"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Objetivos
          </label>
          <textarea
            name="goals"
            value={formData.goals}
            onChange={handleChange}
            rows={3}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Describe los objetivos del cliente..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Notas médicas
          </label>
          <textarea
            name="medicalNotes"
            value={formData.medicalNotes}
            onChange={handleChange}
            rows={3}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Lesiones, restricciones médicas, etc."
          />
        </div>

        <div className="flex space-x-3 pt-4">
          <Button type="submit" className="flex-1">
            {client ? 'Actualizar' : 'Crear'} Cliente
          </Button>
          <Button 
            type="button" 
            variant="outline" 
            className="flex-1"
            onClick={onCancel}
          >
            Cancelar
          </Button>
        </div>
      </form>
    </Card>
  );
};

// Componente para mostrar el progreso del cliente
export const ClientProgress = ({ clientId, progressData = [] }) => {
  return (
    <Card title="Progreso del Cliente">
      {progressData.length === 0 ? (
        <div className="text-center py-8">
          <TrendingUp size={48} className="mx-auto text-gray-400 mb-4" />
          <p className="text-gray-500">No hay datos de progreso disponibles</p>
        </div>
      ) : (
        <div className="space-y-4">
          {progressData.map((entry, index) => (
            <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium">{new Date(entry.date).toLocaleDateString()}</p>
              </div>
              <div className="flex space-x-6 text-sm">
                <div className="text-center">
                  <p className="text-gray-500">Peso</p>
                  <p className="font-medium">{entry.weight} kg</p>
                </div>
                <div className="text-center">
                  <p className="text-gray-500">% Grasa</p>
                  <p className="font-medium">{entry.bodyFat}%</p>
                </div>
                <div className="text-center">
                  <p className="text-gray-500">Músculo</p>
                  <p className="font-medium">{entry.muscle} kg</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
};

// Filtros para la lista de clientes
export const ClientFilters = ({ onFilterChange, currentFilters = {} }) => {
  return (
    <Card>
      <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Buscar por nombre o email..."
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            onChange={(e) => onFilterChange({ search: e.target.value })}
          />
        </div>
        <div className="flex items-center space-x-4">
          <select
            className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            onChange={(e) => onFilterChange({ status: e.target.value })}
            value={currentFilters.status || 'all'}
          >
            <option value="all">Todos</option>
            <option value="active">Activos</option>
            <option value="inactive">Inactivos</option>
            <option value="suspended">Suspendidos</option>
          </select>
          <Button variant="outline" size="sm">
            Filtros Avanzados
          </Button>
        </div>
      </div>
    </Card>
  );
};