import React, { useState } from 'react';
import PerformanceLeaderboard from './PerformanceLeaderboard';
import ProfessionalAnalyticsView from './ProfessionalAnalyticsView';

const ProfessionalPerformancePage = () => {
  const [selectedProfessionalId, setSelectedProfessionalId] = useState(null);

  const handleSelectProfessional = (id) => {
    setSelectedProfessionalId(id);
  };

  const handleBack = () => {
    setSelectedProfessionalId(null);
  };

  return (
    <div>
      {selectedProfessionalId ? (
        <ProfessionalAnalyticsView professionalId={selectedProfessionalId} onBack={handleBack} />
      ) : (
        <PerformanceLeaderboard onSelectProfessional={handleSelectProfessional} />
      )}
    </div>
  );
};

export default ProfessionalPerformancePage;
