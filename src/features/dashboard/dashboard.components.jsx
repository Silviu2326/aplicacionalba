import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import Card from '../../components/Card';

// Componente para mostrar métricas
export const StatsCard = ({ title, value, icon: Icon, change, changeType = 'positive' }) => {
  const changeColor = changeType === 'positive' ? 'text-green-600' : 'text-red-600';
  const ChangeIcon = changeType === 'positive' ? TrendingUp : TrendingDown;

  return (
    <Card>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-600 mb-1">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
          {change && (
            <div className={`flex items-center space-x-1 mt-2 ${changeColor}`}>
              <ChangeIcon size={16} />
              <span className="text-sm font-medium">{change}</span>
            </div>
          )}
        </div>
        <div className="p-3 bg-blue-100 rounded-full">
          <Icon size={24} className="text-blue-600" />
        </div>
      </div>
    </Card>
  );
};

// Componente para lista de actividades
export const ActivityList = ({ activities = [] }) => {
  return (
    <Card title="Actividad Reciente">
      <div className="space-y-4">
        {activities.length === 0 ? (
          <p className="text-gray-500 text-center py-8">No hay actividad reciente</p>
        ) : (
          activities.map((activity) => (
            <div key={activity.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white text-xs font-medium">
                  {activity.clientName.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">{activity.clientName}</p>
                <p className="text-xs text-gray-500">{activity.action}</p>
              </div>
              <span className="text-xs text-gray-400">
                {new Date(activity.timestamp).toLocaleTimeString()}
              </span>
            </div>
          ))
        )}
      </div>
    </Card>
  );
};

// Componente para próximas citas
export const UpcomingSessionsList = ({ sessions = [] }) => {
  return (
    <Card title="Próximas Sesiones">
      <div className="space-y-4">
        {sessions.length === 0 ? (
          <p className="text-gray-500 text-center py-8">No hay sesiones programadas</p>
        ) : (
          sessions.map((session) => (
            <div key={session.id} className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-200">
              <div>
                <p className="font-medium text-gray-900">{session.clientName}</p>
                <p className="text-sm text-blue-600">
                  {new Date(session.date).toLocaleString()} - {session.type}
                </p>
              </div>
              <TrendingUp size={20} className="text-blue-600" />
            </div>
          ))
        )}
      </div>
    </Card>
  );
};

// Componente de resumen rápido
export const QuickSummary = ({ totalClients, activeWorkouts, completedToday }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg p-4 text-white">
        <h3 className="text-lg font-semibold">Clientes</h3>
        <p className="text-2xl font-bold">{totalClients}</p>
      </div>
      <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-lg p-4 text-white">
        <h3 className="text-lg font-semibold">Entrenamientos</h3>
        <p className="text-2xl font-bold">{activeWorkouts}</p>
      </div>
      <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg p-4 text-white">
        <h3 className="text-lg font-semibold">Hoy</h3>
        <p className="text-2xl font-bold">{completedToday}</p>
      </div>
    </div>
  );
};