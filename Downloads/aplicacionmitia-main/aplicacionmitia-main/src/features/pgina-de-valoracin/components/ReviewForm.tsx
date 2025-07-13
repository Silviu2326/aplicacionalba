import { StarRating } from './StarRating';
import Button from '../../../components/Button';

interface ReviewFormProps {
  rating: number;
  setRating: (rating: number) => void;
  comment: string;
  setComment: (comment: string) => void;
  handleSubmit: () => void;
  isSubmitting: boolean;
}

export const ReviewForm = ({
  rating,
  setRating,
  comment,
  setComment,
  handleSubmit,
  isSubmitting,
}: ReviewFormProps) => {
  return (
    <div className="p-8 bg-surface rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-text">Deja tu valoración</h2>
      <div className="mb-6">
        <StarRating rating={rating} setRating={setRating} />
      </div>
      <textarea
        className="w-full p-4 bg-backgroundSecondary border border-border rounded-md mb-6 text-text"
        rows={5}
        placeholder="Escribe tu reseña aquí (opcional)..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        maxLength={1000}
      />
      <Button
        onClick={handleSubmit}
        disabled={rating === 0 || isSubmitting}
      >
        {isSubmitting ? 'Enviando...' : 'Enviar Valoración'}
      </Button>
    </div>
  );
};
