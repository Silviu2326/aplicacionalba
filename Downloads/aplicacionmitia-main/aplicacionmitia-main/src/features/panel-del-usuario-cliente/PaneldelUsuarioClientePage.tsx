import React, { useState, useRef, useEffect } from 'react';
import { usePaneldelUsuarioCliente, Professional } from './hooks/usePaneldelUsuarioCliente';
import { BookingHistory } from './components/BookingHistory';
import FavoritesList from './components/FavoritesList';
import { ProfileEditor } from './components/ProfileEditor';
import PaymentMethods from './components/PaymentMethods';
import ConversationsList from './components/ConversationsList';
import { SecureChatInterface } from './components/SecureChatInterface';
import SharedResourcesSection from './components/SharedResourcesSection';
import { PrivateJournal } from './components/PrivateJournal';
import { SubscriptionStatusWidget } from './components/SubscriptionStatusWidget';
import { InvoiceHistory } from './components/InvoiceHistory';
import { MyReviewsPanel } from './components/MyReviewsPanel';
import { EmergencyResourcesWidget } from './components/EmergencyResourcesWidget';
import { NotificationCenterPanel } from './components/NotificationCenterPanel';
import { FaBell, FaUser, FaCalendarAlt, FaHeart, FaStar, FaShieldAlt, FaCreditCard, FaFolder, FaBook, FaComments, FaExclamationTriangle } from 'react-icons/fa';
import { Notification } from './components/NotificationItem';
import SessionSummaryModal from './components/SessionSummaryModal';
import { getBookingHistory, Booking } from './api';
import SecuritySettings from './components/SecuritySettings';

const mockProfessionals: Professional[] = [
  { id: 'prof-1', name: 'Dra. Isabel Morales', avatar: 'https://randomuser.me/api/portraits/women/60.jpg' },
  { id: 'prof-2', name: 'Dr. Ricardo Castillo', avatar: 'https://randomuser.me/api/portraits/men/75.jpg' },
];

