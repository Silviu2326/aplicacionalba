import React from 'react';
import { Button } from '../../components/Button';
import { usePaginadeInstalacioncomoPWA } from './hooks/usePaginadeInstalacioncomoPWA';
import InstallationRewardCard from './components/InstallationRewardCard';
import PersonalizedWelcomeHeader from './components/PersonalizedWelcomeHeader';
import { FeaturePreview } from './components/FeaturePreview';
import PostInstallGuide from './components/PostInstallGuide';
import AppTestimonialCard from './components/AppTestimonialCard';
import RoleBasedBenefits from './components/RoleBasedBenefits';
import DeviceFrame from './components/DeviceFrame';
import InteractivePWADemo from './components/InteractivePWADemo';
import PerformanceMetric from './components/PerformanceMetric';
import { FiZap, FiSave, FiSmartphone, FiDownload, FiStar, FiArrowDown } from 'react-icons/fi';

const testimonials = [
  {
    quote: "¡Es súper rápida! Puedo agendar una cita en segundos, mucho más ágil que la web.",
    author: "Ana Pérez",
    rating: 5,
  },
  {
    quote: "Me encantan los recordatorios de citas directamente en mi móvil. ¡Ya no me olvido de ninguna sesión!",
    author: "Carlos González",
    rating: 5,
  },
  {
    quote: "Tener el acceso directo en mi pantalla de inicio es un cambio total. Entro y salgo sin complicaciones.",
    author: "Sofía Rodríguez",
    rating: 4,
  },
];

const performanceMetrics = [
    {
      icon: FiZap,
      value: '2x',
      description: 'Más Rápido',
      tooltip: 'La PWA precarga recursos, resultando en una carga casi instantánea.',
    },
    {
      icon: FiSave,
      value: '80%',
      description: 'Menos Datos',
      tooltip: 'Usa datos solo para contenido nuevo, ahorrando en tu plan móvil.',
    },
    {
      icon: FiSmartphone,
      value: 'Directo',
      description: 'Acceso Instantáneo',
      tooltip: 'Inicia la app desde tu pantalla de inicio, sin abrir el navegador.',
    },
  ];

