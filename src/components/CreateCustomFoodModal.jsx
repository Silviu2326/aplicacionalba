import React, { useState } from 'react';
import { X, Save } from 'lucide-react';
import { saveCustomFood } from '../api/foodLibrary.api';

const CreateCustomFoodModal = ({ isOpen, onClose, onFoodCreated }) => {
  const [formData, setFormData] = useState({
    name: '',
    quantity: 100,
    unit: 'g',
    calories: '',
    protein: '',
    carbs: '',
    fats: '',
    fiber: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Limpiar error del campo cuando el usuario empiece a escribir
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'El nombre es requerido';
    }
    
    if (!formData.calories || formData.calories <= 0) {
      newErrors.calories = 'Las calorías deben ser mayor a 0';
    }
    
    if (!formData.protein || formData.protein < 0) {
      newErrors.protein = 'Las proteínas no pueden ser negativas';
    }
    
    if (!formData.carbs || formData.carbs < 0) {
      newErrors.carbs = 'Los carbohidratos no pueden ser negativos';
    }
    
    if (!formData.fats || formData.fats < 0) {
      newErrors.fats = 'Las grasas no pueden ser negativas';
    }
    
    if (formData.fiber && formData.fiber < 0) {
      newErrors.fiber = 'La fibra no puede ser negativa';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsLoading(true);
    try {
      const newFood = await saveCustomFood({
        name: formData.name.trim(),
        quantity: parseFloat(formData.quantity),
        unit: formData.unit,
        calories: parseFloat(formData.calories),
        protein: parseFloat(formData.protein),
        carbs: parseFloat(formData.carbs),
        fats: parseFloat(formData.fats),
        fiber: formData.fiber ? parseFloat(formData.fiber) : 0
      });
      
      // Resetear formulario
      setFormData({
        name: '',
        quantity: 100,
        unit: 'g',
        calories: '',
        protein: '',
        carbs: '',
        fats: '',
        fiber: ''
      });
      
      // Notificar que se creó el alimento
      if (onFoodCreated) {
        onFoodCreated(newFood);
      }
      
      onClose();
    } catch (error) {
      console.error('Error creating custom food:', error);
      setErrors({ submit: 'Error al guardar el alimento. Inténtalo de nuevo.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setFormData({
      name: '',
      quantity: 100,
      unit: 'g',
      calories: '',
      protein: '',
      carbs: '',
      fats: '',
      fiber: ''
    });
    setErrors({});
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">
            Crear Alimento Personalizado
          </h2>
          <button
            onClick={handleClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Nombre del alimento */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nombre del alimento *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.name ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="ej. Tortilla vegetal"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name}</p>
            )}
          </div>

          {/* Porción estándar */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Cantidad
              </label>
              <input
                type="number"
                name="quantity"
                value={formData.quantity}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                min="1"
                step="0.1"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Unidad
              </label>
              <select
                name="unit"
                value={formData.unit}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="g">gramos</option>
                <option value="ml">ml</option>
                <option value="unidad">unidad</option>
                <option value="taza">taza</option>
                <option value="cucharada">cucharada</option>
              </select>
            </div>
          </div>

          {/* Macronutrientes */}
          <div className="space-y-3">
            <h3 className="text-sm font-medium text-gray-700">
              Información nutricional (por {formData.quantity} {formData.unit})
            </h3>
            
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Calorías *
                </label>
                <input
                  type="number"
                  name="calories"
                  value={formData.calories}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.calories ? 'border-red-500' : 'border-gray-300'
                  }`}
                  min="0"
                  step="0.1"
                  placeholder="kcal"
                />
                {errors.calories && (
                  <p className="text-red-500 text-sm mt-1">{errors.calories}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Proteínas (g) *
                </label>
                <input
                  type="number"
                  name="protein"
                  value={formData.protein}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.protein ? 'border-red-500' : 'border-gray-300'
                  }`}
                  min="0"
                  step="0.1"
                  placeholder="g"
                />
                {errors.protein && (
                  <p className="text-red-500 text-sm mt-1">{errors.protein}</p>
                )}
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Carbohidratos (g) *
                </label>
                <input
                  type="number"
                  name="carbs"
                  value={formData.carbs}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.carbs ? 'border-red-500' : 'border-gray-300'
                  }`}
                  min="0"
                  step="0.1"
                  placeholder="g"
                />
                {errors.carbs && (
                  <p className="text-red-500 text-sm mt-1">{errors.carbs}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Grasas (g) *
                </label>
                <input
                  type="number"
                  name="fats"
                  value={formData.fats}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.fats ? 'border-red-500' : 'border-gray-300'
                  }`}
                  min="0"
                  step="0.1"
                  placeholder="g"
                />
                {errors.fats && (
                  <p className="text-red-500 text-sm mt-1">{errors.fats}</p>
                )}
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Fibra (g)
              </label>
              <input
                type="number"
                name="fiber"
                value={formData.fiber}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.fiber ? 'border-red-500' : 'border-gray-300'
                }`}
                min="0"
                step="0.1"
                placeholder="g (opcional)"
              />
              {errors.fiber && (
                <p className="text-red-500 text-sm mt-1">{errors.fiber}</p>
              )}
            </div>
          </div>

          {/* Error de envío */}
          {errors.submit && (
            <div className="text-red-500 text-sm text-center">
              {errors.submit}
            </div>
          )}

          {/* Botones */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={handleClose}
              className="flex-1 px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  Guardando...
                </>
              ) : (
                <>
                  <Save size={16} />
                  Guardar como alimento
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateCustomFoodModal;