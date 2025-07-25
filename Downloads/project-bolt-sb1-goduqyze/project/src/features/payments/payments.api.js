// Payments API functions
const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

// Obtener todos los pagos
export const getPayments = async (filters = {}) => {
  try {
    // TODO: Implementar llamada real a la API
    // const queryParams = new URLSearchParams(filters);
    // const response = await fetch(`${BASE_URL}/payments?${queryParams}`);
    // if (!response.ok) throw new Error('Error fetching payments');
    // return await response.json();
    
    // Mock data for development
    return [
      {
        id: 1,
        clientId: 1,
        clientName: 'María López',
        amount: 120.00,
        currency: 'EUR',
        service: 'Plan Mensual Premium',
        status: 'completed',
        paymentMethod: 'credit_card',
        dueDate: '2024-01-15',
        paidDate: '2024-01-14',
        invoiceNumber: 'INV-001',
        stripePaymentId: 'pi_1234567890'
      },
      {
        id: 2,
        clientId: 2,
        clientName: 'Carlos Ruiz',
        amount: 80.00,
        currency: 'EUR',
        service: 'Plan Mensual Básico',
        status: 'pending',
        paymentMethod: 'bank_transfer',
        dueDate: '2024-01-20',
        paidDate: null,
        invoiceNumber: 'INV-002',
        stripePaymentId: null
      }
    ];
  } catch (error) {
    console.error('Error getting payments:', error);
    throw error;
  }
};

// Obtener un pago por ID
export const getPaymentById = async (paymentId) => {
  try {
    // TODO: Implementar llamada real a la API
    // const response = await fetch(`${BASE_URL}/payments/${paymentId}`);
    // if (!response.ok) throw new Error('Error fetching payment');
    // return await response.json();
    
    // Mock data for development
    return {
      id: paymentId,
      clientId: 1,
      clientName: 'María López',
      clientEmail: 'maria.lopez@email.com',
      amount: 120.00,
      currency: 'EUR',
      service: 'Plan Mensual Premium',
      description: 'Entrenamiento personalizado y plan nutricional',
      status: 'completed',
      paymentMethod: 'credit_card',
      dueDate: '2024-01-15',
      paidDate: '2024-01-14',
      invoiceNumber: 'INV-001',
      stripePaymentId: 'pi_1234567890',
      taxAmount: 25.20,
      subtotal: 94.80,
      billingAddress: {
        name: 'María López',
        address: 'Calle Mayor 123',
        city: 'Madrid',
        postalCode: '28001',
        country: 'España'
      }
    };
  } catch (error) {
    console.error('Error getting payment:', error);
    throw error;
  }
};

// Crear una nueva factura/pago
export const createPayment = async (paymentData) => {
  try {
    // TODO: Implementar llamada real a la API
    // const response = await fetch(`${BASE_URL}/payments`, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(paymentData),
    // });
    // if (!response.ok) throw new Error('Error creating payment');
    // return await response.json();
    
    // Mock response for development
    console.log('Creating payment:', paymentData);
    return {
      id: Date.now(),
      ...paymentData,
      status: 'pending',
      invoiceNumber: `INV-${Date.now()}`,
      createdDate: new Date().toISOString().split('T')[0]
    };
  } catch (error) {
    console.error('Error creating payment:', error);
    throw error;
  }
};

// Actualizar estado de un pago
export const updatePaymentStatus = async (paymentId, status, paymentData = {}) => {
  try {
    // TODO: Implementar llamada real a la API
    // const response = await fetch(`${BASE_URL}/payments/${paymentId}/status`, {
    //   method: 'PATCH',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({ status, ...paymentData }),
    // });
    // if (!response.ok) throw new Error('Error updating payment status');
    // return await response.json();
    
    // Mock response for development
    console.log('Updating payment status:', paymentId, status, paymentData);
    return {
      id: paymentId,
      status,
      updatedAt: new Date().toISOString(),
      ...paymentData
    };
  } catch (error) {
    console.error('Error updating payment status:', error);
    throw error;
  }
};

// Procesar pago con Stripe
export const processStripePayment = async (paymentIntentData) => {
  try {
    // TODO: Implementar integración real con Stripe
    // const response = await fetch(`${BASE_URL}/payments/stripe/process`, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(paymentIntentData),
    // });
    // if (!response.ok) throw new Error('Error processing Stripe payment');
    // return await response.json();
    
    // Mock response for development
    console.log('Processing Stripe payment:', paymentIntentData);
    return {
      success: true,
      paymentIntentId: 'pi_mock_' + Date.now(),
      clientSecret: 'pi_mock_' + Date.now() + '_secret_mock',
      status: 'succeeded'
    };
  } catch (error) {
    console.error('Error processing Stripe payment:', error);
    throw error;
  }
};

// Enviar recordatorio de pago
export const sendPaymentReminder = async (paymentId, reminderType = 'email') => {
  try {
    // TODO: Implementar llamada real a la API
    // const response = await fetch(`${BASE_URL}/payments/${paymentId}/reminder`, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({ type: reminderType }),
    // });
    // if (!response.ok) throw new Error('Error sending payment reminder');
    // return await response.json();
    
    // Mock response for development
    console.log('Sending payment reminder:', paymentId, reminderType);
    return {
      success: true,
      message: 'Recordatorio enviado correctamente',
      sentAt: new Date().toISOString()
    };
  } catch (error) {
    console.error('Error sending payment reminder:', error);
    throw error;
  }
};

// Generar factura PDF
export const generateInvoicePDF = async (paymentId) => {
  try {
    // TODO: Implementar llamada real a la API
    // const response = await fetch(`${BASE_URL}/payments/${paymentId}/invoice/pdf`);
    // if (!response.ok) throw new Error('Error generating invoice PDF');
    // return await response.blob();
    
    // Mock response for development
    console.log('Generating invoice PDF for payment:', paymentId);
    return {
      success: true,
      message: 'PDF generado correctamente',
      downloadUrl: `http://localhost:3000/invoices/INV-${paymentId}.pdf`
    };
  } catch (error) {
    console.error('Error generating invoice PDF:', error);
    throw error;
  }
};

// Obtener estadísticas de pagos
export const getPaymentStats = async (period = 'month') => {
  try {
    // TODO: Implementar llamada real a la API
    // const response = await fetch(`${BASE_URL}/payments/stats?period=${period}`);
    // if (!response.ok) throw new Error('Error fetching payment stats');
    // return await response.json();
    
    // Mock data for development
    return {
      totalRevenue: 2850,
      totalPayments: 15,
      pendingAmount: 460,
      overdueAmount: 120,
      averagePayment: 190,
      paymentsByMonth: [
        { month: 'Ene', amount: 2400 },
        { month: 'Feb', amount: 2850 },
        { month: 'Mar', amount: 3200 }
      ],
      paymentsByStatus: {
        completed: 12,
        pending: 2,
        overdue: 1,
        cancelled: 0
      }
    };
  } catch (error) {
    console.error('Error getting payment stats:', error);
    throw error;
  }
};

// Obtener configuración de Stripe
export const getStripeConfig = async () => {
  try {
    // TODO: Implementar llamada real a la API
    // const response = await fetch(`${BASE_URL}/payments/stripe/config`);
    // if (!response.ok) throw new Error('Error fetching Stripe config');
    // return await response.json();
    
    // Mock response for development
    return {
      publishableKey: import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || 'pk_test_mock_key',
      currency: 'eur',
      country: 'ES'
    };
  } catch (error) {
    console.error('Error getting Stripe config:', error);
    throw error;
  }
};