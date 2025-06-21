import React, { useState } from 'react';
import { Plus, AlertTriangle, RefreshCw, Edit3, BookOpen } from 'lucide-react';
import { AppPage, UserStory } from '../../types';
import UserStoryCard from '../UserStoryCard';

interface KanbanViewProps {
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
  setIsPageModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

// Helper function to get all user stories by status across all pages
const getAllUserStoriesByStatus = (project: any, status: UserStory['status']): UserStory[] => {
  return project.pages.flatMap((page: AppPage) => 
    (page.userStories || []).filter((story: UserStory) => story.status === status)
  );
};

// Helper function to find the page ID for a user story
const findPageIdForUserStory = (project: any, userStoryId: string): string | null => {
  for (const page of project.pages) {
    if (page.userStories?.some((story: UserStory) => story.id === userStoryId)) {
      return page.id;
    }
  }
  return null;
};

export default function KanbanView({
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
  setIsPageModalOpen
}: KanbanViewProps) {
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
  // Get all user stories across all pages
  const allUserStories = currentProject.pages.flatMap((page: AppPage) => page.userStories || []);
  const totalStories = allUserStories.length;

  return (
    <div className="pb-8">
      {/* Header with actions */}
      <div className="bg-white/10 backdrop-blur-lg rounded-xl shadow-lg border border-white/20 mb-6">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-xl font-semibold text-white mb-2">Tablero Kanban</h3>
              <p className="text-gray-300 text-sm">
                Gestiona todas las historias de usuario del proyecto ({totalStories} historias)
              </p>
            </div>
            <div className="flex space-x-2">
              {currentProject.pages.length > 0 && (
                <>
                  <button
                    onClick={() => openUserStoryModal(currentProject.pages[0].id)}
                    className="flex items-center space-x-2 px-4 py-2 bg-indigo-500/20 backdrop-blur-sm text-indigo-300 border border-indigo-400/30 rounded-lg hover:bg-indigo-500/30 transition-colors"
                  >
                    <Plus className="h-4 w-4" />
                    <span>Nueva Historia</span>
                  </button>
                  {currentProject.githubUrl && (
                    <button
                      onClick={() => handleOpenIaGenerateModal(currentProject.pages[0].id)}
                      className="flex items-center space-x-2 px-4 py-2 bg-blue-500/20 backdrop-blur-sm text-blue-300 border border-blue-400/30 rounded-lg hover:bg-blue-500/30 transition-colors"
                      title="Generar historias con IA"
                    >
                      <RefreshCw className="h-4 w-4" />
                      <span>Generar con IA</span>
                    </button>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Kanban Board */}
      {totalStories > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {userStoryColumns.map((column) => {
            const columnStories = getAllUserStoriesByStatus(currentProject, column.id as UserStory['status']);
            
            return (
              <div key={column.id} className="flex flex-col">
                <div className={`rounded-lg border-2 border-dashed ${column.color} min-h-[600px] bg-white/5 backdrop-blur-sm`}>
                  <div className="p-4 border-b border-white/20 bg-white/10 backdrop-blur-lg rounded-t-lg">
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold text-white">{column.title}</h4>
                      <span className="bg-white/20 backdrop-blur-sm text-gray-300 border border-white/30 text-sm px-3 py-1 rounded-full">
                        {columnStories.length}
                      </span>
                    </div>
                  </div>
                  
                  <div 
                    className="p-4 space-y-4 min-h-[500px]"
                    onDragOver={handleDragOver}
                    onDrop={(e) => handleDrop(e, column.id)}
                  >
                    {columnStories.map((userStory) => {
                      const pageId = findPageIdForUserStory(currentProject, userStory.id);
                      
                      return (
                        <div
                          key={userStory.id}
                          draggable
                          onDragStart={(e) => handleDragStart(e, userStory.id, 'userStory', pageId || '')}
                          className="cursor-move"
                        >
                          <UserStoryCard 
                            userStory={userStory} 
                            onEdit={(story) => handleEditUserStory(pageId || '', story)}
                            onDelete={(storyId) => handleDeleteUserStory(pageId || '', storyId)}
                            onToggleComplete={(storyId, completed) => handleToggleComplete(pageId || '', storyId, completed)}
                            isCompleted={completedStories.has(userStory.id)}
                            showPageInfo={true}
                            pageTitle={currentProject.pages.find((p: AppPage) => p.id === pageId)?.title || 'Página desconocida'}
                          />
                        </div>
                      );
                    })}
                    
                    {columnStories.length === 0 && (
                      <div className="text-center py-12 text-gray-300">
                        <BookOpen className="h-12 w-12 mx-auto mb-3 opacity-50" />
                        <p className="text-sm">Arrastra historias aquí</p>
                        <p className="text-xs text-gray-400 mt-1">o crea una nueva historia</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-16">
          <BookOpen className="h-16 w-16 mx-auto text-gray-400 mb-4" />
          <h3 className="text-xl font-medium text-white mb-2">No hay historias de usuario</h3>
          <p className="text-gray-300 mb-6">
            {currentProject.pages.length === 0 
              ? 'Comienza creando tu primera página para organizar las historias de usuario'
              : 'Comienza creando historias de usuario para gestionar las tareas del proyecto'
            }
          </p>
          {currentProject.pages.length === 0 ? (
            <button
              onClick={() => setIsPageModalOpen(true)}
              className="bg-blue-500/20 backdrop-blur-sm text-blue-300 border border-blue-400/30 px-6 py-3 rounded-lg hover:bg-blue-500/30 transition-all duration-200 shadow-lg"
            >
              Crear Primera Página
            </button>
          ) : (
            <button
              onClick={() => openUserStoryModal(currentProject.pages[0].id)}
              className="bg-indigo-500/20 backdrop-blur-sm text-indigo-300 border border-indigo-400/30 px-6 py-3 rounded-lg hover:bg-indigo-500/30 transition-all duration-200 shadow-lg"
            >
              Crear Primera Historia
            </button>
          )}
        </div>
      )}
    </div>
  );
}