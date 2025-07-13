
// Mock API for now
export const getAdminData = async () => {
    return {
      users: 100,
      professionals: 50,
      bookings: 200,
    };
  };
export const getAdminStats = getAdminData;
  
  export const getSystemHealth = async () => {
    // In a real application, this would fetch data from a monitoring service
    return {
      services: [
        { name: 'API', status: 'Operacional', responseTime: Math.floor(Math.random() * 200) + 50 },
        { name: 'Base de Datos', status: Math.random() > 0.1 ? 'Operacional' : 'Degradado', responseTime: Math.floor(Math.random() * 300) + 100 },
        { name: 'Pasarela de Pagos', status: Math.random() > 0.05 ? 'Operacional' : 'Caído', responseTime: Math.floor(Math.random() * 500) + 200 },
      ],
      errors: [
        { id: 1, message: 'Error 500: Internal Server Error', time: '10:45 AM' },
        { id: 2, message: 'Payment gateway timeout', time: '10:42 AM' },
      ],
      apiResponseTimes: Array.from({ length: 7 }, (_, i) => ({
        time: `${30 - i * 5} min ago`,
        value: Math.floor(Math.random() * 150) + 80,
      })),
    };
  };
const mockPendingPayouts = [
  {
    id: 'payout-001',
    professionalId: 'prof-001',
    professionalName: 'Dr. Ana García',
    amount: 450.75,
    period: '2025-01-01 to 2025-01-15',
    transactions: [
      { id: 'txn-001', date: '2025-01-05', amount: 150.25, description: 'Consulta - Juan Pérez' },
      { id: 'txn-002', date: '2025-01-08', amount: 200.50, description: 'Consulta - María López' },
      { id: 'txn-003', date: '2025-01-12', amount: 100.00, description: 'Consulta - Carlos Ruiz' }
    ],
    status: 'pending',
    requestedAt: '2025-01-15T10:00:00Z',
    bankAccount: {
      accountNumber: '****1234',
      bankName: 'Banco Santander',
      accountHolder: 'Ana García'
    }
  },
  {
    id: 'payout-002',
    professionalId: 'prof-002',
    professionalName: 'Lic. Carlos Martínez',
    amount: 320.00,
    period: '2025-01-01 to 2025-01-15',
    transactions: [
      { id: 'txn-004', date: '2025-01-03', amount: 120.00, description: 'Terapia de pareja - Ana y Luis' },
      { id: 'txn-005', date: '2025-01-10', amount: 200.00, description: 'Consulta - Laura Fernández' }
    ],
    status: 'pending',
    requestedAt: '2025-01-15T14:30:00Z',
    bankAccount: {
      accountNumber: '****5678',
      bankName: 'BBVA',
      accountHolder: 'Carlos Martínez'
    }
  },
  {
    id: 'payout-003',
    professionalId: 'prof-003',
    professionalName: 'Dra. Sofía Rodríguez',
    amount: 680.25,
    period: '2025-01-01 to 2025-01-15',
    transactions: [
      { id: 'txn-006', date: '2025-01-02', amount: 180.25, description: 'Consulta psiquiátrica - Roberto Silva' },
      { id: 'txn-007', date: '2025-01-07', amount: 250.00, description: 'Evaluación - Patricia Gómez' },
      { id: 'txn-008', date: '2025-01-14', amount: 250.00, description: 'Seguimiento - Miguel Torres' }
    ],
    status: 'pending',
    requestedAt: '2025-01-15T16:45:00Z',
    bankAccount: {
      accountNumber: '****9012',
      bankName: 'CaixaBank',
      accountHolder: 'Sofía Rodríguez'
    }
  }
];

export const getPendingPayouts = async () => {
  console.log('Fetching pending payouts...');
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(mockPendingPayouts.filter(payout => payout.status === 'pending'));
    }, 800);
  });
};

