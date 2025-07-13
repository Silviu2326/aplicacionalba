// Mock API functions
// In a real application, these would make network requests to a backend API.
import { Addon } from './types';

export const getSubscriptionStatus = async () => {
    // Simulate a user with a cancelled subscription
    return Promise.resolve({
      active: false,
      planName: null,
      cancelled: true,
      cancelledPlanName: 'Profesional Plus',
    });
  };
  
  export const reactivateSubscription = async () => {
    // Simulate a successful reactivation
    console.log('Reactivating subscription...');
    return Promise.resolve({ success: true });
  };

  const mockAddons: Addon[] = [
    { id: 'addon-1', name: 'Gestión Avanzada de Pacientes', description: 'Herramientas para seguimiento detallado.', price: 10 },
    { id: 'addon-2', name: 'Plataforma de Teleterapia Segura', description: 'Videollamadas encriptadas HIPAA.', price: 15 },
    { id: 'addon-3', name: 'Marketing y Adquisición de Clientes', description: 'Aparece más alto en las búsquedas.', price: 20 },
    { id: 'addon-4', name: 'Facturación Automatizada', description: 'Genera y envía facturas automáticamente.', price: 5 },
  ];

  export const getPlans = async () => {
    return Promise.resolve([
      {
        id: 'plan_basic',
        name: 'Esencial',
        price: { monthly: 29, annually: 290 },
        features: [
          { name: 'Perfil Básico', included: true },
          { name: 'Agenda Inteligente', included: true },
          { name: 'Recordatorios Automáticos', included: false },
          { name: 'Videollamadas Seguras', included: false },
          { name: 'Publicación de Contenido', included: false },
          { name: 'Panel de Analíticas', included: false },
          { name: 'Soporte Prioritario', included: false },
        ],
        isRecommended: false,
        addonIds: ['addon-1', 'addon-4'],
      },
      {
        id: 'plan_plus',
        name: 'Profesional Plus',
        price: { monthly: 59, annually: 590 },
        features: [
          { name: 'Perfil Básico', included: true },
          { name: 'Agenda Inteligente', included: true },
          { name: 'Recordatorios Automáticos', included: true },
          { name: 'Videollamadas Seguras', included: true },
          { name: 'Publicación de Contenido', included: true },
          { name: 'Panel de Analíticas', included: false },
          { name: 'Soporte Prioritario', included: false },
        ],
        isRecommended: true,
        addonIds: ['addon-1', 'addon-2', 'addon-3', 'addon-4'],
      },
      {
        id: 'plan_premium',
        name: 'Premium',
        price: { monthly: 99, annually: 990 },
        features: [
          { name: 'Perfil Básico', included: true },
          { name: 'Agenda Inteligente', included: true },
          { name: 'Recordatorios Automáticos', included: true },
          { name: 'Videollamadas Seguras', included: true },
          { name: 'Publicación de Contenido', included: true },
          { name: 'Panel de Analíticas', included: true },
          { name: 'Soporte Prioritario', included: true },
        ],
        isRecommended: false,
        addonIds: [], // Todos los addons ya están incluidos o no aplican
      },
    ]);
  };

  export const getAddons = async (): Promise<Addon[]> => {
    // Simular una llamada a la API
    return new Promise(resolve => setTimeout(() => resolve(mockAddons), 500));
  };

  export const getFaqs = async (context: string) => {
    console.log(`Fetching FAQs for context: ${context}`);
    // Simulate API call
    const allFaqs = [
      { question: '¿Cómo funciona la facturación?', answer: 'La facturación es mensual o anual, según el ciclo que elijas. Se te cobrará automáticamente al inicio de cada ciclo.' },
      { question: '¿Puedo cancelar mi suscripción en cualquier momento?', answer: 'Sí, puedes cancelar tu suscripción en cualquier momento desde el panel de profesional. Tu plan permanecerá activo hasta el final del ciclo de facturación actual.' },
      { question: '¿Qué pasa si supero el límite de mi plan?', answer: 'Si superas los límites de tu plan, te notificaremos para que puedas actualizar a un plan superior. No se te cobrará de más automáticamente.' },
      { question: '¿Ofrecen un período de prueba gratuito?', answer: 'Actualmente no ofrecemos un período de prueba gratuito, pero tenemos una garantía de devolución de dinero de 14 días en todos nuestros planes.' },
    ];
  
    return new Promise(resolve => setTimeout(() => resolve(allFaqs), 500));
  };

