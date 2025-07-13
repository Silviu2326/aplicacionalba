import React from 'react';
import { ServiceCard } from './ServiceCard';

interface Service {
  id: string;
  name: string;
  description: string;
  durationInMinutes: number;
  price: number;
}

interface ServiceListProps {
  services: Service[];
}

export const ServiceList: React.FC<ServiceListProps> = ({ services }) => {
  if (!services || services.length === 0) {
    return (
      <div className="relative overflow-hidden">
        {/* Fondo decorativo */}
        <div className="absolute inset-0 bg-gradient-to-br from-surface/50 to-card/30 backdrop-blur-sm"></div>
        <div className="absolute top-4 right-4 w-20 h-20 bg-gradient-to-br from-primary/10 to-accent/10 rounded-full blur-xl"></div>
        <div className="absolute bottom-4 left-4 w-16 h-16 bg-gradient-to-br from-accent/10 to-primary/10 rounded-full blur-lg"></div>
        
        <div className="relative bg-gradient-to-br from-surface/80 to-card/60 backdrop-blur-sm border border-border/50 p-8 rounded-2xl shadow-xl text-center">
          <div className="mb-4">
            <div className="w-16 h-16 mx-auto bg-gradient-to-br from-textMuted/20 to-border/20 rounded-full flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-textMuted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
          </div>
          <h3 className="text-lg font-semibold text-text mb-2">Servicios en preparación</h3>
          <p className="text-textMuted leading-relaxed">Este profesional aún no ha publicado sus servicios.<br />¡Pronto estará disponible más información!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="my-8 relative">
      {/* Fondo decorativo para la sección */}
      <div className="absolute -top-4 -left-4 w-24 h-24 bg-gradient-to-br from-primary/5 to-accent/5 rounded-full blur-2xl"></div>
      <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-gradient-to-br from-accent/5 to-primary/5 rounded-full blur-2xl"></div>
      
      <div className="relative">
        {/* Título con diseño mejorado */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-2">
            <div className="w-1 h-8 bg-gradient-to-b from-primary to-accent rounded-full"></div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-text to-textSecondary bg-clip-text text-transparent">
              Servicios
            </h2>
            <div className="flex-1 h-px bg-gradient-to-r from-border/50 to-transparent"></div>
            <div className="px-3 py-1 bg-gradient-to-r from-primary/10 to-accent/10 backdrop-blur-sm border border-primary/20 rounded-full">
              <span className="text-sm font-medium text-primary">{services.length} disponible{services.length !== 1 ? 's' : ''}</span>
            </div>
          </div>
          <p className="text-textMuted ml-8">Descubre todos los servicios profesionales disponibles</p>
        </div>
        
        {/* Lista de servicios con espaciado mejorado */}
        <div className="space-y-6">
          {services.map((service, index) => (
            <div 
              key={service.id} 
              className="transform transition-all duration-300 hover:translate-x-2"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <ServiceCard service={service} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};