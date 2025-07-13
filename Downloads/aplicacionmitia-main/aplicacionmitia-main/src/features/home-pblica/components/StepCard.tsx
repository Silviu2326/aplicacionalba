
import React from 'react';

interface StepCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const StepCard: React.FC<StepCardProps> = ({ icon, title, description }) => {
  return (
    <div className="flex flex-col items-center p-6 text-center bg-surface rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300">
      <div className="flex items-center justify-center w-16 h-16 mb-4 text-primary bg-primaryLight rounded-full">
        {icon}
      </div>
      <h3 className="mb-2 text-xl font-bold text-text">{title}</h3>
      <p className="text-textSecondary">{description}</p>
    </div>
  );
};

export default StepCard;
