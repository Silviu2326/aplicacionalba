import React, { useState } from 'react';
import { IconType } from 'react-icons';
import { FiInfo } from 'react-icons/fi';

interface PerformanceMetricProps {
  icon: IconType;
  value: string;
  description: string;
  tooltip?: string;
}

const PerformanceMetric: React.FC<PerformanceMetricProps> = ({
  icon: Icon,
  value,
  description,
  tooltip,
}) => {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div className="group relative">
      {/* Elementos decorativos de fondo */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 rounded-2xl blur-sm group-hover:blur-none transition-all duration-500"></div>
      <div className="absolute top-2 right-2 w-16 h-16 bg-gradient-to-r from-accent/10 to-warning/10 rounded-full blur-xl group-hover:blur-lg transition-all duration-500"></div>
      
      <div className="relative bg-gradient-to-br from-surface/90 via-card/95 to-surface/90 backdrop-blur-xl rounded-2xl p-8 border border-borderLight/50 shadow-xl hover:shadow-2xl transition-all duration-500 group-hover:scale-105 text-center">
        {/* Borde superior decorativo */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-secondary to-accent rounded-t-2xl opacity-60 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        {/* Icono con animación */}
        <div className="flex justify-center mb-6">
          <div className="relative">
            <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:rotate-3">
              <Icon className="w-8 h-8 text-primary group-hover:text-secondary transition-colors duration-300" />
            </div>
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-accent to-warning rounded-full opacity-0 group-hover:opacity-100 animate-pulse transition-opacity duration-300"></div>
          </div>
        </div>
        
        {/* Valor principal */}
        <div className="text-4xl font-black bg-gradient-to-r from-text via-primary to-secondary bg-clip-text text-transparent mb-3 group-hover:scale-110 transition-transform duration-300">
          {value}
        </div>
        
        {/* Descripción */}
        <div className="text-base font-medium text-textSecondary mb-4 group-hover:text-text transition-colors duration-300">
          {description}
        </div>
        
        {/* Tooltip interactivo */}
        {tooltip && (
          <div className="relative">
            <button
              onMouseEnter={() => setShowTooltip(true)}
              onMouseLeave={() => setShowTooltip(false)}
              onClick={() => setShowTooltip(!showTooltip)}
              className="inline-flex items-center space-x-2 text-xs text-textMuted hover:text-info transition-colors duration-200 bg-surface/50 hover:bg-info/10 px-3 py-2 rounded-full border border-borderLight/30 hover:border-info/30"
            >
              <FiInfo className="w-3 h-3" />
              <span>Más info</span>
            </button>
            
            {/* Tooltip flotante */}
            {showTooltip && (
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 z-10 animate-in fade-in slide-in-from-bottom-2 duration-200">
                <div className="bg-gradient-to-r from-surface to-card backdrop-blur-xl rounded-xl p-4 shadow-2xl border border-borderLight/50 max-w-xs">
                  <div className="text-xs text-textSecondary leading-relaxed">
                    {tooltip}
                  </div>
                  {/* Flecha del tooltip */}
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2">
                    <div className="w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-surface"></div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
        
        {/* Indicador de progreso decorativo */}
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/30 to-transparent rounded-b-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      </div>
    </div>
  );
};

export default PerformanceMetric;
