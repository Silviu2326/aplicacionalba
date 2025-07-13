import React from 'react';

interface SummaryStepProps {
  selectedDate: Date | null;
  selectedTime: string | null;
  selectedModality: string | null;
  onConfirm?: () => void;
}

const SummaryStep: React.FC<SummaryStepProps> = ({
  selectedDate,
  selectedTime,
  selectedModality,
  onConfirm,
}) => {
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('es-ES', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(date);
  };
  
  const getModalityIcon = (modality: string) => {
    if (modality === 'Online') {
      return (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 015 8a1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z" clipRule="evenodd" />
        </svg>
      );
    } else {
      return (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
        </svg>
      );
    }
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <div className="p-4 bg-success/10 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center">
          <svg className="w-10 h-10 text-success" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        </div>
        <h2 className="text-3xl font-bold text-text mb-2">¡Casi listo!</h2>
        <p className="text-textSecondary">Revisa los detalles de tu reserva antes de confirmar</p>
      </div>
      
      <div className="bg-gradient-surface p-8 rounded-2xl border border-border shadow-xl">
        <div className="flex items-center space-x-3 mb-6">
          <div className="p-2 bg-primary/10 rounded-lg">
            <svg className="w-6 h-6 text-primary" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-text">Detalles de la reserva</h3>
        </div>
        
        <div className="space-y-6">
          <div className="flex items-center justify-between p-4 bg-backgroundSecondary rounded-xl">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <svg className="w-5 h-5 text-primary" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium text-textMuted">Fecha</p>
                <p className="text-lg font-semibold text-text">
                  {selectedDate ? formatDate(selectedDate) : 'No seleccionada'}
                </p>
              </div>
            </div>
            {selectedDate && (
              <div className="w-3 h-3 bg-success rounded-full"></div>
            )}
          </div>
          
          <div className="flex items-center justify-between p-4 bg-backgroundSecondary rounded-xl">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <svg className="w-5 h-5 text-primary" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium text-textMuted">Hora</p>
                <p className="text-lg font-semibold text-text">
                  {selectedTime || 'No seleccionada'}
                </p>
              </div>
            </div>
            {selectedTime && (
              <div className="w-3 h-3 bg-success rounded-full"></div>
            )}
          </div>
          
          <div className="flex items-center justify-between p-4 bg-backgroundSecondary rounded-xl">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                {selectedModality ? getModalityIcon(selectedModality) : (
                  <svg className="w-5 h-5 text-primary" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                  </svg>
                )}
              </div>
              <div>
                <p className="text-sm font-medium text-textMuted">Modalidad</p>
                <p className="text-lg font-semibold text-text">
                  {selectedModality || 'No seleccionada'}
                </p>
              </div>
            </div>
            {selectedModality && (
              <div className="w-3 h-3 bg-success rounded-full"></div>
            )}
          </div>
        </div>
        
        <div className="mt-8 p-4 bg-info/5 border border-info/20 rounded-xl">
          <div className="flex items-start space-x-3">
            <svg className="w-5 h-5 text-info mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            <div>
              <p className="text-sm font-medium text-info mb-1">Información importante</p>
              <p className="text-sm text-textSecondary">
                Recibirás un email de confirmación con los detalles de tu cita y el enlace de acceso (si es modalidad online).
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SummaryStep;
