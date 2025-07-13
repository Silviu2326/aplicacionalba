import { useState } from 'react';
import { changePassword, setupTwoFactorAuth, verifyTwoFactorAuth } from '../api';

export const useSecuritySettings = () => {
  // Change Password State
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [changePasswordError, setChangePasswordError] = useState<string | null>(null);
  const [changePasswordSuccess, setChangePasswordSuccess] = useState<string | null>(null);

  // 2FA State
  const [isSettingUp2FA, setIsSettingUp2FA] = useState(false);
  const [setup2FAError, setSetup2FAError] = useState<string | null>(null);
  const [qrCodeUrl, setQrCodeUrl] = useState<string | null>(null);
  const [recoveryCodes, setRecoveryCodes] = useState<string[]>([]);
  const [is2faEnabled, setIs2faEnabled] = useState(false); // Simulación del estado de 2FA

  const handleChangePassword = async (passwordData: object) => {
    setIsChangingPassword(true);
    setChangePasswordError(null);
    setChangePasswordSuccess(null);
    try {
      const result = await changePassword(passwordData);
      setChangePasswordSuccess(result.message);
    } catch (error) {
      setChangePasswordError(error instanceof Error ? error.message : 'Ocurrió un error desconocido');
    } finally {
      setIsChangingPassword(false);
    }
  };

  const handleSetup2FA = async () => {
    setIsSettingUp2FA(true);
    setSetup2FAError(null);
    setQrCodeUrl(null);
    try {
      const result = await setupTwoFactorAuth();
      setQrCodeUrl(result.qrCodeUrl);
    } catch (error) {
      setSetup2FAError(error instanceof Error ? error.message : 'No se pudo iniciar la configuración de 2FA');
    } finally {
      setIsSettingUp2FA(false);
    }
  };

  const handleVerify2FA = async (token: string) => {
    setIsSettingUp2FA(true);
    setSetup2FAError(null);
    try {
      const result = await verifyTwoFactorAuth(token);
      setRecoveryCodes(result.recoveryCodes);
      setIs2faEnabled(true); // Marcar como activado
      setQrCodeUrl(null); // Ocultar QR
    } catch (error) {
      setSetup2FAError(error instanceof Error ? error.message : 'El token de verificación es incorrecto');
    } finally {
      setIsSettingUp2FA(false);
    }
  };
  
  const handleDisable2FA = () => {
    // En una app real, esto llamaría a un endpoint en la API
    setIs2faEnabled(false);
    setRecoveryCodes([]);
    alert('Autenticación de dos factores deshabilitada.');
  };


  return {
    // Password
    isChangingPassword,
    changePasswordError,
    changePasswordSuccess,
    handleChangePassword,
    // 2FA
    isSettingUp2FA,
    setup2FAError,
    qrCodeUrl,
    recoveryCodes,
    is2faEnabled,
    handleSetup2FA,
    handleVerify2FA,
    handleDisable2FA,
    setRecoveryCodes,
  };
};
