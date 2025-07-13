import React, { useState } from 'react';
import { Button } from '../../../components/Button';

interface AddPaymentMethodFormProps {
  onAdd: (newMethod: any) => void;
  onCancel: () => void;
}

const AddPaymentMethodForm: React.FC<AddPaymentMethodFormProps> = ({ onAdd, onCancel }) => {
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvc, setCvc] = useState('');
  const [isDefault, setIsDefault] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí se integraría con Stripe Elements o similar
    const newMethod = {
      id: `card_${new Date().getTime()}`,
      type: 'VISA', // Simulado
      last4: cardNumber.slice(-4),
      expDate: expiryDate,
      isDefault: isDefault,
    };
    onAdd(newMethod);
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 bg-backgroundSecondary rounded-lg shadow-lg">
      <h3 className="text-xl font-bold text-text mb-4">Añadir Nuevo Método de Pago</h3>
      <div className="space-y-4">
        <div>
          <label htmlFor="cardNumber" className="block text-sm font-medium text-textSecondary">
            Número de Tarjeta
          </label>
          <input
            type="text"
            id="cardNumber"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
            className="mt-1 block w-full bg-surface border border-border rounded-md shadow-sm py-2 px-3 text-text focus:outline-none focus:ring-primary focus:border-primary"
            placeholder="**** **** **** ****"
            required
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="expiryDate" className="block text-sm font-medium text-textSecondary">
              Fecha de Caducidad
            </label>
            <input
              type="text"
              id="expiryDate"
              value={expiryDate}
              onChange={(e) => setExpiryDate(e.target.value)}
              className="mt-1 block w-full bg-surface border border-border rounded-md shadow-sm py-2 px-3 text-text focus:outline-none focus:ring-primary focus:border-primary"
              placeholder="MM/YY"
              required
            />
          </div>
          <div>
            <label htmlFor="cvc" className="block text-sm font-medium text-textSecondary">
              CVC
            </label>
            <input
              type="text"
              id="cvc"
              value={cvc}
              onChange={(e) => setCvc(e.target.value)}
              className="mt-1 block w-full bg-surface border border-border rounded-md shadow-sm py-2 px-3 text-text focus:outline-none focus:ring-primary focus:border-primary"
              placeholder="***"
              required
            />
          </div>
        </div>
        <div className="flex items-center">
          <input
            id="isDefault"
            type="checkbox"
            checked={isDefault}
            onChange={(e) => setIsDefault(e.target.checked)}
            className="h-4 w-4 text-primary bg-surface border-border rounded focus:ring-primary"
          />
          <label htmlFor="isDefault" className="ml-2 block text-sm text-textSecondary">
            Marcar como método de pago predeterminado
          </label>
        </div>
      </div>
      <div className="mt-6 flex justify-end space-x-4">
        <Button onClick={onCancel} variant="secondary">
          Cancelar
        </Button>
        <Button type="submit" variant="primary">
          Añadir Método
        </Button>
      </div>
    </form>
  );
};

export default AddPaymentMethodForm;
