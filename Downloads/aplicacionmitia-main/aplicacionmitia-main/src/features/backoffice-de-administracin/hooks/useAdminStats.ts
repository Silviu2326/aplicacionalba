import { useBackofficedeAdministracion } from './useBackofficedeAdministracion';

export const useAdminStats = () => {
  const { stats, isLoading, error } = useBackofficedeAdministracion();
  
  return {
    data: stats,
    loading: isLoading,
    error
  };
};