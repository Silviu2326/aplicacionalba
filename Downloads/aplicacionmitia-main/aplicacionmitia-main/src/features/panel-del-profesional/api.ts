// Mock API functions
// In a real application, you would fetch this data from a server.

export const getAvailability = async () => {
    console.log('Fetching availability...');
    // Mock data
    const availability = [
      {
        id: 1,
        title: 'Disponible',
        start: new Date(2025, 6, 14, 10, 0, 0),
        end: new Date(2025, 6, 14, 11, 0, 0),
        isAvailable: true,
      },
      {
        id: 2,
        title: 'Reservado',
        start: new Date(2025, 6, 15, 14, 0, 0),
        end: new Date(2025, 6, 15, 15, 0, 0),
        isAvailable: false,
      },
    ];
    return Promise.resolve(availability);
  };
  
  export const updateAvailability = async (availability) => {
    console.log('Updating availability...', availability);
    // This is a mock function. In a real app, you would send this to the server.
    // Here we just return the updated availability.
    return Promise.resolve(availability);
  };

export const getStats = async (dateRange) => {
  console.log(`Fetching stats for range: ${dateRange}...`);
  // Mock data based on date range
  const stats = {
    last_30_days: {
      monthly_income: 4500,
      completed_sessions: 30,
      average_rating: 4.8,
      new_clients: 12,
    },
    this_month: {
      monthly_income: 5200,
      completed_sessions: 35,
      average_rating: 4.9,
      new_clients: 15,
    },
    this_year: {
      monthly_income: 60000,
      completed_sessions: 400,
      average_rating: 4.7,
      new_clients: 150,
    },
  };
  return Promise.resolve(stats[dateRange]);
};

export const getSubscription = async () => {
  console.log('Fetching subscription...');
  // Mock data
  const subscription = {
    name: 'Plan Pro',
    status: 'Activo',
    nextBilling: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString(),
    features: ['Hasta 50 clientes', 'Soporte prioritario', 'Videollamadas HD'],
  };
  return Promise.resolve(subscription);
};

// --- Funciones de Chat ---

export const getConversations = async () => {
  console.log('Fetching conversations...');
  const conversations = [
    { id: 1, name: 'Ana García', lastMessage: 'Perfecto, nos vemos entonces.', unread: 2, timestamp: '10:45 AM' },
    { id: 2, name: 'Carlos Rodríguez', lastMessage: 'Gracias por la aclaración.', unread: 0, timestamp: 'Ayer' },
    { id: 3, name: 'Beatriz Álvarez', lastMessage: '¿Podríamos mover la sesión a las 5pm?', unread: 0, timestamp: 'Ayer' },
    { id: 4, name: 'David Martínez', lastMessage: 'He completado las tareas que me asignaste.', unread: 5, timestamp: 'Lunes' },
    { id: 5, name: 'Elena Fernández', lastMessage: 'Te confirmo mi asistencia.', unread: 0, timestamp: 'Lunes' },
  ];
  return Promise.resolve(conversations);
};

export const getMessages = async (conversationId: number) => {
  console.log(`Fetching messages for conversation ${conversationId}...`);
  const messagesData = {
    1: [
      { from: 'other', text: 'Hola, ¿cómo estás?', time: '10:40 AM' },
      { from: 'me', text: '¡Hola Ana! Muy bien, gracias. ¿Y tú?', time: '10:41 AM' },
      { from: 'other', text: 'Todo bien por aquí. Quería confirmar nuestra sesión de mañana.', time: '10:42 AM' },
      { from: 'me', text: 'Confirmado. Mañana a las 11am, como acordamos.', time: '10:43 AM' },
      { from: 'other', text: 'Perfecto, nos vemos entonces.', time: '10:45 AM' },
    ],
    2: [
      { from: 'other', text: 'Hola, tengo una duda sobre el último ejercicio.', time: 'Ayer' },
      { from: 'me', text: 'Claro, dime Carlos. ¿En qué puedo ayudarte?', time: 'Ayer' },
      { from: 'other', text: 'Gracias por la aclaración.', time: 'Ayer' },
    ],
    4: [
      { from: 'other', text: 'Hola, buen día.', time: 'Lunes' },
      { from: 'other', text: 'Quería comentarte que...', time: 'Lunes' },
      { from: 'other', text: 'He completado las tareas que me asignaste.', time: 'Lunes' },
    ]
  };
  return Promise.resolve(messagesData[conversationId] || []);
}

export const sendMessage = async (conversationId: number, message: string) => {
  console.log(`Sending message to conversation ${conversationId}: ${message}`);
  const newMessage = {
    from: 'me',
    text: message,
    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
  };
  // In a real app, you'd get the updated message list from the server
  return Promise.resolve(newMessage);
};

// --- Funciones de Recursos ---

const mockResources = [
    { id: 1, name: 'Guía de Mindfulness.pdf', date: '2023-10-27', professionalId: 1, clientId: 1 },
    { id: 2, name: 'Técnicas de Relajación.mp3', date: '2023-10-25', professionalId: 1, clientId: 1 },
    { id: 3, name: 'Artículo sobre Ansiedad Social', url: 'https://example.com/ansiedad-social', date: '2023-10-22', professionalId: 1, clientId: 2 },
];

export const getResources = async (professionalId: number, clientId: number) => {
    console.log(`Fetching resources for professional ${professionalId} and client ${clientId}...`);
    const resources = mockResources.filter(r => r.professionalId === professionalId && r.clientId === clientId);
    return Promise.resolve(resources);
}

export const uploadResource = async (professionalId: number, clientId: number, file: File) => {
    console.log(`Uploading resource for professional ${professionalId} and client ${clientId}...`, file);
    const newResource = {
        id: mockResources.length + 1,
        name: file.name,
        date: new Date().toISOString().split('T')[0],
        professionalId,
        clientId,
    };
    mockResources.push(newResource);
    return Promise.resolve(newResource);
}

export const deleteResource = async (resourceId: number) => {
    console.log(`Deleting resource ${resourceId}...`);
    const index = mockResources.findIndex(r => r.id === resourceId);
    if (index > -1) {
        mockResources.splice(index, 1);
    }
    return Promise.resolve();
}
