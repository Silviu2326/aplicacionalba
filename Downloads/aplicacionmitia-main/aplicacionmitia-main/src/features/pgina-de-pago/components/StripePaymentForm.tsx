import React from 'react';
import { PaymentElement } from '@stripe/react-stripe-js';

export const StripePaymentForm: React.FC = () => {
  return (
    <div className="p-8 bg-surface rounded-2xl shadow-lg border border-borderLight">
      <h3 className="text-xl font-bold text-text mb-6">Datos de la Tarjeta</h3>
      <form>
        <PaymentElement 
          options={{
            style: {
              base: {
                color: '#F0F0F0',
                fontFamily: '"Inter", sans-serif',
                fontSmoothing: 'antialiased',
                fontSize: '16px',
                '::placeholder': {
                  color: '#a1a1aa'
                }
              },
              invalid: {
                color: '#f87171',
                iconColor: '#f87171'
              }
            }
          }}
        />
      </form>
    </div>
  );
};