
import React, { useState, useEffect } from 'react';

interface ResendVerificationLinkProps {
  email: string;
  onResend: (email: string) => Promise<void>;
}

const ResendVerificationLink: React.FC<ResendVerificationLinkProps> = ({ email, onResend }) => {
  const [isSending, setIsSending] = useState(false);
  const [cooldown, setCooldown] = useState(0);
  const [message, setMessage] = useState('');

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (cooldown > 0) {
      timer = setTimeout(() => setCooldown(cooldown - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [cooldown]);

  const handleResendClick = async () => {
    if (cooldown > 0) return;

    setIsSending(true);
    setMessage('');
    try {
      await onResend(email);
      setMessage('Correo reenviado con éxito.');
      setCooldown(60);
    } catch (error) {
      setMessage('Error al reenviar el correo. Inténtalo de nuevo.');
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="mt-4 text-center p-4 bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700">
      <p>Tu cuenta aún no ha sido verificada.</p>
      <button
        onClick={handleResendClick}
        disabled={isSending || cooldown > 0}
        className="text-sm font-medium text-primary hover:text-primaryDark disabled:text-muted disabled:cursor-not-allowed"
      >
        {isSending
          ? 'Reenviando...'
          : cooldown > 0
          ? `Reenviar en ${cooldown}s`
          : 'Reenviar el correo de verificación'}
      </button>
      {message && <p className="text-sm mt-2">{message}</p>}
    </div>
  );
};

export default ResendVerificationLink;
