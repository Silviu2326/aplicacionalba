import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FolderOpen, ArrowLeft, User, LogOut, ChevronDown, GitBranch, AlertCircle, BarChart3, RefreshCw } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useProject } from '../context/ProjectContext';

export default function Header() {
  const location = useLocation();
  const { user, logout } = useAuth();
  const { currentProject } = useProject();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [selectedBranch, setSelectedBranch] = useState('dev');
  const [showBranchMenu, setShowBranchMenu] = useState(false);
  const isProjectEdit = location.pathname.includes('/project/');

  // Calcular progreso global del proyecto
  const calculateProgress = () => {
    if (!currentProject || !currentProject.pages) return 0;
    
    const allUserStories = currentProject.pages.flatMap(page => page.userStories || []);
    if (allUserStories.length === 0) return 0;
    
    const completedStories = allUserStories.filter(story => story.status === 'done');
    return Math.round((completedStories.length / allUserStories.length) * 100);
  };

  // Simular contador de incidencias (en un proyecto real vendría de GitHub API)
  const getIssuesCount = () => {
    // Simulación basada en el progreso del proyecto
    const progress = calculateProgress();
    return Math.max(0, Math.floor((100 - progress) / 10));
  };

  const branches = ['dev', 'staging', 'prod'];
  const progress = calculateProgress();
  const issuesCount = getIssuesCount();

  const handleLogout = () => {
    logout();
    setShowUserMenu(false);
  };

  return (
    <header className="bg-gradient-to-r from-black via-purple-900 to-blue-900 backdrop-blur-lg border-b border-white/20 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-4">
            <Link to="/" className="flex items-center space-x-2 text-blue-300 hover:text-blue-200 transition-colors">
              <FolderOpen className="h-8 w-8" />
              <span className="text-xl font-bold">Astro code</span>
            </Link>
          </div>
          
          <div className="flex items-center space-x-4">
            {/* Progreso Global */}
            {isProjectEdit && currentProject && (
              <div className="flex items-center space-x-3 px-3 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg">
                <BarChart3 className="h-4 w-4 text-green-400" />
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-300">Progreso:</span>
                  <div className="w-16 h-2 bg-gray-700 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-green-500 to-blue-500 transition-all duration-300"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                  <span className="text-sm font-medium text-white">{progress}%</span>
                </div>
              </div>
            )}

            {/* Selector de Rama/Entorno */}
            {isProjectEdit && (
              <div className="relative">
                <button
                  onClick={() => setShowBranchMenu(!showBranchMenu)}
                  className="flex items-center space-x-2 px-3 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg hover:bg-white/20 transition-colors"
                >
                  <GitBranch className="h-4 w-4 text-blue-400" />
                  <span className="text-sm text-white">{selectedBranch}</span>
                  <ChevronDown className="h-3 w-3 text-gray-300" />
                </button>
                
                {showBranchMenu && (
                  <div className="absolute top-full mt-2 w-32 bg-white/10 backdrop-blur-lg rounded-lg shadow-lg border border-white/20 py-1 z-50">
                    {branches.map((branch) => (
                      <button
                        key={branch}
                        onClick={() => {
                          setSelectedBranch(branch);
                          setShowBranchMenu(false);
                        }}
                        className={`w-full text-left px-3 py-2 text-sm transition-colors ${
                          selectedBranch === branch 
                            ? 'bg-blue-500/20 text-blue-300' 
                            : 'text-gray-300 hover:text-white hover:bg-white/10'
                        }`}
                      >
                        {branch}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Contador de Incidencias */}
            {isProjectEdit && (
              <div className="flex items-center space-x-2 px-3 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg">
                <AlertCircle className={`h-4 w-4 ${
                  issuesCount > 5 ? 'text-red-400' : 
                  issuesCount > 2 ? 'text-yellow-400' : 
                  'text-green-400'
                }`} />
                <span className="text-sm text-gray-300">Issues:</span>
                <span className={`text-sm font-medium ${
                  issuesCount > 5 ? 'text-red-400' : 
                  issuesCount > 2 ? 'text-yellow-400' : 
                  'text-green-400'
                }`}>
                  {issuesCount}
                </span>
              </div>
            )}

            {/* Botón Sincronizar */}
            {isProjectEdit && (
              <button className="flex items-center space-x-2 px-3 py-2 bg-blue-500/20 backdrop-blur-sm border border-blue-400/30 rounded-lg hover:bg-blue-500/30 transition-colors">
                <RefreshCw className="h-4 w-4 text-blue-300" />
                <span className="text-sm text-blue-300">Sync ({selectedBranch})</span>
              </button>
            )}

            {isProjectEdit && (
              <Link 
                to="/" 
                className="flex items-center space-x-2 px-4 py-2 text-gray-300 hover:text-white hover:bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg transition-all duration-200 shadow-lg"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Volver a Proyectos</span>
              </Link>
            )}
            
            {/* User Menu */}
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-white/10 backdrop-blur-sm border border-white/20 transition-colors shadow-lg"
              >
                {user?.avatar ? (
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-8 h-8 bg-blue-500/20 backdrop-blur-sm border border-blue-400/30 rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-blue-300" />
                  </div>
                )}
                <div className="hidden sm:block text-left">
                  <p className="text-sm font-medium text-white">{user?.name}</p>
                  <p className="text-xs text-gray-300">{user?.email}</p>
                </div>
                <ChevronDown className="w-4 h-4 text-gray-300" />
              </button>
              
              {/* Dropdown Menu */}
              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white/10 backdrop-blur-lg rounded-lg shadow-lg border border-white/20 py-1 z-50">
                  <div className="px-4 py-2 border-b border-white/20">
                    <p className="text-sm font-medium text-white">{user?.name}</p>
                    <p className="text-xs text-gray-300">{user?.email}</p>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center space-x-2 px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/10 transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Cerrar Sesión</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Overlay to close menus when clicking outside */}
      {(showUserMenu || showBranchMenu) && (
        <div 
          className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm" 
          onClick={() => {
            setShowUserMenu(false);
            setShowBranchMenu(false);
          }}
        />
      )}
    </header>
  );
}