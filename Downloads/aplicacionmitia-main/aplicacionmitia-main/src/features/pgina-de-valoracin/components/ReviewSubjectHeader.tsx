
import React from 'react';
import { Link } from 'react-router-dom';

interface ReviewSubjectHeaderProps {
  professional: {
    id: string;
    name: string;
    imageUrl: string;
  };
  session: {
    date: string;
    time: string;
  };
  isLoading: boolean;
  error: string | null;
}

const ReviewSubjectHeader: React.FC<ReviewSubjectHeaderProps> = ({
  professional,
  session,
  isLoading,
  error,
}) => {
  if (isLoading) {
    return (
      <div className="flex animate-pulse items-center space-x-4 rounded-lg bg-backgroundSecondary p-4">
        <div className="h-16 w-16 rounded-full bg-surface"></div>
        <div className="flex-1 space-y-2 py-1">
          <div className="h-4 w-3/4 rounded bg-surface"></div>
          <div className="h-3 w-1/2 rounded bg-surface"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div
        className="rounded-lg border border-error bg-errorLight p-4 text-error"
        role="alert"
      >
        <p className="font-bold">Error</p>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-lg bg-surface shadow-md">
      <div className="p-4 sm:flex sm:items-center sm:space-x-4">
        <div className="flex-shrink-0">
          <img
            className="mx-auto h-20 w-20 rounded-full object-cover"
            src={professional.imageUrl}
            alt={`Foto de perfil de ${professional.name}`}
          />
        </div>
        <div className="mt-3 text-center sm:mt-0 sm:flex-1 sm:text-left">
          <p className="text-sm font-medium text-textSecondary">
            Estás valorando a:
          </p>
          <h2 className="text-xl font-bold text-text">
            {professional.name}
          </h2>
          <p className="mt-1 text-sm text-textSecondary">
            Sesión del {session.date} a las {session.time}
          </p>
          <div className="mt-2">
            <Link
              to={`/professional/${professional.id}`}
              className="text-sm font-semibold text-primary hover:text-primaryHover"
            >
              Ver perfil del profesional &rarr;
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewSubjectHeader;
