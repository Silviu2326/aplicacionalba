import React, { useState, useEffect } from 'react';
import { X, Search, Filter, Plus, BookOpen, Dumbbell, Clock, Target } from 'lucide-react';
import { getExerciseLibrary, searchExerciseLibrary } from './exerciseLibrary.api';

const ExerciseLibraryModal = ({ isOpen, onClose, onSelectExercise }) => {
  const [exercises, setExercises] = useState([]);
  const [filteredExercises, setFilteredExercises] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    muscle_group: 'all',
    equipment: 'all',
    difficulty: 'all'
  });

  const muscleGroups = [
    'Pecho', 'Espalda', 'Hombros', 'Bíceps', 'Tríceps', 'Piernas', 'Glúteos', 'Core', 'Pantorrillas'
  ];

  const equipmentOptions = [
    'Mancuernas', 'Barra', 'Máquinas', 'Peso corporal', 'Bandas elásticas', 'Kettlebells', 'TRX', 'Barra de dominadas'
  ];

  const difficulties = {
    beginner: 'Principiante',
    intermediate: 'Intermedio',
    advanced: 'Avanzado'
  };

  // Cargar ejercicios al abrir el modal
  useEffect(() => {
    if (isOpen) {
      loadExercises();
    }
  }, [isOpen]);

  // Filtrar ejercicios cuando cambien los filtros o la búsqueda
  useEffect(() => {
    if (exercises.length > 0) {
      filterExercises();
    }
  }, [exercises, searchQuery, filters]);

  const loadExercises = async () => {
    setLoading(true);
    try {
      const libraryExercises = await getExerciseLibrary();
      setExercises(libraryExercises);
    } catch (error) {
      console.error('Error loading exercise library:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterExercises = async () => {
    try {
      const filtered = await searchExerciseLibrary(searchQuery, filters);
      setFilteredExercises(filtered);
    } catch (error) {
      console.error('Error filtering exercises:', error);
    }
  };

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const handleSelectExercise = (exercise) => {
    // Crear una copia del ejercicio con un nuevo ID para evitar conflictos
    const selectedExercise = {
      id: Date.now(),
      name: exercise.name,
      muscle_group: exercise.muscle_group,
      sets: exercise.sets,
      reps: exercise.reps,
      weight: exercise.weight,
      rest: exercise.rest,
      notes: exercise.notes
    };
    
    onSelectExercise(selectedExercise);
    onClose();
  };

  const clearFilters = () => {
    setSearchQuery('');
    setFilters({
      muscle_group: 'all',
      equipment: 'all',
      difficulty: 'all'
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <BookOpen className="h-6 w-6 text-blue-600" />
            <h2 className="text-xl font-semibold text-gray-900">Biblioteca de Ejercicios</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        {/* Filtros y búsqueda */}
        <div className="p-6 border-b border-gray-200 bg-gray-50">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Búsqueda */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Buscar ejercicios por nombre, grupo muscular o equipamiento..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            {/* Filtros */}
            <div className="flex flex-wrap gap-3">
              <select
                value={filters.muscle_group}
                onChange={(e) => handleFilterChange('muscle_group', e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">Todos los músculos</option>
                {muscleGroups.map(muscle => (
                  <option key={muscle} value={muscle}>{muscle}</option>
                ))}
              </select>

              <select
                value={filters.equipment}
                onChange={(e) => handleFilterChange('equipment', e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">Todo el equipamiento</option>
                {equipmentOptions.map(equipment => (
                  <option key={equipment} value={equipment}>{equipment}</option>
                ))}
              </select>

              <select
                value={filters.difficulty}
                onChange={(e) => handleFilterChange('difficulty', e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">Todas las dificultades</option>
                {Object.entries(difficulties).map(([key, label]) => (
                  <option key={key} value={key}>{label}</option>
                ))}
              </select>

              <button
                onClick={clearFilters}
                className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-200 rounded-lg transition-colors"
              >
                Limpiar filtros
              </button>
            </div>
          </div>
        </div>

        {/* Lista de ejercicios */}
        <div className="flex-1 overflow-y-auto p-6">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              <span className="ml-3 text-gray-600">Cargando ejercicios...</span>
            </div>
          ) : filteredExercises.length === 0 ? (
            <div className="text-center py-12">
              <Dumbbell className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500 mb-2">No se encontraron ejercicios</p>
              <p className="text-sm text-gray-400">Intenta ajustar los filtros de búsqueda</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredExercises.map((exercise) => (
                <div
                  key={exercise.id}
                  className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => handleSelectExercise(exercise)}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-medium text-gray-900 mb-1">{exercise.name}</h3>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <span className="flex items-center gap-1">
                          <Target className="h-3 w-3" />
                          {exercise.muscle_group}
                        </span>
                        <span className="flex items-center gap-1">
                          <Dumbbell className="h-3 w-3" />
                          {exercise.equipment}
                        </span>
                      </div>
                    </div>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      exercise.difficulty === 'beginner' ? 'bg-green-100 text-green-800' :
                      exercise.difficulty === 'intermediate' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {difficulties[exercise.difficulty]}
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-3 text-sm mb-3">
                    <div className="text-center p-2 bg-gray-50 rounded">
                      <div className="font-medium text-gray-900">{exercise.sets}</div>
                      <div className="text-xs text-gray-500">Series</div>
                    </div>
                    <div className="text-center p-2 bg-gray-50 rounded">
                      <div className="font-medium text-gray-900">{exercise.reps}</div>
                      <div className="text-xs text-gray-500">Reps</div>
                    </div>
                    <div className="text-center p-2 bg-gray-50 rounded">
                      <div className="font-medium text-gray-900">{exercise.rest}</div>
                      <div className="text-xs text-gray-500">Descanso</div>
                    </div>
                  </div>

                  {exercise.weight && (
                    <div className="mb-3">
                      <span className="text-sm text-gray-600">
                        <strong>Peso:</strong> {exercise.weight}
                      </span>
                    </div>
                  )}

                  {exercise.notes && (
                    <div className="mb-3">
                      <p className="text-sm text-gray-600">
                        <strong>Notas:</strong> {exercise.notes}
                      </p>
                    </div>
                  )}

                  <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                    <span className="text-xs text-gray-400">
                      Agregado el {new Date(exercise.createdDate).toLocaleDateString()}
                    </span>
                    <button className="flex items-center gap-1 px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">
                      <Plus className="h-3 w-3" />
                      Seleccionar
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200 bg-gray-50">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-600">
              {filteredExercises.length} ejercicio{filteredExercises.length !== 1 ? 's' : ''} encontrado{filteredExercises.length !== 1 ? 's' : ''}
            </p>
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExerciseLibraryModal;