import { Notification } from './components/NotificationItem';

export interface Booking {
  id_reserva: string;
  nombre_profesional: string;
  especialidad: string;
  fecha: string;
  hora: string;
  estado: 'Próxima' | 'Completada' | 'Cancelada';
  valorada: boolean;
  hasSummary?: boolean;
  summaryId?: string;
}

export interface SessionSummary {
  id: string;
  bookingId: string;
  therapistName: string;
  sessionDate: string;
  content: string;
}


export interface Favorite {
  id: string;
  name: string;
  photo: string;
  specialty: string;
  isOnline: boolean;
}

export interface UserProfile {
  id: string;
  name: string;
  lastName: string;
  email: string;
  profilePicture: string;
}

export interface PaymentMethod {
  id: string;
  type: string;
  last4: string;
  expDate: string;
  isDefault: boolean;
}

export interface Message {
  id: string;
  text: string;
  sender: 'user' | 'professional';
  timestamp: string;
  status: 'sending' | 'sent' | 'read';
}

export interface SharedResource {
  id: string;
  name: string;
  sharedAt: string;
  type: 'pdf' | 'word' | 'image' | 'other';
  url: string;
}

export interface JournalEntry {
  id: string;
  title: string;
  content: string;
  date: string;
  tags: string[];
}

export interface SubscriptionStatus {
  planName: string;
  usedSessions: number;
  totalSessions: number;
  nextBillingDate: string;
  planType: 'paquete' | 'suscripcion';
}

export interface Invoice {
  id: string;
  date: string;
  professional: string;
  service: string;
  amount: number;
}

export interface Review {
  id: string;
  professionalName: string;
  date: string;
  rating: number;
  comment: string;
  professionalResponse?: string;
}

export interface EmergencyContact {
  id: string;
  name: string;
  phone: string;
}

// Mock data for booking history
const mockBookings: Booking[] = [
    {
      id_reserva: '1',
      nombre_profesional: 'Dr. Juan Pérez',
      especialidad: 'Psicología Clínica',
      fecha: '2024-08-15',
      hora: '10:00 AM',
      estado: 'Próxima',
      valorada: false,
    },
    {
      id_reserva: '2',
      nombre_profesional: 'Dra. Ana Gómez',
      especialidad: 'Terapia de Pareja',
      fecha: '2024-07-20',
      hora: '03:00 PM',
      estado: 'Completada',
      valorada: false,
      hasSummary: true,
      summaryId: 'summary-1',
    },
    {
      id_reserva: '3',
      nombre_profesional: 'Dr. Carlos Sánchez',
      especialidad: 'Psiquiatría',
      fecha: '2024-06-10',
      hora: '11:00 AM',
      estado: 'Completada',
      valorada: true,
    },
    {
        id_reserva: '4',
        nombre_profesional: 'Dra. Laura Torres',
        especialidad: 'Psicoanálisis',
        fecha: '2024-05-25',
        hora: '01:00 PM',
        estado: 'Cancelada',
        valorada: false,
      },
  ];

const mockSessionSummaries: SessionSummary[] = [
  {
    id: 'summary-1',
    bookingId: '2',
    therapistName: 'Dra. Ana Gómez',
    sessionDate: '2024-07-20',
    content: 'En la sesión de hoy, hemos explorado en profundidad los patrones de comunicación en la relación. Se identificaron puntos clave como la escucha activa y la expresión de necesidades de forma asertiva. Como tarea, se recomienda practicar el ejercicio de "hablar con el objeto" durante 10 minutos cada día para mejorar la empatía y la comprensión mutua. También se discutió la importancia de establecer límites claros y respetuosos. Se nota un progreso significativo en la disposición de ambos para colaborar.'
  }
];

/**
 * Fetches a session summary by its ID.
 * @param {string} summaryId The ID of the summary to fetch.
 * @returns {Promise<SessionSummary>} A promise that resolves to the session summary object.
 */
export const getSessionSummary = async (summaryId: string): Promise<SessionSummary> => {
  console.log(`Fetching session summary with id: ${summaryId}`);
  await new Promise(resolve => setTimeout(resolve, 500));
  const summary = mockSessionSummaries.find(s => s.id === summaryId);
  if (summary) {
    return summary;
  }
  throw new Error('Summary not found');
};


