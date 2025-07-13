import React, { useState } from 'react';
import { FaVideo, FaEdit, FaTrash, FaEye, FaCalendarAlt, FaClock } from 'react-icons/fa';
import Table from '../../../components/Table';
import { Button } from '../../../components/Button';
import AddVideoLinkModal from './AddVideoLinkModal';

const ReservationsTable = ({ reservations, filter, setFilter, loading, setReservations }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedReservationId, setSelectedReservationId] = useState(null);
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [selectedReservation, setSelectedReservation] = useState(null);
  const [videoLink, setVideoLink] = useState('');

  const statusConfig = {
    confirmed: {
      gradient: 'from-success to-successLight',
      glow: 'from-success/20 to-successLight/20',
      text: 'Confirmada',
      icon: (
        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
        </svg>
      )
    },
    pending: {
      gradient: 'from-warning to-warningLight',
      glow: 'from-warning/20 to-warningLight/20',
      text: 'Pendiente',
      icon: (
        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
        </svg>
      )
    },
    cancelled: {
      gradient: 'from-error to-errorLight',
      glow: 'from-error/20 to-errorLight/20',
      text: 'Cancelada',
      icon: (
        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
      )
    },
    completed: {
      gradient: 'from-info to-infoLight',
      glow: 'from-info/20 to-infoLight/20',
      text: 'Completada',
      icon: (
        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
        </svg>
      )
    },
  };

  const columns = [
    { key: 'clientName', label: 'Cliente' },
    { key: 'date', label: 'Fecha y Hora' },
    { key: 'status', label: 'Estado' },
    { key: 'videoLink', label: 'Enlace Videollamada' },
    { key: 'actions', label: 'Acciones' },
  ];

  const handleAddLink = (bookingId) => {
    setSelectedReservationId(bookingId);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedReservationId(null);
  };

  const handleSaveVideoLink = async (bookingId, url) => {
    // This should be in api.ts and handled by a custom hook,
    // but due to restrictions, it's here.
    try {
      // NOTE: This is a placeholder for the actual API call.
      // You would replace this with a fetch to your backend endpoint.
      console.log(`Saving video link for reservation ${bookingId}: ${url}`);

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));

      const updatedReservations = reservations.map((res) =>
        res.id === bookingId ? { ...res, videoLink: url } : res
      );
      if(setReservations) {
        setReservations(updatedReservations);
      }

    } catch (error) {
      console.error(error);
      // Here you would handle the error, maybe show a notification
    }
    handleCloseModal();
  };

  const handleAddVideoLink = (reservation) => {
    setSelectedReservation(reservation);
    setVideoLink(reservation.videoLink || '');
    setShowVideoModal(true);
  };

  const handleSaveVideoLinkModal = () => {
    // Aquí iría la lógica para guardar el enlace de video
    console.log('Guardando enlace de video:', videoLink);
    setShowVideoModal(false);
    setSelectedReservation(null);
    setVideoLink('');
  };

  const renderRowActions = (booking) => {
    if (filter === 'upcoming') {
      return (
        <Button onClick={() => handleAddLink(booking.id)} variant="primary" >
          {booking.videoLink ? 'Editar enlace' : 'Añadir enlace'}
        </Button>
      );
    }
    return null;
  };

  const data = reservations.map((booking) => ({
    ...booking,
    videoLink: booking.videoLink ? (
      <a 
        href={booking.videoLink} 
        target="_blank" 
        rel="noopener noreferrer" 
        className="inline-flex items-center text-primary hover:text-primaryHover transition-colors duration-200 font-medium"
      >
        <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
          <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
        </svg>
        Unirse a la sesión
      </a>
    ) : (
      <span className="text-textMuted text-sm">No asignado</span>
    ),
    actions: renderRowActions(booking),
  }));

  if (loading) {
    return (
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-surface/80 to-card/60 backdrop-blur-xl rounded-2xl border border-borderLight/50 shadow-xl"></div>
        <div className="relative p-6">
          <div className="animate-pulse space-y-4">
            <div className="flex items-center justify-between mb-6">
              <div className="h-8 bg-gradient-to-r from-backgroundSecondary/60 to-surface/40 rounded-lg w-48"></div>
              <div className="h-10 bg-gradient-to-r from-primary/20 to-accent/20 rounded-xl w-32"></div>
            </div>
            <div className="space-y-3">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="h-16 bg-gradient-to-r from-backgroundSecondary/40 to-surface/30 rounded-xl"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      {/* Header modernizado */}
      <div className="p-6 border-b border-borderLight/30">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent rounded-xl blur opacity-50 animate-pulse"></div>
              <div className="relative w-12 h-12 bg-gradient-to-r from-primary to-accent rounded-xl flex items-center justify-center shadow-lg">
                <FaCalendarAlt className="text-textInverse text-xl" />
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-text to-primaryLight bg-clip-text text-transparent">Mis Reservas</h2>
              <p className="text-textSecondary text-sm">Gestiona tus sesiones programadas</p>
            </div>
          </div>
          
          {/* Filtros modernizados */}
          <div className="flex flex-wrap gap-2">
            <Button
              onClick={() => setFilter('upcoming')}
              variant={filter === 'upcoming' ? 'primary' : 'secondary'}
              className="text-sm px-4 py-2 bg-gradient-to-r from-primary/20 to-accent/20 backdrop-blur-sm border border-primary/30 hover:from-primary hover:to-accent transition-all duration-300"
            >
              <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
              </svg>
              Próximas
            </Button>
            <Button
              onClick={() => setFilter('past')}
              variant={filter === 'past' ? 'primary' : 'secondary'}
              className="text-sm px-4 py-2 bg-gradient-to-r from-info/20 to-infoLight/20 backdrop-blur-sm border border-info/30 hover:from-info hover:to-infoLight transition-all duration-300"
            >
              <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z" clipRule="evenodd" />
              </svg>
              Pasadas
            </Button>
            <Button
              onClick={() => setFilter('cancelled')}
              variant={filter === 'cancelled' ? 'primary' : 'secondary'}
              className="text-sm px-4 py-2 bg-gradient-to-r from-error/20 to-errorLight/20 backdrop-blur-sm border border-error/30 hover:from-error hover:to-errorLight transition-all duration-300"
            >
              <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
              Canceladas
            </Button>
          </div>
        </div>
      </div>
      
      <div className="p-6">
        <div className="bg-gradient-to-r from-backgroundSecondary/60 to-surface/40 backdrop-blur-sm rounded-2xl border border-borderLight/30 p-1 mb-4">
          <Table columns={columns} data={data} loading={loading} />
        </div>
      </div>
      
      <AddVideoLinkModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleSaveVideoLink}
        reservationId={selectedReservationId}
      />

      {/* Modal modernizado para agregar/editar enlace de video */}
      {showVideoModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="relative">
            {/* Efecto de resplandor del modal */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 rounded-2xl blur-xl"></div>
            
            {/* Contenido del modal */}
            <div className="relative bg-gradient-to-br from-surface/95 to-card/90 backdrop-blur-xl rounded-2xl border border-borderLight/50 shadow-2xl max-w-md w-full p-6">
              {/* Header del modal */}
              <div className="flex items-center mb-6">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent rounded-xl blur opacity-50"></div>
                  <div className="relative w-10 h-10 bg-gradient-to-r from-primary to-accent rounded-xl flex items-center justify-center">
                    <FaVideo className="text-textInverse" />
                  </div>
                </div>
                <div className="ml-3">
                  <h3 className="text-lg font-bold bg-gradient-to-r from-text to-primaryLight bg-clip-text text-transparent">
                    {selectedReservation?.videoLink ? 'Editar' : 'Agregar'} Enlace de Video
                  </h3>
                  <p className="text-textSecondary text-sm">Para {selectedReservation?.clientName}</p>
                </div>
              </div>
              
              {/* Campo de entrada */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-textSecondary mb-3">
                  Enlace de la sesión de video
                </label>
                <div className="relative">
                  <input
                    type="url"
                    value={videoLink}
                    onChange={(e) => setVideoLink(e.target.value)}
                    placeholder="https://meet.google.com/..."
                    className="w-full px-4 py-3 bg-gradient-to-r from-backgroundSecondary/60 to-surface/40 backdrop-blur-sm border border-borderLight/50 rounded-xl text-text placeholder-textMuted focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all duration-300"
                  />
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary/5 to-accent/5 opacity-0 focus-within:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                </div>
              </div>
              
              {/* Botones de acción */}
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setShowVideoModal(false)}
                  className="px-6 py-3 bg-gradient-to-r from-backgroundSecondary/60 to-surface/40 backdrop-blur-sm border border-borderLight/50 rounded-xl text-textSecondary font-medium hover:text-text hover:border-borderLight transition-all duration-300"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleSaveVideoLinkModal}
                  className="group/save relative overflow-hidden px-6 py-3 rounded-xl font-semibold"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent rounded-xl blur opacity-50 group-hover/save:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative bg-gradient-to-r from-primary to-accent text-textInverse rounded-xl px-6 py-3 transform group-hover/save:scale-105 transition-transform duration-300">
                    Guardar
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReservationsTable;
