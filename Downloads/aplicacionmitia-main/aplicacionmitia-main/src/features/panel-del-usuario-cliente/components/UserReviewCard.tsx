import React, { useState } from 'react';
import InteractiveStarRating from '../../pgina-de-valoracin/components/InteractiveStarRating';

export interface Review {
  id: string;
  professionalName: string;
  date: string;
  rating: number;
  comment: string;
  professionalResponse?: string;
}

interface UserReviewCardProps {
  review: Review;
}

export const UserReviewCard = ({ review }: UserReviewCardProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedRating, setEditedRating] = useState(review.rating);
  const [editedComment, setEditedComment] = useState(review.comment);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedRating(review.rating);
    setEditedComment(review.comment);
  };

  const handleSave = () => {
    // Aquí se llamaría a la API para guardar los cambios
    console.log('Guardando cambios:', {
      rating: editedRating,
      comment: editedComment,
    });
    setIsEditing(false);
  };

  const handleDelete = () => {
    // Aquí se llamaría a la API para eliminar la reseña
    console.log('Eliminando reseña');
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-lg transition-all duration-300 hover:shadow-xl">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-bold text-text">{review.professionalName}</h3>
          <p className="text-sm text-textMuted">{new Date(review.date).toLocaleDateString()}</p>
        </div>
        {!isEditing && (
          <div className="flex space-x-2">
            <button
              onClick={handleEdit}
              className="text-sm font-medium text-primary hover:text-primaryHover transition-colors duration-200"
            >
              Editar
            </button>
            <button
              onClick={handleDelete}
              className="text-sm font-medium text-error hover:text-errorDark transition-colors duration-200"
            >
              Eliminar
            </button>
          </div>
        )}
      </div>

      {isEditing ? (
        <div className="mt-4 space-y-4">
          <div>
            <label className="block text-sm font-medium text-text">Calificación</label>
            <InteractiveStarRating
              totalStars={5}
              rating={editedRating}
              onRatingChange={setEditedRating}
            />
          </div>
          <div>
            <label htmlFor="comment" className="block text-sm font-medium text-text">
              Comentario
            </label>
            <textarea
              id="comment"
              rows={4}
              className="mt-1 block w-full rounded-md border-border bg-surface text-text shadow-sm focus:border-primary focus:ring-primary focus:ring-1 sm:text-sm p-3"
              value={editedComment}
              onChange={(e) => setEditedComment(e.target.value)}
            ></textarea>
          </div>
          <div className="flex justify-end space-x-2">
            <button
              onClick={handleCancel}
              className="px-4 py-2 text-sm font-medium text-textSecondary bg-surface border border-border rounded-md shadow-sm hover:bg-backgroundSecondary transition-colors duration-200"
            >
              Cancelar
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 text-sm font-medium text-textInverse bg-primary border border-transparent rounded-md shadow-sm hover:bg-primaryHover transition-colors duration-200"
            >
              Guardar Cambios
            </button>
          </div>
        </div>
      ) : (
        <div className="mt-4">
          <div className="flex items-center mb-2">
            <InteractiveStarRating totalStars={5} rating={review.rating} onRatingChange={() => {}} />
          </div>
          <p className="text-textSecondary">{review.comment}</p>
          {review.professionalResponse && (
            <div className="mt-4 p-4 bg-backgroundSecondary border border-borderLight rounded-lg">
              <h4 className="font-semibold text-text mb-2">Respuesta del profesional:</h4>
              <p className="text-textSecondary">{review.professionalResponse}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
