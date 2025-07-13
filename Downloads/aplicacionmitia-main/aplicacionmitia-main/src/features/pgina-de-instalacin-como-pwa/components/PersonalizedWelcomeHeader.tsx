// src/features/pgina-de-instalacin-como-pwa/components/PersonalizedWelcomeHeader.tsx
import React from 'react';
import { FiSmartphone, FiZap, FiUser } from 'react-icons/fi';

interface PersonalizedWelcomeHeaderProps {
  userName?: string;
  nextAppointment?: {
    date: string;
    time: string;
    professionalName?: string; // For professionals viewing their appointments
    clientName?: string; // For clients viewing their appointments
  };
  isProfessional: boolean;
}

const PersonalizedWelcomeHeader: React.FC<PersonalizedWelcomeHeaderProps> = ({
  userName,
  nextAppointment,
  isProfessional,
}) => {
  if (!userName) {
    return (
      <div className="relative overflow-hidden">
        {/* Elementos decorativos de fondo */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/10 rounded-3xl blur-xl"></div>
        <div className="absolute top-4 right-4 w-32 h-32 bg-gradient-to-r from-primary/20 to-accent/20 rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute bottom-4 left-4 w-24 h-24 bg-gradient-to-r from-secondary/20 to-info/20 rounded-full blur-2xl animate-pulse delay-1000"></div>
        
        <div className="relative bg-gradient-to-br from-surface/80 via-card/80 to-surface/80 backdrop-blur-xl rounded-3xl p-12 border border-borderLight/50 shadow-2xl text-center">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-secondary to-accent rounded-t-3xl"></div>
          
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="w-20 h-20 bg-gradient-primary rounded-2xl flex items-center justify-center shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-500">
                <FiSmartphone className="w-10 h-10 text-textInverse" />
              </div>
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-accent to-warning rounded-full animate-ping"></div>
            </div>
          </div>
          
          <h1 className="text-5xl font-black bg-gradient-to-r from-text via-primary to-secondary bg-clip-text text-transparent mb-4">
            Instala nuestra PWA
          </h1>
          <p className="text-xl text-textSecondary max-w-2xl mx-auto leading-relaxed">
            Accede a <span className="font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">TheraFlow</span> directamente desde tu pantalla de inicio con una experiencia nativa.
          </p>
          
          <div className="flex justify-center items-center mt-8 space-x-8">
            <div className="flex items-center space-x-2 text-textMuted">
              <FiZap className="w-5 h-5 text-accent" />
              <span className="text-sm font-medium">Carga instantánea</span>
            </div>
            <div className="w-2 h-2 bg-borderLight rounded-full"></div>
            <div className="flex items-center space-x-2 text-textMuted">
              <FiUser className="w-5 h-5 text-secondary" />
              <span className="text-sm font-medium">Acceso offline</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden">
      {/* Elementos decorativos personalizados */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/10 rounded-3xl blur-xl"></div>
      <div className="absolute top-4 right-4 w-32 h-32 bg-gradient-to-r from-success/20 to-info/20 rounded-full blur-2xl animate-pulse"></div>
      
      <div className="relative bg-gradient-to-br from-surface/90 via-card/90 to-surface/90 backdrop-blur-xl rounded-3xl p-10 border border-borderLight/50 shadow-2xl">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-success via-primary to-accent rounded-t-3xl"></div>
        
        <div className="text-center">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-primaryDark rounded-2xl flex items-center justify-center shadow-xl transform hover:scale-110 transition-transform duration-300">
                <FiUser className="w-8 h-8 text-textInverse" />
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-success to-successDark rounded-full border-2 border-surface animate-pulse"></div>
            </div>
          </div>
          
          <h1 className="text-4xl font-black bg-gradient-to-r from-text via-primary to-secondary bg-clip-text text-transparent mb-4">
            ¡Hola, {userName}! 👋
          </h1>
          
          {nextAppointment ? (
            <div className="bg-gradient-to-r from-info/10 to-accent/10 border border-info/30 rounded-2xl p-6 mb-6">
              <div className="flex items-center justify-center mb-3">
                <div className="w-3 h-3 bg-gradient-to-r from-info to-accent rounded-full animate-pulse mr-3"></div>
                <span className="text-sm font-semibold text-info uppercase tracking-wider">Próxima Cita</span>
              </div>
              <p className="text-lg font-medium text-text">
                {isProfessional
                  ? (
                    <>
                      Gestiona tu próxima cita con{' '}
                      <span className="font-bold bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent">
                        {nextAppointment.clientName}
                      </span>
                    </>
                  )
                  : (
                    <>
                      Prepárate para tu sesión el{' '}
                      <span className="font-bold text-primary">{nextAppointment.date}</span>{' '}
                      a las{' '}
                      <span className="font-bold text-secondary">{nextAppointment.time}</span>
                    </>
                  )}
              </p>
            </div>
          ) : (
            <p className="text-lg text-textSecondary mb-6">
              Instala nuestra aplicación para una experiencia{' '}
              <span className="font-bold bg-gradient-to-r from-accent to-warning bg-clip-text text-transparent">
                excepcional
              </span>
            </p>
          )}
          
          <div className="flex justify-center items-center space-x-6 text-sm text-textMuted">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
              <span>En línea</span>
            </div>
            <div className="w-1 h-4 bg-borderLight rounded-full"></div>
            <div className="flex items-center space-x-2">
              <FiZap className="w-4 h-4 text-accent" />
              <span>Optimizado para PWA</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalizedWelcomeHeader;
