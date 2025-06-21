import React, { useState } from 'react';
import { Plus, RefreshCw, Edit3, BookOpen } from 'lucide-react';
import { AppPage, UserStory } from '../../types';
import UserStoryCard from '../UserStoryCard';

interface PagesViewProps {
  currentProject: any;
  userStoryColumns: Array<{
    id: string;
    title: string;
    color: string;
  }>;
  getUserStoriesByStatus: (pageId: string, status: UserStory['status']) => UserStory[];
  handleDragOver: (e: React.DragEvent) => void;
  handleDrop: (e: React.DragEvent, newStatus: string) => void;
  handleDragStart: (e: React.DragEvent, itemId: string, itemType: 'page' | 'userStory', pageId?: string) => void;
  openUserStoryModal: (pageId: string) => void;
  handleOpenIaGenerateModal: (pageId: string) => void;
  handleOpenEditPageDescriptionModal: (page: AppPage) => void;
  handleEditUserStory: (pageId: string, userStory: UserStory) => void;
  handleDeleteUserStory: (pageId: string, userStoryId: string) => void;
  handleToggleUserStoryComplete: (pageId: string, userStoryId: string, completed: boolean) => void;
  onExecuteCompletedStories?: (pageId: string) => void;
  setIsPageModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleEditPage?: (page: AppPage) => void;
}

