import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Store de autenticación
export const useAuthStore = create(
  persist(
    (set, get) => ({
      // Estado inicial
      user: null,
      token: null,
      isAuthenticated: false,
      loading: false,
      error: null,

      // Acciones de autenticación
      login: async (credentials) => {
        set({ loading: true, error: null });
        try {
          // TODO: Reemplazar con llamada real a la API
          const response = await import('../features/auth/login.api').then(module => 
            module.login(credentials)
          );
          
          set({
            user: response.user,
            token: response.token,
            isAuthenticated: true,
            loading: false,
            error: null
          });
          
          // Guardar en localStorage para persistencia
          localStorage.setItem('token', response.token);
          localStorage.setItem('user', JSON.stringify(response.user));
          
          return response;
        } catch (error) {
          set({ 
            loading: false, 
            error: error.message || 'Error durante el login' 
          });
          throw error;
        }
      },

      logout: () => {
        set({
          user: null,
          token: null,
          isAuthenticated: false,
          loading: false,
          error: null
        });
        
        // Limpiar localStorage
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      },

      updateUser: (userData) => {
        const currentUser = get().user;
        if (currentUser) {
          const updatedUser = { ...currentUser, ...userData };
          set({ user: updatedUser });
          localStorage.setItem('user', JSON.stringify(updatedUser));
        }
      },

      clearError: () => set({ error: null }),

      // Inicializar desde localStorage
      initialize: () => {
        const token = localStorage.getItem('token');
        const user = localStorage.getItem('user');
        
        if (token && user) {
          try {
            set({
              token,
              user: JSON.parse(user),
              isAuthenticated: true
            });
          } catch (error) {
            console.error('Error parsing user from localStorage:', error);
            localStorage.removeItem('token');
            localStorage.removeItem('user');
          }
        }
      }
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated
      })
    }
  )
);

// Store para clientes
export const useClientStore = create((set, get) => ({
  // Estado inicial
  clients: [],
  selectedClient: null,
  loading: false,
  error: null,
  filters: {
    search: '',
    status: 'all'
  },

  // Acciones
  setClients: (clients) => set({ clients }),
  
  addClient: (client) => {
    const clients = get().clients;
    set({ clients: [...clients, client] });
  },

  updateClient: (clientId, clientData) => {
    const clients = get().clients;
    const updatedClients = clients.map(client => 
      client.id === clientId ? { ...client, ...clientData } : client
    );
    set({ clients: updatedClients });
  },

  deleteClient: (clientId) => {
    const clients = get().clients;
    const filteredClients = clients.filter(client => client.id !== clientId);
    set({ clients: filteredClients });
  },

  setSelectedClient: (client) => set({ selectedClient: client }),

  setFilters: (filters) => {
    const currentFilters = get().filters;
    set({ filters: { ...currentFilters, ...filters } });
  },

  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
  clearError: () => set({ error: null })
}));

// Store para dietas
export const useDietStore = create((set, get) => ({
  // Estado inicial
  diets: [],
  selectedDiet: null,
  loading: false,
  error: null,

  // Acciones
  setDiets: (diets) => set({ diets }),
  
  addDiet: (diet) => {
    const diets = get().diets;
    set({ diets: [...diets, diet] });
  },

  updateDiet: (dietId, dietData) => {
    const diets = get().diets;
    const updatedDiets = diets.map(diet => 
      diet.id === dietId ? { ...diet, ...dietData } : diet
    );
    set({ diets: updatedDiets });
  },

  deleteDiet: (dietId) => {
    const diets = get().diets;
    const filteredDiets = diets.filter(diet => diet.id !== dietId);
    set({ diets: filteredDiets });
  },

  setSelectedDiet: (diet) => set({ selectedDiet: diet }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
  clearError: () => set({ error: null })
}));

// Store para entrenamientos
export const useWorkoutStore = create((set, get) => ({
  // Estado inicial
  workouts: [],
  selectedWorkout: null,
  loading: false,
  error: null,

  // Acciones
  setWorkouts: (workouts) => set({ workouts }),
  
  addWorkout: (workout) => {
    const workouts = get().workouts;
    set({ workouts: [...workouts, workout] });
  },

  updateWorkout: (workoutId, workoutData) => {
    const workouts = get().workouts;
    const updatedWorkouts = workouts.map(workout => 
      workout.id === workoutId ? { ...workout, ...workoutData } : workout
    );
    set({ workouts: updatedWorkouts });
  },

  deleteWorkout: (workoutId) => {
    const workouts = get().workouts;
    const filteredWorkouts = workouts.filter(workout => workout.id !== workoutId);
    set({ workouts: filteredWorkouts });
  },

  setSelectedWorkout: (workout) => set({ selectedWorkout: workout }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
  clearError: () => set({ error: null })
}));

// Store para pagos
export const usePaymentStore = create((set, get) => ({
  // Estado inicial
  payments: [],
  selectedPayment: null,
  stats: null,
  loading: false,
  error: null,

  // Acciones
  setPayments: (payments) => set({ payments }),
  
  addPayment: (payment) => {
    const payments = get().payments;
    set({ payments: [...payments, payment] });
  },

  updatePayment: (paymentId, paymentData) => {
    const payments = get().payments;
    const updatedPayments = payments.map(payment => 
      payment.id === paymentId ? { ...payment, ...paymentData } : payment
    );
    set({ payments: updatedPayments });
  },

  deletePayment: (paymentId) => {
    const payments = get().payments;
    const filteredPayments = payments.filter(payment => payment.id !== paymentId);
    set({ payments: filteredPayments });
  },

  setSelectedPayment: (payment) => set({ selectedPayment: payment }),
  setStats: (stats) => set({ stats }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
  clearError: () => set({ error: null })
}));

// Store global para el estado de la UI
export const useUIStore = create((set, get) => ({
  // Estado inicial
  sidebarOpen: false,
  theme: 'light',
  notifications: [],
  currentPage: 'dashboard',

  // Acciones
  toggleSidebar: () => {
    const sidebarOpen = get().sidebarOpen;
    set({ sidebarOpen: !sidebarOpen });
  },

  setSidebarOpen: (open) => set({ sidebarOpen: open }),

  setTheme: (theme) => set({ theme }),

  addNotification: (notification) => {
    const notifications = get().notifications;
    const newNotification = {
      id: Date.now(),
      timestamp: new Date().toISOString(),
      ...notification
    };
    set({ notifications: [...notifications, newNotification] });
  },

  removeNotification: (id) => {
    const notifications = get().notifications;
    const filteredNotifications = notifications.filter(n => n.id !== id);
    set({ notifications: filteredNotifications });
  },

  clearNotifications: () => set({ notifications: [] }),

  setCurrentPage: (page) => set({ currentPage: page })
}));

// Inicializar stores al cargar la aplicación
if (typeof window !== 'undefined') {
  useAuthStore.getState().initialize();
}