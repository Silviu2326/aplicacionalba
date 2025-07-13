import React from 'react';
import { Link } from 'react-router-dom';
import { usePaneldelProfesional } from '../hooks/usePaneldelProfesional';
import { Button } from '../../../components/Button'; // Ajusta la ruta si es necesario

const SubscriptionCard = () => {
  const { subscription, loadingSubscription, subscriptionError } = usePaneldelProfesional();

  if (loadingSubscription) {
    return (
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-surface/80 to-card/60 backdrop-blur-xl rounded-2xl border border-borderLight/50 shadow-xl"></div>
        <div className="relative p-6">
          <div className="animate-pulse space-y-4">
            <div className="flex items-center justify-between">
              <div className="h-6 bg-gradient-to-r from-backgroundSecondary/60 to-surface/40 rounded-lg w-32"></div>
              <div className="h-6 bg-gradient-to-r from-primary/20 to-accent/20 rounded-full w-16"></div>
            </div>
            <div className="space-y-3">
              <div className="h-4 bg-gradient-to-r from-backgroundSecondary/60 to-surface/40 rounded w-3/4"></div>
              <div className="h-4 bg-gradient-to-r from-backgroundSecondary/60 to-surface/40 rounded w-1/2"></div>
            </div>
            <div className="space-y-2">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-3 bg-gradient-to-r from-backgroundSecondary/40 to-surface/30 rounded w-full"></div>
              ))}
            </div>
            <div className="h-10 bg-gradient-to-r from-primary/20 to-accent/20 rounded-xl w-full"></div>
          </div>
        </div>
      </div>
    );
  }

  if (subscriptionError) {
    return (
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-errorLight/20 to-error/10 backdrop-blur-xl rounded-2xl border border-error/30 shadow-xl"></div>
        <div className="relative p-6">
          <div className="text-center space-y-4">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-error to-errorLight rounded-full blur opacity-50"></div>
              <div className="relative w-16 h-16 bg-gradient-to-r from-error to-errorLight rounded-full flex items-center justify-center mx-auto">
                <svg className="w-8 h-8 text-textInverse" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-error mb-1">Error de conexión</h4>
              <p className="text-textSecondary text-sm">{subscriptionError}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!subscription) {
    return null; // O mostrar un mensaje de que no hay suscripción
  }

  const isInactive = subscription.status !== 'Activo';

  const statusConfig = {
    'Activo': {
      gradient: 'from-success to-successLight',
      glow: 'from-success/20 to-successLight/20',
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
        </svg>
      )
    },
    'Inactivo': {
      gradient: 'from-error to-errorLight',
      glow: 'from-error/20 to-errorLight/20',
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
      )
    },
    'Pendiente': {
      gradient: 'from-warning to-warningLight',
      glow: 'from-warning/20 to-warningLight/20',
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
        </svg>
      )
    }
  };

  const currentStatus = statusConfig[subscription.status] || statusConfig['Inactivo'];

  return (
    <div className="relative group">
      {/* Efecto de resplandor de fondo */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-accent/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      {/* Contenedor principal con glassmorphism */}
      <div className="relative bg-gradient-to-br from-surface/90 to-card/70 backdrop-blur-xl rounded-2xl border border-borderLight/50 shadow-xl p-6 hover:shadow-2xl transition-all duration-300">
        {/* Decoración superior */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-accent to-secondary rounded-t-2xl"></div>
        
        {/* Header con título */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-xl font-bold bg-gradient-to-r from-text to-textSecondary bg-clip-text text-transparent">
                Mi Suscripción
              </h3>
              <div className="w-8 h-1 bg-gradient-to-r from-primary to-accent rounded-full mt-1"></div>
            </div>
            
            {/* Badge de estado modernizado */}
            <div className="relative">
              <div className={`absolute inset-0 bg-gradient-to-r ${currentStatus.glow} rounded-full blur animate-pulse`}></div>
              <div className={`relative flex items-center space-x-2 px-4 py-2 bg-gradient-to-r ${currentStatus.gradient} rounded-full text-textInverse font-semibold text-sm shadow-lg`}>
                {currentStatus.icon}
                <span>{subscription.status}</span>
              </div>
            </div>
          </div>
          
          {isInactive && (
            <div className="p-4 mb-4 bg-gradient-to-r from-warningLight/20 to-warning/10 backdrop-blur-sm rounded-xl border border-warning/30" role="alert">
              <div className="flex items-center space-x-2">
                <svg className="w-5 h-5 text-warning" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                <p className="text-sm text-warningDark font-medium">
                  <span className="font-bold">Atención:</span> Su suscripción se encuentra en estado '{subscription.status}'.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Información del plan */}
        <div className="mb-6">
          <p className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-2">{subscription.name}</p>
        </div>

        {/* Información de facturación */}
        <div className="mb-6 p-4 bg-gradient-to-r from-backgroundSecondary/60 to-surface/40 backdrop-blur-sm rounded-xl border border-borderLight/30">
          <p className="text-sm text-textSecondary mb-1 font-medium">Próxima facturación</p>
          <div className="flex items-center space-x-2">
            <svg className="w-4 h-4 text-primary" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
            </svg>
            <span className="font-medium text-text">{subscription.nextBilling}</span>
          </div>
        </div>

        {/* Lista de características */}
        <div className="mb-6">
          <p className="text-sm text-textSecondary mb-4 font-semibold flex items-center">
            <svg className="w-4 h-4 mr-2 text-accent" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Características incluidas
          </p>
          <ul className="space-y-3">
            {subscription.features.map((feature, index) => (
              <li key={index} className="flex items-center group/item">
                <div className="relative mr-3">
                  <div className="absolute inset-0 bg-gradient-to-r from-success to-successLight rounded-full blur opacity-50 group-hover/item:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative w-5 h-5 bg-gradient-to-r from-success to-successLight rounded-full flex items-center justify-center">
                    <svg className="w-3 h-3 text-textInverse" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
                <span className="text-textSecondary font-medium group-hover/item:text-primary transition-colors duration-300">{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Botón de gestión modernizado */}
        <Link to="/planes-suscripciones" className="group/button relative block w-full overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent rounded-xl blur opacity-50 group-hover/button:opacity-100 transition-opacity duration-300"></div>
          <div className="relative bg-gradient-to-r from-primary to-accent text-textInverse text-center py-3 px-6 rounded-xl font-semibold shadow-lg transform group-hover/button:scale-105 transition-all duration-300">
            <span className="flex items-center justify-center space-x-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
              </svg>
              <span>Gestionar Suscripción</span>
            </span>
          </div>
        </Link>
        
        {/* Partículas decorativas */}
        <div className="absolute top-4 right-4 w-2 h-2 bg-gradient-to-r from-accent to-secondary rounded-full opacity-60 animate-pulse"></div>
        <div className="absolute bottom-4 left-4 w-1 h-1 bg-gradient-to-r from-primary to-accent rounded-full opacity-40 animate-pulse delay-1000"></div>
      </div>
    </div>
  );
};

export default SubscriptionCard;
