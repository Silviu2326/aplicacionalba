
import React, { useState } from 'react';

interface MatchScoreIndicatorProps {
  score: number;
  reasons: string[];
}

const MatchScoreIndicator: React.FC<MatchScoreIndicatorProps> = ({ score, reasons }) => {
  const [showTooltip, setShowTooltip] = useState(false);

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'bg-success text-white';
    if (score >= 75) return 'bg-primary text-white';
    if (score >= 60) return 'bg-warning text-textInverse';
    return 'bg-error text-white';
  };

  const getScoreText = (score: number) => {
    if (score >= 90) return 'Excelente';
    if (score >= 75) return 'Muy Bueno';
    if (score >= 60) return 'Bueno';
    return 'Regular';
  }

  return (
    <div 
      className="relative"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      <div className={`w-24 h-24 rounded-full flex flex-col items-center justify-center ${getScoreColor(score)}`}>
        <span className="text-2xl font-bold">{score}%</span>
        <span className="text-xs">{getScoreText(score)}</span>
      </div>
      {showTooltip && (
        <div className="absolute bottom-full mb-2 w-64 bg-surface p-3 rounded-lg shadow-lg z-10">
          <h4 className="font-bold text-text mb-1">Razones de compatibilidad:</h4>
          <ul className="list-disc list-inside text-textSecondary">
            {reasons.map((reason, index) => (
              <li key={index}>{reason}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default MatchScoreIndicator;
