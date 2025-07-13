// src/features/pgina-de-bsqueda/components/ResultsCounter.tsx
import React from 'react';

interface ResultsCounterProps {
  count: number;
}

const ResultsCounter: React.FC<ResultsCounterProps> = ({ count }) => {
  if (count === 0) {
    return (
      <div className="text-center py-12">
        <div className="mb-6">
          <div className="mx-auto w-24 h-24 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full flex items-center justify-center mb-4">
            <svg className="w-12 h-12 text-primary/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
        <h3 className="text-xl font-semibold text-text mb-2">No se encontraron profesionales</h3>
        <p className="text-textMuted text-base mb-4">No hay profesionales que coincidan con tus criterios de búsqueda.</p>
        <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-2xl p-6 max-w-md mx-auto">
          <h4 className="font-medium text-text mb-3">Sugerencias para mejorar tu búsqueda:</h4>
          <ul className="text-sm text-textMuted space-y-2 text-left">
            <li className="flex items-center space-x-2">
              <span className="w-2 h-2 bg-primary rounded-full"></span>
              <span>Amplía el rango de ubicación</span>
            </li>
            <li className="flex items-center space-x-2">
              <span className="w-2 h-2 bg-primary rounded-full"></span>
              <span>Reduce el número de filtros activos</span>
            </li>
            <li className="flex items-center space-x-2">
              <span className="w-2 h-2 bg-primary rounded-full"></span>
              <span>Prueba con palabras clave más generales</span>
            </li>
          </ul>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-between mb-6 p-4 bg-gradient-to-r from-surface/80 to-surface/60 backdrop-blur-sm rounded-2xl border border-border/50 shadow-lg">
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center">
          <svg className="w-5 h-5 text-textInverse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
        </div>
        <div>
          <p className="text-text font-semibold text-lg">
            {count === 1 ? '1 profesional encontrado' : `${count} profesionales encontrados`}
          </p>
          <p className="text-textMuted text-sm">Resultados que coinciden con tus criterios</p>
        </div>
      </div>
      
      <div className="flex items-center space-x-2">
        <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
        <span className="text-sm text-textMuted">Actualizado</span>
      </div>
    </div>
  );
};

export default ResultsCounter;
