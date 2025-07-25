// Mock data for microcycle templates
let microcycleTemplates = [
  {
    id: 1,
    name: "Fuerza Básica 5 Días",
    description: "Rutina de fuerza enfocada en movimientos básicos para desarrollo muscular general",
    category: "strength",
    difficulty: "beginner",
    targetMuscles: ["Pecho", "Espalda", "Piernas", "Hombros", "Core"],
    totalDuration: 225,
    rating: 4.5,
    uses: 156,
    createdDate: "2024-01-15",
    days: {
      monday: {
        name: "Pecho y Tríceps",
        duration: 45,
        focus: "Tren superior - Push",
        exercises: [
          { id: 1, name: "Press de banca", sets: 4, reps: "8-10", muscleGroup: "Pecho" },
          { id: 2, name: "Press inclinado con mancuernas", sets: 3, reps: "10-12", muscleGroup: "Pecho" },
          { id: 3, name: "Fondos en paralelas", sets: 3, reps: "8-12", muscleGroup: "Pecho" },
          { id: 4, name: "Press francés", sets: 3, reps: "10-12", muscleGroup: "Tríceps" },
          { id: 5, name: "Extensiones de tríceps en polea", sets: 3, reps: "12-15", muscleGroup: "Tríceps" }
        ]
      },
      tuesday: {
        name: "Espalda y Bíceps",
        duration: 45,
        focus: "Tren superior - Pull",
        exercises: [
          { id: 6, name: "Dominadas", sets: 4, reps: "6-10", muscleGroup: "Espalda" },
          { id: 7, name: "Remo con barra", sets: 4, reps: "8-10", muscleGroup: "Espalda" },
          { id: 8, name: "Remo en polea baja", sets: 3, reps: "10-12", muscleGroup: "Espalda" },
          { id: 9, name: "Curl de bíceps con barra", sets: 3, reps: "10-12", muscleGroup: "Bíceps" },
          { id: 10, name: "Curl martillo", sets: 3, reps: "12-15", muscleGroup: "Bíceps" }
        ]
      },
      wednesday: {
        name: "Piernas",
        duration: 45,
        focus: "Tren inferior completo",
        exercises: [
          { id: 11, name: "Sentadillas", sets: 4, reps: "8-10", muscleGroup: "Piernas" },
          { id: 12, name: "Peso muerto rumano", sets: 4, reps: "8-10", muscleGroup: "Piernas" },
          { id: 13, name: "Prensa de piernas", sets: 3, reps: "12-15", muscleGroup: "Piernas" },
          { id: 14, name: "Curl femoral", sets: 3, reps: "12-15", muscleGroup: "Piernas" },
          { id: 15, name: "Elevaciones de pantorrillas", sets: 4, reps: "15-20", muscleGroup: "Pantorrillas" }
        ]
      },
      thursday: {
        name: "Hombros y Core",
        duration: 45,
        focus: "Hombros y estabilización",
        exercises: [
          { id: 16, name: "Press militar", sets: 4, reps: "8-10", muscleGroup: "Hombros" },
          { id: 17, name: "Elevaciones laterales", sets: 3, reps: "12-15", muscleGroup: "Hombros" },
          { id: 18, name: "Elevaciones posteriores", sets: 3, reps: "12-15", muscleGroup: "Hombros" },
          { id: 19, name: "Plancha", sets: 3, reps: "30-60s", muscleGroup: "Core" },
          { id: 20, name: "Abdominales bicicleta", sets: 3, reps: "20-30", muscleGroup: "Core" }
        ]
      },
      friday: {
        name: "Circuito Full Body",
        duration: 45,
        focus: "Acondicionamiento general",
        exercises: [
          { id: 21, name: "Burpees", sets: 3, reps: "10-15", muscleGroup: "Cardio" },
          { id: 22, name: "Sentadillas con salto", sets: 3, reps: "15-20", muscleGroup: "Piernas" },
          { id: 23, name: "Flexiones", sets: 3, reps: "10-20", muscleGroup: "Pecho" },
          { id: 24, name: "Mountain climbers", sets: 3, reps: "20-30", muscleGroup: "Core" },
          { id: 25, name: "Jumping jacks", sets: 3, reps: "30-45", muscleGroup: "Cardio" }
        ]
      }
    }
  },
  {
    id: 2,
    name: "HIIT Intenso",
    description: "Entrenamiento de alta intensidad para quemar grasa y mejorar resistencia cardiovascular",
    category: "cardio",
    difficulty: "intermediate",
    targetMuscles: ["Cardio", "Core", "Piernas", "Glúteos"],
    totalDuration: 150,
    rating: 4.2,
    uses: 89,
    createdDate: "2024-02-01",
    days: {
      monday: {
        name: "HIIT Tren Superior",
        duration: 30,
        focus: "Cardio + Fuerza superior",
        exercises: [
          { id: 26, name: "Burpees", sets: 4, reps: "30s", muscleGroup: "Cardio" },
          { id: 27, name: "Flexiones explosivas", sets: 4, reps: "20s", muscleGroup: "Pecho" },
          { id: 28, name: "Battle ropes", sets: 4, reps: "30s", muscleGroup: "Cardio" },
          { id: 29, name: "Plancha dinámica", sets: 4, reps: "20s", muscleGroup: "Core" }
        ]
      },
      tuesday: {
        name: "HIIT Tren Inferior",
        duration: 30,
        focus: "Cardio + Fuerza inferior",
        exercises: [
          { id: 30, name: "Sentadillas con salto", sets: 4, reps: "30s", muscleGroup: "Piernas" },
          { id: 31, name: "Lunges alternos", sets: 4, reps: "30s", muscleGroup: "Piernas" },
          { id: 32, name: "Box jumps", sets: 4, reps: "20s", muscleGroup: "Piernas" },
          { id: 33, name: "Sprints en el lugar", sets: 4, reps: "30s", muscleGroup: "Cardio" }
        ]
      },
      wednesday: {
        name: "HIIT Core",
        duration: 30,
        focus: "Core y estabilización",
        exercises: [
          { id: 34, name: "Mountain climbers", sets: 4, reps: "30s", muscleGroup: "Core" },
          { id: 35, name: "Russian twists", sets: 4, reps: "30s", muscleGroup: "Core" },
          { id: 36, name: "Plancha lateral", sets: 4, reps: "20s cada lado", muscleGroup: "Core" },
          { id: 37, name: "Dead bug", sets: 4, reps: "30s", muscleGroup: "Core" }
        ]
      },
      thursday: {
        name: "HIIT Full Body",
        duration: 30,
        focus: "Cuerpo completo",
        exercises: [
          { id: 38, name: "Thrusters", sets: 4, reps: "30s", muscleGroup: "Cardio" },
          { id: 39, name: "Renegade rows", sets: 4, reps: "20s", muscleGroup: "Espalda" },
          { id: 40, name: "Squat to press", sets: 4, reps: "30s", muscleGroup: "Piernas" },
          { id: 41, name: "Bear crawl", sets: 4, reps: "20s", muscleGroup: "Core" }
        ]
      },
      friday: {
        name: "HIIT Metabólico",
        duration: 30,
        focus: "Quema de grasa",
        exercises: [
          { id: 42, name: "Kettlebell swings", sets: 4, reps: "30s", muscleGroup: "Glúteos" },
          { id: 43, name: "High knees", sets: 4, reps: "30s", muscleGroup: "Cardio" },
          { id: 44, name: "Jump squats", sets: 4, reps: "20s", muscleGroup: "Piernas" },
          { id: 45, name: "Jumping jacks", sets: 4, reps: "30s", muscleGroup: "Cardio" }
        ]
      }
    }
  },
  {
    id: 3,
    name: "Powerlifting Avanzado",
    description: "Rutina especializada en los tres movimientos básicos del powerlifting con accesorios",
    category: "powerlifting",
    difficulty: "advanced",
    targetMuscles: ["Pecho", "Espalda", "Piernas", "Core"],
    totalDuration: 300,
    rating: 4.8,
    uses: 45,
    createdDate: "2024-01-20",
    days: {
      monday: {
        name: "Sentadilla + Accesorios",
        duration: 60,
        focus: "Sentadilla y tren inferior",
        exercises: [
          { id: 46, name: "Sentadilla con barra", sets: 5, reps: "3-5", muscleGroup: "Piernas" },
          { id: 47, name: "Sentadilla frontal", sets: 4, reps: "6-8", muscleGroup: "Piernas" },
          { id: 48, name: "Peso muerto rumano", sets: 4, reps: "8-10", muscleGroup: "Piernas" },
          { id: 49, name: "Prensa de piernas", sets: 3, reps: "12-15", muscleGroup: "Piernas" },
          { id: 50, name: "Plancha", sets: 3, reps: "60s", muscleGroup: "Core" }
        ]
      },
      tuesday: {
        name: "Press Banca + Accesorios",
        duration: 60,
        focus: "Press de banca y tren superior",
        exercises: [
          { id: 51, name: "Press de banca", sets: 5, reps: "3-5", muscleGroup: "Pecho" },
          { id: 52, name: "Press inclinado", sets: 4, reps: "6-8", muscleGroup: "Pecho" },
          { id: 53, name: "Press militar", sets: 4, reps: "8-10", muscleGroup: "Hombros" },
          { id: 54, name: "Fondos en paralelas", sets: 3, reps: "10-15", muscleGroup: "Pecho" },
          { id: 55, name: "Press francés", sets: 3, reps: "10-12", muscleGroup: "Tríceps" }
        ]
      },
      wednesday: {
        name: "Peso Muerto + Accesorios",
        duration: 60,
        focus: "Peso muerto y espalda",
        exercises: [
          { id: 56, name: "Peso muerto convencional", sets: 5, reps: "3-5", muscleGroup: "Espalda" },
          { id: 57, name: "Peso muerto sumo", sets: 4, reps: "6-8", muscleGroup: "Espalda" },
          { id: 58, name: "Remo con barra", sets: 4, reps: "8-10", muscleGroup: "Espalda" },
          { id: 59, name: "Dominadas lastradas", sets: 3, reps: "6-10", muscleGroup: "Espalda" },
          { id: 60, name: "Curl de bíceps", sets: 3, reps: "10-12", muscleGroup: "Bíceps" }
        ]
      },
      thursday: {
        name: "Sentadilla Volumen",
        duration: 60,
        focus: "Volumen en sentadilla",
        exercises: [
          { id: 61, name: "Sentadilla (70-80%)", sets: 4, reps: "6-8", muscleGroup: "Piernas" },
          { id: 62, name: "Sentadilla pausa", sets: 3, reps: "5-6", muscleGroup: "Piernas" },
          { id: 63, name: "Sentadilla búlgara", sets: 3, reps: "10-12", muscleGroup: "Piernas" },
          { id: 64, name: "Extensiones de cuádriceps", sets: 3, reps: "15-20", muscleGroup: "Piernas" },
          { id: 65, name: "Plancha lateral", sets: 3, reps: "45s cada lado", muscleGroup: "Core" }
        ]
      },
      friday: {
        name: "Press Banca Volumen",
        duration: 60,
        focus: "Volumen en press de banca",
        exercises: [
          { id: 66, name: "Press de banca (70-80%)", sets: 4, reps: "6-8", muscleGroup: "Pecho" },
          { id: 67, name: "Press banca agarre cerrado", sets: 3, reps: "8-10", muscleGroup: "Tríceps" },
          { id: 68, name: "Press con mancuernas", sets: 3, reps: "10-12", muscleGroup: "Pecho" },
          { id: 69, name: "Elevaciones laterales", sets: 4, reps: "12-15", muscleGroup: "Hombros" },
          { id: 70, name: "Extensiones de tríceps", sets: 3, reps: "12-15", muscleGroup: "Tríceps" }
        ]
      }
    }
  }
];

