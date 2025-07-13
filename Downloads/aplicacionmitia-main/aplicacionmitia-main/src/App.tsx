import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import ImpersonationModeBanner from './features/backoffice-de-administracin/components/ImpersonationModeBanner';
import { checkAuth } from './features/pgina-de-registrologin/api';

// Import all page components
import HomepublicaPage from './features/home-pblica/HomepublicaPage';
import PaginadeRegistroLoginPage from './features/pgina-de-registrologin/PaginadeRegistroLoginPage';
import PaginadeBusquedaPage from './features/pgina-de-bsqueda/PaginadeBusquedaPage';
import FichadeProfesionalPage from './features/ficha-de-profesional/FichadeProfesionalPage';
import PaginadeReservaPage from './features/pgina-de-reserva/PaginadeReservaPage';
import PaginadePagoPage from './features/pgina-de-pago/PaginadePagoPage';
import PaginadeValoracionPage from './features/pgina-de-valoracin/PaginadeValoracionPage';
import PaneldelUsuarioClientePage from './features/panel-del-usuario-cliente/PaneldelUsuarioClientePage';
import PaneldelProfesionalPage from './features/panel-del-profesional/PaneldelProfesionalPage';
import PaginadePlanesySuscripcionesPage from './features/pgina-de-planes-y-suscripciones/PaginadePlanesySuscripcionesPage';
import BackofficedeAdministracionPage from './features/backoffice-de-administracin/BackofficedeAdministracionPage';
import PaginadeInstalacioncomoPWAPage from './features/pgina-de-instalacin-como-pwa/PaginadeInstalacioncomoPWAPage';
import { PaginadeSoporteAyudaPage } from './features/pgina-de-soporte--ayuda/PaginadeSoporteAyudaPage';
import PaginadeConfiguraciondeCuentaPage from './features/pgina-de-configuracin-de-cuenta/PaginadeConfiguraciondeCuentaPage';
import PaginapruebaPage from './features/pagina-prueba/paginapruebaPage';

function App() {
  const [impersonatingUser, setImpersonatingUser] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [userType, setUserType] = useState<string | null>(null);

  // Verificar autenticación al cargar la app
  useEffect(() => {
    const checkAuthentication = async () => {
      const token = localStorage.getItem('authToken') || sessionStorage.getItem('authToken');
      if (token) {
        try {
          const authResult = await checkAuth(token);
          setIsAuthenticated(authResult.isAuthenticated);
          setUserType(authResult.userType);
        } catch (error) {
          console.error('Error checking authentication:', error);
          setIsAuthenticated(false);
          // Limpiar tokens inválidos
          localStorage.removeItem('authToken');
          sessionStorage.removeItem('authToken');
        }
      } else {
        setIsAuthenticated(false);
      }
      setIsLoading(false);
    };

    checkAuthentication();

    // Escuchar cambios en el storage para detectar nuevos logins
    const handleStorageChange = () => {
      checkAuthentication();
    };

    window.addEventListener('storage', handleStorageChange);
    
    // También escuchar un evento personalizado para cambios en la misma pestaña
    const handleAuthChange = () => {
      checkAuthentication();
    };
    
    window.addEventListener('authChange', handleAuthChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('authChange', handleAuthChange);
    };
  }, []);

  const handleStartImpersonation = (userName: string) => {
    setImpersonatingUser(userName);
  };

  const handleEndImpersonation = () => {
    setImpersonatingUser(null);
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    sessionStorage.removeItem('authToken');
    setIsAuthenticated(false);
    setUserType(null);
    // Disparar evento para notificar cambio de autenticación
    window.dispatchEvent(new Event('authChange'));
  };

  // Mostrar loading mientras se verifica la autenticación
  if (isLoading) {
    return (
      <div className="flex h-screen bg-background text-text items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-textSecondary">Verificando autenticación...</p>
        </div>
      </div>
    );
  }

  // Si no está autenticado, mostrar solo la página de login
  if (!isAuthenticated) {
    return (
      <Router>
        <div className="min-h-screen bg-background text-text">
          <PaginadeRegistroLoginPage />
        </div>
      </Router>
    );
  }

  // Si está autenticado, mostrar la aplicación completa
  return (
    <Router>
      <div className="flex h-screen bg-background text-text">
        <Sidebar onLogout={handleLogout} userType={userType} />
        <main className="flex-1 overflow-y-auto p-8">
          <Routes>
            <Route path="/" element={<HomepublicaPage />} />
            <Route path="/search" element={<PaginadeBusquedaPage />} />
            <Route path="/professional/:id" element={<FichadeProfesionalPage />} />
            <Route path="/booking/:professionalId" element={<PaginadeReservaPage />} />
            <Route path="/payment/:bookingId" element={<PaginadePagoPage />} />
            <Route path="/valoracion" element={<PaginadeValoracionPage />} />
            <Route path="/panel-usuario" element={<PaneldelUsuarioClientePage />} />
            <Route path="/panel-profesional" element={<PaneldelProfesionalPage />} />
            <Route path="/planes-suscripciones" element={<PaginadePlanesySuscripcionesPage />} />
            <Route path="/admin/*" element={<BackofficedeAdministracionPage onImpersonate={handleStartImpersonation} />} />
            <Route path="/instalar-pwa" element={<PaginadeInstalacioncomoPWAPage />} />
            <Route path="/soporte" element={<PaginadeSoporteAyudaPage />} />
            <Route path="/configuracion-cuenta" element={<PaginadeConfiguraciondeCuentaPage />} />
            <Route path="/pagina-prueba" element={<PaginapruebaPage />} />
          </Routes>
        </main>
        {impersonatingUser && (
          <ImpersonationModeBanner
            impersonatedUser={impersonatingUser}
            onEndImpersonation={handleEndImpersonation}
          />
        )}
      </div>
    </Router>
  );
}

export default App;