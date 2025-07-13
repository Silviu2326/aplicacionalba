import React from 'react';
import ChangePasswordForm from './ChangePasswordForm';
import TwoFactorAuthSetup from './TwoFactorAuthSetup';
import { FaShieldAlt, FaLock, FaMobileAlt, FaKey, FaExclamationTriangle } from 'react-icons/fa';

const SecuritySettings = () => {
  return (
    <div className="relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-primary opacity-5 rounded-full -translate-y-20 translate-x-20"></div>
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-secondary opacity-5 rounded-full translate-y-16 -translate-x-16"></div>
      
      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center space-x-4 mb-8">
          <div className="w-12 h-12 bg-gradient-to-r from-info to-infoDark rounded-xl flex items-center justify-center shadow-lg">
            <FaShieldAlt className="h-6 w-6 text-white" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-text">Configuración de Seguridad</h2>
            <p className="text-textMuted">Protege tu cuenta con configuraciones avanzadas de seguridad</p>
          </div>
        </div>

        {/* Security Alert */}
        <div className="bg-gradient-to-r from-warning/10 to-warningDark/10 border border-warning/20 rounded-2xl p-6 mb-8">
          <div className="flex items-start space-x-4">
            <div className="w-10 h-10 bg-warning/20 rounded-xl flex items-center justify-center">
              <FaExclamationTriangle className="h-5 w-5 text-warning" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-text mb-2">Mantén tu cuenta segura</h3>
              <p className="text-textMuted leading-relaxed">
                Te recomendamos usar una contraseña fuerte y habilitar la autenticación de dos factores para mayor seguridad.
              </p>
            </div>
          </div>
        </div>

        {/* Security Sections */}
        <div className="space-y-8">
          {/* Password Section */}
          <div className="bg-gradient-surface rounded-2xl shadow-xl border border-borderLight overflow-hidden">
            <div className="bg-gradient-to-r from-primary/5 to-primaryDark/5 p-6 border-b border-borderLight">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center shadow-lg">
                  <FaLock className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-text">Contraseña</h3>
                  <p className="text-textMuted">Cambia tu contraseña regularmente para mantener tu cuenta segura</p>
                </div>
              </div>
            </div>
            <div className="p-6">
              <ChangePasswordForm />
            </div>
          </div>

          {/* Two Factor Auth Section */}
          <div className="bg-gradient-surface rounded-2xl shadow-xl border border-borderLight overflow-hidden">
            <div className="bg-gradient-to-r from-secondary/5 to-secondaryDark/5 p-6 border-b border-borderLight">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-gradient-secondary rounded-xl flex items-center justify-center shadow-lg">
                  <FaMobileAlt className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-text">Autenticación de Dos Factores</h3>
                  <p className="text-textMuted">Añade una capa extra de seguridad a tu cuenta</p>
                </div>
              </div>
            </div>
            <div className="p-6">
              <TwoFactorAuthSetup />
            </div>
          </div>

          {/* Security Tips */}
          <div className="bg-gradient-surface rounded-2xl shadow-xl border border-borderLight p-8">
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-10 h-10 bg-gradient-to-r from-success to-successDark rounded-xl flex items-center justify-center shadow-lg">
                <FaKey className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-text">Consejos de Seguridad</h3>
                <p className="text-textMuted">Mejores prácticas para mantener tu cuenta protegida</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-success/5 border border-success/20 rounded-xl p-4">
                <h4 className="font-semibold text-text mb-2">✓ Contraseña Segura</h4>
                <p className="text-textMuted text-sm">Usa al menos 8 caracteres con mayúsculas, minúsculas, números y símbolos.</p>
              </div>
              <div className="bg-info/5 border border-info/20 rounded-xl p-4">
                <h4 className="font-semibold text-text mb-2">✓ Autenticación 2FA</h4>
                <p className="text-textMuted text-sm">Habilita la verificación en dos pasos para mayor protección.</p>
              </div>
              <div className="bg-warning/5 border border-warning/20 rounded-xl p-4">
                <h4 className="font-semibold text-text mb-2">⚠ Sesiones Activas</h4>
                <p className="text-textMuted text-sm">Revisa regularmente las sesiones activas en tu cuenta.</p>
              </div>
              <div className="bg-error/5 border border-error/20 rounded-xl p-4">
                <h4 className="font-semibold text-text mb-2">⚠ Actividad Sospechosa</h4>
                <p className="text-textMuted text-sm">Reporta inmediatamente cualquier actividad inusual.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecuritySettings;