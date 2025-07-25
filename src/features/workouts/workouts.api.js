// Workouts API functions
const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

// Obtener todas las rutinas de entrenamiento
export const getWorkouts = async (filters = {}) => {
  try {
    // TODO: Implementar llamada real a la API
    // const queryParams = new URLSearchParams(filters);
    // const response = await fetch(`${BASE_URL}/workouts?${queryParams}`);
    // if (!response.ok) throw new Error('Error fetching workouts');
    // return await response.json();
    
    // Mock data for development
    return [
      {
        id: 1,
        name: 'Rutina Fuerza - Principiante',
        description: 'Rutina básica de fuerza para desarrollar masa muscular',
        category: 'strength',
        difficulty: 'beginner',
        duration: 45,
        exercises: [
          {
            id: 1,
            name: 'Sentadillas',
            sets: 3,
            reps: '12-15',
            rest: '60s',
            notes: 'Mantener la espalda recta'
          },
          {
            id: 2,
            name: 'Press de banca',
            sets: 3,
            reps: '10-12',
            rest: '90s',
            notes: 'Controlar el movimiento'
          }
        ],
        status: 'active',
        createdBy: 'trainer_1',
        createdDate: '2024-01-05'
      }
    ];
  } catch (error) {
    console.error('Error getting workouts:', error);
    throw error;
  }
};

// Obtener una rutina por ID
export const getWorkoutById = async (workoutId) => {
  try {
    // TODO: Implementar llamada real a la API
    // const response = await fetch(`${BASE_URL}/workouts/${workoutId}`);
    // if (!response.ok) throw new Error('Error fetching workout');
    // return await response.json();
    
    // Mock data for development
    return {
      id: workoutId,
      name: 'Rutina Fuerza - Principiante',
      description: 'Rutina básica de fuerza para desarrollar masa muscular',
      category: 'strength',
      difficulty: 'beginner',
      duration: 45,
      exercises: [
        {
          id: 1,
          name: 'Sentadillas',
          muscle_group: 'legs',
          sets: 3,
          reps: '12-15',
          weight: '20kg',
          rest: '60s',
          notes: 'Mantener la espalda recta y bajar hasta 90 grados'
        },
        {
          id: 2,
          name: 'Press de banca',
          muscle_group: 'chest',
          sets: 3,
          reps: '10-12',
          weight: '40kg',
          rest: '90s',
          notes: 'Controlar el movimiento, especialmente en la bajada'
        },
        {
          id: 3,
          name: 'Remo con barra',
          muscle_group: 'back',
          sets: 3,
          reps: '10-12',
          weight: '30kg',
          rest: '90s',
          notes: 'Mantener el torso firme y tirar hacia el abdomen'
        }
      ],
      warmup: [
        { exercise: 'Caminar en cinta', duration: '5 min' },
        { exercise: 'Movilidad articular', duration: '5 min' }
      ],
      cooldown: [
        { exercise: 'Estiramientos', duration: '10 min' }
      ],
      status: 'active',
      createdBy: 'trainer_1',
      createdDate: '2024-01-05'
    };
  } catch (error) {
    console.error('Error getting workout:', error);
    throw error;
  }
};

// Crear una nueva rutina
export const createWorkout = async (workoutData) => {
  try {
    // TODO: Implementar llamada real a la API
    // const response = await fetch(`${BASE_URL}/workouts`, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(workoutData),
    // });
    // if (!response.ok) throw new Error('Error creating workout');
    // return await response.json();
    
    // Mock response for development
    console.log('Creating workout:', workoutData);
    return {
      id: Date.now(),
      ...workoutData,
      status: 'draft',
      createdDate: new Date().toISOString().split('T')[0]
    };
  } catch (error) {
    console.error('Error creating workout:', error);
    throw error;
  }
};

