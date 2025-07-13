
import React, { useState } from 'react';
import { FiBell, FiBook, FiSmartphone, FiChevronLeft, FiChevronRight, FiPlay } from 'react-icons/fi';

const features = [
  {
    title: 'Notificaciones Push Instantáneas',
    description: 'Recibe recordatorios de citas y mensajes importantes directamente en tu dispositivo, incluso cuando no estés usando la app.',
    icon: FiBell,
    gradient: 'from-accent to-warning',
    bgGradient: 'from-accent/5 via-warning/5 to-success/5'
  },
  {
    title: 'Acceso Offline al Diario Personal',
    description: 'Escribe y consulta tus notas personales en cualquier momento, con o sin conexión a internet. Tu diario siempre contigo.',
    icon: FiBook,
    gradient: 'from-secondary to-info',
    bgGradient: 'from-secondary/5 via-info/5 to-primary/5'
  },
  {
    title: 'Acceso Rápido y Directo',
    description: 'Coloca TheraFlow en tu pantalla de inicio y accede a tus sesiones y herramientas con un solo toque, como una app nativa.',
    icon: FiSmartphone,
    gradient: 'from-primary to-secondary',
    bgGradient: 'from-primary/5 via-secondary/5 to-accent/5'
  },
];

export const FeaturePreview = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const goToPrevious = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? features.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const goToNext = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    const isLastSlide = currentIndex === features.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const currentFeature = features[currentIndex];
  const IconComponent = currentFeature.icon;

  return (
    <div className="relative w-full max-w-4xl mx-auto my-8 overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 opacity-30">
        <div className={`absolute top-0 left-0 w-32 h-32 bg-gradient-to-br ${currentFeature.bgGradient} rounded-full blur-xl animate-pulse`}></div>
        <div className={`absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-tl ${currentFeature.bgGradient} rounded-full blur-lg animate-pulse delay-1000`}></div>
        <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-gradient-to-r ${currentFeature.bgGradient} rounded-full blur-2xl opacity-20 animate-spin-slow`}></div>
      </div>

      {/* Main content */}
      <div className="relative backdrop-blur-sm bg-white/10 border border-white/20 rounded-3xl p-8 shadow-2xl">
        <div className="relative h-80 flex items-center justify-center">
          <div className={`w-full text-center transition-all duration-500 ease-in-out transform ${
            isAnimating ? 'scale-95 opacity-0' : 'scale-100 opacity-100'
          }`}>
            {/* Icon container with enhanced styling */}
            <div className="flex justify-center mb-6">
              <div className={`relative p-6 rounded-full bg-gradient-to-br ${currentFeature.gradient} shadow-lg transform transition-all duration-300 hover:scale-110 hover:rotate-3`}>
                <div className="absolute inset-0 rounded-full bg-white/20 backdrop-blur-sm"></div>
                <IconComponent size={64} className="relative z-10 text-white drop-shadow-lg" />
                
                {/* Floating particles around icon */}
                <div className="absolute -top-2 -right-2 w-3 h-3 bg-white/60 rounded-full animate-bounce delay-300"></div>
                <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-white/40 rounded-full animate-bounce delay-700"></div>
                <div className="absolute top-1/2 -right-3 w-1.5 h-1.5 bg-white/50 rounded-full animate-pulse"></div>
              </div>
            </div>
            
            {/* Title with gradient text */}
            <h3 className={`text-3xl font-bold mb-4 bg-gradient-to-r ${currentFeature.gradient} bg-clip-text text-transparent drop-shadow-sm`}>
              {currentFeature.title}
            </h3>
            
            {/* Description */}
            <p className="text-textSecondary text-lg leading-relaxed max-w-2xl mx-auto px-4">
              {currentFeature.description}
            </p>
          </div>
        </div>
        
        {/* Navigation controls */}
        <div className="flex justify-between items-center mt-8">
          {/* Previous button */}
          <button 
            onClick={goToPrevious}
            disabled={isAnimating}
            className="group flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary to-primaryHover hover:from-primaryHover hover:to-primary text-white font-semibold rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <FiChevronLeft className="transition-transform group-hover:-translate-x-1" />
            <span>Anterior</span>
          </button>
          
          {/* Dots indicator */}
          <div className="flex space-x-3">
            {features.map((_, index) => (
              <button 
                key={index} 
                onClick={() => {
                  if (!isAnimating && index !== currentIndex) {
                    setIsAnimating(true);
                    setCurrentIndex(index);
                    setTimeout(() => setIsAnimating(false), 500);
                  }
                }}
                className={`relative w-4 h-4 rounded-full transition-all duration-300 transform hover:scale-125 ${
                  currentIndex === index 
                    ? `bg-gradient-to-r ${currentFeature.gradient} shadow-lg` 
                    : 'bg-surface hover:bg-surfaceHover'
                }`}
              >
                {currentIndex === index && (
                  <div className={`absolute inset-0 rounded-full bg-gradient-to-r ${currentFeature.gradient} animate-ping opacity-75`}></div>
                )}
              </button>
            ))}
          </div>
          
          {/* Next button */}
          <button 
            onClick={goToNext}
            disabled={isAnimating}
            className="group flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary to-primaryHover hover:from-primaryHover hover:to-primary text-white font-semibold rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span>Siguiente</span>
            <FiChevronRight className="transition-transform group-hover:translate-x-1" />
          </button>
        </div>
        
        {/* Progress bar */}
        <div className="mt-6 w-full bg-surface/30 rounded-full h-2 overflow-hidden">
          <div 
            className={`h-full bg-gradient-to-r ${currentFeature.gradient} transition-all duration-500 ease-out rounded-full`}
            style={{ width: `${((currentIndex + 1) / features.length) * 100}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};
