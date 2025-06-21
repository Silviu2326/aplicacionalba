import React, { useState } from 'react';
import { X, FolderPlus, Zap, ExternalLink } from 'lucide-react';
import { useProject } from '../context/ProjectContext';

interface NewProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const colors = [
  '#3B82F6', '#10B981', '#F97316', '#EF4444', '#8B5CF6', 
  '#06B6D4', '#84CC16', '#F59E0B', '#EC4899', '#6366F1'
];

export default function NewProjectModal({ isOpen, onClose }: NewProjectModalProps) {
  const { addProject } = useProject();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    status: 'planning' as const,
    color: colors[0],
    githubUrl: '',
  });
  const [projectType, setProjectType] = useState<'manual' | 'generate' | 'bolt'>('manual');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (projectType === 'bolt') {
      // Abrir bolt.new en una nueva pestaña
      window.open('https://bolt.new', '_blank');
      onClose();
      return;
    }
    
    if (formData.name.trim() && formData.description.trim().length >= 10) {
      const projectData = {
        ...formData,
        pages: [],
        generatedWithAI: projectType === 'generate'
      };
      
      await addProject(projectData);
      setFormData({ name: '', description: '', status: 'planning', color: colors[0], githubUrl: '' });
      setProjectType('manual');
      onClose();
    }
  };

  const handleUseBolt = () => {
    window.open('https://bolt.new', '_blank');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-gray-900/80 backdrop-blur-xl border border-gray-700/50 rounded-xl shadow-2xl w-full max-w-md">
        <div className="flex items-center justify-between p-6 border-b border-gray-700/50">
          <div className="flex items-center space-x-2">
            <FolderPlus className="h-6 w-6 text-blue-400" />
            <h2 className="text-xl font-semibold text-white">Nuevo Proyecto</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Tipo de Proyecto */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-3">
              Tipo de Proyecto
            </label>
            <div className="grid grid-cols-1 gap-3">
              <button
                type="button"
                onClick={() => setProjectType('manual')}
                className={`p-3 rounded-lg border-2 transition-all duration-200 text-left ${
                  projectType === 'manual'
                    ? 'border-blue-400 bg-blue-500/20 text-white'
                    : 'border-gray-600/50 bg-white/5 text-gray-300 hover:border-gray-500'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <FolderPlus className="h-5 w-5" />
                  <div>
                    <div className="font-medium">Proyecto Manual</div>
                    <div className="text-xs text-gray-400">Crear proyecto desde cero con configuración manual</div>
                  </div>
                </div>
              </button>
              
              <button
                type="button"
                onClick={() => setProjectType('generate')}
                className={`p-3 rounded-lg border-2 transition-all duration-200 text-left ${
                  projectType === 'generate'
                    ? 'border-purple-400 bg-purple-500/20 text-white'
                    : 'border-gray-600/50 bg-white/5 text-gray-300 hover:border-gray-500'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <Zap className="h-5 w-5" />
                  <div>
                    <div className="font-medium">Generar con IA</div>
                    <div className="text-xs text-gray-400">Generar estructura y código automáticamente</div>
                  </div>
                </div>
              </button>
              
              <button
                type="button"
                onClick={() => setProjectType('bolt')}
                className={`p-3 rounded-lg border-2 transition-all duration-200 text-left ${
                  projectType === 'bolt'
                    ? 'border-green-400 bg-green-500/20 text-white'
                    : 'border-gray-600/50 bg-white/5 text-gray-300 hover:border-gray-500'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <ExternalLink className="h-5 w-5" />
                  <div>
                    <div className="font-medium">Usar Bolt.new</div>
                    <div className="text-xs text-gray-400">Abrir bolt.new para desarrollo rápido</div>
                  </div>
                </div>
              </button>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Nombre del Proyecto
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3 py-2 bg-white/10 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-400 focus:border-transparent backdrop-blur-sm transition-all duration-200"
              placeholder="Ej: Mi aplicación increíble"
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
              placeholder="Describe brevemente tu proyecto... (mínimo 10 caracteres)"
              required
              minLength={10}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              URL del Repositorio GitHub (opcional)
            </label>
            <input
              type="url"
              value={formData.githubUrl}
              onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
              className="w-full px-3 py-2 bg-white/10 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-400 focus:border-transparent backdrop-blur-sm transition-all duration-200"
              placeholder="https://github.com/usuario/repositorio"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Estado Inicial
            </label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
              className="w-full px-3 py-2 bg-white/10 border border-gray-600/50 rounded-lg text-white focus:ring-2 focus:ring-blue-400 focus:border-transparent backdrop-blur-sm transition-all duration-200"
            >
              <option value="planning">Planificación</option>
              <option value="development">Desarrollo</option>
              <option value="testing">Pruebas</option>
              <option value="deployed">Desplegado</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Color del Proyecto
            </label>
            <div className="flex space-x-2">
              {colors.map((color) => (
                <button
                  key={color}
                  type="button"
                  onClick={() => setFormData({ ...formData, color })}
                  className={`w-8 h-8 rounded-full border-2 transition-all duration-200 ${
                    formData.color === color ? 'border-white scale-110 shadow-lg' : 'border-gray-500/50'
                  }`}
                  style={{ backgroundColor: color }}
                />
              ))}
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
              className={`flex-1 px-4 py-2 rounded-lg backdrop-blur-sm transition-all duration-200 shadow-lg ${
                projectType === 'generate'
                  ? 'bg-gradient-to-r from-purple-500 to-pink-600 text-white hover:from-purple-600 hover:to-pink-700'
                  : projectType === 'bolt'
                  ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:from-green-600 hover:to-emerald-700'
                  : 'bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700'
              }`}
            >
              {projectType === 'generate' ? 'Generar Proyecto' : projectType === 'bolt' ? 'Abrir Bolt.new' : 'Crear Proyecto'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}