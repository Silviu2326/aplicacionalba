
import React from 'react';

interface UsageProgressBarProps {
  current: number;
  total: number;
}

export const UsageProgressBar: React.FC<UsageProgressBarProps> = ({ current, total }) => {
  const percentage = total > 0 ? (current / total) * 100 : 0;

  return (
    <div className="w-full bg-backgroundSecondary border border-borderLight rounded-full h-4 overflow-hidden">
      <div
        className="bg-primary h-4 rounded-full transition-all duration-300 ease-in-out"
        style={{ width: `${percentage}%` }}
      ></div>
    </div>
  );
};
