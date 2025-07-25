import React, { useState, useEffect } from 'react';
import { X, Plus, Trash2, Apple, Clock, Target, Users, Save } from 'lucide-react';

const EditDiet = ({ isOpen, onClose, onSave, diet }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: 'weight_loss',
    calories: 1500,
    protein: 120,
    carbs: 150,
    fats: 50,
    fiber: 25,
    duration: '4 semanas',
    mealPlan: []
  });

  const [errors, setErrors] = useState({});

  // Cargar datos de la dieta cuando se abre el modal
  useEffect(() => {
    if (diet && isOpen) {
      setFormData({
        name: diet.name || '',
        description: diet.description || '',
        category: diet.category || 'weight_loss',
        calories: diet.calories || 1500,
        protein: diet.protein || 120,
        carbs: diet.carbs || 150,
        fats: diet.fats || 50,
        fiber: diet.fiber || 25,
        duration: diet.duration || '4 semanas',
        mealPlan: diet.mealPlan || []
      });
      setErrors({});
    }
  }, [diet, isOpen]);

  const categories = {
    weight_loss: 'Pérdida de peso',
    muscle_gain: 'Ganancia muscular',
    maintenance: 'Mantenimiento',
    special: 'Dietas especiales'
  };

  const mealTypes = [
    'Desayuno',
    'Media mañana',
    'Almuerzo',
    'Merienda',
    'Cena',
    'Antes de dormir'
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'calories' || name === 'protein' || name === 'carbs' || name === 'fats' || name === 'fiber' 
        ? parseInt(value) || 0 
        : value
    }));
    
    // Limpiar error cuando el usuario empiece a escribir
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const addMeal = () => {
    const newMeal = {
      id: Date.now(),
      type: 'Desayuno',
      foods: []
    };
    setFormData(prev => ({
      ...prev,
      mealPlan: [...prev.mealPlan, newMeal]
    }));
  };

  const updateMeal = (mealId, field, value) => {
    setFormData(prev => ({
      ...prev,
      mealPlan: prev.mealPlan.map(meal =>
        meal.id === mealId ? { ...meal, [field]: value } : meal
      )
    }));
  };

  const removeMeal = (mealId) => {
    setFormData(prev => ({
      ...prev,
      mealPlan: prev.mealPlan.filter(meal => meal.id !== mealId)
    }));
  };

  const addFoodToMeal = (mealId) => {
    const newFood = {
      id: Date.now(),
      name: '',
      quantity: '',
      calories: 0
    };
    setFormData(prev => ({
      ...prev,
      mealPlan: prev.mealPlan.map(meal =>
        meal.id === mealId 
          ? { ...meal, foods: [...meal.foods, newFood] }
          : meal
      )
    }));
  };

  const updateFood = (mealId, foodId, field, value) => {
    setFormData(prev => ({
      ...prev,
      mealPlan: prev.mealPlan.map(meal =>
        meal.id === mealId 
          ? {
              ...meal,
              foods: meal.foods.map(food =>
                food.id === foodId 
                  ? { ...food, [field]: field === 'calories' ? parseInt(value) || 0 : value }
                  : food
              )
            }
          : meal
      )
    }));
  };

  const removeFood = (mealId, foodId) => {
    setFormData(prev => ({
      ...prev,
      mealPlan: prev.mealPlan.map(meal =>
        meal.id === mealId 
          ? { ...meal, foods: meal.foods.filter(food => food.id !== foodId) }
          : meal
      )
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

    if (formData.calories < 800 || formData.calories > 4000) {
      newErrors.calories = 'Las calorías deben estar entre 800 y 4000';
    }

    if (formData.protein < 0 || formData.protein > 300) {
      newErrors.protein = 'Las proteínas deben estar entre 0 y 300g';
    }

    if (formData.carbs < 0 || formData.carbs > 500) {
      newErrors.carbs = 'Los carbohidratos deben estar entre 0 y 500g';
    }

    if (formData.fats < 0 || formData.fats > 200) {
      newErrors.fats = 'Las grasas deben estar entre 0 y 200g';
    }

    if (formData.fiber < 0 || formData.fiber > 100) {
      newErrors.fiber = 'La fibra debe estar entre 0 y 100g';
    }

    // Validar comidas
    formData.mealPlan.forEach((meal, mealIndex) => {
      meal.foods.forEach((food, foodIndex) => {
        if (!food.name.trim()) {
          newErrors[`meal_${mealIndex}_food_${foodIndex}_name`] = 'El nombre del alimento es requerido';
        }
        if (!food.quantity.trim()) {
          newErrors[`meal_${mealIndex}_food_${foodIndex}_quantity`] = 'La cantidad es requerida';
        }
      });
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      const updatedDiet = {
        ...diet,
        ...formData,
        id: diet.id, // Mantener el ID original
        status: diet.status, // Mantener el estado original
        clients: diet.clients, // Mantener el número de clientes
        createdDate: diet.createdDate, // Mantener la fecha de creación
        updatedDate: new Date().toISOString().split('T')[0] // Agregar fecha de actualización
      };
      
      onSave(updatedDiet);
      onClose();
    }
  };

  const handleClose = () => {
    setFormData({
      name: '',
      description: '',
      category: 'weight_loss',
      calories: 1500,
      protein: 120,
      carbs: 150,
      fats: 50,
      fiber: 25,
      duration: '4 semanas',
      mealPlan: []
    });
    setErrors({});
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-2xl font-display font-bold text-gray-900">Editar Plan Nutricional</h2>
            <p className="text-gray-600 mt-1">Modifica los detalles del plan nutricional</p>
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
                  <Apple size={16} className="inline mr-2" />
                  Nombre del plan *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                    errors.name ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Ej: Plan Pérdida de Peso - Básico"
                />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
              </div>

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
                placeholder="Describe el objetivo y características de este plan nutricional..."
              />
              {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Clock size={16} className="inline mr-2" />
                Duración
              </label>
              <input
                type="text"
                name="duration"
                value={formData.duration}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder="Ej: 8 semanas, 2 meses"
              />
            </div>

            {/* Información nutricional */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Target size={20} className="mr-2" />
                Información Nutricional
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Calorías/día *
                  </label>
                  <input
                    type="number"
                    name="calories"
                    value={formData.calories}
                    onChange={handleInputChange}
                    min="800"
                    max="4000"
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                      errors.calories ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.calories && <p className="text-red-500 text-sm mt-1">{errors.calories}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Proteínas (g)
                  </label>
                  <input
                    type="number"
                    name="protein"
                    value={formData.protein}
                    onChange={handleInputChange}
                    min="0"
                    max="300"
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                      errors.protein ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.protein && <p className="text-red-500 text-sm mt-1">{errors.protein}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Carbohidratos (g)
                  </label>
                  <input
                    type="number"
                    name="carbs"
                    value={formData.carbs}
                    onChange={handleInputChange}
                    min="0"
                    max="500"
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                      errors.carbs ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.carbs && <p className="text-red-500 text-sm mt-1">{errors.carbs}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Grasas (g)
                  </label>
                  <input
                    type="number"
                    name="fats"
                    value={formData.fats}
                    onChange={handleInputChange}
                    min="0"
                    max="200"
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                      errors.fats ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.fats && <p className="text-red-500 text-sm mt-1">{errors.fats}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Fibra (g)
                  </label>
                  <input
                    type="number"
                    name="fiber"
                    value={formData.fiber}
                    onChange={handleInputChange}
                    min="0"
                    max="100"
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                      errors.fiber ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.fiber && <p className="text-red-500 text-sm mt-1">{errors.fiber}</p>}
                </div>
              </div>
            </div>

            {/* Plan de comidas */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                  <Users size={20} className="mr-2" />
                  Plan de Comidas
                </h3>
                <button
                  type="button"
                  onClick={addMeal}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
                >
                  <Plus size={16} />
                  <span>Agregar Comida</span>
                </button>
              </div>

              <div className="space-y-6">
                {formData.mealPlan.map((meal, mealIndex) => (
                  <div key={meal.id} className="border border-gray-200 rounded-lg p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-4">
                        <select
                          value={meal.type}
                          onChange={(e) => updateMeal(meal.id, 'type', e.target.value)}
                          className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                          {mealTypes.map(type => (
                            <option key={type} value={type}>{type}</option>
                          ))}
                        </select>
                        <button
                          type="button"
                          onClick={() => addFoodToMeal(meal.id)}
                          className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-1"
                        >
                          <Plus size={14} />
                          <span>Alimento</span>
                        </button>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeMeal(meal.id)}
                        className="text-red-600 hover:text-red-800 transition-colors"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>

                    <div className="space-y-3">
                      {meal.foods.map((food, foodIndex) => (
                        <div key={food.id} className="grid grid-cols-1 md:grid-cols-4 gap-3 p-3 bg-gray-50 rounded-lg">
                          <div>
                            <input
                              type="text"
                              value={food.name}
                              onChange={(e) => updateFood(meal.id, food.id, 'name', e.target.value)}
                              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                                errors[`meal_${mealIndex}_food_${foodIndex}_name`] ? 'border-red-500' : 'border-gray-300'
                              }`}
                              placeholder="Nombre del alimento"
                            />
                            {errors[`meal_${mealIndex}_food_${foodIndex}_name`] && (
                              <p className="text-red-500 text-xs mt-1">{errors[`meal_${mealIndex}_food_${foodIndex}_name`]}</p>
                            )}
                          </div>
                          <div>
                            <input
                              type="text"
                              value={food.quantity}
                              onChange={(e) => updateFood(meal.id, food.id, 'quantity', e.target.value)}
                              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                                errors[`meal_${mealIndex}_food_${foodIndex}_quantity`] ? 'border-red-500' : 'border-gray-300'
                              }`}
                              placeholder="Cantidad"
                            />
                            {errors[`meal_${mealIndex}_food_${foodIndex}_quantity`] && (
                              <p className="text-red-500 text-xs mt-1">{errors[`meal_${mealIndex}_food_${foodIndex}_quantity`]}</p>
                            )}
                          </div>
                          <div>
                            <input
                              type="number"
                              value={food.calories}
                              onChange={(e) => updateFood(meal.id, food.id, 'calories', e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                              placeholder="Calorías"
                              min="0"
                            />
                          </div>
                          <div className="flex items-center justify-end">
                            <button
                              type="button"
                              onClick={() => removeFood(meal.id, food.id)}
                              className="text-red-600 hover:text-red-800 transition-colors"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>

                    {meal.foods.length === 0 && (
                      <div className="text-center py-8 text-gray-500">
                        <Apple size={32} className="mx-auto mb-2 opacity-50" />
                        <p>No hay alimentos agregados</p>
                        <p className="text-sm">Haz clic en "Alimento" para agregar</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {formData.mealPlan.length === 0 && (
                <div className="text-center py-12 border-2 border-dashed border-gray-300 rounded-lg">
                  <Apple size={48} className="mx-auto mb-4 text-gray-400" />
                  <h4 className="text-lg font-medium text-gray-900 mb-2">Plan de comidas vacío</h4>
                  <p className="text-gray-600 mb-4">Agrega comidas para estructurar el plan nutricional</p>
                  <button
                    type="button"
                    onClick={addMeal}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Agregar Primera Comida
                  </button>
                </div>
              )}
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
    </div>
  );
};

export default EditDiet;