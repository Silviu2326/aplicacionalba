import React, { useEffect, useState } from 'react';
import { Button } from '@/components/Button';

interface OnlineSessionLinkProps {
  appointment: {
    date: string;
    url: string;
  };
}

const OnlineSessionLink: React.FC<OnlineSessionLinkProps> = ({ appointment }) => {
  const [countdown, setCountdown] = useState('');

  useEffect(() => {
    const calculateCountdown = () => {
      const now = new Date().getTime();
      const appointmentDate = new Date(appointment.date).getTime();
      const distance = appointmentDate - now;

      if (distance < 0) {
        setCountdown('La sesión ha comenzado.');
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setCountdown(`${days}d ${hours}h ${minutes}m ${seconds}s`);
    };

    const interval = setInterval(calculateCountdown, 1000);
    calculateCountdown();

    return () => clearInterval(interval);
  }, [appointment.date]);

  const appointmentDateTime = new Date(appointment.date);
  const formattedDate = appointmentDateTime.toLocaleDateString('es-ES', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  const formattedTime = appointmentDateTime.toLocaleTimeString('es-ES', {
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <div className="bg-gradient-surface border border-border rounded-lg p-6 text-center shadow-lg">
      <h3 className="text-xl font-bold text-accent mb-2">¡Tu sesión está confirmada!</h3>
      <p className="text-textSecondary mb-4">
        Tu próxima cita es el <span className="font-semibold text-primaryLight">{formattedDate}</span> a las{' '}
        <span className="font-semibold text-primaryLight">{formattedTime}</span>.
      </p>
      <div className="my-4">
        <p className="text-textMuted text-sm">Tiempo restante para tu sesión:</p>
        <p className="text-2xl font-bold text-text">{countdown}</p>
      </div>
      <Button
        variant="primary"
        onClick={() => window.open(appointment.url, '_blank')}
        className="w-full"
      >
        Unirse a la sesión online
      </Button>
    </div>
  );
};

export default OnlineSessionLink;
