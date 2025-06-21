import React from 'react';
import { Edit, Trash2, Calendar, Flag, Clock, CheckCircle, AlertTriangle, Bug, FileText, Layers } from 'lucide-react';
import { AppPage } from '../types';

interface PageCardProps {
  page: AppPage;
  onEdit: (page: AppPage) => void;
  onDelete: (pageId: string) => void;
}

const priorityConfig = {
  low: { color: 'text-green-400', bg: 'bg-green-500/20', border: 'border-green-400/30', label: 'Baja' },
  medium: { color: 'text-yellow-400', bg: 'bg-yellow-500/20', border: 'border-yellow-400/30', label: 'Media' },
  high: { color: 'text-red-400', bg: 'bg-red-500/20', border: 'border-red-400/30', label: 'Alta' },
};

const typeConfig = {
  page: { icon: FileText, color: 'text-blue-400', bg: 'bg-blue-500/20', border: 'border-blue-400/30', label: 'Página' },
  epic: { icon: Layers, color: 'text-purple-400', bg: 'bg-purple-500/20', border: 'border-purple-400/30', label: 'Epic' },
  bug: { icon: Bug, color: 'text-red-400', bg: 'bg-red-500/20', border: 'border-red-400/30', label: 'Bug' },
};

export default function PageCard({ page, onEdit, onDelete, isWipLimitExceeded = false }: PageCardProps) {
  // Calculate days until due date
  const getDueDateColor = () => {
    if (!page.dueDate) return '';
    
    const now = new Date();
    const dueDate = new Date(page.dueDate);
    const diffTime = dueDate.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) return 'border-red-500/50 bg-red-500/10'; // Overdue
    if (diffDays <= 4) return 'border-yellow-500/50 bg-yellow-500/10'; // 1-4 days
    return 'border-green-500/50 bg-green-500/10'; // 5+ days
  };
  
  // Calculate acceptance criteria completion
  const getAcceptanceCriteriaStats = () => {
    if (!page.userStories || page.userStories.length === 0) return { total: 0, completed: 0, ciPassed: 0 };
    
    let total = 0;
    let completed = 0;
    let ciPassed = 0;
    
    page.userStories.forEach(story => {
      if (story.acceptanceCriteria) {
        total += story.acceptanceCriteria.length;
        completed += story.acceptanceCriteria.filter(ac => ac.completed).length;
        ciPassed += story.acceptanceCriteria.filter(ac => ac.ciTestPassed).length;
      }
    });
    
    return { total, completed, ciPassed };
  };
  
  const dueDateColor = getDueDateColor();
  const acceptanceStats = getAcceptanceCriteriaStats();
  const typeInfo = typeConfig[page.type || 'page'];
  const TypeIcon = typeInfo.icon;

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm('¿Estás seguro de que quieres eliminar esta página?')) {
      onDelete(page.id);
    }
  };

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    onEdit(page);
  };

  return (
    <div className={`bg-gray-800/60 backdrop-blur-xl border rounded-lg p-4 hover:bg-gray-800/80 hover:shadow-xl hover:shadow-purple-500/10 transition-all duration-200 group cursor-pointer relative ${
      isWipLimitExceeded ? 'border-red-500/70 shadow-red-500/20' : 
      dueDateColor || 'border-gray-700/50'
    }`}>
      {/* WIP Limit Alert */}
      {isWipLimitExceeded && (
        <div className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 animate-pulse">
          <AlertTriangle className="h-3 w-3" />
        </div>
      )}
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1 pr-2">
          <div className="flex items-center space-x-2 mb-1">
            <h4 className="font-medium text-white text-sm leading-tight">
              {page.title}
            </h4>
            {/* Type Badge */}
            <div className={`flex items-center space-x-1 px-2 py-0.5 rounded-full text-xs border ${typeInfo.bg} ${typeInfo.border}`}>
              <TypeIcon className={`h-3 w-3 ${typeInfo.color}`} />
              <span className={typeInfo.color}>{typeInfo.label}</span>
            </div>
          </div>
          
          {/* Story Points */}
          {page.storyPoints && (
            <div className="flex items-center space-x-1 text-xs text-gray-400 mb-1">
              <span className="font-medium">{page.storyPoints} pts</span>
            </div>
          )}
        </div>
        
        <div className="flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <button
            onClick={handleEdit}
            className="p-1 text-gray-400 hover:text-blue-400 hover:bg-blue-500/20 rounded transition-all duration-200"
            title="Editar página"
          >
            <Edit className="h-3 w-3" />
          </button>
          <button
            onClick={handleDelete}
            className="p-1 text-gray-400 hover:text-red-400 hover:bg-red-500/20 rounded transition-all duration-200"
            title="Eliminar página"
          >
            <Trash2 className="h-3 w-3" />
          </button>
        </div>
      </div>

      <p className="text-gray-300 text-xs mb-3 line-clamp-2">
        {page.description}
      </p>

      {/* Acceptance Criteria Progress */}
      {acceptanceStats.total > 0 && (
        <div className="mb-3">
          <div className="flex items-center justify-between text-xs text-gray-400 mb-1">
            <span>Criterios de Aceptación</span>
            <span>{acceptanceStats.completed}/{acceptanceStats.total}</span>
          </div>
          <div className="w-full bg-gray-700/50 rounded-full h-1.5 mb-1">
            <div 
              className="bg-blue-500 h-1.5 rounded-full transition-all duration-300"
              style={{ width: `${(acceptanceStats.completed / acceptanceStats.total) * 100}%` }}
            />
          </div>
          {acceptanceStats.ciPassed > 0 && (
            <div className="flex items-center space-x-1 text-xs">
              <CheckCircle className="h-3 w-3 text-green-400" />
              <span className="text-green-400">{acceptanceStats.ciPassed} tests CI pasados</span>
            </div>
          )}
        </div>
      )}
      
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          {/* Priority Badge */}
          <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs border ${priorityConfig[page.priority].bg} ${priorityConfig[page.priority].border}`}>
            <Flag className={`h-3 w-3 ${priorityConfig[page.priority].color}`} />
            <span className={priorityConfig[page.priority].color}>
              {priorityConfig[page.priority].label}
            </span>
          </div>
        </div>
        
        <div className="flex items-center space-x-3 text-xs">
          {/* Due Date */}
          {page.dueDate && (
            <div className={`flex items-center space-x-1 ${
              getDueDateColor().includes('red') ? 'text-red-400' :
              getDueDateColor().includes('yellow') ? 'text-yellow-400' :
              'text-green-400'
            }`}>
              <Clock className="h-3 w-3" />
              <span>{new Date(page.dueDate).toLocaleDateString()}</span>
            </div>
          )}
          
          {/* Last Updated */}
          <div className="flex items-center space-x-1 text-gray-400">
            <Calendar className="h-3 w-3" />
            <span>{new Date(page.updatedAt).toLocaleDateString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
}