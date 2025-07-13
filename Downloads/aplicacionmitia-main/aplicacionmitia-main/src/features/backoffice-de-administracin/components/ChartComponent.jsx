import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const ChartComponent = ({ title = 'Gráfico de Datos', data = [], dataKey = 'value', xAxisKey = 'name' }) => {
  return (
    <div className="relative group">
      {/* Fondo con gradiente */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 rounded-2xl blur-sm group-hover:blur-none transition-all duration-500"></div>
      
      {/* Contenedor principal */}
      <div className="relative bg-gradient-to-br from-surface/80 via-card/80 to-surface/80 backdrop-blur-xl rounded-2xl border border-borderLight/30 shadow-xl overflow-hidden">
        {/* Header del gráfico */}
        <div className="p-6 border-b border-borderLight/20 bg-gradient-to-r from-primary/5 to-secondary/5">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold bg-gradient-to-r from-text to-primary bg-clip-text text-transparent mb-1">
                {title}
              </h3>
              <p className="text-textMuted text-sm">Datos actualizados en tiempo real</p>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-success rounded-full animate-pulse"></div>
              <span className="text-xs text-textMuted">En vivo</span>
            </div>
          </div>
        </div>
        
        {/* Área del gráfico */}
        <div className="p-6">
          <ResponsiveContainer width="100%" height={320}>
            <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <defs>
                <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--color-primary)" stopOpacity={0.8} />
                  <stop offset="100%" stopColor="var(--color-primary-dark)" stopOpacity={0.6} />
                </linearGradient>
              </defs>
              <CartesianGrid 
                strokeDasharray="3 3" 
                stroke="var(--color-border-light)" 
                strokeOpacity={0.3}
              />
              <XAxis 
                dataKey={xAxisKey} 
                stroke="var(--color-text-muted)" 
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis 
                stroke="var(--color-text-muted)" 
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(var(--color-surface-rgb), 0.95)', 
                  border: '1px solid var(--color-border-light)', 
                  borderRadius: '12px',
                  backdropFilter: 'blur(10px)',
                  boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
                }}
                cursor={{ fill: 'rgba(var(--color-primary-rgb), 0.1)' }}
              />
              <Legend 
                wrapperStyle={{ paddingTop: '20px' }}
              />
              <Bar 
                dataKey={dataKey} 
                fill="url(#barGradient)"
                radius={[4, 4, 0, 0]}
                className="hover:opacity-80 transition-opacity duration-200"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
        
        {/* Indicadores decorativos */}
        <div className="absolute top-4 right-4 w-2 h-2 bg-accent rounded-full animate-ping opacity-75"></div>
        <div className="absolute bottom-4 left-4 w-1 h-1 bg-secondary rounded-full animate-ping opacity-50"></div>
      </div>
    </div>
  );
};

export default ChartComponent;
