import React, { useState } from 'react';
import { X, Apple, Target, Clock, Users, Save, Plus, Minus } from 'lucide-react';

const CreateDiet = ({ isOpen, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: 'weight_loss',
    calories: '',
    duration: '',
    protein: '',
    carbs: '',
    fats: '',
    fiber: '',
    notes: '',
    meals: [
      { name: 'Desayuno', time: '08:00', foods: [''] },
      { name: 'Almuerzo', time: '13:00', foods: [''] },
      { name: 'Cena', time: '20:00', foods: [''] }
    ]
  });

  const [errors, setErrors] = useState({});

  const categories = {
    weight_loss: 'Pérdida de peso',
    muscle_gain: 'Ganancia muscular',
    maintenance: 'Mantenimiento',
    special: 'Dietas especiales'
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Limpiar error cuando el usuario empiece a escribir
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleMealChange = (mealIndex, field, value) => {
    setFormData(prev => ({
      ...prev,
      meals: prev.meals.map((meal, index) => 
        index === mealIndex ? { ...meal, [field]: value } : meal
      )
    }));
  };

  const handleFoodChange = (mealIndex, foodIndex, value) => {
    setFormData(prev => ({
      ...prev,
      meals: prev.meals.map((meal, index) => 
        index === mealIndex ? {
          ...meal,
          foods: meal.foods.map((food, fIndex) => 
            fIndex === foodIndex ? value : food
          )
        } : meal
      )
    }));
  };

  const addFood = (mealIndex) => {
    setFormData(prev => ({
      ...prev,
      meals: prev.meals.map((meal, index) => 
        index === mealIndex ? {
          ...meal,
          foods: [...meal.foods, '']
        } : meal
      )
    }));
  };

  const removeFood = (mealIndex, foodIndex) => {
    setFormData(prev => ({
      ...prev,
      meals: prev.meals.map((meal, index) => 
        index === mealIndex ? {
          ...meal,
          foods: meal.foods.filter((_, fIndex) => fIndex !== foodIndex)
        } : meal
      )
    }));
  };

  const addMeal = () => {
    setFormData(prev => ({
      ...prev,
      meals: [...prev.meals, { name: '', time: '', foods: [''] }]
    }));
  };

  const removeMeal = (mealIndex) => {
    if (formData.meals.length > 1) {
      setFormData(prev => ({
        ...prev,
        meals: prev.meals.filter((_, index) => index !== mealIndex)
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'El nombre es obligatorio';
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'La descripción es obligatoria';
    }
    
    if (!formData.calories || formData.calories <= 0) {
      newErrors.calories = 'Las calorías deben ser un número positivo';
    }
    
    if (!formData.duration.trim()) {
      newErrors.duration = 'La duración es obligatoria';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      const newDiet = {
        id: Date.now(),
        ...formData,
        calories: parseInt(formData.calories),
        protein: formData.protein ? parseInt(formData.protein) : 0,
        carbs: formData.carbs ? parseInt(formData.carbs) : 0,
        fats: formData.fats ? parseInt(formData.fats) : 0,
        fiber: formData.fiber ? parseInt(formData.fiber) : 0,
        status: 'draft',
        clients: 0,
        createdDate: new Date().toISOString().split('T')[0]
      };
      onSave(newDiet);
      onClose();
      // Resetear formulario
      setFormData({
        name: '',
        description: '',
        category: 'weight_loss',
        calories: '',
        duration: '',
        protein: '',
        carbs: '',
        fats: '',
        fiber: '',
        notes: '',
        meals: [
          { name: 'Desayuno', time: '08:00', foods: [''] },
          { name: 'Almuerzo', time: '13:00', foods: [''] },
          { name: 'Cena', time: '20:00', foods: [''] }
        ]
      });
      setErrors({});
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto animate-glass-pop">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-neutral-200">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-brand/10 backdrop-blur-sm border border-white/20 rounded-xl">
              <Apple size={24} className="text-brand" />
            </div>
            <div>
              <h2 className="text-2xl font-display font-bold text-neutral-900">Nueva Dieta</h2>
              <p className="text-neutral-600">Crea un plan nutricional personalizado</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-neutral-100 rounded-xl transition-all duration-300"
          >
            <X size={20} className="text-neutral-600" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Información Básica */}
          <div className="space-y-4">
            <h3 className="text-lg font-display font-semibold text-neutral-900 flex items-center space-x-2">
              <Target size={18} className="text-brand" />
              <span>Información Básica</span>
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Nombre del Plan *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full bg-neutral-50 border border-neutral-200 rounded-xl px-4 py-3 text-neutral-800 placeholder-neutral-500 focus:ring-2 focus:ring-brand/50 focus:border-brand focus:outline-none transition-all duration-300 ${
                    errors.name ? 'ring-2 ring-red-500 border-red-500' : ''
                  }`}
                  placeholder="Ej: Plan Pérdida de Peso - Avanzado"
                />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Descripción *
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={3}
                  className={`w-full bg-neutral-50 border border-neutral-200 rounded-xl px-4 py-3 text-neutral-800 placeholder-neutral-500 focus:ring-2 focus:ring-brand/50 focus:border-brand focus:outline-none transition-all duration-300 resize-none ${
                    errors.description ? 'ring-2 ring-red-500 border-red-500' : ''
                  }`}
                  placeholder="Describe el objetivo y características principales de esta dieta"
                />
                {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Categoría
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-4 py-3 text-neutral-800 focus:ring-2 focus:ring-brand/50 focus:border-brand focus:outline-none transition-all duration-300"
                >
                  {Object.entries(categories).map(([key, label]) => (
                    <option key={key} value={key}>{label}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Duración *
                </label>
                <input
                  type="text"
                  name="duration"
                  value={formData.duration}
                  onChange={handleChange}
                  className={`w-full bg-neutral-50 border border-neutral-200 rounded-xl px-4 py-3 text-neutral-800 placeholder-neutral-500 focus:ring-2 focus:ring-brand/50 focus:border-brand focus:outline-none transition-all duration-300 ${
                    errors.duration ? 'ring-2 ring-red-500 border-red-500' : ''
                  }`}
                  placeholder="Ej: 8 semanas, 3 meses"
                />
                {errors.duration && <p className="text-red-500 text-sm mt-1">{errors.duration}</p>}
              </div>
            </div>
          </div>

          {/* Información Nutricional */}
          <div className="space-y-4">
            <h3 className="text-lg font-display font-semibold text-neutral-900 flex items-center space-x-2">
              <Apple size={18} className="text-brand" />
              <span>Información Nutricional</span>
            </h3>
            
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Calorías/día *
                </label>
                <input
                  type="number"
                  name="calories"
                  value={formData.calories}
                  onChange={handleChange}
                  className={`w-full bg-neutral-50 border border-neutral-200 rounded-xl px-4 py-3 text-neutral-800 placeholder-neutral-500 focus:ring-2 focus:ring-brand/50 focus:border-brand focus:outline-none transition-all duration-300 ${
                    errors.calories ? 'ring-2 ring-red-500 border-red-500' : ''
                  }`}
                  placeholder="1500"
                />
                {errors.calories && <p className="text-red-500 text-sm mt-1">{errors.calories}</p>}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Proteínas (g)
                </label>
                <input
                  type="number"
                  name="protein"
                  value={formData.protein}
                  onChange={handleChange}
                  className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-4 py-3 text-neutral-800 placeholder-neutral-500 focus:ring-2 focus:ring-brand/50 focus:border-brand focus:outline-none transition-all duration-300"
                  placeholder="120"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Carbohidratos (g)
                </label>
                <input
                  type="number"
                  name="carbs"
                  value={formData.carbs}
                  onChange={handleChange}
                  className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-4 py-3 text-neutral-800 placeholder-neutral-500 focus:ring-2 focus:ring-brand/50 focus:border-brand focus:outline-none transition-all duration-300"
                  placeholder="150"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Grasas (g)
                </label>
                <input
                  type="number"
                  name="fats"
                  value={formData.fats}
                  onChange={handleChange}
                  className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-4 py-3 text-neutral-800 placeholder-neutral-500 focus:ring-2 focus:ring-brand/50 focus:border-brand focus:outline-none transition-all duration-300"
                  placeholder="50"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Fibra (g)
                </label>
                <input
                  type="number"
                  name="fiber"
                  value={formData.fiber}
                  onChange={handleChange}
                  className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-4 py-3 text-neutral-800 placeholder-neutral-500 focus:ring-2 focus:ring-brand/50 focus:border-brand focus:outline-none transition-all duration-300"
                  placeholder="25"
                />
              </div>
            </div>
          </div>

          {/* Comidas */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-display font-semibold text-neutral-900 flex items-center space-x-2">
                <Clock size={18} className="text-brand" />
                <span>Plan de Comidas</span>
              </h3>
              <button
                type="button"
                onClick={addMeal}
                className="bg-brand/10 hover:bg-brand/20 text-brand px-3 py-2 rounded-lg transition-all duration-300 flex items-center space-x-1"
              >
                <Plus size={16} />
                <span>Agregar Comida</span>
              </button>
            </div>
            
            <div className="space-y-4">
              {formData.meals.map((meal, mealIndex) => (
                <div key={mealIndex} className="bg-neutral-50 border border-neutral-200 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-4 flex-1">
                      <input
                        type="text"
                        value={meal.name}
                        onChange={(e) => handleMealChange(mealIndex, 'name', e.target.value)}
                        className="bg-white border border-neutral-200 rounded-lg px-3 py-2 text-neutral-800 placeholder-neutral-500 focus:ring-2 focus:ring-brand/50 focus:border-brand focus:outline-none transition-all duration-300"
                        placeholder="Nombre de la comida"
                      />
                      <input
                        type="time"
                        value={meal.time}
                        onChange={(e) => handleMealChange(mealIndex, 'time', e.target.value)}
                        className="bg-white border border-neutral-200 rounded-lg px-3 py-2 text-neutral-800 focus:ring-2 focus:ring-brand/50 focus:border-brand focus:outline-none transition-all duration-300"
                      />
                    </div>
                    {formData.meals.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeMeal(mealIndex)}
                        className="text-red-500 hover:text-red-700 p-1 transition-colors duration-300"
                      >
                        <X size={16} />
                      </button>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-neutral-700">
                      Alimentos:
                    </label>
                    {meal.foods.map((food, foodIndex) => (
                      <div key={foodIndex} className="flex items-center space-x-2">
                        <input
                          type="text"
                          value={food}
                          onChange={(e) => handleFoodChange(mealIndex, foodIndex, e.target.value)}
                          className="flex-1 bg-white border border-neutral-200 rounded-lg px-3 py-2 text-neutral-800 placeholder-neutral-500 focus:ring-2 focus:ring-brand/50 focus:border-brand focus:outline-none transition-all duration-300"
                          placeholder="Ej: 100g pechuga de pollo a la plancha"
                        />
                        {meal.foods.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeFood(mealIndex, foodIndex)}
                            className="text-red-500 hover:text-red-700 p-1 transition-colors duration-300"
                          >
                            <Minus size={16} />
                          </button>
                        )}
                        {foodIndex === meal.foods.length - 1 && (
                          <button
                            type="button"
                            onClick={() => addFood(mealIndex)}
                            className="text-brand hover:text-brand-dark p-1 transition-colors duration-300"
                          >
                            <Plus size={16} />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Notas Adicionales */}
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              Notas Adicionales
            </label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              rows={4}
              className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-4 py-3 text-neutral-800 placeholder-neutral-500 focus:ring-2 focus:ring-brand/50 focus:border-brand focus:outline-none transition-all duration-300 resize-none"
              placeholder="Instrucciones especiales, suplementos recomendados, restricciones, etc."
            />
          </div>

          {/* Botones */}
          <div className="flex space-x-4 pt-6 border-t border-neutral-200">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 hover:text-neutral-900 transition-all duration-300 py-3 rounded-xl font-medium"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex-1 bg-gradient-to-r from-brand to-brand-light text-white hover:from-brand-light hover:to-brand transition-all duration-300 py-3 rounded-xl shadow-lg font-semibold flex items-center justify-center space-x-2"
            >
              <Save size={18} />
              <span>Guardar Dieta</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateDiet;