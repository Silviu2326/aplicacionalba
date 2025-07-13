import React from 'react';

interface SavedPaymentMethod {
  id: string;
  card: {
    brand: string;
    last4: string;
  };
}

interface SavedPaymentMethodSelectorProps {
  savedMethods: SavedPaymentMethod[];
  onSelectMethod: (methodId: string | null) => void;
  onDeleteMethod: (methodId: string) => void;
}

export const SavedPaymentMethodSelector: React.FC<SavedPaymentMethodSelectorProps> = ({
  savedMethods,
  onSelectMethod,
  onDeleteMethod,
}) => {
  const [selectedMethod, setSelectedMethod] = React.useState<string | null>(savedMethods.length > 0 ? savedMethods[0].id : null);

  const handleSelectionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const methodId = event.target.value;
    setSelectedMethod(methodId);
    onSelectMethod(methodId === 'new' ? null : methodId);
  };

  return (
    <div className="bg-surface p-6 rounded-lg shadow-md border border-border">
      <h3 className="text-lg font-semibold mb-4 text-text">Elige un método de pago</h3>
      <div className="space-y-4">
        {savedMethods.map((method) => (
          <div key={method.id} className="flex items-center justify-between p-4 border border-border rounded-md bg-backgroundSecondary">
            <div className="flex items-center">
              <input
                id={`method-${method.id}`}
                type="radio"
                name="paymentMethod"
                value={method.id}
                checked={selectedMethod === method.id}
                onChange={handleSelectionChange}
                className="h-4 w-4 text-primary border-border focus:ring-primary"
              />
              <label htmlFor={`method-${method.id}`} className="ml-3 block text-sm font-medium text-text">
                <span className="font-semibold">{method.card.brand}</span> terminada en {method.card.last4}
              </label>
            </div>
            <button
              onClick={() => onDeleteMethod(method.id)}
              className="text-sm font-medium text-error hover:text-errorHover"
            >
              Eliminar
            </button>
          </div>
        ))}
        <div className="flex items-center p-4 border border-border rounded-md bg-backgroundSecondary">
          <input
            id="new-method"
            type="radio"
            name="paymentMethod"
            value="new"
            checked={selectedMethod === 'new'}
            onChange={handleSelectionChange}
            className="h-4 w-4 text-primary border-border focus:ring-primary"
          />
          <label htmlFor="new-method" className="ml-3 block text-sm font-medium text-text">
            Usar una nueva tarjeta
          </label>
        </div>
      </div>
    </div>
  );
};