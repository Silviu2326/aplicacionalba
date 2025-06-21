import React, { useState } from 'react';
import { Eye, EyeOff, Mail, Lock, User, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function LoginForm() {
  const { login, register, isLoading } = useAuth();
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: ''
  });
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!formData.email || !formData.password) {
      setError('Por favor completa todos los campos');
      return;
    }

    if (!isLoginMode && !formData.name) {
      setError('Por favor ingresa tu nombre');
      return;
    }

    try {
      let success = false;
      
      if (isLoginMode) {
        success = await login(formData.email, formData.password);
        if (!success) {
          setError('Email o contraseña incorrectos');
        }
      } else {
        success = await register(formData.email, formData.password, formData.name);
        if (!success) {
          setError('Este email ya está registrado');
        }
      }
    } catch (err) {
      setError('Ocurrió un error. Inténtalo de nuevo.');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    if (error) setError('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-60 h-60 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-4000"></div>
      </div>
      
      <div className="w-full max-w-md relative z-10">
        {/* Logo/Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mb-4 shadow-lg shadow-purple-500/25">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2 drop-shadow-lg">Astro code</h1>
          <p className="text-gray-300">
            {isLoginMode ? 'Inicia sesión en tu cuenta' : 'Crea tu cuenta nueva'}
          </p>
        </div>

        {/* Form Card - Glassmorphism */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border border-white/20 relative overflow-hidden">
          {/* Glass effect overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-white/5 rounded-2xl"></div>
          <div className="relative z-10">
            {/* Demo Credentials */}
            {isLoginMode && (
              <div className="mb-6 p-4 bg-blue-500/20 backdrop-blur-sm rounded-lg border border-blue-400/30">
                <h3 className="text-sm font-semibold text-blue-200 mb-2">Credenciales de Demo:</h3>
                <div className="text-xs text-blue-100 space-y-1">
                  <div><strong>Admin:</strong> admin@demo.com / admin123</div>
                  <div><strong>Usuario:</strong> user@demo.com / user123</div>
                </div>
              </div>
            )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name field (only for register) */}
            {!isLoginMode && (
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-200 mb-2">
                  Nombre completo
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-purple-400 transition-all duration-200 text-white placeholder-gray-300"
                    placeholder="Tu nombre completo"
                  />
                </div>
              </div>
            )}

            {/* Email field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-200 mb-2">
                Correo electrónico
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-purple-400 transition-all duration-200 text-white placeholder-gray-300"
                  placeholder="tu@email.com"
                />
              </div>
            </div>

            {/* Password field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-200 mb-2">
                Contraseña
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-12 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-purple-400 transition-all duration-200 text-white placeholder-gray-300"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-200 transition-colors"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            {/* Error message */}
            {error && (
              <div className="flex items-center space-x-2 text-red-200 bg-red-500/20 backdrop-blur-sm p-3 rounded-lg border border-red-400/30">
                <AlertCircle className="h-5 w-5 flex-shrink-0" />
                <span className="text-sm">{error}</span>
              </div>
            )}

            {/* Submit button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 px-4 rounded-lg font-medium hover:from-purple-600 hover:to-pink-600 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 focus:ring-offset-transparent transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-purple-500/25"
            >
              {isLoading ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>{isLoginMode ? 'Iniciando sesión...' : 'Creando cuenta...'}</span>
                </div>
              ) : (
                <span>{isLoginMode ? 'Iniciar Sesión' : 'Crear Cuenta'}</span>
              )}
            </button>
          </form>

            {/* Toggle mode */}
            <div className="mt-6 text-center">
              <p className="text-gray-300">
                {isLoginMode ? '¿No tienes cuenta?' : '¿Ya tienes cuenta?'}
                <button
                  type="button"
                  onClick={() => {
                    setIsLoginMode(!isLoginMode);
                    setError('');
                    setFormData({ email: '', password: '', name: '' });
                  }}
                  className="ml-2 text-purple-300 hover:text-purple-200 font-medium transition-colors"
                >
                  {isLoginMode ? 'Crear cuenta' : 'Iniciar sesión'}
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}