
import { DateRange } from './components/AvailabilityFilter';

// Mock API
const categories = [
    { id: '1', name: 'Terapia Cognitivo-Conductual' },
    { id: '2', name: 'Ansiedad' },
    { id: '3', name: 'Terapia de Pareja' },
    { id: '4', name: 'Depresión' },
    { id: '5', name: 'Terapia Familiar' },
  ];
  
  const professionals = [
    { id: '1', name: 'Dr. Juan Pérez', description: 'Especialista en Terapia Cognitivo-Conductual y EMDR.', categories: ['1', '2'], rating: 4.5, price: 50, insurances: ['Adeslas', 'Sanitas'], acceptsNewClients: true, modality: ['Online', 'Presencial'], languages: ['Español', 'Inglés'] },
    { id: '2', name: 'Dra. Ana Gómez', description: 'Terapeuta de pareja con enfoque en psicoanálisis.', categories: ['2', '3'], rating: 5, price: 60, insurances: ['DKV', 'Mapfre'], acceptsNewClients: false, modality: ['Online'], languages: ['Español', 'Francés'] },
    { id: '3', name: 'Dr. Luis Ramírez', description: 'Psicólogo con amplia experiencia en terapia somática.', categories: ['1', '4'], rating: 4, price: 40, insurances: ['Asisa'], acceptsNewClients: true, modality: ['Presencial'], languages: ['Español'] },
    { id: '4', name: 'Dra. María Rodríguez', description: 'Especialista en terapia familiar y de pareja.', categories: ['3', '5'], rating: 4.8, price: 70, insurances: ['Adeslas', 'Asisa'], acceptsNewClients: false, modality: ['Híbrido'], languages: ['Español', 'Portugués'] },
    { id: '5', name: 'Dr. Carlos Sánchez', description: 'Experto en depresión y ansiedad, utiliza técnicas de mindfulness.', categories: ['4', '5'], rating: 4.2, price: 55, insurances: ['Sanitas', 'DKV'], acceptsNewClients: true, modality: ['Online', 'Híbrido'], languages: ['Español', 'Italiano', 'Lenguaje de Señas'] },
  ];

  const insurances = ['Adeslas', 'Sanitas', 'DKV', 'Mapfre', 'Asisa'];
  
  export const getCategories = async (): Promise<{ id: string; name:string }[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(categories);
      }, 500);
    });
  };

  export const getInsurances = async (): Promise<string[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(insurances);
      }, 500);
    });
  };
  
  export const getProfessionals = async (
    categoryIds: string[],
    dateRange: DateRange,
    insurance: string,
    sort: string,
    isAcceptingNewClients: boolean,
    keyword: string,
    modality: string,
    selectedLanguages: string[],
    coords?: { latitude: number; longitude: number },
    quizAnswers?: any
  ): Promise<{ id: string; name: string; rating: number; price: number; acceptsNewClients: boolean, modality: string[], languages: string[], matchScore?: number, matchReasons?: string[] }[]> => {
    console.log('Filtering by', categoryIds, dateRange, insurance, sort, isAcceptingNewClients, keyword, modality, selectedLanguages, coords, quizAnswers);
    return new Promise((resolve) => {
      setTimeout(() => {
        let filteredProfessionals = [...professionals];
  
        if (categoryIds.length > 0) {
          filteredProfessionals = filteredProfessionals.filter((p) =>
            p.categories.some((c) => categoryIds.includes(c))
          );
        }

        if (selectedLanguages.length > 0) {
          filteredProfessionals = filteredProfessionals.filter((p) =>
            p.languages.some((l) => selectedLanguages.includes(l))
          );
        }

        if (insurance) {
          filteredProfessionals = filteredProfessionals.filter((p) =>
            p.insurances.includes(insurance)
          );
        }

        if (isAcceptingNewClients) {
          filteredProfessionals = filteredProfessionals.filter((p) => p.acceptsNewClients);
        }

        if (keyword) {
          filteredProfessionals = filteredProfessionals.filter((p) =>
            p.name.toLowerCase().includes(keyword.toLowerCase()) ||
            p.description.toLowerCase().includes(keyword.toLowerCase())
          );
        }

        if (modality) {
          filteredProfessionals = filteredProfessionals.filter((p) =>
            p.modality.includes(modality)
          );
        }

        if (coords) {
          // Here you would filter by location using the coords.
          // For now, we'll just log them.
          console.log('Filtering by location', coords);
        }

        if (quizAnswers) {
          filteredProfessionals = filteredProfessionals.map(p => {
            // Mock match score calculation
            const score = Math.floor(Math.random() * 50) + 50; // Random score between 50 and 100
            const reasons = ['Coincide con: Ansiedad, TCC', 'Enfoque humanista'];
            return { ...p, matchScore: score, matchReasons: reasons };
          });
        }
  
        switch (sort) {
          case 'rating_desc':
            filteredProfessionals.sort((a, b) => b.rating - a.rating);
            break;
          case 'price_asc':
            filteredProfessionals.sort((a, b) => a.price - b.price);
            break;
          case 'price_desc':
            filteredProfessionals.sort((a, b) => b.price - a.price);
            break;
          case 'compatibility_desc':
            filteredProfessionals.sort((a, b) => (b.matchScore || 0) - (a.matchScore || 0));
            break;
          default:
            // relevance (default) - no change for now
            break;
        }
  
        resolve(filteredProfessionals);
      }, 500);
    });
  };
  
// Mock DB for saved searches
let savedSearches = [
  { id: '1', name: 'Terapeutas de Ansiedad', filters: { categoryIds: ['2'], insurance: 'Adeslas', sort: 'rating_desc' } },
  { id: '2', name: 'Expertos en Terapia Familiar', filters: { categoryIds: ['5'], insurance: '', sort: 'price_asc' } },
];

export const getUserSearches = async (): Promise<{ id: string; name: string; filters: any }[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(savedSearches);
    }, 500);
  });
};

export const saveUserSearch = async (filters: any, name: string): Promise<{ id: string; name: string; filters: any }> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newSearch = {
        id: String(Date.now()),
        name,
        filters,
      };
      savedSearches.push(newSearch);
      resolve(newSearch);
    }, 500);
  });
};

export const deleteUserSearch = async (id: string): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      savedSearches = savedSearches.filter((s) => s.id !== id);
      resolve();
    }, 500);
  });
};
  