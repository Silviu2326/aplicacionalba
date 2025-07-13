import React from 'react';
import PlanCard from './PlanCard';

const PlanComparisonTable = ({ plans, billingCycle, setBillingCycle }) => {

  const handleToggle = () => {
    setBillingCycle(billingCycle === 'monthly' ? 'annually' : 'monthly');
  };

  return (
    <div className="w-full max-w-6xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="flex justify-center items-center mb-10">
        <span className={`mr-4 font-medium ${billingCycle === 'monthly' ? 'text-primary' : 'text-textMuted'}`}>
          Mensual
        </span>
        <label htmlFor="billingToggle" className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            id="billingToggle"
            className="sr-only peer"
            checked={billingCycle === 'annually'}
            onChange={handleToggle}
          />
          <div className="w-14 h-8 bg-backgroundSecondary rounded-full peer peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-focus peer-checked:after:translate-x-full peer-checked:after:border-surface after:content-[''] after:absolute after:top-1 after:left-[4px] after:bg-surface after:border-border after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-primary"></div>
        </label>
        <span className={`ml-4 font-medium ${billingCycle === 'annually' ? 'text-primary' : 'text-textMuted'}`}>
          Anual
        </span>
      </div>
      {billingCycle === 'annually' && (
        <div className="text-center mb-10">
          <p className="text-lg text-success font-semibold">¡Ahorra hasta un 20% con el plan anual!</p>
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {plans.map((plan) => (
          <PlanCard
            key={plan.id}
            plan={plan}
            billingCycle={billingCycle}
            isPopular={plan.isPopular}
          />
        ))}
      </div>
    </div>
  );
};

export default PlanComparisonTable;
