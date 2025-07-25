import React, { useState } from 'react';
import { X, Plus, Trash2, Save, Calendar } from 'lucide-react';

const CreateMicrocycleTemplate = ({ isOpen, onClose, onSave }) => {
  const [templateData, setTemplateData] = useState({
    name: '',
    description: '',
    category: 'strength',
    difficulty: 'beginner',
    targetMuscles: [],
    days: {
      monday: { name: '', duration: 45, focus: '', exercises: [] },
      tuesday: { name: '', duration: 45, focus: '', exercises: [] },
      wednesday: { name: '', duration: 45, focus: '', exercises: [] },
      thursday: { name: '', duration: 45, focus: '', exercises: [] },
      friday: { name: '', duration: 45, focus: '', exercises: [] }
    }
  });

  const [selectedDay, setSelectedDay] = useState('monday');
  const [errors, setErrors] = useState({});

  const categories = {
    strength: 'Fuerza',
    cardio: 'Cardio',
    powerlifting: 'Powerlifting',
    functional: 'Funcional',
    flexibility: 'Flexibilidad'
  };

  const difficulties = {
    beginner: 'Principiante',
    intermediate: 'Intermedio',
    advanced: 'Avanzado'
  };

  const dayNames = {
    monday: 'Lunes',
    tuesday: 'Martes',
    wednesday: 'Miércoles',
    thursday: 'Jueves',
    friday: 'Viernes'
  };

  const muscleGroups = [
    'Pecho', 'Espalda', 'Hombros', 'Bíceps', 'Tríceps', 'Core',
    'Piernas', 'Glúteos', 'Pantorrillas', 'Antebrazos', 'Cardio', 'Flexibilidad'
  ];

  const handleInputChange = (field, value) => {
    setTemplateData(prev => ({
      ...prev,
      [field]: value
    }));
    
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleDayChange = (day, field, value) => {
    setTemplateData(prev => ({
      ...prev,
      days: {
        ...prev.days,
        [day]: {
          ...prev.days[day],
          [field]: value
        }
      }
    }));
  };

  const addExercise = (day) => {
    const newExercise = {
      id: Date.now(),
      name: '',
      sets: 3,
      reps: '10-12',
      muscleGroup: 'Pecho'
    };
    
    setTemplateData(prev => ({
      ...prev,
      days: {
        ...prev.days,
        [day]: {
          ...prev.days[day],
          exercises: [...prev.days[day].exercises, newExercise]
        }
      }
    }));
  };

  const updateExercise = (day, exerciseId, field, value) => {
    setTemplateData(prev => ({
      ...prev,
      days: {
        ...prev.days,
        [day]: {
          ...prev.days[day],
          exercises: prev.days[day].exercises.map(exercise =>
            exercise.id === exerciseId ? { ...exercise, [field]: value } : exercise
          )
        }
      }
    }));
  };

  const removeExercise = (day, exerciseId) => {
    setTemplateData(prev => ({
      ...prev,
      days: {
        ...prev.days,
        [day]: {
          ...prev.days[day],
          exercises: prev.days[day].exercises.filter(exercise => exercise.id !== exerciseId)
        }
      }
    }));
  };

  const toggleMuscleGroup = (muscle) => {
    setTemplateData(prev => ({
      ...prev,
      targetMuscles: prev.targetMuscles.includes(muscle)
        ? prev.targetMuscles.filter(m => m !== muscle)
        : [...prev.targetMuscles, muscle]
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!templateData.name.trim()) {
      newErrors.name = 'El nombre es requerido';
    }
    
    if (!templateData.description.trim()) {
      newErrors.description = 'La descripción es requerida';
    }
    
    if (templateData.targetMuscles.length === 0) {
      newErrors.targetMuscles = 'Selecciona al menos un grupo muscular';
    }
    
    // Validar que al menos un día tenga ejercicios
    const hasExercises = Object.values(templateData.days).some(day => day.exercises.length > 0);
    if (!hasExercises) {
      newErrors.exercises = 'Agrega al menos un ejercicio a cualquier día';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (validateForm()) {
      const totalDuration = Object.values(templateData.days)
        .reduce((total, day) => total + (day.exercises.length > 0 ? day.duration : 0), 0);
      
      const newTemplate = {
        ...templateData,
        id: Date.now(),
        totalDuration,
        rating: 0,
        uses: 0,
        createdDate: new Date().toISOString().split('T')[0]
      };
      
      onSave(newTemplate);
      onClose();
    }
  };

  const handleClose = () => {
    setTemplateData({
      name: '',
      description: '',
      category: 'strength',
      difficulty: 'beginner',
      targetMuscles: [],
      days: {
        monday: { name: '', duration: 45, focus: '', exercises: [] },
        tuesday: { name: '', duration: 45, focus: '', exercises: [] },
        wednesday: { name: '', duration: 45, focus: '', exercises: [] },
        thursday: { name: '', duration: 45, focus: '', exercises: [] },
        friday: { name: '', duration: 45, focus: '', exercises: [] }
      }
    });
    setSelectedDay('monday');
    setErrors({});
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Crear Plantilla de Micro-ciclo</h2>
            <p className="text-gray-600 mt-1">Diseña una plantilla semanal personalizada</p>
          </div>
          <button
            onClick={handleClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X size={20} className="text-gray-500" />
          </button>
        </div>

        <div className="flex h-[calc(90vh-140px)]">
          {/* Left Panel - Template Info */}
          <div className="w-1/3 border-r border-gray-200 p-6 overflow-y-auto">
            <h3 className="text-lg font-semibold mb-4">Información General</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nombre de la plantilla *
                </label>
                <input
                  type="text"
                  value={templateData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                    errors.name ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Ej: Mi Rutina de Fuerza"
                />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Descripción *
                </label>
                <textarea
                  value={templateData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  rows={3}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                    errors.description ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Describe el objetivo y características de esta plantilla..."
                />
                {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Categoría
                  </label>
                  <select
                    value={templateData.category}
                    onChange={(e) => handleInputChange('category', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    {Object.entries(categories).map(([key, label]) => (
                      <option key={key} value={key}>{label}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Dificultad
                  </label>
                  <select
                    value={templateData.difficulty}
                    onChange={(e) => handleInputChange('difficulty', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    {Object.entries(difficulties).map(([key, label]) => (
                      <option key={key} value={key}>{label}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Grupos musculares objetivo *
                </label>
                <div className="flex flex-wrap gap-2">
                  {muscleGroups.map(muscle => (
                    <button
                      key={muscle}
                      type="button"
                      onClick={() => toggleMuscleGroup(muscle)}
                      className={`px-3 py-1 text-sm rounded-full border transition-colors ${
                        templateData.targetMuscles.includes(muscle)
                          ? 'bg-blue-100 border-blue-300 text-blue-700'
                          : 'bg-gray-100 border-gray-300 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {muscle}
                    </button>
                  ))}
                </div>
                {errors.targetMuscles && <p className="text-red-500 text-sm mt-1">{errors.targetMuscles}</p>}
              </div>
            </div>
          </div>

          {/* Right Panel - Day Planning */}
          <div className="flex-1 flex flex-col">
            {/* Day Tabs */}
            <div className="border-b border-gray-200 p-4">
              <div className="flex space-x-1">
                {Object.entries(dayNames).map(([dayKey, dayLabel]) => (
                  <button
                    key={dayKey}
                    onClick={() => setSelectedDay(dayKey)}
                    className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                      selectedDay === dayKey
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                    }`}
                  >
                    {dayLabel}
                  </button>
                ))}
              </div>
            </div>

            {/* Day Content */}
            <div className="flex-1 p-6 overflow-y-auto">
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-4">
                  {dayNames[selectedDay]} - Configuración
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Nombre del entrenamiento
                    </label>
                    <input
                      type="text"
                      value={templateData.days[selectedDay].name}
                      onChange={(e) => handleDayChange(selectedDay, 'name', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Ej: Pecho y Tríceps"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Duración (minutos)
                    </label>
                    <input
                      type="number"
                      value={templateData.days[selectedDay].duration}
                      onChange={(e) => handleDayChange(selectedDay, 'duration', parseInt(e.target.value) || 0)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      min="10"
                      max="180"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Enfoque
                    </label>
                    <input
                      type="text"
                      value={templateData.days[selectedDay].focus}
                      onChange={(e) => handleDayChange(selectedDay, 'focus', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Ej: Tren superior"
                    />
                  </div>
                </div>
              </div>

              {/* Exercises */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-md font-semibold">Ejercicios</h4>
                  <button
                    onClick={() => addExercise(selectedDay)}
                    className="flex items-center space-x-2 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <Plus size={16} />
                    <span>Agregar Ejercicio</span>
                  </button>
                </div>

                <div className="space-y-4">
                  {templateData.days[selectedDay].exercises.map((exercise, index) => (
                    <div key={exercise.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-sm font-medium text-gray-600">Ejercicio {index + 1}</span>
                        <button
                          onClick={() => removeExercise(selectedDay, exercise.id)}
                          className="text-red-600 hover:text-red-800 transition-colors"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                        <div className="md:col-span-2">
                          <label className="block text-xs font-medium text-gray-700 mb-1">
                            Nombre del ejercicio
                          </label>
                          <input
                            type="text"
                            value={exercise.name}
                            onChange={(e) => updateExercise(selectedDay, exercise.id, 'name', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Ej: Press de banca"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-xs font-medium text-gray-700 mb-1">
                            Series
                          </label>
                          <input
                            type="number"
                            value={exercise.sets}
                            onChange={(e) => updateExercise(selectedDay, exercise.id, 'sets', parseInt(e.target.value) || 1)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            min="1"
                            max="10"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-xs font-medium text-gray-700 mb-1">
                            Repeticiones
                          </label>
                          <input
                            type="text"
                            value={exercise.reps}
                            onChange={(e) => updateExercise(selectedDay, exercise.id, 'reps', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="8-12"
                          />
                        </div>
                      </div>
                      
                      <div className="mt-3">
                        <label className="block text-xs font-medium text-gray-700 mb-1">
                          Grupo muscular
                        </label>
                        <select
                          value={exercise.muscleGroup}
                          onChange={(e) => updateExercise(selectedDay, exercise.id, 'muscleGroup', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                          {muscleGroups.map(muscle => (
                            <option key={muscle} value={muscle}>{muscle}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  ))}
                  
                  {templateData.days[selectedDay].exercises.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                      <Calendar className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                      <p>No hay ejercicios para este día</p>
                      <p className="text-sm">Haz clic en "Agregar Ejercicio" para comenzar</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 p-6">
          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-600">
              {errors.exercises && <span className="text-red-500">{errors.exercises}</span>}
            </div>
            <div className="flex space-x-3">
              <button
                onClick={handleClose}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={handleSave}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Save size={16} />
                <span>Guardar Plantilla</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateMicrocycleTemplate;