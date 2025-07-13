
import React from 'react';
import InteractiveStarRating from './InteractiveStarRating';

interface ReviewPreviewModalProps {
  rating: number;
  reviewText: string;
  tags: string[];
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const ReviewPreviewModal: React.FC<ReviewPreviewModalProps> = ({
  rating,
  reviewText,
  tags,
  isOpen,
  onClose,
  onConfirm,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-overlay bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-surface rounded-2xl shadow-lg p-8 max-w-lg w-full space-y-6 transform transition-all duration-300 ease-in-out scale-95 hover:scale-100">
        <h2 className="text-2xl font-bold text-text text-center">Previsualización de tu valoración</h2>
        
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold text-textSecondary mb-2">Calificación:</h3>
            <InteractiveStarRating rating={rating} />
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-textSecondary mb-2">Reseña:</h3>
            <p className="text-textMuted bg-backgroundSecondary p-4 rounded-lg">{reviewText}</p>
          </div>
          
          {tags.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-textSecondary mb-2">Etiquetas:</h3>
              <div className="flex flex-wrap gap-2">
                {tags.map((tag, index) => (
                  <span key={index} className="bg-accent text-textInverse px-3 py-1 rounded-full text-sm font-medium">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="text-center text-sm text-textMuted mt-4">
          <p>Recuerda que tu reseña pasará por un proceso de moderación antes de ser publicada.</p>
        </div>

        <div className="flex justify-end gap-4 mt-6">
          <button
            onClick={onClose}
            className="bg-muted text-text font-bold py-2 px-6 rounded-lg hover:bg-border transition-colors duration-300"
          >
            Editar
          </button>
          <button
            onClick={onConfirm}
            className="bg-primary text-textInverse font-bold py-2 px-6 rounded-lg hover:bg-primaryHover focus:outline-none focus:ring-4 focus:ring-primaryLight transition-all duration-300"
          >
            Confirmar y Enviar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReviewPreviewModal;