// Get all microcycle templates with optional filtering
export const getMicrocycleTemplates = async (filters = {}) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      let filteredTemplates = [...microcycleTemplates];
      
      // Filter by category
      if (filters.category && filters.category !== 'all') {
        filteredTemplates = filteredTemplates.filter(template => 
          template.category === filters.category
        );
      }
      
      // Filter by difficulty
      if (filters.difficulty && filters.difficulty !== 'all') {
        filteredTemplates = filteredTemplates.filter(template => 
          template.difficulty === filters.difficulty
        );
      }
      
      // Filter by target muscles
      if (filters.targetMuscles && filters.targetMuscles.length > 0) {
        filteredTemplates = filteredTemplates.filter(template => 
          filters.targetMuscles.some(muscle => 
            template.targetMuscles.includes(muscle)
          )
        );
      }
      
      // Search by name or description
      if (filters.search) {
        const searchTerm = filters.search.toLowerCase();
        filteredTemplates = filteredTemplates.filter(template => 
          template.name.toLowerCase().includes(searchTerm) ||
          template.description.toLowerCase().includes(searchTerm)
        );
      }
      
      // Sort by rating, uses, or date
      if (filters.sortBy) {
        filteredTemplates.sort((a, b) => {
          switch (filters.sortBy) {
            case 'rating':
              return b.rating - a.rating;
            case 'uses':
              return b.uses - a.uses;
            case 'date':
              return new Date(b.createdDate) - new Date(a.createdDate);
            case 'name':
              return a.name.localeCompare(b.name);
            default:
              return 0;
          }
        });
      }
      
      resolve({
        success: true,
        data: filteredTemplates,
        total: filteredTemplates.length
      });
    }, 300);
  });
};

