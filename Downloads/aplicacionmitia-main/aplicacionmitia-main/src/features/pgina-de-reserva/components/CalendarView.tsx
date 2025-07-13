// src/features/pgina-de-reserva/components/CalendarView.tsx
import React from 'react';

interface CalendarViewProps {
  availableDates: string[];
  currentMonth: Date;
  onNextMonth: () => void;
  onPrevMonth: () => void;
  onSelectDate: (date: Date) => void;
  selectedDate: Date | null;
  isLoading: boolean;
  error: Error | null;
}

export const CalendarView: React.FC<CalendarViewProps> = ({
  availableDates = [],
  currentMonth,
  onNextMonth,
  onPrevMonth,
  onSelectDate,
  selectedDate,
  isLoading,
  error,
}) => {
  const renderDays = () => {
    const days = [];
    const firstDay = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1);
    const lastDay = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0);

    for (let i = 0; i < firstDay.getDay(); i++) {
      days.push(<div key={`empty-${i}`} className="p-2 text-center"></div>);
    }

    for (let i = 1; i <= lastDay.getDate(); i++) {
      const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), i);
      const isSelected = selectedDate?.toDateString() === date.toDateString();
      const isAvailable = availableDates && availableDates.includes(date.toISOString().split('T')[0]);

      days.push(
        <div
          key={i}
          className={`p-2 text-center cursor-pointer rounded transition-colors ${
            isSelected ? 'bg-primary text-textInverse' : isAvailable ? 'bg-surface text-text hover:bg-backgroundSecondary border border-border' : 'text-textMuted cursor-not-allowed'
          }`}
          onClick={() => onSelectDate(date)}
        >
          {i}
        </div>
      );
    }
    return days;
  };

  if (isLoading) {
    return <div className="text-center py-4 text-textSecondary">Cargando calendario...</div>;
  }

  if (error) {
    return <div className="text-center py-4 text-error">Error: {error.message}</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <button 
          onClick={onPrevMonth}
          className="px-4 py-2 bg-surface text-textSecondary hover:bg-backgroundSecondary border border-border rounded transition-colors"
        >
          Anterior
        </button>
        <h2 className="text-xl font-semibold text-text">
          {currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' })}
        </h2>
        <button 
          onClick={onNextMonth}
          className="px-4 py-2 bg-surface text-textSecondary hover:bg-backgroundSecondary border border-border rounded transition-colors"
        >
          Siguiente
        </button>
      </div>
      <div className="grid grid-cols-7 gap-2">
        <div className="p-2 text-center font-bold text-textSecondary">Dom</div>
        <div className="p-2 text-center font-bold text-textSecondary">Lun</div>
        <div className="p-2 text-center font-bold text-textSecondary">Mar</div>
        <div className="p-2 text-center font-bold text-textSecondary">Mié</div>
        <div className="p-2 text-center font-bold text-textSecondary">Jue</div>
        <div className="p-2 text-center font-bold text-textSecondary">Vie</div>
        <div className="p-2 text-center font-bold text-textSecondary">Sáb</div>
        {renderDays()}
      </div>
    </div>
  );
};
