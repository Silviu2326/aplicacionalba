
import React from 'react';

interface Professional {
  id: string;
  name: string;
  avatar: string;
}

interface ComparisonTrayProps {
  selectedProfessionals: Professional[];
  onRemove: (id: string) => void;
  onCompare: () => void;
  maxSelection: number;
}

const ComparisonTray: React.FC<ComparisonTrayProps> = ({
  selectedProfessionals,
  onRemove,
  onCompare,
  maxSelection,
}) => {
  if (selectedProfessionals.length === 0) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-surface/95 to-surface/90 backdrop-blur-lg border-t border-border/50 shadow-2xl p-6 z-50">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center">
                <svg className="w-6 h-6 text-textInverse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-bold text-text">
                  Comparar profesionales
                </h3>
                <p className="text-sm text-textMuted">
                  {selectedProfessionals.length}/{maxSelection} seleccionados
                </p>
              </div>
            </div>
            
            <div className="flex space-x-3 max-w-md overflow-x-auto">
              {selectedProfessionals.map((prof, index) => (
                <div
                  key={prof.id}
                  className="flex items-center bg-gradient-to-r from-primary/20 to-accent/20 backdrop-blur-sm border border-primary/30 text-primary px-4 py-2 rounded-2xl text-sm whitespace-nowrap animate-in slide-in-from-bottom-2 duration-300"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center mr-3">
                    <span className="text-xs font-semibold">{prof.name.charAt(0)}</span>
                  </div>
                  <span className="mr-3 font-medium">{prof.name}</span>
                  <button
                    onClick={() => onRemove(prof.id)}
                    className="w-6 h-6 bg-primary/20 hover:bg-primary/40 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
                  >
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          </div>
          
          <div className="flex space-x-3">
            <button
              onClick={onCompare}
              disabled={selectedProfessionals.length < 2}
              className="px-8 py-3 bg-gradient-to-r from-primary to-accent text-textInverse rounded-2xl hover:from-primaryHover hover:to-accent/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl font-semibold flex items-center space-x-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              <span>Comparar</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComparisonTray;
