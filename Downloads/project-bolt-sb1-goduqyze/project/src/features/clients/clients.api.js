// Clients API functions
const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

// Obtener todos los clientes
export const getClients = async (filters = {}) => {
  try {
    // TODO: Implementar llamada real a la API
    // const queryParams = new URLSearchParams(filters);
    // const response = await fetch(`${BASE_URL}/clients?${queryParams}`);
    // if (!response.ok) throw new Error('Error fetching clients');
    // return await response.json();
    
    // Mock data for development
    return [
      {
        id: 1,
        name: 'María López',
        email: 'maria.lopez@email.com',
        phone: '+34 600 123 456',
        status: 'active',
        joinDate: '2023-12-15',
        birthDate: '1985-03-20',
        goals: 'Perder peso y tonificar',
        medicalNotes: 'Sin restricciones médicas'
      },
      {
        id: 2,
        name: 'Carlos Ruiz',
        email: 'carlos.ruiz@email.com',
        phone: '+34 600 654 321',
        status: 'active',
        joinDate: '2024-01-05',
        birthDate: '1990-07-15',
        goals: 'Ganar masa muscular',
        medicalNotes: 'Lesión previa en rodilla derecha'
      }
    ];
  } catch (error) {
    console.error('Error getting clients:', error);
    throw error;
  }
};

// Obtener un cliente por ID
export const getClientById = async (clientId) => {
  try {
    // TODO: Implementar llamada real a la API
    // const response = await fetch(`${BASE_URL}/clients/${clientId}`);
    // if (!response.ok) throw new Error('Error fetching client');
    // return await response.json();
    
    // Mock data for development
    return {
      id: clientId,
      name: 'María López',
      email: 'maria.lopez@email.com',
      phone: '+34 600 123 456',
      status: 'active',
      joinDate: '2023-12-15',
      birthDate: '1985-03-20',
      height: 165,
      weight: 68,
      goals: 'Perder peso y tonificar',
      medicalNotes: 'Sin restricciones médicas',
      emergencyContact: {
        name: 'Juan López',
        phone: '+34 600 111 222',
        relationship: 'Esposo'
      }
    };
  } catch (error) {
    console.error('Error getting client:', error);
    throw error;
  }
};

// Crear un nuevo cliente
export const createClient = async (clientData) => {
  try {
    // TODO: Implementar llamada real a la API
    // const response = await fetch(`${BASE_URL}/clients`, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(clientData),
    // });
    // if (!response.ok) throw new Error('Error creating client');
    // return await response.json();
    
    // Mock response for development
    console.log('Creating client:', clientData);
    return {
      id: Date.now(),
      ...clientData,
      status: 'active',
      joinDate: new Date().toISOString().split('T')[0]
    };
  } catch (error) {
    console.error('Error creating client:', error);
    throw error;
  }
};

// Actualizar un cliente
export const updateClient = async (clientId, clientData) => {
  try {
    // TODO: Implementar llamada real a la API
    // const response = await fetch(`${BASE_URL}/clients/${clientId}`, {
    //   method: 'PUT',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(clientData),
    // });
    // if (!response.ok) throw new Error('Error updating client');
    // return await response.json();
    
    // Mock response for development
    console.log('Updating client:', clientId, clientData);
    return { id: clientId, ...clientData };
  } catch (error) {
    console.error('Error updating client:', error);
    throw error;
  }
};

// Eliminar un cliente
export const deleteClient = async (clientId) => {
  try {
    // TODO: Implementar llamada real a la API
    // const response = await fetch(`${BASE_URL}/clients/${clientId}`, {
    //   method: 'DELETE',
    // });
    // if (!response.ok) throw new Error('Error deleting client');
    // return await response.json();
    
    // Mock response for development
    console.log('Deleting client:', clientId);
    return { success: true, message: 'Cliente eliminado correctamente' };
  } catch (error) {
    console.error('Error deleting client:', error);
    throw error;
  }
};

// Obtener progreso del cliente
export const getClientProgress = async (clientId) => {
  try {
    // TODO: Implementar llamada real a la API
    // const response = await fetch(`${BASE_URL}/clients/${clientId}/progress`);
    // if (!response.ok) throw new Error('Error fetching client progress');
    // return await response.json();
    
    // Mock data for development
    return [
      { date: '2024-01-01', weight: 70, bodyFat: 25, muscle: 32 },
      { date: '2024-01-08', weight: 69.5, bodyFat: 24.5, muscle: 32.2 },
      { date: '2024-01-15', weight: 69, bodyFat: 24, muscle: 32.5 }
    ];
  } catch (error) {
    console.error('Error getting client progress:', error);
    throw error;
  }
};