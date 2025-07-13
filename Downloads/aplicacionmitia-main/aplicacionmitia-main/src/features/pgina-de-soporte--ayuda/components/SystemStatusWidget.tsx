import React, { useEffect, useState } from 'react';
import { getSystemStatus, SystemStatus } from '../api';
import ServiceStatusItem from './ServiceStatusItem';

const SystemStatusWidget: React.FC = () => {
  const [status, setStatus] = useState<SystemStatus[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        setLoading(true);
        const systemStatus = await getSystemStatus();
        setStatus(systemStatus);
        setError(null);
      } catch (err) {
        setError('No se pudo cargar el estado del sistema.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchStatus();
  }, []);

  const overallStatus = () => {
    if (status.some(s => s.status === 'downtime')) {
      return { text: 'Algunos sistemas no están operativos', color: 'text-error' };
    }
    if (status.some(s => s.status === 'degraded_performance')) {
      return { text: 'Rendimiento degradado en algunos sistemas', color: 'text-warning' };
    }
    return { text: 'Todos los sistemas operativos', color: 'text-success' };
  };

  const { text: overallStatusText, color: overallStatusColor } = overallStatus();

  return (
    <div className="relative">
      <div className="absolute inset-0 bg-gradient-to-br from-info/10 to-success/10 rounded-2xl blur-xl"></div>
      <div className="relative bg-gradient-to-br from-surface/80 via-card/80 to-surface/80 backdrop-blur-xl rounded-2xl p-6 shadow-2xl border border-borderLight/50">
        {/* Header del widget */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center shadow-lg mr-3 transition-all duration-300 ${
              overallStatusColor === 'text-success' ? 'bg-gradient-to-br from-success to-successDark' :
              overallStatusColor === 'text-warning' ? 'bg-gradient-to-br from-warning to-warningDark' : 
              'bg-gradient-to-br from-error to-errorDark'
            }`}>
              <svg className="w-5 h-5 text-textInverse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {overallStatusColor === 'text-success' ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                ) : overallStatusColor === 'text-warning' ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                )}
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-black bg-gradient-to-r from-text via-info to-success bg-clip-text text-transparent">
                Estado del Sistema
              </h3>
              <p className={`text-sm font-bold ${overallStatusColor}`}>{overallStatusText}</p>
            </div>
          </div>
          
          {/* Indicador de estado general */}
          <div className={`w-4 h-4 rounded-full animate-pulse ${
            overallStatusColor === 'text-success' ? 'bg-success shadow-lg shadow-success/50' :
            overallStatusColor === 'text-warning' ? 'bg-warning shadow-lg shadow-warning/50' : 
            'bg-error shadow-lg shadow-error/50'
          }`}></div>
        </div>
        
        {loading && (
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-info"></div>
            <p className="text-textMuted ml-3">Cargando...</p>
          </div>
        )}
        
        {error && (
          <div className="bg-error/10 border border-error/30 rounded-lg p-4 mb-4">
            <p className="text-error font-medium">{error}</p>
          </div>
        )}
        
        {!loading && !error && (
          <div className="space-y-3 mb-6">
            {status.map((service, index) => (
              <div key={service.service} className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-backgroundSecondary/50 to-surface/50 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative flex justify-between items-center p-3 rounded-lg border border-borderLight/30 bg-gradient-to-r from-backgroundSecondary/30 to-surface/30 backdrop-blur-sm hover:shadow-lg transition-all duration-300">
                  <div className="flex items-center">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center mr-3 transition-all duration-300 ${
                      service.status === 'operational' ? 'bg-gradient-to-br from-success/20 to-success/10' :
                      service.status === 'degraded_performance' ? 'bg-gradient-to-br from-warning/20 to-warning/10' : 
                      'bg-gradient-to-br from-error/20 to-error/10'
                    }`}>
                      <div className={`w-3 h-3 rounded-full ${
                        service.status === 'operational' ? 'bg-success' :
                        service.status === 'degraded_performance' ? 'bg-warning' : 'bg-error'
                      }`}></div>
                    </div>
                    <div>
                      <span className="text-text font-medium text-sm">{service.service}</span>
                      {service.message && (
                        <p className="text-textMuted text-xs mt-1">{service.message}</p>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <span className={`text-xs font-bold px-2 py-1 rounded-full border ${
                      service.status === 'operational' ? 'text-success bg-success/10 border-success/30' :
                      service.status === 'degraded_performance' ? 'text-warning bg-warning/10 border-warning/30' : 
                      'text-error bg-error/10 border-error/30'
                    }`}>
                      {service.status === 'operational' ? 'Operativo' :
                       service.status === 'degraded_performance' ? 'Degradado' : 'Inactivo'}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        
        {/* Footer con última actualización */}
        <div className="pt-4 border-t border-borderLight/30">
          <div className="flex items-center justify-between">
            <div className="flex items-center text-xs text-textMuted">
              <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Actualizado: {new Date().toLocaleTimeString('es-ES', { 
                hour: '2-digit', 
                minute: '2-digit' 
              })}</span>
            </div>
            
            <div className="flex items-center text-xs text-textMuted">
              <div className="w-2 h-2 bg-info rounded-full animate-pulse mr-1"></div>
              <span>En vivo</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SystemStatusWidget;
