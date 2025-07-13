import React from 'react';

interface PriceBreakdownProps {
  subtotal: number;
  discount: number;
  total: number;
}

const PriceBreakdown: React.FC<PriceBreakdownProps> = ({ subtotal, discount, total }) => {
  return (
    <div className="w-full max-w-md p-4 bg-surface shadow-md rounded-lg border border-border">
      <h2 className="text-lg font-semibold mb-4 text-text">Resumen de Precios</h2>
      <div className="space-y-2">
        <div className="flex justify-between text-textSecondary">
          <span>Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        {discount > 0 && (
          <div className="flex justify-between text-success">
            <span>Descuento</span>
            <span>-${discount.toFixed(2)}</span>
          </div>
        )}
        <div className="flex justify-between font-bold text-xl text-text">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};

export default PriceBreakdown;