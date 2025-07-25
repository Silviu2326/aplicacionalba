import React, { useState, useEffect } from 'react';
import { X, Link, Eye, Calendar, MoreVertical, Trash2, Copy, Check, ExternalLink } from 'lucide-react';
import { getTrainerSharedWorkouts, deactivateShareLink } from '../api/workoutSharing.api';

const SharedLinksManager = ({ isOpen, onClose }) => {
  const [sharedWorkouts, setSharedWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [copiedLink, setCopiedLink] = useState(null);
  const [showDropdown, setShowDropdown] = useState(null);

  useEffect(() => {
    if (isOpen) {
      loadSharedWorkouts();
    }
  }, [isOpen]);

  const loadSharedWorkouts = async () => {
    setLoading(true);
    try {
      const response = await getTrainerSharedWorkouts(1); // Mock trainer ID
      if (response.success) {
        setSharedWorkouts(response.data);
      }
    } catch (error) {
      console.error('Error al cargar enlaces compartidos:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCopyLink = async (shareUrl, shareToken) => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopiedLink(shareToken);
      setTimeout(() => setCopiedLink(null), 2000);
    } catch (error) {
      console.error('Error al copiar enlace:', error);
    }
  };

  const handleDeactivateLink = async (shareToken) => {
    try {
      const response = await deactivateShareLink(shareToken);
      if (response.success) {
        setSharedWorkouts(prev => 
          prev.map(workout => 
            workout.shareToken === shareToken 
              ? { ...workout, isActive: false }
              : workout
          )
        );
        setShowDropdown(null);
      }
    } catch (error) {
      console.error('Error al desactivar enlace:', error);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getStatusColor = (isActive, expiresAt) => {
    if (!isActive) return 'bg-red-100 text-red-800';
    if (expiresAt && new Date() > new Date(expiresAt)) return 'bg-orange-100 text-orange-800';
    return 'bg-green-100 text-green-800';
  };

  const getStatusText = (isActive, expiresAt) => {
    if (!isActive) return 'Desactivado';
    if (expiresAt && new Date() > new Date(expiresAt)) return 'Expirado';
    return 'Activo';
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Link className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">Enlaces Compartidos</h2>
              <p className="text-sm text-gray-600">Gestiona tus rutinas compartidas</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto max-h-[calc(90vh-120px)]">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="w-8 h-8 border-4 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : sharedWorkouts.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Link className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No hay enlaces compartidos</h3>
              <p className="text-gray-600">Comparte una rutina para ver los enlaces aquí</p>
            </div>
          ) : (
            <div className="p-6">
              {/* Estadísticas generales */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-blue-50 rounded-lg p-4">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <Link className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm text-blue-600 font-medium">Total Enlaces</p>
                      <p className="text-2xl font-bold text-blue-900">{sharedWorkouts.length}</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-green-50 rounded-lg p-4">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-green-100 rounded-lg">
                      <Eye className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm text-green-600 font-medium">Total Vistas</p>
                      <p className="text-2xl font-bold text-green-900">
                        {sharedWorkouts.reduce((sum, workout) => sum + workout.viewCount, 0)}
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-purple-50 rounded-lg p-4">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-purple-100 rounded-lg">
                      <Calendar className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-sm text-purple-600 font-medium">Enlaces Activos</p>
                      <p className="text-2xl font-bold text-purple-900">
                        {sharedWorkouts.filter(w => w.isActive).length}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Lista de enlaces */}
              <div className="space-y-4">
                {sharedWorkouts.map((workout) => (
                  <div key={workout.shareToken} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="font-semibold text-gray-900">{workout.workoutName}</h3>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            getStatusColor(workout.isActive, workout.expiresAt)
                          }`}>
                            {getStatusText(workout.isActive, workout.expiresAt)}
                          </span>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600 mb-3">
                          <div className="flex items-center space-x-2">
                            <Calendar className="w-4 h-4" />
                            <span>Creado: {formatDate(workout.createdAt)}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Eye className="w-4 h-4" />
                            <span>{workout.viewCount} visualizaciones</span>
                          </div>
                          {workout.lastViewed && (
                            <div className="flex items-center space-x-2">
                              <Calendar className="w-4 h-4" />
                              <span>Última vista: {formatDate(workout.lastViewed)}</span>
                            </div>
                          )}
                        </div>
                        
                        {workout.expiresAt && (
                          <div className="text-sm text-orange-600 mb-3">
                            Expira: {formatDate(workout.expiresAt)}
                          </div>
                        )}
                        
                        <div className="flex items-center space-x-2">
                          <input
                            type="text"
                            value={workout.shareUrl}
                            readOnly
                            className="flex-1 px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-sm"
                          />
                          <button
                            onClick={() => handleCopyLink(workout.shareUrl, workout.shareToken)}
                            className={`px-4 py-2 rounded-lg transition-colors flex items-center space-x-2 ${
                              copiedLink === workout.shareToken
                                ? 'bg-green-600 text-white'
                                : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                            }`}
                          >
                            {copiedLink === workout.shareToken ? (
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
                          <a
                            href={workout.shareUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-4 py-2 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-lg transition-colors flex items-center space-x-2"
                          >
                            <ExternalLink className="w-4 h-4" />
                            <span className="text-sm">Abrir</span>
                          </a>
                        </div>
                      </div>
                      
                      {/* Menú de acciones */}
                      <div className="relative ml-4">
                        <button
                          onClick={() => setShowDropdown(showDropdown === workout.shareToken ? null : workout.shareToken)}
                          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                          <MoreVertical className="w-4 h-4 text-gray-500" />
                        </button>
                        
                        {showDropdown === workout.shareToken && (
                          <div className="absolute right-0 top-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10 min-w-[150px]">
                            {workout.isActive && (
                              <button
                                onClick={() => handleDeactivateLink(workout.shareToken)}
                                className="w-full px-4 py-2 text-left text-red-600 hover:bg-red-50 transition-colors flex items-center space-x-2"
                              >
                                <Trash2 className="w-4 h-4" />
                                <span>Desactivar</span>
                              </button>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SharedLinksManager;