export const processPayout = async (payoutId: string) => {
  console.log(`Processing payout ${payoutId}`);
  return new Promise(resolve => {
    setTimeout(() => {
      const payoutIndex = mockPendingPayouts.findIndex(p => p.id === payoutId);
      if (payoutIndex !== -1) {
        mockPendingPayouts[payoutIndex].status = 'processed';
        mockPendingPayouts[payoutIndex].processedAt = new Date().toISOString();
        resolve({ 
          success: true, 
          payout: mockPendingPayouts[payoutIndex],
          message: 'Payout processed successfully'
        });
      } else {
        resolve({ success: false, message: 'Payout not found' });
      }
    }, 1000);
  });
};
// Mock data for pending professionals
const mockPendingProfessionals = [
  {
    id: 'prof-pending-001',
    name: 'Dr. María González',
    specialty: 'Psicología Clínica',
    email: 'maria.gonzalez@email.com',
    phone: '+34 600 123 456',
    license: 'PSI-12345',
    experience: '5 años',
    education: 'Universidad Complutense de Madrid',
    status: 'pending',
    submittedAt: '2025-01-10T10:00:00Z',
    documents: ['license.pdf', 'cv.pdf', 'certificate.pdf']
  },
  {
    id: 'prof-pending-002',
    name: 'Lic. Roberto Silva',
    specialty: 'Terapia Familiar',
    email: 'roberto.silva@email.com',
    phone: '+34 600 789 012',
    license: 'TF-67890',
    experience: '8 años',
    education: 'Universidad Autónoma de Barcelona',
    status: 'pending',
    submittedAt: '2025-01-11T14:30:00Z',
    documents: ['license.pdf', 'cv.pdf']
  }
];

export const getPendingProfessionals = async () => {
  console.log('Fetching pending professionals...');
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(mockPendingProfessionals.filter(prof => prof.status === 'pending'));
    }, 500);
  });
};

export const approveProfessional = async (professionalId: string) => {
  console.log(`Approving professional ${professionalId}`);
  return new Promise(resolve => {
    setTimeout(() => {
      const professionalIndex = mockPendingProfessionals.findIndex(p => p.id === professionalId);
      if (professionalIndex !== -1) {
        mockPendingProfessionals[professionalIndex].status = 'approved';
        resolve({ success: true, professional: mockPendingProfessionals[professionalIndex] });
      } else {
        resolve({ success: false, message: 'Professional not found' });
      }
    }, 300);
  });
};

export const rejectProfessional = async (professionalId: string, reason: string) => {
  console.log(`Rejecting professional ${professionalId} with reason: ${reason}`);
  return new Promise(resolve => {
    setTimeout(() => {
      const professionalIndex = mockPendingProfessionals.findIndex(p => p.id === professionalId);
      if (professionalIndex !== -1) {
        mockPendingProfessionals[professionalIndex].status = 'rejected';
        mockPendingProfessionals[professionalIndex].rejectionReason = reason;
        resolve({ success: true, professional: mockPendingProfessionals[professionalIndex] });
      } else {
        resolve({ success: false, message: 'Professional not found' });
      }
    }, 300);
  });
};

  export const getFeedback = async () => {
    return [
        { id: 1, user_id: 101, content: 'This is great!', status: 'new', tags: ['positive'] },
        { id: 2, user_id: 102, content: 'Please add feature X.', status: 'planned', tags: ['feature-request'] },
        { id: 3, user_id: 103, content: 'I found a bug on the login page.', status: 'new', tags: ['bug'] },
    ];
  }
  
  export const updateFeedbackStatus = async (id: number, status: string) => {
    console.log(`Updating feedback ${id} to status ${status}`);
    return { id, status };
  }
  
  export const getTags = async () => {
    return ['bug', 'feature-request', 'positive', 'ui-issue'];
  }
  
  export const addTag = async (tag: string) => {
    console.log(`Adding tag ${tag}`);
    return { tag };
  }
  
  export const removeTag = async (tag: string) => {
    console.log(`Removing tag ${tag}`);
    return { tag };
  }
  

