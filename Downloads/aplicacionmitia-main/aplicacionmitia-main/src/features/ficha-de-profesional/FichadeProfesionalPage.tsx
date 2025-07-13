import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useFichadeProfesional } from './hooks/useFichadeProfesional';
import ProfileHeader from './components/ProfileHeader';
import ProfileDescription from './components/ProfileDescription';
import { ServiceList } from './components/ServiceList';
import LocationMap from './components/LocationMap';
import ServicePackageCard from './components/ServicePackageCard';
import ReviewsSection from './components/ReviewsSection';
import { BookingPanel } from './components/BookingPanel';
import ProfileVideoPlayer from './components/ProfileVideoPlayer';
import OnlineSessionLink from './components/OnlineSessionLink';
import { AvailabilityWidget } from './components/AvailabilityWidget';
import FavoriteButton from './components/FavoriteButton';
import CredentialBadge from './components/CredentialBadge';
import PublishedContentSection from './components/PublishedContentSection';

// Mock hook for authentication context - replace with your actual auth implementation
const useAuth = () => ({
  isAuthenticated: true,
  user: { id: 'user-123' },
  // Mock function to get user's confirmed appointment for a specific professional
  getConfirmedAppointment: (professionalId: string) => {
    // In a real app, this would be an API call
    if (professionalId === '1') {
      const appointmentDate = new Date();
      appointmentDate.setDate(appointmentDate.getDate() + 2); // 2 days from now
      return {
        date: appointmentDate.toISOString(),
        url: 'https://meet.example.com/session-12345',
      };
    }
    return null;
  },
});


const FichadeProfesionalPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const professionalId = id ?? '1';
  const { professional, loading, error } = useFichadeProfesional(professionalId);
  const { isAuthenticated, getConfirmedAppointment } = useAuth();
  const [isFavorite, setIsFavorite] = useState(false);

  // Check for a confirmed appointment
  const confirmedAppointment = isAuthenticated ? getConfirmedAppointment(professionalId) : null;

  const handleToggleFavorite = (newStatus: boolean) => {
    setIsFavorite(newStatus);
    console.log(`Professional ${professionalId} is now ${newStatus ? 'favorited' : 'unfavorited'}`);
    // Here you would typically call the API to update the favorite status
  };

  if (loading) {
    return <div className="text-center text-text p-8">Cargando perfil...</div>;
  }

  if (error) {
    return <div className="text-center text-error p-8">{error}</div>;
  }

  if (!professional) {
    return <div className="text-center text-text p-8">No se encontró el profesional.</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-backgroundSecondary to-surface">
      {/* Hero Section con gradiente */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-primary opacity-10"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/20 via-transparent to-transparent"></div>
        
        <div className="container mx-auto px-4 py-8 relative z-10">
          <div className="flex flex-col lg:flex-row gap-8 xl:gap-12">
            {/* Columna Principal */}
            <main className="w-full lg:w-2/3 space-y-8">
              {/* Header Section con diseño mejorado */}
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-surface rounded-3xl blur-xl opacity-30 transform scale-105"></div>
                <div className="relative bg-card/80 backdrop-blur-sm border border-borderLight/50 rounded-3xl p-8 shadow-2xl">
                  <div className="flex items-start justify-between mb-6">
                    <ProfileHeader
                      fullName={professional.fullName}
                      profilePictureUrl={professional.profilePictureUrl}
                      specialties={professional.specialties}
                      title={professional.title}
                    />
                    <div className="ml-4">
                      <FavoriteButton
                        professionalId={professional.id}
                        isInitiallyFavorite={isFavorite}
                        onToggleFavorite={handleToggleFavorite}
                      />
                    </div>
                  </div>
                  
                  {/* Credentials con diseño mejorado */}
                  <div className="flex flex-wrap gap-3 pt-6 border-t border-border/30">
                    {professional.credentials.map((credential) => (
                      <CredentialBadge key={credential.name} credential={credential} />
                    ))}
                  </div>
                </div>
              </div>

              {/* Video Section */}
              {professional.videoIntroductionUrl && (
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-secondary rounded-2xl blur-xl opacity-20 transform scale-105"></div>
                  <div className="relative">
                    <ProfileVideoPlayer
                      videoUrl={professional.videoIntroductionUrl}
                      thumbnailUrl={professional.profilePictureUrl}
                    />
                  </div>
                </div>
              )}

              {/* Content Sections con espaciado mejorado */}
              <div className="space-y-8">
                <ProfileDescription aboutMe={professional.aboutMe} />
                <ServiceList services={professional.services} />

                {/* Published Content Section */}
                {professional.publications && professional.publications.length > 0 && (
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-info/10 to-accent/10 rounded-2xl blur-xl"></div>
                    <div className="relative">
                      <PublishedContentSection publications={professional.publications} />
                    </div>
                  </div>
                )}

                {/* Packages Section con diseño mejorado */}
                {professional.packages && professional.packages.length > 0 && (
                  <section className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-accent/10 to-warning/10 rounded-2xl blur-xl"></div>
                    <div className="relative bg-card/60 backdrop-blur-sm border border-borderLight/30 rounded-2xl p-8">
                      <div className="flex items-center gap-3 mb-8">
                        <div className="w-2 h-8 bg-gradient-to-b from-accent to-warning rounded-full"></div>
                        <h2 className="text-3xl font-bold bg-gradient-to-r from-accent to-warning bg-clip-text text-transparent">
                          Paquetes y Descuentos
                        </h2>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {professional.packages.map((pkg) => (
                          <ServicePackageCard key={pkg.id} packageInfo={pkg} />
                        ))}
                      </div>
                    </div>
                  </section>
                )}

                <ReviewsSection />
                
                {/* Location Section */}
                {professional.location && (
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-success/10 to-secondary/10 rounded-2xl blur-xl"></div>
                    <div className="relative bg-card/60 backdrop-blur-sm border border-borderLight/30 rounded-2xl p-8">
                      <div className="flex items-center gap-3 mb-6">
                        <div className="w-2 h-6 bg-gradient-to-b from-success to-secondary rounded-full"></div>
                        <h2 className="text-2xl font-bold text-text">Ubicación</h2>
                      </div>
                      <LocationMap location={professional.location} />
                    </div>
                  </div>
                )}
              </div>
            </main>

            {/* Columna Lateral con diseño sticky mejorado */}
            <aside className="w-full lg:w-1/3">
              <div className="sticky top-8 space-y-6">
                {confirmedAppointment ? (
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-success/20 to-secondary/20 rounded-2xl blur-xl"></div>
                    <div className="relative">
                      <OnlineSessionLink appointment={confirmedAppointment} />
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-primary rounded-2xl blur-xl opacity-20"></div>
                      <div className="relative">
                        <AvailabilityWidget />
                      </div>
                    </div>
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-secondary rounded-2xl blur-xl opacity-20"></div>
                      <div className="relative">
                        <BookingPanel professionalId={professional.id} price={professional.basePrice} />
                      </div>
                    </div>
                  </>
                )}
              </div>
            </aside>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FichadeProfesionalPage;
