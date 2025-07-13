import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../../components/Button';

// Define the type for a single booking object
interface Booking {
  id_reserva: string;
  nombre_profesional: string;
  especialidad: string;
  fecha: string;
  hora: string;
  estado: 'Próxima' | 'Completada' | 'Cancelada';
  valorada: boolean; // Assuming there's a flag to check if a session has been reviewed
}

interface BookingRowProps {
  booking: Booking;
  onCancelClick: (booking: Booking) => void;
}

export const BookingRow: React.FC<BookingRowProps> = ({ booking, onCancelClick }) => {
  const navigate = useNavigate();

  const handleReview = () => {
    navigate(`/pagina-de-valoracion/${booking.id_reserva}`);
  };

  const isCancellationDisabled = () => {
    const now = new Date();
    const appointmentDate = new Date(`${booking.fecha}T${booking.hora}`);
    const diffHours = (appointmentDate.getTime() - now.getTime()) / (1000 * 60 * 60);
    return diffHours < 24;
  };

  return (
    <div className="flex items-center space-x-2">
      {booking.estado === 'Completada' && !booking.valorada && (
        <Button onClick={handleReview} variant="secondary">
          Dejar Valoración
        </Button>
      )}
      {booking.estado === 'Próxima' && (
        <Button onClick={() => onCancelClick(booking)} variant="danger" disabled={isCancellationDisabled()}>
          Cancelar Cita
        </Button>
      )}
    </div>
  );
};
