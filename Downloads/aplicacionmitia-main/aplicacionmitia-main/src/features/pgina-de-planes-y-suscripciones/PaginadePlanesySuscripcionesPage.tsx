// src/features/pgina-de-planes-y-suscripciones/PaginadePlanesySuscripcionesPage.tsx
import React, { useState } from 'react';
import { usePaginadePlanesySuscripciones } from './hooks/usePaginadePlanesySuscripciones';
import { AddonSelector } from './components/AddonSelector';
import { PriceSummary } from './components/PriceSummary';
import { Plan } from './types';
import PromoCountdownBanner from './components/PromoCountdownBanner';
import FaqAccordion from './components/FaqAccordion';
import { useFaqs } from './hooks/useFaqs';

// Modernized PlanCard component with enhanced design
const PlanCard = ({ plan, onSelect, isSelected, billingCycle }: { plan: Plan, onSelect: (plan: Plan) => void, isSelected: boolean, billingCycle: 'monthly' | 'annually' }) => {
  const isRecommended = plan.isRecommended;
  
  return (
    <div className={`relative border rounded-2xl p-8 flex flex-col bg-gradient-surface shadow-xl transition-all duration-500 hover:scale-105 hover:shadow-2xl group ${
      isSelected 
        ? 'border-primary ring-4 ring-primary/20 shadow-primary/25' 
        : isRecommended 
        ? 'border-accent ring-2 ring-accent/30 shadow-accent/20' 
        : 'border-borderLight hover:border-primary/50'
    }`}>
      {isRecommended && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
          <div className="bg-gradient-secondary text-textInverse px-6 py-2 rounded-full text-sm font-bold shadow-lg animate-pulse">
            ✨ Más Popular
          </div>
        </div>
      )}
      
      <div className="text-center mb-6">
        <h3 className="text-3xl font-bold mb-2 text-text group-hover:text-primary transition-colors duration-300">
          {plan.name}
        </h3>
        <div className="flex items-baseline justify-center">
          <span className="text-5xl font-extrabold bg-gradient-primary bg-clip-text text-transparent">
            ${billingCycle === 'monthly' ? plan.price.monthly : plan.price.annually}
          </span>
          <span className="text-lg text-textMuted ml-2">
            /{billingCycle === 'monthly' ? 'mes' : 'año'}
          </span>
        </div>
        {billingCycle === 'annually' && (
          <div className="mt-2">
            <span className="inline-block bg-success/20 text-success px-3 py-1 rounded-full text-sm font-semibold">
              Ahorra 20%
            </span>
          </div>
        )}
      </div>
      
      <ul className="space-y-4 mb-8 flex-grow">
        {plan.features.map((feature, index) => (
          <li key={index} className="flex items-center group/item">
            <div className={`w-6 h-6 mr-3 rounded-full flex items-center justify-center ${
              feature.included ? 'bg-success/20' : 'bg-muted/20'
            }`}>
              <svg
                className={`w-4 h-4 ${feature.included ? 'text-success' : 'text-muted'}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d={feature.included ? 'M5 13l4 4L19 7' : 'M6 18L18 6M6 6l12 12'}
                />
              </svg>
            </div>
            <span className={`${feature.included ? 'text-text' : 'text-textMuted line-through'} group-hover/item:text-primary transition-colors duration-200`}>
              {feature.name}
            </span>
          </li>
        ))}
      </ul>
      
      <button 
        onClick={() => onSelect(plan)} 
        className={`w-full py-4 px-6 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 ${
          isSelected 
            ? 'bg-gradient-secondary text-textInverse shadow-lg ring-secondary/30' 
            : isRecommended
            ? 'bg-gradient-primary text-textInverse shadow-lg hover:shadow-xl ring-primary/30'
            : 'bg-surface border-2 border-primary text-primary hover:bg-primary hover:text-textInverse shadow-md'
        }`}
      >
        {isSelected ? '✓ Seleccionado' : isRecommended ? '🚀 Comenzar Ahora' : 'Seleccionar Plan'}
      </button>
    </div>
  );
};

// Billing cycle toggle component
const BillingCycleToggle = ({ billingCycle, setBillingCycle }: { billingCycle: 'monthly' | 'annually', setBillingCycle: (cycle: 'monthly' | 'annually') => void }) => (
  <div className="flex items-center justify-center mb-12">
    <div className="bg-surface rounded-2xl p-2 shadow-lg border border-borderLight">
      <div className="flex items-center space-x-1">
        <button
          onClick={() => setBillingCycle('monthly')}
          className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
            billingCycle === 'monthly'
              ? 'bg-primary text-textInverse shadow-lg'
              : 'text-textSecondary hover:text-text'
          }`}
        >
          Mensual
        </button>
        <button
          onClick={() => setBillingCycle('annually')}
          className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 relative ${
            billingCycle === 'annually'
              ? 'bg-primary text-textInverse shadow-lg'
              : 'text-textSecondary hover:text-text'
          }`}
        >
          Anual
          <span className="absolute -top-2 -right-2 bg-success text-textInverse text-xs px-2 py-1 rounded-full">
            -20%
          </span>
        </button>
      </div>
    </div>
  </div>
);


const PaginadePlanesySuscripcionesPage = () => {
  const {
    plans,
    selectedPlan,
    selectedAddons,
    billingCycle,
    availableAddons,
    handlePlanSelect,
    handleAddonToggle,
    setBillingCycle,
  } = usePaginadePlanesySuscripciones();

  const { faqs, loading: faqsLoading, error: faqsError } = useFaqs('plans');

  // Mock promotion data
  const promotion = {
    endDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString(), // 15 days from now
    title: '¡Oferta Especial de Verano!',
    discount: '¡Suscríbete ahora y obtén un 20% de descuento en tu primer año!',
  };

  return (
    <div className="bg-background text-text min-h-screen">
      {/* Hero Section with Gradient Background */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-primary opacity-10"></div>
        <div className="relative px-8 py-20">
          <header className="text-center max-w-5xl mx-auto">
            <div className="mb-6">
              <span className="inline-block bg-primary/20 text-primary px-4 py-2 rounded-full text-sm font-semibold mb-4">
                💼 Para Profesionales de la Salud Mental
              </span>
            </div>
            <h1 className="text-6xl md:text-7xl font-extrabold tracking-tight mb-6">
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                Planes Flexibles
              </span>
              <br />
              <span className="text-text">para Cada Profesional</span>
            </h1>
            <p className="text-xl md:text-2xl text-textSecondary max-w-4xl mx-auto leading-relaxed">
              Elige el plan que mejor se adapte a tu consulta y comienza a conectar con pacientes hoy mismo.
              <span className="block mt-2 text-lg text-accent font-semibold">✨ Sin compromisos a largo plazo</span>
            </p>
          </header>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        {/* Promotion Banner */}
        {promotion && (
          <div className="-mt-10 mb-16 relative z-10">
            <PromoCountdownBanner
              endDate={promotion.endDate}
              title={promotion.title}
              discount={promotion.discount}
            />
          </div>
        )}

        {/* Billing Cycle Toggle */}
        <BillingCycleToggle billingCycle={billingCycle} setBillingCycle={setBillingCycle} />

        {/* Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {plans.map((plan) => (
            <PlanCard 
                key={plan.id} 
                plan={plan} 
                onSelect={handlePlanSelect} 
                isSelected={selectedPlan?.id === plan.id}
                billingCycle={billingCycle}
            />
          ))}
        </div>

        {/* Selected Plan Details */}
        {selectedPlan && (
          <div className="bg-gradient-surface rounded-3xl p-8 shadow-2xl border border-borderLight mb-20">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-text mb-4">
                Personaliza tu Plan <span className="text-primary">{selectedPlan.name}</span>
              </h2>
              <p className="text-textSecondary text-lg">
                Añade funcionalidades adicionales para potenciar tu práctica profesional
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="space-y-8">
                <AddonSelector
                  addons={availableAddons}
                  selectedAddons={selectedAddons}
                  onAddonToggle={handleAddonToggle}
                />
              </div>
              <div className="lg:sticky lg:top-8">
                <PriceSummary 
                    selectedPlan={selectedPlan}
                    selectedAddons={selectedAddons}
                />
              </div>
            </div>
          </div>
        )}

        {/* FAQ Section */}
        <section className="bg-surface rounded-3xl p-8 shadow-xl border border-borderLight">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-text mb-4">Preguntas Frecuentes</h2>
            <p className="text-textSecondary text-lg">
              Resolvemos tus dudas sobre nuestros planes y servicios
            </p>
          </div>
          
          {faqsLoading && (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
              <span className="ml-4 text-textSecondary">Cargando preguntas frecuentes...</span>
            </div>
          )}
          
          {faqsError && (
            <div className="bg-error/10 border border-error/30 text-error p-6 rounded-xl text-center">
              <p className="font-semibold">Error al cargar las preguntas frecuentes</p>
              <p className="text-sm mt-2">{faqsError}</p>
            </div>
          )}
          
          {faqs.length > 0 && <FaqAccordion items={faqs} />}
        </section>
      </main>
    </div>
  );
};

export default PaginadePlanesySuscripcionesPage;

