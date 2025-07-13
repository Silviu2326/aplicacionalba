import React, { useState, useEffect, useCallback } from 'react';
import { Button } from '../../../components/Button';
import SuggestedCategories from './SuggestedCategories';
import { suggestCategory } from '../api';
import { debounce } from 'lodash';

interface SupportContactFormProps {
  initialData: {
    name: string;
    email: string;
    subject: string;
    message: string;
    category: string;
  };
}

export const SupportContactForm: React.FC<SupportContactFormProps> = ({ initialData }) => {
  const [formData, setFormData] = useState(initialData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [suggestedCategories, setSuggestedCategories] = useState<string[]>([]);

  const debouncedSuggestCategory = useCallback(
    debounce(async (description: string) => {
      if (description.trim().length > 2) {
        const suggestions = await suggestCategory(description);
        setSuggestedCategories(suggestions);
      } else {
        setSuggestedCategories([]);
      }
    }, 500),
    []
  );

  useEffect(() => {
    debouncedSuggestCategory(formData.message);
    return () => {
      debouncedSuggestCategory.cancel();
    };
  }, [formData.message, debouncedSuggestCategory]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectCategory = (category: string) => {
    setFormData((prev) => ({ ...prev, category }));
    setSuggestedCategories([]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    alert('Mensaje enviado con éxito');
    setIsSubmitting(false);
  };

  return (
    <div className="relative">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl blur-xl"></div>
      <form onSubmit={handleSubmit} className="relative bg-gradient-to-br from-surface/80 via-card/80 to-surface/80 backdrop-blur-xl rounded-2xl p-8 shadow-2xl border border-borderLight/50 space-y-6">
        {/* Header del formulario */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-primary to-primaryDark rounded-2xl flex items-center justify-center shadow-lg transform rotate-3 hover:rotate-0 transition-transform duration-300">
              <svg className="w-6 h-6 text-textInverse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
          </div>
          <h2 className="text-2xl font-black bg-gradient-to-r from-text via-primary to-secondary bg-clip-text text-transparent mb-2">
            Contactar con Soporte
          </h2>
          <p className="text-textMuted text-sm">Completa el formulario y te responderemos pronto</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label htmlFor="name" className="block text-sm font-bold text-text mb-2 flex items-center">
              <span className="mr-2">👤</span>
              Nombre
            </label>
            <div className="relative">
              <input 
                type="text" 
                name="name" 
                id="name" 
                value={formData.name} 
                onChange={handleChange} 
                className="w-full px-4 py-3 rounded-xl border-2 border-borderLight bg-gradient-to-r from-backgroundSecondary to-surface text-text placeholder-textMuted focus:outline-none focus:ring-4 focus:ring-primary/20 focus:border-primary transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-[1.02]" 
                placeholder="Tu nombre completo"
                required 
              />
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary/0 to-primary/0 hover:from-primary/5 hover:to-secondary/5 transition-all duration-300 pointer-events-none"></div>
            </div>
          </div>
          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-bold text-text mb-2 flex items-center">
              <span className="mr-2">📧</span>
              Email
            </label>
            <div className="relative">
              <input 
                type="email" 
                name="email" 
                id="email" 
                value={formData.email} 
                onChange={handleChange} 
                className="w-full px-4 py-3 rounded-xl border-2 border-borderLight bg-gradient-to-r from-backgroundSecondary to-surface text-text placeholder-textMuted focus:outline-none focus:ring-4 focus:ring-primary/20 focus:border-primary transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-[1.02]" 
                placeholder="tu@email.com"
                required 
              />
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary/0 to-primary/0 hover:from-primary/5 hover:to-secondary/5 transition-all duration-300 pointer-events-none"></div>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="subject" className="block text-sm font-bold text-text mb-2 flex items-center">
            <span className="mr-2">📝</span>
            Asunto
          </label>
          <div className="relative">
            <input 
              type="text" 
              name="subject" 
              id="subject" 
              value={formData.subject} 
              onChange={handleChange} 
              className="w-full px-4 py-3 rounded-xl border-2 border-borderLight bg-gradient-to-r from-backgroundSecondary to-surface text-text placeholder-textMuted focus:outline-none focus:ring-4 focus:ring-primary/20 focus:border-primary transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-[1.02]" 
              placeholder="Describe brevemente tu consulta"
              required 
            />
            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary/0 to-primary/0 hover:from-primary/5 hover:to-secondary/5 transition-all duration-300 pointer-events-none"></div>
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="category" className="block text-sm font-bold text-text mb-2 flex items-center">
            <span className="mr-2">🏷️</span>
            Categoría
          </label>
          <div className="relative">
            <select 
              name="category" 
              id="category" 
              value={formData.category} 
              onChange={handleChange} 
              className="w-full px-4 py-3 rounded-xl border-2 border-borderLight bg-gradient-to-r from-backgroundSecondary to-surface text-text focus:outline-none focus:ring-4 focus:ring-primary/20 focus:border-primary transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-[1.02]" 
              required
            >
              <option value="">Selecciona una categoría</option>
              <option value="Facturación">💳 Facturación</option>
              <option value="Problema técnico">🔧 Problema técnico</option>
              <option value="Perfil profesional">👨‍⚕️ Perfil profesional</option>
              <option value="General">💬 General</option>
              <option value="Cuenta">👤 Cuenta</option>
            </select>
            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary/0 to-primary/0 hover:from-primary/5 hover:to-secondary/5 transition-all duration-300 pointer-events-none"></div>
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="message" className="block text-sm font-bold text-text mb-2 flex items-center">
            <span className="mr-2">💭</span>
            Descripción
          </label>
          <div className="relative">
            <textarea 
              name="message" 
              id="message" 
              value={formData.message} 
              onChange={handleChange} 
              rows={5} 
              className="w-full px-4 py-3 rounded-xl border-2 border-borderLight bg-gradient-to-r from-backgroundSecondary to-surface text-text placeholder-textMuted focus:outline-none focus:ring-4 focus:ring-primary/20 focus:border-primary transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-[1.02] resize-none" 
              placeholder="Describe tu consulta con el mayor detalle posible..."
              required
            ></textarea>
            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary/0 to-primary/0 hover:from-primary/5 hover:to-secondary/5 transition-all duration-300 pointer-events-none"></div>
          </div>
          <SuggestedCategories categories={suggestedCategories} onSelectCategory={handleSelectCategory} />
        </div>

        <div className="pt-4">
          <Button 
            type="submit" 
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-primary to-primaryDark hover:from-primaryDark hover:to-primary text-textInverse font-bold py-4 px-8 rounded-xl shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105 hover:-rotate-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            {isSubmitting ? (
              <div className="flex items-center justify-center">
                <div className="w-5 h-5 border-2 border-textInverse/20 border-t-textInverse rounded-full animate-spin mr-3"></div>
                Enviando...
              </div>
            ) : (
              <div className="flex items-center justify-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
                Enviar Mensaje
              </div>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};