const mockFavorites: Favorite[] = [
    {
        id: 'prof-1',
        name: 'Dra. Isabel Morales',
        photo: 'https://randomuser.me/api/portraits/women/60.jpg',
        specialty: 'Terapia Cognitivo-Conductual',
        isOnline: true,
    },
    {
        id: 'prof-2',
        name: 'Dr. Ricardo Castillo',
        photo: 'https://randomuser.me/api/portraits/men/75.jpg',
        specialty: 'Psicología Infantil',
        isOnline: false,
    },
];
  
  /**
   * Fetches the booking history for the current user.
   * @returns {Promise<Booking[]>} A promise that resolves to an array of booking objects.
   */
  export const getBookingHistory = async (): Promise<Booking[]> => {
    // In a real application, this would make a GET request to /api/v1/user/bookings
    console.log('Fetching booking history...');
    
    // Simulate a network delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Return mock data
    return mockBookings;
  };

  /**
   * Fetches the favorite professionals for the current user.
   * @returns {Promise<Favorite[]>} A promise that resolves to an array of favorite objects.
   */
  export const getFavorites = async (): Promise<Favorite[]> => {
    // In a real application, this would make a GET request to /api/v1/user/favorites
    console.log('Fetching favorites...');
    
    // Simulate a network delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Return mock data
    return mockFavorites;
  };

  /**
   * Deletes a favorite professional for the current user.
   * @param {string} professionalId The ID of the professional to delete.
   * @returns {Promise<void>} A promise that resolves when the deletion is complete.
   */
  export const deleteFavorite = async (professionalId: string): Promise<void> => {
    // In a real application, this would make a DELETE request to /api/v1/user/favorites/{professionalId}
    console.log(`Deleting favorite with id: ${professionalId}`);
    
    // Simulate a network delay
    await new Promise(resolve => setTimeout(resolve, 500));
  };

  const mockUserProfile: UserProfile = {
    id: 'user-123',
    name: 'Carlos',
    lastName: 'Santana',
    email: 'carlos.santana@example.com',
    profilePicture: 'https://randomuser.me/api/portraits/men/5.jpg',
  };
  
  /**
   * Fetches the user's profile data.
   * @returns {Promise<UserProfile>} A promise that resolves to the user profile object.
   */
  export const getUserProfile = async (): Promise<UserProfile> => {
    console.log('Fetching user profile...');
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockUserProfile;
  };
  
  /**
   * Updates the user's profile data.
   * @param {string} userId The ID of the user to update.
   * @param {Partial<UserProfile>} profileData The data to update.
   * @returns {Promise<UserProfile>} A promise that resolves to the updated user profile object.
   */
  export const updateUserProfile = async (userId: string, profileData: Partial<UserProfile>): Promise<UserProfile> => {
    console.log(`Updating profile for user ${userId} with data:`, profileData);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Merge the new data with existing mock data
    const updatedProfile = { ...mockUserProfile, ...profileData };
    
    // In a real app, you'd get the updated profile back from the API
    return updatedProfile;
  };

  const mockPaymentMethods: PaymentMethod[] = [
    { id: 'card_1', type: 'VISA', last4: '4242', expDate: '12/25', isDefault: true },
    { id: 'card_2', type: 'MasterCard', last4: '5555', expDate: '08/26', isDefault: false },
  ];

  /**
 * Fetches the payment methods for the current user.
 * @returns {Promise<PaymentMethod[]>} A promise that resolves to an array of payment method objects.
 */
export const getPaymentMethods = async (): Promise<PaymentMethod[]> => {
  console.log('Fetching payment methods...');
  await new Promise(resolve => setTimeout(resolve, 500));
  return mockPaymentMethods;
};

/**
 * Deletes a payment method for the current user.
 * @param {string} methodId The ID of the payment method to delete.
 * @returns {Promise<void>} A promise that resolves when the deletion is complete.
 */
export const deletePaymentMethod = async (methodId: string): Promise<void> => {
  console.log(`Deleting payment method with id: ${methodId}`);
  await new Promise(resolve => setTimeout(resolve, 500));
};

