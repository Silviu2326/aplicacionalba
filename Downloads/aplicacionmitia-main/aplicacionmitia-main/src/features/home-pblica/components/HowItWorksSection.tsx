
import React from 'react';
import StepCard from './StepCard';

const HowItWorksSection: React.FC = () => {
  const steps = [
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      ),
      title: '1. Busca',
      description: 'Encuentra profesionales de la salud mental filtrando por especialidad, ubicación y disponibilidad.',
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
        </svg>
      ),
      title: '2. Elige',
      description: 'Revisa perfiles detallados, valoraciones de otros pacientes y elige al terapeuta que mejor se adapte a ti.',
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
      title: '3. Reserva',
      description: 'Agenda tu sesión de forma segura y confidencial, ya sea online o presencial, con total flexibilidad.',
    },
  ];

  return (
    <section className="py-12 bg-backgroundSecondary sm:py-16 lg:py-20">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-text sm:text-4xl">
            ¿Cómo funciona TheraFlow?
          </h2>
          <p className="mt-4 text-base md:text-lg text-textSecondary">
            Tu camino hacia el bienestar en solo tres simples pasos.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-8 mt-12 sm:grid-cols-2 lg:grid-cols-3">
          {steps.map((step, index) => (
            <StepCard
              key={index}
              icon={step.icon}
              title={step.title}
              description={step.description}
            />
          ))}
        </div>
        <div className="mt-12 text-center">
          <a
            href="/search"
            className="inline-block px-8 py-3 font-bold text-textInverse bg-primary rounded-lg hover:bg-primaryHover transition-colors duration-300 min-w-[44px] min-h-[44px]"
          >
            Buscar profesionales
          </a>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
