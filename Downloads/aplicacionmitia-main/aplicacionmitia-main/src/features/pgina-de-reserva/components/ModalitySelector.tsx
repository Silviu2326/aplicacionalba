// src/features/pgina-de-reserva/components/ModalitySelector.tsx
import React from 'react';

type Modality = 'Online' | 'Presencial';

interface ModalitySelectorProps {
  availableModalities: Modality[];
  selectedModality: Modality | null;
  onSelectModality: (modality: Modality) => void;
}

const ModalitySelector: React.FC<ModalitySelectorProps> = ({
  availableModalities = [],
  selectedModality,
  onSelectModality,
}) => {
  const getModalityIcon = (modality: Modality) => {
    if (modality === 'Online') {
      return (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 015 8a1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z" clipRule="evenodd" />
        </svg>
      );
    } else {
      return (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
        </svg>
      );
    }
  };
  
  const getModalityDescription = (modality: Modality) => {
    if (modality === 'Online') {
      return 'Sesión por videollamada desde cualquier lugar';
    } else {
      return 'Sesión presencial en el consultorio';
    }
  };
  
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {availableModalities && availableModalities.length > 0 ? availableModalities.map((modality) => (
          <label
            key={modality}
            className={`
              relative cursor-pointer group transition-all duration-300 transform hover:scale-105
              ${
                selectedModality === modality
                  ? 'scale-105'
                  : ''
              }
            `}
          >
            <input
              type="radio"
              name="modality"
              value={modality}
              checked={selectedModality === modality}
              onChange={() => onSelectModality(modality)}
              className="hidden"
            />
            <div className={`
              p-6 rounded-xl border-2 transition-all duration-300
              ${
                selectedModality === modality
                  ? 'bg-gradient-primary border-primary text-white shadow-lg'
                  : 'bg-backgroundSecondary border-border text-textSecondary hover:border-primary hover:bg-surface group-hover:shadow-md'
              }
            `}>
              <div className="flex flex-col items-center text-center space-y-3">
                <div className={`
                  p-3 rounded-full transition-all duration-300
                  ${
                    selectedModality === modality
                      ? 'bg-white/20 text-white'
                      : 'bg-primary/10 text-primary group-hover:bg-primary/20'
                  }
                `}>
                  {getModalityIcon(modality)}
                </div>
                <div>
                  <h4 className={`
                    text-lg font-semibold transition-colors duration-300
                    ${
                      selectedModality === modality
                        ? 'text-white'
                        : 'text-text group-hover:text-primary'
                    }
                  `}>
                    {modality}
                  </h4>
                  <p className={`
                    text-sm mt-1 transition-colors duration-300
                    ${
                      selectedModality === modality
                        ? 'text-primaryLight'
                        : 'text-textMuted group-hover:text-textSecondary'
                    }
                  `}>
                    {getModalityDescription(modality)}
                  </p>
                </div>
                {selectedModality === modality && (
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-success rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
              </div>
            </div>
          </label>
        )) : (
          <div className="col-span-full text-center py-8">
            <svg className="w-12 h-12 text-textMuted mx-auto mb-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            <p className="text-textMuted">No hay modalidades disponibles</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ModalitySelector;
