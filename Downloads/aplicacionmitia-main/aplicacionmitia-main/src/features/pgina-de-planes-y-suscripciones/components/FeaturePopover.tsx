
import React, { useState } from 'react';

interface FeaturePopoverProps {
  featureName: string;
  featureDescription: string;
  children: React.ReactNode;
}

const FeaturePopover: React.FC<FeaturePopoverProps> = ({ featureName, featureDescription, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div 
      className="relative inline-block"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      {children}
      {isOpen && (
        <div className="absolute z-10 w-64 p-4 bg-surface text-text rounded-lg shadow-lg bottom-full mb-2 -translate-x-1/2 left-1/2">
          <h4 className="font-bold mb-2">{featureName}</h4>
          <p className="text-sm text-textSecondary">{featureDescription}</p>
        </div>
      )}
    </div>
  );
};

export default FeaturePopover;
