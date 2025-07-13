import React from 'react';

const StatCard = ({ title, value, icon, gradient = 'from-primary to-primaryDark', bgGradient = 'from-primary/10 to-primaryDark/10' }) => {
  return (
    <div className="group relative overflow-hidden">
      {/* Fondo con gradiente y blur */}
      <div className={`absolute inset-0 bg-gradient-to-br ${bgGradient} rounded-2xl blur-sm group-hover:blur-none transition-all duration-500`}></div>
      
      {/* Card principal */}
      <div className="relative bg-gradient-to-br from-surface/80 via-card/80 to-surface/80 backdrop-blur-xl p-6 rounded-2xl border border-borderLight/30 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-1">
        {/* Efecto de brillo superior */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
        
        {/* Contenido */}
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <dt className="text-sm font-medium text-textMuted mb-2 tracking-wide uppercase">
              {title}
            </dt>
            <dd className="text-3xl font-black text-text mb-1 transition-all duration-300 group-hover:scale-110">
              {typeof value === 'number' ? value.toLocaleString() : value}
            </dd>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
              <span className="text-xs text-textMuted">Actualizado</span>
            </div>
          </div>
          
          {/* Icono con gradiente */}
          <div className="relative">
            <div className={`absolute inset-0 bg-gradient-to-br ${gradient} rounded-xl blur-md opacity-50 group-hover:opacity-75 transition-opacity duration-300`}></div>
            <div className={`relative bg-gradient-to-br ${gradient} p-4 rounded-xl shadow-lg text-textInverse transform transition-all duration-300 group-hover:rotate-6 group-hover:scale-110`}>
              {icon}
            </div>
          </div>
        </div>
        
        {/* Indicador de progreso decorativo */}
        <div className="mt-4 h-1 bg-borderLight/20 rounded-full overflow-hidden">
          <div className={`h-full bg-gradient-to-r ${gradient} rounded-full transition-all duration-1000 group-hover:w-full`} style={{ width: '60%' }}></div>
        </div>
        
        {/* Efecto de partículas flotantes */}
        <div className="absolute top-2 right-2 w-1 h-1 bg-accent rounded-full animate-ping opacity-75"></div>
        <div className="absolute bottom-4 left-4 w-1 h-1 bg-secondary rounded-full animate-ping opacity-50 animation-delay-500"></div>
      </div>
    </div>
  );
};

export default StatCard;
