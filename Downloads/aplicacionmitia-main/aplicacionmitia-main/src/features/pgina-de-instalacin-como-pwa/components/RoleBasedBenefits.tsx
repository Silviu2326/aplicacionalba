
import React from 'react';
import { FiCheckCircle, FiUsers, FiUser, FiZap, FiShield } from 'react-icons/fi';

interface RoleBasedBenefitsProps {
  role: 'professional' | 'client';
}

const RoleBasedBenefits: React.FC<RoleBasedBenefitsProps> = ({ role }) => {
  const benefits = {
    professional: [
      'Gestiona tus citas desde cualquier lugar',
      'Acceso rápido a historiales de pacientes',
      'Notificaciones instantáneas de nuevas citas',
      'Sincronización automática con tu calendario',
    ],
    client: [
      'Reserva citas 24/7 sin llamadas',
      'Recibe recordatorios automáticos',
      'Accede a tu historial de sesiones',
      'Comunicación directa con tu terapeuta',
    ],
  };

  const roleConfig = {
    professional: {
      title: 'Profesionales',
      icon: FiUsers,
      gradient: 'from-primary to-secondary',
      accentColor: 'primary',
      bgGradient: 'from-primary/5 via-secondary/5 to-accent/5'
    },
    client: {
      title: 'Clientes',
      icon: FiUser,
      gradient: 'from-secondary to-accent',
      accentColor: 'secondary',
      bgGradient: 'from-secondary/5 via-accent/5 to-info/5'
    }
  };

  const config = roleConfig[role];
  const IconComponent = config.icon;

  return (
    <div className="group relative">
      {/* Elementos decorativos de fondo */}
      <div className={`absolute inset-0 bg-gradient-to-br ${config.bgGradient} rounded-3xl blur-sm group-hover:blur-none transition-all duration-500`}></div>
      <div className={`absolute top-4 right-4 w-24 h-24 bg-gradient-to-r ${config.gradient} opacity-10 rounded-full blur-xl group-hover:blur-lg transition-all duration-500`}></div>
      <div className="absolute bottom-4 left-4 w-16 h-16 bg-gradient-to-r from-success/10 to-info/10 rounded-full blur-xl group-hover:blur-lg transition-all duration-500"></div>
      
      <div className="relative bg-gradient-to-br from-surface/95 via-card/95 to-surface/95 backdrop-blur-xl rounded-3xl p-8 border border-borderLight/50 shadow-xl hover:shadow-2xl transition-all duration-500 group-hover:scale-[1.02]">
        {/* Borde superior decorativo */}
        <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${config.gradient} rounded-t-3xl opacity-60 group-hover:opacity-100 transition-opacity duration-300`}></div>
        
        {/* Header con icono */}
        <div className="flex items-center mb-8">
          <div className="relative mr-4">
            <div className={`w-14 h-14 bg-gradient-to-br ${config.gradient} rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:rotate-3`}>
              <IconComponent className="w-7 h-7 text-textInverse" />
            </div>
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-success to-successDark rounded-full border-2 border-surface animate-pulse"></div>
          </div>
          
          <div>
            <h3 className={`text-2xl font-black bg-gradient-to-r ${config.gradient} bg-clip-text text-transparent mb-1`}>
              Beneficios para {config.title}
            </h3>
            <div className="flex items-center space-x-2 text-sm text-textMuted">
              <FiShield className="w-4 h-4 text-success" />
              <span>Experiencia optimizada</span>
              <div className="w-1 h-1 bg-borderLight rounded-full"></div>
              <FiZap className="w-4 h-4 text-accent" />
              <span>Acceso instantáneo</span>
            </div>
          </div>
        </div>
        
        {/* Lista de beneficios mejorada */}
        <ul className="space-y-4">
          {benefits[role].map((benefit, index) => (
            <li key={index} className="group/item flex items-start space-x-4 p-4 rounded-2xl bg-gradient-to-r from-surface/50 to-card/50 border border-borderLight/30 hover:border-success/30 hover:from-success/5 hover:to-success/10 transition-all duration-300">
              <div className="relative flex-shrink-0 mt-0.5">
                <div className="w-6 h-6 bg-gradient-to-r from-success to-successDark rounded-full flex items-center justify-center shadow-md group-hover/item:shadow-lg transition-all duration-300">
                  <FiCheckCircle className="w-4 h-4 text-textInverse" />
                </div>
                <div className="absolute inset-0 w-6 h-6 bg-success/20 rounded-full blur-sm opacity-0 group-hover/item:opacity-100 animate-pulse transition-opacity duration-300"></div>
              </div>
              
              <div className="flex-1">
                <span className="text-base font-medium text-text group-hover/item:text-textDark transition-colors duration-300 leading-relaxed">
                  {benefit}
                </span>
                
                {/* Indicador de progreso sutil */}
                <div className="mt-2 w-full h-0.5 bg-borderLight rounded-full overflow-hidden">
                  <div className={`h-full bg-gradient-to-r ${config.gradient} transform -translate-x-full group-hover/item:translate-x-0 transition-transform duration-500 ease-out`}></div>
                </div>
              </div>
              
              {/* Número del beneficio */}
              <div className={`w-8 h-8 bg-gradient-to-r ${config.gradient} opacity-10 group-hover/item:opacity-20 rounded-full flex items-center justify-center transition-all duration-300`}>
                <span className={`text-xs font-bold text-${config.accentColor}`}>
                  {index + 1}
                </span>
              </div>
            </li>
          ))}
        </ul>
        
        {/* Footer decorativo */}
        <div className="mt-8 pt-6 border-t border-borderLight/30">
          <div className="flex items-center justify-center space-x-4 text-xs text-textMuted">
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
              <span>Disponible 24/7</span>
            </div>
            <div className="w-1 h-4 bg-borderLight rounded-full"></div>
            <div className="flex items-center space-x-1">
              <FiZap className="w-3 h-3 text-accent" />
              <span>Sincronización automática</span>
            </div>
          </div>
        </div>
        
        {/* Indicador de interacción */}
        <div className={`absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-${config.accentColor}/30 to-transparent rounded-b-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
      </div>
    </div>
  );
};

export default RoleBasedBenefits;
