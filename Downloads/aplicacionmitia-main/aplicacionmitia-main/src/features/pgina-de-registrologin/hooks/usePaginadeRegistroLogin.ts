
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login, register, requestPasswordReset, googleLogin, resendVerificationEmail } from '../api';
import { CredentialResponse } from '@react-oauth/google';

type ProfileType = 'cliente' | 'profesional' | null;

interface ApiError {
  code?: string;
}

export const usePaginadeRegistroLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showResendVerification, setShowResendVerification] = useState(false);
  const [verificationEmail, setVerificationEmail] = useState('');
  const [isForgotPasswordModalOpen, setIsForgotPasswordModalOpen] =
    useState(false);
  const [profileType, setProfileType] = useState<ProfileType>(null);
  const [show2faPrompt, setShow2faPrompt] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async ({ email, password, rememberMe }) => {
    setIsLoading(true);
    setError(null);
    setShowResendVerification(false);
    try {
      const { token, userType, is2faEnabled } = await login({ email, password });

      if (rememberMe) {
        localStorage.setItem('authToken', token);
      } else {
        sessionStorage.setItem('authToken', token);
      }

      // Disparar evento para notificar cambio de autenticación
      window.dispatchEvent(new Event('authChange'));

      if (!is2faEnabled) {
        const remindLater = localStorage.getItem('remind2faLater');
        if (!remindLater || (Date.now() - parseInt(remindLater, 10)) > 7 * 24 * 60 * 60 * 1000) {
          setShow2faPrompt(true);
        }
      }

      if (userType === 'cliente') {
        navigate('/panel-usuario');
      } else if (userType === 'profesional') {
        navigate('/panel-profesional');
      } else {
        navigate('/');
      }
    } catch (err: unknown) {
        const error = err as ApiError
        if (error.code === 'ACCOUNT_NOT_VERIFIED') {
            setShowResendVerification(true);
            setVerificationEmail(email);
            setError(null);
        } else {
            setError('Credenciales incorrectas. Por favor, inténtalo de nuevo.');
        }
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendVerification = async (email: string) => {
    await resendVerificationEmail(email);
  };

  const handleRegister = async (formData) => {
    setIsLoading(true);
    setError(null);
    try {
      // Aquí se llamaría a la API de registro
      await register({ ...formData, profileType });
      
      // Redirigir según el tipo de perfil
      if (profileType === 'profesional') {
        navigate('/registro-profesional-paso-2'); // Flujo de onboarding para profesionales
      } else {
        navigate('/panel-usuario'); // O a una página de bienvenida
      }
    } catch {
      setError('Error en el registro. Por favor, revisa tus datos.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRequestPasswordReset = async (email: string) => {
    setIsLoading(true);
    setError(null);
    try {
      await requestPasswordReset(email);
    } catch (err) {
      // Silently fail to prevent user enumeration
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async (response: CredentialResponse, rememberMe: boolean) => {
    setIsLoading(true);
    setError(null);
    try {
      const { token, userType } = await googleLogin(response);
      if (rememberMe) {
        localStorage.setItem('authToken', token);
      } else {
        sessionStorage.setItem('authToken', token);
      }
      
      // Disparar evento para notificar cambio de autenticación
      window.dispatchEvent(new Event('authChange'));
      
      if (userType === 'cliente') {
        navigate('/panel-usuario');
      } else if (userType === 'profesional') {
        navigate('/panel-profesional');
      } else {
        navigate('/');
      }
    } catch {
      setError('Error con el login de Google. Por favor, inténtalo de nuevo.');
    } finally {
      setIsLoading(false);
    }
  };

  const openForgotPasswordModal = () => setIsForgotPasswordModalOpen(true);
  const closeForgotPasswordModal = () => setIsForgotPasswordModalOpen(false);
  const close2faPrompt = () => setShow2faPrompt(false);

  return {
    isLoading,
    error,
    profileType,
    setProfileType,
    handleLogin,
    handleRegister,
    isForgotPasswordModalOpen,
    openForgotPasswordModal,
    closeForgotPasswordModal,
    handleRequestPasswordReset,
    handleGoogleLogin,
    showResendVerification,
    handleResendVerification,
    verificationEmail,
    show2faPrompt,
    close2faPrompt,
  };
};