// Mock data for support tickets
const mockTickets = [
  {
    id: 1,
    user: 'Juan Perez',
    subject: 'Problema con el pago',
    date: '2025-07-10',
    status: 'Abierto',
    message: 'No puedo procesar mi pago, me sale un error.',
    history: [],
  },
  {
    id: 2,
    user: 'Ana Gomez',
    subject: 'No puedo acceder a mi cuenta',
    date: '2025-07-11',
    status: 'En Progreso',
    message: 'Olvidé mi contraseña y no me llega el correo de recuperación.',
    history: [
      { date: '2025-07-11', author: 'Admin', message: 'Hemos reenviado el correo.' },
    ],
  },
  {
    id: 3,
    user: 'Luis Fernandez',
    subject: 'Duda sobre un profesional',
    date: '2025-07-12',
    status: 'Cerrado',
    message: '¿El profesional Dr. Martinez atiende online?',
    history: [
        { date: '2025-07-12', author: 'Admin', message: 'Sí, atiende online.' },
    ],
  },
];

export const getTickets = async () => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(mockTickets);
        }, 300);
    });
};

export const getTicketById = async (id) => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(mockTickets.find(ticket => ticket.id === id));
        }, 300);
    });
};

export const addTicketReply = async (ticketId, message) => {
    const ticket = mockTickets.find(t => t.id === ticketId);
    if (ticket) {
        ticket.history.push({ date: new Date().toISOString(), author: 'Admin', message });
        ticket.status = 'En Progreso';
    }
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(ticket);
        }, 300);
    });
};


const mockNotes = [];

export const getAdminNotes = async (userId) => {
    console.log(`Fetching notes for user ${userId}`);
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(mockNotes);
        }, 300);
    });
};

export const addAdminNote = async (userId, noteText) => {
    console.log(`Adding note for user ${userId}: "${noteText}"`);
    const newNote = {
        id: mockNotes.length + 1,
        text: noteText,
        createdAt: new Date().toISOString(),
        author: 'CurrentUserAdmin',
    };
    mockNotes.push(newNote);
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(newNote);
        }, 300);
    });
};

// --- SEGMENTS & CAMPAIGNS API MOCKS ---

// Mock data for segments and campaigns
const mockSegments = [
  { id: 'seg-001', name: 'Clientes Activos', userCount: 150, createdAt: '2025-07-10' },
  { id: 'seg-002', name: 'Profesionales Premium', userCount: 25, createdAt: '2025-07-11' },
  { id: 'seg-003', name: 'Usuarios Inactivos (30 días)', userCount: 230, createdAt: '2025-07-12' },
];

const mockCampaigns = [
  { id: 'camp-001', name: 'Campaña de Verano', segment: 'Clientes Activos', status: 'Enviada', scheduledAt: '2025-07-15 10:00:00' },
  { id: 'camp-002', name: 'Oferta Plan Premium', segment: 'Profesionales Premium', status: 'Programada', scheduledAt: '2025-08-01 09:00:00' },
  { id: 'camp-003', name: 'Recordatorio de Actividad', segment: 'Usuarios Inactivos (30 días)', status: 'Borrador', scheduledAt: null },
];

// Simulate calculating user count based on rules
export const getUserCountForSegmentRules = async (rules: any) => {
  console.log('Calculating user count for rules:', rules);
  return new Promise(resolve => {
    setTimeout(() => {
      // In a real app, the backend would do this calculation.
      // Here, we just return a random number for demonstration.
      const userCount = Math.floor(Math.random() * 500) + 10;
      resolve({ userCount });
    }, 400);
  });
};

// Get all segments
export const getSegments = async () => {
  console.log('Fetching segments...');
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(mockSegments);
    }, 500);
  });
};

// Create a new segment
export const createSegment = async (segmentData: { name: string; rules: any[] }) => {
  console.log('Creating segment:', segmentData);
  return new Promise(resolve => {
    setTimeout(() => {
      const newSegment = {
        id: `seg-${Date.now()}`,
        name: segmentData.name,
        userCount: Math.floor(Math.random() * 500) + 10, // Mock user count
        createdAt: new Date().toISOString().split('T')[0],
      };
      mockSegments.push(newSegment);
      resolve(newSegment);
    }, 500);
  });
};

