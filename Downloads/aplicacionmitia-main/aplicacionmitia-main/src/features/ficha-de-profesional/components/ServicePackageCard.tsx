
import React from 'react';

interface ServicePackage {
  name: string;
  sessionCount: number;
  totalPrice: number;
  originalPrice: number;
  description: string;
  isPopular?: boolean;
}

interface ServicePackageCardProps {
  packageInfo: ServicePackage;
}

const ServicePackageCard: React.FC<ServicePackageCardProps> = ({ packageInfo }) => {
  const { name, sessionCount, totalPrice, originalPrice, description, isPopular } = packageInfo;
  const savings = originalPrice - totalPrice;
  const savingPercentage = Math.round((savings / originalPrice) * 100);

  return (
    <div className="relative group">
      {/* Efectos de fondo animados */}
      <div className={`absolute inset-0 rounded-2xl blur transition-all duration-500 ${
        isPopular 
          ? 'bg-gradient-to-br from-accent/30 to-primary/30 opacity-60 scale-105' 
          : 'bg-gradient-to-br from-surface/20 to-card/20 opacity-0 group-hover:opacity-40 group-hover:scale-105'
      }`}></div>
      
      <div className={`relative bg-gradient-to-br from-card/90 to-surface/80 backdrop-blur-sm border transition-all duration-300 rounded-2xl p-8 shadow-xl group-hover:shadow-2xl flex flex-col justify-between min-h-[320px] transform group-hover:scale-[1.02] ${
        isPopular 
          ? 'border-accent/50 shadow-accent/20' 
          : 'border-border/50 group-hover:border-primary/30'
      }`}>
        
        {/* Badge de popularidad mejorado */}
        {isPopular && (
          <div className="absolute -top-4 -right-4">
            <div className="relative">
              {/* Efecto de pulso */}
              <div className="absolute inset-0 bg-gradient-to-r from-accent to-warning rounded-full animate-ping opacity-75"></div>
              <div className="relative bg-gradient-to-r from-accent to-warning text-white text-xs font-bold px-4 py-2 rounded-full shadow-lg flex items-center gap-2">
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.368 2.448a1 1 0 00-.364 1.118l1.287 3.957c.3.921-.755 1.688-1.539 1.118l-3.368-2.448a1 1 0 00-1.175 0l-3.368 2.448c-.784.57-1.838-.197-1.539-1.118l1.287-3.957a1 1 0 00-.364-1.118L2.31 9.384c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69L9.049 2.927z" />
                </svg>
                MÁS POPULAR
              </div>
            </div>
          </div>
        )}
        
        <div className="flex-1">
          {/* Título con gradiente */}
          <h3 className={`text-2xl font-bold mb-3 ${
            isPopular 
              ? 'bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent' 
              : 'text-text'
          }`}>
            {name}
          </h3>
          
          {/* Descripción mejorada */}
          <p className="text-textSecondary mb-6 leading-relaxed">{description}</p>
          
          {/* Información de precio con diseño mejorado */}
          <div className="mb-6">
            <div className="flex items-baseline gap-2 mb-3">
              <span className="text-4xl font-extrabold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                ${totalPrice}
              </span>
              <span className="text-lg font-medium text-textMuted">/ {sessionCount} sesiones</span>
            </div>
            
            {/* Información de ahorro con diseño atractivo */}
            <div className="flex items-center gap-3">
              <span className="text-textMuted line-through text-lg">${originalPrice}</span>
              <div className="px-3 py-1 bg-gradient-to-r from-success/20 to-success/10 border border-success/30 rounded-full">
                <span className="text-success font-semibold text-sm">
                  Ahorras ${savings} ({savingPercentage}%)
                </span>
              </div>
            </div>
          </div>
          
          {/* Características del paquete */}
          <div className="space-y-2 mb-6">
            <div className="flex items-center gap-2 text-sm text-textSecondary">
              <svg className="w-4 h-4 text-success" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span>{sessionCount} sesiones incluidas</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-textSecondary">
              <svg className="w-4 h-4 text-success" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span>Válido por 6 meses</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-textSecondary">
              <svg className="w-4 h-4 text-success" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span>Flexibilidad de horarios</span>
            </div>
          </div>
        </div>
        
        {/* Botón mejorado */}
        <button className={`w-full font-bold py-4 px-6 rounded-xl transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-card transform hover:scale-105 flex items-center justify-center gap-2 ${
          isPopular 
            ? 'bg-gradient-to-r from-accent to-primary hover:from-accent/90 hover:to-primary/90 text-white shadow-lg hover:shadow-xl focus:ring-accent' 
            : 'bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-white shadow-lg hover:shadow-xl focus:ring-primary'
        }`}>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          Seleccionar Paquete
        </button>
      </div>
    </div>
  );
};

export default ServicePackageCard;
