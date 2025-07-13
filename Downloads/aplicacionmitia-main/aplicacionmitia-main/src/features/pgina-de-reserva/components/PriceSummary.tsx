import React from 'react';

interface PriceDetails {
  basePrice: number;
  serviceFee: number;
  discount?: number;
}

interface PriceSummaryProps {
  priceDetails: PriceDetails;
}

const PriceSummary: React.FC<PriceSummaryProps> = ({ priceDetails }) => {
  const { basePrice, serviceFee, discount = 0 } = priceDetails;
  const total = basePrice + serviceFee - discount;

  return (
    <div className="bg-gradient-surface p-6 rounded-xl border border-border shadow-lg">
      <div className="flex items-center space-x-3 mb-6">
        <div className="p-2 bg-primary/10 rounded-lg">
          <svg className="w-6 h-6 text-primary" fill="currentColor" viewBox="0 0 20 20">
            <path d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-text">Resumen de precios</h3>
      </div>
      
      <div className="space-y-4">
        <div className="flex justify-between items-center py-2">
          <div className="flex items-center space-x-2">
            <svg className="w-4 h-4 text-textMuted" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span className="text-textSecondary">Precio base</span>
          </div>
          <span className="text-text font-semibold">${basePrice.toFixed(2)}</span>
        </div>
        
        <div className="flex justify-between items-center py-2">
          <div className="flex items-center space-x-2">
            <svg className="w-4 h-4 text-textMuted" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clipRule="evenodd" />
            </svg>
            <span className="text-textSecondary">Tarifa de servicio</span>
          </div>
          <span className="text-text font-semibold">${serviceFee.toFixed(2)}</span>
        </div>
        
        {discount > 0 && (
          <div className="flex justify-between items-center py-2 bg-success/5 -mx-2 px-2 rounded-lg">
            <div className="flex items-center space-x-2">
              <svg className="w-4 h-4 text-success" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
              </svg>
              <span className="text-success font-medium">Descuento aplicado</span>
            </div>
            <span className="text-success font-bold">-${discount.toFixed(2)}</span>
          </div>
        )}
        
        <div className="border-t border-border pt-4 mt-4">
          <div className="flex justify-between items-center bg-gradient-primary p-4 rounded-lg">
            <div className="flex items-center space-x-2">
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
              <span className="text-xl font-bold text-white">Total a pagar</span>
            </div>
            <span className="text-2xl font-bold text-white">${total.toFixed(2)}</span>
          </div>
        </div>
        
        <div className="text-center mt-4">
          <p className="text-xs text-textMuted">
            Los precios incluyen impuestos aplicables
          </p>
        </div>
      </div>
    </div>
  );
};

export default PriceSummary;