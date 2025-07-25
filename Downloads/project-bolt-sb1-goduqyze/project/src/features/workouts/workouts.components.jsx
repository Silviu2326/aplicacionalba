import React, { useState } from 'react';
import { Clock, Target, Users, Plus, Edit, Trash2, Play, Pause, CheckCircle } from 'lucide-react';
import Card from '../../components/Card';
import Button from '../../components/Button';

// Componente para tarjeta de rutina
export const WorkoutCard = ({ workout, onEdit, onDelete, onAssign, onStart }) => {
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

  const categories = {
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

  const statusLabels = {
    active: 'Activa',
    draft: 'Borrador',
    archived: 'Archivada'
  };

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-2 flex-wrap">
            <span className={`px-2 py-1 text-xs rounded-full ${getCategoryColor(workout.category)}`}>
              {categories[workout.category]}
            </span>
            <span className={`px-2 py-1 text-xs rounded-full ${getDifficultyColor(workout.difficulty)}`}>
              {difficulties[workout.difficulty]}
            </span>
            <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(workout.status)}`}>
              {statusLabels[workout.status]}
            </span>
          </div>
          <h3 className="font-semibold text-gray-900 mb-1">{workout.name}</h3>
          <p className="text-sm text-gray-600">{workout.description}</p>
        </div>
        <div className="flex space-x-1">
          <button 
            onClick={() => onEdit(workout)}
            className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <Edit size={16} className="text-gray-500" />
          </button>
          <button 
            onClick={() => onDelete(workout.id)}
            className="p-1 hover:bg-red-100 rounded-lg transition-colors"
          >
            <Trash2 size={16} className="text-red-500" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
        <div className="flex items-center space-x-2">
          <Clock size={14} className="text-blue-500" />
          <span className="text-gray-600">{workout.duration} min</span>
        </div>
        <div className="flex items-center space-x-2">
          <Target size={14} className="text-green-500" />
          <span className="text-gray-600">{workout.exercises} ejercicios</span>
        </div>
        <div className="flex items-center space-x-2">
          <Users size={14} className="text-purple-500" />
          <span className="text-gray-600">{workout.clients} clientes</span>
        </div>
        <div className="text-xs text-gray-500">
          {new Date(workout.createdDate).toLocaleDateString()}
        </div>
      </div>

      <div className="border-t border-gray-200 pt-4">
        <div className="flex space-x-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="flex-1"
            onClick={() => onEdit(workout)}
          >
            Editar
          </Button>
          <Button 
            size="sm" 
            className="flex-1"
            onClick={() => onAssign(workout)}
          >
            Asignar
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => onStart(workout)}
          >
            <Play size={14} />
          </Button>
        </div>
      </div>
    </Card>
  );
};

// Formulario para crear/editar rutina
export const WorkoutForm = ({ workout = null, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    name: workout?.name || '',
    description: workout?.description || '',
    category: workout?.category || 'strength',
    difficulty: workout?.difficulty || 'beginner',
    duration: workout?.duration || '',
    exercises: workout?.exercises || []
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
    <Card title={workout ? 'Editar Rutina' : 'Nueva Rutina'}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nombre de la rutina *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Ej: Rutina Fuerza - Principiante"
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
              <option value="strength">Fuerza</option>
              <option value="cardio">Cardio</option>
              <option value="flexibility">Flexibilidad</option>
              <option value="functional">Funcional</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Dificultad *
            </label>
            <select
              name="difficulty"
              value={formData.difficulty}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="beginner">Principiante</option>
              <option value="intermediate">Intermedio</option>
              <option value="advanced">Avanzado</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Duración (minutos) *
            </label>
            <input
              type="number"
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              required
              min="10"
              max="120"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Descripción
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={3}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Describe el objetivo y características de la rutina..."
          />
        </div>

        <div className="flex space-x-3 pt-4">
          <Button type="submit" className="flex-1">
            {workout ? 'Actualizar' : 'Crear'} Rutina
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

// Componente para mostrar ejercicios de la rutina
export const ExerciseList = ({ exercises = [], editable = false, onExerciseUpdate }) => {
  return (
    <Card title="Ejercicios de la Rutina">
      {exercises.length === 0 ? (
        <div className="text-center py-8">
          <Target size={48} className="mx-auto text-gray-400 mb-4" />
          <p className="text-gray-500 mb-4">No hay ejercicios agregados</p>
          {editable && (
            <Button>
              <Plus size={16} className="mr-2" />
              Agregar Ejercicio
            </Button>
          )}
        </div>
      ) : (
        <div className="space-y-4">
          {exercises.map((exercise, index) => (
            <div key={exercise.id || index} className="p-4 bg-gray-50 rounded-lg">
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-medium text-gray-900">{exercise.name}</h4>
                {editable && (
                  <div className="flex space-x-1">
                    <button className="p-1 hover:bg-gray-200 rounded">
                      <Edit size={14} className="text-gray-500" />
                    </button>
                    <button className="p-1 hover:bg-red-100 rounded">
                      <Trash2 size={14} className="text-red-500" />
                    </button>
                  </div>
                )}
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600 mb-2">
                <div>
                  <span className="font-medium">Series:</span> {exercise.sets}
                </div>
                <div>
                  <span className="font-medium">Reps:</span> {exercise.reps}
                </div>
                {exercise.weight && (
                  <div>
                    <span className="font-medium">Peso:</span> {exercise.weight}
                  </div>
                )}
                <div>
                  <span className="font-medium">Descanso:</span> {exercise.rest}
                </div>
              </div>
              
              {exercise.notes && (
                <p className="text-sm text-gray-600 mt-2">
                  <strong>Notas:</strong> {exercise.notes}
                </p>
              )}
            </div>
          ))}
          
          {editable && (
            <Button variant="outline" className="w-full">
              <Plus size={16} className="mr-2" />
              Agregar Ejercicio
            </Button>
          )}
        </div>
      )}
    </Card>
  );
};

// Componente para timer de entrenamiento
export const WorkoutTimer = ({ isRunning, currentExercise, onStart, onPause, onNext, onComplete }) => {
  const [time, setTime] = useState(0);

  React.useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        setTime(time => time + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <Card>
      <div className="text-center">
        <div className="text-4xl font-bold text-blue-600 mb-4">
          {formatTime(time)}
        </div>
        
        {currentExercise && (
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {currentExercise.name}
            </h3>
            <div className="text-sm text-gray-600">
              {currentExercise.sets} series × {currentExercise.reps} reps
            </div>
          </div>
        )}

        <div className="flex space-x-3 justify-center">
          {!isRunning ? (
            <Button onClick={onStart} className="px-8">
              <Play size={20} className="mr-2" />
              Iniciar
            </Button>
          ) : (
            <Button onClick={onPause} variant="outline" className="px-8">
              <Pause size={20} className="mr-2" />
              Pausar
            </Button>
          )}
          
          <Button onClick={onNext} variant="outline">
            Siguiente
          </Button>
          
          <Button onClick={onComplete} variant="success">
            <CheckCircle size={16} className="mr-2" />
            Completar
          </Button>
        </div>
      </div>
    </Card>
  );
};

// Componente para progreso de rutina del cliente
export const ClientWorkoutProgress = ({ clientId, workoutAssignment }) => {
  if (!workoutAssignment) {
    return (
      <Card title="Progreso del Entrenamiento">
        <p className="text-gray-500 text-center py-8">No hay rutinas asignadas</p>
      </Card>
    );
  }

  const progressPercentage = Math.round(
    (workoutAssignment.completedSessions / workoutAssignment.totalSessions) * 100
  );

  return (
    <Card title="Progreso del Entrenamiento">
      <div className="space-y-4">
        <div>
          <h4 className="font-medium text-gray-900 mb-2">{workoutAssignment.name}</h4>
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Sesiones: {workoutAssignment.completedSessions}/{workoutAssignment.totalSessions}</span>
            <span>{progressPercentage}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-gray-500">Fecha de inicio</p>
            <p className="font-medium">{new Date(workoutAssignment.startDate).toLocaleDateString()}</p>
          </div>
          <div>
            <p className="text-gray-500">Fecha de fin</p>
            <p className="font-medium">{new Date(workoutAssignment.endDate).toLocaleDateString()}</p>
          </div>
        </div>

        <div className="pt-4 border-t border-gray-200">
          <Button size="sm" className="w-full">
            Ver Detalles del Progreso
          </Button>
        </div>
      </div>
    </Card>
  );
};