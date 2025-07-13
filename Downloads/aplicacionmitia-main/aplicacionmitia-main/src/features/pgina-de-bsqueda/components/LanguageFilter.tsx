
import React from 'react';

const availableLanguages = [
  { id: 'en', name: 'Inglés' },
  { id: 'fr', name: 'Francés' },
  { id: 'de', name: 'Alemán' },
  { id: 'pt', name: 'Portugués' },
  { id: 'it', name: 'Italiano' },
  { id: 'sign', name: 'Lenguaje de Señas' },
];

interface LanguageFilterProps {
  selectedLanguages: string[];
  onChange: (selected: string[]) => void;
}

const LanguageFilter: React.FC<LanguageFilterProps> = ({ selectedLanguages, onChange }) => {
  const handleCheckboxChange = (languageId: string) => {
    const newSelection = selectedLanguages.includes(languageId)
      ? selectedLanguages.filter((id) => id !== languageId)
      : [...selectedLanguages, languageId];
    onChange(newSelection);
  };

  return (
    <div className="p-4 border-t border-border">
      <h3 className="font-semibold text-lg mb-3 text-text">Idiomas</h3>
      <div className="space-y-3">
        {availableLanguages.map((lang) => (
          <label key={lang.id} className="flex items-center space-x-3 cursor-pointer hover:bg-backgroundSecondary p-2 rounded transition-colors">
            <input
              type="checkbox"
              className="h-5 w-5 rounded border-border text-primary shadow-sm focus:border-focus focus:ring focus:ring-focus focus:ring-opacity-50 bg-surface"
              checked={selectedLanguages.includes(lang.id)}
              onChange={() => handleCheckboxChange(lang.id)}
            />
            <span className="text-textSecondary">{lang.name}</span>
          </label>
        ))}
      </div>
      {selectedLanguages.length > 0 && (
        <button
          onClick={() => onChange([])}
          className="mt-4 text-sm text-primary hover:text-primaryHover transition-colors font-medium"
        >
          Limpiar selección
        </button>
      )}
    </div>
  );
};

export default LanguageFilter;