/**
 * Adds a new payment method for the current user.
 * @param {Omit<PaymentMethod, 'id'>} methodData The data for the new payment method.
 * @returns {Promise<PaymentMethod>} A promise that resolves to the new payment method object.
 */
export const addPaymentMethod = async (methodData: Omit<PaymentMethod, 'id'>): Promise<PaymentMethod> => {
  console.log('Adding new payment method:', methodData);
  await new Promise(resolve => setTimeout(resolve, 1000));
  const newMethod = { ...methodData, id: `card_${new Date().getTime()}` };
  return newMethod;
};

/**
 * Sets a payment method as the default for the current user.
 * @param {string} methodId The ID of the payment method to set as default.
 * @returns {Promise<void>} A promise that resolves when the operation is complete.
 */
export const setDefaultPaymentMethod = async (methodId: string): Promise<void> => {
  console.log(`Setting payment method ${methodId} as default.`);
  await new Promise(resolve => setTimeout(resolve, 500));
};

const mockMessages: { [key: string]: Message[] } = {
  'prof-1': [
    { id: 'msg-1', text: 'Hola, ¿cómo estás?', sender: 'professional', timestamp: '2024-07-15T10:00:00Z', status: 'read' },
    { id: 'msg-2', text: 'Hola! Bien, gracias. Quería saber si tienes disponibilidad para una sesión esta semana.', sender: 'user', timestamp: '2024-07-15T10:01:00Z', status: 'read' },
    { id: 'msg-3', text: 'Claro, tengo un espacio el miércoles a las 4 PM. ¿Te parece bien?', sender: 'professional', timestamp: '2024-07-15T10:02:00Z', status: 'read' },
    { id: 'msg-4', text: 'Perfecto, me viene genial.', sender: 'user', timestamp: '2024-07-15T10:03:00Z', status: 'sent' },
  ],
  'prof-2': [
    { id: 'msg-5', text: 'Buenos días. Te escribo para confirmar nuestra sesión de mañana.', sender: 'professional', timestamp: '2024-07-14T09:00:00Z', status: 'read' },
    { id: 'msg-6', text: 'Confirmado. ¡Muchas gracias!', sender: 'user', timestamp: '2024-07-14T09:05:00Z', status: 'read' },
  ],
};

/**
 * Fetches the message history with a specific professional.
 * @param {string} professionalId The ID of the professional.
 * @returns {Promise<Message[]>} A promise that resolves to an array of message objects.
 */
export const getMessages = async (professionalId: string): Promise<Message[]> => {
  console.log(`Fetching messages for professional: ${professionalId}`);
  await new Promise(resolve => setTimeout(resolve, 500));
  return mockMessages[professionalId] || [];
};

/**
 * Sends a message to a professional.
 * @param {string} professionalId The ID of the professional to send the message to.
 * @param {string} messageText The text of the message.
 * @returns {Promise<Message>} A promise that resolves to the new message object.
 */
export const sendMessage = async (professionalId: string, messageText: string): Promise<Message> => {
  console.log(`Sending message to ${professionalId}: "${messageText}"`);
  await new Promise(resolve => setTimeout(resolve, 1000));
  const newMessage: Message = {
    id: `msg-${new Date().getTime()}`,
    text: messageText,
    sender: 'user',
    timestamp: new Date().toISOString(),
    status: 'sent',
  };
  // In a real app, you'd also add this message to the conversation history on the server.
  if (mockMessages[professionalId]) {
    mockMessages[professionalId].push(newMessage);
  } else {
    mockMessages[professionalId] = [newMessage];
  }
  return newMessage;
};

const mockSharedResources: SharedResource[] = [
    {
      id: 'doc-1',
      name: 'Guía de ejercicios de mindfulness',
      sharedAt: '2024-07-10T14:00:00Z',
      type: 'pdf',
      url: '/path/to/document1.pdf',
    },
    {
      id: 'doc-2',
      name: 'Artículo sobre la ansiedad',
      sharedAt: '2024-07-08T11:30:00Z',
      type: 'word',
      url: '/path/to/document2.docx',
    },
    {
      id: 'doc-3',
      name: 'Infografía de técnicas de relajación',
      sharedAt: '2024-07-05T09:00:00Z',
      type: 'image',
      url: '/path/to/image1.png',
    },
    {
        id: 'doc-4',
        name: 'Diario de pensamientos',
        sharedAt: '2024-07-02T16:45:00Z',
        type: 'other',
        url: '/path/to/document3.txt',
    },
];

