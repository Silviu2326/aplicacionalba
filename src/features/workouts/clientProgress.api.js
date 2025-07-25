// Client Progress API functions
const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

// Obtener sesiones completadas de un cliente por mes
export const getClientMonthlyProgress = async (clientId, year, month) => {
  try {
    // TODO: Implementar llamada real a la API
    // const response = await fetch(`${BASE_URL}/clients/${clientId}/progress/${year}/${month}`);
    // if (!response.ok) throw new Error('Error fetching client monthly progress');
    // return await response.json();
    
    // Mock data for development - simular datos de progreso mensual
    const mockData = {};
    const daysInMonth = new Date(year, month, 0).getDate();
    
    for (let day = 1; day <= daysInMonth; day++) {
      const dateKey = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      
      // Simular diferentes niveles de adherencia
      const random = Math.random();
      if (random > 0.8) {
        // Día sin entrenamiento planificado
        mockData[dateKey] = null;
      } else if (random > 0.6) {
        // Entrenamiento completado al 100%
        mockData[dateKey] = {
          planned: true,
          completed: true,
          plannedDuration: 45,
          actualDuration: 47,
          adherencePercentage: 100,
          exercises: {
            planned: 6,
            completed: 6
          }
        };
      } else if (random > 0.4) {
        // Entrenamiento parcialmente completado
        mockData[dateKey] = {
          planned: true,
          completed: true,
          plannedDuration: 45,
          actualDuration: 30,
          adherencePercentage: 67,
          exercises: {
            planned: 6,
            completed: 4
          }
        };
      } else if (random > 0.2) {
        // Entrenamiento planificado pero no completado
        mockData[dateKey] = {
          planned: true,
          completed: false,
          plannedDuration: 45,
          actualDuration: 0,
          adherencePercentage: 0,
          exercises: {
            planned: 6,
            completed: 0
          }
        };
      } else {
        // Día sin entrenamiento planificado
        mockData[dateKey] = null;
      }
    }
    
    return mockData;
  } catch (error) {
    console.error('Error getting client monthly progress:', error);
    throw error;
  }
};

// Registrar sesión completada
export const logCompletedSession = async (clientId, date, sessionData) => {
  try {
    // TODO: Implementar llamada real a la API
    // const response = await fetch(`${BASE_URL}/clients/${clientId}/sessions`, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({ date, ...sessionData }),
    // });
    // if (!response.ok) throw new Error('Error logging completed session');
    // return await response.json();
    
    // Mock response for development
    console.log('Logging completed session:', { clientId, date, sessionData });
    return {
      id: Date.now(),
      clientId,
      date,
      ...sessionData,
      loggedAt: new Date().toISOString()
    };
  } catch (error) {
    console.error('Error logging completed session:', error);
    throw error;
  }
};

// Obtener estadísticas de adherencia del cliente
export const getClientAdherenceStats = async (clientId, startDate, endDate) => {
  try {
    // TODO: Implementar llamada real a la API
    // const response = await fetch(`${BASE_URL}/clients/${clientId}/adherence?start=${startDate}&end=${endDate}`);
    // if (!response.ok) throw new Error('Error fetching adherence stats');
    // return await response.json();
    
    // Mock data for development
    return {
      totalPlannedSessions: 20,
      completedSessions: 16,
      adherencePercentage: 80,
      averageDuration: 42,
      totalPlannedDuration: 900, // en minutos
      totalActualDuration: 720, // en minutos
      durationAdherence: 80
    };
  } catch (error) {
    console.error('Error getting adherence stats:', error);
    throw error;
  }
};

// Función helper para determinar el color del badge basado en adherencia
export const getAdherenceBadgeColor = (adherencePercentage) => {
  if (adherencePercentage >= 80) {
    return 'green'; // Verde para buena adherencia (80%+)
  } else if (adherencePercentage >= 50) {
    return 'yellow'; // Amarillo para adherencia moderada (50-79%)
  } else {
    return 'red'; // Rojo para baja adherencia (<50%)
  }
};

// Función helper para obtener el texto del tooltip
export const getTooltipText = (dayData) => {
  if (!dayData || !dayData.planned) {
    return 'Sin entrenamiento planificado';
  }
  
  if (!dayData.completed) {
    return `Planificado: ${dayData.plannedDuration}min\nNo completado`;
  }
  
  return `Planificado: ${dayData.plannedDuration}min\nRealizado: ${dayData.actualDuration}min\nAdherencia: ${dayData.adherencePercentage}%`;
};