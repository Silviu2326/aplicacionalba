import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Search, Filter, Dumbbell, Clock, Target, Users, Play, Edit, Calendar, Share2 } from 'lucide-react';
import Card from '../../components/Card';
import Button from '../../components/Button';
import CreateWorkout from './CreateWorkout';
import WorkoutTemplates from './WorkoutTemplates';
import MicrocycleTemplates from './MicrocycleTemplates';
import ShareWorkoutModal from '../../components/ShareWorkoutModal';
import SharedLinksManager from '../../components/SharedLinksManager';

const WorkoutsPage = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isTemplatesModalOpen, setIsTemplatesModalOpen] = useState(false);
  const [isMicrocycleTemplatesOpen, setIsMicrocycleTemplatesOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [selectedWorkoutToShare, setSelectedWorkoutToShare] = useState(null);
  const [isSharedLinksOpen, setIsSharedLinksOpen] = useState(false);

  const [workouts, setWorkouts] = useState([
    {
      id: 1,
      name: 'Rutina Fuerza - Principiante',
      description: 'Rutina básica de fuerza para desarrollar masa muscular',
      category: 'strength',
      duration: 45,
      difficulty: 'beginner',
      exercises: 8,
      clients: 6,
      status: 'active',
      createdDate: '2024-01-05'
    },
    {
      id: 2,
      name: 'Cardio HIIT - Intermedio',
      description: 'Entrenamiento de alta intensidad para quemar grasa',
      category: 'cardio',
      duration: 30,
      difficulty: 'intermediate',
      exercises: 6,
      clients: 4,
      status: 'active',
      createdDate: '2024-01-08'
    },
    {
      id: 3,
      name: 'Flexibilidad y Movilidad',
      description: 'Rutina para mejorar flexibilidad y prevenir lesiones',
      category: 'flexibility',
      duration: 25,
      difficulty: 'beginner',
      exercises: 12,
      clients: 8,
      status: 'active',
      createdDate: '2024-01-10'
    },
    {
      id: 4,
      name: 'Fullbody - Avanzado',
      description: 'Rutina completa para atletas experimentados',
      category: 'strength',
      duration: 60,
      difficulty: 'advanced',
      exercises: 10,
      clients: 2,
      status: 'draft',
      createdDate: '2024-01-12'
    }
  ]);

  const handleSaveWorkout = (newWorkout) => {
    setWorkouts(prev => [newWorkout, ...prev]);
  };

  const handleSelectTemplate = (templateData) => {
    setWorkouts(prev => [templateData, ...prev]);
    setIsTemplatesModalOpen(false);
  };

  const handleSelectMicrocycleTemplate = (templateData) => {
    setWorkouts(prev => [templateData, ...prev]);
    setIsMicrocycleTemplatesOpen(false);
  };

  const handleEditWorkout = (workout) => {
    navigate(`/workouts/edit/${workout.id}`);
  };

  const handleShareWorkout = (workout) => {
    setSelectedWorkoutToShare(workout);
    setIsShareModalOpen(true);
  };

  const handleCreateWorkout = () => {
    navigate('/workouts/new');
  };

  const categories = {
    all: 'Todas',
    strength: 'Fuerza',
    cardio: 'Cardio',
    flexibility: 'Flexibilidad',
    functional: 'Funcional'
  };

  const difficulties = {
    beginner: 'Principiante',
    intermediate: 'Intermedio',
    advanced: 'Avanzado'
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case 'strength': return 'bg-blue-100 text-blue-800';
      case 'cardio': return 'bg-red-100 text-red-800';
      case 'flexibility': return 'bg-green-100 text-green-800';
      case 'functional': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'advanced': return 'bg-red-100 text-red-800';
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
      case 'active': return 'Activa';
      case 'draft': return 'Borrador';
      case 'archived': return 'Archivada';
      default: return 'Desconocido';
    }
  };

  const filteredWorkouts = workouts.filter(workout => {
    const matchesSearch = workout.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         workout.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || workout.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-light/20 via-white to-brand/10 p-6">
      <div className="container mx-auto space-y-8 animate-fade-in-up">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-display font-bold bg-gradient-to-r from-brand-dark to-brand bg-clip-text text-transparent">
            Rutinas de Entrenamiento
          </h1>
          <p className="text-neutral-600 mt-2 text-lg">Crea y gestiona rutinas personalizadas de ejercicios</p>
        </div>
        <div className="mt-6 md:mt-0 flex space-x-3">
          <button 
            onClick={() => setIsTemplatesModalOpen(true)}
            className="glass-mid hover:glass border-0 text-brand-dark hover:text-brand font-semibold px-4 py-3 transition-all duration-300"
          >
            Plantillas
          </button>
          <button 
            onClick={() => setIsMicrocycleTemplatesOpen(true)}
            className="glass-mid hover:glass border-0 text-brand-dark hover:text-brand font-semibold px-4 py-3 transition-all duration-300 flex items-center space-x-2"
          >
            <Calendar size={16} />
            <span>Micro-ciclos</span>
          </button>
          <button
            onClick={() => setIsSharedLinksOpen(true)}
            className="glass-mid hover:glass border-0 text-brand-dark hover:text-brand font-semibold px-4 py-3 transition-all duration-300 flex items-center space-x-2"
          >
            <Share2 size={16} />
            <span>Enlaces compartidos</span>
          </button>
          <button 
            onClick={handleCreateWorkout}
            className="glass-mid hover:glass border-0 text-brand-dark hover:text-brand font-semibold px-6 py-3 transition-all duration-300 hover:scale-105"
          >
            <Plus size={16} className="mr-2" />
            Nueva Rutina
          </button>
        </div>
      </div>

      {/* Estadísticas rápidas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="glass-mid p-6 hover:glass transition-all duration-300 transform hover:scale-105 animate-glass-pop">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-neutral-600 mb-2 font-medium">Total Rutinas</p>
              <p className="text-3xl font-display font-bold text-neutral-900">{workouts.length}</p>
            </div>
            <div className="p-4 bg-brand/10 backdrop-blur-sm border border-white/20">
              <Dumbbell size={28} className="text-brand" />
            </div>
          </div>
        </div>
        <div className="glass-mid p-6 hover:glass transition-all duration-300 transform hover:scale-105 animate-glass-pop" style={{ animationDelay: '100ms' }}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-neutral-600 mb-2 font-medium">Rutinas Activas</p>
              <p className="text-3xl font-display font-bold text-neutral-900">
                {workouts.filter(w => w.status === 'active').length}
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
              <p className="text-sm text-neutral-600 mb-2 font-medium">Clientes Entrenando</p>
              <p className="text-3xl font-display font-bold text-neutral-900">
                {workouts.reduce((sum, workout) => sum + workout.clients, 0)}
              </p>
            </div>
            <div className="p-4 bg-purple-500/10 backdrop-blur-sm border border-white/20">
              <Users size={28} className="text-purple-600" />
            </div>
          </div>
        </div>
        <div className="glass-mid p-6 hover:glass transition-all duration-300 transform hover:scale-105 animate-glass-pop" style={{ animationDelay: '300ms' }}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-neutral-600 mb-2 font-medium">Duración Promedio</p>
              <p className="text-3xl font-display font-bold text-neutral-900">
                {Math.round(workouts.reduce((sum, workout) => sum + workout.duration, 0) / workouts.length)}
              </p>
            </div>
            <div className="p-4 bg-amber-500/10 backdrop-blur-sm border border-white/20">
              <div className="text-amber-600 font-bold text-lg">min</div>
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
              placeholder="Buscar rutinas de entrenamiento..."
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

      {/* Lista de rutinas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredWorkouts.map((workout) => (
          <div key={workout.id} className="glass-mid hover:glass transition-all duration-500 hover:scale-105 animate-glass-pop p-6 group">
            <div className="flex items-start justify-between mb-6">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-3 flex-wrap gap-y-1">
                  <span className={`px-3 py-1 text-xs rounded-full font-medium ${getCategoryColor(workout.category)}`}>
                    {categories[workout.category]}
                  </span>
                  <span className={`px-3 py-1 text-xs rounded-full font-medium ${getDifficultyColor(workout.difficulty)}`}>
                    {difficulties[workout.difficulty]}
                  </span>
                  <span className={`px-3 py-1 text-xs rounded-full font-medium ${getStatusColor(workout.status)}`}>
                    {getStatusText(workout.status)}
                  </span>
                </div>
                <h3 className="font-display font-bold text-neutral-900 text-lg mb-2">{workout.name}</h3>
                <p className="text-sm text-neutral-600">{workout.description}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
              <div className="flex items-center space-x-2">
                <Clock size={14} className="text-brand" />
                <span className="text-neutral-600 font-medium">{workout.duration} min</span>
              </div>
              <div className="flex items-center space-x-2">
                <Target size={14} className="text-emerald-600" />
                <span className="text-neutral-600">{workout.exercises} ejercicios</span>
              </div>
              <div className="flex items-center space-x-2">
                <Users size={14} className="text-purple-600" />
                <span className="text-neutral-600">{workout.clients} clientes</span>
              </div>
              <div className="text-xs text-neutral-500">
                {new Date(workout.createdDate).toLocaleDateString()}
              </div>
            </div>

            <div className="border-t border-white/20 pt-4">
              <div className="flex space-x-3">
                <button 
                  onClick={() => handleEditWorkout(workout)}
                  className="flex-1 glass border-0 text-neutral-700 hover:text-brand transition-all duration-300 py-2 font-medium flex items-center justify-center space-x-1"
                >
                  <Edit size={14} />
                  <span>Editar</span>
                </button>
                <button
                  onClick={() => handleShareWorkout(workout)}
                  className="glass border-0 text-neutral-700 hover:text-brand transition-all duration-300 py-2 px-3 font-medium"
                >
                  <Share2 size={14} />
                </button>
                <button className="flex-1 bg-gradient-to-r from-brand to-brand-light text-white hover:from-brand-light hover:to-brand transition-all duration-300 py-2 shadow-frosted font-medium">
                  Asignar
                </button>
                <button className="glass border-0 text-neutral-700 hover:text-brand transition-all duration-300 py-2 px-3 font-medium">
                  <Play size={14} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredWorkouts.length === 0 && (
        <div className="glass-mid text-center py-16 animate-glass-pop">
          <div className="w-20 h-20 bg-gradient-to-br from-brand-light to-brand rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Dumbbell size={32} className="text-white" />
          </div>
          <h3 className="text-xl font-display font-bold text-neutral-900 mb-3">No se encontraron rutinas</h3>
          <p className="text-neutral-600 mb-8 text-lg">
            {searchTerm ? 'Intenta con otros términos de búsqueda' : 'Comienza creando tu primera rutina de entrenamiento'}
          </p>
          <button 
            onClick={handleCreateWorkout}
            className="bg-gradient-to-r from-brand to-brand-light text-white hover:from-brand-light hover:to-brand transition-all duration-300 px-8 py-3 shadow-frosted font-semibold"
          >
            <Plus size={16} className="mr-2" />
            Crear Rutina de Entrenamiento
          </button>
        </div>
      )}
      </div>
      
      {/* Modal de Crear Rutina */}
      <CreateWorkout 
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSave={handleSaveWorkout}
      />
      
      <WorkoutTemplates
          isOpen={isTemplatesModalOpen}
          onClose={() => setIsTemplatesModalOpen(false)}
          onSelectTemplate={handleSelectTemplate}
        />
        
      <MicrocycleTemplates
        isOpen={isMicrocycleTemplatesOpen}
        onClose={() => setIsMicrocycleTemplatesOpen(false)}
        onSelectTemplate={handleSelectMicrocycleTemplate}
      />
      
      <ShareWorkoutModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        workout={selectedWorkoutToShare}
      />
      
      <SharedLinksManager
        isOpen={isSharedLinksOpen}
        onClose={() => setIsSharedLinksOpen(false)}
      />
    </div>
  );
};

export default WorkoutsPage;