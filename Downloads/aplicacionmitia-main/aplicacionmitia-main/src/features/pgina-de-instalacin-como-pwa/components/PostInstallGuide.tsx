
import React from 'react';
import { Button } from '@/components/Button';
import { FiArrowRight, FiBell, FiUser, FiCheckCircle, FiStar } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const PostInstallGuide: React.FC = () => {
  const openApp = () => {
    // This is a placeholder function.
    // In a real PWA, you might want to simply close the guide
    // or navigate to the main page of the app.
    window.location.href = '/';
  };

  return (
    <div className="relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-success/30 via-accent/20 to-primary/30 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-secondary/30 via-info/20 to-warning/30 rounded-full blur-lg animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-gradient-to-r from-primary/10 via-accent/10 to-success/10 rounded-full blur-2xl animate-spin-slow"></div>
      </div>

      {/* Main content */}
      <div className="relative backdrop-blur-sm bg-white/10 border border-white/20 rounded-3xl p-8 shadow-2xl animate-fade-in-up">
        {/* Success icon and title */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-success to-accent shadow-lg mb-4 transform hover:scale-110 transition-all duration-300">
            <div className="absolute inset-0 rounded-full bg-white/20 backdrop-blur-sm"></div>
            <FiCheckCircle size={40} className="relative z-10 text-white drop-shadow-lg" />
            
            {/* Floating particles */}
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-white/60 rounded-full animate-bounce delay-300"></div>
            <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-white/40 rounded-full animate-bounce delay-700"></div>
          </div>
          
          <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-success to-accent bg-clip-text text-transparent drop-shadow-sm">
            ¡Instalación Completa!
          </h2>
          <p className="text-textSecondary text-lg leading-relaxed max-w-md mx-auto">
            ¡Gracias por instalar TheraFlow! Aquí tienes algunos pasos para empezar:
          </p>
        </div>

        {/* Action cards */}
        <div className="space-y-4 mb-8">
          {/* Notifications card */}
          <div className="group relative overflow-hidden backdrop-blur-sm bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 transform hover:scale-[1.02] hover:shadow-xl">
            <div className="absolute inset-0 bg-gradient-to-r from-warning/5 via-accent/5 to-success/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            
            <div className="relative flex items-center">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-warning to-accent flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-all duration-300">
                <FiBell size={24} className="text-white drop-shadow-sm" />
              </div>
              
              <div className="ml-4 flex-1">
                <h3 className="font-semibold text-lg text-text mb-1">Activa las notificaciones</h3>
                <p className="text-textSecondary text-sm leading-relaxed">
                  Recibe recordatorios de tus citas y mensajes importantes.
                </p>
              </div>
              
              <Button 
                variant="secondary" 
                className="ml-4 bg-gradient-to-r from-warning to-accent hover:from-accent hover:to-warning text-white border-none shadow-lg transform hover:scale-105 transition-all duration-300"
              >
                Activar
              </Button>
            </div>
          </div>

          {/* User panel card */}
          <div className="group relative overflow-hidden backdrop-blur-sm bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 transform hover:scale-[1.02] hover:shadow-xl">
            <div className="absolute inset-0 bg-gradient-to-r from-secondary/5 via-primary/5 to-info/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            
            <div className="relative flex items-center">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-secondary to-primary flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-all duration-300">
                <FiUser size={24} className="text-white drop-shadow-sm" />
              </div>
              
              <div className="ml-4 flex-1">
                <h3 className="font-semibold text-lg text-text mb-1">Accede a tu panel</h3>
                <p className="text-textSecondary text-sm leading-relaxed">
                  Consulta tu historial de citas y gestiona tu perfil.
                </p>
              </div>
              
              <Link to="/panel-usuario" className="ml-4">
                <Button 
                  variant="secondary"
                  className="bg-gradient-to-r from-secondary to-primary hover:from-primary hover:to-secondary text-white border-none shadow-lg transform hover:scale-105 transition-all duration-300"
                >
                  Ir al Panel
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Main action button */}
        <div className="text-center">
          <Button 
            onClick={openApp} 
            variant="primary" 
            className="group relative overflow-hidden bg-gradient-to-r from-primary via-accent to-success hover:from-success hover:via-accent hover:to-primary text-white font-semibold px-8 py-4 rounded-full shadow-xl transform hover:scale-105 transition-all duration-300 border-none"
          >
            <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <span className="relative z-10 flex items-center gap-3">
              <FiStar className="animate-pulse" />
              Abrir App
              <FiArrowRight className="transition-transform group-hover:translate-x-1" />
            </span>
          </Button>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-4 right-4 w-2 h-2 bg-accent/60 rounded-full animate-pulse"></div>
        <div className="absolute bottom-4 left-4 w-1.5 h-1.5 bg-success/60 rounded-full animate-pulse delay-500"></div>
      </div>
    </div>
  );
};

export default PostInstallGuide;