export default function PagesView({
  currentProject,
  userStoryColumns,
  getUserStoriesByStatus,
  handleDragOver,
  handleDrop,
  handleDragStart,
  openUserStoryModal,
  handleOpenIaGenerateModal,
  handleOpenEditPageDescriptionModal,
  handleEditUserStory,
  handleDeleteUserStory,
  handleToggleUserStoryComplete,
  onExecuteCompletedStories,
  setIsPageModalOpen,
  handleEditPage
}: PagesViewProps) {
  const [completedStories, setCompletedStories] = useState<Set<string>>(new Set());

  const handleToggleComplete = (pageId: string, userStoryId: string, completed: boolean) => {
    setCompletedStories(prev => {
      const newSet = new Set(prev);
      if (completed) {
        newSet.add(userStoryId);
      } else {
        newSet.delete(userStoryId);
      }
      return newSet;
    });
    
    // También llamar a la función original si existe
    if (handleToggleUserStoryComplete) {
      handleToggleUserStoryComplete(pageId, userStoryId, completed);
    }
  };

  const executeCompletedStories = (pageId: string) => {
    const page = currentProject.pages.find((p: AppPage) => p.id === pageId);
    if (!page) return;
    
    const completedStoriesInPage = (page.userStories || []).filter((story: UserStory) => completedStories.has(story.id));
    
    if (completedStoriesInPage.length === 0) {
      alert('No hay historias marcadas como completadas en esta página.');
      return;
    }
    
    const confirmed = window.confirm(`¿Estás seguro de que quieres ejecutar ${completedStoriesInPage.length} historia(s) marcada(s) como completada(s)?`);
    
    if (confirmed && onExecuteCompletedStories) {
      onExecuteCompletedStories(pageId);
      alert(`Se han ejecutado ${completedStoriesInPage.length} historia(s) marcada(s) como completada(s).`);
    }
  };
  return (
    <div className="grid grid-cols-1 gap-8 pb-8">
      {currentProject.pages.map((page: AppPage) => (
        <div key={page.id} className="bg-white/10 backdrop-blur-lg rounded-xl shadow-lg border border-white/20">
          <div className="p-6 border-b border-white/20">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-lg font-semibold text-white">{page.name} - Historias de Usuario</h4>
              <div className="flex space-x-2">
                <button
                  onClick={() => openUserStoryModal(page.id)}
                  className="flex items-center space-x-1 px-3 py-1.5 bg-indigo-500/20 backdrop-blur-sm text-indigo-300 border border-indigo-400/30 rounded-md hover:bg-indigo-500/30 transition-colors text-xs"
                >
                  <Plus className="h-3.5 w-3.5" />
                  <span>Nueva Historia</span>
                </button>
                {currentProject.githubUrl && (
                  <button
                    onClick={() => handleOpenIaGenerateModal(page.id)}
                    className="flex items-center space-x-1 px-3 py-1.5 bg-blue-500/20 backdrop-blur-sm text-blue-300 border border-blue-400/30 rounded-md hover:bg-blue-500/30 transition-colors text-xs"
                    title="Configurar generación de historias con IA para esta página"
                  >
                    <RefreshCw className="h-3.5 w-3.5" />
                    <span>Generar Historias con IA</span>
                  </button>
                )}
                {handleEditPage && (
                  <button
                    onClick={() => handleEditPage(page)}
                    className="flex items-center space-x-1 px-3 py-1.5 bg-purple-500/20 backdrop-blur-sm text-purple-300 border border-purple-400/30 rounded-md hover:bg-purple-500/30 transition-colors text-xs"
                    title="Editar página completa"
                  >
                    <Edit3 className="h-3.5 w-3.5" />
                    <span>Editar Página</span>
                  </button>
                )}
                <button
                  onClick={() => handleOpenEditPageDescriptionModal(page)}
                  className="flex items-center space-x-1 px-3 py-1.5 bg-yellow-500/20 backdrop-blur-sm text-yellow-300 border border-yellow-400/30 rounded-md hover:bg-yellow-500/30 transition-colors text-xs"
                  title="Editar solo la descripción de la página"
                >
                  <Edit3 className="h-3.5 w-3.5" />
                  <span>Editar Descripción</span>
                </button>
                <button
                  onClick={() => executeCompletedStories(page.id)}
                  className="flex items-center space-x-1 px-3 py-1.5 bg-green-500/20 backdrop-blur-sm text-green-300 border border-green-400/30 rounded-md hover:bg-green-500/30 transition-colors text-xs"
                  title="Ejecutar todas las historias completadas"
                >
                  <RefreshCw className="h-3.5 w-3.5" />
                  <span>Ejecutar Completadas</span>
                </button>
              </div>
            </div>
            <p className="text-gray-300 text-sm">{page.description}</p>
            <p className="text-gray-400 text-xs mt-1">Ruta: {page.route}</p>
          </div>

          <div className="p-6">
            {page.userStories && page.userStories.length > 0 ? (
              <div className="mb-4">
                {/* Aquí podrías agregar estadísticas o información adicional */}
              </div>
            ) : (
              <p className="text-sm text-gray-300 mb-4">No hay historias de usuario para esta página.</p>
            )}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {userStoryColumns.map((column) => {
                const columnStories = getUserStoriesByStatus(page.id, column.id as UserStory['status']);
                
                return (
                  <div key={column.id} className="flex flex-col">
                    <div className={`rounded-lg border-2 border-dashed ${column.color} min-h-[400px]`}>
                      <div className="p-3 border-b border-white/20 bg-white/10 backdrop-blur-lg rounded-t-lg">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium text-white text-sm">{column.title}</h4>
                          <span className="bg-white/20 backdrop-blur-sm text-gray-300 border border-white/30 text-xs px-2 py-1 rounded-full">
                            {columnStories.length}
                          </span>
                        </div>
                      </div>
                      
                      <div 
                        className="p-3 space-y-3 min-h-[300px]"
                        onDragOver={handleDragOver}
                        onDrop={(e) => handleDrop(e, column.id)}
                      >
                        {columnStories.map((userStory) => (
                          <div
                            key={userStory.id}
                            draggable
                            onDragStart={(e) => handleDragStart(e, userStory.id, 'userStory', page.id)}
                            className="cursor-move"
                          >
                            <UserStoryCard 
                              userStory={userStory} 
                              onEdit={(story) => handleEditUserStory(page.id, story)}
                              onDelete={(storyId) => handleDeleteUserStory(page.id, storyId)}
                              onToggleComplete={(storyId, completed) => handleToggleComplete(page.id, storyId, completed)}
                              isCompleted={completedStories.has(userStory.id)}
                            />
                          </div>
                        ))}
                        
                        {columnStories.length === 0 && (
                          <div className="text-center py-8 text-gray-300">
                            <BookOpen className="h-8 w-8 mx-auto mb-2 opacity-50" />
                            <p className="text-xs">Arrastra historias aquí</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      ))}

      {currentProject.pages.length === 0 && (
        <div className="text-center py-16">
          <BookOpen className="h-16 w-16 mx-auto text-gray-400 mb-4" />
          <h3 className="text-xl font-medium text-white mb-2">No hay páginas</h3>
          <p className="text-gray-300 mb-6">Comienza creando tu primera página para organizar las historias de usuario</p>
          <button
            onClick={() => setIsPageModalOpen(true)}
            className="bg-blue-500/20 backdrop-blur-sm text-blue-300 border border-blue-400/30 px-6 py-3 rounded-lg hover:bg-blue-500/30 transition-all duration-200 shadow-lg"
          >
            Crear Primera Página
          </button>
        </div>
      )}
    </div>
  );
}