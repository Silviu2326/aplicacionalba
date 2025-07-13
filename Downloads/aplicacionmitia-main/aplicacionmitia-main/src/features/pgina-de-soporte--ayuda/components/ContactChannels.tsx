import React from 'react';

const MailIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);

const ChatIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
  </svg>
);

const ContactChannels = () => {
  const supportEmail = 'soporte@theraflow.com';

  return (
    <div className="bg-backgroundSecondary p-6 rounded-lg shadow-lg mt-8">
      <h3 className="text-2xl font-bold text-text mb-6 text-center">Otros Canales de Contacto</h3>
      <div className="grid md:grid-cols-2 gap-6">
        {/* Email Contact Card */}
        <div className="bg-card p-6 rounded-lg flex flex-col items-center text-center transform transition-transform hover:scale-105">
          <MailIcon />
          <h4 className="text-xl font-semibold text-text mt-4 mb-2">Correo Electrónico</h4>
          <p className="text-textMuted mb-4">
            Envíanos un email y te responderemos en menos de 24 horas.
          </p>
          <a
            href={`mailto:${supportEmail}`}
            className="inline-block bg-primary text-white font-bold py-2 px-4 rounded-lg hover:bg-primaryHover transition-colors"
          >
            Enviar Email
          </a>
        </div>

        {/* Live Chat Card */}
        <div className="bg-card p-6 rounded-lg flex flex-col items-center text-center transform transition-transform hover:scale-105">
          <ChatIcon />
          <h4 className="text-xl font-semibold text-text mt-4 mb-2">Chat en Vivo</h4>
          <p className="text-textMuted mb-4">
            Habla con nuestro equipo de soporte en tiempo real. (Próximamente)
          </p>
          <button
            disabled
            className="bg-secondary text-white font-bold py-2 px-4 rounded-lg cursor-not-allowed opacity-50"
          >
            Iniciar Chat
          </button>
        </div>
      </div>
      <div className="text-center mt-6">
        <p className="text-textMuted">Horario de atención: Lunes a Viernes de 9:00 a 18:00.</p>
      </div>
    </div>
  );
};

export default ContactChannels;
