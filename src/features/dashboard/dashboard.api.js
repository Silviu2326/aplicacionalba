// Dashboard API functions
const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

// Obtener estadísticas del dashboard
export const getDashboardStats = async () => {
  try {
    // TODO: Implementar llamada real a la API
    // const response = await fetch(`${BASE_URL}/dashboard/stats`);
    // if (!response.ok) throw new Error('Error fetching dashboard stats');
    // return await response.json();
    
    // Mock data for development
    return {
      activeClients: 24,
      nutritionPlans: 18,
      workoutRoutines: 32,
      monthlyRevenue: 2850
    };
  } catch (error) {
    console.error('Error getting dashboard stats:', error);
    throw error;
  }
};

// Obtener actividad reciente
export const getRecentActivity = async () => {
  try {
    // TODO: Implementar llamada real a la API
    // const response = await fetch(`${BASE_URL}/dashboard/activity`);
    // if (!response.ok) throw new Error('Error fetching recent activity');
    // return await response.json();
    
    // Mock data for development
    return [
      { id: 1, clientName: 'María López', action: 'completed_workout', timestamp: '2024-01-15T10:00:00Z' },
      { id: 2, clientName: 'Carlos Ruiz', action: 'updated_diet', timestamp: '2024-01-14T15:30:00Z' },
      { id: 3, clientName: 'Alba Martín', action: 'scheduled_session', timestamp: '2024-01-14T09:15:00Z' }
    ];
  } catch (error) {
    console.error('Error getting recent activity:', error);
    throw error;
  }
};

// Obtener próximas sesiones
export const getUpcomingSessions = async () => {
  try {
    // TODO: Implementar llamada real a la API
    // const response = await fetch(`${BASE_URL}/dashboard/sessions/upcoming`);
    // if (!response.ok) throw new Error('Error fetching upcoming sessions');
    // return await response.json();
    
    // Mock data for development
    return [
      { id: 1, clientName: 'María López', date: '2024-01-15T10:00:00Z', type: 'strength' },
      { id: 2, clientName: 'Carlos Ruiz', date: '2024-01-15T14:00:00Z', type: 'cardio' },
      { id: 3, clientName: 'Alba Martín', date: '2024-01-15T16:00:00Z', type: 'nutrition' }
    ];
  } catch (error) {
    console.error('Error getting upcoming sessions:', error);
    throw error;
  }
};