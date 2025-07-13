// src/features/ficha-de-profesional/components/ReviewsSection.tsx
import React, { useState, useEffect } from 'react';
import RatingSummary from './RatingSummary';
import ReviewCard from './ReviewCard';
import { Button } from '@/components/Button';

// Mock data - In a real app, this would come from an API
const mockReviewsData = {
  reviewsSummary: {
    averageRating: 4.7,
    totalReviews: 125,
  },
  reviewsList: [
    { id: 1, rating: 5, comment: 'Excelente profesional, muy atento y empático. Me ha ayudado mucho en mi proceso.', clientName: 'Ana Pérez', date: '2023-06-15' },
    { id: 2, rating: 4, comment: 'Buena experiencia en general. El terapeuta es muy profesional, aunque a veces es difícil conseguir cita.', clientName: 'Carlos Gómez', date: '2023-06-10' },
    { id: 3, rating: 5, comment: 'Totalmente recomendado. Un espacio seguro y de confianza para abrirse y trabajar en uno mismo.', clientName: 'Lucía Fernández', date: '2023-05-28' },
    { id: 4, rating: 3, comment: 'La terapia online fue conveniente, pero prefiero las sesiones presenciales. El profesional es bueno.', clientName: 'Anónimo', date: '2023-05-12' },
    { id: 5, rating: 5, comment: 'Una de las mejores decisiones que he tomado. El enfoque del terapeuta es muy acertado y efectivo.', clientName: 'Javier Morales', date: '2023-04-30' },
  ],
};

const ReviewsSection: React.FC = () => {
  // In a real app, you would use a hook like useQuery to fetch data
  const [reviewsData] = useState(mockReviewsData);
  const [visibleReviews, setVisibleReviews] = useState(3);
  const [filter, setFilter] = useState<number | null>(null);

  const filteredReviews = reviewsData.reviewsList.filter(review => 
    filter ? review.rating === filter : true
  );

  const showMoreReviews = () => {
    setVisibleReviews(prev => prev + 3);
  };

  const handleFilterChange = (newFilter: number | null) => {
    setFilter(newFilter);
    setVisibleReviews(3); // Reset visible count on filter change
  };

  if (!reviewsData || reviewsData.reviewsList.length === 0) {
    return (
      <div className="bg-surface p-8 rounded-lg text-center border border-border">
        <h2 className="text-2xl font-bold text-text mb-4">Valoraciones</h2>
        <p className="text-textMuted">Este profesional todavía no tiene valoraciones. ¡Sé el primero!</p>
      </div>
    );
  }

  const { reviewsSummary } = reviewsData;

  return (
    <section className="w-full max-w-4xl mx-auto p-4 md:p-6 lg:p-8 bg-backgroundSecondary rounded-2xl shadow-2xl border border-borderLight">
      <header className="mb-8">
        <RatingSummary
          averageRating={reviewsSummary.averageRating}
          totalReviews={reviewsSummary.totalReviews}
        />
      </header>

      <div className="mb-6 flex flex-wrap items-center justify-center gap-2">
        <span className="text-textSecondary font-semibold mr-2">Filtrar por:</span>
        <Button onClick={() => handleFilterChange(null)} variant={filter === null ? 'primary' : 'secondary'}>Todas</Button>
        {Array.from({ length: 5 }, (_, i) => 5 - i).map(star => (
          <Button key={star} onClick={() => handleFilterChange(star)} variant={filter === star ? 'primary' : 'secondary'}>
            {star} ★
          </Button>
        ))}
      </div>

      <div className="space-y-6">
        {filteredReviews.slice(0, visibleReviews).map(review => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </div>

      {visibleReviews < filteredReviews.length && (
        <div className="text-center mt-8">
          <Button onClick={showMoreReviews} variant="primary" className="bg-primary hover:bg-primaryHover">
            Cargar más valoraciones
          </Button>
        </div>
      )}

      {filteredReviews.length === 0 && filter !== null && (
         <div className="text-center mt-8 text-textMuted">
            No hay valoraciones con {filter} estrellas.
         </div>
      )}
    </section>
  );
};

export default ReviewsSection;