// Get a specific microcycle template by ID
export const getMicrocycleTemplate = async (templateId) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const template = microcycleTemplates.find(t => t.id === parseInt(templateId));
      
      if (template) {
        resolve({
          success: true,
          data: template
        });
      } else {
        reject({
          success: false,
          error: 'Plantilla no encontrada'
        });
      }
    }, 200);
  });
};

// Create a new microcycle template
export const createMicrocycleTemplate = async (templateData) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newTemplate = {
        ...templateData,
        id: Math.max(...microcycleTemplates.map(t => t.id)) + 1,
        rating: 0,
        uses: 0,
        createdDate: new Date().toISOString().split('T')[0]
      };
      
      microcycleTemplates.push(newTemplate);
      
      resolve({
        success: true,
        data: newTemplate,
        message: 'Plantilla creada exitosamente'
      });
    }, 500);
  });
};

// Update an existing microcycle template
export const updateMicrocycleTemplate = async (templateId, templateData) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const index = microcycleTemplates.findIndex(t => t.id === parseInt(templateId));
      
      if (index !== -1) {
        microcycleTemplates[index] = {
          ...microcycleTemplates[index],
          ...templateData,
          id: parseInt(templateId) // Ensure ID doesn't change
        };
        
        resolve({
          success: true,
          data: microcycleTemplates[index],
          message: 'Plantilla actualizada exitosamente'
        });
      } else {
        reject({
          success: false,
          error: 'Plantilla no encontrada'
        });
      }
    }, 500);
  });
};

