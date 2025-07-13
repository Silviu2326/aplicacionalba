
import { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { verifyEmailToken } from '../api';

type VerificationStatus = 'verifying' | 'success' | 'error';

const VerificationStatusPage = () => {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState<VerificationStatus>('verifying');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = searchParams.get('token');

    if (!token) {
      setStatus('error');
      setError('No se proporcionó un token de verificación.');
      return;
    }

    const verifyToken = async () => {
      try {
        await verifyEmailToken(token);
        setStatus('success');
      } catch (err: any) {
        setStatus('error');
        setError(err.message || 'El token es inválido o ha expirado.');
      }
    };

    verifyToken();
  }, [searchParams]);

  const renderVerifying = () => (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background text-text">
      <div className="p-8 max-w-md w-full bg-surface rounded-lg shadow-lg text-center">
        <h1 className="text-3xl font-bold text-primary mb-4">Verificando tu cuenta</h1>
        <p className="text-textSecondary">Por favor, espera un momento...</p>
        <div className="mt-6">
          <svg className="animate-spin h-8 w-8 text-primary mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        </div>
      </div>
    </div>
  );

  const renderSuccess = () => (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background text-text">
      <div className="p-8 max-w-md w-full bg-surface rounded-lg shadow-lg text-center">
        <h1 className="text-3xl font-bold text-success mb-4">¡Cuenta verificada!</h1>
        <p className="text-textSecondary mb-6">Tu cuenta ha sido verificada exitosamente.</p>
        <Link
          to="/auth"
          className="w-full bg-primary hover:bg-primaryHover text-white font-bold py-2 px-4 rounded-lg transition duration-300"
        >
          Iniciar Sesión
        </Link>
      </div>
    </div>
  );

  const renderError = () => (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background text-text">
      <div className="p-8 max-w-md w-full bg-surface rounded-lg shadow-lg text-center">
        <h1 className="text-3xl font-bold text-error mb-4">Error de Verificación</h1>
        <p className="text-textSecondary mb-6">{error}</p>
        <button
          onClick={() => alert('Reenviando correo de verificación... (funcionalidad no implementada)')}
          className="w-full bg-secondary hover:bg-secondaryHover text-white font-bold py-2 px-4 rounded-lg transition duration-300"
        >
          Reenviar correo de verificación
        </button>
      </div>
    </div>
  );

  switch (status) {
    case 'verifying':
      return renderVerifying();
    case 'success':
      return renderSuccess();
    case 'error':
      return renderError();
    default:
      return null;
  }
};

export default VerificationStatusPage;
