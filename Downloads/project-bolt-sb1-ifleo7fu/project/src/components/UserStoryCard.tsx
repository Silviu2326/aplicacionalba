import React from 'react';
import { Edit, Trash2, Clock, Flag, CheckCircle, Circle, PlayCircle } from 'lucide-react';
import { UserStory } from '../types';

interface UserStoryCardProps {
  userStory: UserStory;
  onEdit: (userStory: UserStory) => void;
  onDelete: (userStoryId: string) => void;
  onToggleComplete?: (userStoryId: string, completed: boolean) => void;
  showPageInfo?: boolean;
  pageTitle?: string;
  isCompleted?: boolean;
}

const priorityConfig = {
  low: { color: 'text-green-400', bg: 'bg-green-500/20 backdrop-blur-sm border border-green-400/30', label: 'Baja' },
  medium: { color: 'text-yellow-400', bg: 'bg-yellow-500/20 backdrop-blur-sm border border-yellow-400/30', label: 'Media' },
  high: { color: 'text-red-400', bg: 'bg-red-500/20 backdrop-blur-sm border border-red-400/30', label: 'Alta' },
};

const statusConfig = {
  pending: { icon: Circle, color: 'text-gray-400', bg: 'bg-gray-500/20 backdrop-blur-sm border border-gray-400/30', label: 'Por hacer' },
  'in-progress': { icon: PlayCircle, color: 'text-blue-400', bg: 'bg-blue-500/20 backdrop-blur-sm border border-blue-400/30', label: 'En progreso' },
  completed: { icon: CheckCircle, color: 'text-green-400', bg: 'bg-green-500/20 backdrop-blur-sm border border-green-400/30', label: 'Completado' },
};

export default function UserStoryCard({ userStory, onEdit, onDelete, onToggleComplete, showPageInfo = false, pageTitle, isCompleted = false }: UserStoryCardProps) {
  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm('¿Estás seguro de que quieres eliminar esta historia de usuario?')) {
      onDelete(userStory.id);
    }
  };

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    onEdit(userStory);
  };

  const handleToggleComplete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onToggleComplete) {
      onToggleComplete(userStory.id, !isCompleted);
    }
  };

  const StatusIcon = statusConfig[userStory.status].icon;

  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-lg border border-white/20 p-4 hover:shadow-xl hover:bg-white/15 transition-all duration-200 group cursor-pointer shadow-lg">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-start space-x-3 flex-1">
          <div className="flex items-center mt-0.5">
            <input
              type="checkbox"
              checked={isCompleted}
              onChange={handleToggleComplete}
              onClick={(e) => e.stopPropagation()}
              className="w-4 h-4 text-blue-400 bg-white/10 border-white/30 rounded focus:ring-blue-400 focus:ring-2 backdrop-blur-sm cursor-pointer"
            />
          </div>
          <h5 className={`font-medium text-sm leading-tight flex-1 pr-2 transition-all duration-200 ${
            isCompleted ? 'text-gray-400 line-through' : 'text-white'
          }`}>
            {userStory.title}
          </h5>
        </div>
        <div className="flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <button
            onClick={handleEdit}
            className="p-1 text-gray-300 hover:text-blue-400 hover:bg-blue-500/20 rounded transition-all duration-200"
            title="Editar historia"
          >
            <Edit className="h-3 w-3" />
          </button>
          <button
            onClick={handleDelete}
            className="p-1 text-gray-300 hover:text-red-400 hover:bg-red-500/20 rounded transition-all duration-200"
            title="Eliminar historia"
          >
            <Trash2 className="h-3 w-3" />
          </button>
        </div>
      </div>

      <p className="text-gray-300 text-xs mb-3 line-clamp-2">
        {userStory.description}
      </p>

      {showPageInfo && pageTitle && (
        <div className="mb-2 px-2 py-1 bg-white/10 backdrop-blur-sm rounded text-xs text-gray-300 border border-white/20">
          <span className="font-medium text-white">Página:</span> {pageTitle}
        </div>
      )}

      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center space-x-2">
          <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs ${priorityConfig[userStory.priority].bg}`}>
            <Flag className={`h-3 w-3 ${priorityConfig[userStory.priority].color}`} />
            <span className={priorityConfig[userStory.priority].color}>
              {priorityConfig[userStory.priority].label}
            </span>
          </div>
          <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs ${statusConfig[userStory.status].bg}`}>
            <StatusIcon className={`h-3 w-3 ${statusConfig[userStory.status].color}`} />
            <span className={statusConfig[userStory.status].color}>
              {statusConfig[userStory.status].label}
            </span>
          </div>
        </div>
        {userStory.estimatedHours && (
          <div className="flex items-center space-x-1 text-xs text-gray-300">
            <Clock className="h-3 w-3" />
            <span>{userStory.estimatedHours}h</span>
          </div>
        )}
      </div>

      {userStory.acceptanceCriteria && userStory.acceptanceCriteria.length > 0 && (
        <div className="mt-2">
          <p className="text-xs font-medium text-gray-200 mb-1">Criterios de aceptación:</p>
          <ul className="text-xs text-gray-300 space-y-1">
            {userStory.acceptanceCriteria.slice(0, 2).map((criteria, index) => (
              <li key={index} className="flex items-start space-x-1">
                <span className="text-gray-400 mt-0.5">•</span>
                <span className="line-clamp-1">{criteria}</span>
              </li>
            ))}
            {userStory.acceptanceCriteria.length > 2 && (
              <li className="text-gray-400 text-xs">
                +{userStory.acceptanceCriteria.length - 2} más...
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}