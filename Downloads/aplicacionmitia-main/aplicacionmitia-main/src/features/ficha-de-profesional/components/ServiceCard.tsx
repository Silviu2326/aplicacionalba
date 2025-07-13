import React, { useState } from 'react';
import { Button } from '../../../components/Button';

interface Service {
  id: string;
  name: string;
  description: string;
  durationInMinutes: number;
  price: number;
}

interface ServiceCardProps {
  service: Service;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({ service }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const handleBook = () => {
    // Redirigir al flujo de reserva con el servicio preseleccionado
    console.log(`Reservando servicio: ${service.name}`);
  };

  return (
    <div className="group relative overflow-hidden">
      {/* Efectos de fondo */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-accent/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      
      <div className="relative bg-gradient-to-br from-card/90 to-surface/80 backdrop-blur-sm border border-borderLight/50 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 mb-4">
        {/* Header del servicio */}
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-3 h-3 bg-gradient-to-r from-primary to-accent rounded-full"></div>
              <h3 className="text-xl font-bold bg-gradient-to-r from-text to-primaryLight bg-clip-text text-transparent">
                {service.name}
              </h3>
            </div>
            
            {/* Información del servicio */}
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-2 bg-info/20 backdrop-blur-sm px-3 py-1 rounded-full border border-info/30">
                <svg className="w-4 h-4 text-info" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                </svg>
                <span className="text-info font-medium">{service.durationInMinutes} min</span>
              </div>
              
              <div className="flex items-center gap-2 bg-accent/20 backdrop-blur-sm px-3 py-1 rounded-full border border-accent/30">
                <svg className="w-4 h-4 text-accent" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm-7-8a7 7 0 1114 0 7 7 0 01-14 0zm7-3a1 1 0 012 0v.092a4.535 4.535 0 011.676.662C14.082 8.043 15 8.681 15 10c0 1.319-.918 1.957-2.324 2.246A4.535 4.535 0 0111 12.908V13a1 1 0 11-2 0v-.092a4.535 4.535 0 01-1.676-.662C5.918 11.957 5 11.319 5 10c0-1.319.918-1.957 2.324-2.246A4.535 4.535 0 019 7.092V7z" clipRule="evenodd" />
                </svg>
                <span className="text-accent font-bold">{service.price}€</span>
              </div>
            </div>
          </div>
          
          {/* Botón de reserva mejorado */}
          <div className="relative group/button ml-4">
            <div className="absolute inset-0 bg-gradient-primary rounded-xl blur opacity-30 group-hover/button:opacity-50 transition-opacity"></div>
            <Button 
              onClick={handleBook}
              variant="primary"
              className="relative bg-gradient-primary hover:shadow-xl transform hover:scale-105 transition-all duration-300 px-6 py-3 font-semibold"
            >
              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
              </svg>
              Reservar
            </Button>
          </div>
        </div>

        {/* Descripción expandible */}
        <div className="border-t border-border/30 pt-4">
          <button 
            onClick={handleToggleExpand} 
            className="flex items-center gap-2 text-accent hover:text-accentHover transition-colors duration-200 font-medium"
          >
            <svg 
              className={`w-4 h-4 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`} 
              fill="currentColor" 
              viewBox="0 0 20 20"
            >
              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
            {isExpanded ? 'Leer menos' : 'Leer más'}
          </button>
          
          {/* Descripción con animación */}
          <div className={`overflow-hidden transition-all duration-300 ${isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
            <p className="text-textSecondary mt-3 leading-relaxed">{service.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};