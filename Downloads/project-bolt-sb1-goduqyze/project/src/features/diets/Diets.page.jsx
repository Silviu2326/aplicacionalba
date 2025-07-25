import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Search, Filter, Apple, Clock, Users, Edit } from 'lucide-react';
import Card from '../../components/Card';
import Button from '../../components/Button';
import DietTemplates from './DietTemplates';

const DietsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isTemplatesModalOpen, setIsTemplatesModalOpen] = useState(false);
  const navigate = useNavigate();

  const [diets, setDiets] = useState([
    {
      id: 1,
      name: 'Plan Pérdida de Peso - Básico',
      description: 'Dieta hipocalórica equilibrada para pérdida de peso gradual',
      category: 'weight_loss',
      calories: 1500,
      duration: '8 semanas',
      clients: 5,
      status: 'active',
      createdDate: '2024-01-05'
    },
    {
      id: 2,
      name: 'Plan Ganancia Muscular',
      description: 'Dieta alta en proteínas para ganar masa muscular',
      category: 'muscle_gain',
      calories: 2200,
      duration: '12 semanas',
      clients: 3,
      status: 'active',
      createdDate: '2024-01-10'
    },
    {
      id: 3,
      name: 'Plan Mantenimiento',
      description: 'Dieta balanceada para mantener peso actual',
      category: 'maintenance',
      calories: 1800,
      duration: '4 semanas',
      clients: 8,
      status: 'draft',
      createdDate: '2024-01-12'
    }
  ]);

  const handleSaveDiet = (newDiet) => {
    setDiets(prev => [newDiet, ...prev]);
  };

  const handleSelectTemplate = (templateDiet) => {
    setDiets(prev => [templateDiet, ...prev]);
  };

  const handleEditDiet = (diet) => {
    navigate(`/diets/edit/${diet.id}`);
  };

  const handleCreateDiet = () => {
    navigate('/diets/new');
  };

  const categories = {
    all: 'Todos',
    weight_loss: 'Pérdida de peso',
    muscle_gain: 'Ganancia muscular',
    maintenance: 'Mantenimiento',
    special: 'Dietas especiales'
  };

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

  const getStatusText = (status) => {
    switch (status) {
      case 'active': return 'Activo';
      case 'draft': return 'Borrador';
      case 'archived': return 'Archivado';
      default: return 'Desconocido';
    }
  };

  const filteredDiets = diets.filter(diet => {
    const matchesSearch = diet.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         diet.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || diet.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-light/20 via-white to-brand/10 p-6">
      <div className="container mx-auto space-y-8 animate-fade-in-up">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-display font-bold bg-gradient-to-r from-brand-dark to-brand bg-clip-text text-transparent">
            Planes Nutricionales
          </h1>
          <p className="text-neutral-600 mt-2 text-lg">Crea y gestiona dietas personalizadas para tus clientes</p>
        </div>
        <div className="mt-6 md:mt-0 flex space-x-4">
          <button 
            onClick={() => setIsTemplatesModalOpen(true)}
            className="glass-mid hover:glass border-0 text-brand-dark hover:text-brand font-semibold px-4 py-3 transition-all duration-300"
          >
            Plantillas
          </button>
          <button 
            onClick={handleCreateDiet}
            className="glass-mid hover:glass border-0 text-brand-dark hover:text-brand font-semibold px-6 py-3 transition-all duration-300 hover:scale-105"
          >
            <Plus size={16} className="mr-2" />
            Nueva Dieta
          </button>
        </div>
      </div>

      {/* Estadísticas rápidas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="glass-mid p-6 hover:glass transition-all duration-300 transform hover:scale-105 animate-glass-pop">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-neutral-600 mb-2 font-medium">Total Planes</p>
              <p className="text-3xl font-display font-bold text-neutral-900">{diets.length}</p>
            </div>
            <div className="p-4 bg-amber-500/10 backdrop-blur-sm border border-white/20">
              <Apple size={28} className="text-amber-600" />
            </div>
          </div>
        </div>
        <div className="glass-mid p-6 hover:glass transition-all duration-300 transform hover:scale-105 animate-glass-pop" style={{ animationDelay: '100ms' }}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-neutral-600 mb-2 font-medium">Planes Activos</p>
              <p className="text-3xl font-display font-bold text-neutral-900">
                {diets.filter(d => d.status === 'active').length}
              </p>
            </div>
            <div className="p-4 bg-emerald-500/10 backdrop-blur-sm border border-white/20">
              <div className="w-7 h-7 bg-emerald-500 rounded-full flex items-center justify-center">
                <div className="w-3 h-3 bg-white rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
        <div className="glass-mid p-6 hover:glass transition-all duration-300 transform hover:scale-105 animate-glass-pop" style={{ animationDelay: '200ms' }}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-neutral-600 mb-2 font-medium">Clientes Asignados</p>
              <p className="text-3xl font-display font-bold text-neutral-900">
                {diets.reduce((sum, diet) => sum + diet.clients, 0)}
              </p>
            </div>
            <div className="p-4 bg-brand/10 backdrop-blur-sm border border-white/20">
              <Users size={28} className="text-brand" />
            </div>
          </div>
        </div>
        <div className="glass-mid p-6 hover:glass transition-all duration-300 transform hover:scale-105 animate-glass-pop" style={{ animationDelay: '300ms' }}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-neutral-600 mb-2 font-medium">Promedio Calorías</p>
              <p className="text-3xl font-display font-bold text-neutral-900">
                {Math.round(diets.reduce((sum, diet) => sum + diet.calories, 0) / diets.length)}
              </p>
            </div>
            <div className="p-4 bg-purple-500/10 backdrop-blur-sm border border-white/20">
              <div className="text-purple-600 font-bold text-lg">kcal</div>
            </div>
          </div>
        </div>
      </div>

      {/* Filtros y búsqueda */}
      <div className="glass p-6 animate-glass-pop">
        <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Buscar planes nutricionales..."
              className="pl-10 pr-4 py-3 w-full glass border-0 placeholder-neutral-500 text-neutral-800 focus:ring-2 focus:ring-brand/50 focus:outline-none transition-all duration-300"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex items-center space-x-4">
            <select
              className="glass border-0 px-4 py-3 text-neutral-800 focus:ring-2 focus:ring-brand/50 focus:outline-none transition-all duration-300"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {Object.entries(categories).map(([key, label]) => (
                <option key={key} value={key}>{label}</option>
              ))}
            </select>
            <button className="glass-mid hover:glass border-0 text-brand-dark hover:text-brand px-4 py-3 transition-all duration-300">
              <Filter size={16} className="mr-2" />
              Más Filtros
            </button>
          </div>
        </div>
      </div>

      {/* Lista de dietas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredDiets.map((diet) => (
          <div key={diet.id} className="glass-mid hover:glass transition-all duration-500 hover:scale-105 animate-glass-pop p-6 group">
            <div className="flex items-start justify-between mb-6">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-3">
                  <span className={`px-3 py-1 text-xs rounded-full font-medium ${getCategoryColor(diet.category)}`}>
                    {categories[diet.category]}
                  </span>
                  <span className={`px-3 py-1 text-xs rounded-full font-medium ${getStatusColor(diet.status)}`}>
                    {getStatusText(diet.status)}
                  </span>
                </div>
                <h3 className="font-display font-bold text-neutral-900 text-lg mb-2">{diet.name}</h3>
                <p className="text-sm text-neutral-600">{diet.description}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-amber-500 rounded-full"></div>
                <span className="text-neutral-600 font-medium">{diet.calories} kcal/día</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock size={14} className="text-neutral-500" />
                <span className="text-neutral-600">{diet.duration}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Users size={14} className="text-neutral-500" />
                <span className="text-neutral-600">{diet.clients} clientes</span>
              </div>
              <div className="text-xs text-neutral-500">
                Creado {new Date(diet.createdDate).toLocaleDateString()}
              </div>
            </div>

            <div className="border-t border-white/20 pt-4">
              <div className="flex space-x-3">
                <button 
                  onClick={() => handleEditDiet(diet)}
                  className="flex-1 glass border-0 text-neutral-700 hover:text-brand transition-all duration-300 py-2 font-medium flex items-center justify-center"
                >
                  <Edit size={14} className="mr-1" />
                  Editar
                </button>
                <button className="flex-1 bg-gradient-to-r from-brand to-brand-light text-white hover:from-brand-light hover:to-brand transition-all duration-300 py-2 shadow-frosted font-medium">
                  Asignar
                </button>
                <button className="glass border-0 text-neutral-700 hover:text-brand transition-all duration-300 py-2 px-3 font-medium">
                  Duplicar
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredDiets.length === 0 && (
        <div className="glass-mid text-center py-16 animate-glass-pop">
          <div className="w-20 h-20 bg-gradient-to-br from-amber-200 to-amber-300 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Apple size={32} className="text-amber-600" />
          </div>
          <h3 className="text-xl font-display font-bold text-neutral-900 mb-3">No se encontraron planes</h3>
          <p className="text-neutral-600 mb-8 text-lg">
            {searchTerm ? 'Intenta con otros términos de búsqueda' : 'Comienza creando tu primer plan nutricional'}
          </p>
          <button 
            onClick={handleCreateDiet}
            className="bg-gradient-to-r from-brand to-brand-light text-white hover:from-brand-light hover:to-brand transition-all duration-300 px-8 py-3 shadow-frosted font-semibold"
          >
            <Plus size={16} className="mr-2" />
            Crear Plan Nutricional
          </button>
        </div>
      )}
      </div>
      
      {/* Modal de Plantillas */}
      <DietTemplates 
        isOpen={isTemplatesModalOpen}
        onClose={() => setIsTemplatesModalOpen(false)}
        onSelectTemplate={handleSelectTemplate}
      />
    </div>
  );
};

export default DietsPage;