
import React from 'react';
import { ShieldCheckIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';

interface TwoFactorAuthPromptProps {
  onClose: () => void;
}

const TwoFactorAuthPrompt: React.FC<TwoFactorAuthPromptProps> = ({ onClose }) => {
  const navigate = useNavigate();

  const handleConfigureNow = () => {
    navigate('/pgina-de-configuracin-de-cuenta');
    onClose();
  };

  const handleRemindLater = () => {
    // Logic to remind later (e.g., set a value in localStorage)
    localStorage.setItem('remind2faLater', Date.now().toString());
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-overlay flex justify-center items-center z-50">
      <div className="bg-surface rounded-lg p-8 shadow-2xl max-w-md w-full text-center border border-border">
        <div className="flex justify-center mb-4">
          <ShieldCheckIcon className="h-16 w-16 text-primary" />
        </div>
        <h2 className="text-2xl font-bold text-text mb-3">Protege tu Cuenta</h2>
        <p className="text-textSecondary mb-6">
          Activa la autenticación de dos factores (2FA) para añadir una capa extra de seguridad. Esto ayuda a mantener tu cuenta y los datos de tus clientes seguros.
        </p>
        <div className="flex flex-col space-y-3">
          <button
            onClick={handleConfigureNow}
            className="w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-primaryHover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
          >
            Configurar Ahora
          </button>
          <button
            onClick={handleRemindLater}
            className="w-full bg-backgroundSecondary text-text py-2 px-4 rounded-md hover:bg-card focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400"
          >
            Recordármelo más tarde
          </button>
        </div>
      </div>
    </div>
  );
};

export default TwoFactorAuthPrompt;
