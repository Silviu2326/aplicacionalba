
import { useState } from 'react';
import { Button } from '../../../components/Button';
import InputField from './InputField';
import { Eye, EyeOff, Info } from 'lucide-react';
import Tooltip from './Tooltip';

export const LoginForm = ({ onSubmit, error, isLoading, onForgotPassword, rememberMe, setRememberMe }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ email, password });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-card p-8 rounded-lg shadow-lg w-full max-w-md">
      <h2 className="text-2xl font-bold text-center text-text">Iniciar Sesión</h2>
      
      {error && (
        <div className="bg-errorLight p-3 rounded-md text-center">
          <p className="text-errorDark font-semibold">{error}</p>
        </div>
      )}

      <InputField
        id="email"
        type="email"
        label="Correo Electrónico"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="tu@email.com"
        required
      />

      <div className="relative">
        <InputField
          id="password"
          type={showPassword ? 'text' : 'password'}
          label="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          required
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute inset-y-0 right-0 top-7 pr-3 flex items-center text-textMuted hover:text-text"
        >
          {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <input
            id="remember-me"
            name="remember-me"
            type="checkbox"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
            className="h-4 w-4 rounded border-border text-primary focus:ring-focus"
          />
          <label htmlFor="remember-me" className="ml-2 block text-sm text-textSecondary">
            Recordarme
          </label>
          <Tooltip text="No uses esta opción en un dispositivo público o compartido.">
            <Info size={16} className="ml-1 text-textMuted" />
          </Tooltip>
        </div>

        <div className="text-sm">
          <a href="#" onClick={(e) => { e.preventDefault(); onForgotPassword(); }} className="font-medium text-primary hover:text-primaryHover">
            ¿Olvidaste tu contraseña?
          </a>
        </div>
      </div>

      <div>
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? 'Iniciando...' : 'Iniciar Sesión'}
        </Button>
      </div>
    </form>
  );
};