/**
 * Fetches the shared resources for the current user.
 * @returns {Promise<SharedResource[]>} A promise that resolves to an array of resource objects.
 */
export const getSharedResources = async (): Promise<SharedResource[]> => {
    console.log('Fetching shared resources...');
    await new Promise(resolve => setTimeout(resolve, 800));
    return mockSharedResources;
};

const mockJournalEntries: JournalEntry[] = [
    {
      id: 'journal-1',
      title: 'Reflexión post-sesión',
      content: 'La sesión de hoy fue muy reveladora. Hablamos sobre mis patrones de pensamiento y cómo puedo empezar a cambiarlos. Me siento con más herramientas ahora.',
      date: '2024-07-15T18:00:00Z',
      tags: ['terapia', 'crecimiento-personal'],
    },
    {
      id: 'journal-2',
      title: 'Un día difícil',
      content: 'Hoy tuve un día complicado en el trabajo y me sentí abrumado. Usé la técnica de respiración que aprendí y me ayudó a calmarme. Aún así, me queda trabajo por hacer.',
      date: '2024-07-12T21:00:00Z',
      tags: ['ansiedad', 'trabajo', 'mindfulness'],
    },
  ];
  
  /**
   * Fetches all journal entries for the user.
   * @returns {Promise<JournalEntry[]>} A promise that resolves to an array of journal entries.
   */
  export const getJournalEntries = async (): Promise<JournalEntry[]> => {
    console.log('Fetching journal entries...');
    await new Promise(resolve => setTimeout(resolve, 500));
    // IMPORTANT: In a real-world scenario, this data must be fetched over a secure, encrypted connection.
    // The backend must ensure that only the authenticated user can access their own entries.
    return mockJournalEntries.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  };
  
  /**
   * Creates a new journal entry.
   * @param {Omit<JournalEntry, 'id' | 'date'>} entryData The data for the new entry.
   * @returns {Promise<JournalEntry>} A promise that resolves to the newly created entry.
   */
  export const createJournalEntry = async (entryData: Omit<JournalEntry, 'id' | 'date'>): Promise<JournalEntry> => {
    console.log('Creating new journal entry...');
    await new Promise(resolve => setTimeout(resolve, 1000));
    const newEntry: JournalEntry = {
      id: `journal-${new Date().getTime()}`,
      ...entryData,
      date: new Date().toISOString(),
      tags: entryData.tags || [],
    };
    // IMPORTANT: Data must be encrypted before being sent to the server.
    // The backend should store this in an encrypted format.
    mockJournalEntries.push(newEntry);
    return newEntry;
  };
  
  /**
   * Updates an existing journal entry.
   * @param {string} entryId The ID of the entry to update.
   * @param {Partial<JournalEntry>} entryData The new data for the entry.
   * @returns {Promise<JournalEntry>} A promise that resolves to the updated entry.
   */
  export const updateJournalEntry = async (entryId: string, entryData: Partial<JournalEntry>): Promise<JournalEntry> => {
    console.log(`Updating journal entry ${entryId}...`);
    await new Promise(resolve => setTimeout(resolve, 1000));
    const entryIndex = mockJournalEntries.findIndex(e => e.id === entryId);
    if (entryIndex > -1) {
      mockJournalEntries[entryIndex] = { ...mockJournalEntries[entryIndex], ...entryData } as JournalEntry;
      return mockJournalEntries[entryIndex];
    }
    throw new Error('Entry not found');
  };
  
  /**
   * Deletes a journal entry.
   * @param {string} entryId The ID of the entry to delete.
   * @returns {Promise<void>} A promise that resolves when the deletion is complete.
   */
  export const deleteJournalEntry = async (entryId: string): Promise<void> => {
    console.log(`Deleting journal entry ${entryId}...`);
    await new Promise(resolve => setTimeout(resolve, 500));
    const entryIndex = mockJournalEntries.findIndex(e => e.id === entryId);
    if (entryIndex > -1) {
      mockJournalEntries.splice(entryIndex, 1);
    } else {
      throw new Error('Entry not found');
    }
  };

  const mockSubscriptionStatus: SubscriptionStatus = {
    planName: 'Paquete de 5 Sesiones',
    usedSessions: 2,
    totalSessions: 5,
    nextBillingDate: '2024-08-01',
    planType: 'paquete', // 'suscripcion' or 'paquete'
  };

  /**
  * Fetches the user's subscription status.
  * @returns {Promise<SubscriptionStatus>} A promise that resolves to the subscription status object.
  */
  export const getSubscriptionStatus = async (): Promise<SubscriptionStatus> => {
    console.log('Fetching subscription status...');
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockSubscriptionStatus;
  };

  const mockInvoices: Invoice[] = [
    {
      id: 'inv-001',
      date: '2024-07-15',
      professional: 'Dr. Juan Pérez',
      service: 'Sesión de Terapia Individual',
      amount: 75.00,
    },
    {
      id: 'inv-002',
      date: '2024-06-20',
      professional: 'Dra. Ana Gómez',
      service: 'Terapia de Pareja',
      amount: 90.00,
    },
    {
      id: 'inv-003',
      date: '2024-05-10',
      professional: 'Dr. Carlos Sánchez',
      service: 'Consulta Psiquiátrica',
      amount: 120.00,
    },
  ];
  
  /**
   * Fetches the invoice history for the current user.
   * @returns {Promise<Invoice[]>} A promise that resolves to an array of invoice objects.
   */
  export const getInvoices = async (): Promise<Invoice[]> => {
    console.log('Fetching invoices...');
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockInvoices;
  };
  
  /**
   * Downloads an invoice as a PDF.
   * @param {string} invoiceId The ID of the invoice to download.
   * @returns {Promise<void>} A promise that resolves when the download is complete.
   */
  export const downloadInvoice = async (invoiceId: string): Promise<void> => {
    console.log(`Downloading invoice ${invoiceId}...`);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // In a real application, this would trigger a file download.
    // For this mock, we'll simulate generating a PDF and opening it in a new tab.
    const invoice = mockInvoices.find(inv => inv.id === invoiceId);
    if (invoice) {
      const pdfContent = `
        <html>
          <body style="font-family: sans-serif; padding: 20px;">
            <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #eee; padding-bottom: 10px;">
              <h1 style="color: #333;">Factura</h1>
              <p><strong>TheraFlow</strong><br>123 Calle Falsa, Ciudad<br>support@theraflow.com</p>
            </div>
            <div style="margin-top: 20px;">
              <p><strong>Factura a:</strong><br>Cliente de TheraFlow</p>
              <p><strong>Nº de Factura:</strong> ${invoice.id}</p>
              <p><strong>Fecha:</strong> ${invoice.date}</p>
            </div>
            <table style="width: 100%; margin-top: 30px; border-collapse: collapse;">
              <thead style="background-color: #f9f9f9;">
                <tr>
                  <th style="padding: 10px; border: 1px solid #ddd; text-align: left;">Servicio</th>
                  <th style="padding: 10px; border: 1px solid #ddd; text-align: left;">Profesional</th>
                  <th style="padding: 10px; border: 1px solid #ddd; text-align: right;">Monto</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style="padding: 10px; border: 1px solid #ddd;">${invoice.service}</td>
                  <td style="padding: 10px; border: 1px solid #ddd;">${invoice.professional}</td>
                  <td style="padding: 10px; border: 1px solid #ddd; text-align: right;">${invoice.amount.toFixed(2)}</td>
                </tr>
              </tbody>
              <tfoot style="font-weight: bold;">
                <tr>
                  <td colspan="2" style="padding: 10px; border: 1px solid #ddd; text-align: right;">Total</td>
                  <td style="padding: 10px; border: 1px solid #ddd; text-align: right;">${invoice.amount.toFixed(2)}</td>
                </tr>
              </tfoot>
            </table>
            <div style="margin-top: 30px; font-size: 12px; color: #777;">
              <p>Gracias por su confianza.</p>
            </div>
          </body>
        </html>
      `;
      const blob = new Blob([pdfContent], { type: 'text/html' });
      const url = URL.createObjectURL(blob);
      const newWindow = window.open(url, '_blank');
      if (newWindow) {
        newWindow.onload = () => {
          newWindow.document.title = `Factura-${invoice.id}`;
        };
      }
    } else {
      throw new Error('Invoice not found');
    }
  };

  const mockReviews: Review[] = [
    {
      id: 'review-1',
      professionalName: 'Dr. Juan Pérez',
      date: '2024-06-12T10:00:00Z',
      rating: 5,
      comment: 'El Dr. Pérez es un excelente profesional. Me sentí muy cómodo y me ayudó a entender muchas cosas. Lo recomiendo totalmente.',
      professionalResponse: 'Muchas gracias por tus amables palabras. Me alegra saber que te sentiste a gusto. ¡Un saludo!',
    },
    {
      id: 'review-2',
      professionalName: 'Dra. Ana Gómez',
      date: '2024-07-22T15:30:00Z',
      rating: 4,
      comment: 'La Dra. Gómez es muy atenta y profesional. Las sesiones online son muy convenientes. A veces la conexión fallaba un poco, pero en general todo bien.',
    },
  ];
  
  /**
   * Fetches all reviews written by the current user.
   * @returns {Promise<Review[]>} A promise that resolves to an array of review objects.
   */
  export const getMyReviews = async (): Promise<Review[]> => {
    console.log('Fetching my reviews...');
    await new Promise(resolve => setTimeout(resolve, 700));
    return mockReviews;
  };
  
  /**
   * Updates a review.
   * @param {string} reviewId The ID of the review to update.
   * @param {Partial<Review>} data The data to update (e.g., { rating, comment }).
   * @returns {Promise<Review>} A promise that resolves to the updated review object.
   */
  export const updateReview = async (reviewId: string, data: Partial<Review>): Promise<Review> => {
    console.log(`Updating review ${reviewId} with data:`, data);
    await new Promise(resolve => setTimeout(resolve, 1000));
    const reviewIndex = mockReviews.findIndex(r => r.id === reviewId);
    if (reviewIndex > -1) {
      mockReviews[reviewIndex] = { ...mockReviews[reviewIndex], ...data, date: new Date().toISOString() } as Review;
      return mockReviews[reviewIndex];
    }
    throw new Error('Review not found');
  };
  
  /**
   * Deletes a review.
   * @param {string} reviewId The ID of the review to delete.
   * @returns {Promise<void>} A promise that resolves when the deletion is complete.
   */
  export const deleteReview = async (reviewId: string): Promise<void> => {
    console.log(`Deleting review ${reviewId}...`);
    await new Promise(resolve => setTimeout(resolve, 500));
    const reviewIndex = mockReviews.findIndex(r => r.id === reviewId);
    if (reviewIndex > -1) {
      mockReviews.splice(reviewIndex, 1);
    } else {
      throw new Error('Review not found');
    }
  };

  const mockEmergencyContacts: EmergencyContact[] = [
    { id: 'ec-1', name: 'Mamá', phone: '555-123-4567' },
    { id: 'ec-2', name: 'Juan (Amigo)', phone: '555-987-6543' },
  ];

  /**
 * Fetches the user's emergency contacts.
 * @returns {Promise<EmergencyContact[]>} A promise that resolves to an array of emergency contacts.
 */
