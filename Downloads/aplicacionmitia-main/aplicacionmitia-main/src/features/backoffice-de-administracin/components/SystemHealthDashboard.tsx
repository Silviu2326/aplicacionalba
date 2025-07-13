import React from 'react';
import ServiceStatusWidget from './ServiceStatusWidget';
import RealtimeErrorFeed from './RealtimeErrorFeed';
import DataChart from './DataChart';

const SystemHealthDashboard = ({ systemHealth, isLoading }) => {
  if (isLoading) {
    return <div className="flex justify-center items-center h-64 text-textMuted">Cargando...</div>;
  }

  return (
    <div className="p-6 bg-background min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-text">Monitor de Salud del Sistema</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {systemHealth.services.map(service => (
          <ServiceStatusWidget key={service.name} service={service} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-surface p-6 rounded-lg shadow border border-border">
          <h2 className="text-xl font-semibold mb-4 text-textSecondary">Tiempo de Respuesta de la API (Últimos 30 min)</h2>
          <DataChart data={systemHealth.apiResponseTimes} />
        </div>
        
        <RealtimeErrorFeed errors={systemHealth.errors} />
      </div>
    </div>
  );
};

export default SystemHealthDashboard;
