import React, { useState, useEffect } from 'react';
import { X, Plus, Trash2, Dumbbell, Clock, Target, Users, Save, Calendar, ChevronDown, ChevronUp } from 'lucide-react';

const EditWorkout = ({ isOpen, onClose, onSave, workout }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: 'strength',
    difficulty: 'beginner',
    totalWeeks: 4,
    targetMuscles: [],
    equipment: [],
    weeks: []
  });

  const [errors, setErrors] = useState({});
  const [newMuscle, setNewMuscle] = useState('');
  const [newEquipment, setNewEquipment] = useState('');
  const [selectedWeek, setSelectedWeek] = useState(1);
  const [selectedDay, setSelectedDay] = useState(null);
  const [showRoutineModal, setShowRoutineModal] = useState(false);

  // Función para crear estructura de semanas por defecto
  const createDefaultWeeks = (totalWeeks) => {
    const weeks = [];
    const daysOfWeek = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
    
    for (let i = 1; i <= totalWeeks; i++) {
      const week = {
        id: `week-${i}`,
        weekNumber: i,
        name: `Semana ${i}`,
        description: '',
        days: daysOfWeek.map((dayName, dayIndex) => ({
          id: `week-${i}-day-${dayIndex + 1}`,
          dayNumber: dayIndex + 1,
          name: dayName,
          type: dayIndex < 5 ? 'training' : 'rest', // Lunes a Viernes entrenamiento, fin de semana descanso
          routines: []
        }))
      };
      weeks.push(week);
    }
    return weeks;
  };

  // Cargar datos del workout cuando se abre el modal
  useEffect(() => {
    if (isOpen) {
      if (workout) {
        setFormData({
          name: workout.name || '',
          description: workout.description || '',
          category: workout.category || 'strength',
          difficulty: workout.difficulty || 'beginner',
          totalWeeks: workout.totalWeeks || 4,
          targetMuscles: Array.isArray(workout.targetMuscles) ? workout.targetMuscles : [],
          equipment: Array.isArray(workout.equipment) ? workout.equipment : [],
          weeks: Array.isArray(workout.weeks) && workout.weeks.length > 0 ? workout.weeks : createDefaultWeeks(workout.totalWeeks || 4)
        });
      } else {
        // Nuevo workout
        setFormData({
          name: '',
          description: '',
          category: 'strength',
          difficulty: 'beginner',
          totalWeeks: 4,
          targetMuscles: [],
          equipment: [],
          weeks: createDefaultWeeks(4)
        });
      }
      setErrors({});
      setSelectedWeek(1);
      setSelectedDay(null);
      setShowRoutineModal(false);
    }
  }, [workout, isOpen]);

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
    'Pecho', 'Espalda', 'Hombros', 'Bíceps', 'Tríceps', 'Core',
    'Piernas', 'Glúteos', 'Pantorrillas', 'Antebrazos'
  ];

  const equipmentOptions = [
    'Peso corporal', 'Mancuernas', 'Barra', 'Kettlebells', 'Máquinas',
    'Bandas elásticas', 'TRX', 'Balón medicinal', 'Cuerda de saltar'
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const newValue = name === 'totalWeeks' ? parseInt(value) : value;
    
    setFormData(prev => {
      const updated = {
        ...prev,
        [name]: newValue
      };
      
      // Si cambió el número de semanas, regenerar la estructura
      if (name === 'totalWeeks' && newValue > 0) {
        updated.weeks = createDefaultWeeks(newValue);
        setSelectedWeek(1); // Resetear a la primera semana
      }
      
      return updated;
    });
    
    // Limpiar error cuando el usuario empiece a escribir
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // Función para seleccionar un día y mostrar/crear rutina
  const handleDayClick = (weekNumber, dayId) => {
    const week = formData.weeks.find(w => w.weekNumber === weekNumber);
    const day = week?.days.find(d => d.id === dayId);
    
    if (day && day.type === 'training') {
      setSelectedDay({ weekNumber, dayId, day });
      setShowRoutineModal(true);
    }
  };

  // Función para agregar rutina a un día específico
  const addRoutineToDay = (weekNumber, dayId, routineData) => {
    const newRoutine = {
      id: Date.now(),
      name: routineData.name,
      duration: routineData.duration,
      exercises: routineData.exercises || []
    };
    
    setFormData(prev => ({
      ...prev,
      weeks: prev.weeks.map(week =>
        week.weekNumber === weekNumber ? {
          ...week,
          days: week.days.map(day =>
            day.id === dayId ? {
              ...day,
              routines: [...day.routines, newRoutine]
            } : day
          )
        } : week
      )
    }));
  };

  // Función para obtener el día seleccionado actualmente
  const getCurrentDay = () => {
    if (!selectedDay) return null;
    const week = formData.weeks.find(w => w.weekNumber === selectedDay.weekNumber);
    return week?.days.find(d => d.id === selectedDay.dayId);
  };

  const addMuscle = () => {
    if (newMuscle.trim() && !formData.targetMuscles.includes(newMuscle.trim())) {
      setFormData(prev => ({
        ...prev,
        targetMuscles: [...prev.targetMuscles, newMuscle.trim()]
      }));
      setNewMuscle('');
    }
  };

  const removeMuscle = (muscle) => {
    setFormData(prev => ({
      ...prev,
      targetMuscles: prev.targetMuscles.filter(m => m !== muscle)
    }));
  };

  const addEquipment = () => {
    if (newEquipment.trim() && !formData.equipment.includes(newEquipment.trim())) {
      setFormData(prev => ({
        ...prev,
        equipment: [...prev.equipment, newEquipment.trim()]
      }));
      setNewEquipment('');
    }
  };

  const removeEquipment = (equipment) => {
    setFormData(prev => ({
      ...prev,
      equipment: prev.equipment.filter(e => e !== equipment)
    }));
  };

  // Funciones para manejar semanas
  const addWeek = () => {
    const newWeek = {
      id: Date.now(),
      weekNumber: formData.weeks.length + 1,
      name: `Semana ${formData.weeks.length + 1}`,
      description: '',
      days: []
    };
    setFormData(prev => ({
      ...prev,
      weeks: [...prev.weeks, newWeek]
    }));
  };

  const updateWeek = (weekId, field, value) => {
    setFormData(prev => ({
      ...prev,
      weeks: prev.weeks.map(week =>
        week.id === weekId ? { ...week, [field]: value } : week
      )
    }));
  };

  const removeWeek = (weekId) => {
    setFormData(prev => ({
      ...prev,
      weeks: prev.weeks.filter(week => week.id !== weekId)
    }));
  };

  // Funciones para manejar días
  const addDay = (weekId) => {
    const week = formData.weeks.find(w => w.id === weekId);
    const dayNumber = week ? week.days.length + 1 : 1;
    const newDay = {
      id: Date.now(),
      dayNumber,
      name: `Día ${dayNumber}`,
      type: 'training', // training, rest
      routines: []
    };
    
    setFormData(prev => ({
      ...prev,
      weeks: prev.weeks.map(week =>
        week.id === weekId ? { ...week, days: [...week.days, newDay] } : week
      )
    }));
  };

  const updateDay = (weekId, dayId, field, value) => {
    setFormData(prev => ({
      ...prev,
      weeks: prev.weeks.map(week =>
        week.id === weekId ? {
          ...week,
          days: week.days.map(day =>
            day.id === dayId ? { ...day, [field]: value } : day
          )
        } : week
      )
    }));
  };

  const removeDay = (weekId, dayId) => {
    setFormData(prev => ({
      ...prev,
      weeks: prev.weeks.map(week =>
        week.id === weekId ? {
          ...week,
          days: week.days.filter(day => day.id !== dayId)
        } : week
      )
    }));
  };

  // Funciones para manejar rutinas
  const addRoutine = (weekId, dayId) => {
    const newRoutine = {
      id: Date.now(),
      name: '',
      duration: 45,
      exercises: []
    };
    
    setFormData(prev => ({
      ...prev,
      weeks: prev.weeks.map(week =>
        week.id === weekId ? {
          ...week,
          days: week.days.map(day =>
            day.id === dayId ? {
              ...day,
              routines: [...day.routines, newRoutine]
            } : day
          )
        } : week
      )
    }));
  };

  const updateRoutine = (weekId, dayId, routineId, field, value) => {
    setFormData(prev => ({
      ...prev,
      weeks: prev.weeks.map(week =>
        week.id === weekId ? {
          ...week,
          days: week.days.map(day =>
            day.id === dayId ? {
              ...day,
              routines: day.routines.map(routine =>
                routine.id === routineId ? { ...routine, [field]: value } : routine
              )
            } : day
          )
        } : week
      )
    }));
  };

  const removeRoutine = (weekId, dayId, routineId) => {
    setFormData(prev => ({
      ...prev,
      weeks: prev.weeks.map(week =>
        week.id === weekId ? {
          ...week,
          days: week.days.map(day =>
            day.id === dayId ? {
              ...day,
              routines: day.routines.filter(routine => routine.id !== routineId)
            } : day
          )
        } : week
      )
    }));
  };

  // Funciones para expandir/contraer
  const toggleWeekExpansion = (weekId) => {
    setExpandedWeeks(prev => ({
      ...prev,
      [weekId]: !prev[weekId]
    }));
  };

  const toggleDayExpansion = (dayId) => {
    setExpandedDays(prev => ({
      ...prev,
      [dayId]: !prev[dayId]
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

    if (formData.totalWeeks < 1 || formData.totalWeeks > 52) {
      newErrors.totalWeeks = 'El número de semanas debe estar entre 1 y 52';
    }

    if (formData.targetMuscles.length === 0) {
      newErrors.targetMuscles = 'Debe seleccionar al menos un grupo muscular';
    }

    if (!Array.isArray(formData.weeks) || formData.weeks.length === 0) {
      newErrors.weeks = 'Debe agregar al menos una semana';
    }

    // Validar semanas
    if (Array.isArray(formData.weeks)) {
      formData.weeks.forEach((week, weekIndex) => {
        if (!week.name.trim()) {
          newErrors[`week_${weekIndex}_name`] = 'El nombre de la semana es requerido';
        }
        
        // Validar días de la semana
        if (week.days && week.days.length > 0) {
          week.days.forEach((day, dayIndex) => {
            if (!day.name.trim()) {
              newErrors[`week_${weekIndex}_day_${dayIndex}_name`] = 'El nombre del día es requerido';
            }
            
            // Validar rutinas del día
            if (day.type === 'training' && day.routines && day.routines.length > 0) {
              day.routines.forEach((routine, routineIndex) => {
                if (!routine.name.trim()) {
                  newErrors[`week_${weekIndex}_day_${dayIndex}_routine_${routineIndex}_name`] = 'El nombre de la rutina es requerido';
                }
                if (routine.duration < 5 || routine.duration > 180) {
                  newErrors[`week_${weekIndex}_day_${dayIndex}_routine_${routineIndex}_duration`] = 'La duración debe estar entre 5 y 180 minutos';
                }
              });
            }
          });
        }
      });
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      const updatedWorkout = {
        ...workout,
        ...formData,
        id: workout.id, // Mantener el ID original
        status: workout.status, // Mantener el estado original
        clients: workout.clients, // Mantener el número de clientes
        createdDate: workout.createdDate, // Mantener la fecha de creación
        updatedDate: new Date().toISOString().split('T')[0] // Agregar fecha de actualización
      };
      
      onSave(updatedWorkout);
      onClose();
    }
  };

  const handleClose = () => {
    setFormData({
      name: '',
      description: '',
      category: 'strength',
      difficulty: 'beginner',
      totalWeeks: 4,
      targetMuscles: [],
      equipment: [],
      weeks: createDefaultWeeks(4)
    });
    setErrors({});
    setSelectedWeek(1);
    setSelectedDay(null);
    setShowRoutineModal(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-2xl font-display font-bold text-gray-900">Editar Rutina</h2>
            <p className="text-gray-600 mt-1">Modifica los detalles de la rutina de entrenamiento</p>
          </div>
          <button
            onClick={handleClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X size={24} className="text-gray-500" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
          <div className="space-y-6">
            {/* Información básica */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Dumbbell size={16} className="inline mr-2" />
                  Nombre de la rutina *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                    errors.name ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Ej: Rutina de Fuerza - Principiante"
                />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Calendar size={16} className="inline mr-2" />
                  Número de semanas *
                </label>
                <input
                  type="number"
                  name="totalWeeks"
                  value={formData.totalWeeks}
                  onChange={handleInputChange}
                  min="1"
                  max="52"
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                    errors.totalWeeks ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.totalWeeks && <p className="text-red-500 text-sm mt-1">{errors.totalWeeks}</p>}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Descripción *
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={3}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                  errors.description ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Describe el objetivo y características de esta rutina..."
              />
              {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Categoría
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                >
                  {Object.entries(categories).map(([key, label]) => (
                    <option key={key} value={key}>{label}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Dificultad
                </label>
                <select
                  name="difficulty"
                  value={formData.difficulty}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                >
                  {Object.entries(difficulties).map(([key, label]) => (
                    <option key={key} value={key}>{label}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Grupos musculares */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Target size={16} className="inline mr-2" />
                Grupos musculares objetivo *
              </label>
              <div className="flex space-x-2 mb-3">
                <select
                  value={newMuscle}
                  onChange={(e) => setNewMuscle(e.target.value)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Seleccionar grupo muscular</option>
                  {muscleGroups.filter(muscle => !formData.targetMuscles.includes(muscle)).map(muscle => (
                    <option key={muscle} value={muscle}>{muscle}</option>
                  ))}
                </select>
                <button
                  type="button"
                  onClick={addMuscle}
                  disabled={!newMuscle}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <Plus size={16} />
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.targetMuscles.map((muscle) => (
                  <span
                    key={muscle}
                    className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm flex items-center space-x-2"
                  >
                    <span>{muscle}</span>
                    <button
                      type="button"
                      onClick={() => removeMuscle(muscle)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <X size={14} />
                    </button>
                  </span>
                ))}
              </div>
              {errors.targetMuscles && <p className="text-red-500 text-sm mt-1">{errors.targetMuscles}</p>}
            </div>

            {/* Equipamiento */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Equipamiento necesario
              </label>
              <div className="flex space-x-2 mb-3">
                <select
                  value={newEquipment}
                  onChange={(e) => setNewEquipment(e.target.value)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Seleccionar equipamiento</option>
                  {equipmentOptions.filter(equipment => !formData.equipment.includes(equipment)).map(equipment => (
                    <option key={equipment} value={equipment}>{equipment}</option>
                  ))}
                </select>
                <button
                  type="button"
                  onClick={addEquipment}
                  disabled={!newEquipment}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <Plus size={16} />
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.equipment.map((equipment) => (
                  <span
                    key={equipment}
                    className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm flex items-center space-x-2"
                  >
                    <span>{equipment}</span>
                    <button
                      type="button"
                      onClick={() => removeEquipment(equipment)}
                      className="text-gray-600 hover:text-gray-800"
                    >
                      <X size={14} />
                    </button>
                  </span>
                ))}
              </div>
            </div>

            {/* Selector de Semanas y Días */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  <Calendar size={16} className="inline mr-2" />
                  Planificación por Semanas *
                </label>
              </div>
              
              {/* Selector de Semana */}
              <div className="mb-6">
                <div className="flex items-center space-x-2 mb-3">
                  <span className="text-sm font-medium text-gray-600">Semana:</span>
                  <div className="flex space-x-1">
                    {Array.from({ length: formData.totalWeeks }, (_, i) => i + 1).map(weekNum => (
                      <button
                        key={weekNum}
                        type="button"
                        onClick={() => setSelectedWeek(weekNum)}
                        className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                          selectedWeek === weekNum
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {weekNum}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Vista de Días de la Semana Seleccionada */}
              <div className="bg-white border border-gray-200 rounded-lg p-4">
                {(() => {
                  const currentWeek = formData.weeks.find(w => w.weekNumber === selectedWeek);
                  if (!currentWeek) return null;
                  
                  return (
                    <>
                      <div className="mb-4">
                        <h3 className="text-lg font-medium text-gray-900 mb-2">{currentWeek.name}</h3>
                        <input
                          type="text"
                          value={currentWeek.description}
                          onChange={(e) => {
                            setFormData(prev => ({
                              ...prev,
                              weeks: prev.weeks.map(week =>
                                week.weekNumber === selectedWeek
                                  ? { ...week, description: e.target.value }
                                  : week
                              )
                            }));
                          }}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                          placeholder="Descripción de la semana (opcional)"
                        />
                      </div>
                      
                      {/* Grid de Días */}
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-7 gap-3">
                        {currentWeek.days.map((day) => (
                          <div
                            key={day.id}
                            className={`border rounded-lg p-3 cursor-pointer transition-all hover:shadow-md ${
                              day.type === 'training'
                                ? 'border-green-200 bg-green-50 hover:bg-green-100'
                                : 'border-gray-200 bg-gray-50 hover:bg-gray-100'
                            }`}
                            onClick={() => handleDayClick(selectedWeek, day.id)}
                          >
                            <div className="text-center">
                              <h4 className="font-medium text-gray-900 mb-1">{day.name}</h4>
                              <span className={`inline-block px-2 py-1 text-xs rounded-full ${
                                day.type === 'training'
                                  ? 'bg-green-100 text-green-800'
                                  : 'bg-gray-100 text-gray-600'
                              }`}>
                                {day.type === 'training' ? 'Entrenamiento' : 'Descanso'}
                              </span>
                              
                              {day.type === 'training' && (
                                <div className="mt-2">
                                  <div className="text-xs text-gray-600">
                                    {day.routines.length} rutina{day.routines.length !== 1 ? 's' : ''}
                                  </div>
                                  {day.routines.length > 0 && (
                                    <div className="mt-1 space-y-1">
                                      {day.routines.slice(0, 2).map((routine, index) => (
                                        <div key={routine.id} className="text-xs text-gray-700 truncate">
                                          • {routine.name}
                                        </div>
                                      ))}
                                      {day.routines.length > 2 && (
                                        <div className="text-xs text-gray-500">
                                          +{day.routines.length - 2} más
                                        </div>
                                      )}
                                    </div>
                                  )}
                                </div>
                              )}
                              
                              {day.type === 'training' && day.routines.length === 0 && (
                                <div className="mt-2 text-xs text-gray-500">
                                  Clic para agregar rutina
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </>
                  );
                })()}
              </div>
              {errors.weeks && <p className="text-red-500 text-sm mt-1">{errors.weeks}</p>}
            </div>
          </div>
        </form>

        {/* Footer */}
        <div className="flex items-center justify-end space-x-4 p-6 border-t border-gray-200 bg-gray-50">
          <button
            type="button"
            onClick={handleClose}
            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={handleSubmit}
            className="px-6 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center space-x-2"
          >
            <Save size={16} />
            <span>Guardar Cambios</span>
          </button>
        </div>
      </div>
      
      {/* Modal para Rutinas */}
      {showRoutineModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  Rutinas para {(() => {
                    const currentWeek = formData.weeks.find(w => w.weekNumber === selectedWeek);
                    const currentDay = currentWeek?.days.find(d => d.id === selectedDay);
                    return currentDay?.name || 'Día';
                  })()}
                </h3>
                <button
                  type="button"
                  onClick={() => setShowRoutineModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X size={24} />
                </button>
              </div>
              
              {(() => {
                const currentWeek = formData.weeks.find(w => w.weekNumber === selectedWeek);
                const currentDay = currentWeek?.days.find(d => d.id === selectedDay);
                
                if (!currentDay || currentDay.type !== 'training') {
                  return (
                    <div className="text-center py-8 text-gray-500">
                      Este día está configurado como día de descanso.
                    </div>
                  );
                }
                
                return (
                  <div className="space-y-4">
                    {/* Lista de rutinas existentes */}
                    {currentDay.routines.map((routine, index) => (
                      <div key={routine.id} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="font-medium text-gray-900">Rutina {index + 1}</h4>
                          <button
                            type="button"
                            onClick={() => {
                              setFormData(prev => ({
                                ...prev,
                                weeks: prev.weeks.map(week =>
                                  week.weekNumber === selectedWeek
                                    ? {
                                        ...week,
                                        days: week.days.map(day =>
                                          day.id === selectedDay
                                            ? {
                                                ...day,
                                                routines: day.routines.filter(r => r.id !== routine.id)
                                              }
                                            : day
                                        )
                                      }
                                    : week
                                )
                              }));
                            }}
                            className="text-red-600 hover:text-red-800 transition-colors"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Nombre de la rutina *
                            </label>
                            <input
                              type="text"
                              value={routine.name}
                              onChange={(e) => {
                                setFormData(prev => ({
                                  ...prev,
                                  weeks: prev.weeks.map(week =>
                                    week.weekNumber === selectedWeek
                                      ? {
                                          ...week,
                                          days: week.days.map(day =>
                                            day.id === selectedDay
                                              ? {
                                                  ...day,
                                                  routines: day.routines.map(r =>
                                                    r.id === routine.id
                                                      ? { ...r, name: e.target.value }
                                                      : r
                                                  )
                                                }
                                              : day
                                          )
                                        }
                                      : week
                                  )
                                }));
                              }}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                              placeholder="Ej: Rutina de Pecho y Tríceps"
                            />
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Duración (minutos) *
                            </label>
                            <input
                              type="number"
                              value={routine.duration}
                              onChange={(e) => {
                                setFormData(prev => ({
                                  ...prev,
                                  weeks: prev.weeks.map(week =>
                                    week.weekNumber === selectedWeek
                                      ? {
                                          ...week,
                                          days: week.days.map(day =>
                                            day.id === selectedDay
                                              ? {
                                                  ...day,
                                                  routines: day.routines.map(r =>
                                                    r.id === routine.id
                                                      ? { ...r, duration: parseInt(e.target.value) || 0 }
                                                      : r
                                                  )
                                                }
                                              : day
                                          )
                                        }
                                      : week
                                  )
                                }));
                              }}
                              min="5"
                              max="180"
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                            />
                          </div>
                        </div>
                        
                        <div className="mt-3">
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Descripción
                          </label>
                          <textarea
                            value={routine.description || ''}
                            onChange={(e) => {
                              setFormData(prev => ({
                                ...prev,
                                weeks: prev.weeks.map(week =>
                                  week.weekNumber === selectedWeek
                                    ? {
                                        ...week,
                                        days: week.days.map(day =>
                                          day.id === selectedDay
                                            ? {
                                                ...day,
                                                routines: day.routines.map(r =>
                                                  r.id === routine.id
                                                    ? { ...r, description: e.target.value }
                                                    : r
                                                )
                                              }
                                            : day
                                        )
                                      }
                                    : week
                                )
                              }));
                            }}
                            rows={2}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                            placeholder="Descripción de la rutina (opcional)"
                          />
                        </div>
                      </div>
                    ))}
                    
                    {/* Botón para agregar nueva rutina */}
                    <button
                      type="button"
                      onClick={() => addRoutineToDay(selectedWeek, selectedDay)}
                      className="w-full py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-blue-500 hover:text-blue-600 transition-colors flex items-center justify-center space-x-2"
                    >
                      <Plus size={20} />
                      <span>Agregar Nueva Rutina</span>
                    </button>
                    
                    {currentDay.routines.length === 0 && (
                      <div className="text-center py-8 text-gray-500">
                        No hay rutinas para este día. Haz clic en "Agregar Nueva Rutina" para comenzar.
                      </div>
                    )}
                  </div>
                );
              })()}
              
              <div className="flex justify-end mt-6">
                <button
                  type="button"
                  onClick={() => setShowRoutineModal(false)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditWorkout;