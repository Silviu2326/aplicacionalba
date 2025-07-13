import { useState } from 'react';
import { submitRating } from '../api';

interface UseRatingFormProps {
  bookingId: string;
  onSubmitSuccess: () => void;
}

export const useRatingForm = ({ bookingId, onSubmitSuccess }: UseRatingFormProps) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) {
      setError('Por favor, selecciona una puntuación.');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      await submitRating(bookingId, rating, comment, isAnonymous);
      onSubmitSuccess();
    } catch (err) {
      setError('Error al enviar la valoración. Por favor, inténtalo de nuevo.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    rating,
    setRating,
    comment,
    setComment,
    isAnonymous,
    setIsAnonymous,
    isSubmitting,
    error,
    handleSubmit,
  };
};