export const getEmergencyContacts = async (): Promise<EmergencyContact[]> => {
  console.log('Fetching emergency contacts...');
  await new Promise(resolve => setTimeout(resolve, 500));
  return mockEmergencyContacts;
};

/**
 * Adds a new emergency contact.
 * @param {Omit<EmergencyContact, 'id'>} contactData The data for the new contact.
 * @returns {Promise<EmergencyContact>} A promise that resolves to the new contact.
 */
export const addEmergencyContact = async (contactData: Omit<EmergencyContact, 'id'>): Promise<EmergencyContact> => {
  console.log('Adding emergency contact:', contactData);
  await new Promise(resolve => setTimeout(resolve, 1000));
  const newContact: EmergencyContact = {
    id: `ec-${new Date().getTime()}`,
    ...contactData,
  };
  mockEmergencyContacts.push(newContact);
  return newContact;
};

/**
 * Updates an emergency contact.
 * @param {string} contactId The ID of the contact to update.
 * @param {Partial<EmergencyContact>} contactData The data to update.
 * @returns {Promise<EmergencyContact>} A promise that resolves to the updated contact.
 */
export const updateEmergencyContact = async (contactId: string, contactData: Partial<EmergencyContact>): Promise<EmergencyContact> => {
  console.log(`Updating emergency contact ${contactId}:`, contactData);
  await new Promise(resolve => setTimeout(resolve, 1000));
  const contactIndex = mockEmergencyContacts.findIndex(c => c.id === contactId);
  if (contactIndex > -1) {
    mockEmergencyContacts[contactIndex] = { ...mockEmergencyContacts[contactIndex], ...contactData } as EmergencyContact;
    return mockEmergencyContacts[contactIndex];
  }
  throw new Error('Contact not found');
};