// Actualizar una rutina
export const updateWorkout = async (workoutId, workoutData) => {
  try {
    // TODO: Implementar llamada real a la API
    // const response = await fetch(`${BASE_URL}/workouts/${workoutId}`, {
    //   method: 'PUT',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(workoutData),
    // });
    // if (!response.ok) throw new Error('Error updating workout');
    // return await response.json();
    
    // Mock response for development
    console.log('Updating workout:', workoutId, workoutData);
    return { id: workoutId, ...workoutData };
  } catch (error) {
    console.error('Error updating workout:', error);
    throw error;
  }
};

// Eliminar una rutina
export const deleteWorkout = async (workoutId) => {
  try {
    // TODO: Implementar llamada real a la API
    // const response = await fetch(`${BASE_URL}/workouts/${workoutId}`, {
    //   method: 'DELETE',
    // });
    // if (!response.ok) throw new Error('Error deleting workout');
    // return await response.json();
    
    // Mock response for development
    console.log('Deleting workout:', workoutId);
    return { success: true, message: 'Rutina eliminada correctamente' };
  } catch (error) {
    console.error('Error deleting workout:', error);
    throw error;
  }
};

// Asignar rutina a un cliente
export const assignWorkoutToClient = async (workoutId, clientId, startDate = new Date()) => {
  try {
    // TODO: Implementar llamada real a la API
    // const response = await fetch(`${BASE_URL}/workouts/${workoutId}/assign`, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({ clientId, startDate }),
    // });
    // if (!response.ok) throw new Error('Error assigning workout');
    // return await response.json();
    
    // Mock response for development
    console.log('Assigning workout', workoutId, 'to client', clientId, 'starting', startDate);
    return { 
      success: true, 
      message: 'Rutina asignada correctamente',
      assignmentId: Date.now()
    };
  } catch (error) {
    console.error('Error assigning workout:', error);
    throw error;
  }
};

// Obtener rutinas de un cliente
export const getClientWorkouts = async (clientId) => {
  try {
    // TODO: Implementar llamada real a la API
    // const response = await fetch(`${BASE_URL}/clients/${clientId}/workouts`);
    // if (!response.ok) throw new Error('Error fetching client workouts');
    // return await response.json();
    
    // Mock data for development
    return [
      {
        id: 1,
        name: 'Rutina Actual - Fuerza',
        startDate: '2024-01-01',
        endDate: '2024-03-01',
        progress: 75,
        completedSessions: 12,
        totalSessions: 16,
        status: 'active'
      }
    ];
  } catch (error) {
    console.error('Error getting client workouts:', error);
    throw error;
  }
};

// Registrar sesión de entrenamiento completada
export const logWorkoutSession = async (clientId, workoutId, sessionData) => {
  try {
    // TODO: Implementar llamada real a la API
    // const response = await fetch(`${BASE_URL}/workout-sessions`, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({
    //     clientId,
    //     workoutId,
    //     ...sessionData
    //   }),
    // });
    // if (!response.ok) throw new Error('Error logging workout session');
    // return await response.json();
    
    // Mock response for development
    console.log('Logging workout session:', { clientId, workoutId, sessionData });
    return {
      id: Date.now(),
      clientId,
      workoutId,
      ...sessionData,
      loggedAt: new Date().toISOString()
    };
  } catch (error) {
    console.error('Error logging workout session:', error);
    throw error;
  }
};

// Obtener plantillas de rutinas
export const getWorkoutTemplates = async () => {
  try {
    // TODO: Implementar llamada real a la API
    // const response = await fetch(`${BASE_URL}/workout-templates`);
    // if (!response.ok) throw new Error('Error fetching workout templates');
    // return await response.json();
    
    // Mock data for development
    return [
      {
        id: 1,
        name: 'Fuerza Principiante',
        description: 'Rutina básica de 3 días para principiantes',
        category: 'strength',
        difficulty: 'beginner',
        duration: 45,
        exerciseCount: 6
      },
      {
        id: 2,
        name: 'Cardio HIIT',
        description: 'Entrenamiento de alta intensidad de 20 minutos',
        category: 'cardio',
        difficulty: 'intermediate',
        duration: 20,
        exerciseCount: 8
      }
    ];
  } catch (error) {
    console.error('Error getting workout templates:', error);
    throw error;
  }
};