import React, { useState } from 'react';
import { X, Plus, FileText } from 'lucide-react';
import { AppPage } from '../types';

interface NewPageModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (page: Omit<AppPage, 'id' | 'createdAt' | 'updatedAt'>) => void;
  initialPage?: AppPage;
}

export default function NewPageModal({ isOpen, onClose, onSubmit, initialPage }: NewPageModalProps) {
  const [formData, setFormData] = useState({
    title: initialPage?.title || '',
    description: initialPage?.description || '',
    status: initialPage?.status || 'todo' as const,
    priority: initialPage?.priority || 'medium' as const,
  });

  React.useEffect(() => {
    if (initialPage) {
      setFormData({
        title: initialPage.title,
        description: initialPage.description,
        status: initialPage.status,
        priority: initialPage.priority,
      });
    } else {
      setFormData({
        title: '',
        description: '',
        status: 'todo',
        priority: 'medium',
      });
    }
  }, [initialPage]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.title.trim()) {
      onSubmit(formData);
      setFormData({ title: '', description: '', status: 'todo', priority: 'medium' });
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-gray-900/80 backdrop-blur-xl border border-gray-700/50 rounded-xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-700/50">
          <div className="flex items-center space-x-2">
            <FileText className="h-6 w-6 text-blue-400" />
            <h2 className="text-xl font-semibold text-white">
              {initialPage ? 'Editar Página' : 'Nueva Página'}
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
              Título de la Página
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-3 py-2 bg-white/10 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-400 focus:border-transparent backdrop-blur-sm transition-all duration-200"
              placeholder="Ej: Página de inicio"
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
              placeholder="Describe la funcionalidad de esta página..."
            />
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
              <option value="todo">Por Hacer</option>
              <option value="in-progress">En Progreso</option>
              <option value="done">Completado</option>
            </select>
          </div>

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
              {initialPage ? 'Actualizar' : 'Crear'} Página
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}