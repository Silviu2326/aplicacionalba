// Simulando una llamada API para obtener detalles de la reserva y el desglose de precios
interface PriceDetails {
    basePrice: number;
    taxes: number;
    platformFee: number;
    discount?: number;
    total: number;
  }
  
  interface BookingDetails {
    bookingId: string;
    professionalName: string;
    sessionDate: string;
    priceDetails: PriceDetails;
  }

  interface SavedPaymentMethod {
    id: string;
    card: {
      brand: string;
      last4: string;
    };
  }
  
  export const fetchBookingDetails = async (bookingId: string): Promise<BookingDetails> => {
    console.log(`Fetching booking details for ID: ${bookingId}`);
  
    // Simulación de datos de la API
    const mockPriceDetails: PriceDetails = {
      basePrice: 80.00,
      taxes: 16.80,
      platformFee: 5.00,
      discount: 10.00, // Opcional
      total: 91.80,
    };
  
    const mockBookingDetails: BookingDetails = {
      bookingId,
      professionalName: 'Dr. Ana María',
      sessionDate: new Date().toISOString(),
      priceDetails: mockPriceDetails,
    };
  
    // Simular un retardo de red
    return new Promise(resolve => setTimeout(() => resolve(mockBookingDetails), 500));
  };
  
  // Simula la aplicación de un código de descuento
  export const applyDiscountCode = async (bookingId: string, discountCode: string): Promise<PriceDetails> => {
    console.log(`Applying discount code ${discountCode} to booking ${bookingId}`);
    
    // Lógica de simulación: si el código es "DESCUENTO10", aplica un 10% de descuento.
    const basePrice = 80.00;
    const platformFee = 5.00;
    const taxes = 16.80;
    let discount = 10.00;
    
    if (discountCode === 'PROMO20') {
        discount = basePrice * 0.20; // 20% de descuento
    }
    
    const total = basePrice + platformFee + taxes - discount;
  
    const newPriceDetails: PriceDetails = {
      basePrice,
      taxes,
      platformFee,
      discount,
      total,
    };
  
    return new Promise(resolve => setTimeout(() => resolve(newPriceDetails), 300));
  };

  // Simula el procesamiento del pago
export const processPayment = async (bookingId: string, { saveMethod }: { saveMethod: boolean }): Promise<{ success: boolean }> => {
    console.log(`Processing payment for booking ${bookingId}...`);
    console.log(`Save payment method for future use: ${saveMethod}`);
  
    // Aquí iría la lógica para comunicarse con Stripe o cualquier otra pasarela de pago.
    // Si saveMethod es true, se debería enviar una solicitud al backend para que
    // guarde el método de pago en el perfil del cliente de Stripe.
  
    // Simular un retardo de red
    await new Promise(resolve => setTimeout(resolve, 1500));
  
    // Simular un resultado exitoso
    return { success: true };
  };

  // Simula la obtención de métodos de pago guardados
export const getSavedPaymentMethods = async (): Promise<SavedPaymentMethod[]> => {
    console.log('Fetching saved payment methods...');
    const mockMethods: SavedPaymentMethod[] = [
      { id: 'pm_1', card: { brand: 'Visa', last4: '4242' } },
      { id: 'pm_2', card: { brand: 'Mastercard', last4: '5555' } },
    ];
    return new Promise(resolve => setTimeout(() => resolve(mockMethods), 400));
  };
  
  // Simula la eliminación de un método de pago
  export const deletePaymentMethod = async (methodId: string): Promise<{ success: boolean }> => {
    console.log(`Deleting payment method ${methodId}...`);
    return new Promise(resolve => setTimeout(() => resolve({ success: true }), 300));
  };

  export const validateCoupon = async (code: string): Promise<{ isValid: boolean; discount: number }> => {
    console.log(`Validating coupon code: ${code}`);
    // Simulación de la validación de un cupón
    if (code === 'DESCUENTO20') {
      return new Promise(resolve => setTimeout(() => resolve({ isValid: true, discount: 20.00 }), 300));
    }
    return new Promise(resolve => setTimeout(() => resolve({ isValid: false, discount: 0 }), 300));
  };
  