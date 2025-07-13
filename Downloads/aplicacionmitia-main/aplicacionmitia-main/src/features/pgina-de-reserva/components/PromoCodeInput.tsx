import React, { useState } from 'react';

interface PromoCodeInputProps {
  onApplyCode: (code: string) => void;
  onRemoveCode: () => void;
  appliedCode: string | null;
  error: string | null;
}

export const PromoCodeInput: React.FC<PromoCodeInputProps> = ({
  onApplyCode,
  onRemoveCode,
  appliedCode,
  error,
}) => {
  const [code, setCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleApplyClick = async () => {
    if (code.trim()) {
      setIsLoading(true);
      // Simular un pequeño delay para mostrar el estado de carga
      setTimeout(() => {
        onApplyCode(code.trim());
        setIsLoading(false);
      }, 500);
    }
  };

  const handleRemoveClick = () => {
    setCode('');
    onRemoveCode();
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !appliedCode && code.trim()) {
      handleApplyClick();
    }
  };

  return (
    <div className="bg-gradient-surface p-6 rounded-xl border border-border shadow-lg">
      <div className="flex items-center space-x-3 mb-4">
        <div className={`
          p-2 rounded-lg transition-all duration-300
          ${
            appliedCode
              ? 'bg-success/10'
              : 'bg-accent/10'
          }
        `}>
          {appliedCode ? (
            <svg className="w-6 h-6 text-success" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          ) : (
            <svg className="w-6 h-6 text-accent" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M17.707 9.293a1 1 0 010 1.414l-7 7a1 1 0 01-1.414 0l-7-7A.997.997 0 012 10V5a3 3 0 013-3h5c.256 0 .512.098.707.293l7 7zM5 6a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
            </svg>
          )}
        </div>
        <div className="flex-1">
          <h3 className={`
            text-lg font-bold transition-colors duration-300
            ${
              appliedCode
                ? 'text-success'
                : 'text-text'
            }
          `}>
            {appliedCode ? '¡Código aplicado!' : 'Código de descuento'}
          </h3>
          <p className="text-sm text-textMuted">
            {appliedCode ? 'Tu descuento ha sido aplicado correctamente' : '¿Tienes un código promocional o paquete especial?'}
          </p>
        </div>
      </div>
      
      {!appliedCode ? (
        <div className="space-y-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="w-5 h-5 text-textMuted" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M17.707 9.293a1 1 0 010 1.414l-7 7a1 1 0 01-1.414 0l-7-7A.997.997 0 012 10V5a3 3 0 013-3h5c.256 0 .512.098.707.293l7 7zM5 6a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
              </svg>
            </div>
            <input
              type="text"
              id="promo-code"
              value={code}
              onChange={(e) => setCode(e.target.value.toUpperCase())}
              onKeyPress={handleKeyPress}
              placeholder="Introduce tu código (ej: DESCUENTO20)"
              className={`
                w-full pl-10 pr-4 py-3 bg-backgroundSecondary border-2 rounded-xl
                transition-all duration-300 text-text placeholder-textMuted
                focus:ring-4 focus:ring-primary/20 focus:border-primary
                ${
                  code.length > 0
                    ? 'border-primary/50'
                    : 'border-border hover:border-primary/30'
                }
              `}
              disabled={isLoading}
            />
            {code.length > 0 && (
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                <div className="p-1 bg-primary/10 rounded-full">
                  <svg className="w-4 h-4 text-primary" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            )}
          </div>
          
          <button
            onClick={handleApplyClick}
            disabled={!code.trim() || isLoading}
            className={`
              w-full py-3 px-6 rounded-xl font-semibold transition-all duration-300
              transform hover:scale-105 focus:ring-4 focus:ring-primary/20
              ${
                !code.trim() || isLoading
                  ? 'bg-disabled text-textMuted cursor-not-allowed'
                  : 'bg-gradient-primary text-white hover:shadow-lg active:scale-95'
              }
            `}
          >
            <div className="flex items-center justify-center space-x-2">
              {isLoading ? (
                <>
                  <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Aplicando...</span>
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span>Aplicar código</span>
                </>
              )}
            </div>
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="p-4 bg-success/5 border border-success/20 rounded-xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-success/10 rounded-lg">
                  <svg className="w-5 h-5 text-success" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M17.707 9.293a1 1 0 010 1.414l-7 7a1 1 0 01-1.414 0l-7-7A.997.997 0 012 10V5a3 3 0 013-3h5c.256 0 .512.098.707.293l7 7zM5 6a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-semibold text-success">Código aplicado</p>
                  <p className="text-lg font-bold text-text">{appliedCode}</p>
                </div>
              </div>
              <div className="w-8 h-8 bg-success rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          </div>
          
          <button
            onClick={handleRemoveClick}
            className="
              w-full py-3 px-6 rounded-xl font-semibold transition-all duration-300
              bg-error/10 text-error border-2 border-error/20
              hover:bg-error/20 hover:border-error/40 transform hover:scale-105
              focus:ring-4 focus:ring-error/20 active:scale-95
            "
          >
            <div className="flex items-center justify-center space-x-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
              <span>Quitar código</span>
            </div>
          </button>
        </div>
      )}
      
      {error && (
        <div className="mt-4 p-4 bg-error/5 border border-error/20 rounded-xl">
          <div className="flex items-start space-x-3">
            <svg className="w-5 h-5 text-error mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            <div>
              <p className="text-sm font-medium text-error mb-1">Error al aplicar el código</p>
              <p className="text-sm text-textSecondary">{error}</p>
            </div>
          </div>
        </div>
      )}
      
      {!appliedCode && !error && (
        <div className="mt-4 p-3 bg-info/5 border border-info/20 rounded-lg">
          <div className="flex items-start space-x-2">
            <svg className="w-4 h-4 text-info mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            <p className="text-xs text-info">
              Los códigos promocionales pueden incluir descuentos, paquetes especiales o beneficios adicionales.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