// Get all campaigns
export const getCampaigns = async () => {
  console.log('Fetching campaigns...');
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(mockCampaigns);
    }, 500);
  });
};

// Create a new campaign
export const createCampaign = async (campaignData: any) => {
  console.log('Creating campaign:', campaignData);
  return new Promise(resolve => {
    setTimeout(() => {
      const newCampaign = {
        id: `camp-${Date.now()}`,
        status: campaignData.scheduledAt ? 'Programada' : 'Borrador',
        ...campaignData,
      };
      mockCampaigns.push(newCampaign);
      resolve(newCampaign);
    }, 500);
  });
};

// --- FRAUD ALERTS API MOCK ---
const mockFraudAlerts = [
    {
      id: 'FRA-001',
      type: 'Múltiples registros desde misma IP',
      riskLevel: 'Alto',
      riskScore: 95,
      data: { ip: '123.45.67.89', count: 5 },
      status: 'Nuevo',
      timestamp: '2025-07-13T10:30:00Z',
      userId: 'USR-1023',
      details: 'Se detectaron 5 registros de cuentas nuevas desde la IP 123.45.67.89 en la última hora.'
    },
    {
      id: 'FRA-002',
      type: 'Pagos fallidos recurrentes',
      riskLevel: 'Medio',
      riskScore: 65,
      data: { cards: 4, attempts: 12 },
      status: 'Nuevo',
      timestamp: '2025-07-13T09:15:00Z',
      userId: 'USR-2451',
      details: '12 intentos de pago fallidos con 4 tarjetas de crédito diferentes en los últimos 30 minutos.'
    },
    {
      id: 'FRA-003',
      type: 'Cambio de datos de cobro frecuente',
      riskLevel: 'Bajo',
      riskScore: 40,
      data: { changes: 3 },
      status: 'En revisión',
      timestamp: '2025-07-12T15:00:00Z',
      userId: 'USR-0078',
      details: 'El usuario ha cambiado su método de pago 3 veces en las últimas 24 horas.'
    }
];

export const getFraudAlerts = async () => {
    console.log('Fetching fraud alerts...');
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(mockFraudAlerts);
        }, 700);
    });
};

// --- PROFESSIONAL PERFORMANCE API MOCKS ---

const mockProfessionals = [
  { id: 'prof-001', name: 'Dr. Ana García', specialty: 'Psicología Clínica', bookings: 120, avgRating: 4.9, rebookingRate: 0.75, isFeatured: true, performanceScore: 92 },
  { id: 'prof-002', name: 'Lic. Carlos Martínez', specialty: 'Terapia de Pareja', bookings: 95, avgRating: 4.8, rebookingRate: 0.68, isFeatured: false, performanceScore: 85 },
  { id: 'prof-003', name: 'Dra. Sofía Rodríguez', specialty: 'Psiquiatría', bookings: 80, avgRating: 4.9, rebookingRate: 0.8, isFeatured: false, performanceScore: 88 },
  { id: 'prof-004', name: 'Psic. Javier López', specialty: 'Terapia Cognitivo-Conductual', bookings: 150, avgRating: 4.7, rebookingRate: 0.6, isFeatured: true, performanceScore: 82 },
  { id: 'prof-005', name: 'Lic. Laura Fernández', specialty: 'Psicología Infantil', bookings: 70, avgRating: 5.0, rebookingRate: 0.9, isFeatured: false, performanceScore: 95 },
];

export const getPerformanceLeaderboard = async (filters: { dateRange: string; sortBy: string }) => {
  console.log('Fetching performance leaderboard with filters:', filters);
  return new Promise(resolve => {
    setTimeout(() => {
      const sortedData = [...mockProfessionals].sort((a, b) => {
        if (filters.sortBy === 'bookings') return b.bookings - a.bookings;
        if (filters.sortBy === 'avgRating') return b.avgRating - a.avgRating;
        if (filters.sortBy === 'rebookingRate') return b.rebookingRate - a.rebookingRate;
        return b.performanceScore - a.performanceScore;
      });
      resolve(sortedData);
    }, 500);
  });
};

export const getProfessionalAnalytics = async (professionalId: string) => {
  console.log(`Fetching analytics for professional ${professionalId}`);
  return new Promise(resolve => {
    setTimeout(() => {
      const professional = mockProfessionals.find(p => p.id === professionalId);
      if (!professional) {
        resolve(null);
        return;
      }
      resolve({
        ...professional,
        ratingHistory: [
          { month: 'Enero', avgRating: 4.5 },
          { month: 'Febrero', avgRating: 4.6 },
          { month: 'Marzo', avgRating: 4.7 },
          { month: 'Abril', avgRating: 4.8 },
          { month: 'Mayo', avgRating: 4.9 },
          { month: 'Junio', avgRating: 4.9 },
        ],
      });
    }, 500);
  });
};

export const setFeaturedProfessional = async (professionalId: string, isFeatured: boolean) => {
  console.log(`Setting featured status for professional ${professionalId} to ${isFeatured}`);
  return new Promise(resolve => {
    setTimeout(() => {
      const professional = mockProfessionals.find(p => p.id === professionalId);
      if (professional) {
        professional.isFeatured = isFeatured;
        resolve({ success: true, professional });
      } else {
        resolve({ success: false, message: 'Professional not found' });
      }
    }, 300);
  });
};

// --- COMMISSION RULES API MOCK ---

const mockCommissionRules = [
    { id: 1, name: 'Comisión por defecto', condition: 'true', value: 15, priority: 100, isActive: true },
    { id: 2, name: 'Profesionales antiguos', condition: 'antiguedad > 365', value: 10, priority: 10, isActive: true },
    { id: 3, name: 'Insignia "Top Pro"', condition: 'insignias CONTAINS "top-pro"', value: 8, priority: 5, isActive: false },
];

export const getCommissionRules = async () => {
    console.log('Fetching commission rules...');
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(mockCommissionRules);
        }, 500);
    });
};

export const createCommissionRule = async (ruleData) => {
    console.log('Creating commission rule:', ruleData);
    return new Promise(resolve => {
        setTimeout(() => {
            const newRule = {
                id: mockCommissionRules.length + 1,
                ...ruleData,
            };
            mockCommissionRules.push(newRule);
            resolve(newRule);
        }, 500);
    });
};

export const updateCommissionRule = async (ruleId, ruleData) => {
    console.log(`Updating commission rule ${ruleId}:`, ruleData);
    return new Promise(resolve => {
        setTimeout(() => {
            const ruleIndex = mockCommissionRules.findIndex(r => r.id === ruleId);
            if (ruleIndex !== -1) {
                mockCommissionRules[ruleIndex] = { ...mockCommissionRules[ruleIndex], ...ruleData };
                resolve(mockCommissionRules[ruleIndex]);
            } else {
                resolve(null); // Or reject with an error
            }
        }, 500);
    });
};

export const deleteCommissionRule = async (ruleId) => {
    console.log(`Deleting commission rule ${ruleId}`);
    return new Promise(resolve => {
        setTimeout(() => {
            const ruleIndex = mockCommissionRules.findIndex(r => r.id === ruleId);
            if (ruleIndex !== -1) {
                mockCommissionRules.splice(ruleIndex, 1);
                resolve({ success: true });
            } else {
                resolve({ success: false });
            }
        }, 500);
    });
};

