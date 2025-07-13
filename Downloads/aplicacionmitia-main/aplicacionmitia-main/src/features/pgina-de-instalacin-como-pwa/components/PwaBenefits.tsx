import React from 'react';

// Define el tipo para cada beneficio
interface Benefit {
  icon: React.ReactNode;
  title: string;
  description: string;
}

// Datos de los beneficios de la PWA
const benefitsData: Benefit[] = [
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-12 w-12 text-primary"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
        />
      </svg>
    ),
    title: 'Acceso Rápido',
    description: 'Accede a TheraFlow directamente desde tu pantalla de inicio, sin necesidad de abrir el navegador.',
  },
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-12 w-12 text-primary"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
        />
      </svg>
    ),
    title: 'Notificaciones Instantáneas',
    description: 'Recibe recordatorios de tus citas y mensajes importantes directamente en tu dispositivo.',
  },
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-12 w-12 text-primary"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M13 10V3L4 14h7v7l9-11h-7z"
        />
      </svg>
    ),
    title: 'Rendimiento Mejorado',
    description: 'Disfruta de una experiencia más rápida y fluida, optimizada para tu dispositivo.',
  },
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-12 w-12 text-primary"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M5.636 18.364a9 9 0 010-12.728m12.728 0a9 9 0 010 12.728m-9.9-2.829a5 5 0 010-7.07m7.072 0a5 5 0 010 7.07M15 12a3 3 0 11-6 0 3 3 0 016 0z"
        />
      </svg>
    ),
    title: 'Acceso Offline',
    description: 'Consulta tus próximas citas e información importante incluso sin conexión a internet.',
  },
];

const PwaBenefits: React.FC = () => {
  return (
    <section className="py-12 bg-backgroundSecondary sm:py-16 lg:py-20">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-text sm:text-4xl">
            Ventajas de Instalar TheraFlow
          </h2>
          <p className="mt-4 text-lg text-textMuted">
            Lleva tu bienestar al siguiente nivel con nuestra aplicación web progresiva.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-8 mt-12 text-center sm:grid-cols-2 lg:grid-cols-4">
          {benefitsData.map((benefit, index) => (
            <div key={index} className="p-8 transition-transform duration-300 transform bg-card rounded-xl hover:scale-105 hover:shadow-lg">
              <div className="flex items-center justify-center mx-auto bg-surface rounded-full h-22 w-22">
                {benefit.icon}
              </div>
              <h3 className="mt-6 text-xl font-bold text-text">{benefit.title}</h3>
              <p className="mt-2 text-base text-textSecondary">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PwaBenefits;
