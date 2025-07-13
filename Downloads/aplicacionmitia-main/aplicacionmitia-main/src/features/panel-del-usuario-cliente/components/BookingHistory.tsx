import React, { useState } from 'react';
import Table from '../../../components/Table';
import { Booking } from '../api';
import { BookingRow } from './BookingRow';
import CancellationModal from './CancellationModal';
import ViewSummaryButton from './ViewSummaryButton';
import { FaCalendarAlt, FaClock, FaUser, FaStar, FaEye, FaTimes, FaCheckCircle, FaHourglassHalf } from 'react-icons/fa';

interface BookingHistoryProps {
  bookings: Booking[];
  isLoading: boolean;
  onViewSummary: (summaryId: string) => void;
}

export const BookingHistory: React.FC<BookingHistoryProps> = ({ bookings, isLoading, onViewSummary }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);

  const handleOpenCancelModal = (booking: Booking) => {
    setSelectedBooking(booking);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedBooking(null);
    setIsModalOpen(false);
  };

  const handleConfirmCancel = async () => {
    if (!selectedBooking) return;

    // This should be handled by a function passed via props, 
    // to keep the component logic clean.
    console.log(`Simulating cancellation for booking ID: ${selectedBooking.id_reserva}`);

    // Optimistic update should be handled in the parent hook/state manager
    // For now, just closing the modal.
    handleCloseModal();
  };

  const upcomingBookings = bookings.filter(b => b.estado === 'Próxima');
  const pastBookings = bookings.filter(b => b.estado !== 'Próxima');

  const columns = [
    { Header: 'Profesional', accessor: 'nombre_profesional' },
    { Header: 'Especialidad', accessor: 'especialidad' },
    { Header: 'Fecha', accessor: 'fecha' },
    { Header: 'Hora', accessor: 'hora' },
    { Header: 'Estado', accessor: 'estado' },
    { Header: 'Acciones', accessor: 'acciones' },
  ];

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-40">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <FaCalendarAlt className="h-6 w-6 text-primary animate-pulse" />
          </div>
        </div>
      </div>
    );
  }

  const renderBookingRow = (booking: Booking, isUpcoming: boolean) => {
    return (
      <div className="flex items-center space-x-2">
        {isUpcoming && (
          <BookingRow booking={booking} onCancelClick={() => handleOpenCancelModal(booking)} />
        )}
        {booking.estado === 'Completada' && booking.hasSummary && booking.summaryId && (
          <ViewSummaryButton onClick={() => onViewSummary(booking.summaryId!)} />
        )}
        {booking.estado === 'Completada' && !booking.valorada && (
          <button className="bg-accent hover:bg-accentHover text-white font-bold py-2 px-4 rounded transition-colors duration-300">
            Valorar
          </button>
        )}
      </div>
    );
  };

  const renderBookingCard = (booking: Booking, isUpcoming: boolean) => {
    const getStatusIcon = (estado: string) => {
      switch (estado) {
        case 'Próxima':
          return <FaHourglassHalf className="h-4 w-4 text-warning" />;
        case 'Completada':
          return <FaCheckCircle className="h-4 w-4 text-success" />;
        case 'Cancelada':
          return <FaTimes className="h-4 w-4 text-error" />;
        default:
          return <FaClock className="h-4 w-4 text-textMuted" />;
      }
    };

    const getStatusColor = (estado: string) => {
      switch (estado) {
        case 'Próxima':
          return 'bg-warning/10 text-warning border-warning/20';
        case 'Completada':
          return 'bg-success/10 text-success border-success/20';
        case 'Cancelada':
          return 'bg-error/10 text-error border-error/20';
        default:
          return 'bg-textMuted/10 text-textMuted border-textMuted/20';
      }
    };

    return (
      <div key={booking.id_reserva} className="bg-gradient-surface rounded-2xl p-6 shadow-lg border border-borderLight hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center shadow-lg">
              <FaUser className="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-text">{booking.nombre_profesional}</h3>
              <p className="text-textMuted">{booking.especialidad}</p>
            </div>
          </div>
          <div className={`flex items-center space-x-2 px-3 py-1 rounded-lg border ${getStatusColor(booking.estado)}`}>
            {getStatusIcon(booking.estado)}
            <span className="text-sm font-medium">{booking.estado}</span>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-secondary/10 rounded-lg flex items-center justify-center">
              <FaCalendarAlt className="h-4 w-4 text-secondary" />
            </div>
            <div>
              <p className="text-xs text-textMuted">Fecha</p>
              <p className="font-medium text-text">{booking.fecha}</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-accent/10 rounded-lg flex items-center justify-center">
              <FaClock className="h-4 w-4 text-accent" />
            </div>
            <div>
              <p className="text-xs text-textMuted">Hora</p>
              <p className="font-medium text-text">{booking.hora}</p>
            </div>
          </div>
        </div>
        
        <div className="flex items-center justify-end space-x-3">
          {isUpcoming && (
            <button
              onClick={() => handleOpenCancelModal(booking)}
              className="flex items-center space-x-2 bg-error/10 hover:bg-error/20 text-error px-4 py-2 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 border border-error/20 hover:border-error/40"
            >
              <FaTimes className="h-4 w-4" />
              <span>Cancelar</span>
            </button>
          )}
          {booking.estado === 'Completada' && booking.hasSummary && booking.summaryId && (
            <button
              onClick={() => onViewSummary(booking.summaryId!)}
              className="flex items-center space-x-2 bg-info/10 hover:bg-info/20 text-info px-4 py-2 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 border border-info/20 hover:border-info/40"
            >
              <FaEye className="h-4 w-4" />
              <span>Ver Resumen</span>
            </button>
          )}
          {booking.estado === 'Completada' && !booking.valorada && (
            <button className="flex items-center space-x-2 bg-accent/10 hover:bg-accent/20 text-accent px-4 py-2 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 border border-accent/20 hover:border-accent/40">
              <FaStar className="h-4 w-4" />
              <span>Valorar</span>
            </button>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-8">
      {/* Próximas Sesiones */}
      <div>
        <div className="flex items-center space-x-4 mb-6">
          <div className="w-10 h-10 bg-gradient-to-r from-warning to-warningDark rounded-xl flex items-center justify-center shadow-lg">
            <FaHourglassHalf className="h-5 w-5 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-text">Próximas Sesiones</h2>
            <p className="text-textMuted">Gestiona tus citas programadas</p>
          </div>
        </div>
        
        {upcomingBookings.length === 0 ? (
          <div className="bg-gradient-surface rounded-2xl p-8 text-center shadow-lg border border-borderLight">
            <div className="w-16 h-16 bg-warning/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <FaCalendarAlt className="h-8 w-8 text-warning" />
            </div>
            <h3 className="text-lg font-semibold text-text mb-2">No tienes sesiones próximas</h3>
            <p className="text-textMuted">Programa una nueva cita para comenzar tu proceso terapéutico</p>
          </div>
        ) : (
          <div className="grid gap-4">
            {upcomingBookings.map(booking => renderBookingCard(booking, true))}
          </div>
        )}
      </div>

      {/* Sesiones Anteriores */}
      <div>
        <div className="flex items-center space-x-4 mb-6">
          <div className="w-10 h-10 bg-gradient-to-r from-success to-successDark rounded-xl flex items-center justify-center shadow-lg">
            <FaCheckCircle className="h-5 w-5 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-text">Sesiones Anteriores</h2>
            <p className="text-textMuted">Revisa tu historial de sesiones completadas</p>
          </div>
        </div>
        
        {pastBookings.length === 0 ? (
          <div className="bg-gradient-surface rounded-2xl p-8 text-center shadow-lg border border-borderLight">
            <div className="w-16 h-16 bg-success/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <FaCheckCircle className="h-8 w-8 text-success" />
            </div>
            <h3 className="text-lg font-semibold text-text mb-2">Aún no tienes sesiones completadas</h3>
            <p className="text-textMuted">Aquí aparecerán tus sesiones una vez que las hayas completado</p>
          </div>
        ) : (
          <div className="grid gap-4">
            {pastBookings.map(booking => renderBookingCard(booking, false))}
          </div>
        )}
      </div>

      {selectedBooking && (
        <CancellationModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onConfirm={handleConfirmCancel}
          policy="Las cancelaciones con menos de 24 horas de antelación no son reembolsables."
          isRefundable={true} // This should be calculated based on booking date
        />
      )}
    </div>
  );
};
