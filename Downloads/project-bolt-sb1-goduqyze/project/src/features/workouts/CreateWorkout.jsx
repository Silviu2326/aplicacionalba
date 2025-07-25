import React, { useState } from 'react';
import { X, Plus, Trash2, Clock, Target, Dumbbell, Users, Play } from 'lucide-react';

const CreateWorkout = ({ isOpen, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: 'strength',
    difficulty: 'beginner',
    duration: 30,
    targetMuscles: [],
    equipment: [],
    exercises: [{
      id: 1,
      name: '',
      sets: 3,
      reps: '10-12',
      rest: 60,
      notes: '',
      muscleGroup: ''
    }]
  });

  const [errors, setErrors] = useState({});

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

  const muscleGroups = [
    'Pecho', 'Espalda', 'Hombros', 'Bíceps', 'Tríceps', 'Piernas', 'Glúteos', 'Core', 'Pantorrillas'
  ];

  const equipmentOptions = [
    'Mancuernas', 'Barra', 'Máquinas', 'Peso corporal', 'Bandas elásticas', 'Kettlebells', 'TRX', 'Cardio'
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleArrayChange = (field, value) => {
    setFormData(prev => {
      const currentArray = prev[field];
      const newArray = currentArray.includes(value)
        ? currentArray.filter(item => item !== value)
        : [...currentArray, value];
      return { ...prev, [field]: newArray };
    });
  };

  const handleExerciseChange = (index, field, value) => {
    setFormData(prev => ({
      ...prev,
      exercises: prev.exercises.map((exercise, i) => 
        i === index ? { ...exercise, [field]: value } : exercise
      )
    }));
  };

  const addExercise = () => {
    setFormData(prev => ({
      ...prev,
      exercises: [...prev.exercises, {
        id: Date.now(),
        name: '',
        sets: 3,
        reps: '10-12',
        rest: 60,
        notes: '',
        muscleGroup: ''
      }]
    }));
  };

  const removeExercise = (index) => {
    if (formData.exercises.length > 1) {
      setFormData(prev => ({
        ...prev,
        exercises: prev.exercises.filter((_, i) => i !== index)
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'El nombre es requerido';
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'La descripción es requerida';
    }
    
    if (formData.duration < 5 || formData.duration > 180) {
      newErrors.duration = 'La duración debe estar entre 5 y 180 minutos';
    }

    formData.exercises.forEach((exercise, index) => {
      if (!exercise.name.trim()) {
        newErrors[`exercise_${index}_name`] = 'El nombre del ejercicio es requerido';
      }
    });
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      const workoutData = {
        id: Date.now(),
        ...formData,
        exercises: formData.exercises.length,
        clients: 0,
        status: 'draft',
        createdDate: new Date().toISOString().split('T')[0]
      };
      
      onSave(workoutData);
      
      // Reset form
      setFormData({
        name: '',
        description: '',
        category: 'strength',
        difficulty: 'beginner',
        duration: 30,
        targetMuscles: [],
        equipment: [],
        exercises: [{
          id: 1,
          name: '',
          sets: 3,
          reps: '10-12',
          rest: 60,
          notes: '',
          muscleGroup: ''
        }]
      });
      setErrors({});
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-brand/10 rounded-lg">
              <Dumbbell size={24} className="text-brand" />
            </div>
            <div>
              <h2 className="text-2xl font-display font-bold text-gray-900">Nueva Rutina</h2>
              <p className="text-gray-600">Crea una rutina de entrenamiento personalizada</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X size={24} className="text-gray-500" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
          <div className="space-y-8">
            {/* Información Básica */}
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Target className="text-brand" size={20} />
                <h3 className="text-lg font-semibold text-gray-900">Información Básica</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nombre de la Rutina *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-brand/50 focus:border-brand transition-colors ${
                      errors.name ? 'border-red-300' : 'border-gray-300'
                    }`}
                    placeholder="Ej: Rutina Fuerza - Principiante"
                  />
                  {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Duración (minutos) *
                  </label>
                  <input
                    type="number"
                    name="duration"
                    value={formData.duration}
                    onChange={handleInputChange}
                    min="5"
                    max="180"
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-brand/50 focus:border-brand transition-colors ${
                      errors.duration ? 'border-red-300' : 'border-gray-300'
                    }`}
                  />
                  {errors.duration && <p className="text-red-500 text-sm mt-1">{errors.duration}</p>}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Categoría *
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand/50 focus:border-brand transition-colors"
                  >
                    {Object.entries(categories).map(([key, label]) => (
                      <option key={key} value={key}>{label}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Dificultad *
                  </label>
                  <select
                    name="difficulty"
                    value={formData.difficulty}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand/50 focus:border-brand transition-colors"
                  >
                    {Object.entries(difficulties).map(([key, label]) => (
                      <option key={key} value={key}>{label}</option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Descripción *
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={3}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-brand/50 focus:border-brand transition-colors resize-none ${
                    errors.description ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="Describe los objetivos y características de esta rutina..."
                />
                {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
              </div>
            </div>

            {/* Grupos Musculares */}
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Users className="text-brand" size={20} />
                <h3 className="text-lg font-semibold text-gray-900">Grupos Musculares</h3>
              </div>
              
              <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
                {muscleGroups.map((muscle) => (
                  <label key={muscle} className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.targetMuscles.includes(muscle)}
                      onChange={() => handleArrayChange('targetMuscles', muscle)}
                      className="rounded border-gray-300 text-brand focus:ring-brand/50"
                    />
                    <span className="text-sm text-gray-700">{muscle}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Equipamiento */}
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Dumbbell className="text-brand" size={20} />
                <h3 className="text-lg font-semibold text-gray-900">Equipamiento Necesario</h3>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {equipmentOptions.map((equipment) => (
                  <label key={equipment} className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.equipment.includes(equipment)}
                      onChange={() => handleArrayChange('equipment', equipment)}
                      className="rounded border-gray-300 text-brand focus:ring-brand/50"
                    />
                    <span className="text-sm text-gray-700">{equipment}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Ejercicios */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <Play className="text-brand" size={20} />
                  <h3 className="text-lg font-semibold text-gray-900">Ejercicios</h3>
                </div>
                <button
                  type="button"
                  onClick={addExercise}
                  className="flex items-center space-x-2 px-4 py-2 bg-brand text-white rounded-lg hover:bg-brand-dark transition-colors"
                >
                  <Plus size={16} />
                  <span>Agregar Ejercicio</span>
                </button>
              </div>
              
              <div className="space-y-6">
                {formData.exercises.map((exercise, index) => (
                  <div key={exercise.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-medium text-gray-900">Ejercicio {index + 1}</h4>
                      {formData.exercises.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeExercise(index)}
                          className="p-1 text-red-500 hover:bg-red-50 rounded transition-colors"
                        >
                          <Trash2 size={16} />
                        </button>
                      )}
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      <div className="md:col-span-2 lg:col-span-1">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Nombre del Ejercicio *
                        </label>
                        <input
                          type="text"
                          value={exercise.name}
                          onChange={(e) => handleExerciseChange(index, 'name', e.target.value)}
                          className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-brand/50 focus:border-brand transition-colors ${
                            errors[`exercise_${index}_name`] ? 'border-red-300' : 'border-gray-300'
                          }`}
                          placeholder="Ej: Press de banca"
                        />
                        {errors[`exercise_${index}_name`] && (
                          <p className="text-red-500 text-sm mt-1">{errors[`exercise_${index}_name`]}</p>
                        )}
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Series
                        </label>
                        <input
                          type="number"
                          value={exercise.sets}
                          onChange={(e) => handleExerciseChange(index, 'sets', parseInt(e.target.value))}
                          min="1"
                          max="10"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand/50 focus:border-brand transition-colors"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Repeticiones
                        </label>
                        <input
                          type="text"
                          value={exercise.reps}
                          onChange={(e) => handleExerciseChange(index, 'reps', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand/50 focus:border-brand transition-colors"
                          placeholder="Ej: 10-12 o 30s"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Descanso (seg)
                        </label>
                        <input
                          type="number"
                          value={exercise.rest}
                          onChange={(e) => handleExerciseChange(index, 'rest', parseInt(e.target.value))}
                          min="0"
                          max="300"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand/50 focus:border-brand transition-colors"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Grupo Muscular
                        </label>
                        <select
                          value={exercise.muscleGroup}
                          onChange={(e) => handleExerciseChange(index, 'muscleGroup', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand/50 focus:border-brand transition-colors"
                        >
                          <option value="">Seleccionar...</option>
                          {muscleGroups.map((muscle) => (
                            <option key={muscle} value={muscle}>{muscle}</option>
                          ))}
                        </select>
                      </div>
                      
                      <div className="md:col-span-2 lg:col-span-1">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Notas
                        </label>
                        <input
                          type="text"
                          value={exercise.notes}
                          onChange={(e) => handleExerciseChange(index, 'notes', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand/50 focus:border-brand transition-colors"
                          placeholder="Técnica, peso, etc."
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex justify-end space-x-4 mt-8 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-6 py-3 bg-gradient-to-r from-brand to-brand-light text-white rounded-lg hover:from-brand-light hover:to-brand transition-all duration-300 shadow-lg font-medium"
            >
              Crear Rutina
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateWorkout;