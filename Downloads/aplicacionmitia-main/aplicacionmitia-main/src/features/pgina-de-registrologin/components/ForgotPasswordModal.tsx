
import React, { useState } from 'react';

interface ForgotPasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRequestReset: (email: string) => void;
}

const ForgotPasswordModal: React.FC<ForgotPasswordModalProps> = ({ isOpen, onClose, onRequestReset }) => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onRequestReset(email);
    setIsSubmitted(true);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-overlay flex items-center justify-center z-50">
      <div className="bg-card p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-text mb-6">Restablecer Contraseña</h2>
        {isSubmitted ? (
          <div>
            <p className="text-textSecondary">
              Si una cuenta con ese correo electrónico existe, enviaremos un enlace para restablecer la contraseña.
            </p>
            <button
              onClick={() => {
                onClose();
                setIsSubmitted(false);
              }}
              className="mt-4 w-full bg-primary text-textInverse font-bold py-2 px-4 rounded hover:bg-primaryHover transition duration-300"
            >
              Cerrar
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <p className="text-textMuted mb-4">
              Ingresa tu correo electrónico y te enviaremos un enlace para restablecer tu contraseña.
            </p>
            <div className="mb-4">
              <label htmlFor="email" className="block text-textSecondary text-sm font-bold mb-2">
                Correo Electrónico
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-3 py-2 text-textInverse bg-surface border border-border rounded focus:outline-none focus:ring-2 focus:ring-focus"
                placeholder="tu@email.com"
              />
            </div>
            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={onClose}
                className="bg-muted text-text py-2 px-4 rounded hover:bg-opacity-80 transition duration-300"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="bg-primary text-textInverse font-bold py-2 px-4 rounded hover:bg-primaryHover transition duration-300"
              >
                Enviar Enlace
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default ForgotPasswordModal;
