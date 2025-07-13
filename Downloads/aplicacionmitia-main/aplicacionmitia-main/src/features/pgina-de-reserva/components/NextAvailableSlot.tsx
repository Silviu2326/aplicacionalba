// src/features/pgina-de-reserva/components/NextAvailableSlot.tsx
import React from 'react';

interface NextAvailableSlotProps {
  slot: Date | null;
  onBook: () => void;
}

const NextAvailableSlot: React.FC<NextAvailableSlotProps> = ({ slot, onBook }) => {
  if (!slot) {
    return (
      <div className="my-4 p-4 rounded-lg bg-backgroundSecondary text-center">
        <p className="text-lg font-semibold text-textSecondary">No hay citas próximas disponibles.</p>
      </div>
    );
  }

  const formattedDate = new Intl.DateTimeFormat('es-ES', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(slot);

  return (
    <div className="my-6 p-6 rounded-xl bg-gradient-primary shadow-lg text-white text-center">
      <h3 className="text-2xl font-bold mb-2">¿Con prisa? ¡Reserva tu próxima cita ahora!</h3>
      <p className="text-lg mb-4">
        Próxima cita disponible: <span className="font-bold tracking-wider">{formattedDate}</span>
      </p>
      <button
        onClick={onBook}
        className="bg-white text-primaryDark font-bold py-3 px-8 rounded-full hover:bg-primaryLight transform hover:scale-105 transition-all duration-300 ease-in-out shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white"
      >
        Reservar esta cita
      </button>
    </div>
  );
};

export default NextAvailableSlot;
