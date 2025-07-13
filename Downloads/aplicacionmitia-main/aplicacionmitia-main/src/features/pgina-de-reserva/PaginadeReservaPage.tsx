import React, { useState } from 'react';
import { usePaginadeReserva } from './hooks/usePaginadeReserva';
import DateStep from './components/DateStep';
import TimeStep from './components/TimeStep';
import SummaryStep from './components/SummaryStep';
import CancelConfirmationModal from './components/CancelConfirmationModal';
// import BookingTimer from './components/BookingTimer';
import { Button } from '@/components/Button';
import { useNavigate, useParams } from 'react-router-dom';
import { RecurringSessionSelector } from './components/RecurringSessionSelector';
import { PromoCodeInput } from './components/PromoCodeInput';
import TimezoneNotice from './components/TimezoneNotice';
import PersonalNote from './components/PersonalNote';
import CancellationPolicyNotice from './components/CancellationPolicyNotice';
import AddToCalendar from './components/AddToCalendar';
import NextAvailableSlot from './components/NextAvailableSlot';

import PriceSummary from './components/PriceSummary';

const PaginadeReservaPage: React.FC = () => {
  const { professionalId } = useParams<{ professionalId: string }>();
  const {
    step,
    nextStep,
    prevStep,
    reset,
    selectedDate,
    setSelectedDate,
    selectedTime,
    setSelectedTime,
    modality,
    setModality,
    personalNote,
    setPersonalNote,
    handleRecurringChange,
    promoCode,
    promoError,
    discount,
    originalPrice,
    finalPrice,
    handleApplyPromoCode,
    handleRemovePromoCode,
    expirationTime,
    handleTimerExpire,
    handleExtendTimer,
    canExtend,
    confirmBooking,
    nextAvailableSlot,
    formData,
    setFormData,
    isAuthenticated,
    user,
  } = usePaginadeReserva(professionalId || '');
  const [isCancelModalOpen, setCancelModalOpen] = useState(false);
  const [isPolicyAccepted, setPolicyAccepted] = useState(false);
  const [isBookingConfirmed, setBookingConfirmed] = useState(false);
  const navigate = useNavigate();

  const availableTimes = [
    "2025-07-15T13:00:00.000Z",
    "2025-07-15T14:00:00.000Z",
    "2025-07-15T15:00:00.000Z",
    "2025-07-15T16:00:00.000Z",
    "2025-07-15T17:00:00.000Z",
  ];

  const cancellationPolicy = "Las cancelaciones deben realizarse con al menos 24 horas de antelación para recibir un reembolso completo. Las cancelaciones realizadas con menos de 24 horas de antelación no serán reembolsadas.";

  const handleCancel = () => {
    setCancelModalOpen(true);
  };

  const confirmCancel = () => {
    reset();
    setCancelModalOpen(false);
    navigate(-1);
  };

  const closeCancelModal = () => {
    setCancelModalOpen(false);
  };

  const handleConfirmBooking = async () => {
    try {
      await confirmBooking();
      setBookingConfirmed(true);
    } catch (error) {
      console.error("Error al confirmar la reserva:", error);
    }
  };

  const handleNewBooking = () => {
    reset();
    setBookingConfirmed(false);
  };

  const handleBookNextAvailable = () => {
    if (nextAvailableSlot) {
      setSelectedDate(nextAvailableSlot);
      const timeString = nextAvailableSlot.toTimeString().split(' ')[0].substring(0, 5);
      setSelectedTime(timeString);
      if(step === 'date') nextStep();
      if(step === 'time') nextStep();
    }
  };

  const appointmentDetails = {
    title: 'Sesión de terapia con Dr. Ejemplo',
    startTime: selectedTime ? new Date(selectedTime) : new Date(),
    endTime: selectedTime ? new Date(new Date(selectedTime).getTime() + 60 * 60 * 1000) : new Date(),
    location: modality === 'online' ? 'Videollamada (enlace en el panel de usuario)' : 'Consultorio del profesional',
    description: `Tu sesión de terapia ha sido confirmada. Nota personal: ${personalNote || 'Ninguna'}`
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const priceDetails = {
    basePrice: originalPrice,
    serviceFee: 10, // Example service fee
    taxes: 5, // Example taxes
    discount: discount,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-backgroundSecondary to-surface text-text p-4 md:p-8 flex justify-center items-start">
      <div className="w-full max-w-4xl">
        {/* Header con gradiente */}
        <div className="bg-gradient-primary p-8 rounded-t-2xl shadow-2xl border border-borderLight">
          {isAuthenticated && user && (
            <h1 className="text-3xl font-bold text-white mb-2">
              ¡Hola {user.name}! 👋
            </h1>
          )}
          <h2 className="text-xl text-primaryLight font-medium">
            {isAuthenticated ? 'Reserva tu próxima sesión' : 'Reserva una sesión'}
          </h2>
        </div>
        
        {/* Contenido principal */}
        <div className="bg-card p-8 rounded-b-2xl shadow-2xl border-x border-b border-borderLight backdrop-blur-sm">
        {isBookingConfirmed ? (
          <div className="text-center">
            <div className="mb-8">
              <div className="w-20 h-20 bg-gradient-to-r from-success to-successLight rounded-full mx-auto mb-4 flex items-center justify-center">
                <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-success mb-2">¡Reserva Confirmada!</h3>
              <p className="text-textSecondary">Tu cita ha sido programada exitosamente</p>
            </div>
            <AddToCalendar {...appointmentDetails} />
            <div className="mt-8">
              <Button onClick={handleNewBooking} variant="primary" className="bg-gradient-primary hover:opacity-90 transform hover:scale-105 transition-all duration-300">
                Realizar otra reserva
              </Button>
            </div>
          </div>
        ) : (
          <>
            {/* Indicador de progreso */}
            <div className="mb-8">
              <div className="flex items-center justify-center space-x-4">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-300 ${
                  step === 'date' ? 'bg-primary border-primary text-white' : 
                  step === 'time' || step === 'summary' ? 'bg-success border-success text-white' : 
                  'bg-surface border-border text-textMuted'
                }`}>
                  <span className="text-sm font-bold">1</span>
                </div>
                <div className={`h-1 w-16 rounded transition-all duration-300 ${
                  step === 'time' || step === 'summary' ? 'bg-success' : 'bg-border'
                }`}></div>
                <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-300 ${
                  step === 'time' ? 'bg-primary border-primary text-white' : 
                  step === 'summary' ? 'bg-success border-success text-white' : 
                  'bg-surface border-border text-textMuted'
                }`}>
                  <span className="text-sm font-bold">2</span>
                </div>
                <div className={`h-1 w-16 rounded transition-all duration-300 ${
                  step === 'summary' ? 'bg-success' : 'bg-border'
                }`}></div>
                <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-300 ${
                  step === 'summary' ? 'bg-primary border-primary text-white' : 
                  'bg-surface border-border text-textMuted'
                }`}>
                  <span className="text-sm font-bold">3</span>
                </div>
              </div>
              <div className="flex justify-between mt-2 text-sm">
                <span className={step === 'date' ? 'text-primary font-semibold' : 'text-textMuted'}>Fecha</span>
                <span className={step === 'time' ? 'text-primary font-semibold' : 'text-textMuted'}>Hora</span>
                <span className={step === 'summary' ? 'text-primary font-semibold' : 'text-textMuted'}>Resumen</span>
              </div>
            </div>
            
            <div className="mb-8">
              {step === 'date' && (
                <>
                  <NextAvailableSlot slot={nextAvailableSlot} onBook={handleBookNextAvailable} />
                  <DateStep selectedDate={selectedDate} setSelectedDate={setSelectedDate} nextStep={nextStep} />
                  <RecurringSessionSelector onRecurringChange={handleRecurringChange} />
                </>
              )}
              {step === 'time' && (
                <>
                  <TimezoneNotice />
                  <TimeStep availableTimes={availableTimes} selectedTime={selectedTime} setSelectedTime={setSelectedTime} modality={modality} setModality={setModality} />
                </>
              )}
              {step === 'summary' && (
                <>
                  <div className="bg-gradient-surface p-6 rounded-xl border border-borderLight mb-6">
                    <h3 className="text-lg font-semibold text-text mb-4 flex items-center">
                      <svg className="w-5 h-5 mr-2 text-primary" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                      </svg>
                      Información Personal
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-textSecondary mb-2">Nombre Completo</label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 bg-backgroundSecondary border border-border rounded-lg shadow-sm placeholder-textMuted focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-300 text-text"
                          placeholder="Tu nombre completo"
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-textSecondary mb-2">Correo Electrónico</label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 bg-backgroundSecondary border border-border rounded-lg shadow-sm placeholder-textMuted focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-300 text-text"
                          placeholder="tu.email@example.com"
                        />
                      </div>
                    </div>
                    {!isAuthenticated && (
                      <div className="mt-4 p-3 bg-accent/10 border border-accent/20 rounded-lg">
                        <p className="text-sm text-accent flex items-center">
                          <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                          </svg>
                          ¿Ya tienes una cuenta? <a href="/auth" className="underline hover:text-accentHover transition-colors">Inicia sesión</a> para autocompletar tus datos.
                        </p>
                      </div>
                    )}
                  </div>
                  <SummaryStep
                    selectedDate={selectedDate}
                    selectedTime={selectedTime}
                    modality={modality}
                  />
                  <PersonalNote note={personalNote} setNote={setPersonalNote} />
                  <PromoCodeInput
                    onApplyCode={handleApplyPromoCode}
                    onRemoveCode={handleRemovePromoCode}
                    appliedCode={promoCode}
                    error={promoError}
                  />
                  <div className="my-6">
                    <PriceSummary priceDetails={priceDetails} />
                  </div>
                  <CancellationPolicyNotice
                    policy={cancellationPolicy}
                    isChecked={isPolicyAccepted}
                    onCheckboxChange={setPolicyAccepted}
                  />
                </>
              )}
            </div>

            {/* Navegación moderna */}
            <div className="mt-8 p-6 bg-gradient-surface rounded-xl border border-borderLight">
              <div className="flex justify-between items-center">
                <div>
                  {step !== 'date' && (
                    <Button 
                      onClick={prevStep} 
                      variant="secondary"
                      className="bg-surface hover:bg-backgroundSecondary border border-border text-textSecondary hover:text-text transition-all duration-300 flex items-center space-x-2"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span>Atrás</span>
                    </Button>
                  )}
                </div>
                <div className="flex gap-3">
                  <Button 
                    onClick={handleCancel} 
                    variant="danger"
                    className="bg-error hover:bg-errorDark text-white border-0 transition-all duration-300 flex items-center space-x-2 hover:scale-105"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                    <span>Cancelar</span>
                  </Button>
                  {step === 'summary' && (
                    <Button 
                      onClick={handleConfirmBooking} 
                      variant="primary" 
                      disabled={!isPolicyAccepted}
                      className={`bg-gradient-primary hover:opacity-90 text-white border-0 transition-all duration-300 flex items-center space-x-2 ${
                        isPolicyAccepted ? 'hover:scale-105 shadow-lg' : 'opacity-50 cursor-not-allowed'
                      }`}
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span>Confirmar Reserva</span>
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </>
        )}
        </div>
      </div>
      <CancelConfirmationModal
        isOpen={isCancelModalOpen}
        onConfirm={confirmCancel}
        onCancel={closeCancelModal}
      />
      {/* {expirationTime && !isBookingConfirmed && (
        <BookingTimer
          expirationTime={expirationTime}
          onTimerExpire={handleTimerExpire}
          onExtend={handleExtendTimer}
          canExtend={canExtend}
        />
      )} */}
    </div>
  );
};

export default PaginadeReservaPage;
