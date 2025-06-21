import React from 'react';
import { GitBranch, AlertTriangle, CheckCircle, Clock, Database, Code, Globe } from 'lucide-react';
import { AppPage } from '../../types';

interface DependenciesViewProps {
  currentProject: any;
  dependencyAnalysis: {
    orphanedRoutes: string[];
    totalEndpoints: number;
    pageConnections: Array<{
      from: string;
      to: string;
      type: 'navigation' | 'api' | 'component';
    }>;
  };
}

export default function DependenciesView({
  currentProject,
  dependencyAnalysis
}: DependenciesViewProps) {
  const getPagesByStatus = (status: string) => {
    return currentProject.pages.filter((page: AppPage) => page.status === status);
  };

  const completedPages = getPagesByStatus('done');
  const inProgressPages = getPagesByStatus('in-progress');
  const pendingPages = getPagesByStatus('todo');

  const getConnectionIcon = (type: string) => {
    switch (type) {
      case 'navigation':
        return <Globe className="h-4 w-4" />;
      case 'api':
        return <Database className="h-4 w-4" />;
      case 'component':
        return <Code className="h-4 w-4" />;
      default:
        return <GitBranch className="h-4 w-4" />;
    }
  };

  const getConnectionColor = (type: string) => {
    switch (type) {
      case 'navigation':
        return 'text-blue-400 bg-blue-500/20 border-blue-400/30';
      case 'api':
        return 'text-green-400 bg-green-500/20 border-green-400/30';
      case 'component':
        return 'text-purple-400 bg-purple-500/20 border-purple-400/30';
      default:
        return 'text-gray-400 bg-gray-500/20 border-gray-400/30';
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pb-8">
      {/* Summary Cards */}
      <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white/10 backdrop-blur-lg rounded-xl shadow-lg border border-white/20 p-6">
          <div className="flex items-center space-x-3">
            <CheckCircle className="h-8 w-8 text-green-400" />
            <div>
              <p className="text-2xl font-bold text-white">{completedPages.length}</p>
              <p className="text-sm text-gray-300">Completadas</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white/10 backdrop-blur-lg rounded-xl shadow-lg border border-white/20 p-6">
          <div className="flex items-center space-x-3">
            <Clock className="h-8 w-8 text-yellow-400" />
            <div>
              <p className="text-2xl font-bold text-white">{inProgressPages.length}</p>
              <p className="text-sm text-gray-300">En Progreso</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white/10 backdrop-blur-lg rounded-xl shadow-lg border border-white/20 p-6">
          <div className="flex items-center space-x-3">
            <AlertTriangle className="h-8 w-8 text-red-400" />
            <div>
              <p className="text-2xl font-bold text-white">{dependencyAnalysis.orphanedRoutes.length}</p>
              <p className="text-sm text-gray-300">Rutas Huérfanas</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white/10 backdrop-blur-lg rounded-xl shadow-lg border border-white/20 p-6">
          <div className="flex items-center space-x-3">
            <Database className="h-8 w-8 text-blue-400" />
            <div>
              <p className="text-2xl font-bold text-white">{dependencyAnalysis.totalEndpoints}</p>
              <p className="text-sm text-gray-300">Total Endpoints</p>
            </div>
          </div>
        </div>
      </div>

      {/* Dependency Graph */}
      <div className="lg:col-span-2">
        <div className="bg-white/10 backdrop-blur-lg rounded-xl shadow-lg border border-white/20">
          <div className="p-6 border-b border-white/20">
            <h3 className="text-xl font-semibold text-white mb-2">Grafo de Dependencias</h3>
            <p className="text-gray-300 text-sm">Relaciones entre páginas, APIs y componentes</p>
          </div>
          <div className="p-6">
            {dependencyAnalysis.pageConnections.length > 0 ? (
              <div className="space-y-4">
                {dependencyAnalysis.pageConnections.map((connection, index) => (
                  <div key={index} className="flex items-center space-x-4 p-4 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <span className="font-medium text-white text-sm">{connection.from}</span>
                        <GitBranch className="h-4 w-4 text-gray-400" />
                        <span className="font-medium text-white text-sm">{connection.to}</span>
                      </div>
                    </div>
                    <div className={`flex items-center space-x-2 px-3 py-1 rounded-full border ${getConnectionColor(connection.type)}`}>
                      {getConnectionIcon(connection.type)}
                      <span className="text-xs font-medium capitalize">{connection.type}</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <GitBranch className="h-16 w-16 mx-auto text-gray-400 mb-4" />
                <h3 className="text-xl font-medium text-white mb-2">No hay dependencias</h3>
                <p className="text-gray-300">Las dependencias aparecerán aquí cuando se definan conexiones entre páginas</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Orphaned Routes & Issues */}
      <div className="space-y-6">
        {/* Orphaned Routes */}
        <div className="bg-white/10 backdrop-blur-lg rounded-xl shadow-lg border border-white/20">
          <div className="p-6 border-b border-white/20">
            <h4 className="text-lg font-semibold text-white mb-2 flex items-center space-x-2">
              <AlertTriangle className="h-5 w-5 text-red-400" />
              <span>Rutas Huérfanas</span>
            </h4>
            <p className="text-gray-300 text-sm">Rutas sin páginas asociadas</p>
          </div>
          <div className="p-6">
            {dependencyAnalysis.orphanedRoutes.length > 0 ? (
              <div className="space-y-2">
                {dependencyAnalysis.orphanedRoutes.map((route, index) => (
                  <div key={index} className="flex items-center space-x-3 p-3 bg-red-500/10 backdrop-blur-sm rounded-lg border border-red-400/20">
                    <AlertTriangle className="h-4 w-4 text-red-400 flex-shrink-0" />
                    <span className="text-red-300 text-sm font-mono">{route}</span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <CheckCircle className="h-8 w-8 mx-auto text-green-400 mb-2" />
                <p className="text-sm text-green-300">No hay rutas huérfanas</p>
              </div>
            )}
          </div>
        </div>

        {/* Connection Types Legend */}
        <div className="bg-white/10 backdrop-blur-lg rounded-xl shadow-lg border border-white/20">
          <div className="p-6 border-b border-white/20">
            <h4 className="text-lg font-semibold text-white mb-2">Tipos de Conexión</h4>
          </div>
          <div className="p-6 space-y-3">
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2 px-3 py-1 rounded-full border bg-blue-500/20 text-blue-400 border-blue-400/30">
                <Globe className="h-4 w-4" />
                <span className="text-xs font-medium">Navigation</span>
              </div>
              <span className="text-sm text-gray-300">Navegación entre páginas</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2 px-3 py-1 rounded-full border bg-green-500/20 text-green-400 border-green-400/30">
                <Database className="h-4 w-4" />
                <span className="text-xs font-medium">API</span>
              </div>
              <span className="text-sm text-gray-300">Llamadas a APIs</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2 px-3 py-1 rounded-full border bg-purple-500/20 text-purple-400 border-purple-400/30">
                <Code className="h-4 w-4" />
                <span className="text-xs font-medium">Component</span>
              </div>
              <span className="text-sm text-gray-300">Componentes compartidos</span>
            </div>
          </div>
        </div>

        {/* Project Health */}
        <div className="bg-white/10 backdrop-blur-lg rounded-xl shadow-lg border border-white/20">
          <div className="p-6 border-b border-white/20">
            <h4 className="text-lg font-semibold text-white mb-2">Salud del Proyecto</h4>
          </div>
          <div className="p-6 space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-300">Progreso General</span>
                <span className="text-white">
                  {currentProject.pages.length > 0 ? Math.round((completedPages.length / currentProject.pages.length) * 100) : 0}%
                </span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div 
                  className="bg-green-500 h-2 rounded-full transition-all duration-300"
                  style={{ 
                    width: `${currentProject.pages.length > 0 ? (completedPages.length / currentProject.pages.length) * 100 : 0}%` 
                  }}
                ></div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <p className="text-2xl font-bold text-white">{currentProject.pages.length}</p>
                <p className="text-xs text-gray-300">Total Páginas</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-white">{dependencyAnalysis.pageConnections.length}</p>
                <p className="text-xs text-gray-300">Conexiones</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}