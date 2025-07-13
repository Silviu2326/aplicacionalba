import React, { useState, useEffect } from 'react';
import FeatureRequestForm from './FeatureRequestForm';
import FeatureRequestList from './FeatureRequestList';
import { getFeatureRequests, addFeatureRequest, voteForFeatureRequest } from '../api';
import { FeatureRequest } from '../types';
import { Button } from '../../../components/Button';

const FeatureRequestSection: React.FC = () => {
  const [requests, setRequests] = useState<FeatureRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [votedIds, setVotedIds] = useState<Set<string>>(() => {
    const savedVotes = localStorage.getItem('votedFeatureRequests');
    return new Set(savedVotes ? JSON.parse(savedVotes) : []);
  });

  const fetchRequests = async () => {
    try {
      setLoading(true);
      const data = await getFeatureRequests();
      setRequests(data);
    } catch (err) {
      setError('No se pudieron cargar las sugerencias. Inténtalo de nuevo más tarde.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  useEffect(() => {
    localStorage.setItem('votedFeatureRequests', JSON.stringify(Array.from(votedIds)));
  }, [votedIds]);

  const handleVote = async (id: string) => {
    if (votedIds.has(id)) return;

    try {
      const updatedRequest = await voteForFeatureRequest(id);
      setRequests((prevRequests) =>
        prevRequests.map((req) => (req.id === id ? updatedRequest : req)).sort((a, b) => b.votes - a.votes)
      );
      setVotedIds((prevVotedIds) => new Set(prevVotedIds).add(id));
    } catch (err) {
      alert('Error al votar. Por favor, inténtalo de nuevo.');
    }
  };

  const handleSubmit = async (title: string, description: string) => {
    try {
      await addFeatureRequest(title, description);
      setShowForm(false);
      fetchRequests(); // Re-fetch to see the new request
    } catch (err) {
      alert('Error al enviar la sugerencia. Por favor, inténtalo de nuevo.');
    }
  };

  return (
    <div className="relative">
      <div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-primary/10 rounded-2xl blur-xl"></div>
      <div className="relative bg-gradient-to-br from-surface/80 via-card/80 to-surface/80 backdrop-blur-xl rounded-2xl p-8 shadow-2xl border border-borderLight/50">
        {/* Header de la sección */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-accent to-accentDark rounded-2xl flex items-center justify-center shadow-lg transform rotate-6 hover:rotate-0 transition-transform duration-300">
              <svg className="w-6 h-6 text-textInverse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
          </div>
          <h2 className="text-2xl font-black bg-gradient-to-r from-text via-accent to-primary bg-clip-text text-transparent mb-2">
            Solicitudes de Funcionalidades
          </h2>
          <p className="text-textMuted text-sm">Comparte tus ideas y vota por las mejores propuestas</p>
        </div>
        
        {error && (
          <div className="relative mb-6">
            <div className="absolute inset-0 bg-gradient-to-r from-error/20 to-error/10 rounded-xl blur"></div>
            <div className="relative bg-gradient-to-r from-error/10 to-error/5 backdrop-blur-sm border border-error/30 text-error p-4 rounded-xl shadow-lg">
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="font-medium">{error}</span>
              </div>
            </div>
          </div>
        )}
        
        <div className="mb-8">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent rounded-xl blur opacity-30"></div>
            <button
              onClick={() => setShowForm(!showForm)}
              className="relative w-full bg-gradient-to-r from-primary/90 to-accent/90 hover:from-primary hover:to-accent text-textInverse font-bold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 hover:rotate-1 backdrop-blur-sm"
            >
              <div className="flex items-center justify-center">
                <svg className={`w-5 h-5 mr-3 transition-transform duration-300 ${showForm ? 'rotate-45' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                {showForm ? 'Cancelar Solicitud' : 'Sugerir Nueva Funcionalidad'}
              </div>
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-white/0 to-white/20 opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
            </button>
          </div>
        </div>
        
        {showForm && (
          <div className="mb-8">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-backgroundSecondary/50 to-surface/50 rounded-xl blur"></div>
              <div className="relative bg-gradient-to-br from-backgroundSecondary/80 to-surface/80 backdrop-blur-sm rounded-xl p-6 border border-borderLight/30 shadow-lg">
                <FeatureRequestForm onSubmit={handleSubmit} />
              </div>
            </div>
          </div>
        )}
        
        {loading ? (
          <div className="text-center py-12">
            <div className="relative inline-block">
              <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin mx-auto mb-4"></div>
              <div className="absolute inset-0 w-12 h-12 border-4 border-transparent border-r-accent rounded-full animate-spin mx-auto" style={{animationDirection: 'reverse', animationDuration: '1.5s'}}></div>
            </div>
            <p className="text-textMuted font-medium">Cargando solicitudes...</p>
          </div>
        ) : (
          <div className="space-y-4">
            <FeatureRequestList 
              requests={requests} 
              onVote={handleVote} 
              votedIds={votedIds}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default FeatureRequestSection;
