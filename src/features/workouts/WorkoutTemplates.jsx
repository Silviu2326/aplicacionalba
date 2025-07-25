import React, { useState } from 'react';
import { X, Dumbbell, Clock, Target, Users, Star, Copy, Play } from 'lucide-react';

const WorkoutTemplates = ({ isOpen, onClose, onSelectTemplate }) => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const templates = [
    {
      id: 1,
      name: 'Fuerza Básica - Principiante',
      description: 'Rutina de fuerza fundamental para desarrollar masa muscular y técnica básica',
      category: 'strength',
      difficulty: 'beginner',
      duration: 45,
      rating: 4.8,
      uses: 234,
      targetMuscles: ['Pecho', 'Espalda', 'Piernas', 'Hombros'],
      equipment: ['Mancuernas', 'Barra', 'Máquinas'],
      exercises: [
        { name: 'Press de banca', sets: 3, reps: '8-10', rest: 90, muscleGroup: 'Pecho' },
        { name: 'Remo con barra', sets: 3, reps: '8-10', rest: 90, muscleGroup: 'Espalda' },
        { name: 'Sentadillas', sets: 3, reps: '10-12', rest: 120, muscleGroup: 'Piernas' },
        { name: 'Press militar', sets: 3, reps: '8-10', rest: 90, muscleGroup: 'Hombros' },
        { name: 'Peso muerto', sets: 3, reps: '6-8', rest: 120, muscleGroup: 'Espalda' },
        { name: 'Curl de bíceps', sets: 3, reps: '10-12', rest: 60, muscleGroup: 'Bíceps' }
      ]
    },
    {
      id: 2,
      name: 'HIIT Cardio Intenso',
      description: 'Entrenamiento de alta intensidad para quemar grasa y mejorar resistencia',
      category: 'cardio',
      difficulty: 'intermediate',
      duration: 30,
      rating: 4.9,
      uses: 189,
      targetMuscles: ['Core', 'Piernas', 'Glúteos'],
      equipment: ['Peso corporal', 'Kettlebells'],
      exercises: [
        { name: 'Burpees', sets: 4, reps: '30s', rest: 30, muscleGroup: 'Core' },
        { name: 'Mountain climbers', sets: 4, reps: '30s', rest: 30, muscleGroup: 'Core' },
        { name: 'Jump squats', sets: 4, reps: '30s', rest: 30, muscleGroup: 'Piernas' },
        { name: 'High knees', sets: 4, reps: '30s', rest: 30, muscleGroup: 'Piernas' },
        { name: 'Plank jacks', sets: 4, reps: '30s', rest: 30, muscleGroup: 'Core' },
        { name: 'Kettlebell swings', sets: 4, reps: '30s', rest: 30, muscleGroup: 'Glúteos' }
      ]
    },
    {
      id: 3,
      name: 'Flexibilidad y Movilidad',
      description: 'Rutina completa para mejorar flexibilidad y prevenir lesiones',
      category: 'flexibility',
      difficulty: 'beginner',
      duration: 25,
      rating: 4.7,
      uses: 156,
      targetMuscles: ['Espalda', 'Piernas', 'Hombros', 'Core'],
      equipment: ['Peso corporal', 'Bandas elásticas'],
      exercises: [
        { name: 'Estiramiento de isquiotibiales', sets: 2, reps: '30s', rest: 15, muscleGroup: 'Piernas' },
        { name: 'Gato-camello', sets: 2, reps: '10', rest: 15, muscleGroup: 'Espalda' },
        { name: 'Estiramiento de hombros', sets: 2, reps: '30s', rest: 15, muscleGroup: 'Hombros' },
        { name: 'Rotación de cadera', sets: 2, reps: '10', rest: 15, muscleGroup: 'Core' },
        { name: 'Estiramiento de cuádriceps', sets: 2, reps: '30s', rest: 15, muscleGroup: 'Piernas' },
        { name: 'Plancha lateral', sets: 2, reps: '20s', rest: 15, muscleGroup: 'Core' }
      ]
    },
    {
      id: 4,
      name: 'Fullbody Avanzado',
      description: 'Rutina completa de cuerpo entero para atletas experimentados',
      category: 'strength',
      difficulty: 'advanced',
      duration: 60,
      rating: 4.6,
      uses: 98,
      targetMuscles: ['Pecho', 'Espalda', 'Piernas', 'Hombros', 'Core'],
      equipment: ['Mancuernas', 'Barra', 'Kettlebells', 'TRX'],
      exercises: [
        { name: 'Peso muerto rumano', sets: 4, reps: '6-8', rest: 120, muscleGroup: 'Espalda' },
        { name: 'Press inclinado', sets: 4, reps: '8-10', rest: 90, muscleGroup: 'Pecho' },
        { name: 'Sentadilla frontal', sets: 4, reps: '8-10', rest: 120, muscleGroup: 'Piernas' },
        { name: 'Dominadas', sets: 4, reps: '6-10', rest: 90, muscleGroup: 'Espalda' },
        { name: 'Press Arnold', sets: 3, reps: '10-12', rest: 90, muscleGroup: 'Hombros' },
        { name: 'Turkish get-up', sets: 3, reps: '5', rest: 90, muscleGroup: 'Core' }
      ]
    },
    {
      id: 5,
      name: 'Funcional CrossFit',
      description: 'Entrenamiento funcional de alta intensidad estilo CrossFit',
      category: 'functional',
      difficulty: 'intermediate',
      duration: 40,
      rating: 4.8,
      uses: 145,
      targetMuscles: ['Core', 'Piernas', 'Hombros', 'Espalda'],
      equipment: ['Barra', 'Kettlebells', 'Peso corporal'],
      exercises: [
        { name: 'Thrusters', sets: 5, reps: '15', rest: 60, muscleGroup: 'Hombros' },
        { name: 'Box jumps', sets: 5, reps: '15', rest: 60, muscleGroup: 'Piernas' },
        { name: 'Pull-ups', sets: 5, reps: '10', rest: 60, muscleGroup: 'Espalda' },
        { name: 'Kettlebell clean', sets: 5, reps: '12', rest: 60, muscleGroup: 'Core' },
        { name: 'Burpee box jump', sets: 5, reps: '10', rest: 60, muscleGroup: 'Core' },
        { name: 'Wall balls', sets: 5, reps: '20', rest: 60, muscleGroup: 'Piernas' }
      ]
    },
    {
      id: 6,
      name: 'Cardio Principiante',
      description: 'Rutina cardiovascular suave para comenzar a entrenar',
      category: 'cardio',
      difficulty: 'beginner',
      duration: 20,
      rating: 4.5,
      uses: 267,
      targetMuscles: ['Piernas', 'Core'],
      equipment: ['Peso corporal'],
      exercises: [
        { name: 'Marcha en el lugar', sets: 3, reps: '2min', rest: 60, muscleGroup: 'Piernas' },
        { name: 'Sentadillas lentas', sets: 3, reps: '15', rest: 60, muscleGroup: 'Piernas' },
        { name: 'Elevación de rodillas', sets: 3, reps: '1min', rest: 60, muscleGroup: 'Core' },
        { name: 'Pasos laterales', sets: 3, reps: '1min', rest: 60, muscleGroup: 'Piernas' },
        { name: 'Plancha modificada', sets: 3, reps: '20s', rest: 60, muscleGroup: 'Core' }
      ]
    }
  ];

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

  const filteredTemplates = templates.filter(template => 
    selectedCategory === 'all' || template.category === selectedCategory
  );

  const handleSelectTemplate = (template) => {
    const workoutData = {
      id: Date.now(),
      name: template.name,
      description: template.description,
      category: template.category,
      difficulty: template.difficulty,
      duration: template.duration,
      targetMuscles: template.targetMuscles,
      equipment: template.equipment,
      exercises: template.exercises,
      status: 'draft',
      clients: 0,
      createdDate: new Date().toISOString().split('T')[0]
    };
    onSelectTemplate(workoutData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-2xl font-display font-bold text-gray-900">Plantillas de Rutinas</h2>
            <p className="text-gray-600 mt-1">Selecciona una plantilla para comenzar rápidamente</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X size={24} className="text-gray-500" />
          </button>
        </div>

        {/* Filtros */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex flex-wrap gap-2">
            {Object.entries(categories).map(([key, label]) => (
              <button
                key={key}
                onClick={() => setSelectedCategory(key)}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                  selectedCategory === key
                    ? 'bg-brand text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Templates Grid */}
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTemplates.map((template) => (
              <div key={template.id} className="border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all duration-300 hover:scale-105 group">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2 flex-wrap gap-y-1">
                      <span className={`px-2 py-1 text-xs rounded-full font-medium ${getCategoryColor(template.category)}`}>
                        {categories[template.category]}
                      </span>
                      <span className={`px-2 py-1 text-xs rounded-full font-medium ${getDifficultyColor(template.difficulty)}`}>
                        {difficulties[template.difficulty]}
                      </span>
                      <div className="flex items-center space-x-1">
                        <Star size={12} className="text-yellow-500 fill-current" />
                        <span className="text-xs text-gray-600">{template.rating}</span>
                      </div>
                    </div>
                    <h3 className="font-display font-bold text-gray-900 text-lg mb-1">{template.name}</h3>
                    <p className="text-sm text-gray-600 line-clamp-2">{template.description}</p>
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
                  <div className="flex items-center space-x-2">
                    <Clock size={12} className="text-brand" />
                    <span className="text-gray-600">{template.duration} min</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Target size={12} className="text-emerald-600" />
                    <span className="text-gray-600">{template.exercises.length} ejercicios</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Copy size={12} className="text-gray-500" />
                    <span className="text-gray-600">{template.uses} usos</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Users size={12} className="text-gray-500" />
                    <span className="text-gray-600">Popular</span>
                  </div>
                </div>

                {/* Target Muscles */}
                <div className="mb-4">
                  <p className="text-xs text-gray-500 mb-2 font-medium">Grupos musculares:</p>
                  <div className="flex flex-wrap gap-1">
                    {template.targetMuscles.slice(0, 3).map((muscle, index) => (
                      <span key={index} className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
                        {muscle}
                      </span>
                    ))}
                    {template.targetMuscles.length > 3 && (
                      <span className="text-xs text-gray-500">+{template.targetMuscles.length - 3} más</span>
                    )}
                  </div>
                </div>

                {/* Equipment */}
                <div className="mb-4">
                  <p className="text-xs text-gray-500 mb-2 font-medium">Equipamiento:</p>
                  <div className="flex flex-wrap gap-1">
                    {template.equipment.slice(0, 2).map((equipment, index) => (
                      <span key={index} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                        {equipment}
                      </span>
                    ))}
                    {template.equipment.length > 2 && (
                      <span className="text-xs text-gray-500">+{template.equipment.length - 2} más</span>
                    )}
                  </div>
                </div>

                {/* Exercises Preview */}
                <div className="mb-6">
                  <p className="text-xs text-gray-500 mb-2 font-medium">Ejercicios incluidos:</p>
                  <div className="space-y-1">
                    {template.exercises.slice(0, 3).map((exercise, index) => (
                      <div key={index} className="flex justify-between text-xs">
                        <span className="text-gray-700">{exercise.name}</span>
                        <span className="text-gray-500">{exercise.sets}x{exercise.reps}</span>
                      </div>
                    ))}
                    {template.exercises.length > 3 && (
                      <p className="text-xs text-gray-500">+{template.exercises.length - 3} ejercicios más</p>
                    )}
                  </div>
                </div>

                {/* Action Button */}
                <button
                  onClick={() => handleSelectTemplate(template)}
                  className="w-full bg-gradient-to-r from-brand to-brand-light text-white hover:from-brand-light hover:to-brand transition-all duration-300 py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  <Play size={16} className="inline mr-2" />
                  Usar Plantilla
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200 bg-gray-50">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-600">
              {filteredTemplates.length} plantilla{filteredTemplates.length !== 1 ? 's' : ''} disponible{filteredTemplates.length !== 1 ? 's' : ''}
            </p>
            <button
              onClick={onClose}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkoutTemplates;