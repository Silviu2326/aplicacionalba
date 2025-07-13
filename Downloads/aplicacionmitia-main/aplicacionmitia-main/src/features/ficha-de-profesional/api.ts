// Mock API
interface Service {
  id: string;
  name: string;
  description: string;
  durationInMinutes: number;
  price: number;
}

interface Location {
  address: string;
  lat: number;
  lng: number;
}

interface Credential {
  name: string;
  verified: boolean;
  icon: string;
  verificationDate?: string;
}

interface Publication {
  id: string;
  title: string;
  excerpt: string;
  url: string;
  publicationDate: string;
  imageUrl?: string;
}

interface ServicePackage {
  id: string;
  name: string;
  sessionCount: number;
  totalPrice: number;
  originalPrice: number;
  description: string;
  isPopular?: boolean;
}

interface Professional {
    id: string;
    fullName: string;
    profilePictureUrl: string;
    videoIntroductionUrl?: string;
    specialties: string[];
    title: string;
    aboutMe: string;
    services: Service[];
    packages: ServicePackage[];
    basePrice: number;
    location?: Location;
    credentials: Credential[];
    publications: Publication[];
  }
  
  const mockProfessional: Professional = {
    id: '1',
    fullName: 'Dra. Ana María Torres',
    profilePictureUrl: 'https://randomuser.me/api/portraits/women/44.jpg',
    videoIntroductionUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    specialties: ['Ansiedad', 'Terapia de Pareja', 'Estrés'],
    title: 'Psicóloga Clínica',
    aboutMe: `
Con más de 10 años de experiencia, me especializo en ayudar a individuos y parejas a navegar los desafíos de la vida. Mi enfoque se centra en la terapia cognitivo-conductual, adaptada a las necesidades únicas de cada persona.
  
Mi objetivo es proporcionar un espacio seguro y de apoyo donde puedas explorar tus pensamientos y sentimientos sin juicio. Juntos, podemos trabajar para desarrollar estrategias de afrontamiento efectivas y fomentar un cambio positivo y duradero.
    `,
    credentials: [
      { name: 'Licencia Verificada', verified: true, icon: '🛡️', verificationDate: '2023-10-26' },
      { name: 'Máster en TCC', verified: true, icon: '🎓', verificationDate: '2023-11-15' },
      { name: '10+ años de experiencia', verified: true, icon: '⭐', verificationDate: '2024-01-20' },
      { name: 'Especialista en Ansiedad', verified: false, icon: '🧘' },
    ],
    services: [
      {
        id: 's1',
        name: 'Terapia Individual',
        description: 'Sesión uno a uno para abordar problemas personales y de salud mental.',
        durationInMinutes: 50,
        price: 100,
      },
      {
        id: 's2',
        name: 'Terapia de Pareja',
        description: 'Sesiones diseñadas para mejorar la comunicación y resolver conflictos en la relación.',
        durationInMinutes: 80,
        price: 150,
      },
      {
        id: 's3',
        name: 'Consulta de Estrés y Ansiedad',
        description: 'Enfoque específico en técnicas y estrategias para manejar el estrés y la ansiedad.',
        durationInMinutes: 50,
        price: 110,
      },
    ],
    packages: [
      {
        id: 'p1',
        name: 'Paquete 5 Sesiones TCC',
        sessionCount: 5,
        totalPrice: 450,
        originalPrice: 500,
        description: 'Un paquete inicial para un tratamiento enfocado con Terapia Cognitivo-Conductual.',
        isPopular: true,
      },
      {
        id: 'p2',
        name: 'Paquete 10 Sesiones de Profundización',
        sessionCount: 10,
        totalPrice: 850,
        originalPrice: 1000,
        description: 'Ideal para un proceso terapéutico completo y con seguimiento a largo plazo.',
      }
    ],
    basePrice: 100,
    location: {
      address: 'Av. Siempre Viva 742, Springfield',
      lat: -34.603722,
      lng: -58.381592,
    },
    publications: [
      {
        id: 'pub1',
        title: 'Manejando la Ansiedad en el Mundo Moderno',
        excerpt: 'Un vistazo a las técnicas de mindfulness para calmar la mente y el cuerpo.',
        url: '#',
        publicationDate: '2024-05-15',
        imageUrl: 'https://images.unsplash.com/photo-1500989145603-8d7ef71d67e2?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      },
      {
        id: 'pub2',
        title: 'Comunicación Efectiva en Parejas',
        excerpt: 'Claves para construir un diálogo abierto y honesto con tu ser querido.',
        url: '#',
        publicationDate: '2024-04-22',
        imageUrl: 'https://images.unsplash.com/photo-1567440938393-0dc49f896b2a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      },
      {
        id: 'pub3',
        title: 'El Poder de la Vulnerabilidad',
        excerpt: 'Cómo aceptar la propia vulnerabilidad puede fortalecer la resiliencia emocional.',
        url: '#',
        publicationDate: '2024-03-10',
        imageUrl: 'https://images.unsplash.com/photo-1588072432836-e10032774350?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      }
    ]
  };
  
  export const getProfessionalById = (id: string): Promise<Professional> => {
    console.log(`Fetching professional with id: ${id}`);
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockProfessional);
      }, 500);
    });
  };
  
  export const getProfessionalAvailability = (id: string, days: number): Promise<{[date: string]: string[]}> => {
    console.log(`Fetching availability for professional with id: ${id} for ${days} days`);
    return new Promise((resolve) => {
      setTimeout(() => {
        const availability: {[date: string]: string[]} = {};
        const today = new Date();
        for (let i = 0; i < days; i++) {
          const date = new Date(today);
          date.setDate(today.getDate() + i);
          const dateString = date.toISOString().split('T')[0];
          if (i % 3 !== 0) { // Simulate some days not being available
            availability[dateString] = ['09:00', '10:00', '11:00', '14:00', '15:00'];
          } else {
            availability[dateString] = [];
          }
        }
        resolve(availability);
      }, 500);
    });
  };

// Simulate API call to get professional availability
export const getAvailability = async (professionalId: string, days: number): Promise<{ date: string, slots: string[] }[]> => {
  console.log(`Fetching availability for professional ${professionalId} for the next ${days} days.`);
  
  // Mock data generation
  const availability = [];
  const today = new Date();
  
  for (let i = 0; i < days; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    
    // Simulate some days are not available
    if (i % 3 === 0) {
      availability.push({
        date: date.toISOString().split('T')[0],
        slots: [],
      });
      continue;
    }
    
    // Simulate available slots
    const slots = [];
    for (let j = 9; j < 17; j++) {
      if (Math.random() > 0.5) {
        slots.push(`${j}:00`);
      }
    }
    availability.push({
      date: date.toISOString().split('T')[0],
      slots,
    });
  }
  
  return new Promise(resolve => setTimeout(() => resolve(availability), 500));
};

export const toggleFavoriteStatus = async (professionalId: string, isFavorite: boolean): Promise<{ success: boolean }> => {
  console.log(`Setting favorite status for professional ${professionalId} to ${isFavorite}`);
  // Simulate API call
  return new Promise(resolve => setTimeout(() => resolve({ success: true }), 300));
};

