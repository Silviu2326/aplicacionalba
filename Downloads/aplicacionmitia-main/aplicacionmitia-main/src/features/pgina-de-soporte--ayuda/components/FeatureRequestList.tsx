import React from 'react';
import { Button } from '../../../components/Button';
import { FeatureRequest } from '../types';

interface FeatureRequestListProps {
  requests: FeatureRequest[];
  onVote: (id: string) => void;
  votedIds: Set<string>;
}

const statusStyles = {
  received: 'bg-infoLight text-infoDark',
  'in-consideration': 'bg-warningLight text-warningDark',
  implemented: 'bg-successLight text-successDark',
};

const statusTranslations = {
  received: 'Recibida',
  'in-consideration': 'En consideración',
  implemented: 'Implementada',
};

const FeatureRequestList: React.FC<FeatureRequestListProps> = ({ requests, onVote, votedIds }) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-black bg-gradient-to-r from-text via-accent to-primary bg-clip-text text-transparent">
          Sugerencias de la Comunidad
        </h3>
        <div className="bg-gradient-to-r from-accent/20 to-primary/20 backdrop-blur-sm rounded-full px-4 py-2 border border-borderLight/50">
          <span className="text-sm font-bold text-text">{requests.length} ideas</span>
        </div>
      </div>
      
      {requests.length === 0 ? (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gradient-to-br from-textMuted/20 to-textMuted/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-textMuted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </div>
          <p className="text-textMuted font-medium">No hay sugerencias aún</p>
          <p className="text-textMuted text-sm mt-1">¡Sé el primero en compartir una idea!</p>
        </div>
      ) : (
        <div className="space-y-4">
          {requests.map((request, index) => (
            <div key={request.id} className="relative group">
              {/* Efecto de fondo con gradiente */}
              <div className="absolute inset-0 bg-gradient-to-r from-accent/5 to-primary/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              <div className="relative bg-gradient-to-br from-surface/60 via-card/60 to-surface/60 backdrop-blur-sm rounded-xl border border-borderLight/30 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <h4 className="font-black text-text text-lg mb-2 group-hover:text-accent transition-colors duration-300">
                      {request.title}
                    </h4>
                    <div className="flex items-center space-x-3 mb-3">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold border ${statusStyles[request.status]}`}>
                        <div className={`w-2 h-2 rounded-full mr-2 ${
                          request.status === 'received' ? 'bg-infoDark' :
                          request.status === 'in-consideration' ? 'bg-warningDark' :
                          'bg-successDark'
                        }`}></div>
                        {statusTranslations[request.status]}
                      </span>
                    </div>
                  </div>
                  
                  {/* Botón de votación */}
                  <div className="flex-shrink-0 ml-4">
                    <button
                      onClick={() => onVote(request.id)}
                      disabled={votedIds.has(request.id)}
                      className={`relative group/vote flex flex-col items-center p-3 rounded-xl transition-all duration-300 transform hover:scale-110 ${
                        votedIds.has(request.id)
                          ? 'bg-gradient-to-br from-accent/30 to-primary/30 text-accent cursor-not-allowed shadow-lg'
                          : 'bg-gradient-to-br from-surface to-backgroundSecondary hover:from-accent/20 hover:to-primary/20 text-textMuted hover:text-accent shadow-lg hover:shadow-xl'
                      }`}
                    >
                      <svg className={`w-5 h-5 transition-transform duration-300 ${
                        votedIds.has(request.id) ? 'scale-110' : 'group-hover/vote:scale-110'
                      }`} fill={votedIds.has(request.id) ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                      </svg>
                      <span className="text-xs font-bold mt-1">{request.votes}</span>
                      {votedIds.has(request.id) && (
                        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-accent/20 to-primary/20 animate-pulse"></div>
                      )}
                    </button>
                  </div>
                </div>
                
                <p className="text-textSecondary leading-relaxed mb-4">{request.description}</p>
                
                <div className="flex items-center justify-between pt-4 border-t border-borderLight/30">
                  <div className="flex items-center space-x-4 text-xs text-textMuted">
                    <div className="flex items-center">
                      <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span>{new Date(request.createdAt).toLocaleDateString('es-ES', { 
                        day: 'numeric', 
                        month: 'short', 
                        year: 'numeric' 
                      })}</span>
                    </div>
                  </div>
                  
                  <div className="text-xs text-textMuted">
                    #{index + 1}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FeatureRequestList;
