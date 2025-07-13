import React, { useState, useEffect } from 'react';
import { Button } from '../../../components/Button';
import { useSecuritySettings } from '../hooks/useSecuritySettings';

const TwoFactorAuthSetup = () => {
  const {
    isSettingUp2FA,
    setup2FAError,
    qrCodeUrl,
    recoveryCodes,
    is2faEnabled,
    handleSetup2FA,
    handleVerify2FA,
    handleDisable2FA,
    setRecoveryCodes,
  } = useSecuritySettings();

  const [verificationCode, setVerificationCode] = useState('');
  const [formError, setFormError] = useState('');

  const handleEnableClick = () => {
    handleSetup2FA();
  };

  const handleVerifyClick = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');
    if (verificationCode.length !== 6) {
      setFormError('El código de verificación debe tener 6 dígitos.');
      return;
    }
    handleVerify2FA(verificationCode);
  };
  
  useEffect(() => {
    if (!qrCodeUrl) {
      setVerificationCode('');
      setFormError('');
    }
  }, [qrCodeUrl]);

  const inputStyles = "w-full px-4 py-2 border rounded-lg bg-surface border-border focus:outline-none focus:ring-2 focus:ring-focus text-text";

  return (
    <div className="bg-card p-6 rounded-lg shadow-lg w-full max-w-md mt-8">
      <h3 className="text-2xl font-bold text-text mb-4">Autenticación de Dos Factores (2FA)</h3>
      
      {is2faEnabled ? (
        <div>
          <p className="text-success mb-4">2FA está <span className="font-bold">ACTIVADO</span> en tu cuenta.</p>
          <Button onClick={handleDisable2FA} variant="danger">
            Deshabilitar 2FA
          </Button>
        </div>
      ) : (
        <div>
          <p className="text-textSecondary mb-4">Añade una capa extra de seguridad a tu cuenta.</p>
          <Button onClick={handleEnableClick} variant="secondary" disabled={isSettingUp2FA}>
            {isSettingUp2FA && !qrCodeUrl ? 'Cargando...' : 'Configurar 2FA'}
          </Button>
        </div>
      )}

      {qrCodeUrl && !is2faEnabled && (
        <div className="mt-6 border-t border-border pt-6">
          <h4 className="text-xl font-semibold text-text mb-4">Configurar 2FA</h4>
          <p className="text-textSecondary mb-4">1. Escanea este código QR con tu app de autenticación.</p>
          <div className="bg-surface border border-borderLight p-4 rounded-lg inline-block mb-4">
            <img src={qrCodeUrl} alt="QR Code" />
          </div>
          <p className="text-textSecondary mb-4">2. Ingresa el código de 6 dígitos generado por tu app.</p>
          <form onSubmit={handleVerifyClick}>
            <input
              type="text"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              className={inputStyles + " tracking-[0.5em] text-center"}
              maxLength={6}
              placeholder="123456"
              disabled={isSettingUp2FA}
            />
            {formError && <p className="text-error text-sm mt-2">{formError}</p>}
            {setup2FAError && <p className="text-error text-sm mt-2">{setup2FAError}</p>}
            <div className="flex justify-end mt-4">
                <Button type="submit" variant="primary" disabled={isSettingUp2FA}>
                    {isSettingUp2FA ? 'Verificando...' : 'Verificar y Activar'}
                </Button>
            </div>
          </form>
        </div>
      )}

      {recoveryCodes.length > 0 && (
        <div className="mt-6 border-t border-border pt-6">
            <h4 className="text-xl font-semibold text-text mb-4">Códigos de Recuperación</h4>
            <p className="text-warningLight mb-4">Guarda estos códigos en un lugar seguro. Se usarán si pierdes acceso a tu dispositivo.</p>
            <div className="bg-surface p-4 rounded-lg">
                <ul className="grid grid-cols-2 gap-2 text-text text-center">
                    {recoveryCodes.map(code => <li key={code} className="font-mono bg-backgroundSecondary p-2 rounded">{code}</li>)}
                </ul>
            </div>
            <div className="flex justify-end mt-4">
                <Button onClick={() => setRecoveryCodes([])}>
                    Entendido, los he guardado
                </Button>
            </div>
        </div>
      )}

    </div>
  );
};

export default TwoFactorAuthSetup;