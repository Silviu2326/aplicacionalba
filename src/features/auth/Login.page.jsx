import React, { useState } from 'react';
import { Eye, EyeOff, Dumbbell, Mail, Lock } from 'lucide-react';
import Button from '../../components/Button';
import Card from '../../components/Card';

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: 'alba@fitcoach.com',
    password: '123456'
  });
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      // Simular autenticación
      const response = await import('./login.api').then(module => 
        module.login(formData)
      );
      
      if (response.success) {
        // Guardar datos del usuario
        localStorage.setItem('token', response.token);
        localStorage.setItem('user', JSON.stringify(response.user));
        
        // Redirigir al dashboard
        window.location.href = '/dashboard';
      }
    } catch (err) {
      setError(err.message || 'Error durante el login');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setError(''); // Limpiar error al cambiar campos
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand/10 via-neutral-50 to-brand-light/20 dark:from-neutral-900 dark:via-neutral-800 dark:to-brand-dark/30 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Elementos decorativos de fondo */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-brand/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-brand-light/20 rounded-full blur-3xl"></div>
      </div>
      <div className="w-full max-w-md">
        {/* Logo y título */}
        <div className="text-center mb-8 relative z-10">
          <div className="inline-flex items-center justify-center w-20 h-20 glass-mid mb-6 animate-glass-pop">
            <Dumbbell size={36} className="text-brand" />
          </div>
          <h1 className="text-3xl font-display font-bold text-neutral-900 dark:text-white mb-3 animate-fade-in-up">FitCoach Pro</h1>
          <p className="text-neutral-600 dark:text-neutral-300 font-medium">
            {isLogin ? 'Accede a tu plataforma de entrenamiento' : 'Crea tu cuenta de entrenador'}
          </p>
        </div>

        <div className="glass-mid p-8 animate-glass-pop relative z-10">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Credenciales de prueba */}
            <div className="glass p-6 border border-brand/20">
              <h3 className="font-display font-semibold text-brand mb-3 flex items-center gap-2">
                <span className="text-xl">👋</span> Usuario de Prueba
              </h3>
              <div className="text-sm text-neutral-700 dark:text-neutral-300 space-y-2">
                <p><strong className="text-brand">Email:</strong> alba@fitcoach.com</p>
                <p><strong className="text-brand">Contraseña:</strong> 123456</p>
                <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-3 italic">Los campos ya están pre-rellenados para tu comodidad</p>
              </div>
            </div>

            {error && (
              <div className="glass p-4 border border-red-400/30 bg-red-500/10">
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-sm font-bold">!</span>
                  </div>
                  <span className="text-red-700 dark:text-red-300 text-sm font-medium">{error}</span>
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-semibold text-neutral-700 dark:text-neutral-300 mb-3">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-neutral-400" size={20} />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  disabled={loading}
                  className="pl-12 w-full glass border border-white/20 dark:border-white/10 rounded-2xl px-4 py-4 focus:ring-2 focus:ring-brand focus:border-brand transition-all duration-200 text-neutral-900 dark:text-white placeholder-neutral-500"
                  placeholder="tu@email.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-neutral-700 dark:text-neutral-300 mb-3">
                Contraseña
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-neutral-400" size={20} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  disabled={loading}
                  className="pl-12 pr-12 w-full glass border border-white/20 dark:border-white/10 rounded-2xl px-4 py-4 focus:ring-2 focus:ring-brand focus:border-brand transition-all duration-200 text-neutral-900 dark:text-white placeholder-neutral-500"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={loading}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-neutral-400 hover:text-brand transition-colors duration-200"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {!isLogin && (
              <div>
                <label className="block text-sm font-semibold text-neutral-700 dark:text-neutral-300 mb-3">
                  Confirmar contraseña
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-neutral-400" size={20} />
                  <input
                    type="password"
                    name="confirmPassword"
                    required={!isLogin}
                    className="pl-12 w-full glass border border-white/20 dark:border-white/10 rounded-2xl px-4 py-4 focus:ring-2 focus:ring-brand focus:border-brand transition-all duration-200 text-neutral-900 dark:text-white placeholder-neutral-500"
                    placeholder="••••••••"
                  />
                </div>
              </div>
            )}

            {isLogin && (
              <div className="flex items-center justify-between">
                <label className="flex items-center group cursor-pointer">
                  <input
                    type="checkbox"
                    disabled={loading}
                    className="h-4 w-4 text-brand focus:ring-brand border-neutral-300 rounded transition-colors duration-200"
                  />
                  <span className="ml-3 text-sm text-neutral-600 dark:text-neutral-400 group-hover:text-neutral-800 dark:group-hover:text-neutral-200 transition-colors duration-200">Recordarme</span>
                </label>
                <button
                  type="button"
                  disabled={loading}
                  className="text-sm text-brand hover:text-brand-dark font-semibold transition-colors duration-200"
                >
                  ¿Olvidaste tu contraseña?
                </button>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-brand to-brand-light hover:from-brand-dark hover:to-brand text-white font-semibold py-4 px-6 rounded-2xl transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-frosted"
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                  {isLogin ? 'Iniciando sesión...' : 'Creando cuenta...'}
                </div>
              ) : (
                isLogin ? 'Iniciar Sesión' : 'Crear Cuenta'
              )}
            </button>

            <div className="text-center">
              <span className="text-sm text-neutral-600 dark:text-neutral-400">
                {isLogin ? '¿No tienes cuenta? ' : '¿Ya tienes cuenta? '}
              </span>
              <button
                type="button"
                onClick={() => setIsLogin(!isLogin)}
                disabled={loading}
                className="text-sm text-brand hover:text-brand-dark font-semibold transition-colors duration-200 underline decoration-brand/30 hover:decoration-brand"
              >
                {isLogin ? 'Regístrate aquí' : 'Inicia sesión aquí'}
              </button>
            </div>
          </form>
        </div>

        {/* Features destacadas */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 text-center relative z-10">
          <div className="glass p-6 hover:glass-mid transition-all duration-300 transform hover:scale-105">
            <div className="w-12 h-12 bg-gradient-to-br from-brand/20 to-brand-light/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">📊</span>
            </div>
            <h3 className="font-display font-semibold text-neutral-900 dark:text-white text-sm">Dashboard Completo</h3>
          </div>
          <div className="glass p-6 hover:glass-mid transition-all duration-300 transform hover:scale-105">
            <div className="w-12 h-12 bg-gradient-to-br from-emerald-500/20 to-emerald-400/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">👥</span>
            </div>
            <h3 className="font-display font-semibold text-neutral-900 dark:text-white text-sm">Gestión de Clientes</h3>
          </div>
          <div className="glass p-6 hover:glass-mid transition-all duration-300 transform hover:scale-105">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500/20 to-purple-400/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">💳</span>
            </div>
            <h3 className="font-display font-semibold text-neutral-900 dark:text-white text-sm">Pagos Integrados</h3>
          </div>
        </div>

        <div className="mt-12 text-center text-xs text-neutral-500 dark:text-neutral-400 relative z-10">
          <p>© 2024 FitCoach Pro. Todos los derechos reservados.</p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;