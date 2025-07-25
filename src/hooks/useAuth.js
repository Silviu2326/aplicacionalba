import { useEffect } from 'react';
import { useAuthStore } from '../app/store';

/**
 * Hook personalizado para manejo de autenticación
 * Proporciona acceso a estado y métodos de autenticación
 */
export const useAuth = () => {
  const {
    user,
    token,
    isAuthenticated,
    loading,
    error,
    login,
    logout,
    updateUser,
    clearError,
    initialize
  } = useAuthStore();

  // Inicializar autenticación desde localStorage al montar el componente
  useEffect(() => {
    initialize();
  }, [initialize]);

  // Auto-logout cuando el token expira (opcional)
  useEffect(() => {
    if (token) {
      try {
        // TODO: Verificar si el token está expirado
        // const payload = JSON.parse(atob(token.split('.')[1]));
        // const isExpired = payload.exp * 1000 < Date.now();
        // if (isExpired) {
        //   logout();
        // }
      } catch (error) {
        console.error('Error verificando token:', error);
        logout();
      }
    }
  }, [token, logout]);

  const handleLogin = async (credentials) => {
    try {
      await login(credentials);
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        error: error.message || 'Error durante el login' 
      };
    }
  };

  const handleLogout = () => {
    logout();
    // Opcional: redirigir a login
    window.location.href = '/login';
  };

  const handleUpdateProfile = async (profileData) => {
    try {
      // TODO: Llamar a la API para actualizar el perfil
      // await updateProfile(profileData);
      updateUser(profileData);
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        error: error.message || 'Error actualizando perfil' 
      };
    }
  };

  return {
    // Estado
    user,
    token,
    isAuthenticated,
    loading,
    error,
    
    // Métodos
    login: handleLogin,
    logout: handleLogout,
    updateProfile: handleUpdateProfile,
    clearError,
    
    // Utilidades
    isAdmin: user?.role === 'admin',
    isTrainer: user?.role === 'trainer',
    hasPermission: (permission) => {
      // TODO: Implementar sistema de permisos
      return true;
    }
  };
};

export default useAuth;