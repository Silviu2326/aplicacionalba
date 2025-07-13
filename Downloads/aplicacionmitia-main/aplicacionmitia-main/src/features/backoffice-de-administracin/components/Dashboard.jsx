import React from 'react';
import StatCard from './StatCard';
import ChartComponent from './ChartComponent';
import { Users, UserCheck, Calendar, TrendingUp, AlertTriangle } from 'lucide-react';
import { useAdminStats } from '../hooks/useAdminStats';

const Dashboard = () => {
  const { data: stats, loading, error } = useAdminStats();

  if (loading) {
    return (
      <div className="flex items-center justify-center py-16">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-8 h-8 bg-gradient-to-r from-primary to-secondary rounded-full animate-pulse"></div>
          </div>
        </div>
        <span className="ml-4 text-lg text-textMuted animate-pulse">Cargando estadísticas...</span>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="flex items-center justify-center py-16">
        <div className="bg-gradient-to-r from-error/10 to-errorDark/10 backdrop-blur-sm border border-error/20 rounded-2xl p-8 text-center max-w-md">
          <div className="w-16 h-16 bg-gradient-to-r from-error to-errorDark rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertTriangle className="w-8 h-8 text-textInverse" />
          </div>
          <h3 className="text-lg font-semibold text-error mb-2">Error al cargar</h3>
          <p className="text-textMuted">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header del Dashboard */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-secondary/5 to-accent/5 rounded-2xl blur-xl"></div>
        <div className="relative bg-gradient-to-r from-surface/80 to-card/80 backdrop-blur-sm rounded-2xl p-6 border border-borderLight/30">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-black bg-gradient-to-r from-text via-primary to-secondary bg-clip-text text-transparent mb-2">
                Dashboard
              </h2>
              <p className="text-textMuted">Resumen general de la plataforma</p>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-success rounded-full animate-pulse"></div>
              <span className="text-sm text-textMuted">En tiempo real</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Grid de Estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Total Usuarios" 
          value={stats?.totalUsers || 0} 
          icon={<Users className="w-8 h-8" />} 
          gradient="from-blue-500 to-blue-600"
          bgGradient="from-blue-500/10 to-blue-600/10"
        />
        <StatCard 
          title="Profesionales" 
          value={stats?.totalProfessionals || 0} 
          icon={<UserCheck className="w-8 h-8" />} 
          gradient="from-green-500 to-green-600"
          bgGradient="from-green-500/10 to-green-600/10"
        />
        <StatCard 
          title="Citas Totales" 
          value={stats?.totalAppointments || 0} 
          icon={<Calendar className="w-8 h-8" />} 
          gradient="from-purple-500 to-purple-600"
          bgGradient="from-purple-500/10 to-purple-600/10"
        />
        <StatCard 
          title="Nuevos Registros" 
          value={stats?.newSignups || 0} 
          icon={<TrendingUp className="w-8 h-8" />} 
          gradient="from-orange-500 to-orange-600"
          bgGradient="from-orange-500/10 to-orange-600/10"
        />
      </div>
      
      {/* Grid de Gráficos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-gradient-to-br from-surface/60 to-card/60 backdrop-blur-sm rounded-2xl p-6 border border-borderLight/30 shadow-xl">
          <ChartComponent title="Usuarios por Mes" data={stats?.usersByMonth || []} />
        </div>
        <div className="bg-gradient-to-br from-surface/60 to-card/60 backdrop-blur-sm rounded-2xl p-6 border border-borderLight/30 shadow-xl">
          <ChartComponent title="Citas por Mes" data={stats?.appointmentsByMonth || []} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
