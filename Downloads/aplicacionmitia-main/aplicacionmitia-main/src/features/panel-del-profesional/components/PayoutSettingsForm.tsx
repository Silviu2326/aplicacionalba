import React, { useState } from 'react';

const PayoutSettingsForm: React.FC = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleConnect = async () => {
    setIsLoading(true);
    // Simular conexión con Stripe
    setTimeout(() => {
      setIsConnected(true);
      setIsLoading(false);
    }, 2000);
  };

  return (
    <div className="relative group">
      {/* Efecto de resplandor de fondo */}
      <div className="absolute inset-0 bg-gradient-to-r from-info/10 to-warning/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      {/* Contenedor principal con glassmorphism */}
      <div className="relative bg-gradient-to-br from-surface/90 to-card/70 backdrop-blur-xl rounded-2xl border border-borderLight/50 shadow-xl p-6 hover:shadow-2xl transition-all duration-300">
        {/* Decoración superior */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-info via-warning to-success rounded-t-2xl"></div>
        
        {/* Header modernizado */}
        <div className="flex items-center mb-6">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-info to-warning rounded-xl blur opacity-50 animate-pulse"></div>
            <div className="relative w-12 h-12 bg-gradient-to-r from-info to-warning rounded-xl flex items-center justify-center shadow-lg">
              <svg className="w-6 h-6 text-textInverse" fill="currentColor" viewBox="0 0 20 20">
                <path d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zM14 6a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2V8a2 2 0 012-2h10zM4 8a1 1 0 011-1h1a1 1 0 010 2H5a1 1 0 01-1-1zm5 1a1 1 0 100 2h1a1 1 0 100-2H9z" />
              </svg>
            </div>
          </div>
          <div className="ml-4">
            <h2 className="text-xl font-bold bg-gradient-to-r from-text to-infoLight bg-clip-text text-transparent">Configuración de Pagos</h2>
            <p className="text-textSecondary text-sm">Gestiona tus métodos de pago</p>
          </div>
        </div>

        {/* Estado de conexión modernizado */}
        <div className="mb-6">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-backgroundSecondary/60 to-surface/40 backdrop-blur-sm rounded-xl border border-borderLight/30"></div>
            <div className="relative p-4">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h3 className="font-semibold text-text mb-1 flex items-center">
                    <svg className="w-4 h-4 mr-2 text-primary" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Estado de Conexión
                  </h3>
                  <p className="text-sm text-textSecondary">
                    {isConnected ? 'Conectado con Stripe' : 'No conectado'}
                  </p>
                </div>
                
                {/* Indicador de estado modernizado */}
                <div className="relative">
                  <div className={`absolute inset-0 rounded-full blur animate-pulse ${
                    isConnected ? 'bg-success/50' : 'bg-error/50'
                  }`}></div>
                  <div className={`relative w-4 h-4 rounded-full flex items-center justify-center ${
                    isConnected ? 'bg-gradient-to-r from-success to-successLight' : 'bg-gradient-to-r from-error to-errorLight'
                  }`}>
                    {isConnected && (
                      <svg className="w-2 h-2 text-textInverse" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {!isConnected ? (
          <div className="space-y-6">
            {/* Descripción con iconos */}
            <div className="p-4 bg-gradient-to-r from-info/10 to-primary/10 backdrop-blur-sm rounded-xl border border-info/20">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-gradient-to-r from-info to-infoLight rounded-lg flex items-center justify-center">
                    <svg className="w-4 h-4 text-textInverse" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-info mb-1">Conecta con Stripe</h4>
                  <p className="text-textSecondary text-sm">
                    Conecta tu cuenta de Stripe para recibir pagos de tus clientes de forma segura y automática.
                  </p>
                </div>
              </div>
            </div>
            
            {/* Botón de conexión modernizado */}
            <button
              onClick={handleConnect}
              disabled={isLoading}
              className="group/button relative w-full overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent rounded-xl blur opacity-50 group-hover/button:opacity-100 transition-opacity duration-300"></div>
              <div className="relative bg-gradient-to-r from-primary to-accent text-textInverse py-4 px-6 rounded-xl font-semibold shadow-lg transform group-hover/button:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none">
                {isLoading ? (
                  <div className="flex items-center justify-center space-x-3">
                    <div className="relative">
                      <div className="animate-spin rounded-full h-5 w-5 border-2 border-textInverse/30 border-t-textInverse"></div>
                      <div className="absolute inset-0 animate-ping rounded-full h-5 w-5 border-2 border-textInverse/20"></div>
                    </div>
                    <span>Conectando...</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center space-x-2">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                    <span>Conectar con Stripe</span>
                  </div>
                )}
              </div>
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Mensaje de éxito modernizado */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-success/20 to-successLight/20 rounded-xl blur-lg"></div>
              <div className="relative bg-gradient-to-r from-successLight/90 to-success/10 backdrop-blur-sm border border-success/30 p-4 rounded-xl shadow-xl">
                <div className="flex items-center space-x-3">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-success/20 rounded-full flex items-center justify-center">
                      <svg className="w-6 h-6 text-success" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-success mb-1">¡Cuenta conectada exitosamente!</h4>
                    <p className="text-successDark text-sm">Tu configuración de pagos está lista</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Información adicional */}
            <div className="p-4 bg-gradient-to-r from-backgroundSecondary/60 to-surface/40 backdrop-blur-sm rounded-xl border border-borderLight/30">
              <div className="flex items-start space-x-3">
                <svg className="w-5 h-5 text-primary mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
                <p className="text-textSecondary text-sm">
                  Tu cuenta está configurada para recibir pagos. Los fondos se transferirán automáticamente según tu configuración.
                </p>
              </div>
            </div>
            
            {/* Botón de gestión modernizado */}
            <button className="group/button relative w-full overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-secondary to-info rounded-xl blur opacity-50 group-hover/button:opacity-100 transition-opacity duration-300"></div>
              <div className="relative bg-gradient-to-r from-secondary to-info text-textInverse py-3 px-6 rounded-xl font-semibold shadow-lg transform group-hover/button:scale-105 transition-all duration-300">
                <div className="flex items-center justify-center space-x-2">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                  </svg>
                  <span>Gestionar Configuración</span>
                </div>
              </div>
            </button>
          </div>
        )}
        
        {/* Partículas decorativas */}
        <div className="absolute top-4 right-4 w-2 h-2 bg-gradient-to-r from-info to-warning rounded-full opacity-60 animate-pulse"></div>
        <div className="absolute bottom-4 left-4 w-1 h-1 bg-gradient-to-r from-warning to-success rounded-full opacity-40 animate-pulse delay-1000"></div>
      </div>
    </div>
  );
};

export default PayoutSettingsForm;
