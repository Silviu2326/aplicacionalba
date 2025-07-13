import { FeatureRequest } from './types';

export type SystemStatus = {
    service: string;
    status: 'operational' | 'degraded_performance' | 'downtime';
    message?: string;
  };
  
  export const getSystemStatus = async (): Promise<SystemStatus[]> => {
    // Simulación de una llamada a API
    // En un caso real, esto sería:
    // const response = await fetch('/api/system-status');
    // if (!response.ok) {
    //   throw new Error('Error fetching system status');
    // }
    // return response.json();
  
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          { service: 'Plataforma', status: 'operational' },
          { service: 'Pagos', status: 'degraded_performance', message: 'Estamos experimentando lentitud' },
          { service: 'Mensajería', status: 'downtime', message: 'Servicio temporalmente interrumpido' },
        ]);
      }, 1000);
    });
  };

  const initialFeatureRequests: FeatureRequest[] = [
    {
      id: '1',
      title: 'Integración con calendarios de Google y Apple',
      description: 'Sería genial poder sincronizar las citas de TheraFlow con mi calendario personal para no perderme ninguna sesión.',
      votes: 128,
      status: 'in-consideration',
      createdAt: '2023-10-26T10:00:00Z',
    },
    {
      id: '2',
      title: 'Modo oscuro para la aplicación',
      description: 'Una interfaz con tonos oscuros sería más cómoda para la vista, especialmente en sesiones nocturnas.',
      votes: 97,
      status: 'received',
      createdAt: '2023-10-25T15:30:00Z',
    },
    {
      id: '3',
      title: 'Gamificación del seguimiento de progreso',
      description: 'Añadir logros o insignias por completar ejercicios o mantener la regularidad en las terapias podría ser muy motivador.',
      votes: 54,
      status: 'received',
      createdAt: '2023-10-24T11:45:00Z',
    },
  ];
  
  // Mock de la base de datos en memoria
  let featureRequests: FeatureRequest[] = [...initialFeatureRequests];
  
  export const getFeatureRequests = async (): Promise<FeatureRequest[]> => {
    console.log('Fetching feature requests...');
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log('Feature requests fetched:', featureRequests);
        resolve([...featureRequests].sort((a, b) => b.votes - a.votes));
      }, 500);
    });
  };
  
  export const addFeatureRequest = async (
    title: string,
    description: string
  ): Promise<FeatureRequest> => {
    console.log('Adding feature request:', { title, description });
    return new Promise((resolve) => {
      setTimeout(() => {
        const newRequest: FeatureRequest = {
          id: (featureRequests.length + 1).toString(),
          title,
          description,
          votes: 1,
          status: 'received',
          createdAt: new Date().toISOString(),
        };
        featureRequests.push(newRequest);
        console.log('Feature request added:', newRequest);
        resolve(newRequest);
      }, 500);
    });
  };
  
  export const voteForFeatureRequest = async (requestId: string): Promise<FeatureRequest> => {
    console.log('Voting for feature request:', requestId);
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const requestIndex = featureRequests.findIndex((req) => req.id === requestId);
        if (requestIndex === -1) {
          console.error('Feature request not found:', requestId);
          return reject(new Error('Request not found'));
        }
  
        featureRequests[requestIndex].votes += 1;
        const updatedRequest = featureRequests[requestIndex];
        console.log('Vote successful:', updatedRequest);
        resolve(updatedRequest);
      }, 300);
    });
  };

export const suggestCategory = async (description: string): Promise<string[]> => {
  console.log('Suggesting category for:', description);
  return new Promise((resolve) => {
    setTimeout(() => {
      const lowerCaseDescription = description.toLowerCase();
      const suggestions: string[] = [];

      if (lowerCaseDescription.includes('pago') || lowerCaseDescription.includes('factura')) {
        suggestions.push('Facturación');
      }
      if (lowerCaseDescription.includes('error') || lowerCaseDescription.includes('problema')) {
        suggestions.push('Problema técnico');
      }
      if (lowerCaseDescription.includes('perfil') || lowerCaseDescription.includes('profesional')) {
        suggestions.push('Perfil profesional');
      }
      
      // Add some generic suggestions if no keywords are found
      if (suggestions.length === 0) {
        suggestions.push('General', 'Cuenta');
      }

      resolve(suggestions.slice(0, 3));
    }, 500);
  });
};