// Delete a microcycle template
export const deleteMicrocycleTemplate = async (templateId) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const index = microcycleTemplates.findIndex(t => t.id === parseInt(templateId));
      
      if (index !== -1) {
        const deletedTemplate = microcycleTemplates.splice(index, 1)[0];
        
        resolve({
          success: true,
          data: deletedTemplate,
          message: 'Plantilla eliminada exitosamente'
        });
      } else {
        reject({
          success: false,
          error: 'Plantilla no encontrada'
        });
      }
    }, 300);
  });
};

// Apply a microcycle template to a client's workout plan
export const applyMicrocycleTemplate = async (templateId, clientId, startDate, options = {}) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const template = microcycleTemplates.find(t => t.id === parseInt(templateId));
      
      if (!template) {
        reject({
          success: false,
          error: 'Plantilla no encontrada'
        });
        return;
      }
      
      // Increment usage count
      template.uses += 1;
      
      // Generate workout plan based on template
      const workoutPlan = {
        id: Date.now(),
        clientId: parseInt(clientId),
        templateId: parseInt(templateId),
        templateName: template.name,
        startDate,
        endDate: new Date(new Date(startDate).getTime() + 6 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        status: 'active',
        progress: 0,
        dailyWorkouts: {},
        createdDate: new Date().toISOString().split('T')[0],
        ...options
      };
      
      // Convert template days to actual dates
      const dayKeys = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'];
      const startDateObj = new Date(startDate);
      
      dayKeys.forEach((dayKey, index) => {
        const workoutDate = new Date(startDateObj);
        workoutDate.setDate(startDateObj.getDate() + index);
        const dateKey = workoutDate.toISOString().split('T')[0];
        
        if (template.days[dayKey] && template.days[dayKey].exercises.length > 0) {
          workoutPlan.dailyWorkouts[dateKey] = {
            ...template.days[dayKey],
            date: dateKey,
            completed: false,
            actualDuration: 0
          };
        }
      });
      
      resolve({
        success: true,
        data: workoutPlan,
        message: `Plantilla "${template.name}" aplicada exitosamente`
      });
    }, 600);
  });
};

