import React, { useState } from 'react';
import { X, Apple, Clock, Users, Star, Copy } from 'lucide-react';

const DietTemplates = ({ isOpen, onClose, onSelectTemplate }) => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const templates = [
    {
      id: 1,
      name: 'Pérdida de Peso Básica',
      description: 'Plan hipocalórico equilibrado para pérdida de peso gradual y sostenible',
      category: 'weight_loss',
      calories: 1400,
      duration: '8 semanas',
      rating: 4.8,
      uses: 156,
      macros: { protein: 30, carbs: 40, fats: 30 },
      meals: [
        { name: 'Desayuno', calories: 350, foods: ['Avena con frutas', 'Yogur griego', 'Almendras'] },
        { name: 'Almuerzo', calories: 450, foods: ['Pechuga de pollo', 'Ensalada mixta', 'Quinoa'] },
        { name: 'Merienda', calories: 200, foods: ['Manzana', 'Nueces'] },
        { name: 'Cena', calories: 400, foods: ['Salmón', 'Verduras al vapor', 'Arroz integral'] }
      ]
    },
    {
      id: 2,
      name: 'Ganancia Muscular',
      description: 'Plan alto en proteínas diseñado para maximizar el crecimiento muscular',
      category: 'muscle_gain',
      calories: 2400,
      duration: '12 semanas',
      rating: 4.9,
      uses: 89,
      macros: { protein: 35, carbs: 40, fats: 25 },
      meals: [
        { name: 'Desayuno', calories: 600, foods: ['Huevos revueltos', 'Tostadas integrales', 'Aguacate'] },
        { name: 'Almuerzo', calories: 700, foods: ['Carne magra', 'Pasta integral', 'Verduras'] },
        { name: 'Pre-entreno', calories: 300, foods: ['Batido de proteína', 'Plátano'] },
        { name: 'Post-entreno', calories: 400, foods: ['Pollo', 'Arroz', 'Brócoli'] },
        { name: 'Cena', calories: 400, foods: ['Pescado', 'Batata', 'Espinacas'] }
      ]
    },
    {
      id: 3,
      name: 'Mantenimiento Saludable',
      description: 'Plan equilibrado para mantener peso y promover hábitos saludables',
      category: 'maintenance',
      calories: 1800,
      duration: '4 semanas',
      rating: 4.7,
      uses: 203,
      macros: { protein: 25, carbs: 45, fats: 30 },
      meals: [
        { name: 'Desayuno', calories: 450, foods: ['Smoothie verde', 'Granola casera'] },
        { name: 'Almuerzo', calories: 550, foods: ['Bowl de quinoa', 'Vegetales', 'Proteína'] },
        { name: 'Merienda', calories: 250, foods: ['Yogur', 'Frutos secos'] },
        { name: 'Cena', calories: 550, foods: ['Proteína magra', 'Vegetales', 'Carbohidrato complejo'] }
      ]
    },
    {
      id: 4,
      name: 'Dieta Mediterránea',
      description: 'Plan basado en la dieta mediterránea tradicional, rica en antioxidantes',
      category: 'special',
      calories: 1900,
      duration: '6 semanas',
      rating: 4.6,
      uses: 127,
      macros: { protein: 20, carbs: 50, fats: 30 },
      meals: [
        { name: 'Desayuno', calories: 400, foods: ['Pan integral', 'Aceite de oliva', 'Tomate'] },
        { name: 'Almuerzo', calories: 600, foods: ['Pescado', 'Verduras', 'Legumbres'] },
        { name: 'Merienda', calories: 200, foods: ['Frutos secos', 'Fruta'] },
        { name: 'Cena', calories: 700, foods: ['Ensalada', 'Proteína', 'Aceite de oliva'] }
      ]
    },
    {
      id: 5,
      name: 'Detox y Limpieza',
      description: 'Plan de desintoxicación con alimentos naturales y antioxidantes',
      category: 'special',
      calories: 1300,
      duration: '2 semanas',
      rating: 4.4,
      uses: 78,
      macros: { protein: 20, carbs: 60, fats: 20 },
      meals: [
        { name: 'Desayuno', calories: 300, foods: ['Jugo verde', 'Frutas'] },
        { name: 'Almuerzo', calories: 400, foods: ['Ensalada detox', 'Proteína vegetal'] },
        { name: 'Merienda', calories: 150, foods: ['Té verde', 'Fruta'] },
        { name: 'Cena', calories: 450, foods: ['Sopa de verduras', 'Proteína magra'] }
      ]
    },
    {
      id: 6,
      name: 'Keto Principiante',
      description: 'Introducción a la dieta cetogénica con macros optimizados',
      category: 'special',
      calories: 1600,
      duration: '4 semanas',
      rating: 4.5,
      uses: 94,
      macros: { protein: 25, carbs: 5, fats: 70 },
      meals: [
        { name: 'Desayuno', calories: 400, foods: ['Huevos', 'Aguacate', 'Tocino'] },
        { name: 'Almuerzo', calories: 500, foods: ['Ensalada', 'Pollo', 'Aceite de oliva'] },
        { name: 'Merienda', calories: 200, foods: ['Nueces', 'Queso'] },
        { name: 'Cena', calories: 500, foods: ['Salmón', 'Espárragos', 'Mantequilla'] }
      ]
    }
  ];

  const categories = {
    all: 'Todas',
    weight_loss: 'Pérdida de peso',
    muscle_gain: 'Ganancia muscular',
    maintenance: 'Mantenimiento',
    special: 'Dietas especiales'
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case 'weight_loss': return 'bg-red-100 text-red-800';
      case 'muscle_gain': return 'bg-blue-100 text-blue-800';
      case 'maintenance': return 'bg-green-100 text-green-800';
      case 'special': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredTemplates = templates.filter(template => 
    selectedCategory === 'all' || template.category === selectedCategory
  );

  const handleSelectTemplate = (template) => {
    const dietData = {
      id: Date.now(),
      name: template.name,
      description: template.description,
      category: template.category,
      calories: template.calories,
      protein: template.macros.protein,
      carbs: template.macros.carbs,
      fats: template.macros.fats,
      fiber: 25,
      duration: template.duration,
      meals: template.meals,
      status: 'draft',
      clients: 0,
      createdDate: new Date().toISOString().split('T')[0]
    };
    onSelectTemplate(dietData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-2xl font-display font-bold text-gray-900">Plantillas de Dietas</h2>
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
                    <div className="flex items-center space-x-2 mb-2">
                      <span className={`px-2 py-1 text-xs rounded-full font-medium ${getCategoryColor(template.category)}`}>
                        {categories[template.category]}
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
                    <div className="w-3 h-3 bg-amber-500 rounded-full"></div>
                    <span className="text-gray-600">{template.calories} kcal</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock size={12} className="text-gray-500" />
                    <span className="text-gray-600">{template.duration}</span>
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

                {/* Macros */}
                <div className="mb-4">
                  <p className="text-xs text-gray-500 mb-2 font-medium">Distribución de macros:</p>
                  <div className="flex space-x-2 text-xs">
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">P: {template.macros.protein}%</span>
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded">C: {template.macros.carbs}%</span>
                    <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded">G: {template.macros.fats}%</span>
                  </div>
                </div>

                {/* Meals Preview */}
                <div className="mb-6">
                  <p className="text-xs text-gray-500 mb-2 font-medium">Comidas incluidas:</p>
                  <div className="space-y-1">
                    {template.meals.slice(0, 3).map((meal, index) => (
                      <div key={index} className="flex justify-between text-xs">
                        <span className="text-gray-700">{meal.name}</span>
                        <span className="text-gray-500">{meal.calories} kcal</span>
                      </div>
                    ))}
                    {template.meals.length > 3 && (
                      <p className="text-xs text-gray-500">+{template.meals.length - 3} comidas más</p>
                    )}
                  </div>
                </div>

                {/* Action Button */}
                <button
                  onClick={() => handleSelectTemplate(template)}
                  className="w-full bg-gradient-to-r from-brand to-brand-light text-white hover:from-brand-light hover:to-brand transition-all duration-300 py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transform hover:scale-105"
                >
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

export default DietTemplates;