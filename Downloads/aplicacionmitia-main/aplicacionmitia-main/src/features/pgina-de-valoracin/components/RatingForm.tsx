import { useState } from 'react';
import { useRatingForm } from '../hooks/useRatingForm';
import { StarRating } from './StarRating';
import { Button } from '@/components/Button';
import { Tooltip } from './Tooltip';

interface RatingFormProps {
  bookingId: string;
}

export const RatingForm = ({ bookingId }: RatingFormProps) => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const {
    rating,
    setRating,
    comment,
    setComment,
    isAnonymous,
    setIsAnonymous,
    isSubmitting,
    error,
    handleSubmit,
  } = useRatingForm({
    bookingId,
    onSubmitSuccess: () => setIsSubmitted(true),
  });

  if (isSubmitted) {
    return (
      <div className="text-center p-8 bg-backgroundSecondary rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-primary mb-4">¡Gracias por tu valoración!</h2>
        <p className="text-textSecondary">Tu feedback nos ayuda a mejorar.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-surface p-8 rounded-lg shadow-lg max-w-2xl mx-auto">
      <div className="text-center">
        <h2 className="text-2xl font-semibold text-text">¿Qué te ha parecido la sesión?</h2>
        <p className="text-textSecondary mt-2">Tu opinión es muy importante para nosotros y para la comunidad.</p>
      </div>

      <div className="flex justify-center">
        <StarRating rating={rating} onRatingChange={setRating} />
      </div>

      <div>
        <label htmlFor="comment" className="block text-sm font-medium text-text mb-2">
          Añade un comentario (opcional)
        </label>
        <textarea
          id="comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          rows={4}
          className="w-full p-3 border border-border rounded-md focus:ring-2 focus:ring-primary focus:border-primary transition bg-backgroundSecondary text-text"
          placeholder="Describe tu experiencia, ¿qué fue lo mejor? ¿qué podría mejorar?"
        />
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="isAnonymous"
            checked={isAnonymous}
            onChange={(e) => setIsAnonymous(e.target.checked)}
            className="h-4 w-4 rounded border-border text-primary focus:ring-primary"
          />
          <label htmlFor="isAnonymous" className="text-sm text-textSecondary">
            Publicar como anónimo
          </label>
          <Tooltip text="Si publicas como anónimo, tu nombre no será visible en la reseña. El administrador aún podrá ver tu identidad por motivos de seguridad.">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-textMuted" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0110 5a3 3 0 012.598 4.5H13a1 1 0 110 2h-1.598A3 3 0 0110 15a3 3 0 01-2.598-4.5H6a1 1 0 110-2h1.598A3 3 0 0110 7z" clipRule="evenodd" />
            </svg>
          </Tooltip>
        </div>
      </div>

      {error && <p className="text-sm text-error text-center">{error}</p>}

      <Button type="submit" disabled={isSubmitting || rating === 0} className="w-full">
        {isSubmitting ? 'Enviando...' : 'Enviar Valoración'}
      </Button>
    </form>
  );
};