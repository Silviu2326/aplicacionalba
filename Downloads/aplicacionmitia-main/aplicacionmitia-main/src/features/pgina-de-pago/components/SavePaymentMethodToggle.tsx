// src/features/pgina-de-pago/components/SavePaymentMethodToggle.tsx
import React from 'react';

interface SavePaymentMethodToggleProps {
  saveCard: boolean;
  setSaveCard: (value: boolean) => void;
}

const SavePaymentMethodToggle: React.FC<SavePaymentMethodToggleProps> = ({ saveCard, setSaveCard }) => {
  return (
    <div className="my-4">
      <label className="flex items-center text-textSecondary">
        <input
          type="checkbox"
          checked={saveCard}
          onChange={(e) => setSaveCard(e.target.checked)}
          className="h-4 w-4 rounded border-border bg-surface text-primary focus:ring-primary"
        />
        <span className="ml-2">Guardar método de pago para futuras compras</span>
      </label>
      <p className="text-sm text-textMuted mt-1 ml-6">
        Tus datos son procesados por Stripe de forma segura.
      </p>
    </div>
  );
};

export default SavePaymentMethodToggle;
