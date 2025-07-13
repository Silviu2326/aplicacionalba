
import React from 'react';
import { Link } from 'react-router-dom';

interface DashboardSummaryWidgetProps {
  title: string;
  count: number;
  linkText: string;
  linkTo: string;
  icon: React.ReactNode;
  color: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info';
}

const DashboardSummaryWidget: React.FC<DashboardSummaryWidgetProps> = ({
  title,
  count,
  linkText,
  linkTo,
  icon,
  color,
}) => {
  const gradientClasses = {
    primary: 'from-primary to-primaryLight',
    secondary: 'from-secondary to-secondaryLight',
    success: 'from-success to-successLight',
    warning: 'from-warning to-warningLight',
    error: 'from-error to-errorLight',
    info: 'from-info to-infoLight',
  };

  const glowClasses = {
    primary: 'from-primary/20 to-primaryLight/20',
    secondary: 'from-secondary/20 to-secondaryLight/20',
    success: 'from-success/20 to-successLight/20',
    warning: 'from-warning/20 to-warningLight/20',
    error: 'from-error/20 to-errorLight/20',
    info: 'from-info/20 to-infoLight/20',
  };

  const textColorClasses = {
    primary: 'text-primary',
    secondary: 'text-secondary',
    success: 'text-success',
    warning: 'text-warning',
    error: 'text-error',
    info: 'text-info',
  };

  return (
    <div className="relative group">
      {/* Efecto de resplandor de fondo */}
      <div className={`absolute inset-0 bg-gradient-to-r ${glowClasses[color]} rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
      
      {/* Contenedor principal con glassmorphism */}
      <div className="relative bg-gradient-to-br from-surface/90 to-card/70 backdrop-blur-xl rounded-2xl border border-borderLight/50 shadow-xl p-6 hover:shadow-2xl transition-all duration-300 group-hover:scale-105">
        {/* Decoración superior */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${gradientClasses[color]} rounded-t-2xl"></div>
        
        <div className="flex items-center justify-between mb-6">
          {/* Icono con efecto glassmorphism */}
          <div className="relative">
            <div className={`absolute inset-0 bg-gradient-to-r ${gradientClasses[color]} rounded-xl blur opacity-50 animate-pulse`}></div>
            <div className={`relative p-4 bg-gradient-to-r ${gradientClasses[color]} rounded-xl shadow-lg`}>
              <div className="text-textInverse">
                {icon}
              </div>
            </div>
          </div>
          
          {/* Contador y título */}
          <div className="text-right space-y-1">
            <div className="relative">
              <p className="text-4xl font-bold bg-gradient-to-r from-text to-textSecondary bg-clip-text text-transparent">
                {count}
              </p>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r ${gradientClasses[color]} rounded-full animate-ping opacity-75"></div>
            </div>
            <p className="text-sm text-textSecondary font-medium">{title}</p>
          </div>
        </div>
        
        {/* Línea divisoria con gradiente */}
        <div className={`h-px bg-gradient-to-r ${gradientClasses[color]} opacity-30 mb-4`}></div>
        
        {/* Link con hover effect */}
        <Link
          to={linkTo}
          className={`group/link inline-flex items-center text-sm font-semibold ${textColorClasses[color]} hover:text-${color}Dark transition-all duration-300 relative`}
        >
          <span className="relative z-10">{linkText}</span>
          <svg className="ml-2 w-4 h-4 transform group-hover/link:translate-x-1 transition-transform duration-300" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
          
          {/* Efecto de hover underline */}
          <div className={`absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r ${gradientClasses[color]} group-hover/link:w-full transition-all duration-300`}></div>
        </Link>
        
        {/* Partículas decorativas */}
        <div className="absolute top-4 right-4 w-2 h-2 bg-gradient-to-r ${gradientClasses[color]} rounded-full opacity-60 animate-pulse"></div>
        <div className="absolute bottom-4 left-4 w-1 h-1 bg-gradient-to-r ${gradientClasses[color]} rounded-full opacity-40 animate-pulse delay-1000"></div>
      </div>
    </div>
  );
};

export default DashboardSummaryWidget;
