import React, { useState } from 'react';
import { Apple, Clock, Users, Plus, Edit, Trash2, Target } from 'lucide-react';
import Card from '../../components/Card';
import Button from '../../components/Button';

// Componente para tarjeta de plan nutricional
export const DietCard = ({ diet, onEdit, onDelete, onAssign, onDuplicate }) => {
  const getCategoryColor = (category) => {
    switch (category) {
      case 'weight_loss': return 'bg-red-100 text-red-800';
      case 'muscle_gain': return 'bg-blue-100 text-blue-800';
      case 'maintenance': return 'bg-green-100 text-green-800';
      case 'special': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'draft': return 'bg-yellow-100 text-yellow-800';
      case 'archived': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const categories = {
    weight_loss: 'Pérdida de peso',
    muscle_gain: 'Ganancia muscular',
    maintenance: 'Mantenimiento',
    special: 'Especial'
  };

  const statusLabels = {
    active: 'Activo',
    draft: 'Borrador',
    archived: 'Archivado'
  };

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-2">
            <span className={`px-2 py-1 text-xs rounded-full ${getCategoryColor(diet.category)}`}>
              {categories[diet.category]}
            </span>
            <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(diet.status)}`}>
              {statusLabels[diet.status]}
            </span>
          </div>
          <h3 className="font-semibold text-gray-900 mb-1">{diet.name}</h3>
          <p className="text-sm text-gray-600">{diet.description}</p>
        </div>
        <div className="flex space-x-1">
          <button 
            onClick={() => onEdit(diet)}
            className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <Edit size={16} className="text-gray-500" />
          </button>
          <button 
            onClick={() => onDelete(diet.id)}
            className="p-1 hover:bg-red-100 rounded-lg transition-colors"
          >
            <Trash2 size={16} className="text-red-500" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
        <div className="flex items-center space-x-2">
          <Target size={14} className="text-orange-500" />
          <span className="text-gray-600">{diet.calories} kcal/día</span>
        </div>
        <div className="flex items-center space-x-2">
          <Clock size={14} className="text-blue-500" />
          <span className="text-gray-600">{diet.duration} semanas</span>
        </div>
        <div className="flex items-center space-x-2">
          <Users size={14} className="text-green-500" />
          <span className="text-gray-600">{diet.clients || 0} clientes</span>
        </div>
        <div className="text-xs text-gray-500">
          Creado {new Date(diet.createdDate).toLocaleDateString()}
        </div>
      </div>

      <div className="border-t border-gray-200 pt-4">
        <div className="flex space-x-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="flex-1"
            onClick={() => onEdit(diet)}
          >
            Editar
          </Button>
          <Button 
            size="sm" 
            className="flex-1"
            onClick={() => onAssign(diet)}
          >
            Asignar
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => onDuplicate(diet)}
          >
            Duplicar
          </Button>
        </div>
      </div>
    </Card>
  );
};

// Formulario para crear/editar plan nutricional
export const DietForm = ({ diet = null, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    name: diet?.name || '',
    description: diet?.description || '',
    category: diet?.category || 'weight_loss',
    calories: diet?.calories || '',
    duration: diet?.duration || '',
    protein: diet?.macros?.protein || 30,
    carbs: diet?.macros?.carbs || 40,
    fat: diet?.macros?.fat || 30,
    instructions: diet?.instructions || ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const dietData = {
      ...formData,
      macros: {
        protein: formData.protein,
        carbs: formData.carbs,
        fat: formData.fat
      }
    };
    onSubmit(dietData);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <Card title={diet ? 'Editar Plan Nutricional' : 'Nuevo Plan Nutricional'}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nombre del plan *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Ej: Plan Pérdida de Peso - Básico"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Categoría *
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="weight_loss">Pérdida de peso</option>
              <option value="muscle_gain">Ganancia muscular</option>
              <option value="maintenance">Mantenimiento</option>
              <option value="special">Especial</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Duración (semanas) *
            </label>
            <input
              type="number"
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              required
              min="1"
              max="52"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Calorías diarias *
            </label>
            <input
              type="number"
              name="calories"
              value={formData.calories}
              onChange={handleChange}
              required
              min="800"
              max="4000"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Descripción
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={3}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Describe el objetivo y características del plan..."
          />
        </div>

        {/* Macronutrientes */}
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-3">Distribución de Macronutrientes (%)</h3>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Proteínas
              </label>
              <input
                type="number"
                name="protein"
                value={formData.protein}
                onChange={handleChange}
                min="10"
                max="50"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Carbohidratos
              </label>
              <input
                type="number"
                name="carbs"
                value={formData.carbs}
                onChange={handleChange}
                min="20"
                max="70"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Grasas
              </label>
              <input
                type="number"
                name="fat"
                value={formData.fat}
                onChange={handleChange}
                min="15"
                max="40"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          <p className="text-sm text-gray-500 mt-1">
            Total: {Number(formData.protein) + Number(formData.carbs) + Number(formData.fat)}%
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Instrucciones especiales
          </label>
          <textarea
            name="instructions"
            value={formData.instructions}
            onChange={handleChange}
            rows={3}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Instrucciones adicionales, restricciones, suplementos, etc."
          />
        </div>

        <div className="flex space-x-3 pt-4">
          <Button type="submit" className="flex-1">
            {diet ? 'Actualizar' : 'Crear'} Plan
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

// Componente para mostrar macronutrientes
export const MacroDistribution = ({ macros, calories }) => {
  const proteinCals = Math.round((calories * macros.protein) / 100);
  const carbsCals = Math.round((calories * macros.carbs) / 100);
  const fatCals = Math.round((calories * macros.fat) / 100);

  return (
    <Card title="Distribución de Macronutrientes">
      <div className="space-y-4">
        <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
          <div>
            <p className="font-medium text-blue-900">Proteínas</p>
            <p className="text-sm text-blue-700">{macros.protein}% • {proteinCals} kcal • {Math.round(proteinCals / 4)}g</p>
          </div>
          <div className="w-16 h-16 relative">
            <div className="w-full h-full bg-blue-200 rounded-full flex items-center justify-center">
              <span className="text-blue-800 font-bold text-sm">{macros.protein}%</span>
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
          <div>
            <p className="font-medium text-green-900">Carbohidratos</p>
            <p className="text-sm text-green-700">{macros.carbs}% • {carbsCals} kcal • {Math.round(carbsCals / 4)}g</p>
          </div>
          <div className="w-16 h-16 relative">
            <div className="w-full h-full bg-green-200 rounded-full flex items-center justify-center">
              <span className="text-green-800 font-bold text-sm">{macros.carbs}%</span>
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg">
          <div>
            <p className="font-medium text-yellow-900">Grasas</p>
            <p className="text-sm text-yellow-700">{macros.fat}% • {fatCals} kcal • {Math.round(fatCals / 9)}g</p>
          </div>
          <div className="w-16 h-16 relative">
            <div className="w-full h-full bg-yellow-200 rounded-full flex items-center justify-center">
              <span className="text-yellow-800 font-bold text-sm">{macros.fat}%</span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

// Componente para asignar dieta a cliente
export const AssignDietModal = ({ diet, clients = [], onAssign, onClose }) => {
  const [selectedClient, setSelectedClient] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedClient) {
      onAssign(diet.id, selectedClient);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4">
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          Asignar "{diet.name}"
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Seleccionar cliente
            </label>
            <select
              value={selectedClient}
              onChange={(e) => setSelectedClient(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            >
              <option value="">Selecciona un cliente...</option>
              {clients.map((client) => (
                <option key={client.id} value={client.id}>
                  {client.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex space-x-3 pt-4">
            <Button type="submit" className="flex-1">
              Asignar Plan
            </Button>
            <Button 
              type="button" 
              variant="outline" 
              className="flex-1"
              onClick={onClose}
            >
              Cancelar
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};