export const simulateCommission = async (simulationData) => {
    console.log('Simulating commission with data:', simulationData);
    // This is a simplified simulation. A real implementation would have a more complex rule engine.
    return new Promise(resolve => {
        setTimeout(() => {
            const { transactionAmount, antiquity, badges } = simulationData;
            let applicableRule = mockCommissionRules.find(r => r.name === 'Comisión por defecto');
            let commissionRate = applicableRule.value;

            if (antiquity > 365) {
                const rule = mockCommissionRules.find(r => r.condition.includes('antiguedad'));
                if (rule && rule.isActive) {
                    applicableRule = rule;
                    commissionRate = rule.value;
                }
            }
            
            if (badges && badges.includes('top-pro')) {
                 const rule = mockCommissionRules.find(r => r.condition.includes('top-pro'));
                 if (rule && rule.isActive) {
                    // A real engine would check priority here
                    applicableRule = rule;
                    commissionRate = rule.value;
                 }
            }

            const commission = (transactionAmount * commissionRate) / 100;
            resolve({
                commission,
                commissionRate,
                appliedRule: applicableRule.name,
            });
        }, 500);
    });
};

// --- ARTICLES (CMS) API MOCKS ---

const mockArticleCategories = [
  { id: 'cat1', name: 'Salud Mental' },
  { id: 'cat2', name: 'Terapia de Pareja' },
  { id: 'cat3', name: 'Ansiedad' },
];

let mockArticles = [
  { id: 'art1', title: '5 Consejos para Manejar la Ansiedad', content: 'Contenido del artículo sobre ansiedad...', status: 'published', created_at: '2025-06-20T10:00:00Z', categories: [mockArticleCategories[2]] },
  { id: 'art2', title: 'Comunicación Efectiva en Parejas', content: 'Contenido del artículo sobre terapia de pareja...', status: 'published', created_at: '2025-06-15T14:30:00Z', categories: [mockArticleCategories[1]] },
  { id: 'art3', title: 'Borrador: El Estigma de la Salud Mental', content: 'Contenido del borrador...', status: 'draft', created_at: '2025-07-01T11:00:00Z', categories: [mockArticleCategories[0]] },
];

export const getArticles = async () => {
  console.log('Fetching articles...');
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(mockArticles);
    }, 500);
  });
};

export const createArticle = async (articleData) => {
  console.log('Creating article:', articleData);
  return new Promise(resolve => {
    setTimeout(() => {
      const newArticle = {
        id: `art-${Date.now()}`,
        created_at: new Date().toISOString(),
        ...articleData,
      };
      mockArticles.push(newArticle);
      resolve(newArticle);
    }, 300);
  });
};

export const updateArticle = async (articleId, articleData) => {
  console.log(`Updating article ${articleId}:`, articleData);
  return new Promise(resolve => {
    setTimeout(() => {
      const articleIndex = mockArticles.findIndex(a => a.id === articleId);
      if (articleIndex !== -1) {
        mockArticles[articleIndex] = { ...mockArticles[articleIndex], ...articleData };
        resolve(mockArticles[articleIndex]);
      } else {
        resolve(null);
      }
    }, 300);
  });
};

export const deleteArticle = async (articleId) => {
  console.log(`Deleting article ${articleId}`);
  return new Promise(resolve => {
    setTimeout(() => {
      const articleIndex = mockArticles.findIndex(a => a.id === articleId);
      if (articleIndex !== -1) {
        mockArticles.splice(articleIndex, 1);
        resolve({ success: true });
      } else {
        resolve({ success: false });
      }
    }, 300);
  });
};


// --- TAXONOMY API MOCKS ---

const taxonomies = {
  '/api/articles/categories': mockArticleCategories,
  '/api/professionals/specialties': [ // Example for another taxonomy
    { id: 'spec1', name: 'Psicología Clínica' },
    { id: 'spec2', name: 'Terapia Cognitivo-Conductual' },
  ]
};

export const getTaxonomy = async (apiBaseUrl: string) => {
  console.log(`Fetching taxonomy from ${apiBaseUrl}`);
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(taxonomies[apiBaseUrl] || []);
    }, 400);
  });
};

