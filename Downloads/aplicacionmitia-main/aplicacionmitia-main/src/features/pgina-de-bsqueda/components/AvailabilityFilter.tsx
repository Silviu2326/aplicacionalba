
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';

// Estilos personalizados para hacer el calendario más compacto
const calendarStyles = `
  .rdp-small {
    font-size: 0.65rem;
    max-width: 220px;
    width: 100%;
  }
  .rdp-small .rdp-month {
    margin: 0;
    width: 100%;
  }
  .rdp-small .rdp-table {
    margin: 0;
    width: 100%;
    table-layout: fixed;
  }
  .rdp-small .rdp-head_cell {
    padding: 0.125rem;
    font-size: 0.6rem;
    font-weight: 500;
    width: 14.28%;
    text-align: center;
  }
  .rdp-small .rdp-cell {
    padding: 0.05rem;
    width: 14.28%;
  }
  .rdp-small .rdp-day {
    height: 1.4rem;
    width: 1.4rem;
    font-size: 0.6rem;
    border-radius: 0.25rem;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .rdp-small .rdp-day:hover {
    background-color: var(--color-primary-hover, #3b82f6);
    color: white;
  }
  .rdp-small .rdp-day_selected {
    background-color: var(--color-primary, #2563eb);
    color: white;
  }
  .rdp-small .rdp-day_range_middle {
    background-color: var(--color-primary-light, #dbeafe);
  }
  .rdp-small .rdp-caption {
    margin-bottom: 0.5rem;
  }
  .rdp-small .rdp-nav {
    margin: 0;
  }
  .rdp-small .rdp-nav_button {
    width: 1.5rem;
    height: 1.5rem;
  }
`;

export type DateRange = {
  from: Date | undefined;
  to: Date | undefined;
};

type Props = {
  onDateChange: (range: DateRange) => void;
  selectedRange: DateRange;
};

const AvailabilityFilter = ({ onDateChange, selectedRange }: Props) => {
  const today = new Date();

  const handleDayClick = (day: Date) => {
    const range: DateRange = {
      from: day,
      to: day,
    };
    onDateChange(range);
  };

  const handleRangeSelect = (range: DateRange | undefined) => {
    if (range) {
      onDateChange(range);
    }
  };

  const handleTodayClick = () => {
    const range: DateRange = {
      from: today,
      to: today,
    };
    onDateChange(range);
  };

  const handleTomorrowClick = () => {
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const range: DateRange = {
      from: tomorrow,
      to: tomorrow,
    };
    onDateChange(range);
  };

  const handleThisWeekClick = () => {
    const startOfWeek = new Date(today);
    startOfWeek.setDate(startOfWeek.getDate() - today.getDay());
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(endOfWeek.getDate() + 6);
    const range: DateRange = {
      from: startOfWeek,
      to: endOfWeek,
    };
    onDateChange(range);
  };

  const handleClearClick = () => {
    const range: DateRange = {
      from: undefined,
      to: undefined,
    };
    onDateChange(range);
  };

  return (
    <div className="p-3 bg-surface rounded-lg shadow-lg border border-border max-w-full">
      <style>{calendarStyles}</style>
      <h3 className="mb-3 text-base font-semibold text-text">Disponibilidad</h3>
      <div className="flex flex-wrap gap-1 mb-3">
        <button onClick={handleTodayClick} className="px-2 py-1 text-xs text-textInverse bg-primary rounded hover:bg-primaryHover transition-colors">Hoy</button>
        <button onClick={handleTomorrowClick} className="px-2 py-1 text-xs text-textInverse bg-primary rounded hover:bg-primaryHover transition-colors">Mañana</button>
        <button onClick={handleThisWeekClick} className="px-2 py-1 text-xs text-textInverse bg-primary rounded hover:bg-primaryHover transition-colors">Esta semana</button>
        <button onClick={handleClearClick} className="px-2 py-1 text-xs text-textSecondary bg-muted rounded hover:bg-border transition-colors">Limpiar</button>
      </div>
      <DayPicker
        mode="range"
        selected={selectedRange}
        onSelect={handleRangeSelect}
        onDayClick={handleDayClick}
        disabled={{ before: today }}
        numberOfMonths={1}
        className="rdp-small"
        classNames={{
          months: 'rdp-months-small',
          month: 'rdp-month-small',
          table: 'rdp-table-small w-full',
          head_cell: 'text-xs p-1',
          cell: 'text-xs p-1',
          day: 'h-8 w-8 text-xs'
        }}
      />
    </div>
  );
};

export default AvailabilityFilter;
