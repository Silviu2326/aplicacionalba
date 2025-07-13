import React, { useState } from 'react';
import { Button } from '../../../components/Button';

interface FeatureRequestFormProps {
  onSubmit: (title: string, description: string) => Promise<void>;
}

const FeatureRequestForm: React.FC<FeatureRequestFormProps> = ({ onSubmit }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) {
      alert('Por favor, completa todos los campos.');
      return;
    }
    setIsSubmitting(true);
    await onSubmit(title, description);
    setTitle('');
    setDescription('');
    setIsSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-xl font-black bg-gradient-to-r from-text via-accent to-primary bg-clip-text text-transparent mb-2">
          Sugerir Nueva Funcionalidad
        </h3>
        <p className="text-textMuted text-sm">Comparte tu idea para mejorar la plataforma</p>
      </div>
      
      <div className="space-y-6">
        <div className="space-y-2">
          <label htmlFor="title" className="block text-sm font-bold text-text mb-2 flex items-center">
            <span className="mr-2">💡</span>
            Título de la funcionalidad
          </label>
          <div className="relative">
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border-2 border-borderLight bg-gradient-to-r from-backgroundSecondary to-surface text-text placeholder-textMuted focus:outline-none focus:ring-4 focus:ring-accent/20 focus:border-accent transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
              placeholder="Ej: Recordatorios automáticos de citas"
              required
            />
            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-accent/0 to-accent/0 hover:from-accent/5 hover:to-primary/5 transition-all duration-300 pointer-events-none"></div>
          </div>
        </div>
        
        <div className="space-y-2">
          <label htmlFor="description" className="block text-sm font-bold text-text mb-2 flex items-center">
            <span className="mr-2">📝</span>
            Descripción detallada
          </label>
          <div className="relative">
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              className="w-full px-4 py-3 rounded-xl border-2 border-borderLight bg-gradient-to-r from-backgroundSecondary to-surface text-text placeholder-textMuted focus:outline-none focus:ring-4 focus:ring-accent/20 focus:border-accent transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-[1.02] resize-none"
              placeholder="Describe cómo funcionaría esta funcionalidad y por qué sería útil..."
              required
            />
            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-accent/0 to-accent/0 hover:from-accent/5 hover:to-primary/5 transition-all duration-300 pointer-events-none"></div>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 pt-4">
          <button
            type="button"
            onClick={() => {
              setTitle('');
              setDescription('');
            }}
            className="flex-1 bg-gradient-to-r from-backgroundSecondary to-surface hover:from-surface hover:to-backgroundSecondary text-textSecondary hover:text-text font-bold py-3 px-6 rounded-xl border-2 border-borderLight hover:border-border transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            <div className="flex items-center justify-center">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              Limpiar
            </div>
          </button>
          
          <div className="flex-1 relative">
            <div className="absolute inset-0 bg-gradient-to-r from-accent to-primary rounded-xl blur opacity-30"></div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="relative w-full bg-gradient-to-r from-accent/90 to-primary/90 hover:from-accent hover:to-primary text-textInverse font-bold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 hover:-rotate-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none backdrop-blur-sm"
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center">
                  <div className="w-4 h-4 border-2 border-textInverse/20 border-t-textInverse rounded-full animate-spin mr-3"></div>
                  Enviando...
                </div>
              ) : (
                <div className="flex items-center justify-center">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                  Enviar Sugerencia
                </div>
              )}
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-white/0 to-white/20 opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default FeatureRequestForm;
