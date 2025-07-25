import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Save, X, Plus, ChevronDown, ChevronUp, Calendar, Dumbbell, BookOpen, Star, GripVertical } from 'lucide-react';
import { getWorkoutById, updateWorkout, createWorkout } from './workouts.api';
import { addExerciseToLibrary } from './exerciseLibrary.api';
import ExerciseLibraryModal from './ExerciseLibraryModal';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import {
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

// Modal para copiar semana
const CopyWeekModal = ({ isOpen, onClose, onCopyWeek, currentWeekStart, dailyWorkouts }) => {
  const [sourceWeekStart, setSourceWeekStart] = useState('');
  const [targetWeekStart, setTargetWeekStart] = useState('');
  const [conflicts, setConflicts] = useState([]);
  const [overwriteConflicts, setOverwriteConflicts] = useState(false);

  useEffect(() => {
    if (currentWeekStart) {
      setTargetWeekStart(currentWeekStart);
    }
  }, [currentWeekStart]);

  useEffect(() => {
    if (sourceWeekStart && targetWeekStart) {
      const detectedConflicts = checkConflicts(sourceWeekStart, targetWeekStart);
      setConflicts(detectedConflicts);
    }
  }, [sourceWeekStart, targetWeekStart]);

  const formatDate = (date) => {
    return date.toISOString().split('T')[0];
  };

  const checkConflicts = (sourceStart, targetStart) => {
    const conflicts = [];
    const sourceDate = new Date(sourceStart);
    const targetDate = new Date(targetStart);
    
    const dayNames = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    
    for (let i = 0; i < 7; i++) {
      const targetDay = new Date(targetDate);
      targetDay.setDate(targetDate.getDate() + i);
      const targetDateKey = formatDate(targetDay);
      
      const existingExercises = dailyWorkouts[targetDateKey] || [];
      if (existingExercises.length > 0) {
        const dayName = dayNames[targetDay.getDay()];
        conflicts.push(`${dayName} ${targetDay.getDate()}/${targetDay.getMonth() + 1} tiene ${existingExercises.length} ejercicio(s)`);
      }
    }
    
    return conflicts;
  };

  const getSourceWeekInfo = () => {
    if (!sourceWeekStart) return null;
    
    const sourceDate = new Date(sourceWeekStart);
    let totalExercises = 0;
    let daysWithExercises = 0;
    
    for (let i = 0; i < 7; i++) {
      const day = new Date(sourceDate);
      day.setDate(sourceDate.getDate() + i);
      const dateKey = formatDate(day);
      const exercises = dailyWorkouts[dateKey] || [];
      
      if (exercises.length > 0) {
        totalExercises += exercises.length;
        daysWithExercises++;
      }
    }
    
    return { totalExercises, daysWithExercises };
  };

  const handleCopy = () => {
    if (sourceWeekStart && targetWeekStart) {
      const sourceInfo = getSourceWeekInfo();
      if (sourceInfo && sourceInfo.totalExercises === 0) {
        alert('La semana origen no tiene ejercicios para copiar.');
        return;
      }
      
      onCopyWeek(sourceWeekStart, targetWeekStart, overwriteConflicts);
      onClose();
    }
  };

  const sourceWeekInfo = getSourceWeekInfo();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h3 className="text-lg font-semibold mb-4">Copiar Semana</h3>
        
        <div className="space-y-4">
          <div>
             <label className="block text-sm font-medium text-gray-700 mb-1">
               Semana origen
             </label>
             <input
               type="date"
               value={sourceWeekStart}
               onChange={(e) => setSourceWeekStart(e.target.value)}
               className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
             />
             {sourceWeekInfo && sourceWeekInfo.totalExercises > 0 && (
               <div className="mt-2 p-2 bg-green-50 border border-green-200 rounded-md">
                 <p className="text-sm text-green-800">
                   📋 {sourceWeekInfo.totalExercises} ejercicios en {sourceWeekInfo.daysWithExercises} día(s)
                 </p>
               </div>
             )}
             {sourceWeekInfo && sourceWeekInfo.totalExercises === 0 && sourceWeekStart && (
               <div className="mt-2 p-2 bg-yellow-50 border border-yellow-200 rounded-md">
                 <p className="text-sm text-yellow-800">
                   ⚠️ Esta semana no tiene ejercicios
                 </p>
               </div>
             )}
           </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Semana destino
            </label>
            <input
              type="date"
              value={targetWeekStart}
              onChange={(e) => setTargetWeekStart(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          {conflicts.length > 0 && (
            <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-md">
              <p className="text-sm text-yellow-800 mb-2">Se detectaron conflictos:</p>
              <ul className="text-xs text-yellow-700 list-disc list-inside">
                {conflicts.map((conflict, index) => (
                  <li key={index}>{conflict}</li>
                ))}
              </ul>
              <label className="flex items-center mt-2">
                <input
                  type="checkbox"
                  checked={overwriteConflicts}
                  onChange={(e) => setOverwriteConflicts(e.target.checked)}
                  className="mr-2"
                />
                <span className="text-sm text-yellow-800">Sobrescribir ejercicios existentes</span>
              </label>
            </div>
          )}
        </div>
        
        <div className="flex justify-end space-x-3 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={handleCopy}
            disabled={!sourceWeekStart || !targetWeekStart}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
          >
            Copiar Semana
          </button>
        </div>
      </div>
    </div>
  );
};

// Componente para ejercicios arrastrables
const SortableExercise = ({ exercise, selectedDate, updateDailyExercise, removeDailyExercise, addExerciseToLibraryHandler, muscleGroups }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: exercise.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div ref={setNodeRef} style={style} className="border border-gray-200 rounded-lg p-4">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <button
            type="button"
            {...attributes}
            {...listeners}
            className="p-1 text-gray-400 hover:text-gray-600 cursor-grab active:cursor-grabbing transition-colors"
            title="Arrastrar para reordenar"
          >
            <GripVertical className="h-4 w-4" />
          </button>
          <h5 className="font-medium text-gray-900">Ejercicio</h5>
        </div>
        <div className="flex items-center gap-2">
          {exercise.name && (
            <button
              type="button"
              onClick={() => addExerciseToLibraryHandler(exercise)}
              className="p-1 text-yellow-500 hover:bg-yellow-50 rounded transition-colors"
              title="Añadir a biblioteca"
            >
              <Star className="h-4 w-4" />
            </button>
          )}
          <button
            type="button"
            onClick={() => removeDailyExercise(selectedDate, exercise.id)}
            className="text-red-600 hover:text-red-800 transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">
            Nombre del ejercicio
          </label>
          <input
            type="text"
            value={exercise.name}
            onChange={(e) => updateDailyExercise(selectedDate, exercise.id, 'name', e.target.value)}
            placeholder="Ej: Sentadillas"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">
            Grupo muscular
          </label>
          <select
            value={exercise.muscle_group}
            onChange={(e) => updateDailyExercise(selectedDate, exercise.id, 'muscle_group', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Seleccionar...</option>
            {muscleGroups.map(group => (
              <option key={group} value={group}>{group}</option>
            ))}
          </select>
        </div>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-3">
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">
            Series
          </label>
          <input
            type="number"
            value={exercise.sets}
            onChange={(e) => updateDailyExercise(selectedDate, exercise.id, 'sets', parseInt(e.target.value) || 0)}
            placeholder="3"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">
            Repeticiones
          </label>
          <input
            type="text"
            value={exercise.reps}
            onChange={(e) => updateDailyExercise(selectedDate, exercise.id, 'reps', e.target.value)}
            placeholder="10-12"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">
            Peso
          </label>
          <input
            type="text"
            value={exercise.weight}
            onChange={(e) => updateDailyExercise(selectedDate, exercise.id, 'weight', e.target.value)}
            placeholder="20kg"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">
            Descanso
          </label>
          <input
            type="text"
            value={exercise.rest}
            onChange={(e) => updateDailyExercise(selectedDate, exercise.id, 'rest', e.target.value)}
            placeholder="60s"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>
      
      <div>
        <label className="block text-xs font-medium text-gray-700 mb-1">
          Notas
        </label>
        <textarea
          value={exercise.notes}
          onChange={(e) => updateDailyExercise(selectedDate, exercise.id, 'notes', e.target.value)}
          placeholder="Instrucciones específicas para este ejercicio..."
          rows={2}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
    </div>
  );
};

const EditWorkoutPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = !!id;
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: 'strength',
    difficulty: 'beginner',
    duration: 45,
    targetMuscles: [],
    equipment: [],
    exercises: []
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [isBasicInfoCollapsed, setIsBasicInfoCollapsed] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [dailyWorkouts, setDailyWorkouts] = useState({});
  const [dailyGoals, setDailyGoals] = useState({});
  const [isLibraryModalOpen, setIsLibraryModalOpen] = useState(false);
  const [currentDateForLibrary, setCurrentDateForLibrary] = useState(null);
  const [isCopyWeekModalOpen, setIsCopyWeekModalOpen] = useState(false);
  const [currentWeekStart, setCurrentWeekStart] = useState(null);

  // Configuración de sensores para drag and drop
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // Cargar datos de la rutina si estamos editando
  useEffect(() => {
    if (isEditing) {
      setLoading(true);
      getWorkoutById(id)
        .then(workout => {
          if (workout) {
            setFormData({
              name: workout.name || '',
              description: workout.description || '',
              category: workout.category || 'strength',
              difficulty: workout.difficulty || 'beginner',
              duration: workout.duration || 45,
              targetMuscles: workout.targetMuscles || [],
              equipment: workout.equipment || [],
              exercises: workout.exercises || []
            });
          }
        })
        .catch(error => {
          console.error('Error loading workout:', error);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [id, isEditing]);

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
      [name]: name === 'duration' ? parseInt(value) || 0 : value
    }));
    
    // Limpiar error cuando el usuario empiece a escribir
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleArrayChange = (field, value) => {
    setFormData(prev => {
      const currentArray = prev[field] || [];
      const newArray = currentArray.includes(value)
        ? currentArray.filter(item => item !== value)
        : [...currentArray, value];
      
      return {
        ...prev,
        [field]: newArray
      };
    });
  };

  const addExercise = () => {
    const newExercise = {
      id: Date.now(),
      name: '',
      muscle_group: '',
      sets: 3,
      reps: '10-12',
      weight: '',
      rest: '60s',
      notes: ''
    };
    setFormData(prev => ({
      ...prev,
      exercises: [...prev.exercises, newExercise]
    }));
  };

  const updateExercise = (exerciseId, field, value) => {
    setFormData(prev => ({
      ...prev,
      exercises: prev.exercises.map(exercise =>
        exercise.id === exerciseId ? { ...exercise, [field]: value } : exercise
      )
    }));
  };

  const removeExercise = (exerciseId) => {
    setFormData(prev => ({
      ...prev,
      exercises: prev.exercises.filter(exercise => exercise.id !== exerciseId)
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'El nombre es requerido';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'La descripción es requerida';
    }

    if (formData.duration < 10 || formData.duration > 180) {
      newErrors.duration = 'La duración debe estar entre 10 y 180 minutos';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setSaving(true);
    try {
      if (isEditing) {
        await updateWorkout(id, formData);
      } else {
        await createWorkout(formData);
      }
      navigate('/workouts');
    } catch (error) {
      console.error('Error saving workout:', error);
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    navigate('/workouts');
  };

  // Funciones para el calendario
  const generateCalendar = () => {
    const today = new Date();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();
    const firstDay = new Date(currentYear, currentMonth, 1);
    const lastDay = new Date(currentYear, currentMonth + 1, 0);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());
    
    const days = [];
    for (let i = 0; i < 42; i++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);
      days.push(date);
    }
    return days;
  };

  const formatDate = (date) => {
    return date.toISOString().split('T')[0];
  };

  const handleDateClick = (date) => {
    const dateKey = formatDate(date);
    setSelectedDate(dateKey);
    
    // Inicializar ejercicios del día si no existen
    if (!dailyWorkouts[dateKey]) {
      setDailyWorkouts(prev => ({
        ...prev,
        [dateKey]: []
      }));
    }
    
    // Inicializar objetivos del día si no existen
    if (!dailyGoals[dateKey]) {
      setDailyGoals(prev => ({
        ...prev,
        [dateKey]: {
          duration: '',
          intensity: 'moderate',
          focus: '',
          notes: ''
        }
      }));
    }
  };

  const updateDailyGoals = (dateKey, field, value) => {
    setDailyGoals(prev => ({
      ...prev,
      [dateKey]: {
        ...prev[dateKey],
        [field]: value
      }
    }));
  };

  const addExerciseToDay = (dateKey) => {
    const newExercise = {
      id: Date.now(),
      name: '',
      muscle_group: '',
      sets: 3,
      reps: '10-12',
      weight: '',
      rest: '60s',
      notes: ''
    };
    setDailyWorkouts(prev => ({
      ...prev,
      [dateKey]: [...(prev[dateKey] || []), newExercise]
    }));
  };

  const addExerciseFromLibrary = (dateKey) => {
    setCurrentDateForLibrary(dateKey);
    setIsLibraryModalOpen(true);
  };

  const handleSelectExerciseFromLibrary = (exercise) => {
    if (currentDateForLibrary) {
      setDailyWorkouts(prev => ({
        ...prev,
        [currentDateForLibrary]: [...(prev[currentDateForLibrary] || []), exercise]
      }));
    }
    setCurrentDateForLibrary(null);
  };

  const addExerciseToLibraryHandler = async (exercise) => {
    try {
      await addExerciseToLibrary({
        name: exercise.name,
        muscle_group: exercise.muscle_group,
        equipment: 'Personalizado', // Se puede mejorar para detectar el equipamiento
        sets: exercise.sets,
        reps: exercise.reps,
        weight: exercise.weight,
        rest: exercise.rest,
        notes: exercise.notes,
        difficulty: 'intermediate', // Valor por defecto
        instructions: ''
      });
      // Mostrar notificación de éxito (se puede implementar un sistema de notificaciones)
      console.log('Ejercicio agregado a la biblioteca exitosamente');
    } catch (error) {
      console.error('Error al agregar ejercicio a la biblioteca:', error);
    }
  };

  // Función para manejar el final del drag and drop
  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      const exercises = dailyWorkouts[selectedDate] || [];
      const oldIndex = exercises.findIndex(exercise => exercise.id === active.id);
      const newIndex = exercises.findIndex(exercise => exercise.id === over.id);

      const newExercises = arrayMove(exercises, oldIndex, newIndex);
      
      setDailyWorkouts(prev => ({
        ...prev,
        [selectedDate]: newExercises
      }));
    }
  };

  const updateDailyExercise = (dateKey, exerciseId, field, value) => {
    setDailyWorkouts(prev => ({
      ...prev,
      [dateKey]: prev[dateKey].map(exercise =>
        exercise.id === exerciseId ? { ...exercise, [field]: value } : exercise
      )
    }));
  };

  const removeDailyExercise = (dateKey, exerciseId) => {
    setDailyWorkouts(prev => ({
      ...prev,
      [dateKey]: prev[dateKey].filter(exercise => exercise.id !== exerciseId)
    }));
  };

  // Función para obtener el inicio de la semana
  const getWeekStart = (date) => {
    const d = new Date(date);
    const day = d.getDay();
    const diff = d.getDate() - day;
    return new Date(d.setDate(diff));
  };

  // Función para copiar una semana completa
  const copyWeek = (sourceWeekStart, targetWeekStart, overwriteConflicts = false) => {
    const sourceStart = new Date(sourceWeekStart);
    const targetStart = new Date(targetWeekStart);
    
    // Copiar 7 días
    for (let i = 0; i < 7; i++) {
      const sourceDate = new Date(sourceStart);
      sourceDate.setDate(sourceStart.getDate() + i);
      const sourceDateKey = formatDate(sourceDate);
      
      const targetDate = new Date(targetStart);
      targetDate.setDate(targetStart.getDate() + i);
      const targetDateKey = formatDate(targetDate);
      
      // Copiar ejercicios
      const sourceExercises = dailyWorkouts[sourceDateKey] || [];
      if (sourceExercises.length > 0) {
        const existingExercises = dailyWorkouts[targetDateKey] || [];
        
        if (overwriteConflicts || existingExercises.length === 0) {
          // Crear nuevos IDs para los ejercicios copiados
          const copiedExercises = sourceExercises.map(exercise => ({
            ...exercise,
            id: Date.now() + Math.random()
          }));
          
          setDailyWorkouts(prev => ({
            ...prev,
            [targetDateKey]: copiedExercises
          }));
        }
      }
      
      // Copiar objetivos
      const sourceGoals = dailyGoals[sourceDateKey];
      if (sourceGoals) {
        setDailyGoals(prev => ({
          ...prev,
          [targetDateKey]: { ...sourceGoals }
        }));
      }
    }
  };

  // Función para abrir el modal de copiar semana
  const openCopyWeekModal = (date) => {
    const weekStart = getWeekStart(new Date(date));
    setCurrentWeekStart(formatDate(weekStart));
    setIsCopyWeekModalOpen(true);
  };

  const monthNames = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];

  const dayNames = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
  const today = new Date();
  const calendarDays = generateCalendar();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando rutina...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={handleCancel}
                className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
              >
                <ArrowLeft className="h-5 w-5 mr-2" />
                Volver
              </button>
              <h1 className="text-2xl font-bold text-gray-900">
                {isEditing ? 'Editar Rutina' : 'Nueva Rutina'}
              </h1>
            </div>
            <div className="flex space-x-3">
              <button
                type="button"
                onClick={handleCancel}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                <X className="h-4 w-4 mr-2 inline" />
                Cancelar
              </button>
              <button
                onClick={handleSubmit}
                disabled={saving}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors flex items-center"
              >
                <Save className="h-4 w-4 mr-2" />
                {saving ? 'Guardando...' : 'Guardar'}
              </button>
            </div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Información básica - Colapsable */}
          <div className="bg-white rounded-lg shadow">
            <div 
              className="p-6 cursor-pointer flex items-center justify-between"
              onClick={() => setIsBasicInfoCollapsed(!isBasicInfoCollapsed)}
            >
              <h2 className="text-lg font-semibold text-gray-900">Información Básica</h2>
              {isBasicInfoCollapsed ? (
                <ChevronDown className="h-5 w-5 text-gray-500" />
              ) : (
                <ChevronUp className="h-5 w-5 text-gray-500" />
              )}
            </div>
            
            {!isBasicInfoCollapsed && (
              <div className="px-6 pb-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Nombre de la rutina *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                        errors.name ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Ej: Rutina de Fuerza - Principiante"
                    />
                    {errors.name && (
                      <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Categoría
                    </label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
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
                      name="difficulty"
                      value={formData.difficulty}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      {Object.entries(difficulties).map(([key, label]) => (
                        <option key={key} value={key}>{label}</option>
                      ))}
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
                      onChange={handleInputChange}
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                        errors.duration ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="45"
                      min="10"
                      max="180"
                    />
                    {errors.duration && (
                      <p className="text-red-500 text-sm mt-1">{errors.duration}</p>
                    )}
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Descripción *
                    </label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      rows={3}
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                        errors.description ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Describe los objetivos y características de esta rutina..."
                    />
                    {errors.description && (
                      <p className="text-red-500 text-sm mt-1">{errors.description}</p>
                    )}
                  </div>

                  {/* Grupos musculares objetivo */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Grupos musculares objetivo
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {muscleGroups.map(muscle => (
                        <button
                          key={muscle}
                          type="button"
                          onClick={() => handleArrayChange('targetMuscles', muscle)}
                          className={`px-3 py-1 text-sm rounded-full border transition-colors ${
                            formData.targetMuscles.includes(muscle)
                              ? 'bg-blue-100 border-blue-300 text-blue-700'
                              : 'bg-gray-100 border-gray-300 text-gray-700 hover:bg-gray-200'
                          }`}
                        >
                          {muscle}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Equipamiento necesario */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Equipamiento necesario
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {equipmentOptions.map(equipment => (
                        <button
                          key={equipment}
                          type="button"
                          onClick={() => handleArrayChange('equipment', equipment)}
                          className={`px-3 py-1 text-sm rounded-full border transition-colors ${
                            formData.equipment.includes(equipment)
                              ? 'bg-green-100 border-green-300 text-green-700'
                              : 'bg-gray-100 border-gray-300 text-gray-700 hover:bg-gray-200'
                          }`}
                        >
                          {equipment}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Calendario */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-2 mb-6">
              <Calendar className="h-5 w-5 text-blue-600" />
              <h2 className="text-lg font-semibold text-gray-900">Planificación por Días</h2>
            </div>
            
            {/* Calendario */}
            <div className="mb-6">
              <div className="text-center mb-4">
                <h3 className="text-lg font-medium text-gray-900">
                  {monthNames[today.getMonth()]} {today.getFullYear()}
                </h3>
              </div>
              
              {/* Días de la semana */}
              <div className="grid grid-cols-7 gap-1 mb-2">
                {dayNames.map(day => (
                  <div key={day} className="p-2 text-center text-sm font-medium text-gray-500">
                    {day}
                  </div>
                ))}
              </div>
              
              {/* Días del mes */}
              <div className="grid grid-cols-7 gap-1">
                {calendarDays.map((date, index) => {
                  const dateKey = formatDate(date);
                  const isCurrentMonth = date.getMonth() === today.getMonth();
                  const isToday = formatDate(date) === formatDate(today);
                  const isSelected = selectedDate === dateKey;
                  const hasWorkout = dailyWorkouts[dateKey] && dailyWorkouts[dateKey].length > 0;
                  
                  return (
                    <button
                      key={index}
                      type="button"
                      onClick={() => handleDateClick(date)}
                      className={`
                        p-2 text-sm rounded-lg transition-colors relative
                        ${!isCurrentMonth ? 'text-gray-300' : 'text-gray-900'}
                        ${isToday ? 'bg-blue-100 text-blue-600 font-semibold' : ''}
                        ${isSelected ? 'bg-blue-600 text-white' : 'hover:bg-gray-100'}
                        ${hasWorkout ? 'ring-2 ring-green-400' : ''}
                      `}
                    >
                      {date.getDate()}
                      {hasWorkout && (
                        <div className="absolute bottom-0 right-0 w-2 h-2 bg-green-500 rounded-full"></div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
            
            {/* Editor de ejercicios del día seleccionado */}
            {selectedDate && (
              <div className="border-t pt-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-gray-900">
                    Entrenamiento para {new Date(selectedDate + 'T00:00:00').toLocaleDateString('es-ES', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </h3>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => openCopyWeekModal(selectedDate)}
                      className="flex items-center gap-2 px-3 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                    >
                      <Calendar className="h-4 w-4" />
                      Copiar Semana
                    </button>
                    <button
                      type="button"
                      onClick={() => addExerciseFromLibrary(selectedDate)}
                      className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                    >
                      <BookOpen className="h-4 w-4" />
                      Desde Biblioteca
                    </button>
                    <button
                      type="button"
                      onClick={() => addExerciseToDay(selectedDate)}
                      className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      <Plus className="h-4 w-4" />
                      Nuevo Ejercicio
                    </button>
                  </div>
                </div>
                
                {/* Objetivos del día */}
                <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <h4 className="text-md font-medium text-gray-900 mb-3">Objetivos del Día</h4>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        Duración (min)
                      </label>
                      <input
                        type="number"
                        value={dailyGoals[selectedDate]?.duration || ''}
                        onChange={(e) => updateDailyGoals(selectedDate, 'duration', e.target.value)}
                        placeholder="45"
                        className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        Intensidad
                      </label>
                      <select
                        value={dailyGoals[selectedDate]?.intensity || 'moderate'}
                        onChange={(e) => updateDailyGoals(selectedDate, 'intensity', e.target.value)}
                        className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="low">Baja</option>
                        <option value="moderate">Moderada</option>
                        <option value="high">Alta</option>
                        <option value="very_high">Muy Alta</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        Enfoque
                      </label>
                      <input
                        type="text"
                        value={dailyGoals[selectedDate]?.focus || ''}
                        onChange={(e) => updateDailyGoals(selectedDate, 'focus', e.target.value)}
                        placeholder="Ej: Tren superior"
                        className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        Notas
                      </label>
                      <input
                        type="text"
                        value={dailyGoals[selectedDate]?.notes || ''}
                        onChange={(e) => updateDailyGoals(selectedDate, 'notes', e.target.value)}
                        placeholder="Notas adicionales"
                        className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>

                {/* Lista de ejercicios del día */}
                <DndContext 
                  sensors={sensors}
                  collisionDetection={closestCenter}
                  onDragEnd={handleDragEnd}
                >
                  <SortableContext 
                    items={(dailyWorkouts[selectedDate] || []).map(exercise => exercise.id)}
                    strategy={verticalListSortingStrategy}
                  >
                    <div className="space-y-4">
                      {(dailyWorkouts[selectedDate] || []).map((exercise) => (
                        <SortableExercise
                          key={exercise.id}
                          exercise={exercise}
                          selectedDate={selectedDate}
                          updateDailyExercise={updateDailyExercise}
                          removeDailyExercise={removeDailyExercise}
                          addExerciseToLibraryHandler={addExerciseToLibraryHandler}
                          muscleGroups={muscleGroups}
                        />
                      ))}
                      
                      {(!dailyWorkouts[selectedDate] || dailyWorkouts[selectedDate].length === 0) && (
                        <div className="text-center py-8 text-gray-500">
                          <Dumbbell className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                          <p>No hay ejercicios planificados para este día</p>
                          <p className="text-sm">Haz clic en "Agregar Ejercicio" para comenzar</p>
                        </div>
                      )}
                    </div>
                  </SortableContext>
                </DndContext>
              </div>
            )}
          </div>
        </form>

        {/* Modal de biblioteca de ejercicios */}
        <ExerciseLibraryModal
          isOpen={isLibraryModalOpen}
          onClose={() => {
            setIsLibraryModalOpen(false);
            setCurrentDateForLibrary(null);
          }}
          onSelectExercise={handleSelectExerciseFromLibrary}
        />
        
        {/* Modal de copiar semana */}
         <CopyWeekModal
           isOpen={isCopyWeekModalOpen}
           onClose={() => setIsCopyWeekModalOpen(false)}
           onCopyWeek={copyWeek}
           currentWeekStart={currentWeekStart}
           dailyWorkouts={dailyWorkouts}
         />
      </div>
    </div>
  );
};

export default EditWorkoutPage;