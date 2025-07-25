import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Share2, Eye, Calendar, User, Clock, Target, Activity } from 'lucide-react';
import { getSharedDiet } from '../api/dietSharing.api';

const SharedDietPage = () => {
  const { token } = useParams();
  const [diet, setDiet] = useState(null);
  const [shareConfig, setShareConfig] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (token) {
      loadSharedDiet();
    }
  }, [token]);

  const loadSharedDiet = async () => {
    try {
      setLoading(true);
      const response = await getSharedDiet(token);
      
      if (response.success) {
        setDiet(response.data.diet);
        setShareConfig(response.data.shareConfig);
      }
    } catch (error) {
      console.error('Error loading shared diet:', error);
      setError(error.error || 'Error al cargar la dieta compartida');
    } finally {
      setLoading(false);
    }
  };

  const calculateMealNutrition = (foods) => {
    return foods.reduce((total, food) => ({
      calories: total.calories + (food.calories || 0),
      protein: total.protein + (food.protein || 0),
      carbs: total.carbs + (food.carbs || 0),
      fats: total.fats + (food.fats || 0)
    }), { calories: 0, protein: 0, carbs: 0, fats: 0 });
  };

  const calculateTotalNutrition = () => {
    if (!diet?.mealPlan) return { calories: 0, protein: 0, carbs: 0, fats: 0 };
    
    return diet.mealPlan.reduce((total, meal) => {
      const mealNutrition = calculateMealNutrition(meal.foods || []);
      return {
        calories: total.calories + mealNutrition.calories,
        protein: total.protein + mealNutrition.protein,
        carbs: total.carbs + mealNutrition.carbs,
        fats: total.fats + mealNutrition.fats
      };
    }, { calories: 0, protein: 0, carbs: 0, fats: 0 });
  };

  const getCategoryLabel = (category) => {
    const categories = {
      weight_loss: 'Pérdida de peso',
      muscle_gain: 'Ganancia muscular',
      maintenance: 'Mantenimiento',
      special: 'Dietas especiales'
    };
    return categories[category] || category;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando dieta compartida...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Share2 className="w-8 h-8 text-red-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Error al cargar la dieta</h1>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => window.location.href = '/'}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Ir al inicio
          </button>
        </div>
      </div>
    );
  }

  const totalNutrition = calculateTotalNutrition();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Share2 className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Dieta Compartida</h1>
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
                <span>Compartido el {new Date(shareConfig?.createdAt).toLocaleDateString('es-ES')}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Información principal de la dieta */}
        <div className="bg-white rounded-xl shadow-sm border p-6 mb-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">{diet.name}</h2>
              <p className="text-gray-600 mb-4">{diet.description}</p>
            </div>
          </div>
          
          {/* Información nutricional y categoría */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <div className="flex items-center space-x-2 mb-2">
                <Target className="w-5 h-5 text-blue-600" />
                <span className="text-sm font-medium text-blue-800">Categoría</span>
              </div>
              <p className="text-lg font-bold text-blue-900">{getCategoryLabel(diet.category)}</p>
            </div>
            
            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <div className="flex items-center space-x-2 mb-2">
                <Activity className="w-5 h-5 text-green-600" />
                <span className="text-sm font-medium text-green-800">Calorías objetivo</span>
              </div>
              <p className="text-lg font-bold text-green-900">{diet.calories} kcal</p>
            </div>
            
            <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
              <div className="flex items-center space-x-2 mb-2">
                <Clock className="w-5 h-5 text-purple-600" />
                <span className="text-sm font-medium text-purple-800">Duración</span>
              </div>
              <p className="text-lg font-bold text-purple-900">{diet.duration}</p>
            </div>
            
            <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
              <div className="flex items-center space-x-2 mb-2">
                <Target className="w-5 h-5 text-orange-600" />
                <span className="text-sm font-medium text-orange-800">Proteína objetivo</span>
              </div>
              <p className="text-lg font-bold text-orange-900">{diet.protein}g</p>
            </div>
          </div>

          {/* Información del nutricionista */}
          {shareConfig?.showNutritionistInfo && diet.nutritionist && (
            <div className="bg-gray-50 p-4 rounded-lg border">
              <div className="flex items-center space-x-2 mb-2">
                <User className="w-5 h-5 text-gray-600" />
                <span className="text-sm font-medium text-gray-800">Nutricionista</span>
              </div>
              <div className="text-sm text-gray-700">
                <p className="font-medium">{diet.nutritionist.name}</p>
                <p>{diet.nutritionist.specialization}</p>
                <p className="text-xs text-gray-500">Licencia: {diet.nutritionist.license}</p>
              </div>
            </div>
          )}
        </div>

        {/* Resumen nutricional total */}
        <div className="bg-white rounded-xl shadow-sm border p-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Resumen Nutricional del Plan</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <p className="text-2xl font-bold text-blue-900">{Math.round(totalNutrition.calories)}</p>
              <p className="text-sm text-blue-700">Calorías totales</p>
              <p className="text-xs text-blue-600">Objetivo: {diet.calories}</p>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <p className="text-2xl font-bold text-green-900">{Math.round(totalNutrition.protein)}g</p>
              <p className="text-sm text-green-700">Proteínas</p>
              <p className="text-xs text-green-600">Objetivo: {diet.protein}g</p>
            </div>
            <div className="text-center p-4 bg-yellow-50 rounded-lg">
              <p className="text-2xl font-bold text-yellow-900">{Math.round(totalNutrition.carbs)}g</p>
              <p className="text-sm text-yellow-700">Carbohidratos</p>
              <p className="text-xs text-yellow-600">Objetivo: {diet.carbs}g</p>
            </div>
            <div className="text-center p-4 bg-red-50 rounded-lg">
              <p className="text-2xl font-bold text-red-900">{Math.round(totalNutrition.fats)}g</p>
              <p className="text-sm text-red-700">Grasas</p>
              <p className="text-xs text-red-600">Objetivo: {diet.fats}g</p>
            </div>
          </div>
        </div>

        {/* Plan de comidas */}
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Plan de Comidas</h3>
          
          <div className="space-y-6">
            {diet.mealPlan?.map((meal, index) => {
              const mealNutrition = calculateMealNutrition(meal.foods || []);
              
              return (
                <div key={meal.id || index} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-lg font-medium text-gray-900">{meal.type}</h4>
                    <div className="text-sm text-gray-600">
                      {Math.round(mealNutrition.calories)} kcal
                    </div>
                  </div>
                  
                  {meal.foods && meal.foods.length > 0 ? (
                    <div className="space-y-3">
                      {meal.foods.map((food, foodIndex) => (
                        <div key={food.id || foodIndex} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <span className="font-medium text-gray-900">{food.name}</span>
                              <span className="text-sm text-gray-600">{food.quantity}</span>
                            </div>
                            <div className="flex items-center space-x-4 mt-1 text-xs text-gray-500">
                              <span>{food.calories || 0} kcal</span>
                              {food.protein && <span>P: {Math.round(food.protein)}g</span>}
                              {food.carbs && <span>C: {Math.round(food.carbs)}g</span>}
                              {food.fats && <span>G: {Math.round(food.fats)}g</span>}
                            </div>
                          </div>
                        </div>
                      ))}
                      
                      {/* Resumen nutricional de la comida */}
                      <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                        <div className="grid grid-cols-4 gap-4 text-center text-sm">
                          <div>
                            <p className="font-medium text-blue-900">{Math.round(mealNutrition.calories)}</p>
                            <p className="text-blue-700">kcal</p>
                          </div>
                          <div>
                            <p className="font-medium text-blue-900">{Math.round(mealNutrition.protein)}g</p>
                            <p className="text-blue-700">Proteína</p>
                          </div>
                          <div>
                            <p className="font-medium text-blue-900">{Math.round(mealNutrition.carbs)}g</p>
                            <p className="text-blue-700">Carbos</p>
                          </div>
                          <div>
                            <p className="font-medium text-blue-900">{Math.round(mealNutrition.fats)}g</p>
                            <p className="text-blue-700">Grasas</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <p className="text-gray-500 italic">No hay alimentos en esta comida</p>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>Esta es una vista de solo lectura de la dieta compartida.</p>
          <p className="mt-1">Para crear tu propia dieta personalizada, contacta con un nutricionista.</p>
        </div>
      </div>
    </div>
  );
};

export default SharedDietPage;