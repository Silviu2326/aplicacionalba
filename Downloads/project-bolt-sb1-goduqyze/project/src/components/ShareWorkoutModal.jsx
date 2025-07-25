import React, { useState } from 'react';
import { X, Link, Copy, Check, Calendar, Eye, Settings, Share2 } from 'lucide-react';
import { generateShareLink, getShareStats } from '../api/workoutSharing.api';

const ShareWorkoutModal = ({ isOpen, onClose, workout }) => {
  const [shareUrl, setShareUrl] = useState('');
  const [shareToken, setShareToken] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [shareConfig, setShareConfig] = useState({
    expiresAt: null,
    allowComments: false,
    showTrainerInfo: true
  });
  const [stats, setStats] = useState(null);

  const handleGenerateLink = async () => {
    if (!workout?.id) return;
    
    setIsGenerating(true);
    try {
      const response = await generateShareLink(workout.id, shareConfig);
      if (response.success) {
        setShareUrl(response.data.shareUrl);
        setShareToken(response.data.shareToken);
        
        // Obtener estadísticas
        const statsResponse = await getShareStats(workout.id);
        if (statsResponse.success) {
          setStats(statsResponse.data);
        }
      }
    } catch (error) {
      console.error('Error al generar enlace:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopyLink = async () => {
    if (!shareUrl) return;
    
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Error al copiar enlace:', error);
    }
  };

  const handleConfigChange = (key, value) => {
    setShareConfig(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const formatExpirationDate = (days) => {
    const date = new Date();
    date.setDate(date.getDate() + days);
    return date.toISOString();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Share2 className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">Compartir Rutina</h2>
              <p className="text-sm text-gray-600">Genera un enlace de solo lectura</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Información de la rutina */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 mb-2">{workout?.name || 'Rutina sin nombre'}</h3>
            <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4" />
                <span>Duración: {workout?.duration || 0} min</span>
              </div>
              <div className="flex items-center space-x-2">
                <Eye className="w-4 h-4" />
                <span>Dificultad: {workout?.difficulty || 'No especificada'}</span>
              </div>
            </div>
          </div>

          {/* Configuración avanzada */}
          <div className="space-y-4">
            <button
              onClick={() => setShowAdvanced(!showAdvanced)}
              className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 transition-colors"
            >
              <Settings className="w-4 h-4" />
              <span>Configuración avanzada</span>
            </button>

            {showAdvanced && (
              <div className="bg-gray-50 rounded-lg p-4 space-y-4">
                {/* Expiración */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Expiración del enlace
                  </label>
                  <select
                    value={shareConfig.expiresAt ? 'custom' : 'never'}
                    onChange={(e) => {
                      if (e.target.value === 'never') {
                        handleConfigChange('expiresAt', null);
                      }
                    }}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="never">Nunca expira</option>
                    <option value="1">1 día</option>
                    <option value="7">7 días</option>
                    <option value="30">30 días</option>
                    <option value="custom">Personalizado</option>
                  </select>
                  
                  {/* Botones rápidos para expiración */}
                  <div className="flex space-x-2 mt-2">
                    <button
                      onClick={() => handleConfigChange('expiresAt', formatExpirationDate(1))}
                      className="px-3 py-1 text-xs bg-gray-200 hover:bg-gray-300 rounded transition-colors"
                    >
                      1 día
                    </button>
                    <button
                      onClick={() => handleConfigChange('expiresAt', formatExpirationDate(7))}
                      className="px-3 py-1 text-xs bg-gray-200 hover:bg-gray-300 rounded transition-colors"
                    >
                      1 semana
                    </button>
                    <button
                      onClick={() => handleConfigChange('expiresAt', formatExpirationDate(30))}
                      className="px-3 py-1 text-xs bg-gray-200 hover:bg-gray-300 rounded transition-colors"
                    >
                      1 mes
                    </button>
                  </div>
                </div>

                {/* Opciones adicionales */}
                <div className="space-y-3">
                  <label className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={shareConfig.showTrainerInfo}
                      onChange={(e) => handleConfigChange('showTrainerInfo', e.target.checked)}
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700">Mostrar información del entrenador</span>
                  </label>
                  
                  <label className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={shareConfig.allowComments}
                      onChange={(e) => handleConfigChange('allowComments', e.target.checked)}
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700">Permitir comentarios (próximamente)</span>
                  </label>
                </div>
              </div>
            )}
          </div>

          {/* Generar enlace */}
          {!shareUrl ? (
            <button
              onClick={handleGenerateLink}
              disabled={isGenerating}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2"
            >
              {isGenerating ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Generando enlace...</span>
                </>
              ) : (
                <>
                  <Link className="w-4 h-4" />
                  <span>Generar enlace de compartir</span>
                </>
              )}
            </button>
          ) : (
            <div className="space-y-4">
              {/* Enlace generado */}
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Check className="w-4 h-4 text-green-600" />
                  <span className="text-sm font-medium text-green-800">Enlace generado exitosamente</span>
                </div>
                
                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={shareUrl}
                    readOnly
                    className="flex-1 px-3 py-2 bg-white border border-green-300 rounded-lg text-sm"
                  />
                  <button
                    onClick={handleCopyLink}
                    className={`px-4 py-2 rounded-lg transition-colors flex items-center space-x-2 ${
                      copied 
                        ? 'bg-green-600 text-white' 
                        : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                    }`}
                  >
                    {copied ? (
                      <>
                        <Check className="w-4 h-4" />
                        <span className="text-sm">Copiado</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        <span className="text-sm">Copiar</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Estadísticas */}
              {stats && (
                <div className="bg-blue-50 rounded-lg p-4">
                  <h4 className="font-medium text-blue-900 mb-2">Estadísticas de compartir</h4>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-blue-700">Enlaces activos:</span>
                      <span className="ml-2 font-medium text-blue-900">{stats.activeShares}</span>
                    </div>
                    <div>
                      <span className="text-blue-700">Total de vistas:</span>
                      <span className="ml-2 font-medium text-blue-900">{stats.totalViews}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Generar nuevo enlace */}
              <button
                onClick={() => {
                  setShareUrl('');
                  setShareToken('');
                  setStats(null);
                }}
                className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2 px-4 rounded-lg transition-colors"
              >
                Generar nuevo enlace
              </button>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 rounded-b-xl">
          <p className="text-xs text-gray-500 text-center">
            Los enlaces compartidos son de solo lectura y no permiten editar la rutina original.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ShareWorkoutModal;