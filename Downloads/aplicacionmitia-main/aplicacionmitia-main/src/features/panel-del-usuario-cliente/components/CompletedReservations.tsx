
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/Button';

interface Reservation {
  id: string;
  professionalName: string;
  date: string;
  status: 'Completada' | 'Pendiente' | 'Cancelada';
  isValued: boolean;
}

interface CompletedReservationsProps {
  reservations: Reservation[];
}

export const CompletedReservations: React.FC<CompletedReservationsProps> = ({ reservations }) => {
  const completedReservations = reservations.filter(
    (reservation) => reservation.status === 'Completada'
  );

  return (
    <div className="p-4 bg-card border border-border rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl">
      <h2 className="mb-4 text-xl font-bold text-text">Historial de Reservas</h2>
      {completedReservations.length > 0 ? (
        <ul className="space-y-4">
          {completedReservations.map((reservation) => (
            <li
              key={reservation.id}
              className="flex items-center justify-between p-4 bg-backgroundSecondary border border-borderLight rounded-lg transition-colors duration-200 hover:bg-surface"
            >
              <div>
                <p className="font-semibold text-text">{reservation.professionalName}</p>
                <p className="text-sm text-textSecondary">{reservation.date}</p>
              </div>
              <div>
                {reservation.isValued ? (
                  <span className="text-sm font-semibold text-success">
                    Valoración enviada
                  </span>
                ) : (
                  <Link to={`/valoracion/${reservation.id}`}>
                    <Button variant="primary">Valorar sesión</Button>
                  </Link>
                )}
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-textMuted">No tienes reservas completadas.</p>
      )}
    </div>
  );
};
