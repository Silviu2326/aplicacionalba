import React from 'react';

interface DateStepProps {
  selectedDate: Date | null;
  setSelectedDate: (date: Date | null) => void;
  nextStep: () => void;
}

const DateStep: React.FC<DateStepProps> = ({ selectedDate, setSelectedDate, nextStep }) => {
  const today = new Date();
  const currentMonth = new Date();
  
  const generateCalendarDays = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());
    
    const days = [];
    for (let i = 0; i < 42; i++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);
      days.push(date);
    }
    return days;
  };
  
  const handleDateSelect = (date: Date) => {
    if (date >= today) {
      setSelectedDate(date);
    }
  };
  
  const handleContinue = () => {
    if (selectedDate) {
      nextStep();
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-text mb-2 flex items-center justify-center">
          <svg className="w-8 h-8 mr-3 text-primary" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
          </svg>
          Selecciona la Fecha
        </h2>
        <p className="text-textSecondary text-lg">Elige el día perfecto para tu sesión</p>
      </div>
      
      <div className="bg-gradient-surface p-6 rounded-2xl border border-borderLight shadow-lg">
        {/* Header del calendario */}
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-text">
            {currentMonth.toLocaleDateString('es-ES', { month: 'long', year: 'numeric' })}
          </h3>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-primary rounded-full"></div>
            <span className="text-sm text-textSecondary">Disponible</span>
          </div>
        </div>
        
        {/* Días de la semana */}
        <div className="grid grid-cols-7 gap-2 mb-4">
          {['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'].map(day => (
            <div key={day} className="text-center text-sm font-semibold text-textSecondary py-2">
              {day}
            </div>
          ))}
        </div>
        
        {/* Días del calendario */}
        <div className="grid grid-cols-7 gap-2">
          {generateCalendarDays().map((date, index) => {
            const isCurrentMonth = date.getMonth() === currentMonth.getMonth();
            const isToday = date.toDateString() === today.toDateString();
            const isSelected = selectedDate?.toDateString() === date.toDateString();
            const isPast = date < today && !isToday;
            const isAvailable = isCurrentMonth && !isPast;
            
            return (
              <button
                key={index}
                onClick={() => handleDateSelect(date)}
                disabled={!isAvailable}
                className={`
                  relative h-12 w-full rounded-lg transition-all duration-300 text-sm font-medium
                  ${
                    isSelected
                      ? 'bg-gradient-primary text-white shadow-lg scale-105'
                      : isAvailable
                      ? 'bg-surface hover:bg-primary hover:text-white border border-border hover:border-primary'
                      : 'bg-backgroundSecondary text-textMuted cursor-not-allowed'
                  }
                  ${
                    isToday && !isSelected
                      ? 'ring-2 ring-accent ring-opacity-50'
                      : ''
                  }
                  ${
                    !isCurrentMonth
                      ? 'opacity-30'
                      : ''
                  }
                `}
              >
                {date.getDate()}
                {isToday && (
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-accent rounded-full"></div>
                )}
              </button>
            );
          })}
        </div>
        
        {selectedDate && (
          <div className="mt-6 p-4 bg-primary/10 border border-primary/20 rounded-lg">
            <p className="text-center text-primary font-semibold">
              Fecha seleccionada: {selectedDate.toLocaleDateString('es-ES', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>
          </div>
        )}
      </div>
      
      <div className="flex justify-end">
        <button
          onClick={handleContinue}
          disabled={!selectedDate}
          className={`
            px-8 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center space-x-2
            ${
              selectedDate
                ? 'bg-gradient-primary text-white hover:opacity-90 hover:scale-105 shadow-lg'
                : 'bg-surface text-textMuted cursor-not-allowed border border-border'
            }
          `}
        >
          <span>Continuar</span>
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default DateStep;
