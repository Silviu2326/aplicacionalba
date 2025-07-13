// src/features/pgina-de-bsqueda/components/SortOptions.tsx
import React from 'react';

interface SortOptionsProps {
  onSortChange: (sortValue: string) => void;
  currentSort: string;
  showCompatibilityOption: boolean;
}

const SortOptions: React.FC<SortOptionsProps> = ({ onSortChange, currentSort, showCompatibilityOption }) => {
  return (
    <div className="flex items-center space-x-2">
      <label htmlFor="sort-options" className="text-textSecondary">
        Ordenar por:
      </label>
      <select
        id="sort-options"
        value={currentSort}
        onChange={(e) => onSortChange(e.target.value)}
        className="bg-surface border border-border text-text rounded-md focus:ring-focus focus:border-focus"
      >
        <option value="relevance">Relevancia</option>
        {showCompatibilityOption && <option value="compatibility_desc">Mayor compatibilidad</option>}
        <option value="rating_desc">Mejor valorados</option>
        <option value="price_asc">Precio: de menor a mayor</option>
        <option value="price_desc">Precio: de mayor a menor</option>
      </select>
    </div>
  );
};

export default SortOptions;
