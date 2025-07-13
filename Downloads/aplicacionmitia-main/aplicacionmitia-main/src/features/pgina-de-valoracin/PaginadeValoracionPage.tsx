import React, { useState } from 'react';
import { usePaginadeValoracion } from './hooks/usePaginadeValoracion';
import FeedbackTagSelector from './components/FeedbackTagSelector';
import ReviewWritingTips from './components/ReviewWritingTips';
import { ReviewTextArea } from './components/ReviewTextArea';
import ReviewGuidelinesCheckbox from './components/ReviewGuidelinesCheckbox';
import ReviewPreviewModal from './components/ReviewPreviewModal';
import SubmissionErrorAlert from './components/SubmissionErrorAlert';
import { FlagReviewButton } from './components/FlagReviewButton';

const StarRating = ({ rating, setRating }: { rating: number; setRating: (r: number) => void }) => (
  <div className="flex items-center gap-2">
    {[1, 2, 3, 4, 5].map((star) => (
      <svg
        key={star}
        onClick={() => setRating(star)}
        className={`w-8 h-8 cursor-pointer transition-colors ${
          rating >= star ? 'text-warning' : 'text-textMuted'
        }`}
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.958a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.368 2.446a1 1 0 00-.364 1.118l1.287 3.958c.3.921-.755 1.688-1.54 1.118l-3.368-2.446a1 1 0 00-1.175 0l-3.368 2.446c-.784.57-1.838-.197-1.539-1.118l1.287-3.958a1 1 0 00-.364-1.118L2.25 9.385c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69L9.049 2.927z" />
      </svg>
    ))}
  </div>
);

const PaginadeValoracionPage: React.FC = () => {
  const {
    rating,
    setRating,
    comment,
    setComment,
    selectedTags,
    setSelectedTags,
    guidelinesAccepted,
    setGuidelinesAccepted,
    handleSubmit,
    error,
    setError,
    isSubmitting,
  } = usePaginadeValoracion();
  const [isModalOpen, setModalOpen] = useState(false);
  const minReviewLength = 20;
  const maxReviewLength = 500;

  // Hardcoded bookingId for demonstration purposes
  const bookingId = 'booking-12345';

  const isSubmitDisabled = comment.length < minReviewLength || !guidelinesAccepted || isSubmitting;

  const handlePreview = (e: React.FormEvent) => {
    e.preventDefault();
    if (error) setError(null);
    setModalOpen(true);
  };

  const handleConfirmSubmit = async () => {
    setModalOpen(false);
    await handleSubmit(new Event('submit'));
  };

  return (
    <>
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="max-w-2xl w-full bg-surface rounded-2xl shadow-lg p-8 space-y-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-text">Valora tu sesión</h1>
            <p className="text-textSecondary mt-2">Tu opinión es muy importante para nosotros y para la comunidad.</p>
          </div>

          {error && (
            <SubmissionErrorAlert 
              message={error}
              onClose={() => setError(null)}
            />
          )}

          <form onSubmit={handlePreview} className="space-y-6">
            <div className="p-6 border rounded-lg bg-backgroundSecondary">
              <label className="block text-lg font-semibold text-text mb-4 text-center">
                ¿Cómo calificarías la sesión?
              </label>
              <div className="flex justify-center">
                <StarRating rating={rating} setRating={setRating} />
              </div>
            </div>

            <div className="p-6 border rounded-lg bg-backgroundSecondary">
              <label className="block text-lg font-semibold text-text mb-4">
                Danos más detalles (Opcional)
              </label>
              <FeedbackTagSelector onTagsChange={setSelectedTags} />
            </div>

            <div className="p-6 border rounded-lg bg-backgroundSecondary">
              <label htmlFor="comment" className="block text-lg font-semibold text-text mb-4">
                Escribe tu reseña
              </label>
              <ReviewWritingTips />
              <ReviewTextArea
                maxLength={maxReviewLength}
                minLength={minReviewLength}
                onTextChange={setComment}
                placeholder="Comparte los detalles de tu experiencia para ayudar a otros miembros de la comunidad."
              />
            </div>

            <div className="space-y-4">
              <ReviewGuidelinesCheckbox isChecked={guidelinesAccepted} onChange={setGuidelinesAccepted} />
              <button
                type="submit"
                disabled={isSubmitDisabled}
                className="w-full bg-primary text-textInverse font-bold py-3 px-6 rounded-lg hover:bg-primaryHover focus:outline-none focus:ring-4 focus:ring-primaryLight transition-all duration-300 ease-in-out transform hover:-translate-y-1 disabled:bg-disabled disabled:cursor-not-allowed disabled:transform-none"
              >
                {isSubmitting ? 'Enviando...' : (error ? 'Reintentar envío' : 'Enviar valoración')}
              </button>
            </div>
            <div className="text-center mt-4">
              <FlagReviewButton bookingId={bookingId} />
            </div>
          </form>
        </div>
      </div>
      <ReviewPreviewModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={handleConfirmSubmit}
        rating={rating}
        reviewText={comment}
        tags={selectedTags}
      />
    </>
  );
};

export default PaginadeValoracionPage;
