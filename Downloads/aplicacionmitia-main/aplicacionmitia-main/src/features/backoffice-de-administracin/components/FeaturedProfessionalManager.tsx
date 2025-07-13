import React, { useState } from 'react';
import { setFeaturedProfessional } from '../api';

const FeaturedProfessionalManager = ({ professionalId, isInitiallyFeatured }) => {
  const [isFeatured, setIsFeatured] = useState(isInitiallyFeatured);
  const [loading, setLoading] = useState(false);

  const handleToggle = async () => {
    setLoading(true);
    const newFeaturedStatus = !isFeatured;
    const result = await setFeaturedProfessional(professionalId, newFeaturedStatus);
    if (result.success) {
      setIsFeatured(newFeaturedStatus);
    } else {
      // Handle error case, maybe show a notification
      console.error(result.message);
    }
    setLoading(false);
  };

  return (
    <div className="bg-backgroundSecondary p-4 rounded-lg">
      <h3 className="text-lg font-bold text-text mb-2">Gestionar Profesional</h3>
      <div className="flex items-center justify-between">
        <span className="text-textMuted">Marcar como Destacado</span>
        <button
          onClick={handleToggle}
          disabled={loading}
          className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary ${isFeatured ? 'bg-primary' : 'bg-gray-600'}`}
        >
          <span
            className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform duration-200 ease-in-out ${isFeatured ? 'translate-x-6' : 'translate-x-1'}`}
          />
        </button>
      </div>
      {loading && <p className="text-sm text-textMuted mt-2">Actualizando...</p>}
    </div>
  );
};

export default FeaturedProfessionalManager;