
// Mock API
export const getProfessionalAvailability = async (professionalId: string): Promise<string[]> => {
    console.log(`Fetching availability for professional ${professionalId}`);
    // In a real application, you would fetch this from a server.
    // For now, we'll return a mock array of available dates.
    return new Promise(resolve => {
      setTimeout(() => {
        const today = new Date();
        const availableDates = [
          new Date(today.getFullYear(), today.getMonth(), 15).toISOString().split('T')[0],
          new Date(today.getFullYear(), today.getMonth(), 16).toISOString().split('T')[0],
          new Date(today.getFullYear(), today.getMonth(), 22).toISOString().split('T')[0],
          new Date(today.getFullYear(), today.getMonth(), 23).toISOString().split('T')[0],
          new Date(today.getFullYear(), today.getMonth() + 1, 5).toISOString().split('T')[0],
          new Date(today.getFullYear(), today.getMonth() + 1, 6).toISOString().split('T')[0],
        ];
        resolve(availableDates);
      }, 1000);
    });
  };

  interface BookingData {
    professionalId: string;
    date: string;
    time: string;
    modality: 'online' | 'presencial';
    status: 'pendiente de pago';
  }
  
  interface BookingConfirmation {
      id: string;
      [key: string]: any;
  }
  
  export const createBooking = async (bookingData: BookingData): Promise<BookingConfirmation> => {
      console.log("Creating booking with data:", bookingData);
      // Simulate API call
      return new Promise(resolve => {
          setTimeout(() => {
              const newBooking = {
                  id: `bk_${Date.now()}`,
                  ...bookingData,
              };
              console.log("Booking created:", newBooking);
              resolve(newBooking);
          }, 1000);
      });
  };

  export const validatePromoCode = async (code: string): Promise<{ isValid: boolean; discount?: number; error?: string }> => {
    console.log(`Validating promo code: ${code}`);
    // Mock validation logic
    return new Promise(resolve => {
      setTimeout(() => {
        if (code.toUpperCase() === 'DESCUENTO10') {
          resolve({ isValid: true, discount: 10 });
        } else if (code.toUpperCase() === 'PAQUETE5') {
          resolve({ isValid: true, discount: 50 }); // Simulate a 50% discount for a package
        } else {
          resolve({ isValid: false, error: 'Código no válido o expirado' });
        }
      }, 500);
    });
  };

  export const createTemporaryLock = async (professionalId: string, timeSlot: string): Promise<{ lockId: string; expirationTime: number }> => {
    console.log(`Creating temporary lock for professional ${professionalId} at ${timeSlot}`);
    return new Promise(resolve => {
      setTimeout(() => {
        const lockId = `lock_${Date.now()}`;
        const expirationTime = Date.now() + 10 * 60 * 1000; // 10 minutes from now
        console.log(`Lock created with ID: ${lockId}, expires at: ${new Date(expirationTime).toLocaleTimeString()}`);
        resolve({ lockId, expirationTime });
      }, 500);
    });
  };
  
  export const releaseTemporaryLock = async (lockId: string): Promise<{ success: boolean }> => {
    console.log(`Releasing temporary lock with ID: ${lockId}`);
    return new Promise(resolve => {
      setTimeout(() => {
        console.log(`Lock ${lockId} released.`);
        resolve({ success: true });
      }, 500);
    });
  };
  
  export const extendTemporaryLock = async (lockId: string): Promise<{ newExpirationTime: number }> => {
    console.log(`Extending temporary lock with ID: ${lockId}`);
    return new Promise(resolve => {
      setTimeout(() => {
        const newExpirationTime = Date.now() + 2 * 60 * 1000; // 2 more minutes
        console.log(`Lock ${lockId} extended. New expiration: ${new Date(newExpirationTime).toLocaleTimeString()}`);
        resolve({ newExpirationTime });
      }, 500);
    });
  };
