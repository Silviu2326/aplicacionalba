import React, { useState, useEffect } from 'react';
import PasswordStrengthIndicator from '../../pgina-de-registrologin/components/PasswordStrengthIndicator';
import { Button } from '../../../components/Button';
import { useSecuritySettings } from '../hooks/useSecuritySettings';

const ChangePasswordForm = () => {
  const { 
    handleChangePassword, 
    isChangingPassword, 
    changePasswordError, 
    changePasswordSuccess 
  } = useSecuritySettings();

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [formError, setFormError] = useState('');

  useEffect(() => {
    if (changePasswordSuccess) {
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
        setFormError('');
    }
  }, [changePasswordSuccess]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    if (!currentPassword || !newPassword || !confirmPassword) {
      setFormError('Todos los campos son obligatorios.');
      return;
    }
    if (newPassword !== confirmPassword) {
      setFormError('Las nuevas contraseñas no coinciden.');
      return;
    }
    if (newPassword.length < 8) {
      setFormError('La nueva contraseña debe tener al menos 8 caracteres.');
      return;
    }

    await handleChangePassword({ currentPassword, newPassword, confirmPassword });
  };

  const inputStyles = "w-full px-4 py-2 border rounded-lg bg-surface border-border focus:outline-none focus:ring-2 focus:ring-focus text-text";

  return (
    <div className="bg-card p-6 rounded-lg shadow-lg w-full max-w-md">
      <h3 className="text-2xl font-bold text-text mb-6">Cambiar Contraseña</h3>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-textSecondary mb-2" htmlFor="current-password">
            Contraseña Actual
          </label>
          <input
            type="password"
            id="current-password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            className={inputStyles}
            disabled={isChangingPassword}
          />
        </div>
        <div>
          <label className="block text-textSecondary mb-2" htmlFor="new-password">
            Nueva Contraseña
          </label>
          <input
            type="password"
            id="new-password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className={inputStyles}
            disabled={isChangingPassword}
          />
          <PasswordStrengthIndicator password={newPassword} />
        </div>
        <div>
          <label className="block text-textSecondary mb-2" htmlFor="confirm-password">
            Confirmar Nueva Contraseña
          </label>
          <input
            type="password"
            id="confirm-password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className={inputStyles}
            disabled={isChangingPassword}
          />
        </div>
        
        {formError && <p className="text-error text-sm">{formError}</p>}
        {changePasswordError && <p className="text-error text-sm">{changePasswordError}</p>}
        {changePasswordSuccess && <p className="text-success text-sm">{changePasswordSuccess}</p>}

        <div className="flex justify-end">
            <Button type="submit" variant="primary" disabled={isChangingPassword}>
                {isChangingPassword ? 'Actualizando...' : 'Actualizar Contraseña'}
            </Button>
        </div>
      </form>
    </div>
  );
};

export default ChangePasswordForm;