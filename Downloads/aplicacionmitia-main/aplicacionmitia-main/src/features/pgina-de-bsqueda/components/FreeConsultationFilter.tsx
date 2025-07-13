// src/features/pgina-de-bsqueda/components/FreeConsultationFilter.tsx
import React from 'react';

interface FreeConsultationFilterProps {
  isChecked: boolean;
  onChange: (isChecked: boolean) => void;
}

const FreeConsultationFilter: React.FC<FreeConsultationFilterProps> = ({ isChecked, onChange }) => {
  return (
    <div className="p-4 border-b border-border">
      <h3 className="font-semibold text-lg mb-3 text-text">Consulta Inicial Gratuita</h3>
      <label className="flex items-center space-x-3 cursor-pointer hover:bg-backgroundSecondary p-2 rounded transition-colors">
        <input
          type="checkbox"
          className="h-5 w-5 rounded border-border text-primary shadow-sm focus:border-focus focus:ring focus:ring-focus focus:ring-opacity-50 bg-surface"
          checked={isChecked}
          onChange={(e) => onChange(e.target.checked)}
        />
        <span className="text-textSecondary">Mostrar solo profesionales con consulta gratuita</span>
      </label>
      <p className="text-sm text-textMuted mt-2">
        Marca esta opción para encontrar terapeutas que ofrecen una primera sesión breve sin costo.
      </p>
    </div>
  );
};

export default FreeConsultationFilter;
