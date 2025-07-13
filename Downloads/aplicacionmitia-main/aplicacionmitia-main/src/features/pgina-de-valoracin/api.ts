
// Simulate API calls

export interface Professional {
    id: string;
    name: string;
    imageUrl: string;
  }
  
  export interface Session {
    date: string;
    time: string;
  }
  
  export interface BookingDetails {
    professional: Professional;
    session: Session;
  }

  export interface ReviewPayload {
    rating: number;
    comment: string;
    tags: string[];
  }
  
  export const getBookingDetails = async (bookingId: string): Promise<BookingDetails> => {
    console.log(`Fetching details for booking ${bookingId}...`);
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000));
  
    // Simulate success or error
    if (bookingId === 'error') {
      throw new Error('No se pudieron cargar los detalles de la reserva. Por favor, inténtelo de nuevo.');
    }
  
    // Simulate successful data fetch
    return {
      professional: {
        id: 'prof-123',
        name: 'Dr. Alejandro Sanz',
        imageUrl: 'https://randomuser.me/api/portraits/men/75.jpg',
      },
      session: {
        date: '2025-07-10',
        time: '15:00',
      },
    };
  };
  
  export const submitReview = async (payload: ReviewPayload): Promise<{ success: true }> => {
    console.log(`Submitting review`, payload);
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Simulate a network error
    if (Math.random() > 0.5) {
        throw new Error('Network Error');
    }

    return { success: true };
  };

  export interface ReportPayload {
    bookingId: string;
    category: string;
    description: string;
  }
  
  export const reportProblem = async (payload: ReportPayload): Promise<{ success: true }> => {
    console.log('Submitting problem report', payload);
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000));
  
    // Simulate a random error
    if (Math.random() > 0.9) {
      throw new Error('Failed to submit the report due to a network error.');
    }
  
    console.log(`Report for booking ${payload.bookingId} has been flagged for review.`);
    return { success: true };
  };
