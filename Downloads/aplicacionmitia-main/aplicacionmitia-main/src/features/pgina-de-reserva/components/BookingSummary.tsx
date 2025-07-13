// src/features/pgina-de-reserva/components/BookingSummary.tsx
import React from 'react';
import { MapPin, Video } from 'lucide-react';

type Modality = 'Presencial' | 'Online';

interface BookingSummaryProps {
  modality: Modality;
  address?: string;
}

const BookingSummary: React.FC<BookingSummaryProps> = ({ modality, address }) => {
  const googleMapsUrl = address ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}` : '';

  return (
    <div className="bg-card p-6 rounded-lg shadow-lg border border-borderLight w-full max-w-md">
      <h3 className="text-xl font-bold text-text mb-4">Resumen de la Cita</h3>
      <div className="space-y-4">
        {modality === 'Presencial' && (
          <div className="bg-surface p-4 rounded-md">
            <h4 className="font-semibold text-textSecondary flex items-center">
              <MapPin className="w-5 h-5 mr-2 text-primary" />
              Consulta Presencial
            </h4>
            {address ? (
              <>
                <p className="text-textMuted mt-2">{address}</p>
                <a
                  href={googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:text-primaryHover transition-colors duration-200 mt-2 inline-block"
                >
                  Ver en Google Maps
                </a>
              </>
            ) : (
              <p className="text-textMuted mt-2">La dirección no está disponible.</p>
            )}
          </div>
        )}

        {modality === 'Online' && (
          <div className="bg-surface p-4 rounded-md">
            <h4 className="font-semibold text-textSecondary flex items-center">
              <Video className="w-5 h-5 mr-2 text-secondary" />
              Consulta Online
            </h4>
            <p className="text-textMuted mt-2">
              El enlace para la videollamada se proporcionará en tu panel de usuario y se enviará a tu correo electrónico una vez confirmada la reserva.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingSummary;