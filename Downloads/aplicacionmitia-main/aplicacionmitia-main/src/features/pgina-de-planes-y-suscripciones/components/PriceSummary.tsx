// src/features/pgina-de-planes-y-suscripciones/components/PriceSummary.tsx
import { Plan, Addon } from '../types';
import { useState } from 'react';

interface PriceSummaryProps {
  selectedPlan: Plan | null;
  selectedAddons: Addon[];
}

export function PriceSummary({ selectedPlan, selectedAddons }: PriceSummaryProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  
  if (!selectedPlan) {
    return null;
  }

  const addonsTotal = selectedAddons.reduce((total, addon) => total + addon.price, 0);
  const planPrice = selectedPlan.price.monthly || selectedPlan.price;
  const subtotal = planPrice + addonsTotal;
  const discount = 0; // Could be calculated based on promotions
  const total = subtotal - discount;

  const handleProceedToPayment = () => {
    setIsProcessing(true);
    // Simulate processing
    setTimeout(() => {
      setIsProcessing(false);
      // Navigate to payment page
      console.log('Proceeding to payment...');
    }, 2000);
  };

  return (
    <div className="sticky top-8">
      <div className="bg-gradient-surface border-2 border-borderLight rounded-3xl p-8 shadow-2xl">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-textInverse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-3xl font-bold text-text mb-2">Resumen de Suscripción</h3>
          <p className="text-textSecondary">Tu plan personalizado está listo</p>
        </div>
        
        <div className="space-y-6">
          {/* Plan Base */}
          <div className="bg-card/50 rounded-2xl p-6 border border-borderLight">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-primary rounded-full mr-3"></div>
                <span className="font-bold text-text text-lg">Plan {selectedPlan.name}</span>
              </div>
              <span className="text-2xl font-bold text-text">${planPrice}</span>
            </div>
            <p className="text-textSecondary text-sm">Facturación mensual • Cancela cuando quieras</p>
          </div>

          {/* Add-ons */}
          {selectedAddons.length > 0 && (
            <div className="bg-card/50 rounded-2xl p-6 border border-borderLight">
              <h4 className="font-bold text-text text-lg mb-4 flex items-center">
                <div className="w-3 h-3 bg-accent rounded-full mr-3"></div>
                Add-ons Seleccionados
              </h4>
              <div className="space-y-3">
                {selectedAddons.map(addon => (
                  <div key={addon.id} className="flex justify-between items-center">
                    <span className="text-textSecondary">{addon.name}</span>
                    <span className="font-semibold text-text">+${addon.price}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Pricing Breakdown */}
          <div className="border-t border-borderLight pt-6">
            <div className="space-y-3">
              <div className="flex justify-between text-textSecondary">
                <span>Subtotal</span>
                <span>${subtotal}/mes</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-success">
                  <span>Descuento</span>
                  <span>-${discount}/mes</span>
                </div>
              )}
              <div className="border-t border-borderLight pt-3">
                <div className="flex justify-between items-center">
                  <span className="text-xl font-bold text-text">Total</span>
                  <div className="text-right">
                    <span className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                      ${total}
                    </span>
                    <span className="text-textMuted text-lg">/mes</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Benefits Summary */}
          <div className="bg-success/10 border border-success/30 rounded-2xl p-6">
            <h4 className="font-bold text-success text-lg mb-3 flex items-center">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Lo que incluye tu plan:
            </h4>
            <ul className="space-y-2 text-success/80 text-sm">
              <li className="flex items-center">
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Prueba gratuita de 14 días
              </li>
              <li className="flex items-center">
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Cancela en cualquier momento
              </li>
              <li className="flex items-center">
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Soporte 24/7
              </li>
            </ul>
          </div>

          {/* CTA Button */}
          <button 
            onClick={handleProceedToPayment}
            disabled={isProcessing}
            className="w-full bg-gradient-primary hover:shadow-xl text-textInverse font-bold py-4 px-6 rounded-2xl transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-primary/30 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            {isProcessing ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-textInverse mr-3"></div>
                Procesando...
              </div>
            ) : (
              <div className="flex items-center justify-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                Proceder al Pago Seguro
              </div>
            )}
          </button>
          
          <p className="text-xs text-textMuted text-center mt-4">
            🔒 Pago 100% seguro • SSL encriptado • Sin compromisos
          </p>
        </div>
      </div>
    </div>
  );
};