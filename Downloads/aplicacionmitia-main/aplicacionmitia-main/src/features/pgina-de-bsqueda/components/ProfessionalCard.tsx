
import React from 'react';
import MatchScoreIndicator from './MatchScoreIndicator';

interface Professional {
  id: string;
  name: string;
  avatar: string;
  specialties: string[];
  price: number;
  rating: number;
  acceptsNewClients: boolean;
  modality: string[];
  languages: string[];
  matchScore?: number;
  matchReasons?: string[];
  freeConsultation?: boolean;
}

interface ProfessionalCardProps {
  professional: Professional;
  isSelected: boolean;
  onToggleSelection: (id: string) => void;
}

const ProfessionalCard: React.FC<ProfessionalCardProps> = ({
  professional,
  isSelected,
  onToggleSelection,
}) => {
  const { id, name, avatar, specialties, price, rating, acceptsNewClients, modality, languages, matchScore, matchReasons, freeConsultation } = professional;

  return (
    <div className="group border border-border/50 rounded-2xl shadow-lg p-6 flex flex-col items-center bg-gradient-to-br from-card to-card/80 backdrop-blur-sm relative transition-all duration-500 hover:shadow-2xl hover:border-primary/30 hover:scale-105 hover:-translate-y-2">
      {/* Indicador de compatibilidad mejorado */}
      {matchScore && matchReasons && (
        <div className="absolute top-3 left-3 z-10">
          <MatchScoreIndicator score={matchScore} reasons={matchReasons} />
        </div>
      )}
      
      {/* Badges mejorados */}
      <div className="absolute top-3 right-3 flex flex-col items-end space-y-2 z-10">
        {acceptsNewClients && (
          <span className="bg-gradient-to-r from-success to-success/80 text-textInverse text-xs font-semibold px-3 py-1.5 rounded-full shadow-lg backdrop-blur-sm border border-success/30 animate-pulse">
            ✓ Acepta nuevos clientes
          </span>
        )}
        {freeConsultation && (
          <span className="bg-gradient-to-r from-info to-accent text-textInverse text-xs font-semibold px-3 py-1.5 rounded-full shadow-lg backdrop-blur-sm border border-info/30">
            🎁 Consulta gratuita
          </span>
        )}
      </div>
      {/* Avatar con efecto hover mejorado */}
      <div className="relative mt-16 mb-6">
        <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent rounded-full blur-lg opacity-0 group-hover:opacity-30 transition-opacity duration-500"></div>
        <img 
          src={avatar} 
          alt={name} 
          className="relative w-28 h-28 rounded-full border-4 border-white shadow-xl group-hover:scale-110 transition-transform duration-500" 
        />
        <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-gradient-to-r from-success to-success/80 rounded-full flex items-center justify-center shadow-lg">
          <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        </div>
      </div>
      
      <h3 className="text-xl font-bold text-text mb-2 text-center group-hover:text-primary transition-colors duration-300">{name}</h3>
      <p className="text-textSecondary text-center mb-4 line-clamp-2">{specialties?.join(', ') || 'Sin especialidades'}</p>
      {/* Tags de modalidad mejorados */}
      <div className="flex flex-wrap gap-2 mb-3 justify-center">
        {modality?.map((m) => (
          <span key={m} className="bg-gradient-to-r from-primary/20 to-primary/10 text-primary text-xs font-semibold px-3 py-1.5 rounded-full border border-primary/20 hover:border-primary/40 transition-colors duration-200">
            {m}
          </span>
        ))}
      </div>
      
      {/* Tags de idiomas mejorados */}
      <div className="flex flex-wrap gap-2 mb-4 justify-center">
        {languages?.map((lang) => (
          <span key={lang} className="bg-gradient-to-r from-accent/20 to-accent/10 text-accent text-xs font-semibold px-3 py-1.5 rounded-full border border-accent/20 hover:border-accent/40 transition-colors duration-200">
            🌐 {lang}
          </span>
        ))}
      </div>
      {/* Información de precio y rating mejorada */}
      <div className="flex justify-between items-center w-full mt-auto pt-4 border-t border-border/30">
        <div className="flex items-center space-x-2">
          <span className="text-2xl font-bold bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
            ${price}
          </span>
          <span className="text-sm text-textMuted">/sesión</span>
        </div>
        <div className="flex items-center space-x-1 bg-warning/10 px-3 py-1 rounded-full">
          <svg className="w-4 h-4 text-warning" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          <span className="text-sm font-semibold text-warning">{rating}</span>
        </div>
      </div>
      
      {/* Checkbox de comparación mejorado */}
      <div className="mt-4 w-full">
        <label className="flex items-center justify-center space-x-3 cursor-pointer p-3 rounded-xl bg-backgroundSecondary/50 hover:bg-primary/10 border border-border/30 hover:border-primary/30 transition-all duration-200 group/checkbox">
          <input
            type="checkbox"
            checked={isSelected}
            onChange={() => onToggleSelection(id)}
            className="h-5 w-5 text-primary focus:ring-primary focus:ring-2 rounded border-border bg-surface transition-colors duration-200"
          />
          <span className="text-textSecondary group-hover/checkbox:text-primary transition-colors duration-200 font-medium">
            {isSelected ? '✓ Seleccionado para comparar' : 'Comparar profesional'}
          </span>
        </label>
      </div>
    </div>
  );
};

export default ProfessionalCard;
