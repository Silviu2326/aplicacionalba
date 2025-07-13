// src/features/ficha-de-profesional/components/RatingSummary.tsx
import React from 'react';

interface RatingSummaryProps {
  averageRating: number;
  totalReviews: number;
}

const StarIcon: React.FC<{ filled: boolean; className?: string }> = ({ filled, className = 'w-6 h-6' }) => (
  <svg
    className={`${className} ${filled ? 'text-accent' : 'text-textMuted'}`}
    fill="currentColor"
    viewBox="0 0 20 20"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.368 2.448a1 1 0 00-.364 1.118l1.287 3.957c.3.921-.755 1.688-1.539 1.118l-3.368-2.448a1 1 0 00-1.175 0l-3.368 2.448c-.784.57-1.838-.197-1.539-1.118l1.287-3.957a1 1 0 00-.364-1.118L2.31 9.384c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69L9.049 2.927z" />
  </svg>
);

const RatingSummary: React.FC<RatingSummaryProps> = ({ averageRating, totalReviews }) => {
  const renderStars = () => {
    return Array.from({ length: 5 }, (_, index) => {
      const isFilled = index < Math.round(averageRating);
      return (
        <div key={index} className="relative">
          <StarIcon 
            filled={isFilled} 
            className={`w-7 h-7 transition-all duration-300 ${
              isFilled ? 'text-warning drop-shadow-lg' : 'text-border'
            }`} 
          />
          {isFilled && (
            <div className="absolute inset-0 w-7 h-7 text-warning/30 animate-pulse">
              <StarIcon filled={true} className="w-7 h-7" />
            </div>
          )}
        </div>
      );
    });
  };

  const getRatingColor = () => {
    if (averageRating >= 4.5) return 'from-success to-success/80';
    if (averageRating >= 4.0) return 'from-warning to-warning/80';
    if (averageRating >= 3.0) return 'from-accent to-accent/80';
    return 'from-textMuted to-textMuted/80';
  };

  const getRatingText = () => {
    if (averageRating >= 4.5) return 'Excelente';
    if (averageRating >= 4.0) return 'Muy bueno';
    if (averageRating >= 3.0) return 'Bueno';
    return 'Regular';
  };

  return (
    <div className="relative group overflow-hidden">
      {/* Efectos de fondo decorativos */}
      <div className="absolute inset-0 bg-gradient-to-br from-surface/50 to-card/30 backdrop-blur-sm"></div>
      <div className="absolute top-4 right-4 w-20 h-20 bg-gradient-to-br from-warning/10 to-accent/10 rounded-full blur-xl"></div>
      <div className="absolute bottom-4 left-4 w-16 h-16 bg-gradient-to-br from-success/10 to-primary/10 rounded-full blur-lg"></div>
      
      <div className="relative bg-gradient-to-br from-surface/90 to-card/80 backdrop-blur-sm border border-border/50 p-8 rounded-2xl shadow-xl group-hover:shadow-2xl transition-all duration-300 w-full text-center">
        {/* Título con diseño mejorado */}
        <div className="mb-6">
          <h3 className="text-2xl font-bold bg-gradient-to-r from-text to-textSecondary bg-clip-text text-transparent mb-2">
            Valoración General
          </h3>
          <div className="w-16 h-1 bg-gradient-to-r from-warning to-accent rounded-full mx-auto"></div>
        </div>
        
        {/* Contenido principal */}
        <div className="flex items-center justify-center gap-8 my-8">
          {/* Puntuación principal */}
          <div className="text-center">
            <div className="relative">
              {/* Círculo decorativo de fondo */}
              <div className="absolute inset-0 bg-gradient-to-br from-warning/20 to-accent/20 rounded-full blur-lg scale-110"></div>
              <div className="relative bg-gradient-to-br from-surface/80 to-card/60 backdrop-blur-sm border border-warning/30 rounded-full w-24 h-24 flex items-center justify-center">
                <span className={`text-4xl font-extrabold bg-gradient-to-r ${getRatingColor()} bg-clip-text text-transparent`}>
                  {averageRating.toFixed(1)}
                </span>
              </div>
            </div>
            <p className={`text-sm font-semibold mt-3 bg-gradient-to-r ${getRatingColor()} bg-clip-text text-transparent`}>
              {getRatingText()}
            </p>
          </div>
          
          {/* Estrellas y detalles */}
          <div className="flex flex-col items-center">
            <div className="flex gap-1 mb-3">
              {renderStars()}
            </div>
            <div className="text-center">
              <p className="text-textMuted text-sm leading-relaxed">
                Basado en <span className="font-semibold text-text">{totalReviews}</span> valoraciones
              </p>
              {totalReviews > 0 && (
                <div className="mt-2 px-3 py-1 bg-gradient-to-r from-primary/10 to-accent/10 backdrop-blur-sm border border-primary/20 rounded-full">
                  <span className="text-xs font-medium text-primary">
                    {totalReviews > 100 ? '100+' : totalReviews} reseñas verificadas
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Indicador de confianza */}
        <div className="mt-6 pt-6 border-t border-border/30">
          <div className="flex items-center justify-center gap-2 text-sm text-textSecondary">
            <svg className="w-4 h-4 text-success" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span>Valoraciones verificadas por usuarios reales</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RatingSummary;