export const addTaxonomy = async (apiBaseUrl: string, item: { name: string }) => {
  console.log(`Adding taxonomy item to ${apiBaseUrl}:`, item);
  return new Promise(resolve => {
    setTimeout(() => {
      const newId = `${apiBaseUrl.split('/')[2]}-${Date.now()}`;
      const newItem = { id: newId, ...item };
      taxonomies[apiBaseUrl].push(newItem);
      resolve(newItem);
    }, 200);
  });
};

export const updateTaxonomy = async (apiBaseUrl: string, itemId: number | string, item: { name: string }) => {
  console.log(`Updating taxonomy item ${itemId} in ${apiBaseUrl}:`, item);
   return new Promise(resolve => {
    setTimeout(() => {
      const taxonomy = taxonomies[apiBaseUrl];
      const itemIndex = taxonomy.findIndex(i => i.id === itemId);
      if (itemIndex !== -1) {
        taxonomy[itemIndex] = { ...taxonomy[itemIndex], ...item };
        resolve(taxonomy[itemIndex]);
      } else {
        resolve(null);
      }
    }, 200);
  });
};

export const deleteTaxonomy = async (apiBaseUrl: string, itemId: number | string) => {
  console.log(`Deleting taxonomy item ${itemId} from ${apiBaseUrl}`);
  return new Promise(resolve => {
    setTimeout(() => {
      const taxonomy = taxonomies[apiBaseUrl];
      const itemIndex = taxonomy.findIndex(i => i.id === itemId);
      if (itemIndex !== -1) {
        taxonomy.splice(itemIndex, 1);
        resolve({ success: true });
      } else {
        resolve({ success: false });
      }
    }, 200);
  });
};
// ... existing code ...

// Mock data for pending reviews
const mockPendingReviews = [
  {
    id: 'rev-001',
    userId: 'user-123',
    userName: 'Juan Pérez',
    professionalId: 'prof-456',
    professionalName: 'Dr. Ana García',
    rating: 5,
    comment: 'Excelente profesional, muy recomendable.',
    status: 'pending',
    submittedAt: '2025-01-10T15:30:00Z',
    reportReason: null
  },
  {
    id: 'rev-002',
    userId: 'user-789',
    userName: 'María López',
    professionalId: 'prof-101',
    professionalName: 'Lic. Carlos Martínez',
    rating: 1,
    comment: 'Muy mal servicio, no lo recomiendo.',
    status: 'pending',
    submittedAt: '2025-01-11T09:15:00Z',
    reportReason: 'Contenido inapropiado'
  }
];

// Mock data for users
const mockUsers = [
  {
    id: 'user-001',
    name: 'Ana Rodríguez',
    email: 'ana.rodriguez@email.com',
    status: 'active',
    role: 'client',
    registeredAt: '2024-12-01T10:00:00Z',
    lastLogin: '2025-01-15T14:30:00Z'
  },
  {
    id: 'user-002',
    name: 'Carlos Fernández',
    email: 'carlos.fernandez@email.com',
    status: 'inactive',
    role: 'professional',
    registeredAt: '2024-11-15T16:20:00Z',
    lastLogin: '2025-01-10T11:45:00Z'
  },
  {
    id: 'user-003',
    name: 'Laura Martín',
    email: 'laura.martin@email.com',
    status: 'active',
    role: 'client',
    registeredAt: '2025-01-05T09:30:00Z',
    lastLogin: '2025-01-15T16:00:00Z'
  }
];

// Mock data for audit logs
const mockAuditLogs = [
  {
    id: 'audit-001',
    action: 'user_login',
    userId: 'user-123',
    userName: 'Juan Pérez',
    timestamp: '2025-01-15T10:30:00Z',
    details: 'Usuario inició sesión desde IP 192.168.1.100',
    ipAddress: '192.168.1.100'
  },
  {
    id: 'audit-002',
    action: 'professional_approved',
    userId: 'admin-001',
    userName: 'Admin Sistema',
    timestamp: '2025-01-15T11:15:00Z',
    details: 'Profesional Dr. Ana García fue aprobado',
    targetId: 'prof-456'
  }
];

