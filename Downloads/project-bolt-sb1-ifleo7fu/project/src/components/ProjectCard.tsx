import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Users, FileText, Edit, Trash2, Github } from 'lucide-react';
import { Project } from '../types';
import { useProject } from '../context/ProjectContext';

interface ProjectCardProps {
  project: Project;
}

const statusConfig = {
  planning: { color: 'bg-yellow-500/20 text-yellow-200 border border-yellow-400/30', label: 'Planificación' },
  development: { color: 'bg-blue-500/20 text-blue-200 border border-blue-400/30', label: 'Desarrollo' },
  testing: { color: 'bg-purple-500/20 text-purple-200 border border-purple-400/30', label: 'Pruebas' },
  deployed: { color: 'bg-green-500/20 text-green-200 border border-green-400/30', label: 'Desplegado' },
};

export default function ProjectCard({ project }: ProjectCardProps) {
  const { deleteProject } = useProject();
  
  const handleDelete = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (window.confirm('¿Estás seguro de que quieres eliminar este proyecto?')) {
      await deleteProject(project.id);
    }
  };

  const completedPages = project.pages.filter(page => page.status === 'done').length;
  const totalPages = project.pages.length;
  const progressPercentage = totalPages > 0 ? (completedPages / totalPages) * 100 : 0;

  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-xl shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 border border-white/20 group relative overflow-hidden">
      {/* Glass effect overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-white/5 rounded-xl"></div>
      <Link to={`/project/${project.id}`} className="block relative z-10">
        <div className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-2">
                <div 
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: project.color }}
                />
                <h3 className="text-xl font-semibold text-white group-hover:text-purple-300 transition-colors">
                  {project.name}
                </h3>
              </div>
              <p className="text-gray-300 text-sm leading-relaxed">
                {project.description}
              </p>
            </div>
            <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <button
                onClick={handleDelete}
                className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/20 rounded-lg transition-all duration-200 backdrop-blur-sm"
                title="Eliminar proyecto"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between mb-4">
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusConfig[project.status].color}`}>
              {statusConfig[project.status].label}
            </span>
            <div className="flex items-center space-x-4 text-sm text-gray-400">
              <div className="flex items-center space-x-1">
                <FileText className="h-4 w-4" />
                <span>{totalPages} páginas</span>
              </div>
              <div className="flex items-center space-x-1">
                <Calendar className="h-4 w-4" />
                <span>{new Date(project.createdAt).toLocaleDateString()}</span>
              </div>
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="flex items-center space-x-1 text-gray-400 hover:text-gray-200 transition-colors"
                  title="Ver en GitHub"
                >
                  <Github className="h-4 w-4" />
                  <span>GitHub</span>
                </a>
              )}
            </div>
          </div>

          <div className="mb-2">
            <div className="flex justify-between text-sm text-gray-300 mb-1">
              <span>Progreso</span>
              <span>{completedPages}/{totalPages} completadas</span>
            </div>
            <div className="w-full bg-white/20 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-500 shadow-sm"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}