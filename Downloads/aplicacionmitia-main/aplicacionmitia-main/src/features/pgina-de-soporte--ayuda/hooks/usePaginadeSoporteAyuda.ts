import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

// Mock user data, in a real app this would come from an auth context
const mockUser = {
  isLoggedIn: true,
  name: 'Usuario de Prueba',
  email: 'test@example.com',
};

const allFaqs = [
  { id: 1, question: '¿Cómo cambio mi contraseña?', answer: 'Puedes cambiar tu contraseña en la página de configuración de tu cuenta.', tags: ['profile'] },
  { id: 2, question: '¿Cómo actualizo mi información de perfil?', answer: 'La información de tu perfil se puede actualizar en la sección de tu panel de usuario.', tags: ['profile'] },
  { id: 3, question: '¿Qué métodos de pago aceptan?', answer: 'Aceptamos tarjetas de crédito, débito y PayPal.', tags: ['billing'] },
  { id: 4, question: '¿Cómo puedo ver mi historial de pagos?', answer: 'Tu historial de pagos está disponible en la sección de facturación de tu panel.', tags: ['billing'] },
  { id: 5, question: '¿Cómo contacto con el soporte?', answer: 'Puedes contactarnos a través del formulario en esta página.', tags: ['general'] },
];

export const usePaginadeSoporteAyuda = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const [contextualFaqs, setContextualFaqs] = useState<any[]>([]);

  const context = searchParams.get('context');

  useEffect(() => {
    // Simulate fetching user data
    setTimeout(() => {
      setUser(mockUser);
      setLoading(false);
    }, 500);
  }, []);

  useEffect(() => {
    if (context) {
      // Simulate API call to fetch contextual FAQs
      const filteredFaqs = allFaqs.filter(faq => faq.tags.includes(context));
      setContextualFaqs(filteredFaqs);
    } else {
      setContextualFaqs(allFaqs);
    }
  }, [context]);

  return {
    user,
    loading,
    context,
    contextualFaqs,
    initialData: {
      name: user?.name || '',
      email: user?.email || '',
      subject: '',
      message: '',
    },
  };
};
