// src/features/pgina-de-instalacin-como-pwa/hooks/usePáginadeInstalacióncomoPWA.ts
import { useState, useEffect } from 'react';
import { applyInstallationReward } from '../api';

// Definimos los roles que el hook puede devolver
type Role = 'professional' | 'client' | 'guest';

export const usePaginadeInstalacioncomoPWA = () => {
  const [isRewardApplied, setIsRewardApplied] = useState(false);
  const [canInstall, setCanInstall] = useState(false);
  // Estado para almacenar el rol del usuario. Por defecto es 'guest'.
  const [role, setRole] = useState<Role>('guest'); 

  useEffect(() => {
    // --- Simulación de Detección de Rol ---
    // En una aplicación real, aquí llamarías a tu contexto de autenticación
    // o a una API para obtener el rol del usuario logueado.
    const fetchUserRole = () => {
      // Por ejemplo, podrías leer de localStorage, un contexto de React, etc.
      const storedUserRole = 'professional'; // Cambia a 'client' o 'guest' para probar
      setRole(storedUserRole as Role);
    };

    fetchUserRole();
    // --- Fin de la Simulación ---

    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setCanInstall(true);
    };

    const handleAppInstalled = async () => {
      try {
        await applyInstallationReward();
        setIsRewardApplied(true);
        console.log('PWA installed, reward applied.');
      } catch (error) {
        console.error('Failed to apply installation reward:', error);
      }
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const showInstallPrompt = () => {
    // Lógica para mostrar el prompt de instalación
  };

  return {
    isRewardApplied,
    canInstall,
    showInstallPrompt,
    role, // Devolvemos el rol detectado
    isPWAInstalled: window.matchMedia('(display-mode: standalone)').matches,
  };
};
