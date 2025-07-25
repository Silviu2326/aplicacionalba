import { useState, useEffect } from 'react';

/**
 * Hook personalizado para integración con Stripe
 * Maneja configuración y procesamiento de pagos
 */
export const useStripe = () => {
  const [stripe, setStripe] = useState(null);
  const [elements, setElements] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Configuración de Stripe
  const stripeConfig = {
    publishableKey: import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || 'pk_test_mock',
    options: {
      locale: 'es',
      appearance: {
        theme: 'stripe',
        variables: {
          colorPrimary: '#3B82F6',
          colorBackground: '#ffffff',
          colorText: '#1f2937',
          borderRadius: '8px'
        }
      }
    }
  };

  // Inicializar Stripe
  useEffect(() => {
    const initializeStripe = async () => {
      try {
        // TODO: Cargar Stripe.js dinámicamente en producción
        // const stripeJs = await import('@stripe/stripe-js');
        // const stripeInstance = await stripeJs.loadStripe(stripeConfig.publishableKey);
        
        // Mock para desarrollo
        const mockStripe = {
          elements: (options) => ({
            create: (type, options) => ({
              mount: (selector) => console.log(`Mounted ${type} element to ${selector}`),
              unmount: () => console.log('Unmounted element'),
              on: (event, handler) => console.log(`Event listener added: ${event}`),
              update: (options) => console.log('Element updated', options)
            }),
            getElement: (type) => null
          }),
          createPaymentMethod: async (options) => ({
            paymentMethod: { id: 'pm_mock_' + Date.now() },
            error: null
          }),
          confirmCardPayment: async (clientSecret, options) => ({
            paymentIntent: { 
              id: 'pi_mock_' + Date.now(),
              status: 'succeeded' 
            },
            error: null
          })
        };

        setStripe(mockStripe);
        setElements(mockStripe.elements(stripeConfig.options));
        setLoading(false);
      } catch (err) {
        setError('Error cargando Stripe');
        setLoading(false);
      }
    };

    initializeStripe();
  }, []);

  // Crear método de pago
  const createPaymentMethod = async (elementType = 'card', billingDetails = {}) => {
    if (!stripe || !elements) {
      throw new Error('Stripe no está inicializado');
    }

    try {
      const element = elements.getElement(elementType);
      
      const result = await stripe.createPaymentMethod({
        type: 'card',
        card: element,
        billing_details: billingDetails
      });

      if (result.error) {
        throw new Error(result.error.message);
      }

      return result.paymentMethod;
    } catch (error) {
      setError(error.message);
      throw error;
    }
  };

  // Confirmar pago
  const confirmPayment = async (clientSecret, paymentMethodId = null) => {
    if (!stripe) {
      throw new Error('Stripe no está inicializado');
    }

    try {
      const confirmationData = paymentMethodId 
        ? { payment_method: paymentMethodId }
        : { payment_method: { card: elements.getElement('card') } };

      const result = await stripe.confirmCardPayment(clientSecret, confirmationData);

      if (result.error) {
        throw new Error(result.error.message);
      }

      return result.paymentIntent;
    } catch (error) {
      setError(error.message);
      throw error;
    }
  };

  // Procesar pago completo
  const processPayment = async (paymentData) => {
    try {
      setLoading(true);
      setError(null);

      // TODO: Llamar a tu API para crear el PaymentIntent
      // const response = await fetch('/api/payments/create-intent', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(paymentData)
      // });
      // const { clientSecret } = await response.json();

      // Mock para desarrollo
      const clientSecret = 'pi_mock_' + Date.now() + '_secret_mock';

      // Confirmar el pago
      const paymentIntent = await confirmPayment(clientSecret);

      return {
        success: true,
        paymentIntent,
        message: 'Pago procesado correctamente'
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
        message: 'Error procesando el pago'
      };
    } finally {
      setLoading(false);
    }
  };

  // Crear elemento de tarjeta
  const createCardElement = (options = {}) => {
    if (!elements) return null;

    return elements.create('card', {
      style: {
        base: {
          fontSize: '16px',
          color: '#374151',
          '::placeholder': {
            color: '#9CA3AF',
          },
        },
        invalid: {
          color: '#EF4444',
        },
      },
      hidePostalCode: false,
      ...options
    });
  };

  // Validar elementos de Stripe
  const validateElements = async () => {
    if (!elements) return { isValid: false, error: 'Elementos no inicializados' };

    try {
      const cardElement = elements.getElement('card');
      if (!cardElement) {
        return { isValid: false, error: 'Elemento de tarjeta no encontrado' };
      }

      // TODO: Implementar validación real
      return { isValid: true };
    } catch (error) {
      return { isValid: false, error: error.message };
    }
  };

  // Formatear errores de Stripe
  const formatStripeError = (error) => {
    const errorMessages = {
      'card_declined': 'Tu tarjeta fue rechazada. Verifica los datos o prueba con otra tarjeta.',
      'expired_card': 'Tu tarjeta ha expirado. Prueba con otra tarjeta.',
      'incorrect_cvc': 'El código de seguridad de tu tarjeta es incorrecto.',
      'processing_error': 'Ocurrió un error procesando tu tarjeta. Inténtalo de nuevo.',
      'incorrect_number': 'El número de tarjeta es incorrecto.',
      'incomplete_number': 'El número de tarjeta está incompleto.',
      'incomplete_cvc': 'El código de seguridad está incompleto.',
      'incomplete_expiry': 'La fecha de vencimiento está incompleta.'
    };

    return errorMessages[error.code] || error.message || 'Error desconocido procesando el pago';
  };

  // Limpiar errores
  const clearError = () => setError(null);

  return {
    // Estado
    stripe,
    elements,
    loading,
    error,
    
    // Métodos
    createPaymentMethod,
    confirmPayment,
    processPayment,
    createCardElement,
    validateElements,
    formatStripeError,
    clearError,
    
    // Utilidades
    isReady: !loading && stripe && elements,
    config: stripeConfig
  };
};

export default useStripe;