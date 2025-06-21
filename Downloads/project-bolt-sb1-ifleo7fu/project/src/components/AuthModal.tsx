import React, { useState } from 'react';
import { X, Shield, Key, User, Lock } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const [authType, setAuthType] = useState<'jwt' | 'oauth' | 'session'>('jwt');
  const [provider, setProvider] = useState<'google' | 'github' | 'facebook'>('google');
  const [settings, setSettings] = useState({
    enableTwoFactor: false,
    sessionTimeout: 30,
    passwordMinLength: 8,
    requireSpecialChars: true
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm overflow-y-auto h-full w-full flex items-center justify-center z-50">
      <div className="bg-white/10 backdrop-blur-lg border border-white/20 p-6 rounded-lg shadow-xl w-full max-w-2xl">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-2">
            <Shield className="h-6 w-6 text-blue-400" />
            <h3 className="text-xl font-semibold text-white">Configuración de Autenticación</h3>
          </div>
          <button onClick={onClose} className="text-gray-300 hover:text-white">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="space-y-6">
          {/* Tipo de Autenticación */}
          <div>
            <label className="block text-sm font-medium text-white mb-3">Tipo de Autenticación</label>
            <div className="grid grid-cols-3 gap-3">
              {[
                { id: 'jwt', label: 'JWT Token', icon: Key },
                { id: 'oauth', label: 'OAuth 2.0', icon: User },
                { id: 'session', label: 'Session Based', icon: Lock }
              ].map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => setAuthType(id as any)}
                  className={`flex flex-col items-center p-4 rounded-lg border transition-all ${
                    authType === id
                      ? 'bg-blue-500/20 border-blue-400/50 text-blue-300'
                      : 'bg-white/5 border-white/20 text-gray-300 hover:bg-white/10'
                  }`}
                >
                  <Icon className="h-6 w-6 mb-2" />
                  <span className="text-sm font-medium">{label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Proveedores OAuth */}
          {authType === 'oauth' && (
            <div>
              <label className="block text-sm font-medium text-white mb-3">Proveedor OAuth</label>
              <div className="grid grid-cols-3 gap-3">
                {['google', 'github', 'facebook'].map((p) => (
                  <button
                    key={p}
                    onClick={() => setProvider(p as any)}
                    className={`p-3 rounded-lg border transition-all capitalize ${
                      provider === p
                        ? 'bg-green-500/20 border-green-400/50 text-green-300'
                        : 'bg-white/5 border-white/20 text-gray-300 hover:bg-white/10'
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Configuraciones de Seguridad */}
          <div>
            <label className="block text-sm font-medium text-white mb-3">Configuraciones de Seguridad</label>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-300">Autenticación de dos factores</span>
                <button
                  onClick={() => setSettings(prev => ({ ...prev, enableTwoFactor: !prev.enableTwoFactor }))}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    settings.enableTwoFactor ? 'bg-blue-500' : 'bg-gray-600'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      settings.enableTwoFactor ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              <div>
                <label className="block text-sm text-gray-300 mb-2">Tiempo de sesión (minutos)</label>
                <input
                  type="number"
                  value={settings.sessionTimeout}
                  onChange={(e) => setSettings(prev => ({ ...prev, sessionTimeout: parseInt(e.target.value) }))}
                  className="w-full px-3 py-2 bg-white/10 backdrop-blur-sm border border-white/30 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-300 mb-2">Longitud mínima de contraseña</label>
                <input
                  type="number"
                  value={settings.passwordMinLength}
                  onChange={(e) => setSettings(prev => ({ ...prev, passwordMinLength: parseInt(e.target.value) }))}
                  className="w-full px-3 py-2 bg-white/10 backdrop-blur-sm border border-white/30 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-300">Requerir caracteres especiales</span>
                <button
                  onClick={() => setSettings(prev => ({ ...prev, requireSpecialChars: !prev.requireSpecialChars }))}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    settings.requireSpecialChars ? 'bg-blue-500' : 'bg-gray-600'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      settings.requireSpecialChars ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end space-x-3 mt-6 pt-4 border-t border-white/20">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-300 bg-white/10 backdrop-blur-sm border border-white/30 rounded-md hover:bg-white/20 transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={() => {
              console.log('Configuración de autenticación guardada:', { authType, provider, settings });
              onClose();
            }}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-500/20 backdrop-blur-sm border border-blue-400/30 rounded-md hover:bg-blue-500/30 transition-colors"
          >
            Guardar Configuración
          </button>
        </div>
      </div>
    </div>
  );
}