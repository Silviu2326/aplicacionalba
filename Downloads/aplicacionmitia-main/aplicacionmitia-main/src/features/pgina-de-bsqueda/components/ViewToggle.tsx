// src/features/pgina-de-bsqueda/components/ViewToggle.tsx
import React from 'react';

interface ViewToggleProps {
  view: 'list' | 'map';
  onViewChange: (view: 'list' | 'map') => void;
}

const ViewToggle: React.FC<ViewToggleProps> = ({ view, onViewChange }) => {
  return (
    <div className="flex items-center justify-center my-4">
      <div className="relative bg-gradient-to-r from-surface/80 to-surface/60 backdrop-blur-sm border border-border/50 rounded-2xl p-1 shadow-lg">
        {/* Indicador deslizante */}
        <div
          className={`absolute top-1 bottom-1 w-1/2 bg-gradient-to-r from-primary to-accent rounded-xl shadow-md transition-transform duration-300 ease-out ${
            view === 'map' ? 'transform translate-x-full' : ''
          }`}
        />
        
        <div className="relative flex">
          <button
            onClick={() => onViewChange('list')}
            className={`flex-1 px-6 py-3 text-sm font-semibold transition-all duration-300 rounded-xl flex items-center justify-center space-x-2 ${
              view === 'list'
                ? 'text-textInverse z-10'
                : 'text-text hover:text-primary'
            }`}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
            </svg>
            <span>Lista</span>
          </button>
          
          <button
            onClick={() => onViewChange('map')}
            className={`flex-1 px-6 py-3 text-sm font-semibold transition-all duration-300 rounded-xl flex items-center justify-center space-x-2 ${
              view === 'map'
                ? 'text-textInverse z-10'
                : 'text-text hover:text-primary'
            }`}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span>Mapa</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewToggle;
