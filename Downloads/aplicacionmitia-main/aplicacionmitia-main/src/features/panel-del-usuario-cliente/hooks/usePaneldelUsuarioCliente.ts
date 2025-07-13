import { useState, useEffect, useCallback } from 'react';
import { 
  getUserProfile, 
  updateUserProfile,
  getPaymentMethods,
  deletePaymentMethod,
  addPaymentMethod,
  setDefaultPaymentMethod,
  getMessages,
  sendMessage,
  getSharedResources,
  getJournalEntries,
  createJournalEntry,
  updateJournalEntry,
  deleteJournalEntry,
  getSubscriptionStatus,
  getInvoices,
  downloadInvoice,
  getMyReviews,
  updateReview,
  deleteReview,
  getEmergencyContacts,
  addEmergencyContact,
  updateEmergencyContact,
  deleteEmergencyContact,
  getNotifications,
  markNotificationAsRead as apiMarkNotificationAsRead,
  markAllNotificationsAsRead as apiMarkAllNotificationsAsRead,
  getSessionSummary,
  PaymentMethod,
  UserProfile,
  Message,
  SharedResource,
  JournalEntry,
  SubscriptionStatus,
  Invoice,
  Review,
  EmergencyContact,
  SessionSummary,
} from '../api';
import { Notification } from '../components/NotificationItem';

export interface Professional {
    id: string;
    name: string;
    avatar: string;
}

