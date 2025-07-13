
import React from 'react';

const PayPalButtonWrapper = () => {
  return (
    <div className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-border rounded-lg bg-backgroundSecondary">
      <h3 className="text-lg font-semibold text-text mb-4">Pagar con PayPal</h3>
      <p className="text-textSecondary mb-4">Serás redirigido a PayPal para completar tu pago de forma segura.</p>
      <button className="bg-[#00457C] text-white font-bold py-2 px-4 rounded-full hover:bg-[#003057] transition-colors">
        <span className="flex items-center">
          <img src="https://www.paypalobjects.com/webstatic/mktg/Logo/pp-logo-200px.png" alt="PayPal Logo" className="h-6 mr-2" />
          Pagar con PayPal
        </span>
      </button>
    </div>
  );
};

export default PayPalButtonWrapper;
