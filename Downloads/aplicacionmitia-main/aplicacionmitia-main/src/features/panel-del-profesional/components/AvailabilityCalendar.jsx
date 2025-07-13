import React, { useState, useCallback } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { useAvailability } from '../hooks/useAvailability';
import { Button } from "../../../components/Button";

const localizer = momentLocalizer(moment);

const AvailabilityCalendar = () => {
  const { events: initialEvents, loading, handleUpdateAvailability } = useAvailability();
  const [events, setEvents] = useState(initialEvents);

  React.useEffect(() => {
    setEvents(initialEvents);
  }, [initialEvents]);

  const handleSelectSlot = useCallback(
    ({ start, end }) => {
      if (moment(start).isBefore(moment())) {
        alert("No se puede seleccionar una fecha pasada.");
        return;
      }

      const isSelected = events.some(
        (event) =>
          moment(event.start).isSame(start) && moment(event.end).isSame(end) && event.isAvailable
      );

      if (isSelected) {
        // Deselect slot
        const newEvents = events.filter(
          (event) =>
            !(moment(event.start).isSame(start) && moment(event.end).isSame(end))
        );
        setEvents(newEvents);
      } else {
        // Select slot
        const newEvent = {
          id: events.length + 1,
          title: 'Disponible',
          start,
          end,
          isAvailable: true,
        };
        setEvents([...events, newEvent]);
      }
    },
    [events]
  );

  const eventStyleGetter = (event) => {
    let backgroundColor = '';
    if (event.isAvailable) {
      backgroundColor = '#10B981'; // success from tailwind config
    } else {
      backgroundColor = '#EF4444'; // error from tailwind config
    }
    const style = {
      backgroundColor,
      borderRadius: '8px',
      opacity: 0.9,
      color: '#F8FAFC', // text from tailwind config
      border: '0px',
      display: 'block',
      fontWeight: '500',
      fontSize: '12px',
    };
    return {
      style,
    };
  };

  const handleSaveChanges = () => {
    handleUpdateAvailability(events);
  };

  return (
    <div className="p-6 bg-surface rounded-lg shadow-lg border border-border transition-all duration-300 hover:shadow-xl">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-text mb-2">Configurar Disponibilidad</h2>
        <p className="text-textMuted text-sm">Selecciona los horarios en los que estarás disponible para sesiones</p>
      </div>
      
      <div className="mb-4 flex items-center space-x-6 text-sm">
        <div className="flex items-center">
          <div className="w-4 h-4 bg-success rounded mr-2"></div>
          <span className="text-textSecondary">Disponible</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 bg-error rounded mr-2"></div>
          <span className="text-textSecondary">No disponible</span>
        </div>
      </div>
      
      <div className="h-[600px] bg-backgroundSecondary rounded-lg p-4 border border-border">
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: '100%', color: '#E2E8F0' }}
          selectable
          onSelectSlot={handleSelectSlot}
          eventPropGetter={eventStyleGetter}
          views={['month', 'week', 'day']}
          defaultView="week"
          min={moment().startOf('day').toDate()}
        />
      </div>
      <div className="mt-6 flex justify-end">
        <Button onClick={handleSaveChanges} disabled={loading} variant="primary">
          {loading ? 'Guardando...' : 'Guardar Disponibilidad'}
        </Button>
      </div>
    </div>
  );
};

export default AvailabilityCalendar;