import React from 'react';
import { usePaginadeSoporteAyuda } from './hooks/usePaginadeSoporteAyuda';
import { SupportContactForm } from './components/SupportContactForm';
import FeatureRequestSection from './components/FeatureRequestSection';
import ContextualFAQ from './components/ContextualFAQ';
import FaqAccordion from '../pgina-de-planes-y-suscripciones/components/FaqAccordion';
import SystemStatusWidget from './components/SystemStatusWidget';

export const PaginadeSoporteAyudaPage: React.FC = () => {
  const { user, loading, initialData, context, contextualFaqs } = usePaginadeSoporteAyuda();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-backgroundSecondary to-surface text-text relative overflow-hidden">
      {/* Elementos decorativos de fondo */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-gradient-to-r from-accent/10 to-info/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-0 w-64 h-64 bg-gradient-to-r from-success/10 to-warning/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>
      
      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header ultra moderno */}
        <header className="text-center mb-16 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-surface/80 via-card/80 to-surface/80 backdrop-blur-xl rounded-3xl border border-borderLight/50 shadow-2xl"></div>
          <div className="relative z-10 p-12">
            <div className="flex items-center justify-center mb-6">
              <div className="w-20 h-20 bg-gradient-to-br from-primary to-primaryDark rounded-3xl flex items-center justify-center shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-500 mr-6">
                <svg className="w-10 h-10 text-textInverse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <div className="text-left">
                <h1 className="text-5xl font-black bg-gradient-to-r from-text via-primary to-secondary bg-clip-text text-transparent mb-2">
                  Centro de Soporte
                </h1>
                <p className="text-xl text-textSecondary">
                  Estamos aquí para ayudarte en cada paso del camino
                </p>
              </div>
            </div>
            <div className="flex items-center justify-center space-x-6 mt-8">
              <div className="flex items-center space-x-2 bg-success/10 border border-success/20 rounded-full px-4 py-2">
                <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                <span className="text-success text-sm font-medium">Soporte 24/7</span>
              </div>
              <div className="flex items-center space-x-2 bg-info/10 border border-info/20 rounded-full px-4 py-2">
                <div className="w-2 h-2 bg-info rounded-full animate-pulse"></div>
                <span className="text-info text-sm font-medium">Respuesta rápida</span>
              </div>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Columna principal de contenido */}
          <div className="lg:col-span-3 space-y-8">
            {context && contextualFaqs.length > 0 && (
              <div className="transform hover:scale-[1.02] transition-all duration-300">
                <ContextualFAQ faqs={contextualFaqs} context={context} />
              </div>
            )}

            {!context && (
              <section className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-surface/60 to-card/60 backdrop-blur-sm rounded-3xl blur-xl opacity-30 transform scale-105"></div>
                <div className="relative bg-gradient-to-br from-surface/80 via-card/80 to-surface/80 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-borderLight/50">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-3 h-8 bg-gradient-to-b from-accent to-warning rounded-full"></div>
                    <h2 className="text-3xl font-black bg-gradient-to-r from-accent to-warning bg-clip-text text-transparent">
                      Preguntas Frecuentes (FAQ)
                    </h2>
                  </div>
                  <FaqAccordion items={contextualFaqs} />
                </div>
              </section>
            )}
          </div>
          
          {/* Columna lateral */}
          <div className="space-y-6">
            <div className="sticky top-8 space-y-6">
              {loading ? (
                <div className="bg-gradient-to-br from-surface/60 to-card/60 backdrop-blur-xl rounded-2xl p-8 border border-borderLight/30 text-center">
                  <div className="flex items-center justify-center mb-4">
                    <div className="w-8 h-8 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
                  </div>
                  <p className="text-textMuted animate-pulse">Cargando...</p>
                </div>
              ) : (
                <div className="transform hover:scale-[1.02] transition-all duration-300">
                  <SupportContactForm initialData={initialData} />
                </div>
              )}
              
              <div className="transform hover:scale-[1.02] transition-all duration-300">
                <SystemStatusWidget />
              </div>
            </div>
          </div>
        </div>

        {user?.isLoggedIn && (
          <section className="mt-20">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-3xl blur-xl"></div>
              <div className="relative">
                <FeatureRequestSection />
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  );
};
