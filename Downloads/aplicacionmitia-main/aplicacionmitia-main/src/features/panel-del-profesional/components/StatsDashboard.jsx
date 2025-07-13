import React, { useState } from 'react';
import StatCard from './StatCard';

const StatsDashboard = ({ stats, onDateRangeChange }) => {
  const [selectedRange, setSelectedRange] = useState('last_30_days');

  const handleRangeChange = (e) => {
    setSelectedRange(e.target.value);
    onDateRangeChange(e.target.value);
  };

  return (
    <div className="bg-backgroundSecondary p-4 sm:p-6 rounded-lg">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-semibold text-text">Estadísticas de Actividad</h3>
        <select
          value={selectedRange}
          onChange={handleRangeChange}
          className="border border-border rounded-md px-3 py-2 bg-surface text-text"
        >
          <option value="last_30_days">Últimos 30 días</option>
          <option value="this_month">Este mes</option>
          <option value="this_year">Este año</option>
        </select>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Ingresos del mes"
          value={`${stats.monthly_income}`}
          change="+5.2%"
          changeType="positive"
        />
        <StatCard
          title="Sesiones completadas"
          value={stats.completed_sessions}
          change="-1.8%"
          changeType="negative"
        />
        <StatCard
          title="Valoración media"
          value={stats.average_rating}
          change="+0.1"
          changeType="positive"
        />
        <StatCard
          title="Nuevos clientes"
          value={stats.new_clients}
          change="+12"
          changeType="positive"
        />
      </div>
    </div>
  );
};

export default StatsDashboard;
