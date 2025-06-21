import React from 'react';
import { FolderTree } from 'lucide-react';
import { FileNode } from '../../types';
import FileTreeNode from '../FileTreeNode';

interface StructureViewProps {
  currentProject: any;
  fileStats: {
    files: number;
    folders: number;
    completed: number;
    pending: number;
  };
  handleEditFile: (file: FileNode) => void;
  handleDeleteFile: (fileId: string) => void;
  handleAddChildFile: (parentNode: FileNode) => void;
  setIsFileModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function StructureView({
  currentProject,
  fileStats,
  handleEditFile,
  handleDeleteFile,
  handleAddChildFile,
  setIsFileModalOpen
}: StructureViewProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 pb-8">
      <div className="lg:col-span-3">
        <div className="bg-white/10 backdrop-blur-lg rounded-xl shadow-lg border border-white/20">
          <div className="p-6 border-b border-white/20">
            <h3 className="text-xl font-semibold text-white mb-2">Estructura del Proyecto</h3>
            <p className="text-gray-300 text-sm">Organización de archivos y carpetas del proyecto</p>
          </div>
          <div className="p-6">
            {currentProject.fileStructure && currentProject.fileStructure.length > 0 ? (
              <div className="space-y-1">
                {currentProject.fileStructure.map((node: FileNode) => (
                  <FileTreeNode
                    key={node.id}
                    node={node}
                    level={0}
                    onEdit={handleEditFile}
                    onDelete={handleDeleteFile}
                    onAddChild={handleAddChildFile}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <FolderTree className="h-16 w-16 mx-auto text-gray-400 mb-4" />
                <h3 className="text-xl font-medium text-white mb-2">No hay archivos</h3>
                <p className="text-gray-300 mb-6">Comienza creando la estructura de archivos de tu proyecto</p>
                <button
                  onClick={() => setIsFileModalOpen(true)}
                  className="bg-blue-500/20 backdrop-blur-sm text-blue-300 border border-blue-400/30 px-6 py-3 rounded-lg hover:bg-blue-500/30 transition-all duration-200 shadow-lg"
                >
                  Crear Primer Archivo
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="space-y-6">
        {/* File Statistics */}
        <div className="bg-white/10 backdrop-blur-lg rounded-xl shadow-lg border border-white/20 p-6">
          <h4 className="text-lg font-semibold text-white mb-4">Estadísticas</h4>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-300">Archivos</span>
              <span className="font-semibold text-white">{fileStats.files}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-300">Carpetas</span>
              <span className="font-semibold text-white">{fileStats.folders}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-green-400">Completados</span>
              <span className="font-semibold text-green-400">{fileStats.completed}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-yellow-400">Pendientes</span>
              <span className="font-semibold text-yellow-400">{fileStats.pending}</span>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white/10 backdrop-blur-lg rounded-xl shadow-lg border border-white/20 p-6">
          <h4 className="text-lg font-semibold text-white mb-4">Acciones Rápidas</h4>
          <div className="space-y-3">
            <button
              onClick={() => setIsFileModalOpen(true)}
              className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-blue-500/20 backdrop-blur-sm text-blue-300 border border-blue-400/30 rounded-lg hover:bg-blue-500/30 transition-all duration-200"
            >
              <FolderTree className="h-4 w-4" />
              <span>Nuevo Archivo/Carpeta</span>
            </button>
          </div>
        </div>

        {/* Progress Overview */}
        <div className="bg-white/10 backdrop-blur-lg rounded-xl shadow-lg border border-white/20 p-6">
          <h4 className="text-lg font-semibold text-white mb-4">Progreso</h4>
          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-300">Completado</span>
                <span className="text-white">
                  {fileStats.files > 0 ? Math.round((fileStats.completed / fileStats.files) * 100) : 0}%
                </span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div 
                  className="bg-green-500 h-2 rounded-full transition-all duration-300"
                  style={{ 
                    width: `${fileStats.files > 0 ? (fileStats.completed / fileStats.files) * 100 : 0}%` 
                  }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}