/**
 * Deletes an emergency contact.
 * @param {string} contactId The ID of the contact to delete.
 * @returns {Promise<void>} A promise that resolves when the deletion is complete.
 */
export const deleteEmergencyContact = async (contactId: string): Promise<void> => {
  console.log(`Deleting emergency contact ${contactId}...`);
  await new Promise(resolve => setTimeout(resolve, 500));
  const contactIndex = mockEmergencyContacts.findIndex(c => c.id === contactId);
  if (contactIndex > -1) {
    mockEmergencyContacts.splice(contactIndex, 1);
  } else {
    throw new Error('Contact not found');
  }
};

const mockNotifications: Notification[] = [
  {
    id: 'notif-1',
    message: 'Tu sesión con Dr. Smith es en 24 horas.',
    link: '/panel-usuario/bookings',
    read: false,
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'notif-2',
    message: 'Has recibido un nuevo mensaje de Dra. Morales.',
    link: '/panel-usuario/messages',
    read: false,
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'notif-3',
    message: 'Tu factura de Junio ya está disponible.',
    link: '/panel-usuario/billing',
    read: true,
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
  },
];

export const getNotifications = async (): Promise<Notification[]> => {
  console.log('Fetching notifications...');
  await new Promise(resolve => setTimeout(resolve, 500));
  return mockNotifications.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
};

