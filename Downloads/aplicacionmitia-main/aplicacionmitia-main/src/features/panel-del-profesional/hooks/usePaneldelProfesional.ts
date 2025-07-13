import { useState, useEffect, useCallback } from 'react';
import { getStats, getSubscription, getConversations, getMessages, sendMessage, getResources, uploadResource, deleteResource } from '../api';

// Mock data - replace with actual API call
const mockProfile = {
  name: 'Juan Profesional',
  bio: 'Especialista en terapia cognitivo-conductual con 5 años de experiencia.',
  specialties: ['Ansiedad', 'Depresión'],
  rates: 80,
  profilePicture: 'https://via.placeholder.com/150',
};

const mockReservations = {
  upcoming: [
    { id: 1, clientName: 'Carlos Santana', date: '2025-07-15 10:00', status: 'Confirmada', review: false },
    { id: 2, clientName: 'Ana Fernandez', date: '2025-07-16 12:00', status: 'Confirmada', review: false },
  ],
  past: [
    { id: 3, clientName: 'Luisa Perez', date: '2025-07-01 15:00', status: 'Completada', review: true },
    { id: 4, clientName: 'Javier Gomez', date: '2025-06-28 11:00', status: 'Completada', review: false },
  ],
  cancelled: [
    { id: 5, clientName: 'Maria Rodriguez', date: '2025-07-05 09:00', status: 'Cancelada', review: false },
  ],
};

export const usePaneldelProfesional = () => {
  // Profile state
  const [profile, setProfile] = useState(mockProfile);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  // Reservations state
  const [filter, setFilter] = useState('upcoming');
  const [reservations, setReservations] = useState([]);
  const [loadingReservations, setLoadingReservations] = useState(true);

  // Stats state
  const [stats, setStats] = useState({
    monthly_income: 0,
    completed_sessions: 0,
    average_rating: 0,
    new_clients: 0,
  });
  const [loadingStats, setLoadingStats] = useState(true);
  const [statsError, setStatsError] = useState(null);

  // Subscription state
  const [subscription, setSubscription] = useState(null);
  const [loadingSubscription, setLoadingSubscription] = useState(true);
  const [subscriptionError, setSubscriptionError] = useState(null);

  // Chat state
  const [conversations, setConversations] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [loadingMessages, setLoadingMessages] = useState(false);

  // Resources state
    const [resources, setResources] = useState([]);
    const [loadingResources, setLoadingResources] = useState(false);
    const [resourcesError, setResourcesError] = useState(null);

  // Fetch conversations
  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const data = await getConversations();
        setConversations(data);
        if (data.length > 0) {
          setSelectedConversation(data[0].id);
        }
      } catch (error) {
        console.error("Error fetching conversations", error);
      }
    };
    fetchConversations();
  }, []);

  // Fetch messages for selected conversation
  useEffect(() => {
    if (selectedConversation) {
      const fetchMessages = async () => {
        setLoadingMessages(true);
        try {
          const data = await getMessages(selectedConversation);
          setMessages(data);
        } catch (error) {
          console.error("Error fetching messages", error);
        } finally {
          setLoadingMessages(false);
        }
      };
      fetchMessages();
    }
  }, [selectedConversation]);

  // Send message
  const handleSendMessage = async (messageText: string) => {
    if (!selectedConversation) return;
    try {
      const newMessage = await sendMessage(selectedConversation, messageText);
      setMessages(prevMessages => [...prevMessages, newMessage]);
    } catch (error) {
      console.error("Error sending message", error);
    }
  };


  // Fetch reservations
  useEffect(() => {
    setLoadingReservations(true);
    // Simulate API call
    setTimeout(() => {
      setReservations(mockReservations[filter]);
      setLoadingReservations(false);
    }, 500);
  }, [filter]);

  // Fetch stats
  const fetchStats = useCallback(async (dateRange) => {
    setLoadingStats(true);
    setStatsError(null);
    try {
      const data = await getStats(dateRange);
      setStats(data);
    } catch (err) {
      setStatsError('Error al cargar las estadísticas');
    } finally {
      setLoadingStats(false);
    }
  }, []);

  useEffect(() => {
    fetchStats('last_30_days');
  }, [fetchStats]);

  // Fetch subscription
  useEffect(() => {
    const fetchSubscription = async () => {
      setLoadingSubscription(true);
      setSubscriptionError(null);
      try {
        const data = await getSubscription();
        setSubscription(data);
      } catch (err) {
        setSubscriptionError('Error al cargar la suscripción');
      } finally {
        setLoadingSubscription(false);
      }
    };
    fetchSubscription();
  }, []);

  // Handle profile form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccess(false);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setSuccess(true);
      console.log('Profile updated:', profile);
    }, 1000);
  };

    // Fetch resources
    const fetchResources = useCallback(async (professionalId: number, clientId: number) => {
        setLoadingResources(true);
        setResourcesError(null);
        try {
            const data = await getResources(professionalId, clientId);
            setResources(data);
        } catch (err) {
            setResourcesError('Error al cargar los recursos');
        } finally {
            setLoadingResources(false);
        }
    }, []);

    // Upload resource
    const handleUploadResource = async (professionalId: number, clientId: number, file: File) => {
        try {
            const newResource = await uploadResource(professionalId, clientId, file);
            setResources(prevResources => [...prevResources, newResource]);
        } catch (error) {
            console.error("Error uploading resource", error);
        }
    };

    // Delete resource
    const handleDeleteResource = async (resourceId: number) => {
        try {
            await deleteResource(resourceId);
            setResources(prevResources => prevResources.filter(r => r.id !== resourceId));
        } catch (error) {
            console.error("Error deleting resource", error);
        }
    };

  return {
    // Profile props
    profile,
    setProfile,
    isLoading,
    error,
    success,
    handleSubmit,
    // Reservations props
    filter,
    setFilter,
    reservations,
    loadingReservations,
    // Stats props
    stats,
    loadingStats,
    statsError,
    fetchStats,
    // Subscription props
    subscription,
    loadingSubscription,
    subscriptionError,
    // Chat props
    conversations,
    selectedConversation,
    setSelectedConversation,
    messages,
    loadingMessages,
    handleSendMessage,
    // Resources props
    resources,
    loadingResources,
    resourcesError,
    fetchResources,
    handleUploadResource,
    handleDeleteResource,
  };
};
