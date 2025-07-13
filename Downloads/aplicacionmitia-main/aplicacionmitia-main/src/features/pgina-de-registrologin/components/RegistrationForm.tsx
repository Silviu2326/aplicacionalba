import React from 'react';
import { Button } from '../../../components/Button';
import InputField from './InputField';
import ProfileTypeSelector from './ProfileTypeSelector';
import PasswordStrengthIndicator from './PasswordStrengthIndicator';

type ProfileType = 'cliente' | 'profesional' | null;

interface RegistrationFormProps {
  profileType: ProfileType;
  setProfileType: (type: 'cliente' | 'profesional') => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  isLoading: boolean;
  password?: string;
  onPasswordChange?: (password: string) => void;
}

const RegistrationForm: React.FC<RegistrationFormProps> = ({
  profileType,
  setProfileType,
  onSubmit,
  isLoading,
  password,
  onPasswordChange,
}) => {
  const buttonText =
    profileType === 'cliente' ? 'Crear cuenta' : 'Continuar';

  return (
    <form className="space-y-6" onSubmit={onSubmit}>
      <ProfileTypeSelector
        selectedType={profileType}
        onSelect={setProfileType}
        disabled={isLoading}
      />
      <InputField
        type="text"
        label="Nombre"
        name="name"
        placeholder="Tu nombre completo"
        disabled={isLoading}
      />
      <InputField
        type="email"
        label="Correo Electrónico"
        name="email"
        placeholder="tu@email.com"
        disabled={isLoading}
      />
      <InputField
        type="password"
        label="Contraseña"
        name="password"
        placeholder="Mínimo 8 caracteres"
        disabled={isLoading}
        value={password}
        onChange={(e) => onPasswordChange?.(e.target.value)}
      />
      <PasswordStrengthIndicator password={password} />
      <InputField
        type="password"
        label="Confirmar Contraseña"
        name="confirmPassword"
        placeholder="Repite tu contraseña"
        disabled={isLoading}
      />
      <div className="text-xs text-textMuted">
        <p>
          Al registrarte, aceptas nuestros{' '}
          <a href="/terminos" className="underline hover:text-primary">
            Términos y Condiciones
          </a>{' '}
          y nuestra{' '}
          <a href="/privacidad" className="underline hover:text-primary">
            Política de Privacidad
          </a>
          .
        </p>
      </div>
      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? 'Registrando...' : buttonText}
      </Button>
    </form>
  );
};

export default RegistrationForm;