export const getPendingReviews = async () => {
  console.log('Fetching pending reviews...');
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(mockPendingReviews.filter(review => review.status === 'pending'));
    }, 500);
  });
};

export const approveReview = async (reviewId: string) => {
  console.log(`Approving review ${reviewId}`);
  return new Promise(resolve => {
    setTimeout(() => {
      const reviewIndex = mockPendingReviews.findIndex(r => r.id === reviewId);
      if (reviewIndex !== -1) {
        mockPendingReviews[reviewIndex].status = 'approved';
        resolve({ success: true, review: mockPendingReviews[reviewIndex] });
      } else {
        resolve({ success: false, message: 'Review not found' });
      }
    }, 300);
  });
};

export const deleteReview = async (reviewId: string) => {
  console.log(`Deleting review ${reviewId}`);
  return new Promise(resolve => {
    setTimeout(() => {
      const reviewIndex = mockPendingReviews.findIndex(r => r.id === reviewId);
      if (reviewIndex !== -1) {
        mockPendingReviews.splice(reviewIndex, 1);
        resolve({ success: true });
      } else {
        resolve({ success: false, message: 'Review not found' });
      }
    }, 300);
  });
};

export const searchUsers = async (searchTerm: string) => {
  console.log(`Searching users with term: ${searchTerm}`);
  return new Promise(resolve => {
    setTimeout(() => {
      if (!searchTerm) {
        resolve([]);
        return;
      }
      const filteredUsers = mockUsers.filter(user => 
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
      resolve(filteredUsers);
    }, 400);
  });
};

export const updateUserStatus = async (userId: string, status: string) => {
  console.log(`Updating user ${userId} status to ${status}`);
  return new Promise(resolve => {
    setTimeout(() => {
      const userIndex = mockUsers.findIndex(u => u.id === userId);
      if (userIndex !== -1) {
        mockUsers[userIndex].status = status;
        resolve({ success: true, user: mockUsers[userIndex] });
      } else {
        resolve({ success: false, message: 'User not found' });
      }
    }, 300);
  });
};

export const updateTicketStatus = async (ticketId: number, status: string) => {
  console.log(`Updating ticket ${ticketId} status to ${status}`);
  return new Promise(resolve => {
    setTimeout(() => {
      const ticket = mockTickets.find(t => t.id === ticketId);
      if (ticket) {
        ticket.status = status;
        resolve({ success: true, ticket });
      } else {
        resolve({ success: false, message: 'Ticket not found' });
      }
    }, 300);
  });
};

export const replyToTicket = async (ticketId: number, reply: string) => {
  console.log(`Adding reply to ticket ${ticketId}: ${reply}`);
  return new Promise(resolve => {
    setTimeout(() => {
      const ticket = mockTickets.find(t => t.id === ticketId);
      if (ticket) {
        ticket.history.push({
          date: new Date().toISOString(),
          author: 'Admin',
          message: reply
        });
        ticket.status = 'En Progreso';
        resolve({ success: true, ticket });
      } else {
        resolve({ success: false, message: 'Ticket not found' });
      }
    }, 300);
  });
};

export const getAuditLog = async (filters?: any) => {
  console.log('Fetching audit logs with filters:', filters);
  return new Promise(resolve => {
    setTimeout(() => {
      let filteredLogs = [...mockAuditLogs];
      
      if (filters) {
        if (filters.action) {
          filteredLogs = filteredLogs.filter(log => log.action === filters.action);
        }
        if (filters.userId) {
          filteredLogs = filteredLogs.filter(log => log.userId === filters.userId);
        }
        if (filters.dateFrom) {
          filteredLogs = filteredLogs.filter(log => new Date(log.timestamp) >= new Date(filters.dateFrom));
        }
        if (filters.dateTo) {
          filteredLogs = filteredLogs.filter(log => new Date(log.timestamp) <= new Date(filters.dateTo));
        }
      }
      
      resolve(filteredLogs);
    }, 600);
  });
};