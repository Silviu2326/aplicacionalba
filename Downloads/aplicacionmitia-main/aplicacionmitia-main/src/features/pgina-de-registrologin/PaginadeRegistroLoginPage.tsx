import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import RegistrationForm from './components/RegistrationForm';
import { LoginForm } from './components/LoginForm';
import { usePaginadeRegistroLogin } from './hooks/usePaginadeRegistroLogin';
import ForgotPasswordModal from './components/ForgotPasswordModal';
import SocialLoginButtons from './components/SocialLoginButtons';
import ResendVerificationLink from './components/ResendVerificationLink';
import DashboardPreview from './components/DashboardPreview';
import TwoFactorAuthPrompt from './components/TwoFactorAuthPrompt';

const PaginadeRegistroLoginPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const {
    handleLogin,
    handleRegister,
    isLoading,
    error,
    isForgotPasswordModalOpen,
    openForgotPasswordModal,
    closeForgotPasswordModal,
    handleRequestPasswordReset,
    profileType,
    setProfileType,
    handleGoogleLogin,
    showResendVerification,
    handleResendVerification,
    verificationEmail,
    show2faPrompt,
    close2faPrompt,
  } = usePaginadeRegistroLogin();
  const mode = searchParams.get('mode') || 'login';

  useEffect(() => {
    const role = searchParams.get('role');
    if (role === 'professional' || role === 'profesional') {
      setProfileType('Profesional');
    } else if (role === 'client' || role === 'cliente') {
      setProfileType('Cliente');
    } else {
      setProfileType(null);
    }
  }, [searchParams, setProfileType]);

  const isSignUp = mode === 'signup';

  const handleRegistrationSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    handleRegister(data);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-text">
            {isSignUp ? 'Crea tu Cuenta' : 'Bienvenido de Nuevo'}
          </h1>
          <p className="text-textSecondary mt-2">
            {isSignUp
              ? 'Regístrate para empezar a mejorar tu bienestar.'
              : 'Inicia sesión para acceder a tu panel.'}
          </p>
        </div>

        {isSignUp ? (
          <RegistrationForm
            profileType={profileType}
            setProfileType={setProfileType}
            onSubmit={handleRegistrationSubmit}
            isLoading={isLoading}
            password={password}
            onPasswordChange={setPassword}
          />
        ) : (
          <LoginForm
            onSubmit={(data) => handleLogin({ ...data, rememberMe })}
            isLoading={isLoading}
            error={error}
            onForgotPassword={openForgotPasswordModal}
            rememberMe={rememberMe}
            setRememberMe={setRememberMe}
          />
        )}

        {isSignUp && profileType && <DashboardPreview userType={profileType} />}

        {showResendVerification && (
            <ResendVerificationLink
                email={verificationEmail}
                onResend={handleResendVerification}
            />
        )}

        <div className="my-6">
          <SocialLoginButtons
            onGoogleSuccess={(res) => handleGoogleLogin(res, rememberMe)}
            onGoogleFailure={() => console.log('Login Failed')}
          />
        </div>

        <div className="mt-6 text-center">
          <p className="text-sm text-textMuted">
            {isSignUp ? '¿Ya tienes una cuenta?' : '¿No tienes una cuenta?'}
            <a
              href={`?mode=${isSignUp ? 'login' : 'signup'}`}
              className="ml-2 font-semibold text-primary hover:text-primaryHover"
            >
              {isSignUp ? 'Inicia Sesión' : 'Regístrate'}
            </a>
          </p>
        </div>
      </div>
      <ForgotPasswordModal
        isOpen={isForgotPasswordModalOpen}
        onClose={closeForgotPasswordModal}
        onRequestReset={handleRequestPasswordReset}
      />
      {show2faPrompt && <TwoFactorAuthPrompt onClose={close2faPrompt} />}
    </div>
  );
};

export default PaginadeRegistroLoginPage;
