import React from 'react';
import { UserReviewCard } from './UserReviewCard';
import { usePaneldelUsuarioCliente } from '../hooks/usePaneldelUsuarioCliente';

export const MyReviewsPanel = () => {
  const { reviews, isLoading, error } = usePaneldelUsuarioCliente();

  if (isLoading) {
    return <div className="text-textSecondary">Cargando valoraciones...</div>;
  }

  if (error) {
    return <div className="text-error">Error al cargar las valoraciones: {error}</div>;
  }

  return (
    <div className="bg-card border border-border shadow-lg rounded-lg p-6 transition-all duration-300 hover:shadow-xl">
      <h2 className="text-2xl font-bold mb-4 text-text">Mis Valoraciones</h2>
      {reviews.length > 0 ? (
        <div className="space-y-4">
          {reviews.map((review) => (
            <UserReviewCard key={review.id} review={review} />
          ))}
        </div>
      ) : (
        <p className="text-textSecondary">
          Aún no has escrito ninguna valoración. Después de tu próxima sesión, podrás compartir tu
          experiencia.
        </p>
      )}
    </div>
  );
};
