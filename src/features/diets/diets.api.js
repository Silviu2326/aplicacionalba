// Diets API functions
const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

// Obtener todos los planes nutricionales
export const getDiets = async (filters = {}) => {
  try {
    // TODO: Implementar llamada real a la API
    // const queryParams = new URLSearchParams(filters);
    // const response = await fetch(`${BASE_URL}/diets?${queryParams}`);
    // if (!response.ok) throw new Error('Error fetching diets');
    // return await response.json();
    
    // Mock data for development
    return [
      {
        id: 1,
        name: 'Plan Pérdida de Peso - Básico',
        description: 'Dieta hipocalórica equilibrada para pérdida de peso gradual',
        category: 'weight_loss',
        calories: 1500,
        macros: { protein: 30, carbs: 40, fat: 30 },
        duration: 8,
        status: 'active',
        createdBy: 'trainer_1',
        createdDate: '2024-01-05'
      },
      {
        id: 2,
        name: 'Plan Ganancia Muscular',
        description: 'Dieta alta en proteínas para ganar masa muscular',
        category: 'muscle_gain',
        calories: 2200,
        macros: { protein: 40, carbs: 35, fat: 25 },
        duration: 12,
        status: 'active',
        createdBy: 'trainer_1',
        createdDate: '2024-01-10'
      }
    ];
  } catch (error) {
    console.error('Error getting diets:', error);
    throw error;
  }
};

// Obtener un plan nutricional por ID
export const getDietById = async (dietId) => {
  try {
    // TODO: Implementar llamada real a la API
    // const response = await fetch(`${BASE_URL}/diets/${dietId}`);
    // if (!response.ok) throw new Error('Error fetching diet');
    // return await response.json();
    
    // Mock data for development
    return {
      id: dietId,
      name: 'Plan Pérdida de Peso - Básico',
      description: 'Dieta hipocalórica equilibrada para pérdida de peso gradual',
      category: 'weight_loss',
      calories: 1500,
      macros: { protein: 30, carbs: 40, fat: 30 },
      duration: 8,
      status: 'active',
      meals: [
        {
          id: 1,
          type: 'breakfast',
          name: 'Desayuno',
          time: '08:00',
          foods: [
            { name: 'Avena', quantity: 50, unit: 'g', calories: 190 },
            { name: 'Plátano', quantity: 1, unit: 'pieza', calories: 89 },
            { name: 'Leche desnatada', quantity: 200, unit: 'ml', calories: 68 }
          ]
        },
        {
          id: 2,
          type: 'lunch',
          name: 'Almuerzo',
          time: '14:00',
          foods: [
            { name: 'Pechuga de pollo', quantity: 150, unit: 'g', calories: 248 },
            { name: 'Arroz integral', quantity: 60, unit: 'g', calories: 216 },
            { name: 'Verduras mixtas', quantity: 200, unit: 'g', calories: 40 }
          ]
        }
      ],
      instructions: 'Beber al menos 2 litros de agua al día. Evitar azúcares refinados.',
      createdBy: 'trainer_1',
      createdDate: '2024-01-05'
    };
  } catch (error) {
    console.error('Error getting diet:', error);
    throw error;
  }
};

// Crear un nuevo plan nutricional
export const createDiet = async (dietData) => {
  try {
    // TODO: Implementar llamada real a la API
    // const response = await fetch(`${BASE_URL}/diets`, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(dietData),
    // });
    // if (!response.ok) throw new Error('Error creating diet');
    // return await response.json();
    
    // Mock response for development
    console.log('Creating diet:', dietData);
    return {
      id: Date.now(),
      ...dietData,
      status: 'draft',
      createdDate: new Date().toISOString().split('T')[0]
    };
  } catch (error) {
    console.error('Error creating diet:', error);
    throw error;
  }
};

// Actualizar un plan nutricional
export const updateDiet = async (dietId, dietData) => {
  try {
    // TODO: Implementar llamada real a la API
    // const response = await fetch(`${BASE_URL}/diets/${dietId}`, {
    //   method: 'PUT',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(dietData),
    // });
    // if (!response.ok) throw new Error('Error updating diet');
    // return await response.json();
    
    // Mock response for development
    console.log('Updating diet:', dietId, dietData);
    return { id: dietId, ...dietData };
  } catch (error) {
    console.error('Error updating diet:', error);
    throw error;
  }
};

// Eliminar un plan nutricional
export const deleteDiet = async (dietId) => {
  try {
    // TODO: Implementar llamada real a la API
    // const response = await fetch(`${BASE_URL}/diets/${dietId}`, {
    //   method: 'DELETE',
    // });
    // if (!response.ok) throw new Error('Error deleting diet');
    // return await response.json();
    
    // Mock response for development
    console.log('Deleting diet:', dietId);
    return { success: true, message: 'Plan nutricional eliminado correctamente' };
  } catch (error) {
    console.error('Error deleting diet:', error);
    throw error;
  }
};

// Asignar plan nutricional a un cliente
export const assignDietToClient = async (dietId, clientId) => {
  try {
    // TODO: Implementar llamada real a la API
    // const response = await fetch(`${BASE_URL}/diets/${dietId}/assign`, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({ clientId }),
    // });
    // if (!response.ok) throw new Error('Error assigning diet');
    // return await response.json();
    
    // Mock response for development
    console.log('Assigning diet', dietId, 'to client', clientId);
    return { 
      success: true, 
      message: 'Plan nutricional asignado correctamente',
      assignmentId: Date.now()
    };
  } catch (error) {
    console.error('Error assigning diet:', error);
    throw error;
  }
};

// Obtener planes nutricionales de un cliente
export const getClientDiets = async (clientId) => {
  try {
    // TODO: Implementar llamada real a la API
    // const response = await fetch(`${BASE_URL}/clients/${clientId}/diets`);
    // if (!response.ok) throw new Error('Error fetching client diets');
    // return await response.json();
    
    // Mock data for development
    return [
      {
        id: 1,
        name: 'Plan Actual - Pérdida de Peso',
        startDate: '2024-01-01',
        endDate: '2024-03-01',
        progress: 65,
        status: 'active'
      }
    ];
  } catch (error) {
    console.error('Error getting client diets:', error);
    throw error;
  }
};