import React, { useState } from 'react';
import { Button } from '../../../../components/Button';

const PromoCodeInput = ({ onApply }) => {
  const [promoCode, setPromoCode] = useState('');

  const handleApplyClick = () => {
    if (promoCode.trim()) {
      onApply(promoCode);
    }
  };

  return (
    <div className="mt-6">
      <label htmlFor="promo-code" className="block text-sm font-medium text-textSecondary mb-2">
        ¿Tienes un código de descuento?
      </label>
      <div className="flex space-x-2">
        <input
          type="text"
          id="promo-code"
          value={promoCode}
          onChange={(e) => setPromoCode(e.target.value)}
          placeholder="Introduce tu código"
          className="flex-grow block w-full px-4 py-2 bg-surface border border-border rounded-md shadow-sm placeholder-textMuted focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
        />
        <Button
          onClick={handleApplyClick}
          disabled={!promoCode.trim()}
          variant="secondary"
        >
          Aplicar
        </Button>
      </div>
    </div>
  );
};

export default PromoCodeInput;
