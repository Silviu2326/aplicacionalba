import React from 'react';
import { Users, Apple, Dumbbell, TrendingUp, Calendar, DollarSign } from 'lucide-react';
import Card from '../../components/Card';
import Button from '../../components/Button';

const DashboardPage = () => {
  const stats = [
    { title: 'Clientes Activos', value: '24', icon: Users, color: 'text-brand', bgColor: 'bg-brand/10' },
    { title: 'Planes Nutricionales', value: '18', icon: Apple, color: 'text-emerald-600', bgColor: 'bg-emerald-500/10' },
    { title: 'Rutinas Creadas', value: '32', icon: Dumbbell, color: 'text-brand-light', bgColor: 'bg-brand-light/10' },
    { title: 'Ingresos del Mes', value: '$2,850', icon: DollarSign, color: 'text-amber-600', bgColor: 'bg-amber-500/10' },
  ];

  const recentClients = [
    { name: 'María López', lastSession: '2 días', progress: '+5kg' },
    { name: 'Carlos Ruiz', lastSession: '1 día', progress: '-3kg' },
    { name: 'Ana Martín', lastSession: '3 días', progress: '+2kg' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-light/20 via-white to-brand/10 p-6">
      <div className="container mx-auto space-y-8 animate-fade-in-up">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between animate-fade-in-up">
        <div>
          <h1 className="text-3xl font-display font-bold bg-gradient-to-r from-brand-dark to-brand bg-clip-text text-transparent">
            Dashboard
          </h1>
          <p className="text-neutral-600 mt-2 text-lg">Resumen de tu actividad como entrenadora</p>
        </div>
        <div className="mt-6 md:mt-0 flex space-x-4">
          <button className="glass-mid hover:glass border-0 text-brand-dark hover:text-brand font-semibold px-4 py-3 transition-all duration-300">
            <Calendar size={16} className="mr-2" />
            Hoy
          </button>
          <button className="glass-mid hover:glass border-0 text-brand-dark hover:text-brand font-semibold px-6 py-3 transition-all duration-300 hover:scale-105">
            Nuevo Cliente
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div 
              key={stat.title} 
              className="glass-mid p-6 hover:glass transition-all duration-300 transform hover:scale-105 animate-glass-pop"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-2 font-medium">{stat.title}</p>
                  <p className="text-3xl font-display font-bold text-neutral-900 dark:text-white">{stat.value}</p>
                </div>
                <div className={`p-4 ${stat.bgColor} backdrop-blur-sm border border-white/20`}>
                  <Icon size={28} className={stat.color} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Clientes Recientes */}
        <div className="glass p-6 animate-glass-pop">
          <div className="mb-6">
            <h3 className="text-xl font-display font-bold text-neutral-900">Actividad Reciente</h3>
            <p className="text-neutral-600 mt-1">Últimas sesiones de entrenamiento</p>
          </div>
          <div className="space-y-4">
            {recentClients.map((client, index) => (
              <div key={index} className="glass-mid p-4 hover:glass transition-all duration-300">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-brand to-brand-light rounded-2xl flex items-center justify-center shadow-frosted">
                      <span className="text-white font-semibold text-sm">
                        {client.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <p className="font-semibold text-neutral-900">{client.name}</p>
                      <p className="text-sm text-neutral-500">Hace {client.lastSession}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={`text-sm font-bold px-3 py-1 ${client.progress.startsWith('+') ? 'text-emerald-600 bg-emerald-500/10' : 'text-brand bg-brand/10'}`}>
                      {client.progress}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6">
            <button className="w-full bg-gradient-to-r from-brand to-brand-light text-white hover:from-brand-light hover:to-brand py-3 font-semibold transition-all duration-300 shadow-frosted">
              Ver Todos los Clientes
            </button>
          </div>
        </div>

        {/* Próximas Sesiones */}
        <div className="glass p-6 animate-glass-pop" style={{ animationDelay: '200ms' }}>
          <div className="mb-6">
            <h3 className="text-xl font-display font-bold text-neutral-900">Próximas Sesiones</h3>
            <p className="text-neutral-600 mt-1">Citas programadas para hoy</p>
          </div>
          <div className="space-y-4">
            <div className="glass-mid p-4 border border-brand/20 bg-brand/5 hover:glass transition-all duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-neutral-900">María López</p>
                  <p className="text-sm text-brand font-medium">10:00 AM - Entrenamiento de fuerza</p>
                </div>
                <TrendingUp size={24} className="text-brand" />
              </div>
            </div>
            <div className="glass-mid p-4 border border-emerald-500/20 bg-emerald-500/5 hover:glass transition-all duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-neutral-900">Carlos Ruiz</p>
                  <p className="text-sm text-emerald-600 font-medium">2:00 PM - Cardio y flexibilidad</p>
                </div>
                <TrendingUp size={24} className="text-emerald-600" />
              </div>
            </div>
            <div className="glass-mid p-4 border border-amber-500/20 bg-amber-500/5 hover:glass transition-all duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-neutral-900">Ana Martín</p>
                  <p className="text-sm text-amber-600 font-medium">4:00 PM - Evaluación nutricional</p>
                </div>
                <Apple size={24} className="text-amber-600" />
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
};

export default DashboardPage;