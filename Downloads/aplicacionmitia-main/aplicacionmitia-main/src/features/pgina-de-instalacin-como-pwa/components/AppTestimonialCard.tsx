
// src/features/pgina-de-instalacin-como-pwa/components/AppTestimonialCard.tsx
import React from 'react';
import { FiStar, FiMessageSquare } from 'react-icons/fi';

interface AppTestimonialCardProps {
  quote: string;
  author: string;
  rating: number;
}

const AppTestimonialCard: React.FC<AppTestimonialCardProps> = ({
  quote,
  author,
  rating,
}) => {
  return (
    <div className="group relative">
      {/* Elementos decorativos de fondo */}
      <div className="absolute inset-0 bg-gradient-to-br from-warning/5 via-accent/5 to-success/5 rounded-3xl blur-sm group-hover:blur-none transition-all duration-500"></div>
      <div className="absolute top-4 left-4 w-20 h-20 bg-gradient-to-r from-warning/10 to-accent/10 rounded-full blur-xl group-hover:blur-lg transition-all duration-500"></div>
      <div className="absolute bottom-4 right-4 w-16 h-16 bg-gradient-to-r from-success/10 to-info/10 rounded-full blur-xl group-hover:blur-lg transition-all duration-500"></div>
      
      <div className="relative bg-gradient-to-br from-surface/95 via-card/95 to-surface/95 backdrop-blur-xl rounded-3xl p-8 border border-borderLight/50 shadow-xl hover:shadow-2xl transition-all duration-500 group-hover:scale-[1.02]">
        {/* Borde superior decorativo */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-warning via-accent to-success rounded-t-3xl opacity-60 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        {/* Icono de comillas decorativo */}
        <div className="absolute top-6 right-6 opacity-10 group-hover:opacity-20 transition-opacity duration-300">
          <FiMessageSquare className="w-12 h-12 text-accent transform rotate-180" />
        </div>
        
        {/* Rating con estrellas mejoradas */}
        <div className="flex items-center mb-6 space-x-1">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="relative">
              <FiStar
                className={`w-5 h-5 transition-all duration-300 ${
                  i < rating 
                    ? 'text-warning fill-current drop-shadow-sm group-hover:scale-110' 
                    : 'text-borderLight group-hover:text-textMuted'
                }`}
              />
              {i < rating && (
                <div className="absolute inset-0 w-5 h-5 bg-warning/20 rounded-full blur-sm animate-pulse"></div>
              )}
            </div>
          ))}
          <span className="ml-3 text-sm font-semibold text-textMuted group-hover:text-warning transition-colors duration-300">
            {rating}/5
          </span>
        </div>
        
        {/* Cita con tipografía mejorada */}
        <div className="relative mb-6">
          <div className="absolute -top-2 -left-2 w-6 h-6 bg-gradient-to-r from-accent to-warning rounded-full opacity-20 group-hover:opacity-40 transition-opacity duration-300"></div>
          <blockquote className="text-lg font-medium text-text leading-relaxed italic relative z-10 group-hover:text-textDark transition-colors duration-300">
            <span className="text-2xl text-accent font-bold">"</span>
            {quote}
            <span className="text-2xl text-accent font-bold">"</span>
          </blockquote>
        </div>
        
        {/* Autor con estilo mejorado */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-sm">
                {author.split(' ').map(name => name[0]).join('').slice(0, 2)}
              </span>
            </div>
            <div>
              <p className="font-semibold text-text group-hover:text-accent transition-colors duration-300">
                {author}
              </p>
              <p className="text-xs text-textMuted group-hover:text-textSecondary transition-colors duration-300">
                Cliente verificado
              </p>
            </div>
          </div>
          
          {/* Indicador de verificación */}
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
            <span className="text-xs text-success font-medium">Verificado</span>
          </div>
        </div>
        
        {/* Elementos decorativos adicionales */}
        <div className="absolute bottom-2 left-2 w-1 h-1 bg-accent/60 rounded-full animate-pulse delay-500"></div>
        <div className="absolute top-2 left-1/2 w-1 h-1 bg-success/60 rounded-full animate-pulse delay-1000"></div>
      </div>
    </div>
  );
};

export default AppTestimonialCard;