export const usePaneldelUsuarioCliente = () => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [sharedResources, setSharedResources] = useState<SharedResource[]>([]);
  const [journalEntries, setJournalEntries] = useState<JournalEntry[]>([]);
  const [subscriptionStatus, setSubscriptionStatus] = useState<SubscriptionStatus | null>(null);
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [emergencyContacts, setEmergencyContacts] = useState<EmergencyContact[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isSendingMessage, setIsSendingMessage] = useState(false);
  const [activeConversation, setActiveConversation] = useState<Professional | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingResources, setIsLoadingResources] = useState(true);
  const [isLoadingJournal, setIsLoadingJournal] = useState(true);
  const [isLoadingInvoices, setIsLoadingInvoices] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const [isSummaryModalOpen, setIsSummaryModalOpen] = useState(false);
  const [selectedSummary, setSelectedSummary] = useState<SessionSummary | null>(null);
  const [isLoadingSummary, setIsLoadingSummary] = useState(false);

  useEffect(() => {
    const fetchInitialData = async () => {
      setIsLoading(true);
      try {
        const [
          profileData, 
          paymentMethodsData, 
          resourcesData, 
          journalData, 
          subscriptionStatusData,
          invoicesData,
          reviewsData,
          emergencyContactsData,
          notificationsData,
        ] = await Promise.all([
          getUserProfile(),
          getPaymentMethods(),
          getSharedResources(),
          getJournalEntries(),
          getSubscriptionStatus(),
          getInvoices(),
          getMyReviews(),
          getEmergencyContacts(),
          getNotifications(),
        ]);
        setUser(profileData);
        setPaymentMethods(paymentMethodsData);
        setSharedResources(resourcesData);
        setJournalEntries(journalData);
        setSubscriptionStatus(subscriptionStatusData);
        setInvoices(invoicesData);
        setReviews(reviewsData);
        setEmergencyContacts(emergencyContactsData);
        setNotifications(notificationsData);
      } catch {
        setError('Error al cargar los datos del usuario.');
      } finally {
        setIsLoading(false);
        setIsLoadingResources(false);
        setIsLoadingJournal(false);
        setIsLoadingInvoices(false);
      }
    };

    fetchInitialData();
  }, []);

  const handleViewSummary = useCallback(async (summaryId: string) => {
    setIsLoadingSummary(true);
    setIsSummaryModalOpen(true);
    try {
      const summaryData = await getSessionSummary(summaryId);
      setSelectedSummary(summaryData);
    } catch {
      setError('Error al cargar el resumen de la sesión.');
      setIsSummaryModalOpen(false);
    } finally {
      setIsLoadingSummary(false);
    }
  }, []);

  const handleCloseSummaryModal = () => {
    setIsSummaryModalOpen(false);
    setSelectedSummary(null);
  };

  const fetchMessages = useCallback(async (professionalId: string) => {
    setIsLoading(true);
    try {
      const messageHistory = await getMessages(professionalId);
      setMessages(messageHistory);
    } catch {
      setError('Error al cargar los mensajes.');
    } finally {
      setIsLoading(false);
    }
  }, []);
  
  // ... (rest of the functions from the original file)
  
  const handleSelectConversation = useCallback((professional: Professional | null) => {
    setActiveConversation(professional);
    if (professional) {
      fetchMessages(professional.id);
    } else {
      setMessages([]);
    }
  }, [fetchMessages]);

  const handleSendMessage = async (professionalId: string, messageText: string) => {
    setIsSendingMessage(true);
    const optimisticMessage: Message = {
      id: `temp-${Date.now()}`,
      text: messageText,
      sender: 'user',
      timestamp: new Date().toISOString(),
      status: 'sending',
    };
    setMessages(prev => [...prev, optimisticMessage]);

    try {
      const sentMessage = await sendMessage(professionalId, messageText);
      setMessages(prev => prev.map(msg => msg.id === optimisticMessage.id ? sentMessage : msg));
    } catch {
      setError('Error al enviar el mensaje.');
      setMessages(prev => prev.filter(msg => msg.id !== optimisticMessage.id));
    } finally {
      setIsSendingMessage(false);
    }
  };

  const handleUpdateProfile = async (profileData: Partial<UserProfile>) => {
    if (!user) return;

    setIsLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const updatedUser = await updateUserProfile(user.id, profileData);
      setUser(updatedUser);
      setSuccess('Perfil actualizado con éxito.');
    } catch {
      setError('Error al actualizar el perfil. Inténtalo de nuevo.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSetDefaultPaymentMethod = useCallback(async (methodId: string) => {
    setIsLoading(true);
    try {
      await setDefaultPaymentMethod(methodId);
      setPaymentMethods(prev => 
        prev.map(method => ({
          ...method,
          isDefault: method.id === methodId
        }))
      );
    } catch {
      setError('Error al establecer el método de pago predeterminado.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleAddPaymentMethod = useCallback(async (methodData: Omit<PaymentMethod, 'id'>) => {
    setIsLoading(true);
    try {
      const newMethod = await addPaymentMethod(methodData);
      setPaymentMethods(prev => [...prev, newMethod]);
      if (newMethod.isDefault) {
        await handleSetDefaultPaymentMethod(newMethod.id);
      }
    } catch {
      setError('Error al añadir el método de pago.');
    } finally {
      setIsLoading(false);
    }
  }, [handleSetDefaultPaymentMethod]);

  const handleDeletePaymentMethod = useCallback(async (methodId: string) => {
    setIsLoading(true);
    try {
      await deletePaymentMethod(methodId);
      setPaymentMethods(prev => prev.filter(method => method.id !== methodId));
    } catch {
      setError('Error al eliminar el método de pago.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleCreateJournalEntry = useCallback(async (entryData: Omit<JournalEntry, 'id' | 'date'>) => {
    setIsLoadingJournal(true);
    try {
      const newEntry = await createJournalEntry(entryData);
      setJournalEntries(prev => [newEntry, ...prev]);
    } catch {
      setError('Error al crear la entrada del diario.');
    } finally {
      setIsLoadingJournal(false);
    }
  }, []);

  const handleUpdateJournalEntry = useCallback(async (entryId: string, entryData: Partial<JournalEntry>) => {
    setIsLoadingJournal(true);
    try {
      const updatedEntry = await updateJournalEntry(entryId, entryData);
      setJournalEntries(prev => prev.map(entry => entry.id === entryId ? updatedEntry : entry));
    } catch {
      setError('Error al actualizar la entrada del diario.');
    } finally {
      setIsLoadingJournal(false);
    }
  }, []);

  const handleDeleteJournalEntry = useCallback(async (entryId: string) => {
    setIsLoadingJournal(true);
    try {
      await deleteJournalEntry(entryId);
      setJournalEntries(prev => prev.filter(entry => entry.id !== entryId));
    } catch {
      setError('Error al eliminar la entrada del diario.');
    } finally {
      setIsLoadingJournal(false);
    }
  }, []);

  const handleDownloadInvoice = async (invoiceId: string) => {
    try {
      await downloadInvoice(invoiceId);
    } catch {
      setError('Error al descargar la factura.');
    }
  };

  const handleUpdateReview = async (reviewId: string, data: { rating: number; comment: string }) => {
    setIsLoading(true);
    try {
      const updatedReview = await updateReview(reviewId, data);
      setReviews(prev => prev.map(r => r.id === reviewId ? updatedReview : r));
    } catch {
      setError('Error al actualizar la valoración.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteReview = async (reviewId: string) => {
    setIsLoading(true);
    try {
      await deleteReview(reviewId);
      setReviews(prev => prev.filter(r => r.id !== reviewId));
    } catch {
      setError('Error al eliminar la valoración.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddEmergencyContact = async (contactData: Omit<EmergencyContact, 'id'>) => {
    setIsLoading(true);
    try {
      const newContact = await addEmergencyContact(contactData);
      setEmergencyContacts(prev => [...prev, newContact]);
    } catch {
      setError('Error al añadir el contacto de emergencia.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateEmergencyContact = async (contactId: string, contactData: Partial<EmergencyContact>) => {
    setIsLoading(true);
    try {
      const updatedContact = await updateEmergencyContact(contactId, contactData);
      setEmergencyContacts(prev => prev.map(c => c.id === contactId ? updatedContact : c));
    } catch {
      setError('Error al actualizar el contacto de emergencia.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteEmergencyContact = async (contactId: string) => {
    setIsLoading(true);
    try {
      await deleteEmergencyContact(contactId);
      setEmergencyContacts(prev => prev.filter(c => c.id !== contactId));
    } catch {
      setError('Error al eliminar el contacto de emergencia.');
    } finally {
      setIsLoading(false);
    }
  };

  const markNotificationAsRead = useCallback(async (notificationId: string) => {
    setNotifications(prev =>
      prev.map(n => (n.id === notificationId ? { ...n, read: true } : n))
    );
    try {
      await apiMarkNotificationAsRead(notificationId);
    } catch (error) {
      setError('Error al marcar la notificación como leída.');
      setNotifications(prev =>
        prev.map(n => (n.id === notificationId ? { ...n, read: false } : n))
      );
    }
  }, []);

  const markAllNotificationsAsRead = useCallback(async () => {
    const originalNotifications = [...notifications];
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    try {
      await apiMarkAllNotificationsAsRead();
    } catch (error) {
      setError('Error al marcar todas las notificaciones como leídas.');
      setNotifications(originalNotifications);
    }
  }, [notifications]);

  return {
    user,
    paymentMethods,
    messages,
    sharedResources,
    journalEntries,
    subscriptionStatus,
    invoices,
    reviews,
    emergencyContacts,
    notifications,
    isLoadingInvoices,
    isLoadingJournal,
    isLoadingResources,
    isSendingMessage,
    activeConversation,
    isLoading,
    error,
    success,
    updateProfile: handleUpdateProfile,
    addPaymentMethod: handleAddPaymentMethod,
    deletePaymentMethod: handleDeletePaymentMethod,
    setDefaultPaymentMethod: handleSetDefaultPaymentMethod,
    selectConversation: handleSelectConversation,
    sendMessage: handleSendMessage,
    createJournalEntry: handleCreateJournalEntry,
    updateJournalEntry: handleUpdateJournalEntry,
    deleteJournalEntry: handleDeleteJournalEntry,
    downloadInvoice: handleDownloadInvoice,
    updateReview: handleUpdateReview,
    deleteReview: handleDeleteReview,
    addEmergencyContact: handleAddEmergencyContact,
    updateEmergencyContact: handleUpdateEmergencyContact,
    deleteEmergencyContact: handleDeleteEmergencyContact,
    markNotificationAsRead,
    markAllNotificationsAsRead,
    isSummaryModalOpen,
    selectedSummary,
    isLoadingSummary,
    viewSummary: handleViewSummary,
    closeSummaryModal: handleCloseSummaryModal,
  };
};
