
import React from 'react';
import AdminNotes from './AdminNotes';

interface FeedbackItem {
  id: number;
  user_id: number;
  content: string;
  status: string;
  tags: string[];
}

interface FeedbackItemDetailProps {
  feedback: FeedbackItem | null;
  onStatusChange: (id: number, newStatus: string) => void;
  onClose?: () => void;
}

const FeedbackItemDetail: React.FC<FeedbackItemDetailProps> = ({ feedback, onStatusChange, onClose }) => {
  if (!feedback) {
    return (
      <div className="bg-gradient-to-br from-surface/40 to-card/40 backdrop-blur-xl rounded-2xl border border-borderLight/20 p-8 text-center shadow-lg">
        <div className="w-16 h-16 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-2xl">📝</span>
        </div>
        <h3 className="text-lg font-semibold text-text mb-2">Selecciona un elemento</h3>
        <p className="text-textMuted">Haz clic en cualquier fila de la tabla para ver los detalles del feedback</p>
      </div>
    );
  }

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onStatusChange(feedback.id, e.target.value);
  };

  const getStatusColor = (status: string) => {
    const colors = {
      'new': 'from-blue-500 to-blue-600',
      'planned': 'from-yellow-500 to-yellow-600',
      'in-progress': 'from-orange-500 to-orange-600',
      'completed': 'from-green-500 to-green-600',
      'closed': 'from-gray-500 to-gray-600'
    };
    return colors[status] || 'from-gray-500 to-gray-600';
  };

  return (
    <div className="space-y-6">
      {/* Contenido principal */}
      <div className="bg-gradient-to-br from-surface/80 to-card/80 backdrop-blur-xl rounded-2xl border border-borderLight/30 shadow-xl overflow-hidden">
        <div className="p-6 space-y-6">
          {/* Información del usuario */}
          <div className="bg-gradient-to-r from-primary/5 to-secondary/5 rounded-xl p-4 border border-borderLight/20">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-primary to-primaryDark rounded-full flex items-center justify-center">
                <span className="text-textInverse font-bold text-sm">{feedback.user_id}</span>
              </div>
              <div>
                <h3 className="font-semibold text-text">Usuario ID: {feedback.user_id}</h3>
                <p className="text-textMuted text-sm">Feedback enviado</p>
              </div>
            </div>
          </div>

          {/* Contenido del feedback */}
          <div className="space-y-3">
            <h4 className="font-semibold text-text flex items-center">
              <span className="mr-2">💬</span>
              Contenido del Feedback
            </h4>
            <div className="bg-gradient-to-r from-backgroundSecondary/50 to-surface/50 rounded-xl p-4 border border-borderLight/20">
              <p className="text-text leading-relaxed">{feedback.content}</p>
            </div>
          </div>

          {/* Estado */}
          <div className="space-y-3">
            <h4 className="font-semibold text-text flex items-center">
              <span className="mr-2">🔄</span>
              Estado
            </h4>
            <div className="relative">
              <select
                value={feedback.status}
                onChange={handleStatusChange}
                className={`w-full bg-gradient-to-r ${getStatusColor(feedback.status)} text-textInverse border-0 rounded-xl px-4 py-3 font-medium shadow-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all duration-300`}
              >
                <option value="new">🆕 Nuevo</option>
                <option value="planned">📋 Planificado</option>
                <option value="in-progress">⚡ En Progreso</option>
                <option value="completed">✅ Completado</option>
                <option value="closed">🔒 Cerrado</option>
              </select>
            </div>
          </div>

          {/* Tags */}
          <div className="space-y-3">
            <h4 className="font-semibold text-text flex items-center">
              <span className="mr-2">🏷️</span>
              Etiquetas
            </h4>
            <div className="flex flex-wrap gap-2">
              {feedback.tags.map((tag, index) => (
                <span 
                  key={index} 
                  className="bg-gradient-to-r from-accent to-accentDark text-textInverse px-4 py-2 rounded-full text-sm font-medium shadow-lg transform hover:scale-105 transition-all duration-200"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Notas administrativas */}
      <div className="bg-gradient-to-br from-surface/80 to-card/80 backdrop-blur-xl rounded-2xl border border-borderLight/30 shadow-xl overflow-hidden">
        <div className="p-6 border-b border-borderLight/20 bg-gradient-to-r from-primary/5 to-secondary/5">
          <h4 className="font-bold text-text flex items-center">
            <span className="mr-2">📝</span>
            Notas Administrativas
          </h4>
        </div>
        <div className="p-6">
          <AdminNotes userId={feedback.user_id.toString()} />
        </div>
      </div>

      {/* Botón de cerrar */}
      {onClose && (
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="bg-gradient-to-r from-error/80 to-errorDark/80 hover:from-error hover:to-errorDark text-textInverse px-6 py-3 rounded-xl font-medium shadow-lg transform hover:scale-105 transition-all duration-200 flex items-center space-x-2"
          >
            <span>✕</span>
            <span>Cerrar</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default FeedbackItemDetail;
