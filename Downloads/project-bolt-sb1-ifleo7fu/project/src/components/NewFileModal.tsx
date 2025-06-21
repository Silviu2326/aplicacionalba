import React, { useState } from 'react';
import { X, File, Folder, Code } from 'lucide-react';
import { FileNode } from '../types';

interface NewFileModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (fileNode: Omit<FileNode, 'id'>) => void;
  parentNode?: FileNode;
  initialFile?: FileNode;
}

const fileTemplates = [
  { name: 'Componente React', extension: 'tsx', type: 'file' as const },
  { name: 'Página React', extension: 'tsx', type: 'file' as const },
  { name: 'Hook personalizado', extension: 'ts', type: 'file' as const },
  { name: 'Archivo de estilos', extension: 'css', type: 'file' as const },
  { name: 'Archivo de configuración', extension: 'json', type: 'file' as const },
  { name: 'Documentación', extension: 'md', type: 'file' as const },
  { name: 'Carpeta', extension: '', type: 'folder' as const },
];

export default function NewFileModal({ isOpen, onClose, onSubmit, parentNode, initialFile }: NewFileModalProps) {
  const [formData, setFormData] = useState({
    name: initialFile?.name || '',
    type: initialFile?.type || 'file' as const,
    extension: initialFile?.extension || '',
    description: initialFile?.description || '',
    status: initialFile?.status || 'pending' as const,
    size: initialFile?.size || 0,
  });

  React.useEffect(() => {
    if (initialFile) {
      setFormData({
        name: initialFile.name,
        type: initialFile.type,
        extension: initialFile.extension || '',
        description: initialFile.description || '',
        status: initialFile.status || 'pending',
        size: initialFile.size || 0,
      });
    } else {
      setFormData({
        name: '',
        type: 'file',
        extension: '',
        description: '',
        status: 'pending',
        size: 0,
      });
    }
  }, [initialFile]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name.trim()) {
      const path = parentNode ? `${parentNode.path}/${formData.name}` : formData.name;
      
      onSubmit({
        ...formData,
        path,
        children: formData.type === 'folder' ? [] : undefined,
        lastModified: new Date(),
      });
      
      setFormData({ 
        name: '', 
        type: 'file', 
        extension: '', 
        description: '', 
        status: 'pending',
        size: 0
      });
      onClose();
    }
  };

  const handleTemplateSelect = (template: typeof fileTemplates[0]) => {
    setFormData({
      ...formData,
      name: formData.name || template.name.toLowerCase().replace(/\s+/g, '-'),
      type: template.type,
      extension: template.extension,
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-gray-900/80 backdrop-blur-xl border border-white/20 rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-white/20">
          <div className="flex items-center space-x-2">
            <Code className="h-6 w-6 text-blue-400" />
            <h2 className="text-xl font-semibold text-white">
              {initialFile ? 'Editar Archivo/Carpeta' : 'Nuevo Archivo/Carpeta'}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {!initialFile && (
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-3">
                Plantillas Rápidas
              </label>
              <div className="grid grid-cols-2 gap-2">
                {fileTemplates.map((template, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => handleTemplateSelect(template)}
                    className="flex items-center space-x-2 p-3 text-left border border-white/20 bg-white/5 backdrop-blur-sm rounded-lg hover:border-blue-400/50 hover:bg-blue-500/20 transition-all duration-200"
                  >
                    {template.type === 'folder' ? (
                      <Folder className="h-4 w-4 text-blue-400" />
                    ) : (
                      <File className="h-4 w-4 text-gray-400" />
                    )}
                    <span className="text-sm text-white">{template.name}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Nombre
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400/50 transition-all duration-200"
                placeholder="nombre-del-archivo"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Tipo
              </label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value as 'file' | 'folder' })}
                className="w-full px-3 py-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400/50 transition-all duration-200"
              >
                <option value="file" className="bg-gray-800 text-white">Archivo</option>
                <option value="folder" className="bg-gray-800 text-white">Carpeta</option>
              </select>
            </div>
          </div>

          {formData.type === 'file' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Extensión
                </label>
                <input
                  type="text"
                  value={formData.extension}
                  onChange={(e) => setFormData({ ...formData, extension: e.target.value })}
                  className="w-full px-3 py-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400/50 transition-all duration-200"
                  placeholder="tsx, css, json..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Tamaño (KB)
                </label>
                <input
                  type="number"
                  min="0"
                  value={formData.size}
                  onChange={(e) => setFormData({ ...formData, size: parseInt(e.target.value) || 0 })}
                  className="w-full px-3 py-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400/50 transition-all duration-200"
                  placeholder="0"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Descripción
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={3}
              className="w-full px-3 py-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400/50 transition-all duration-200"
              placeholder="Describe la funcionalidad de este archivo..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Estado
            </label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
              className="w-full px-3 py-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400/50 transition-all duration-200"
            >
              <option value="pending" className="bg-gray-800 text-white">Pendiente</option>
              <option value="created" className="bg-gray-800 text-white">Creado</option>
              <option value="modified" className="bg-gray-800 text-white">Modificado</option>
              <option value="completed" className="bg-gray-800 text-white">Completado</option>
            </select>
          </div>

          {parentNode && (
            <div className="bg-white/5 backdrop-blur-sm border border-white/20 p-3 rounded-lg">
              <p className="text-sm text-gray-300">
                <span className="font-medium text-white">Ubicación:</span> {parentNode.path}/
              </p>
            </div>
          )}

          <div className="flex space-x-3 pt-4 border-t border-white/20">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 text-gray-300 bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 hover:text-white rounded-lg transition-all duration-200"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-blue-600/80 backdrop-blur-sm border border-blue-400/50 text-white hover:bg-blue-500/90 hover:border-blue-300/70 rounded-lg transition-all duration-200"
            >
              {initialFile ? 'Actualizar' : 'Crear'} {formData.type === 'folder' ? 'Carpeta' : 'Archivo'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}