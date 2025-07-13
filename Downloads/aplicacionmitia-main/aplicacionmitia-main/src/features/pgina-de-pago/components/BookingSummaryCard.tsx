
import React from 'react';

interface BookingDetails {
  professionalName: string;
  sessionDate: string;
}

interface BookingSummaryCardProps {
  bookingDetails: BookingDetails;
}

const BookingSummaryCard: React.FC<BookingSummaryCardProps> = ({ bookingDetails }) => {
  const { professionalName, sessionDate } = bookingDetails;
  const date = new Date(sessionDate);

  return (
    <div className="bg-surface p-6 rounded-2xl shadow-lg border border-borderLight transition-all duration-300 hover:shadow-xl hover:border-primary/50">
      <h3 className="text-xl font-bold text-text mb-6 flex items-center">
        <svg className="w-6 h-6 mr-3 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
        Resumen de tu Cita
      </h3>
      <div className="space-y-4">
        <div className="flex items-center">
          <div className="p-2 bg-primary/10 rounded-full mr-4">
            <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
          </div>
          <div>
            <p className="text-sm text-textMuted">Profesional</p>
            <p className="font-semibold text-textSecondary">{professionalName}</p>
          </div>
        </div>
        <div className="flex items-center">
          <div className="p-2 bg-primary/10 rounded-full mr-4">
            <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
          </div>
          <div>
            <p className="text-sm text-textMuted">Fecha y Hora</p>
            <p className="font-semibold text-textSecondary">{date.toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })} - {date.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingSummaryCard;
