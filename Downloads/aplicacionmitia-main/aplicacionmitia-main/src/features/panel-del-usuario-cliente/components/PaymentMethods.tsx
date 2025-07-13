import React, { useState } from 'react';
import { Button } from '../../../components/Button';
import AddPaymentMethodForm from './AddPaymentMethodForm';

// Simulación de datos
const initialPaymentMethods = [
  { id: 'card_1', type: 'VISA', last4: '4242', expDate: '12/25', isDefault: true },
  { id: 'card_2', type: 'MasterCard', last4: '5555', expDate: '08/26', isDefault: false },
];

// Simulación de API
const api = {
  getPaymentMethods: async () => {
    return new Promise(resolve => setTimeout(() => resolve(initialPaymentMethods), 500));
  },
  deletePaymentMethod: async (id: string) => {
    console.log(`Deleting payment method ${id}`);
    return new Promise(resolve => setTimeout(() => resolve({ success: true }), 500));
  },
  addPaymentMethod: async (method: any) => {
    console.log('Adding new payment method', method);
    return new Promise(resolve => setTimeout(() => resolve({ success: true, newMethod: method }), 500));
  },
  setDefaultPaymentMethod: async (id: string) => {
    console.log(`Setting ${id} as default`);
    return new Promise(resolve => setTimeout(() => resolve({ success: true }), 500));
  }
};

const PaymentMethods: React.FC = () => {
  const [paymentMethods, setPaymentMethods] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [methodToDelete, setMethodToDelete] = useState<string | null>(null);

  React.useEffect(() => {
    api.getPaymentMethods().then((data: any) => {
      setPaymentMethods(data);
      setIsLoading(false);
    });
  }, []);

  const handleDelete = async (id: string) => {
    await api.deletePaymentMethod(id);
    setPaymentMethods(paymentMethods.filter(p => p.id !== id));
    setMethodToDelete(null);
  };

  const handleAdd = async (newMethod: any) => {
    await api.addPaymentMethod(newMethod);
    setPaymentMethods([...paymentMethods, newMethod]);
    setShowAddForm(false);
  };

  const handleSetDefault = async (id: string) => {
    await api.setDefaultPaymentMethod(id);
    setPaymentMethods(paymentMethods.map(p => ({ ...p, isDefault: p.id === id })));
  };

  if (isLoading) {
    return <div className="text-center p-8 text-textSecondary">Cargando métodos de pago...</div>;
  }

  return (
    <div className="p-4 sm:p-6 bg-backgroundSecondary rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-text">Métodos de Pago</h2>
        {!showAddForm && (
          <Button onClick={() => setShowAddForm(true)} variant="primary">
            Añadir Nuevo Método
          </Button>
        )}
      </div>

      {showAddForm ? (
        <AddPaymentMethodForm onAdd={handleAdd} onCancel={() => setShowAddForm(false)} />
      ) : (
        <div className="space-y-4">
          {paymentMethods.map((method) => (
            <div key={method.id} className="flex items-center justify-between p-4 bg-card rounded-lg border border-border">
              <div>
                <p className="font-semibold text-text">
                  {method.type} terminada en **** {method.last4}
                  {method.isDefault && <span className="ml-2 text-xs font-bold text-primary bg-primaryLight/20 px-2 py-1 rounded-full">Predeterminado</span>}
                </p>
                <p className="text-sm text-textMuted">Caduca: {method.expDate}</p>
              </div>
              <div className="flex items-center space-x-2">
                {!method.isDefault && (
                  <Button onClick={() => handleSetDefault(method.id)} variant="secondary" size="sm">
                    Predeterminado
                  </Button>
                )}
                <Button onClick={() => setMethodToDelete(method.id)} variant="danger" size="sm">
                  Eliminar
                </Button>
              </div>
            </div>
          ))}
          {paymentMethods.length === 0 && (
            <p className="text-textMuted text-center py-4">No tienes métodos de pago guardados.</p>
          )}
        </div>
      )}

      {methodToDelete && (
        <div className="fixed inset-0 bg-overlay flex items-center justify-center z-50">
          <div className="bg-surface p-6 rounded-lg shadow-xl max-w-sm w-full">
            <h3 className="text-lg font-bold text-text">Confirmar Eliminación</h3>
            <p className="text-textSecondary my-4">
              ¿Estás seguro de que quieres eliminar este método de pago? Esta acción no se puede deshacer.
            </p>
            <div className="flex justify-end space-x-4">
              <Button onClick={() => setMethodToDelete(null)} variant="secondary">
                Cancelar
              </Button>
              <Button onClick={() => handleDelete(methodToDelete)} variant="danger">
                Eliminar
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentMethods;
