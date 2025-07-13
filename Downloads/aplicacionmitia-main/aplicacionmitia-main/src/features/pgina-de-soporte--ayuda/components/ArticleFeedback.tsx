
import { useState } from 'react';
import { submitArticleFeedback } from '../api';

interface ArticleFeedbackProps {
  articleId: string;
}

export const ArticleFeedback = ({ articleId }: ArticleFeedbackProps) => {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFeedback = async (wasHelpful: boolean) => {
    setLoading(true);
    setError(null);
    try {
      await submitArticleFeedback(articleId, wasHelpful);
      setSubmitted(true);
    } catch (err) {
      setError('Error al enviar el feedback. Por favor, inténtalo de nuevo.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="text-center py-2 text-successDark bg-successLight rounded-lg">
        <p>¡Gracias por tu feedback!</p>
      </div>
    );
  }

  return (
    <div className="mt-4 p-4 border-t border-border flex items-center justify-center gap-4">
      <p className="text-sm font-medium text-text">¿Te resultó útil?</p>
      <div className="flex gap-2">
        <button
          onClick={() => handleFeedback(true)}
          disabled={loading}
          className="px-4 py-2 text-sm font-semibold text-textInverse bg-primary rounded-md hover:bg-primaryHover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-focus disabled:opacity-50"
        >
          Sí
        </button>
        <button
          onClick={() => handleFeedback(false)}
          disabled={loading}
          className="px-4 py-2 text-sm font-semibold text-text bg-backgroundSecondary rounded-md hover:bg-surface focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-focus disabled:opacity-50"
        >
          No
        </button>
      </div>
      {error && <p className="text-sm text-error">{error}</p>}
    </div>
  );
};
