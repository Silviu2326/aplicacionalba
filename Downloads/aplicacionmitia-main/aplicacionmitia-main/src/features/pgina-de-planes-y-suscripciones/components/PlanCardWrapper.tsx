import React from 'react';

type PlanCardWrapperProps = {
  children: React.ReactNode;
  isRecommended?: boolean;
  isSelected?: boolean;
};

const PlanCardWrapper: React.FC<PlanCardWrapperProps> = ({ children, isRecommended, isSelected }) => {
  const baseClasses = 'bg-white rounded-lg shadow-lg transition-transform duration-300 ease-in-out flex flex-col';
  const recommendedClasses = isRecommended ? 'border-4 border-primary transform scale-105' : 'border border-gray-200';
  const selectedClasses = isSelected ? 'ring-2 ring-offset-2 ring-primary' : '';

  return (
    <div className={`${baseClasses} ${recommendedClasses} ${selectedClasses} relative`}>
      {isRecommended && (
        <div className="absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2">
          <span className="bg-primary text-white px-4 py-1 text-sm font-bold rounded-full shadow-md">
            Más Popular
          </span>
        </div>
      )}
      {children}
    </div>
  );
};

export default PlanCardWrapper;