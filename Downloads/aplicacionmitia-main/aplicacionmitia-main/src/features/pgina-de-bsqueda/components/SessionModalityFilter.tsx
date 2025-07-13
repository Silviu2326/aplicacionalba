// src/features/pgina-de-bsqueda/components/SessionModalityFilter.tsx
import React from 'react';

interface SessionModalityFilterProps {
  selectedModality: string;
  onChange: (modality: string) => void;
}

const SessionModalityFilter: React.FC<SessionModalityFilterProps> = ({ selectedModality, onChange }) => {
  const modalities = ['Online', 'Presencial', 'Híbrido'];

  return (
    <div className="p-4 border-b border-border">
      <h3 className="font-semibold text-lg mb-3 text-text">Modalidad de Sesión</h3>
      <div className="space-y-3">
        {modalities.map((modality) => (
          <label key={modality} className="flex items-center space-x-3 cursor-pointer hover:bg-backgroundSecondary p-2 rounded transition-colors">
            <input
              type="radio"
              name="sessionModality"
              value={modality}
              checked={selectedModality === modality}
              onChange={(e) => onChange(e.target.value)}
              className="h-4 w-4 text-primary focus:ring-focus border-border bg-surface"
            />
            <span className="text-textSecondary">{modality}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default SessionModalityFilter;
