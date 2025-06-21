import React from 'react';
import { Calendar, Clock } from 'lucide-react';
import { AppPage } from '../../types';

interface TimelineViewProps {
  currentProject: any;
  weeks: Array<{
    start: Date;
    end: Date;
    label: string;
  }>;
  handleTimelineDragStart: (e: React.DragEvent, pageId: string) => void;
  handleTimelineDragOver: (e: React.DragEvent) => void;
  handleTimelineDrop: (e: React.DragEvent, weekIndex: number) => void;
  setIsPageModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function TimelineView({
  currentProject,
  weeks,
  handleTimelineDragStart,
  handleTimelineDragOver,
  handleTimelineDrop,
  setIsPageModalOpen
}: TimelineViewProps) {
  const getPagesByWeek = (weekIndex: number) => {
    return currentProject.pages.filter((page: AppPage) => page.weekIndex === weekIndex);
  };

  const getUnassignedPages = () => {
    return currentProject.pages.filter((page: AppPage) => page.weekIndex === undefined || page.weekIndex === null);
  };

  return (
    <div className="pb-8">
      <div className="bg-white/10 backdrop-blur-lg rounded-xl shadow-lg border border-white/20">
        <div className="p-6 border-b border-white/20">
          <h3 className="text-xl font-semibold text-white mb-2">Timeline del Proyecto</h3>
          <p className="text-gray-300 text-sm">Planifica y organiza las páginas a lo largo del tiempo</p>
        </div>
        
        <div className="p-6">
          {/* Week Headers */}
          <div className="grid grid-cols-4 gap-4 mb-6">
            {weeks.map((week, index) => (
              <div key={index} className="text-center">
                <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3 border border-white/30">
                  <h4 className="font-semibold text-white text-sm mb-1">{week.label}</h4>
                  <p className="text-xs text-gray-300">
                    {week.start.toLocaleDateString('es-ES', { month: 'short', day: 'numeric' })} - 
                    {week.end.toLocaleDateString('es-ES', { month: 'short', day: 'numeric' })}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Timeline Grid */}
          <div className="grid grid-cols-4 gap-4 mb-8">
            {weeks.map((week, weekIndex) => {
              const weekPages = getPagesByWeek(weekIndex);
              
              return (
                <div
                  key={weekIndex}
                  className="min-h-[300px] bg-white/5 backdrop-blur-sm rounded-lg border-2 border-dashed border-white/20 p-4"
                  onDragOver={handleTimelineDragOver}
                  onDrop={(e) => handleTimelineDrop(e, weekIndex)}
                >
                  <div className="space-y-3">
                    {weekPages.map((page: AppPage) => (
                      <div
                        key={page.id}
                        draggable
                        onDragStart={(e) => handleTimelineDragStart(e, page.id)}
                        className="bg-white/10 backdrop-blur-lg rounded-lg p-3 border border-white/20 cursor-move hover:bg-white/20 transition-all duration-200 shadow-lg"
                      >
                        <h5 className="font-medium text-white text-sm mb-1">{page.name}</h5>
                        <p className="text-xs text-gray-300 mb-2">{page.route}</p>
                        <div className="flex items-center justify-between">
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            page.status === 'done' ? 'bg-green-500/20 text-green-300 border border-green-400/30' :
                            page.status === 'in-progress' ? 'bg-yellow-500/20 text-yellow-300 border border-yellow-400/30' :
                            'bg-gray-500/20 text-gray-300 border border-gray-400/30'
                          }`}>
                            {page.status === 'done' ? 'Completada' :
                             page.status === 'in-progress' ? 'En Progreso' : 'Pendiente'}
                          </span>
                          {page.userStories && (
                            <span className="text-xs text-gray-400">
                              {page.userStories.length} historias
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                    
                    {weekPages.length === 0 && (
                      <div className="text-center py-8 text-gray-400">
                        <Calendar className="h-8 w-8 mx-auto mb-2 opacity-50" />
                        <p className="text-xs">Arrastra páginas aquí</p>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Unassigned Pages */}
          <div className="bg-white/10 backdrop-blur-lg rounded-xl border border-white/20">
            <div className="p-4 border-b border-white/20">
              <h4 className="font-semibold text-white flex items-center space-x-2">
                <Clock className="h-4 w-4" />
                <span>Páginas Sin Asignar</span>
                <span className="bg-white/20 backdrop-blur-sm text-gray-300 border border-white/30 text-xs px-2 py-1 rounded-full">
                  {getUnassignedPages().length}
                </span>
              </h4>
            </div>
            <div className="p-4">
              {getUnassignedPages().length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {getUnassignedPages().map((page: AppPage) => (
                    <div
                      key={page.id}
                      draggable
                      onDragStart={(e) => handleTimelineDragStart(e, page.id)}
                      className="bg-white/10 backdrop-blur-lg rounded-lg p-3 border border-white/20 cursor-move hover:bg-white/20 transition-all duration-200 shadow-lg"
                    >
                      <h5 className="font-medium text-white text-sm mb-1">{page.name}</h5>
                      <p className="text-xs text-gray-300 mb-2">{page.route}</p>
                      <div className="flex items-center justify-between">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          page.status === 'done' ? 'bg-green-500/20 text-green-300 border border-green-400/30' :
                          page.status === 'in-progress' ? 'bg-yellow-500/20 text-yellow-300 border border-yellow-400/30' :
                          'bg-gray-500/20 text-gray-300 border border-gray-400/30'
                        }`}>
                          {page.status === 'done' ? 'Completada' :
                           page.status === 'in-progress' ? 'En Progreso' : 'Pendiente'}
                        </span>
                        {page.userStories && (
                          <span className="text-xs text-gray-400">
                            {page.userStories.length} historias
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-400">
                  <Calendar className="h-8 w-8 mx-auto mb-2 opacity-50" />
                  <p className="text-sm">Todas las páginas están asignadas a semanas</p>
                </div>
              )}
            </div>
          </div>

          {currentProject.pages.length === 0 && (
            <div className="text-center py-16">
              <Calendar className="h-16 w-16 mx-auto text-gray-400 mb-4" />
              <h3 className="text-xl font-medium text-white mb-2">No hay páginas</h3>
              <p className="text-gray-300 mb-6">Comienza creando páginas para planificar tu timeline</p>
              <button
                onClick={() => setIsPageModalOpen(true)}
                className="bg-blue-500/20 backdrop-blur-sm text-blue-300 border border-blue-400/30 px-6 py-3 rounded-lg hover:bg-blue-500/30 transition-all duration-200 shadow-lg"
              >
                Crear Primera Página
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}