export const markNotificationAsRead = async (notificationId: string): Promise<void> => {
  console.log(`Marking notification ${notificationId} as read...`);
  await new Promise(resolve => setTimeout(resolve, 500));
  const notification = mockNotifications.find(n => n.id === notificationId);
  if (notification) {
    notification.read = true;
  }
};

export const markAllNotificationsAsRead = async (): Promise<void> => {
  console.log('Marking all notifications as read...');
  await new Promise(resolve => setTimeout(resolve, 500));
  mockNotifications.forEach(n => (n.read = true));
};

//<-----------------NUEVA FUNCIONALIDAD----------------->
export const changePassword = async (passwordData: object): Promise<{ message: string }> => {
  console.log('Changing password with data:', passwordData);
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Aquí se haría la llamada a POST /api/account/change-password
  // Simulamos una respuesta exitosa
  return { message: 'Contraseña actualizada con éxito' };
};

export const setupTwoFactorAuth = async (): Promise<{ qrCodeUrl: string }> => {
  console.log('Setting up 2FA...');
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Aquí se haría la llamada a POST /api/account/2fa/setup
  // Devolvemos una URL de un QR de prueba
  return { qrCodeUrl: 'https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=otpauth://totp/TheraFlow:user@example.com?secret=JBSWY3DPEHPK3PXP&issuer=TheraFlow' };
};

export const verifyTwoFactorAuth = async (token: string): Promise<{ recoveryCodes: string[] }> => {
  console.log('Verifying 2FA token:', token);
  await new Promise(resolve => setTimeout(resolve, 1000));

  // Aquí se haría la llamada a POST /api/account/2fa/verify
  if (token === '123456') {
    // Devolvemos códigos de recuperación de prueba
    return { recoveryCodes: ['abc-123', 'def-456', 'ghi-789', 'jkl-012'] };
  } else {
    throw new Error('Token de verificación inválido');
  }
};
  