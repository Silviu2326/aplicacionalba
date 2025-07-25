import React, { useState } from 'react';
import { X, Link, Copy, Check, Calendar, Eye, Settings, Share2 } from 'lucide-react';
import { generateDietShareLink, getDietShareStats } from '../api/dietSharing.api';

const ShareDietModal = ({ isOpen, onClose, diet }) => {
  const [shareUrl, setShareUrl] = useState('');
  const [shareToken, setShareToken] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [shareConfig, setShareConfig] = useState({
    expiresAt: null,
    showNutritionistInfo: true
  });
  const [stats, setStats] = useState(null);

  const handleGenerateLink = async () => {
    if (!diet?.id) return;
    
    setIsGenerating(true);
    try {
      const options = {
        expiresAt: shareConfig.expiresAt,
        showNutritionistInfo: shareConfig.showNutritionistInfo
      };
      
      const response = await generateDietShareLink(diet.id, options);
      
      if (response.success) {
        setShareUrl(response.data.shareUrl);
        setShareToken(response.data.shareToken);
        
        // Cargar estadísticas
        loadStats();
      }
    } catch (error) {
      console.error('Error generating share link:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const loadStats = async () => {
    if (!diet?.id) return;
    
    try {
      const response = await getDietShareStats(diet.id);
      if (response.success) {
        setStats(response.data);
      }
    } catch (error) {
      console.error('Error loading stats:', error);
    }
  };

  const copyToClipboard = async () => {
    if (!shareUrl) return;
    
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Error copying to clipboard:', error);
    }
  };

  const handleExpirationChange = (days) => {
    if (days === 0) {
      setShareConfig(prev => ({ ...prev, expiresAt: null }));
    } else {
      const expirationDate = new Date();
      expirationDate.setDate(expirationDate.getDate() + days);
      setShareConfig(prev => ({ ...prev, expiresAt: expirationDate.toISOString() }));
    }
  };

  const handleClose = () => {
    setShareUrl('');
    setShareToken('');
    setCopied(false);
    setShowAdvanced(false);
    setStats(null);
    setShareConfig({
      expiresAt: null,
      showNutritionistInfo: true
    });
    onClose();
  };

  React.useEffect(() => {
    if (isOpen && diet?.id) {
      loadStats();
    }
  }, [isOpen, diet?.id]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Share2 className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Compartir Dieta</h2>
              <p className="text-sm text-gray-600">{diet?.name}</p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Información de la dieta */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="font-medium text-gray-900 mb-2">{diet?.name}</h3>
            <p className="text-sm text-gray-600 mb-3">{diet?.description}</p>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-500">Categoría:</span>
                <span className="ml-2 font-medium text-gray-900">
                  {diet?.category === 'weight_loss' ? 'Pérdida de peso' :
                   diet?.category === 'muscle_gain' ? 'Ganancia muscular' :
                   diet?.category === 'maintenance' ? 'Mantenimiento' : 'Especial'}
                </span>
              </div>
              <div>
                <span className="text-gray-500">Calorías:</span>
                <span className="ml-2 font-medium text-gray-900">{diet?.calories} kcal</span>
              </div>
            </div>
          </div>

          {/* Configuración avanzada */}
          <div>
            <button
              onClick={() => setShowAdvanced(!showAdvanced)}
              className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 transition-colors"
            >
              <Settings className="w-4 h-4" />
              <span>Configuración avanzada</span>
            </button>
            
            {showAdvanced && (
              <div className="mt-4 space-y-4 p-4 bg-gray-50 rounded-lg">
                {/* Expiración */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Expiración del enlace
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { label: 'Sin expiración', days: 0 },
                      { label: '7 días', days: 7 },
                      { label: '30 días', days: 30 },
                      { label: '90 días', days: 90 }
                    ].map(option => (
                      <button
                        key={option.days}
                        onClick={() => handleExpirationChange(option.days)}
                        className={`px-3 py-2 text-sm rounded-lg border transition-colors ${
                          (option.days === 0 && !shareConfig.expiresAt) ||
                          (option.days > 0 && shareConfig.expiresAt && 
                           new Date(shareConfig.expiresAt).getTime() - Date.now() <= option.days * 24 * 60 * 60 * 1000 + 24 * 60 * 60 * 1000 &&
                           new Date(shareConfig.expiresAt).getTime() - Date.now() > (option.days - 1) * 24 * 60 * 60 * 1000)
                            ? 'bg-blue-100 border-blue-300 text-blue-700'
                            : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Mostrar información del nutricionista */}
                <div>
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={shareConfig.showNutritionistInfo}
                      onChange={(e) => setShareConfig(prev => ({
                        ...prev,
                        showNutritionistInfo: e.target.checked
                      }))}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700">Mostrar información del nutricionista</span>
                  </label>
                </div>
              </div>
            )}
          </div>

          {/* Estadísticas */}
          {stats && (
            <div className="bg-blue-50 rounded-lg p-4">
              <h4 className="font-medium text-blue-900 mb-3">Estadísticas de compartir</h4>
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
            onClick={handleGenerateLink}
            disabled={isGenerating}
            className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Link className="w-5 h-5" />
            <span>{isGenerating ? 'Generando enlace...' : 'Generar enlace de solo lectura'}</span>
          </button>

          {/* Enlace generado */}
          {shareUrl && (
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Check className="w-5 h-5 text-green-600" />
                <span className="text-green-700 font-medium">¡Enlace generado exitosamente!</span>
              </div>
              
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  value={shareUrl}
                  readOnly
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-sm"
                />
                <button
                  onClick={copyToClipboard}
                  className={`px-4 py-2 rounded-lg transition-colors flex items-center space-x-2 ${
                    copied
                      ? 'bg-green-100 text-green-700 border border-green-300'
                      : 'bg-blue-100 text-blue-700 border border-blue-300 hover:bg-blue-200'
                  }`}
                >
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  <span className="text-sm">{copied ? 'Copiado' : 'Copiar'}</span>
                </button>
              </div>
              
              <div className="text-xs text-gray-500">
                <div className="flex items-center space-x-1">
                  <Eye className="w-3 h-3" />
                  <span>Este enlace permite ver la dieta en modo solo lectura</span>
                </div>
                {shareConfig.expiresAt && (
                  <div className="flex items-center space-x-1 mt-1">
                    <Calendar className="w-3 h-3" />
                    <span>Expira el {new Date(shareConfig.expiresAt).toLocaleDateString('es-ES')}</span>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShareDietModal;