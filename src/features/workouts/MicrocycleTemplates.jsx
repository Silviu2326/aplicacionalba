import React, { useState, useEffect } from 'react';
import { X, Calendar, Clock, Target, Users, Star, Copy, Play, Plus, Edit, Trash2 } from 'lucide-react';
import CreateMicrocycleTemplate from './CreateMicrocycleTemplate';
import { getMicrocycleTemplates, createMicrocycleTemplate, applyMicrocycleTemplate } from '../../api/microcycleTemplates.api';

const MicrocycleTemplates = ({ isOpen, onClose, onSelectTemplate, onCreateTemplate }) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(true);

  const categories = {
    all: 'Todas',
    strength: 'Fuerza',
    cardio: 'Cardio',
    powerlifting: 'Powerlifting',
    functional: 'Funcional'
  };

  const difficulties = {
    beginner: 'Principiante',
    intermediate: 'Intermedio',
    advanced: 'Avanzado'
  };

  // Load templates from API
  useEffect(() => {
    if (isOpen) {
      loadTemplates();
    }
  }, [isOpen, selectedCategory]);

  const loadTemplates = async () => {
    try {
      setLoading(true);
      const filters = {
        category: selectedCategory,
        sortBy: 'rating'
      };
      const response = await getMicrocycleTemplates(filters);
      setTemplates(response.data);
    } catch (error) {
      console.error('Error loading templates:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTemplate = async (templateData) => {
    try {
      await createMicrocycleTemplate(templateData);
      loadTemplates(); // Reload templates
      setShowCreateModal(false);
    } catch (error) {
      console.error('Error creating template:', error);
    }
  };

  const getCategoryColor = (category) => {
    const colors = {
      strength: 'bg-blue-100 text-blue-800',
      cardio: 'bg-red-100 text-red-800',
      powerlifting: 'bg-purple-100 text-purple-800',
      functional: 'bg-green-100 text-green-800'
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
  };

  const getDifficultyColor = (difficulty) => {
    const colors = {
      beginner: 'bg-green-100 text-green-800',
      intermediate: 'bg-yellow-100 text-yellow-800',
      advanced: 'bg-red-100 text-red-800'
    };
    return colors[difficulty] || 'bg-gray-100 text-gray-800';
  };

  const handleSelectTemplate = (template) => {
    const microcycleData = {
      id: Date.now(),
      name: template.name,
      description: template.description,
      category: template.category,
      difficulty: template.difficulty,
      totalDuration: template.totalDuration,
      targetMuscles: template.targetMuscles,
      days: template.days,
      status: 'template',
      createdDate: new Date().toISOString().split('T')[0]
    };
    onSelectTemplate(microcycleData);
    onClose();
  };

  const dayNames = {
    monday: 'Lunes',
    tuesday: 'Martes',
    wednesday: 'Miércoles',
    thursday: 'Jueves',
    friday: 'Viernes'
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-xl shadow-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Plantillas de Micro-ciclo</h2>
              <p className="text-gray-600 mt-1">Selecciona una plantilla semanal (Lunes-Viernes) para aplicar a tus clientes</p>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setShowCreateModal(true)}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Plus size={16} />
                <span>Crear Plantilla</span>
              </button>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X size={20} className="text-gray-500" />
              </button>
            </div>
          </div>

          {/* Filters */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex flex-wrap gap-2">
              {Object.entries(categories).map(([key, label]) => (
                <button
                  key={key}
                  onClick={() => setSelectedCategory(key)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    selectedCategory === key
                      ? 'bg-blue-600 text-white'
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
            {loading ? (
              <div className="flex justify-center items-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {templates.map((template) => (
                    <div key={template.id} className="border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all duration-300 group">
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
                          <h3 className="font-bold text-gray-900 text-lg mb-1">{template.name}</h3>
                          <p className="text-sm text-gray-600 line-clamp-2">{template.description}</p>
                        </div>
                      </div>

                      {/* Stats */}
                      <div className="grid grid-cols-3 gap-3 mb-4 text-sm">
                        <div className="flex items-center space-x-2">
                          <Clock size={12} className="text-blue-600" />
                          <span className="text-gray-600">{template.totalDuration} min/sem</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Calendar size={12} className="text-green-600" />
                          <span className="text-gray-600">5 días</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Copy size={12} className="text-gray-500" />
                          <span className="text-gray-600">{template.uses} usos</span>
                        </div>
                      </div>

                      {/* Target Muscles */}
                      <div className="mb-4">
                        <p className="text-xs text-gray-500 mb-2 font-medium">Grupos musculares:</p>
                        <div className="flex flex-wrap gap-1">
                          {template.targetMuscles.slice(0, 4).map((muscle, index) => (
                            <span key={index} className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
                              {muscle}
                            </span>
                          ))}
                          {template.targetMuscles.length > 4 && (
                            <span className="text-xs text-gray-500">+{template.targetMuscles.length - 4} más</span>
                          )}
                        </div>
                      </div>

                      {/* Days Preview */}
                      <div className="mb-6">
                        <p className="text-xs text-gray-500 mb-2 font-medium">Planificación semanal:</p>
                        <div className="space-y-2">
                          {Object.entries(template.days).map(([dayKey, dayData]) => (
                            <div key={dayKey} className="flex items-center justify-between text-xs bg-gray-50 p-2 rounded">
                              <span className="font-medium text-gray-700">{dayNames[dayKey]}</span>
                              <span className="text-gray-600">{dayData.name}</span>
                              <span className="text-gray-500">{dayData.duration}min</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleSelectTemplate(template)}
                          className="flex-1 flex items-center justify-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                        >
                          <Play size={14} />
                          <span>Usar Plantilla</span>
                        </button>
                        <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                          <Copy size={14} className="text-gray-600" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {templates.length === 0 && (
                  <div className="text-center py-12">
                    <Calendar className="h-16 w-16 mx-auto text-gray-300 mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No se encontraron plantillas</h3>
                    <p className="text-gray-600">Intenta ajustar los filtros o crear una nueva plantilla</p>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
      
      {/* Create Template Modal */}
      <CreateMicrocycleTemplate
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onSave={handleCreateTemplate}
      />
    </>
  );
};

export default MicrocycleTemplates;