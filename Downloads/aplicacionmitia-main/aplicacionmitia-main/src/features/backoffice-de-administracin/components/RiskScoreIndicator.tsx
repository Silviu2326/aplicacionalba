import React from 'react';

interface RiskScoreIndicatorProps {
  riskScore: number; // 0-100
}

const RiskScoreIndicator: React.FC<RiskScoreIndicatorProps> = ({ riskScore }) => {
  const getRiskColor = () => {
    if (riskScore > 80) {
      return 'bg-error text-white'; // Alto riesgo
    } else if (riskScore > 50) {
      return 'bg-warning text-black'; // Riesgo medio
    } else {
      return 'bg-success text-white'; // Bajo riesgo
    }
  };

  const getRiskLevelText = () => {
    if (riskScore > 80) {
      return 'Alto';
    } else if (riskScore > 50) {
      return 'Medio';
    } else {
      return 'Bajo';
    }
  }

  return (
    <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold ${getRiskColor()}`}>
      <span className="mr-2 h-2 w-2 rounded-full bg-current"></span>
      <span>Riesgo: {getRiskLevelText()} ({riskScore})</span>
    </div>
  );
};

export default RiskScoreIndicator;