import React from 'react';
import { Link } from 'react-router-dom';
import { usePaneldelUsuarioCliente } from '../hooks/usePaneldelUsuarioCliente';
import FavoriteCard from './FavoriteCard';
import { FaHeart, FaSearch, FaPlus } from 'react-icons/fa';

const FavoritesList: React.FC = () => {
  const { favorites, deleteFavorite } = usePaneldelUsuarioCliente();

  if (!favorites || favorites.length === 0) {
    return (
      <div className="relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-primary opacity-5 rounded-full -translate-y-16 translate-x-16"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-secondary opacity-5 rounded-full translate-y-12 -translate-x-12"></div>
        
        <div className="relative z-10 bg-gradient-surface rounded-2xl p-12 text-center shadow-xl border border-borderLight">
          <div className="w-20 h-20 bg-gradient-to-r from-error to-errorDark rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
            <FaHeart className="h-10 w-10 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-text mb-4">No tienes favoritos aún</h3>
          <p className="text-textMuted mb-8 text-lg leading-relaxed max-w-md mx-auto">
            Guarda a tus profesionales preferidos para acceder rápidamente a sus perfiles y servicios.
          </p>
          <Link 
            to="/search" 
            className="inline-flex items-center space-x-3 bg-gradient-primary hover:bg-gradient-to-r hover:from-primary hover:to-primaryDark text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            <FaSearch className="h-5 w-5" />
            <span>Encuentra Profesionales</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-primary opacity-5 rounded-full -translate-y-20 translate-x-20"></div>
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-secondary opacity-5 rounded-full translate-y-16 -translate-x-16"></div>
      
      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-r from-error to-errorDark rounded-xl flex items-center justify-center shadow-lg">
              <FaHeart className="h-6 w-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-text">Mis Favoritos</h2>
              <p className="text-textMuted">{favorites.length} profesional{favorites.length !== 1 ? 'es' : ''} guardado{favorites.length !== 1 ? 's' : ''}</p>
            </div>
          </div>
          <Link 
            to="/search" 
            className="flex items-center space-x-2 bg-gradient-primary hover:bg-gradient-to-r hover:from-primary hover:to-primaryDark text-white px-6 py-3 rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            <FaPlus className="h-4 w-4" />
            <span>Agregar Más</span>
          </Link>
        </div>
        
        {/* Favorites Grid */}
        <div className="grid gap-6">
          {favorites?.map((favorite) => (
            <div key={favorite.id} className="transform transition-all duration-300 hover:scale-[1.02]">
              <FavoriteCard
                id={favorite.id}
                name={favorite.name}
                photo={favorite.photo}
                specialty={favorite.specialty}
                isOnline={favorite.isOnline}
                onDelete={deleteFavorite}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FavoritesList;
