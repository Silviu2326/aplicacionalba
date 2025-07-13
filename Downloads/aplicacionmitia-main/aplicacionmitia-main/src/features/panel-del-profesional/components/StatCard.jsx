import React from 'react';

const StatCard = ({ title, value, change, icon }) => {
  const isPositive = change && change > 0;
  const isNegative = change && change < 0;

  return (
    <div className="relative group">
      {/* Efecto de resplandor de fondo */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-accent/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      {/* Contenedor principal con glassmorphism */}
      <div className="relative bg-gradient-to-br from-surface/90 to-card/70 backdrop-blur-xl rounded-2xl border border-borderLight/50 shadow-xl p-6 hover:shadow-2xl transition-all duration-300 group-hover:scale-105">
        {/* Decoración superior con gradiente */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-accent to-secondary rounded-t-2xl"></div>
        
        <div className="flex items-center justify-between">
          <div className="flex-1">
            {/* Título */}
            <p className="text-sm font-semibold text-textSecondary uppercase tracking-wider mb-2">{title}</p>
            
            {/* Valor principal */}
            <div className="relative">
              <p className="text-4xl font-bold bg-gradient-to-r from-text to-textSecondary bg-clip-text text-transparent">
                {value}
              </p>
              {/* Efecto de brillo en el número */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent animate-pulse"></div>
            </div>
            
            {/* Indicador de cambio */}
            {change !== undefined && (
              <div className={`inline-flex items-center mt-3 px-3 py-1 rounded-full text-sm font-medium backdrop-blur-sm ${
                isPositive 
                  ? 'bg-success/20 text-success border border-success/30' 
                  : isNegative 
                  ? 'bg-error/20 text-error border border-error/30' 
                  : 'bg-info/20 text-info border border-info/30'
              }`}>
                {isPositive && (
                  <svg className="w-4 h-4 mr-1 animate-bounce" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L10 4.414 4.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                )}
                {isNegative && (
                  <svg className="w-4 h-4 mr-1 animate-bounce" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 10.293a1 1 0 010 1.414l-6 6a1 1 0 01-1.414 0l-6-6a1 1 0 111.414-1.414L10 15.586l5.293-5.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                )}
                <span className="font-bold">{Math.abs(change)}%</span>
                <span className="ml-1 opacity-75">
                  {isPositive ? 'aumento' : isNegative ? 'disminución' : 'sin cambio'}
                </span>
              </div>
            )}
          </div>
          
          {/* Icono con efectos modernos */}
          <div className="relative ml-4">
            <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent rounded-xl blur opacity-30 animate-pulse"></div>
            <div className="relative p-4 bg-gradient-to-r from-primary/20 to-accent/20 backdrop-blur-sm rounded-xl border border-primary/30">
              <div className="text-primary text-2xl">
                {icon}
              </div>
            </div>
            {/* Partícula decorativa */}
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-accent to-secondary rounded-full animate-ping opacity-75"></div>
          </div>
        </div>
        
        {/* Línea divisoria animada */}
        <div className="mt-4 h-px bg-gradient-to-r from-transparent via-borderLight to-transparent opacity-50"></div>
        
        {/* Partículas decorativas de fondo */}
        <div className="absolute top-4 right-16 w-1 h-1 bg-primary/40 rounded-full animate-pulse"></div>
        <div className="absolute bottom-4 left-4 w-2 h-2 bg-accent/30 rounded-full animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/4 w-1 h-1 bg-secondary/40 rounded-full animate-pulse delay-500"></div>
      </div>
    </div>
  );
};

export default StatCard;
