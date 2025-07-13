// src/features/ficha-de-profesional/components/ReviewCard.tsx
import React from 'react';

interface ReviewCardProps {
  review: {
    rating: number;
    comment: string;
    clientName: string;
    date: string;
  };
}

const StarIcon: React.FC<{ filled: boolean }> = ({ filled }) => (
  <svg
    className={`w-5 h-5 ${filled ? 'text-accent' : 'text-textMuted'}`}
    fill="currentColor"
    viewBox="0 0 20 20"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.368 2.448a1 1 0 00-.364 1.118l1.287 3.957c.3.921-.755 1.688-1.539 1.118l-3.368-2.448a1 1 0 00-1.175 0l-3.368 2.448c-.784.57-1.838-.197-1.539-1.118l1.287-3.957a1 1 0 00-.364-1.118L2.31 9.384c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69L9.049 2.927z" />
  </svg>
);

const ReviewCard: React.FC<ReviewCardProps> = ({ review }) => {
  const { rating, comment, clientName, date } = review;

  const renderStars = () => {
    return Array.from({ length: 5 }, (_, index) => {
      const isFilled = index < rating;
      return (
        <div key={index} className="relative">
          <StarIcon filled={isFilled} />
          {isFilled && (
            <div className="absolute inset-0 text-warning/30 animate-pulse">
              <StarIcon filled={true} />
            </div>
          )}
        </div>
      );
    });
  };

  const getRatingColor = () => {
    if (rating >= 4.5) return 'text-success';
    if (rating >= 4.0) return 'text-warning';
    if (rating >= 3.0) return 'text-accent';
    return 'text-textMuted';
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="relative group">
      {/* Efecto de fondo sutil */}
      <div className="absolute inset-0 bg-gradient-to-br from-surface/20 to-card/20 rounded-2xl blur opacity-0 group-hover:opacity-50 transition-all duration-300 scale-95 group-hover:scale-105"></div>
      
      <div className="relative bg-gradient-to-br from-card/90 to-surface/80 backdrop-blur-sm border border-border/50 p-6 rounded-2xl shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:border-primary/30">
        {/* Header con avatar y rating */}
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-4">
            {/* Avatar del cliente */}
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full flex items-center justify-center border border-primary/30">
                <span className="text-sm font-bold text-primary">
                  {getInitials(clientName || 'AN')}
                </span>
              </div>
              {/* Indicador de verificación */}
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-success rounded-full border-2 border-card flex items-center justify-center">
                <svg className="w-2 h-2 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
            
            {/* Información del cliente */}
            <div>
              <h4 className="font-semibold text-text">{clientName || 'Cliente Anónimo'}</h4>
              <div className="flex items-center gap-2 mt-1">
                <div className="flex gap-0.5">{renderStars()}</div>
                <span className={`font-bold text-sm ${getRatingColor()}`}>
                  {rating.toFixed(1)}
                </span>
              </div>
            </div>
          </div>
          
          {/* Fecha con diseño mejorado */}
          <div className="text-right">
            <div className="px-3 py-1 bg-gradient-to-r from-textMuted/10 to-border/10 backdrop-blur-sm border border-border/30 rounded-full">
              <span className="text-xs font-medium text-textMuted">{date}</span>
            </div>
          </div>
        </div>
        
        {/* Comentario con diseño mejorado */}
         <div className="relative">
           {/* Comillas decorativas */}
           <div className="absolute -top-2 -left-2 text-4xl text-primary/20 font-serif leading-none">
             "
           </div>
           
           <blockquote className="pl-6 pr-4 py-4 bg-gradient-to-r from-surface/30 to-transparent rounded-lg border-l-4 border-primary/30">
             <p className="text-text leading-relaxed italic">{comment}</p>
           </blockquote>
           
           {/* Acciones de la reseña */}
           <div className="flex items-center justify-end mt-4 gap-2">
             <div className="flex items-center gap-1">
               <button className="p-2 hover:bg-primary/10 rounded transition-colors duration-200 group/btn">
                 <svg className="w-3 h-3 text-textMuted group-hover/btn:text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                 </svg>
               </button>
               <span className="text-xs text-textMuted">¿Útil?</span>
             </div>
           </div>
         </div>
       </div>
     </div>
   );
 };

export default ReviewCard;
