
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAvailability } from '../api';
import { useParams } from 'react-router-dom';

// Mock data structure
interface Availability {
  date: string;
  slots: string[];
}

export const AvailabilityWidget = () => {
  const [availability, setAvailability] = useState<Availability[]>([]);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    if (id) {
      getAvailability(id, 14)
        .then((data) => {
          setAvailability(data);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  }, [id]);

  const handleDateClick = (date: string) => {
    setSelectedDate(date);
  };

  const handleSlotClick = (slot: string) => {
    navigate(`/booking/${id}?date=${selectedDate}&time=${slot}`);
  };

  const nextAvailable = availability.find((d) => d.slots.length > 0);

  return (
    <div className="bg-gradient-to-br from-card/90 to-surface/80 backdrop-blur-sm border border-borderLight/50 rounded-2xl p-6 shadow-2xl text-text">
      {/* Header mejorado */}
      <div className="flex items-center gap-3 mb-6 pb-4 border-b border-border/30">
        <div className="w-2 h-8 bg-gradient-to-b from-primary to-accent rounded-full"></div>
        <h3 className="text-xl font-bold bg-gradient-to-r from-text to-primaryLight bg-clip-text text-transparent">
          Consultar Disponibilidad
        </h3>
      </div>
      
      {loading ? (
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          <p className="ml-3 text-textSecondary">Cargando disponibilidad...</p>
        </div>
      ) : (
        <>
          {/* Próxima cita disponible */}
          {nextAvailable && (
            <div className="relative mb-6">
              <div className="absolute inset-0 bg-gradient-to-r from-success/20 to-secondary/20 rounded-xl blur"></div>
              <div className="relative bg-gradient-to-r from-success/10 to-secondary/10 backdrop-blur-sm border border-success/30 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <svg className="w-5 h-5 text-success" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                  </svg>
                  <span className="text-success font-semibold text-sm">Próxima disponibilidad</span>
                </div>
                <p className="text-text font-medium">
                  {new Date(nextAvailable.date).toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long' })} a las {nextAvailable.slots[0]}
                </p>
              </div>
            </div>
          )}
          
          {/* Calendario de fechas mejorado */}
          <div className="grid grid-cols-3 gap-3 mb-6">
            {availability.map(({ date, slots }) => {
              const isAvailable = slots.length > 0;
              const isSelected = date === selectedDate;
              return (
                <button
                  key={date}
                  onClick={() => isAvailable && handleDateClick(date)}
                  disabled={!isAvailable}
                  className={`relative group p-3 rounded-xl text-center text-sm transition-all duration-300 transform hover:scale-105
                    ${!isAvailable ? 'bg-surface/50 text-muted cursor-not-allowed opacity-50' : ''}
                    ${isAvailable ? 'bg-gradient-to-br from-primary/80 to-primaryHover/80 hover:from-primary hover:to-primaryHover text-white shadow-lg hover:shadow-xl' : ''}
                    ${isSelected ? 'ring-2 ring-accent ring-offset-2 ring-offset-card scale-105' : ''}
                  `}
                >
                  {isAvailable && (
                    <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent rounded-xl blur opacity-30 group-hover:opacity-50 transition-opacity"></div>
                  )}
                  <div className="relative">
                    <p className="font-bold text-xs mb-1">{new Date(date).toLocaleDateString('es-ES', { weekday: 'short' })}</p>
                    <p className="font-semibold">{new Date(date).toLocaleDateString('es-ES', { day: 'numeric', month: 'short' })}</p>
                    {isAvailable && (
                      <div className="mt-1">
                        <span className="text-xs opacity-80">{slots.length} slots</span>
                      </div>
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Horarios disponibles */}
          {selectedDate && (
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-secondary/10 to-accent/10 rounded-xl blur"></div>
              <div className="relative bg-gradient-to-r from-secondary/5 to-accent/5 backdrop-blur-sm border border-secondary/20 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-4">
                  <svg className="w-5 h-5 text-secondary" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                  </svg>
                  <h4 className="font-bold text-textSecondary">
                    Horarios para {new Date(selectedDate).toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric' })}
                  </h4>
                </div>
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                  {availability.find(d => d.date === selectedDate)?.slots.map(slot => (
                    <button
                      key={slot}
                      onClick={() => handleSlotClick(slot)}
                      className="relative group bg-gradient-to-r from-secondary/80 to-success/80 hover:from-secondary hover:to-success text-white p-3 rounded-lg text-sm font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-secondary to-success rounded-lg blur opacity-30 group-hover:opacity-50 transition-opacity"></div>
                      <span className="relative">{slot}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
          
          {/* Footer con información adicional */}
          <div className="mt-6 pt-4 border-t border-border/30 text-center">
            <div className="flex items-center justify-center gap-2 text-xs text-textMuted">
              <svg className="w-4 h-4 text-info" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
              </svg>
              <span>Zona horaria del profesional: GMT-3</span>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