const PaneldelUsuarioClientePage: React.FC = () => {
  const { 
    user, 
    isLoading,
    messages,
    isSendingMessage,
    activeConversation,
    selectConversation,
    sendMessage,
    sharedResources,
    isLoadingResources,
    subscriptionStatus,
    invoices,
    isLoadingInvoices,
    downloadInvoice,
    notifications,
    markNotificationAsRead,
    markAllNotificationsAsRead,
    isSummaryModalOpen,
    selectedSummary,
    isLoadingSummary,
    viewSummary,
    closeSummaryModal,
  } = usePaneldelUsuarioCliente();
  const [activeTab, setActiveTab] = useState('profile');
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const notificationsRef = useRef<HTMLDivElement>(null);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoadingBookings, setIsLoadingBookings] = useState(true);

  useEffect(() => {
    if (activeTab === 'bookings') {
      setIsLoadingBookings(true);
      getBookingHistory()
        .then(data => setBookings(data))
        .catch(err => console.error("Failed to fetch bookings", err))
        .finally(() => setIsLoadingBookings(false));
    }
  }, [activeTab]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const handleSelectConversation = (professional: Professional) => {
    selectConversation(professional);
    setActiveTab('messages'); 
  };

  const handleNotificationClick = (notification: Notification) => {
    markNotificationAsRead(notification.id);
    // NOTE: navigation to notification.link should be implemented here
    // For example, using react-router-dom's useNavigate hook
    console.log(`Navegando a: ${notification.link}`);
    setIsNotificationsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notificationsRef.current && !notificationsRef.current.contains(event.target as Node)) {
        setIsNotificationsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const renderContent = () => {
    switch (activeTab) {
      case 'profile':
        return <ProfileEditor />;
      case 'bookings':
        return <BookingHistory 
                  bookings={bookings} 
                  isLoading={isLoadingBookings} 
                  onViewSummary={viewSummary} 
               />;
      case 'favorites':
        return <FavoritesList />;
      case 'reviews':
        return <MyReviewsPanel />;
      case 'security':
        return <SecuritySettings />;
      case 'billing':
        return (
          <div>
            <PaymentMethods />
            <div className="mt-8">
              {isLoadingInvoices ? (
                <div className="flex justify-center items-center h-40">
                  <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12"></div>
                </div>
              ) : (
                <InvoiceHistory invoices={invoices} onDownloadInvoice={downloadInvoice} />
              )}
            </div>
          </div>
        );
      case 'resources':
        return <SharedResourcesSection resources={sharedResources} isLoading={isLoadingResources} />;
      case 'journal':
        return <PrivateJournal />;
      case 'emergency':
        return <EmergencyResourcesWidget />;
      case 'messages':
        if (activeConversation) {
          return (
            <SecureChatInterface
              professional={activeConversation}
              messages={messages}
              onSendMessage={sendMessage}
              onGoBack={() => selectConversation(null)}
              isSending={isSendingMessage}
            />
          );
        }
        return (
          <ConversationsList
            professionals={mockProfessionals}
            onSelectConversation={handleSelectConversation}
            activeConversationId={activeConversation?.id}
          />
        );
      default:
        return <ProfileEditor />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-backgroundSecondary to-surface text-text relative overflow-hidden">
      {/* Elementos decorativos de fondo */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-gradient-to-r from-accent/5 to-info/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-0 w-64 h-64 bg-gradient-to-r from-success/5 to-warning/5 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        {/* Header ultra moderno */}
        <header className="mb-8 relative">
          <div className="bg-gradient-to-r from-surface/80 via-card/80 to-surface/80 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-borderLight/50 relative overflow-hidden">
            {/* Efectos de brillo */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent"></div>
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-secondary to-accent"></div>
            
            <div className="relative z-10 flex justify-between items-center">
              <div className="flex items-center space-x-6">
                <div className="relative">
                  <div className="w-20 h-20 bg-gradient-to-br from-primary to-primaryDark rounded-3xl flex items-center justify-center shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-500">
                    <FaUser className="h-10 w-10 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-success to-successDark rounded-full border-2 border-background animate-pulse"></div>
                </div>
                <div>
                  <h1 className="text-5xl font-black bg-gradient-to-r from-text via-primary to-secondary bg-clip-text text-transparent mb-2">
                    Panel del Cliente
                  </h1>
                  {user && (
                    <p className="text-textMuted text-xl font-medium flex items-center">
                      <span className="mr-2">👋</span>
                      ¡Bienvenido de vuelta, <span className="text-primary font-bold ml-1">{user.name}</span>!
                    </p>
                  )}
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                {/* Indicador de estado */}
                <div className="hidden md:flex items-center space-x-2 bg-success/10 border border-success/20 rounded-full px-4 py-2">
                  <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                  <span className="text-success text-sm font-medium">En línea</span>
                </div>
                
                {/* Botón de notificaciones mejorado */}
                <div className="relative" ref={notificationsRef}>
                  <button 
                    onClick={() => setIsNotificationsOpen(prev => !prev)}
                    className="relative p-4 rounded-2xl bg-gradient-to-r from-surface to-card hover:from-card hover:to-surface border border-borderLight hover:border-primary/50 transition-all duration-300 transform hover:scale-110 shadow-xl hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-primary/20 group"
                  >
                    <FaBell className="h-6 w-6 text-textSecondary group-hover:text-primary transition-all duration-300 group-hover:animate-bounce" />
                    {unreadCount > 0 && (
                      <span className="absolute -top-2 -right-2 flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-r from-error to-errorDark text-white text-xs font-bold ring-4 ring-background shadow-lg animate-pulse">
                        {unreadCount > 9 ? '9+' : unreadCount}
                      </span>
                    )}
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary/0 to-primary/0 group-hover:from-primary/10 group-hover:to-secondary/10 transition-all duration-300"></div>
                  </button>
                  {isNotificationsOpen && (
                    <NotificationCenterPanel
                      notifications={notifications}
                      onNotificationClick={handleNotificationClick}
                      onMarkAllAsRead={markAllNotificationsAsRead}
                      onClose={() => setIsNotificationsOpen(false)}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Loading state mejorado */}
        {isLoading && !activeConversation && (
          <div className="flex items-center justify-center min-h-[500px]">
            <div className="text-center relative">
              <div className="relative">
                <div className="animate-spin rounded-full h-20 w-20 border-4 border-primary/20 border-t-primary mx-auto mb-6"></div>
                <div className="absolute inset-0 rounded-full h-20 w-20 border-4 border-transparent border-r-secondary animate-spin mx-auto" style={{animationDirection: 'reverse', animationDuration: '1.5s'}}></div>
              </div>
              <div className="space-y-2">
                <p className="text-text text-xl font-semibold">Cargando tu panel...</p>
                <p className="text-textMuted">Preparando tu experiencia personalizada</p>
              </div>
              <div className="mt-6 flex justify-center space-x-1">
                <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-secondary rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                <div className="w-2 h-2 bg-accent rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
              </div>
            </div>
          </div>
        )}

        {!isLoading && user && (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              <div className="lg:col-span-1">
                {/* Navegación móvil mejorada */}
                <div className="sm:hidden mb-8">
                  <div className="relative">
                    <label htmlFor="tabs" className="sr-only">
                      Seleccionar sección
                    </label>
                    <select
                      id="tabs"
                      name="tabs"
                      className="block w-full focus:ring-4 focus:ring-primary/20 focus:border-primary border-borderLight rounded-2xl bg-gradient-to-r from-surface to-card text-text shadow-xl p-4 font-semibold text-lg appearance-none cursor-pointer hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02]"
                      onChange={(e) => setActiveTab(e.target.value)}
                      value={activeTab}
                    >
                      <option value="profile">👤 Mi Perfil</option>
                      <option value="bookings">📅 Historial de Reservas</option>
                      <option value="favorites">❤️ Mis Favoritos</option>
                      <option value="reviews">⭐ Mis Valoraciones</option>
                      <option value="security">🛡️ Seguridad</option>
                      <option value="billing">💳 Facturación y Pagos</option>
                      <option value="resources">📁 Mis Recursos</option>
                      <option value="journal">📖 Mi Diario</option>
                      <option value="messages">💬 Mensajes</option>
                      <option value="emergency">🚨 Ayuda Urgente</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                      <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </div>
                {/* Desktop Navigation Ultra Moderno */}
                <div className="hidden sm:block">
                  <div className="bg-gradient-to-br from-surface/90 via-card/90 to-surface/90 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-borderLight/50 relative overflow-hidden">
                    {/* Efectos decorativos */}
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-secondary to-accent"></div>
                    <div className="absolute -top-10 -right-10 w-20 h-20 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-full blur-xl"></div>
                    
                    <div className="relative z-10">
                      <h3 className="text-2xl font-black text-text mb-8 flex items-center">
                        <div className="w-12 h-12 bg-gradient-to-br from-primary to-primaryDark rounded-2xl flex items-center justify-center mr-4 shadow-lg transform rotate-3 hover:rotate-0 transition-transform duration-500">
                          <FaUser className="h-6 w-6 text-white" />
                        </div>
                        <span className="bg-gradient-to-r from-text to-primary bg-clip-text text-transparent">
                          Navegación
                        </span>
                      </h3>
                      
                      <nav className="flex flex-col space-y-3" aria-label="Navegación principal">
                        {[
                          { id: 'profile', icon: FaUser, label: 'Mi Perfil', color: 'text-primary' },
                          { id: 'bookings', icon: FaCalendarAlt, label: 'Historial de Reservas', color: 'text-secondary' },
                          { id: 'favorites', icon: FaHeart, label: 'Mis Favoritos', color: 'text-error' },
                          { id: 'reviews', icon: FaStar, label: 'Mis Valoraciones', color: 'text-accent' },
                          { id: 'security', icon: FaShieldAlt, label: 'Seguridad', color: 'text-info' },
                          { id: 'billing', icon: FaCreditCard, label: 'Facturación y Pagos', color: 'text-success' },
                          { id: 'resources', icon: FaFolder, label: 'Mis Recursos', color: 'text-warning' },
                          { id: 'journal', icon: FaBook, label: 'Mi Diario', color: 'text-secondary' },
                          { id: 'messages', icon: FaComments, label: 'Mensajes', color: 'text-primary' },
                          { id: 'emergency', icon: FaExclamationTriangle, label: 'Ayuda Urgente', color: 'text-error' }
                        ].map((item, index) => {
                          const IconComponent = item.icon;
                          const isActive = activeTab === item.id;
                          const isEmergency = item.id === 'emergency';
                          
                          return (
                            <button
                              key={item.id}
                              onClick={() => {
                                if (item.id === 'messages') {
                                  setActiveTab('messages');
                                  selectConversation(null);
                                } else {
                                  setActiveTab(item.id);
                                }
                              }}
                              className={`group flex items-center p-5 rounded-2xl text-left transition-all duration-500 relative overflow-hidden transform hover:scale-[1.02] ${
                                isActive
                                  ? 'bg-gradient-to-r from-primary/20 to-secondary/20 text-primary shadow-xl border-2 border-primary/30 scale-[1.03] z-10'
                                  : isEmergency
                                  ? 'text-error hover:bg-gradient-to-r hover:from-error/10 hover:to-errorDark/10 hover:shadow-lg border-2 border-error/30 hover:border-error'
                                  : 'text-textMuted hover:text-text hover:bg-gradient-to-r hover:from-card/70 hover:to-surface/70 hover:shadow-lg border border-transparent hover:border-borderLight'
                              }`}
                              style={{animationDelay: `${index * 0.1}s`}}
                            >
                              {/* Efecto de brillo en hover */}
                              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                              
                              <div className="relative z-10 flex items-center w-full">
                                <div className={`mr-5 p-3 rounded-xl transition-all duration-500 ${
                                  isActive 
                                    ? 'bg-primary/30 transform rotate-6 scale-110 shadow-lg' 
                                    : 'bg-surface/50 group-hover:bg-primary/20 group-hover:transform group-hover:rotate-3 group-hover:scale-105'
                                }`}>
                                  <IconComponent className={`h-5 w-5 transition-colors duration-300 ${
                                    isActive ? 'text-primary' : `${item.color} group-hover:text-primary`
                                  } ${isEmergency && !isActive ? 'animate-pulse' : ''}`} />
                                </div>
                                <span className="font-bold text-lg flex-1">{item.label}</span>
                                
                                {isActive && (
                                  <div className="flex items-center space-x-2">
                                    <div className="w-3 h-3 bg-primary rounded-full animate-pulse shadow-lg"></div>
                                    <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                                  </div>
                                )}
                              </div>
                              
                              {/* Indicador lateral activo */}
                              {isActive && (
                                <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-primary to-secondary rounded-r-full"></div>
                              )}
                            </button>
                          );
                        })}
                      </nav>
                    </div>
                  </div>
                </div>
                {/* Widget de estado de suscripción mejorado */}
                <div className="mt-8">
                  <div className="bg-gradient-to-br from-surface/80 via-card/80 to-surface/80 backdrop-blur-xl rounded-3xl p-6 shadow-2xl border border-borderLight/50 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-success via-primary to-accent"></div>
                    <div className="absolute -top-6 -right-6 w-12 h-12 bg-gradient-to-r from-success/20 to-primary/20 rounded-full blur-lg"></div>
                    <div className="relative z-10">
                      <SubscriptionStatusWidget subscription={subscriptionStatus} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Contenido principal ultra moderno */}
              <main className="lg:col-span-3">
                <div className="bg-gradient-to-br from-surface/90 via-card/90 to-surface/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-borderLight/50 min-h-[700px] relative overflow-hidden">
                  {/* Efectos decorativos del contenido */}
                  <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary via-secondary to-accent"></div>
                  <div className="absolute -top-8 -left-8 w-16 h-16 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-full blur-xl"></div>
                  <div className="absolute -bottom-8 -right-8 w-20 h-20 bg-gradient-to-r from-accent/10 to-info/10 rounded-full blur-xl"></div>
                  
                  <div className="relative z-10 p-8 h-full">
                    <div className="h-full flex flex-col">
                      {renderContent()}
                    </div>
                  </div>
                </div>
              </main>
            </div>
          </>
        )}
      </div>
      {/* Modal de resumen de sesión mejorado */}
      <div className="relative z-50">
        <SessionSummaryModal
          isOpen={isSummaryModalOpen}
          onClose={closeSummaryModal}
          summary={
            selectedSummary
              ? {
                  content: selectedSummary.content,
                  date: selectedSummary.sessionDate,
                  therapistName: selectedSummary.therapistName,
                }
              : null
          }
        />
      </div>
      
      {isLoadingSummary && (
        <div className="fixed inset-0 bg-overlay flex items-center justify-center z-50">
          <div className="text-center relative">
            <div className="relative">
              <div className="animate-spin rounded-full h-20 w-20 border-4 border-primary/20 border-t-primary mx-auto mb-6"></div>
              <div className="absolute inset-0 rounded-full h-20 w-20 border-4 border-transparent border-r-secondary animate-spin mx-auto" style={{animationDirection: 'reverse', animationDuration: '1.5s'}}></div>
            </div>
            <div className="space-y-2">
              <p className="text-text text-xl font-semibold">Cargando resumen de sesión...</p>
              <p className="text-textMuted">Preparando tu información</p>
            </div>
          </div>
        </div>
      )}
      
      {/* Elementos decorativos adicionales */}
      <div className="fixed bottom-8 right-8 pointer-events-none">
        <div className="w-4 h-4 bg-primary/20 rounded-full animate-ping"></div>
      </div>
      <div className="fixed top-1/4 right-8 pointer-events-none">
        <div className="w-2 h-2 bg-secondary/30 rounded-full animate-pulse"></div>
      </div>
      <div className="fixed bottom-1/4 left-8 pointer-events-none">
        <div className="w-3 h-3 bg-accent/25 rounded-full animate-bounce"></div>
      </div>
    </div>
  );
};

export default PaneldelUsuarioClientePage;
