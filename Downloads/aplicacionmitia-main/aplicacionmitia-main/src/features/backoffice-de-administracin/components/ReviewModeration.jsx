import React, { useState } from 'react';
import ReviewCard from './ReviewCard';
import useBackofficedeAdministracion from '../hooks/useBackofficedeAdministracion';

const ReviewModeration = () => {
  const { pendingReviews, approveReview, deleteReview, isLoading, error } = useBackofficedeAdministracion();
  
  if (isLoading) {
    return <div className="text-center p-4 text-textMuted">Cargando valoraciones pendientes...</div>;
  }

  if (error) {
    return <div className="text-center p-4 text-error">Error al cargar las valoraciones: {error}</div>;
  }

  return (
    <div className="p-6 bg-surface rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-text border-b border-border pb-2">Moderación de Valoraciones</h2>
      {pendingReviews.length === 0 ? (
        <p className="text-textMuted">No hay valoraciones pendientes de moderación.</p>
      ) : (
        <div className="space-y-4">
          {pendingReviews.map((review) => (
            <ReviewCard
              key={review.id}
              review={review}
              onApprove={approveReview}
              onDelete={deleteReview}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ReviewModeration;
