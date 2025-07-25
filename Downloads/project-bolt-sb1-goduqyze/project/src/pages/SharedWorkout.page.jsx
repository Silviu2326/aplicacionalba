import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Clock, Target, User, Calendar, Dumbbell, AlertCircle, Eye, Share2 } from 'lucide-react';
import { getSharedWorkout } from '../api/workoutSharing.api';

const SharedWorkoutPage = () => {
  const { shareToken } = useParams();
  const [workout, setWorkout] = useState(null);
  const [shareConfig, setShareConfig] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadSharedWorkout = async () => {
      if (!shareToken) {
        setError('Token de compartir no válido');
        setLoading(false);
        return;
      }

      try {
        const response = await getSharedWorkout(shareToken);
        if (response.success) {
          setWorkout(response.data.workout);
          setShareConfig(response.data.shareConfig);
        }
      } catch (error) {
        setError(error.error || 'Error al cargar la rutina compartida');
      } finally {
        setLoading(false);
      }
    };

    loadSharedWorkout();
  }, [shareToken]);

  const getDifficultyColor = (difficulty) => {
    const colors = {
      beginner: 'bg-green-100 text-green-800',
      intermediate: 'bg-yellow-100 text-yellow-800',
      advanced: 'bg-red-100 text-red-800'
    };
    return colors[difficulty] || 'bg-gray-100 text-gray-800';
  };

  const getDifficultyText = (difficulty) => {
    const texts = {
      beginner: 'Principiante',
      intermediate: 'Intermedio',
      advanced: 'Avanzado'
    };
    return texts[difficulty] || difficulty;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando rutina compartida...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="w-8 h-8 text-red-600" />
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Error al cargar rutina</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
          >
            Intentar de nuevo
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Share2 className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Rutina Compartida</h1>
              <p className="text-sm text-gray-600">Vista de solo lectura</p>
            </div>
          </div>
          
          {/* Estadísticas de visualización */}
          <div className="flex items-center space-x-4 text-sm text-gray-500">
            <div className="flex items-center space-x-1">
              <Eye className="w-4 h-4" />
              <span>{shareConfig?.viewCount || 0} visualizaciones</span>
            </div>
            <div className="flex items-center space-x-1">
              <Calendar className="w-4 h-4" />
              <span>Compartido el {new Date(shareConfig?.createdAt).toLocaleDateString()}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Información principal de la rutina */}
        <div className="bg-white rounded-xl shadow-sm border p-6 mb-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">{workout.name}</h2>
              <p className="text-gray-600 mb-4">{workout.description}</p>
            </div>
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(workout.difficulty)}`}>
              {getDifficultyText(workout.difficulty)}
            </span>
          </div>

          {/* Métricas de la rutina */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
              <Clock className="w-5 h-5 text-blue-600" />
              <div>
                <p className="text-sm text-gray-600">Duración</p>
                <p className="font-semibold text-gray-900">{workout.duration} minutos</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
              <Dumbbell className="w-5 h-5 text-green-600" />
              <div>
                <p className="text-sm text-gray-600">Ejercicios</p>
                <p className="font-semibold text-gray-900">{workout.exercises?.length || 0}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
              <Target className="w-5 h-5 text-purple-600" />
              <div>
                <p className="text-sm text-gray-600">Músculos objetivo</p>
                <p className="font-semibold text-gray-900">{workout.targetMuscles?.length || 0}</p>
              </div>
            </div>
          </div>

          {/* Músculos objetivo */}
          {workout.targetMuscles && workout.targetMuscles.length > 0 && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Músculos objetivo</h3>
              <div className="flex flex-wrap gap-2">
                {workout.targetMuscles.map((muscle, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
                  >
                    {muscle}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Calentamiento */}
        {workout.warmup && workout.warmup.length > 0 && (
          <div className="bg-white rounded-xl shadow-sm border p-6 mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Calentamiento</h3>
            <div className="space-y-3">
              {workout.warmup.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                  <span className="font-medium text-gray-900">{item.exercise}</span>
                  <span className="text-sm text-orange-600 font-medium">{item.duration}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Ejercicios principales */}
        <div className="bg-white rounded-xl shadow-sm border p-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Ejercicios principales</h3>
          <div className="space-y-4">
            {workout.exercises?.map((exercise, index) => (
              <div key={exercise.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="font-semibold text-gray-900 text-lg">
                      {index + 1}. {exercise.name}
                    </h4>
                    <span className="inline-block px-2 py-1 bg-gray-100 text-gray-700 rounded text-sm mt-1">
                      {exercise.muscleGroup}
                    </span>
                  </div>
                  {exercise.equipment && (
                    <span className="text-sm text-gray-500 bg-gray-50 px-2 py-1 rounded">
                      {exercise.equipment}
                    </span>
                  )}
                </div>
                
                <div className="grid grid-cols-3 gap-4 mb-3">
                  <div className="text-center p-2 bg-blue-50 rounded">
                    <p className="text-sm text-blue-600 font-medium">Series</p>
                    <p className="text-lg font-bold text-blue-800">{exercise.sets}</p>
                  </div>
                  <div className="text-center p-2 bg-green-50 rounded">
                    <p className="text-sm text-green-600 font-medium">Repeticiones</p>
                    <p className="text-lg font-bold text-green-800">{exercise.reps}</p>
                  </div>
                  <div className="text-center p-2 bg-purple-50 rounded">
                    <p className="text-sm text-purple-600 font-medium">Descanso</p>
                    <p className="text-lg font-bold text-purple-800">{exercise.rest}</p>
                  </div>
                </div>
                
                {exercise.notes && (
                  <div className="bg-yellow-50 border-l-4 border-yellow-400 p-3 rounded">
                    <p className="text-sm text-yellow-800">
                      <strong>Nota:</strong> {exercise.notes}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Enfriamiento */}
        {workout.cooldown && workout.cooldown.length > 0 && (
          <div className="bg-white rounded-xl shadow-sm border p-6 mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Enfriamiento</h3>
            <div className="space-y-3">
              {workout.cooldown.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                  <span className="font-medium text-gray-900">{item.exercise}</span>
                  <span className="text-sm text-blue-600 font-medium">{item.duration}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Información del entrenador */}
        {workout.trainerInfo && shareConfig?.showTrainerInfo && (
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <User className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{workout.trainerInfo.name}</h3>
                <p className="text-sm text-gray-600">{workout.trainerInfo.title}</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600 mb-1">Experiencia</p>
                <p className="font-medium text-gray-900">{workout.trainerInfo.experience}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Especialidades</p>
                <div className="flex flex-wrap gap-1">
                  {workout.trainerInfo.specialties?.map((specialty, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs font-medium"
                    >
                      {specialty}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="bg-white border-t mt-12">
        <div className="max-w-4xl mx-auto px-4 py-6 text-center">
          <p className="text-sm text-gray-500">
            Esta rutina ha sido compartida de forma pública y es de solo lectura.
            <br />
            No puedes modificar el contenido original.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SharedWorkoutPage;