
import React from 'react';

interface BillingCycleToggleProps {
  billingCycle: 'monthly' | 'annually';
  onBillingCycleChange: (cycle: 'monthly' | 'annually') => void;
}

const BillingCycleToggle: React.FC<BillingCycleToggleProps> = ({ billingCycle, onBillingCycleChange }) => {
  return (
    <div className="flex items-center justify-center space-x-4 bg-backgroundSecondary rounded-full p-1">
      <button
        onClick={() => onBillingCycleChange('monthly')}
        className={`px-6 py-2 rounded-full text-sm font-semibold transition-colors duration-300 ${
          billingCycle === 'monthly' ? 'bg-primary text-textInverse shadow-md' : 'text-textSecondary hover:text-text'
        }`}
      >
        Mensual
      </button>
      <button
        onClick={() => onBillingCycleChange('annually')}
        className={`px-6 py-2 rounded-full text-sm font-semibold transition-colors duration-300 ${
          billingCycle === 'annually' ? 'bg-primary text-textInverse shadow-md' : 'text-textSecondary hover:text-text'
        }`}
      >
        Anual (Ahorra 2 meses)
      </button>
    </div>
  );
};

export default BillingCycleToggle;
