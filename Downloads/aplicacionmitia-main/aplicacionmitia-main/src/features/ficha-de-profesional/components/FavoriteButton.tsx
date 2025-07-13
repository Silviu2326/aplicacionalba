import { useState, useEffect } from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { toggleFavoriteStatus } from '../api';

interface FavoriteButtonProps {
  professionalId: string;
  isInitiallyFavorite: boolean;
  onToggleFavorite: (isFavorite: boolean) => void;
}

const FavoriteButton = ({ professionalId, isInitiallyFavorite, onToggleFavorite }: FavoriteButtonProps) => {
  const [isFavorite, setIsFavorite] = useState(isInitiallyFavorite);
  const [isLoggedIn, ] = useState(true); // Mocked for now

  useEffect(() => {
    // Mock checking user authentication status
    // In a real app, you would use a proper auth context or hook
    // const user = checkUserAuthentication();
    // setIsLoggedIn(!!user);
  }, []);

  const handleToggleFavorite = async () => {
    if (!isLoggedIn) {
      // In a real app, you would show a login modal
      alert('Por favor, inicia sesión para guardar en favoritos.');
      return;
    }

    const newFavoriteStatus = !isFavorite;
    setIsFavorite(newFavoriteStatus); // Optimistic UI update

    try {
      await toggleFavoriteStatus(professionalId, newFavoriteStatus);
      onToggleFavorite(newFavoriteStatus);
      // In a real app, you would show a toast notification
      // toast.success(`Profesional ${newFavoriteStatus ? 'añadido a' : 'eliminado de'} favoritos`);
    } catch {
      setIsFavorite(!newFavoriteStatus); // Revert on error
      // In a real app, you would show an error toast
      // toast.error('Error al actualizar favoritos. Inténtalo de nuevo.');
    }
  };

  return (
    <div className="relative group">
      {/* Efecto de fondo animado */}
      <div className={`absolute inset-0 rounded-full blur transition-all duration-300 ${
        isFavorite 
          ? 'bg-gradient-to-r from-error/30 to-warning/30 opacity-50 scale-110' 
          : 'bg-gradient-to-r from-textMuted/20 to-border/20 opacity-0 group-hover:opacity-30 group-hover:scale-110'
      }`}></div>
      
      <button
        onClick={handleToggleFavorite}
        className={`relative p-4 rounded-full transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-card transform hover:scale-110 ${
          isFavorite 
            ? 'bg-gradient-to-r from-error/20 to-warning/20 backdrop-blur-sm border border-error/30 focus:ring-error shadow-lg' 
            : 'bg-gradient-to-r from-surface/80 to-card/80 backdrop-blur-sm border border-border/50 hover:border-primary/30 focus:ring-primary hover:shadow-lg'
        }`}
        aria-label={isFavorite ? 'Quitar de favoritos' : 'Guardar en favoritos'}
        title={isFavorite ? 'Quitar de favoritos' : 'Guardar en favoritos'}
      >
        {/* Icono con animación mejorada */}
        <div className="relative">
          {isFavorite ? (
            <>
              {/* Corazón lleno con efecto de pulso */}
              <FaHeart className="text-error w-6 h-6 animate-pulse" />
              {/* Partículas decorativas */}
              <div className="absolute -top-1 -right-1 w-2 h-2 bg-warning rounded-full animate-ping opacity-75"></div>
              <div className="absolute -bottom-1 -left-1 w-1.5 h-1.5 bg-error rounded-full animate-bounce opacity-60"></div>
            </>
          ) : (
            <>
              {/* Corazón vacío con hover effect */}
              <FaRegHeart className="text-textMuted group-hover:text-primary w-6 h-6 transition-colors duration-300" />
              {/* Efecto de brillo en hover */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></div>
            </>
          )}
        </div>
        
        {/* Tooltip mejorado */}
        <div className={`absolute -bottom-12 left-1/2 transform -translate-x-1/2 px-3 py-1.5 bg-backgroundSecondary/90 backdrop-blur-sm border border-border/50 rounded-lg text-xs font-medium text-text whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none z-10 ${
          isFavorite ? 'translate-y-1' : 'translate-y-2'
        }`}>
          {isFavorite ? 'Quitar de favoritos' : 'Guardar en favoritos'}
          {/* Flecha del tooltip */}
          <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-backgroundSecondary/90 border-l border-t border-border/50 rotate-45"></div>
        </div>
      </button>
    </div>
  );
};

export default FavoriteButton;
