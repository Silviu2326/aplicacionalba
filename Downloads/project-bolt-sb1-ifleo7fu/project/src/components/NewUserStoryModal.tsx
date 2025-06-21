import React, { useState } from 'react';
import { X, Plus, BookOpen } from 'lucide-react';
import { UserStory } from '../types';

interface NewUserStoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (userStory: Omit<UserStory, 'id' | 'createdAt' | 'updatedAt'>) => void;
  initialUserStory?: UserStory;
}

export default function NewUserStoryModal({ isOpen, onClose, onSubmit, initialUserStory }: NewUserStoryModalProps) {
  const [formData, setFormData] = useState({
    title: initialUserStory?.title || '',
    description: initialUserStory?.description || '',
    acceptanceCriteria: initialUserStory?.acceptanceCriteria || [''],
    priority: initialUserStory?.priority || 'medium' as const,
    estimatedHours: initialUserStory?.estimatedHours || 0,
    status: initialUserStory?.status || 'todo' as const,
  });

  React.useEffect(() => {
    if (initialUserStory) {
      setFormData({
        title: initialUserStory.title,
        description: initialUserStory.description,
        acceptanceCriteria: initialUserStory.acceptanceCriteria?.length > 0 ? initialUserStory.acceptanceCriteria : [''],
        priority: initialUserStory.priority,
        estimatedHours: initialUserStory.estimatedHours || 0,
        status: initialUserStory.status,
      });
    } else {
      setFormData({
        title: '',
        description: '',
        acceptanceCriteria: [''],
        priority: 'medium',
        estimatedHours: 0,
        status: 'todo',
      });
    }
  }, [initialUserStory]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.title.trim()) {
      onSubmit({
        ...formData,
        acceptanceCriteria: formData.acceptanceCriteria.filter(criteria => criteria.trim() !== ''),
      });
      setFormData({ 
        title: '', 
        description: '', 
        acceptanceCriteria: [''], 
        priority: 'medium', 
        estimatedHours: 0,
        status: 'todo'
      });
      onClose();
    }
  };

  const addCriteria = () => {
    setFormData({
      ...formData,
      acceptanceCriteria: [...formData.acceptanceCriteria, '']
    });
  };

  const removeCriteria = (index: number) => {
    setFormData({
      ...formData,
      acceptanceCriteria: formData.acceptanceCriteria.filter((_, i) => i !== index)
    });
  };

  const updateCriteria = (index: number, value: string) => {
    const newCriteria = [...formData.acceptanceCriteria];
    newCriteria[index] = value;
    setFormData({
      ...formData,
      acceptanceCriteria: newCriteria
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-gray-900/80 backdrop-blur-xl border border-gray-700/50 rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-700/50">
          <div className="flex items-center space-x-2">
            <BookOpen className="h-6 w-6 text-blue-400" />
            <h2 className="text-xl font-semibold text-white">
              {initialUserStory ? 'Editar Historia de Usuario' : 'Nueva Historia de Usuario'}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Título de la Historia
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-3 py-2 bg-white/10 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-400 focus:border-transparent backdrop-blur-sm transition-all duration-200"
              placeholder="Como [usuario] quiero [funcionalidad] para [beneficio]"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Descripción
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={3}
              className="w-full px-3 py-2 bg-white/10 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-400 focus:border-transparent backdrop-blur-sm transition-all duration-200 resize-none"
              placeholder="Describe en detalle la funcionalidad requerida..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Criterios de Aceptación
            </label>
            {formData.acceptanceCriteria.map((criteria, index) => (
              <div key={index} className="flex space-x-2 mb-2">
                <input
                  type="text"
                  value={criteria}
                  onChange={(e) => updateCriteria(index, e.target.value)}
                  className="flex-1 px-3 py-2 bg-white/10 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-400 focus:border-transparent backdrop-blur-sm transition-all duration-200"
                  placeholder={`Criterio ${index + 1}`}
                />
                {formData.acceptanceCriteria.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeCriteria(index)}
                    className="px-3 py-2 text-red-400 hover:bg-red-500/20 rounded-lg transition-all duration-200"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={addCriteria}
              className="flex items-center space-x-1 text-blue-400 hover:text-blue-300 text-sm"
            >
              <Plus className="h-4 w-4" />
              <span>Agregar criterio</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Prioridad
              </label>
              <select
                value={formData.priority}
                onChange={(e) => setFormData({ ...formData, priority: e.target.value as any })}
                className="w-full px-3 py-2 bg-white/10 border border-gray-600/50 rounded-lg text-white focus:ring-2 focus:ring-blue-400 focus:border-transparent backdrop-blur-sm transition-all duration-200"
              >
                <option value="low">Baja</option>
                <option value="medium">Media</option>
                <option value="high">Alta</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Estado
              </label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                className="w-full px-3 py-2 bg-white/10 border border-gray-600/50 rounded-lg text-white focus:ring-2 focus:ring-blue-400 focus:border-transparent backdrop-blur-sm transition-all duration-200"
              >
                <option value="todo">Por hacer</option>
                <option value="in-progress">En progreso</option>
                <option value="done">Completado</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Horas estimadas
              </label>
              <input
                type="number"
                min="0"
                value={formData.estimatedHours}
                onChange={(e) => setFormData({ ...formData, estimatedHours: parseInt(e.target.value) || 0 })}
                className="w-full px-3 py-2 bg-white/10 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-400 focus:border-transparent backdrop-blur-sm transition-all duration-200"
                placeholder="0"
              />
            </div>
          </div>

          <div className="flex space-x-3 pt-4 border-t border-gray-700/50">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 text-gray-300 bg-white/10 hover:bg-white/20 rounded-lg backdrop-blur-sm transition-all duration-200"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 rounded-lg backdrop-blur-sm transition-all duration-200 shadow-lg"
            >
              {initialUserStory ? 'Actualizar' : 'Crear'} Historia
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}