// src/features/pgina-de-instalacin-como-pwa/components/InstallationRewardCard.tsx
import React from 'react';
import { FiGift, FiStar, FiCheck, FiDownload, FiPercent } from 'react-icons/fi';

interface InstallationRewardCardProps {
  isRewardApplied: boolean;
}

const InstallationRewardCard: React.FC<InstallationRewardCardProps> = ({
  isRewardApplied,
}) => {
  return (
    <div className="group relative overflow-hidden">
      {/* Elementos decorativos de fondo */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-warning/10 to-success/10 rounded-3xl blur-sm group-hover:blur-none transition-all duration-500"></div>
      <div className="absolute top-4 right-4 w-32 h-32 bg-gradient-to-r from-accent/20 to-warning/20 rounded-full blur-2xl group-hover:blur-xl transition-all duration-500 animate-pulse"></div>
      <div className="absolute bottom-4 left-4 w-24 h-24 bg-gradient-to-r from-warning/20 to-success/20 rounded-full blur-xl group-hover:blur-lg transition-all duration-500 animate-pulse delay-1000"></div>
      
      {/* Partículas flotantes */}
      <div className="absolute top-8 left-8 w-2 h-2 bg-warning rounded-full animate-bounce opacity-60"></div>
      <div className="absolute top-16 right-16 w-1 h-1 bg-accent rounded-full animate-ping opacity-40"></div>
      <div className="absolute bottom-12 right-12 w-3 h-3 bg-success rounded-full animate-pulse opacity-50"></div>
      
      <div className="relative bg-gradient-to-br from-surface/95 via-card/95 to-surface/95 backdrop-blur-xl rounded-3xl p-8 border border-borderLight/50 shadow-2xl hover:shadow-3xl transition-all duration-500 group-hover:scale-[1.02]">
        {/* Borde superior decorativo animado */}
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-accent via-warning to-success rounded-t-3xl opacity-80 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse"></div>
        </div>
        
        {/* Header con icono principal */}
        <div className="flex items-center mb-6">
          <div className="relative mr-4">
            <div className="w-16 h-16 bg-gradient-to-br from-accent to-warning rounded-2xl flex items-center justify-center shadow-xl group-hover:shadow-2xl transition-all duration-300 group-hover:rotate-6">
              {isRewardApplied ? (
                <FiCheck className="w-8 h-8 text-textInverse animate-pulse" />
              ) : (
                <FiGift className="w-8 h-8 text-textInverse group-hover:scale-110 transition-transform duration-300" />
              )}
            </div>
            
            {/* Badge de estado */}
            <div className={`absolute -top-2 -right-2 w-8 h-8 rounded-full flex items-center justify-center shadow-lg ${
              isRewardApplied 
                ? 'bg-gradient-to-r from-success to-successDark' 
                : 'bg-gradient-to-r from-warning to-accent animate-pulse'
            }`}>
              {isRewardApplied ? (
                <FiCheck className="w-4 h-4 text-textInverse" />
              ) : (
                <FiPercent className="w-4 h-4 text-textInverse" />
              )}
            </div>
          </div>
          
          <div className="flex-1">
            <h3 className={`text-2xl font-black mb-2 ${
              isRewardApplied 
                ? 'bg-gradient-to-r from-success via-successDark to-info bg-clip-text text-transparent'
                : 'bg-gradient-to-r from-accent via-warning to-success bg-clip-text text-transparent'
            }`}>
              {isRewardApplied ? '¡Descuento Aplicado! 🎉' : '¡Recompensa Especial! 🎁'}
            </h3>
            
            {/* Estrellas decorativas */}
            <div className="flex items-center space-x-1">
              {[...Array(5)].map((_, i) => (
                <FiStar 
                  key={i} 
                  className={`w-4 h-4 transition-all duration-300 delay-${i * 100} ${
                    isRewardApplied 
                      ? 'text-success fill-current' 
                      : 'text-warning group-hover:fill-current'
                  }`} 
                />
              ))}
              <span className="ml-2 text-sm font-semibold text-textMuted">Oferta Premium</span>
            </div>
          </div>
        </div>
        
        {/* Contenido principal */}
        <div className="mb-6">
          <div className={`text-lg font-medium leading-relaxed mb-4 ${
            isRewardApplied ? 'text-text' : 'text-textSecondary'
          }`}>
            {isRewardApplied
              ? (
                <>
                  Has recibido un{' '}
                  <span className="inline-flex items-center px-3 py-1 bg-gradient-to-r from-success/20 to-successDark/20 border border-success/30 rounded-full text-success font-bold">
                    <FiPercent className="w-4 h-4 mr-1" />
                    15% OFF
                  </span>
                  {' '}de descuento en tu próxima sesión por instalar nuestra PWA.
                </>
              )
              : (
                <>
                  Instala nuestra PWA y recibe un{' '}
                  <span className="inline-flex items-center px-3 py-1 bg-gradient-to-r from-warning/20 to-accent/20 border border-warning/30 rounded-full text-warning font-bold animate-pulse">
                    <FiPercent className="w-4 h-4 mr-1" />
                    15% OFF
                  </span>
                  {' '}de descuento en tu próxima sesión.
                </>
              )}
          </div>
          
          {/* Información adicional */}
          {!isRewardApplied && (
            <div className="relative">
              <div className="absolute -top-2 -left-2 w-6 h-6 bg-gradient-to-r from-info to-accent rounded-full opacity-20 group-hover:opacity-40 transition-opacity duration-300"></div>
              <div className="bg-gradient-to-r from-info/10 to-accent/10 border border-info/30 rounded-2xl p-6 relative z-10">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-info to-accent rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-textInverse text-sm font-bold">💡</span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-info mb-1">Tip Importante:</p>
                    <p className="text-sm text-textSecondary leading-relaxed">
                      Una vez instalada, el descuento se aplicará automáticamente a tu cuenta. 
                      <span className="font-medium text-accent">¡No necesitas códigos promocionales!</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Estado de instalación */}
          {isRewardApplied && (
            <div className="bg-gradient-to-r from-success/10 to-info/10 border border-success/30 rounded-2xl p-4">
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 bg-gradient-to-r from-success to-successDark rounded-full flex items-center justify-center">
                  <FiDownload className="w-4 h-4 text-textInverse" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-success">PWA Instalada Correctamente</p>
                  <p className="text-xs text-textMuted">Tu descuento está activo y listo para usar</p>
                </div>
              </div>
            </div>
          )}
        </div>
        
        {/* Footer con información adicional */}
        <div className="pt-4 border-t border-borderLight/30">
          <div className="flex items-center justify-between text-xs text-textMuted">
            <div className="flex items-center space-x-2">
              <div className={`w-2 h-2 rounded-full animate-pulse ${
                isRewardApplied ? 'bg-success' : 'bg-warning'
              }`}></div>
              <span>{isRewardApplied ? 'Activo' : 'Disponible'}</span>
            </div>
            <div className="flex items-center space-x-1">
              <FiStar className="w-3 h-3 text-accent" />
              <span>Oferta limitada</span>
            </div>
          </div>
        </div>
        
        {/* Indicador de interacción */}
        <div className={`absolute bottom-0 left-0 w-full h-1 rounded-b-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${
          isRewardApplied 
            ? 'bg-gradient-to-r from-transparent via-success/30 to-transparent'
            : 'bg-gradient-to-r from-transparent via-warning/30 to-transparent'
        }`}></div>
      </div>
    </div>
  );
};

export default InstallationRewardCard;