const PaginadeInstalacioncomoPWAPage: React.FC = () => {
  const {
    isPWAInstalled,
    canInstall,
    showInstallPrompt,
    role,
  } = usePaginadeInstalacioncomoPWA();

  const showRewardCard = role === 'client' && !isPWAInstalled;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-surface to-background relative overflow-hidden">
      {/* Elementos decorativos de fondo */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 blur-3xl"></div>
      <div className="absolute top-20 right-20 w-96 h-96 bg-gradient-to-r from-primary/10 to-accent/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 left-20 w-80 h-80 bg-gradient-to-r from-secondary/10 to-info/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-accent/5 to-warning/5 rounded-full blur-3xl animate-pulse delay-2000"></div>
      
      {/* Partículas flotantes */}
      <div className="absolute top-32 left-32 w-2 h-2 bg-primary rounded-full animate-bounce opacity-60"></div>
      <div className="absolute top-48 right-48 w-1 h-1 bg-accent rounded-full animate-ping opacity-40"></div>
      <div className="absolute bottom-32 right-32 w-3 h-3 bg-secondary rounded-full animate-pulse opacity-50"></div>
      <div className="absolute bottom-48 left-48 w-1.5 h-1.5 bg-warning rounded-full animate-bounce delay-500 opacity-30"></div>
      
      <div className="relative z-10 min-h-screen p-4 sm:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto space-y-16">
          {/* Header Section */}
          <section className="pt-8">
            <PersonalizedWelcomeHeader
              userName="Usuario"
              isProfessional={role === 'professional'}
            />
          </section>

          {isPWAInstalled ? (
            <section>
              <PostInstallGuide />
            </section>
          ) : (
            <>
              {/* Installation Section */}
              <section className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 rounded-3xl blur-xl"></div>
                <div className="relative bg-gradient-to-br from-surface/90 via-card/90 to-surface/90 backdrop-blur-xl rounded-3xl p-8 lg:p-12 border border-borderLight/50 shadow-2xl">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-secondary to-accent rounded-t-3xl"></div>
                  
                  <div className="text-center">
                    <div className="flex justify-center mb-8">
                      <div className="relative">
                        <div className="w-20 h-20 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center shadow-2xl transform hover:scale-110 transition-transform duration-300">
                          <FiDownload className="w-10 h-10 text-textInverse" />
                        </div>
                        <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-accent to-warning rounded-full animate-ping"></div>
                      </div>
                    </div>
                    
                    <h2 className="text-4xl font-black bg-gradient-to-r from-text via-primary to-secondary bg-clip-text text-transparent mb-6">
                      Instalar Aplicación PWA
                    </h2>
                    <p className="text-xl text-textSecondary max-w-3xl mx-auto leading-relaxed mb-8">
                      Instala nuestra aplicación en tu dispositivo para una experiencia{' '}
                      <span className="font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                        más rápida y fluida
                      </span>
                      . Acceso directo desde tu pantalla de inicio.
                    </p>

                    {canInstall ? (
                      <div className="space-y-4">
                        <Button 
                          onClick={showInstallPrompt} 
                          variant="primary"
                          className="px-8 py-4 text-lg font-semibold bg-gradient-to-r from-primary to-secondary hover:from-primaryDark hover:to-secondaryDark transform hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl"
                        >
                          <FiDownload className="w-5 h-5 mr-2" />
                          Instalar Ahora
                        </Button>
                        
                        <div className="flex justify-center items-center mt-6 space-x-6 text-sm text-textMuted">
                          <div className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                            <span>Instalación segura</span>
                          </div>
                          <div className="w-1 h-4 bg-borderLight rounded-full"></div>
                          <div className="flex items-center space-x-2">
                            <FiZap className="w-4 h-4 text-accent" />
                            <span>Acceso instantáneo</span>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="bg-gradient-to-r from-warning/10 to-accent/10 border border-warning/30 rounded-2xl p-6">
                        <div className="flex items-center justify-center mb-3">
                          <div className="w-3 h-3 bg-gradient-to-r from-warning to-accent rounded-full animate-pulse mr-3"></div>
                          <span className="text-sm font-semibold text-warning uppercase tracking-wider">Estado de Instalación</span>
                        </div>
                        <p className="text-lg font-medium text-text">
                          La aplicación ya está instalada o no es compatible con tu navegador.
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </section>

              {/* Reward Card Section */}
              {showRewardCard && (
                <section>
                  <InstallationRewardCard isRewardApplied={false} />
                </section>
              )}

              {/* Performance Metrics Section */}
              <section>
                <div className="text-center mb-12">
                  <h2 className="text-4xl font-black bg-gradient-to-r from-text via-primary to-secondary bg-clip-text text-transparent mb-4">
                    Beneficios Técnicos de la App
                  </h2>
                  <p className="text-xl text-textSecondary max-w-3xl mx-auto leading-relaxed">
                    Descubre por qué nuestra PWA ofrece una experiencia superior
                  </p>
                  
                  {/* Indicador de scroll */}
                  <div className="flex justify-center mt-8">
                    <FiArrowDown className="w-6 h-6 text-accent animate-bounce" />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {performanceMetrics.map((metric, index) => (
                    <PerformanceMetric
                      key={index}
                      icon={metric.icon}
                      value={metric.value}
                      description={metric.description}
                      tooltip={metric.tooltip}
                    />
                  ))}
                </div>
              </section>

              {/* Role-Based Benefits Section */}
              <section>
                <div className="text-center mb-12">
                  <h2 className="text-4xl font-black bg-gradient-to-r from-text via-primary to-secondary bg-clip-text text-transparent mb-4">
                    Diseñado para Ti
                  </h2>
                  <p className="text-xl text-textSecondary max-w-3xl mx-auto leading-relaxed">
                    Beneficios específicos según tu rol en la plataforma
                  </p>
                </div>
                <RoleBasedBenefits role={role} />
              </section>

              {/* Feature Preview Section */}
              <section>
                <FeaturePreview />
              </section>

              {/* Interactive Demo Section */}
              <section>
                <div className="text-center mb-12">
                  <h2 className="text-4xl font-black bg-gradient-to-r from-text via-primary to-secondary bg-clip-text text-transparent mb-4">
                    Prueba la App Antes de Instalar
                  </h2>
                  <p className="text-xl text-textSecondary max-w-3xl mx-auto leading-relaxed mb-8">
                    Interactúa con esta demo para ver cómo funciona nuestro{' '}
                    <span className="font-bold bg-gradient-to-r from-accent to-warning bg-clip-text text-transparent">
                      chat seguro
                    </span>
                    .
                  </p>
                  
                  <div className="flex justify-center items-center space-x-6 text-sm text-textMuted mb-8">
                    <div className="flex items-center space-x-2">
                      <FiStar className="w-4 h-4 text-warning" />
                      <span>Demo interactiva</span>
                    </div>
                    <div className="w-1 h-4 bg-borderLight rounded-full"></div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                      <span>Funcionalidad real</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-center">
                  <DeviceFrame>
                    <InteractivePWADemo />
                  </DeviceFrame>
                </div>
              </section>
            </>
          )}

          {/* Testimonials Section */}
          <section>
            <div className="text-center mb-12">
              <h2 className="text-4xl font-black bg-gradient-to-r from-text via-primary to-secondary bg-clip-text text-transparent mb-4">
                Lo que dicen nuestros usuarios
              </h2>
              <p className="text-xl text-textSecondary max-w-3xl mx-auto leading-relaxed">
                Experiencias reales de quienes ya disfrutan de nuestra PWA
              </p>
              
              <div className="flex justify-center items-center space-x-2 mt-6">
                {[...Array(5)].map((_, i) => (
                  <FiStar key={i} className="w-5 h-5 text-warning fill-current" />
                ))}
                <span className="ml-3 text-lg font-semibold text-textMuted">4.8/5 valoración promedio</span>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <AppTestimonialCard
                  key={index}
                  quote={testimonial.quote}
                  author={testimonial.author}
                  rating={testimonial.rating}
                />
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PaginadeInstalacioncomoPWAPage;
