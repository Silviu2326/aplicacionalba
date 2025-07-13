import React from 'react';

interface KeywordSearchBarProps {
  keyword: string;
  setKeyword: (keyword: string) => void;
  onSearch: () => void;
}

const KeywordSearchBar: React.FC<KeywordSearchBarProps> = ({ keyword, setKeyword, onSearch }) => {
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(event.target.value);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      onSearch();
    }
  };

  return (
    <div className="relative mb-6">
      <div className="relative group">
        {/* Icono de búsqueda */}
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
          <svg className="h-5 w-5 text-textMuted group-focus-within:text-primary transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        
        <input
          type="text"
          value={keyword}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder="Buscar por especialidad, técnica o palabra clave..."
          className="w-full pl-12 pr-32 py-4 border border-border/50 rounded-2xl shadow-lg focus:ring-2 focus:ring-primary/20 focus:border-primary bg-gradient-to-r from-surface to-surface/80 backdrop-blur-sm text-text placeholder-textMuted transition-all duration-300 hover:shadow-xl group-focus-within:shadow-2xl"
        />
        
        {/* Botón de búsqueda mejorado */}
        <button
          onClick={onSearch}
          className="absolute inset-y-0 right-2 my-2 px-6 text-sm font-semibold text-textInverse bg-gradient-to-r from-primary to-accent rounded-xl hover:from-primaryHover hover:to-accent/90 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center space-x-2"
        >
          <span>Buscar</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </button>
      </div>
      
      {/* Sugerencias de búsqueda */}
      <div className="mt-3 flex flex-wrap gap-2">
        <span className="text-xs text-textMuted">Sugerencias:</span>
        {['EMDR', 'Terapia cognitiva', 'Ansiedad', 'Depresión', 'Terapia de pareja'].map((suggestion) => (
          <button
            key={suggestion}
            onClick={() => {
              setKeyword(suggestion);
              onSearch();
            }}
            className="text-xs px-3 py-1 bg-primary/10 text-primary rounded-full hover:bg-primary/20 transition-colors duration-200 border border-primary/20 hover:border-primary/40"
          >
            {suggestion}
          </button>
        ))}
      </div>
    </div>
  );
};

export default KeywordSearchBar;
