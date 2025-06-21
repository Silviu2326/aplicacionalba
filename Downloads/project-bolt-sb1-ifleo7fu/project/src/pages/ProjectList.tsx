import React, { useState } from 'react';
import { Plus, Search, Filter } from 'lucide-react';
import { useProject } from '../context/ProjectContext';
import ProjectCard from '../components/ProjectCard';
import NewProjectModal from '../components/NewProjectModal';

export default function ProjectList() {
  const { projects, isLoading } = useProject();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || project.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-60 h-60 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-4000"></div>
        <div className="absolute top-1/2 right-1/3 w-72 h-72 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-15 animate-pulse animation-delay-6000"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 relative z-10">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2 drop-shadow-lg">Mis Proyectos</h1>
              <p className="text-gray-300">Gestiona y organiza todos tus proyectos de desarrollo</p>
            </div>
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center space-x-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-200 shadow-lg shadow-purple-500/25 backdrop-blur-sm"
            >
              <Plus className="h-5 w-5" />
              <span>Nuevo Proyecto</span>
            </button>
          </div>
        </div>

        {/* Filters Section */}
        <div className="mb-8 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Buscar proyectos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-purple-400 transition-all duration-200 text-white placeholder-gray-300"
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="pl-10 pr-8 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-purple-400 transition-all duration-200 appearance-none text-white"
            >
              <option value="all" className="bg-gray-800 text-white">Todos los estados</option>
              <option value="planning" className="bg-gray-800 text-white">Planificación</option>
              <option value="development" className="bg-gray-800 text-white">Desarrollo</option>
              <option value="testing" className="bg-gray-800 text-white">Pruebas</option>
              <option value="deployed" className="bg-gray-800 text-white">Desplegado</option>
            </select>
          </div>
        </div>

        {/* Projects Grid */}
        {isLoading ? (
          <div className="text-center py-16">
            <div className="mx-auto w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mb-4"></div>
            <h3 className="text-xl font-medium text-white mb-2">Cargando proyectos...</h3>
            <p className="text-gray-300">Por favor espera mientras cargamos tus proyectos</p>
          </div>
        ) : filteredProjects.length === 0 ? (
          <div className="text-center py-16">
            <div className="mx-auto w-24 h-24 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center mb-4 border border-white/20">
              <Plus className="h-12 w-12 text-gray-300" />
            </div>
            <h3 className="text-xl font-medium text-white mb-2">
              {projects.length === 0 ? 'No hay proyectos' : 'No se encontraron proyectos'}
            </h3>
            <p className="text-gray-300 mb-6">
              {projects.length === 0 
                ? 'Comienza creando tu primer proyecto de desarrollo'
                : 'Intenta con otros términos de búsqueda o filtros'
              }
            </p>
            {projects.length === 0 && (
              <button
                onClick={() => setIsModalOpen(true)}
                className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-200 shadow-lg shadow-purple-500/25"
              >
                Crear Primer Proyecto
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-8">
            {filteredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        )}
      </div>

      <NewProjectModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </div>
  );
}