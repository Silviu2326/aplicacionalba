import React, { useState, useEffect } from 'react';
import { getProfessionalAnalytics } from '../api';
import DataChart from './DataChart';
import AdminUserProfileView from './AdminUserProfileView';
import FeaturedProfessionalManager from './FeaturedProfessionalManager';

const ProfessionalAnalyticsView = ({ professionalId, onBack }) => {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (professionalId) {
      const fetchAnalytics = async () => {
        setLoading(true);
        const data = await getProfessionalAnalytics(professionalId);
        setAnalytics(data);
        setLoading(false);
      };
      fetchAnalytics();
    }
  }, [professionalId]);

  if (loading) {
    return <div className="text-center p-4 text-text">Cargando analíticas...</div>;
  }

  if (!analytics) {
    return (
      <div className="text-center p-4 text-text">
        <p>Selecciona un profesional para ver sus analíticas.</p>
        <button onClick={onBack} className="mt-4 px-4 py-2 bg-primary text-text rounded-md hover:bg-primaryHover">
          Volver al Ranking
        </button>
      </div>
    );
  }

  return (
    <div className="bg-surface p-6 rounded-lg shadow-lg">
      <button onClick={onBack} className="mb-4 px-4 py-2 bg-primary text-text rounded-md hover:bg-primaryHover">
        &larr; Volver al Ranking
      </button>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <AdminUserProfileView userId={analytics.id} />
        </div>
        <div className="space-y-6">
          <div className="bg-backgroundSecondary p-4 rounded-lg">
            <h3 className="text-lg font-bold text-text mb-2">Métricas Clave</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-textMuted">Puntuación:</span> <span className="font-bold text-primary">{analytics.performanceScore}</span></div>
              <div className="flex justify-between"><span className="text-textMuted">Reservas:</span> <span className="font-bold text-text">{analytics.bookings}</span></div>
              <div className="flex justify-between"><span className="text-textMuted">Rating Prom.:</span> <span className="font-bold text-text">{analytics.avgRating.toFixed(1)}</span></div>
              <div className="flex justify-between"><span className="text-textMuted">Tasa Re-reserva:</span> <span className="font-bold text-text">{(analytics.rebookingRate * 100).toFixed(0)}%</span></div>
            </div>
          </div>
          <FeaturedProfessionalManager professionalId={analytics.id} isInitiallyFeatured={analytics.isFeatured} />
        </div>
      </div>

      <div className="mt-6">
        <h3 className="text-xl font-bold text-text mb-4">Evolución del Rating Promedio Mensual</h3>
        <div className="bg-backgroundSecondary p-4 rounded-lg">
          <DataChart data={analytics.ratingHistory} lineKey="avgRating" xAxisKey="month" />
        </div>
      </div>
    </div>
  );
};

export default ProfessionalAnalyticsView;