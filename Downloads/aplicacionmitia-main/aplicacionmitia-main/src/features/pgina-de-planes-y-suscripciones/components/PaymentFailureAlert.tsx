
import React from 'react';
import { Button } from '../../../components/Button';

interface PaymentFailureAlertProps {
  onUpdatePayment: () => void;
}

const PaymentFailureAlert: React.FC<PaymentFailureAlertProps> = ({ onUpdatePayment }) => {
  return (
    <div className="bg-errorLight border-l-4 border-errorDark text-errorDark p-4" role="alert">
      <p className="font-bold">Error en el Pago</p>
      <p>
        No pudimos procesar el pago de tu suscripción. Por favor, actualiza tu método de pago para
        mantener el acceso a tu cuenta.
      </p>
      <Button onClick={onUpdatePayment} className="mt-4 bg-errorDark hover:bg-error text-white">
        Actualizar Método de Pago
      </Button>
    </div>
  );
};

export default PaymentFailureAlert;
