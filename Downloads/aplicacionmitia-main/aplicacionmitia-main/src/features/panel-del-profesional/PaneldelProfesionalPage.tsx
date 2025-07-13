import React, { useState } from 'react';
import { usePaneldelProfesional } from './hooks/usePaneldelProfesional';
import ProfileForm from './components/ProfileForm';
import AvailabilityCalendar from './components/AvailabilityCalendar';
import ReservationsTable from './components/ReservationsTable';
import StatsDashboard from './components/StatsDashboard';
import SubscriptionCard from './components/SubscriptionCard';
import DashboardSummaryWidget from './components/DashboardSummaryWidget';
import PayoutSettingsForm from './components/PayoutSettingsForm';
import SecureChatInterface from './components/SecureChatInterface';
import ClientRosterTable from './components/ClientRosterTable';
import ClientResourceSharer from './components/ClientResourceSharer';
import CancellationPolicyEditor from './components/CancellationPolicyEditor';
import { FaCalendarAlt, FaEnvelope, FaExclamationTriangle, FaUsers, FaTachometerAlt } from 'react-icons/fa';

type Tab = 'dashboard' | 'clientes';

const PaneldelProfesionalPage: React.FC = () => {
  const {
    profile,
    setProfile,
    isLoading,
    error,
    success,
    handleSubmit,
    filter,
    setFilter,
    reservations,
    loadingReservations,
    stats,
    loadingStats,
    statsError,
    fetchStats,
  } = usePaneldelProfesional();

  const [activeTab, setActiveTab] = useState<Tab>('dashboard');

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-backgroundSecondary to-surface">
      {/* Fondo decorativo con efectos glassmorphism */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-primary/20 to-accent/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-secondary/15 to-info/15 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-accent/10 to-warning/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        {/* Header modernizado con glassmorphism */}
        <header className="mb-8 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-surface/80 to-card/60 backdrop-blur-xl rounded-3xl border border-borderLight/50 shadow-2xl"></div>
          <div className="relative p-8">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-12 bg-gradient-primary rounded-full"></div>
                  <h1 className="text-4xl font-bold bg-gradient-to-r from-text via-primaryLight to-accent bg-clip-text text-transparent">
                    Panel del Profesional
                  </h1>
                </div>
                <p className="text-textSecondary text-lg ml-5">
                  Gestiona tu perfil, disponibilidad y sesiones desde un solo lugar
                </p>
                <div className="flex items-center space-x-4 ml-5 mt-4">
                  <div className="flex items-center space-x-2 text-sm text-textMuted">
                    <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                    <span>Sistema activo</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-textMuted">
                    <div className="w-2 h-2 bg-info rounded-full"></div>
                    <span>Última actualización: hace 2 min</span>
                  </div>
                </div>
              </div>
              <div className="hidden md:block">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-primary rounded-2xl blur opacity-50 animate-pulse"></div>
                  <div className="relative w-20 h-20 bg-gradient-primary rounded-2xl flex items-center justify-center shadow-xl transform hover:scale-105 transition-transform duration-300">
                    <FaTachometerAlt className="text-textInverse text-3xl" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Tabs modernizados */}
        <div className="mb-8">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-surface/70 to-card/50 backdrop-blur-xl rounded-2xl border border-borderLight/30 shadow-xl"></div>
            <div className="relative p-3">
              <nav className="flex space-x-3" aria-label="Tabs">
                <button
                  onClick={() => setActiveTab('dashboard')}
                  className={`group relative flex items-center px-6 py-4 rounded-xl font-semibold text-sm transition-all duration-300 transform hover:scale-105 ${
                    activeTab === 'dashboard'
                      ? 'bg-gradient-primary text-textInverse shadow-lg scale-105'
                      : 'text-textSecondary hover:text-text hover:bg-surface/50 backdrop-blur-sm'
                  }`}
                >
                  {activeTab === 'dashboard' && (
                    <div className="absolute inset-0 bg-gradient-primary rounded-xl blur opacity-50 animate-pulse"></div>
                  )}
                  <div className="relative flex items-center">
                    <FaTachometerAlt className="mr-3 text-lg" />
                    <span>Dashboard</span>
                  </div>
                  {activeTab === 'dashboard' && (
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-accent rounded-full animate-ping"></div>
                  )}
                </button>
                <button
                  onClick={() => setActiveTab('clientes')}
                  className={`group relative flex items-center px-6 py-4 rounded-xl font-semibold text-sm transition-all duration-300 transform hover:scale-105 ${
                    activeTab === 'clientes'
                      ? 'bg-gradient-primary text-textInverse shadow-lg scale-105'
                      : 'text-textSecondary hover:text-text hover:bg-surface/50 backdrop-blur-sm'
                  }`}
                >
                  {activeTab === 'clientes' && (
                    <div className="absolute inset-0 bg-gradient-primary rounded-xl blur opacity-50 animate-pulse"></div>
                  )}
                  <div className="relative flex items-center">
                    <FaUsers className="mr-3 text-lg" />
                    <span>Mis Clientes</span>
                  </div>
                  {activeTab === 'clientes' && (
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-accent rounded-full animate-ping"></div>
                  )}
                </button>
              </nav>
            </div>
          </div>
        </div>

        {activeTab === 'dashboard' && (
          <>
            {/* Widgets de Resumen modernizados */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              <div className="transform hover:scale-105 transition-all duration-300">
                <DashboardSummaryWidget
                  title="Próximas Citas"
                  count={5}
                  linkText="Ver calendario"
                  linkTo="/panel-profesional/calendario"
                  icon={<FaCalendarAlt size={32} />}
                  color="primary"
                />
              </div>
              <div className="transform hover:scale-105 transition-all duration-300">
                <DashboardSummaryWidget
                  title="Mensajes no Leídos"
                  count={12}
                  linkText="Ir a mensajes"
                  linkTo="/panel-profesional/mensajes"
                  icon={<FaEnvelope size={32} />}
                  color="secondary"
                />
              </div>
              <div className="transform hover:scale-105 transition-all duration-300">
                <DashboardSummaryWidget
                  title="Alertas Importantes"
                  count={2}
                  linkText="Revisar alertas"
                  linkTo="/panel-profesional/alertas"
                  icon={<FaExclamationTriangle size={32} />}
                  color="error"
                />
              </div>
            </div>

            {/* Notificaciones modernizadas */}
            {success && (
              <div className="relative mb-6 group">
                <div className="absolute inset-0 bg-gradient-to-r from-success/20 to-successLight/20 rounded-2xl blur-lg"></div>
                <div className="relative bg-gradient-to-r from-successLight/90 to-success/10 backdrop-blur-sm border border-success/30 text-successDark p-6 rounded-2xl shadow-xl flex items-center animate-in slide-in-from-top duration-500">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-success/20 rounded-full flex items-center justify-center">
                      <svg className="w-6 h-6 text-success" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                  <div className="ml-4">
                    <h4 className="font-semibold text-success">¡Éxito!</h4>
                    <p className="text-successDark">Perfil actualizado correctamente</p>
                  </div>
                </div>
              </div>
            )}
            {error && (
              <div className="relative mb-6 group">
                <div className="absolute inset-0 bg-gradient-to-r from-error/20 to-errorLight/20 rounded-2xl blur-lg"></div>
                <div className="relative bg-gradient-to-r from-errorLight/90 to-error/10 backdrop-blur-sm border border-error/30 text-errorDark p-6 rounded-2xl shadow-xl flex items-center animate-in slide-in-from-top duration-500">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-error/20 rounded-full flex items-center justify-center">
                      <svg className="w-6 h-6 text-error" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                  <div className="ml-4">
                    <h4 className="font-semibold text-error">Error</h4>
                    <p className="text-errorDark">{error}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Interfaz de Mensajería modernizada */}
            <div className="mb-8 relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-surface/80 to-card/60 backdrop-blur-xl rounded-3xl border border-borderLight/50 shadow-2xl"></div>
              <div className="relative p-8">
                <div className="flex items-center mb-6">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary rounded-xl blur opacity-50"></div>
                    <div className="relative w-12 h-12 bg-gradient-to-r from-primary to-secondary rounded-xl flex items-center justify-center">
                      <FaEnvelope className="text-textInverse text-xl" />
                    </div>
                  </div>
                  <div className="ml-4">
                    <h2 className="text-2xl font-bold bg-gradient-to-r from-text to-primaryLight bg-clip-text text-transparent">Mensajes Seguros</h2>
                    <p className="text-textSecondary text-sm">Comunicación cifrada con tus clientes</p>
                  </div>
                </div>
                <div className="bg-gradient-to-br from-backgroundSecondary/80 to-surface/60 backdrop-blur-sm rounded-2xl p-6 border border-borderLight/30">
                  <SecureChatInterface />
                </div>
              </div>
            </div>

            {/* Estadísticas modernizadas */}
            <div className="mb-8 relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-surface/80 to-card/60 backdrop-blur-xl rounded-3xl border border-borderLight/50 shadow-2xl"></div>
              <div className="relative p-8">
                <div className="flex items-center mb-6">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-info to-accent rounded-xl blur opacity-50"></div>
                    <div className="relative w-12 h-12 bg-gradient-to-r from-info to-accent rounded-xl flex items-center justify-center">
                      <svg className="w-6 h-6 text-textInverse" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
                      </svg>
                    </div>
                  </div>
                  <div className="ml-4">
                    <h2 className="text-2xl font-bold bg-gradient-to-r from-text to-infoLight bg-clip-text text-transparent">Estadísticas</h2>
                    <p className="text-textSecondary text-sm">Análisis de tu rendimiento profesional</p>
                  </div>
                </div>
                {loadingStats && (
                  <div className="flex items-center justify-center py-12">
                    <div className="relative">
                      <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary/30 border-t-primary"></div>
                      <div className="absolute inset-0 animate-ping rounded-full h-12 w-12 border-4 border-primary/20"></div>
                    </div>
                    <p className="ml-4 text-textSecondary font-medium">Cargando estadísticas...</p>
                  </div>
                )}
                {statsError && (
                  <div className="bg-gradient-to-r from-errorLight/20 to-error/10 border border-error/30 text-errorDark p-6 rounded-2xl backdrop-blur-sm">
                    <p className="font-medium">{statsError}</p>
                  </div>
                )}
                {!loadingStats && !statsError && (
                  <div className="bg-gradient-to-br from-backgroundSecondary/80 to-surface/60 backdrop-blur-sm rounded-2xl p-6 border border-borderLight/30">
                    <StatsDashboard stats={stats} onDateRangeChange={fetchStats} />
                  </div>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
              {/* Columna principal */}
              <div className="xl:col-span-3 space-y-8">
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-surface/80 to-card/60 backdrop-blur-xl rounded-3xl border border-borderLight/50 shadow-2xl"></div>
                  <div className="relative overflow-hidden rounded-3xl">
                    <ReservationsTable
                      reservations={reservations}
                      filter={filter}
                      setFilter={setFilter}
                      loading={loadingReservations}
                    />
                  </div>
                </div>
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-surface/80 to-card/60 backdrop-blur-xl rounded-3xl border border-borderLight/50 shadow-2xl"></div>
                  <div className="relative p-8">
                    <div className="flex items-center mb-6">
                      <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent rounded-xl blur opacity-50"></div>
                        <div className="relative w-12 h-12 bg-gradient-to-r from-primary to-accent rounded-xl flex items-center justify-center">
                          <FaCalendarAlt className="text-textInverse text-xl" />
                        </div>
                      </div>
                      <div className="ml-4">
                        <h2 className="text-2xl font-bold bg-gradient-to-r from-text to-primaryLight bg-clip-text text-transparent">Configurar Disponibilidad</h2>
                        <p className="text-textSecondary text-sm">Gestiona tus horarios disponibles</p>
                      </div>
                    </div>
                    <div className="bg-gradient-to-br from-backgroundSecondary/80 to-surface/60 backdrop-blur-sm rounded-2xl p-6 border border-borderLight/30">
                      <AvailabilityCalendar />
                    </div>
                  </div>
                </div>
              </div>

              {/* Columna lateral */}
              <div className="xl:col-span-1 space-y-6">
                <div className="relative group transform hover:scale-105 transition-all duration-300">
                  <div className="absolute inset-0 bg-gradient-to-r from-surface/80 to-card/60 backdrop-blur-xl rounded-2xl border border-borderLight/50 shadow-xl"></div>
                  <div className="relative overflow-hidden rounded-2xl">
                    <SubscriptionCard />
                  </div>
                </div>
                <div className="relative group transform hover:scale-105 transition-all duration-300">
                  <div className="absolute inset-0 bg-gradient-to-r from-surface/80 to-card/60 backdrop-blur-xl rounded-2xl border border-borderLight/50 shadow-xl"></div>
                  <div className="relative overflow-hidden rounded-2xl">
                    <PayoutSettingsForm />
                  </div>
                </div>
                <div className="relative group transform hover:scale-105 transition-all duration-300">
                  <div className="absolute inset-0 bg-gradient-to-r from-surface/80 to-card/60 backdrop-blur-xl rounded-2xl border border-borderLight/50 shadow-xl"></div>
                  <div className="relative overflow-hidden rounded-2xl">
                    <CancellationPolicyEditor />
                  </div>
                </div>
              </div>
            </div>

            {/* Formulario de perfil en sección separada */}
            <div className="mt-8 relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-surface/80 to-card/60 backdrop-blur-xl rounded-3xl border border-borderLight/50 shadow-2xl"></div>
              <div className="relative overflow-hidden rounded-3xl">
                <ProfileForm
                  profile={profile}
                  setProfile={setProfile}
                  onSubmit={handleSubmit}
                  isLoading={isLoading}
                />
              </div>
            </div>
          </>
        )}

        {activeTab === 'clientes' && (
          <div className="space-y-8 animate-in slide-in-from-right duration-500">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-surface/80 to-card/60 backdrop-blur-xl rounded-3xl border border-borderLight/50 shadow-2xl"></div>
              <div className="relative p-8">
                <div className="flex items-center mb-6">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-secondary to-success rounded-xl blur opacity-50"></div>
                    <div className="relative w-12 h-12 bg-gradient-to-r from-secondary to-success rounded-xl flex items-center justify-center">
                      <FaUsers className="text-textInverse text-xl" />
                    </div>
                  </div>
                  <div className="ml-4">
                    <h2 className="text-2xl font-bold bg-gradient-to-r from-text to-secondaryLight bg-clip-text text-transparent">Mis Clientes</h2>
                    <p className="text-textSecondary text-sm">Gestiona tu cartera de clientes</p>
                  </div>
                </div>
                <div className="bg-gradient-to-br from-backgroundSecondary/80 to-surface/60 backdrop-blur-sm rounded-2xl p-6 border border-borderLight/30">
                  <ClientRosterTable />
                </div>
              </div>
            </div>
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-surface/80 to-card/60 backdrop-blur-xl rounded-3xl border border-borderLight/50 shadow-2xl"></div>
              <div className="relative p-8">
                <div className="flex items-center mb-6">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-warning to-accent rounded-xl blur opacity-50"></div>
                    <div className="relative w-12 h-12 bg-gradient-to-r from-warning to-accent rounded-xl flex items-center justify-center">
                      <svg className="w-6 h-6 text-textInverse" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                  <div className="ml-4">
                    <h2 className="text-2xl font-bold bg-gradient-to-r from-text to-warningLight bg-clip-text text-transparent">Compartir Recursos</h2>
                    <p className="text-textSecondary text-sm">Comparte documentos y materiales con tus clientes</p>
                  </div>
                </div>
                <div className="bg-gradient-to-br from-backgroundSecondary/80 to-surface/60 backdrop-blur-sm rounded-2xl p-6 border border-borderLight/30">
                  <ClientResourceSharer />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaneldelProfesionalPage;
