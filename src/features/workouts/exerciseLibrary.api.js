// API para la biblioteca de ejercicios
const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

// Obtener todos los ejercicios de la biblioteca
export const getExerciseLibrary = async () => {
  try {
    // TODO: Implementar llamada real a la API
    // const response = await fetch(`${BASE_URL}/exercise-library`);
    // if (!response.ok) throw new Error('Error fetching exercise library');
    // return await response.json();
    
    // Mock data for development
    return [
      {
        id: 1,
        name: 'Press de banca',
        muscle_group: 'Pecho',
        equipment: 'Barra',
        sets: 3,
        reps: '8-10',
        weight: '60kg',
        rest: '90s',
        notes: 'Mantener la espalda pegada al banco',
        difficulty: 'intermediate',
        instructions: 'Acostarse en el banco, agarrar la barra con las manos separadas al ancho de los hombros',
        createdDate: '2024-01-15'
      },
      {
        id: 2,
        name: 'Sentadillas',
        muscle_group: 'Piernas',
        equipment: 'Peso corporal',
        sets: 3,
        reps: '12-15',
        weight: '',
        rest: '60s',
        notes: 'Bajar hasta que los muslos estén paralelos al suelo',
        difficulty: 'beginner',
        instructions: 'Pies separados al ancho de los hombros, bajar como si fueras a sentarte',
        createdDate: '2024-01-15'
      },
      {
        id: 3,
        name: 'Dominadas',
        muscle_group: 'Espalda',
        equipment: 'Barra de dominadas',
        sets: 3,
        reps: '6-8',
        weight: '',
        rest: '120s',
        notes: 'Subir hasta que la barbilla pase la barra',
        difficulty: 'advanced',
        instructions: 'Colgarse de la barra con agarre prono, subir el cuerpo hasta pasar la barbilla',
        createdDate: '2024-01-15'
      },
      {
        id: 4,
        name: 'Curl de bíceps',
        muscle_group: 'Bíceps',
        equipment: 'Mancuernas',
        sets: 3,
        reps: '10-12',
        weight: '12kg',
        rest: '60s',
        notes: 'Movimiento controlado, sin balanceo',
        difficulty: 'beginner',
        instructions: 'De pie, brazos extendidos, flexionar los codos llevando las mancuernas hacia los hombros',
        createdDate: '2024-01-15'
      },
      {
        id: 5,
        name: 'Plancha',
        muscle_group: 'Core',
        equipment: 'Peso corporal',
        sets: 3,
        reps: '30-60s',
        weight: '',
        rest: '60s',
        notes: 'Mantener el cuerpo recto como una tabla',
        difficulty: 'beginner',
        instructions: 'Posición de flexión pero apoyado en antebrazos, mantener posición',
        createdDate: '2024-01-15'
      },
      {
        id: 6,
        name: 'Peso muerto',
        muscle_group: 'Espalda',
        equipment: 'Barra',
        sets: 3,
        reps: '6-8',
        weight: '80kg',
        rest: '120s',
        notes: 'Mantener la espalda recta durante todo el movimiento',
        difficulty: 'intermediate',
        instructions: 'Pies separados al ancho de caderas, levantar la barra desde el suelo hasta la cadera',
        createdDate: '2024-01-15'
      },
      {
        id: 7,
        name: 'Press militar',
        muscle_group: 'Hombros',
        equipment: 'Barra',
        sets: 3,
        reps: '8-10',
        weight: '40kg',
        rest: '90s',
        notes: 'Presionar la barra desde los hombros hasta arriba',
        difficulty: 'intermediate',
        instructions: 'De pie, barra a la altura de los hombros, presionar hacia arriba',
        createdDate: '2024-01-15'
      },
      {
        id: 8,
        name: 'Burpees',
        muscle_group: 'Core',
        equipment: 'Peso corporal',
        sets: 3,
        reps: '10-15',
        weight: '',
        rest: '90s',
        notes: 'Ejercicio completo de cuerpo entero',
        difficulty: 'intermediate',
        instructions: 'Flexión, salto hacia atrás, flexión, salto hacia adelante, salto vertical',
        createdDate: '2024-01-15'
      }
    ];
  } catch (error) {
    console.error('Error getting exercise library:', error);
    throw error;
  }
};

// Agregar ejercicio a la biblioteca
export const addExerciseToLibrary = async (exerciseData) => {
  try {
    // TODO: Implementar llamada real a la API
    // const response = await fetch(`${BASE_URL}/exercise-library`, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(exerciseData),
    // });
    // if (!response.ok) throw new Error('Error adding exercise to library');
    // return await response.json();
    
    // Mock response for development
    console.log('Adding exercise to library:', exerciseData);
    return {
      id: Date.now(),
      ...exerciseData,
      createdDate: new Date().toISOString().split('T')[0]
    };
  } catch (error) {
    console.error('Error adding exercise to library:', error);
    throw error;
  }
};

// Eliminar ejercicio de la biblioteca
export const removeExerciseFromLibrary = async (exerciseId) => {
  try {
    // TODO: Implementar llamada real a la API
    // const response = await fetch(`${BASE_URL}/exercise-library/${exerciseId}`, {
    //   method: 'DELETE',
    // });
    // if (!response.ok) throw new Error('Error removing exercise from library');
    // return await response.json();
    
    // Mock response for development
    console.log('Removing exercise from library:', exerciseId);
    return { success: true };
  } catch (error) {
    console.error('Error removing exercise from library:', error);
    throw error;
  }
};

// Buscar ejercicios en la biblioteca
export const searchExerciseLibrary = async (query, filters = {}) => {
  try {
    const allExercises = await getExerciseLibrary();
    
    let filteredExercises = allExercises;
    
    // Filtrar por búsqueda de texto
    if (query) {
      filteredExercises = filteredExercises.filter(exercise =>
        exercise.name.toLowerCase().includes(query.toLowerCase()) ||
        exercise.muscle_group.toLowerCase().includes(query.toLowerCase()) ||
        exercise.equipment.toLowerCase().includes(query.toLowerCase())
      );
    }
    
    // Filtrar por grupo muscular
    if (filters.muscle_group && filters.muscle_group !== 'all') {
      filteredExercises = filteredExercises.filter(exercise =>
        exercise.muscle_group === filters.muscle_group
      );
    }
    
    // Filtrar por equipamiento
    if (filters.equipment && filters.equipment !== 'all') {
      filteredExercises = filteredExercises.filter(exercise =>
        exercise.equipment === filters.equipment
      );
    }
    
    // Filtrar por dificultad
    if (filters.difficulty && filters.difficulty !== 'all') {
      filteredExercises = filteredExercises.filter(exercise =>
        exercise.difficulty === filters.difficulty
      );
    }
    
    return filteredExercises;
  } catch (error) {
    console.error('Error searching exercise library:', error);
    throw error;
  }
};