// Get template statistics
export const getTemplateStats = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const stats = {
        totalTemplates: microcycleTemplates.length,
        totalUses: microcycleTemplates.reduce((sum, template) => sum + template.uses, 0),
        averageRating: microcycleTemplates.reduce((sum, template) => sum + template.rating, 0) / microcycleTemplates.length,
        categoriesCount: {
          strength: microcycleTemplates.filter(t => t.category === 'strength').length,
          cardio: microcycleTemplates.filter(t => t.category === 'cardio').length,
          powerlifting: microcycleTemplates.filter(t => t.category === 'powerlifting').length,
          functional: microcycleTemplates.filter(t => t.category === 'functional').length,
          flexibility: microcycleTemplates.filter(t => t.category === 'flexibility').length
        },
        difficultyCount: {
          beginner: microcycleTemplates.filter(t => t.difficulty === 'beginner').length,
          intermediate: microcycleTemplates.filter(t => t.difficulty === 'intermediate').length,
          advanced: microcycleTemplates.filter(t => t.difficulty === 'advanced').length
        },
        mostUsed: microcycleTemplates.sort((a, b) => b.uses - a.uses).slice(0, 5),
        topRated: microcycleTemplates.sort((a, b) => b.rating - a.rating).slice(0, 5)
      };
      
      resolve({
        success: true,
        data: stats
      });
    }, 200);
  });
};

// Rate a template
export const rateMicrocycleTemplate = async (templateId, rating) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const template = microcycleTemplates.find(t => t.id === parseInt(templateId));
      
      if (!template) {
        reject({
          success: false,
          error: 'Plantilla no encontrada'
        });
        return;
      }
      
      // Simple rating update (in a real app, you'd track individual ratings)
      template.rating = ((template.rating * template.uses) + rating) / (template.uses + 1);
      
      resolve({
        success: true,
        data: { rating: template.rating },
        message: 'Calificación guardada exitosamente'
      });
    }, 300);
  });
};

export default {
  getMicrocycleTemplates,
  getMicrocycleTemplate,
  createMicrocycleTemplate,
  updateMicrocycleTemplate,
  deleteMicrocycleTemplate,
  applyMicrocycleTemplate,
  getTemplateStats,
  rateMicrocycleTemplate
};