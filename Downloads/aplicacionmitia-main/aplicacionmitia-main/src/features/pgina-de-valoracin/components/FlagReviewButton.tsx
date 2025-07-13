import { useState } from 'react';
import { reportProblem } from '../api';

interface FlagReviewButtonProps {
  bookingId: string;
}

export const FlagReviewButton = ({ bookingId }: FlagReviewButtonProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleOpenModal = () => {
    setIsModalOpen(true);
    setError(null);
    setSuccess(null);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCategory('');
    setDescription('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!category) {
      setError('Por favor, selecciona una categoría.');
      return;
    }
    setIsSubmitting(true);
    setError(null);
    try {
      await reportProblem({ bookingId, category, description });
      setSuccess('Tu reporte ha sido enviado con éxito. Lo revisaremos a la brevedad.');
      setTimeout(() => {
        handleCloseModal();
      }, 3000);
    } catch (err) {
      setError('Hubo un error al enviar tu reporte. Por favor, inténtalo de nuevo.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <button
        onClick={handleOpenModal}
        className="text-sm text-textMuted hover:text-warning transition-colors duration-200"
      >
        Reportar un problema con esta sesión
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 bg-overlay flex items-center justify-center z-50">
          <div className="bg-surface p-8 rounded-lg shadow-lg w-full max-w-md m-4">
            <h2 className="text-2xl font-bold text-text mb-4">Reportar un Problema</h2>
            {success ? (
              <div className="text-success bg-successLight p-4 rounded-md">{success}</div>
            ) : (
              <form onSubmit={handleSubmit}>
                <p className="text-textSecondary mb-6">
                  Si tuviste un problema grave durante tu sesión, por favor, infórmanos. Tu reporte es confidencial.
                </p>
                <div className="mb-4">
                  <label htmlFor="category" className="block text-textSecondary text-sm font-bold mb-2">
                    Categoría del Problema
                  </label>
                  <select
                    id="category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full bg-backgroundSecondary border border-border rounded-md p-2 text-text focus:outline-none focus:ring-2 focus:ring-focus"
                  >
                    <option value="">Selecciona una categoría</option>
                    <option value="Conducta inapropiada">Conducta inapropiada</option>
                    <option value="Problema de seguridad">Problema de seguridad</option>
                    <option value="Discurso de odio">Discurso de odio</option>
                    <option value="Violación de privacidad">Violación de privacidad</option>
                    <option value="Otro">Otro</option>
                  </select>
                </div>
                <div className="mb-6">
                  <label htmlFor="description" className="block text-textSecondary text-sm font-bold mb-2">
                    Describe lo sucedido
                  </label>
                  <textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={4}
                    className="w-full bg-backgroundSecondary border border-border rounded-md p-2 text-text focus:outline-none focus:ring-2 focus:ring-focus"
                    placeholder="Proporciona todos los detalles que consideres relevantes."
                  />
                </div>
                {error && <p className="text-error mb-4">{error}</p>}
                <div className="flex justify-end gap-4">
                  <button
                    type="button"
                    onClick={handleCloseModal}
                    disabled={isSubmitting}
                    className="bg-muted hover:bg-opacity-80 text-textInverse font-bold py-2 px-4 rounded-md transition-colors duration-200 disabled:opacity-50"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-error hover:bg-errorDark text-white font-bold py-2 px-4 rounded-md transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'Enviando...' : 'Enviar Reporte'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
};
