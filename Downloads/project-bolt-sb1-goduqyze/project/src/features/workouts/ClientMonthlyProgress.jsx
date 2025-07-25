import React, { useState, useEffect } from 'react';
import { Calendar, ChevronLeft, ChevronRight, Info } from 'lucide-react';
import { getClientMonthlyProgress, getAdherenceBadgeColor, getTooltipText } from './clientProgress.api';

const ClientMonthlyProgress = ({ clientId, onDateSelect }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [progressData, setProgressData] = useState({});
  const [loading, setLoading] = useState(false);
  const [hoveredDay, setHoveredDay] = useState(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });

  const monthNames = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];

  const dayNames = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];

  // Cargar datos de progreso cuando cambie el mes o cliente
  useEffect(() => {
    if (clientId) {
      loadMonthlyProgress();
    }
  }, [clientId, currentDate]);

  const loadMonthlyProgress = async () => {
    setLoading(true);
    try {
      const year = currentDate.getFullYear();
      const month = currentDate.getMonth() + 1;
      const data = await getClientMonthlyProgress(clientId, year, month);
      setProgressData(data);
    } catch (error) {
      console.error('Error loading monthly progress:', error);
    } finally {
      setLoading(false);
    }
  };

  // Generar días del calendario
  const generateCalendarDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());

    const days = [];
    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + 41); // 6 semanas

    for (let date = new Date(startDate); date <= endDate; date.setDate(date.getDate() + 1)) {
      days.push(new Date(date));
    }

    return days;
  };

  const navigateMonth = (direction) => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() + direction);
      return newDate;
    });
  };

  const formatDateKey = (date) => {
    return date.toISOString().split('T')[0];
  };

  const handleMouseEnter = (event, date, dayData) => {
    const rect = event.target.getBoundingClientRect();
    setTooltipPosition({
      x: rect.left + rect.width / 2,
      y: rect.top - 10
    });
    setHoveredDay({ date, data: dayData });
  };

  const handleMouseLeave = () => {
    setHoveredDay(null);
  };

  const getBadgeStyle = (dayData) => {
    if (!dayData || !dayData.planned) {
      return 'bg-gray-100 border-gray-200'; // Sin entrenamiento planificado
    }

    const color = getAdherenceBadgeColor(dayData.adherencePercentage);
    
    switch (color) {
      case 'green':
        return 'bg-green-100 border-green-300 text-green-800';
      case 'yellow':
        return 'bg-yellow-100 border-yellow-300 text-yellow-800';
      case 'red':
        return 'bg-red-100 border-red-300 text-red-800';
      default:
        return 'bg-gray-100 border-gray-200';
    }
  };

  const getProgressIndicator = (dayData) => {
    if (!dayData || !dayData.planned) {
      return null;
    }

    const color = getAdherenceBadgeColor(dayData.adherencePercentage);
    const colorClass = {
      green: 'bg-green-500',
      yellow: 'bg-yellow-500',
      red: 'bg-red-500'
    }[color];

    return (
      <div className={`absolute bottom-1 right-1 w-2 h-2 rounded-full ${colorClass}`}></div>
    );
  };

  const calendarDays = generateCalendarDays();
  const today = new Date();

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Calendar className="h-5 w-5 text-blue-600" />
          <h2 className="text-lg font-semibold text-gray-900">Progreso Mensual</h2>
        </div>
        
        <div className="flex items-center gap-4">
          {/* Leyenda */}
          <div className="flex items-center gap-3 text-xs">
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <span className="text-gray-600">≥80%</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <span className="text-gray-600">50-79%</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <span className="text-gray-600">&lt;50%</span>
            </div>
          </div>
          
          {/* Navegación de mes */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => navigateMonth(-1)}
              className="p-1 hover:bg-gray-100 rounded transition-colors"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <span className="text-sm font-medium min-w-[120px] text-center">
              {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
            </span>
            <button
              onClick={() => navigateMonth(1)}
              className="p-1 hover:bg-gray-100 rounded transition-colors"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      ) : (
        <>
          {/* Días de la semana */}
          <div className="grid grid-cols-7 gap-1 mb-2">
            {dayNames.map(day => (
              <div key={day} className="p-2 text-center text-sm font-medium text-gray-500">
                {day}
              </div>
            ))}
          </div>
          
          {/* Días del mes */}
          <div className="grid grid-cols-7 gap-1">
            {calendarDays.map((date, index) => {
              const dateKey = formatDateKey(date);
              const dayData = progressData[dateKey];
              const isCurrentMonth = date.getMonth() === currentDate.getMonth();
              const isToday = formatDateKey(date) === formatDateKey(today);
              
              return (
                <button
                  key={index}
                  type="button"
                  onClick={() => onDateSelect && onDateSelect(date)}
                  onMouseEnter={(e) => handleMouseEnter(e, date, dayData)}
                  onMouseLeave={handleMouseLeave}
                  className={`
                    relative p-2 text-sm rounded-lg transition-all duration-200 border
                    ${!isCurrentMonth ? 'text-gray-300 bg-gray-50' : 'text-gray-900'}
                    ${isToday ? 'ring-2 ring-blue-400 ring-offset-1' : ''}
                    ${getBadgeStyle(dayData)}
                    hover:scale-105 hover:shadow-sm
                  `}
                >
                  {date.getDate()}
                  {getProgressIndicator(dayData)}
                </button>
              );
            })}
          </div>
        </>
      )}

      {/* Tooltip */}
      {hoveredDay && (
        <div
          className="fixed z-50 bg-gray-900 text-white text-xs rounded-lg py-2 px-3 pointer-events-none transform -translate-x-1/2 -translate-y-full"
          style={{
            left: tooltipPosition.x,
            top: tooltipPosition.y,
            maxWidth: '200px'
          }}
        >
          <div className="whitespace-pre-line">
            <div className="font-medium mb-1">
              {hoveredDay.date.toLocaleDateString('es-ES', {
                weekday: 'long',
                day: 'numeric',
                month: 'long'
              })}
            </div>
            {getTooltipText(hoveredDay.data)}
          </div>
          {/* Flecha del tooltip */}
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
        </div>
      )}
    </div>
  );
};

export default ClientMonthlyProgress;