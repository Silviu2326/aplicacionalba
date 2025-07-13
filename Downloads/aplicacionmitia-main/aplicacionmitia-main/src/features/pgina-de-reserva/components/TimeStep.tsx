import React from 'react';
import ModalitySelector from './ModalitySelector';
import TimeSlotPicker from './TimeSlotPicker';
import { Button } from '@/components/Button';

interface TimeStepProps {
  availableTimes: string[];
  selectedTime: string | null;
  setSelectedTime: (time: string | null) => void;
  modality: 'online' | 'presencial' | null;
  setModality: (modality: 'online' | 'presencial' | null) => void;
  nextStep: () => void;
  availableModalities?: ('Online' | 'Presencial')[];
}

const TimeStep: React.FC<TimeStepProps> = ({
  availableTimes,
  selectedTime,
  setSelectedTime,
  modality,
  setModality,
  nextStep,
  availableModalities = ['Online', 'Presencial'],
}) => {
  const handleContinue = () => {
    if (selectedTime && modality) {
      nextStep();
    }
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-text mb-2 flex items-center justify-center">
          <svg className="w-8 h-8 mr-3 text-primary" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
          </svg>
          Hora y Modalidad
        </h2>
        <p className="text-textSecondary text-lg">Configura los detalles de tu sesión</p>
      </div>
      
      {/* Selector de modalidad mejorado */}
      <div className="bg-gradient-surface p-6 rounded-2xl border border-borderLight shadow-lg">
        <h3 className="text-xl font-semibold text-text mb-4 flex items-center">
          <svg className="w-6 h-6 mr-2 text-secondary" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
          </svg>
          Modalidad de la Sesión
        </h3>
        <ModalitySelector 
          availableModalities={availableModalities}
          selectedModality={modality} 
          onSelectModality={setModality} 
        />
      </div>

      {/* Selector de horario mejorado */}
      <div className="bg-gradient-surface p-6 rounded-2xl border border-borderLight shadow-lg">
        <h3 className="text-xl font-semibold text-text mb-4 flex items-center">
          <svg className="w-6 h-6 mr-2 text-accent" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
          </svg>
          Horarios Disponibles
        </h3>
        <TimeSlotPicker
          availableTimes={availableTimes}
          selectedTime={selectedTime}
          onSelectTime={setSelectedTime}
        />
      </div>

      {/* Resumen de selección */}
      {(selectedTime || modality) && (
        <div className="bg-primary/10 border border-primary/20 rounded-xl p-6">
          <h4 className="text-lg font-semibold text-primary mb-3 flex items-center">
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            Tu Selección
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {modality && (
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-secondary rounded-full"></div>
                <span className="text-textSecondary">Modalidad:</span>
                <span className="font-semibold text-text">{modality}</span>
              </div>
            )}
            {selectedTime && (
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-accent rounded-full"></div>
                <span className="text-textSecondary">Hora:</span>
                <span className="font-semibold text-text">{selectedTime}</span>
              </div>
            )}
          </div>
        </div>
      )}

      <div className="flex justify-end">
        <button
          onClick={handleContinue}
          disabled={!selectedTime || !modality}
          className={`
            px-8 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center space-x-2
            ${
              selectedTime && modality
                ? 'bg-gradient-primary text-white hover:opacity-90 hover:scale-105 shadow-lg'
                : 'bg-surface text-textMuted cursor-not-allowed border border-border'
            }
          `}
        >
          <span>Siguiente</span>
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default TimeStep;
