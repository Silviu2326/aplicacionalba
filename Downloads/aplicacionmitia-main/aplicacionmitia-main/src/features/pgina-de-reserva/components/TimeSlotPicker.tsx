// src/features/pgina-de-reserva/components/TimeSlotPicker.tsx
import React from 'react';
import { convertToTimeZone } from '../utils/dateUtils';

interface TimeSlotPickerProps {
  availableTimes: string[]; // Se asume que son strings en formato ISO 8601
  selectedTime: string | null;
  onSelectTime: (time: string) => void;
}

const TimeSlotPicker: React.FC<TimeSlotPickerProps> = ({
  availableTimes = [],
  selectedTime,
  onSelectTime,
}) => {
  const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  
  const getTimeIcon = () => {
    return (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
      </svg>
    );
  };
  
  const formatTimeDisplay = (isoTime: string) => {
    const localTime = convertToTimeZone(isoTime, userTimezone);
    const [time, period] = localTime.split(' ');
    return { time, period };
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2 mb-4">
        <div className="p-1 bg-primary/10 rounded">
          {getTimeIcon()}
        </div>
        <h3 className="text-lg font-semibold text-text">
          Selecciona una franja horaria
        </h3>
      </div>
      
      {availableTimes && availableTimes.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {availableTimes.map((isoTime) => {
            const { time, period } = formatTimeDisplay(isoTime);
            const isSelected = selectedTime === isoTime;
            
            return (
              <button
                key={isoTime}
                onClick={() => onSelectTime(isoTime)}
                className={`
                  group relative p-4 rounded-xl border-2 transition-all duration-300 transform hover:scale-105
                  ${
                    isSelected
                      ? 'bg-gradient-primary border-primary text-white shadow-lg scale-105'
                      : 'bg-backgroundSecondary border-border text-textSecondary hover:border-primary hover:bg-surface hover:shadow-md'
                  }
                `}
              >
                <div className="flex flex-col items-center space-y-1">
                  <div className={`
                    p-2 rounded-lg transition-all duration-300
                    ${
                      isSelected
                        ? 'bg-white/20 text-white'
                        : 'bg-primary/10 text-primary group-hover:bg-primary/20'
                    }
                  `}>
                    {getTimeIcon()}
                  </div>
                  <div className="text-center">
                    <div className={`
                      text-lg font-bold transition-colors duration-300
                      ${
                        isSelected
                          ? 'text-white'
                          : 'text-text group-hover:text-primary'
                      }
                    `}>
                      {time}
                    </div>
                    {period && (
                      <div className={`
                        text-xs font-medium transition-colors duration-300
                        ${
                          isSelected
                            ? 'text-primaryLight'
                            : 'text-textMuted group-hover:text-textSecondary'
                        }
                      `}>
                        {period}
                      </div>
                    )}
                  </div>
                </div>
                
                {isSelected && (
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-success rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
              </button>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="p-4 bg-backgroundSecondary rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center">
            <svg className="w-10 h-10 text-textMuted" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
            </svg>
          </div>
          <h4 className="text-lg font-semibold text-textSecondary mb-2">
            No hay horarios disponibles
          </h4>
          <p className="text-textMuted">
            Por favor, selecciona otra fecha o contacta con nosotros
          </p>
        </div>
      )}
    </div>
  );
};

export default TimeSlotPicker;
