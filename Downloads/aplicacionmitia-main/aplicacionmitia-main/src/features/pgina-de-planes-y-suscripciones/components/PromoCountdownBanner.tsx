import { useState, useEffect } from 'react';

interface PromoCountdownBannerProps {
  endDate: string;
  title: string;
  discount: string;
}

const PromoCountdownBanner = ({ endDate, title, discount }: PromoCountdownBannerProps) => {
  const calculateTimeLeft = () => {
    const difference = +new Date(endDate) - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        días: Math.floor(difference / (1000 * 60 * 60 * 24)),
        horas: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutos: Math.floor((difference / 1000 / 60) % 60),
        segundos: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  const [isLessThan24Hours, setIsLessThan24Hours] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      const newTimeLeft = calculateTimeLeft();
      setTimeLeft(newTimeLeft);

      if (Object.keys(newTimeLeft).length === 0) {
        clearInterval(timer);
      }

      const difference = +new Date(endDate) - +new Date();
      if (difference < 24 * 60 * 60 * 1000) {
        setIsLessThan24Hours(true);
      }

    }, 1000);

    return () => clearInterval(timer);
  }, [endDate]);

  const timerComponents = Object.keys(timeLeft).map((interval) => {
    if (!timeLeft[interval as keyof typeof timeLeft]) {
      return null;
    }

    return (
      <div key={interval} className="text-center group">
        <div className={`relative bg-surface/20 backdrop-blur-sm rounded-2xl p-4 border border-white/20 transition-all duration-300 group-hover:scale-110 ${
          isLessThan24Hours ? 'animate-pulse' : ''
        }`}>
          <div className="text-4xl md:text-5xl font-extrabold text-textInverse mb-2">
            {String(timeLeft[interval as keyof typeof timeLeft]).padStart(2, '0')}
          </div>
          <div className="text-sm md:text-base uppercase font-semibold text-textInverse/80 tracking-wider">
            {interval}
          </div>
          {isLessThan24Hours && (
            <div className="absolute inset-0 bg-warning/20 rounded-2xl animate-pulse"></div>
          )}
        </div>
      </div>
    );
  });

  if (Object.keys(timeLeft).length === 0) {
    return null;
  }

  const bannerClass = isLessThan24Hours
    ? 'bg-gradient-to-br from-warning via-warningDark to-error'
    : 'bg-gradient-to-br from-primary via-accent to-secondary';

  return (
    <div 
      className={`relative overflow-hidden rounded-3xl shadow-2xl text-center transition-all duration-500 transform hover:scale-105 ${bannerClass}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-0 w-32 h-32 bg-white rounded-full -translate-x-16 -translate-y-16 animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-24 h-24 bg-white rounded-full translate-x-12 translate-y-12 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-16 h-16 bg-white rounded-full -translate-x-8 -translate-y-8 animate-pulse delay-500"></div>
      </div>
      
      <div className="relative z-10 p-8 md:p-12">
        <div className="mb-8">
          <div className="inline-flex items-center bg-white/20 backdrop-blur-sm rounded-full px-6 py-2 mb-4">
            <span className="text-2xl mr-2">🔥</span>
            <span className="text-textInverse font-bold text-sm uppercase tracking-wider">
              {isLessThan24Hours ? '¡ÚLTIMAS HORAS!' : 'OFERTA LIMITADA'}
            </span>
          </div>
          
          <h2 className="text-3xl md:text-5xl font-extrabold text-textInverse mb-4 leading-tight">
            {title}
          </h2>
          
          <p className="text-lg md:text-2xl text-textInverse/90 max-w-3xl mx-auto leading-relaxed">
            {discount}
          </p>
        </div>
        
        <div className="mb-8">
          <p className="text-textInverse/80 text-lg font-semibold mb-6">
            {isLessThan24Hours ? '⏰ ¡La oferta termina pronto!' : '⏳ Tiempo restante:'}
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
            {timerComponents}
          </div>
        </div>
        
        <button 
          className={`group relative bg-white text-primary font-bold py-4 px-8 md:px-12 rounded-2xl transition-all duration-300 transform hover:scale-110 hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-white/50 ${
            isHovered ? 'shadow-2xl' : 'shadow-lg'
          }`}
        >
          <span className="relative z-10 text-lg md:text-xl flex items-center justify-center">
            <span className="mr-2">🚀</span>
            ¡Aprovechar Oferta Ahora!
            <svg className="w-6 h-6 ml-2 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </span>
          <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent opacity-0 group-hover:opacity-20 rounded-2xl transition-opacity duration-300"></div>
        </button>
        
        <p className="text-textInverse/70 text-sm mt-4">
          💳 Sin compromisos • Cancela cuando quieras
        </p>
      </div>
    </div>
  );
};

export default PromoCountdownBanner;
