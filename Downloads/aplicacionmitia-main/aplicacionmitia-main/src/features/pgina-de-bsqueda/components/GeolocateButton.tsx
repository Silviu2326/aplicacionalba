
import React, { useState } from 'react';

interface GeolocationButtonProps {
  onGeolocationSuccess: (coords: { latitude: number; longitude: number }) => void;
  onGeolocationError: (error: GeolocationPositionError) => void;
}

const GeolocateButton: React.FC<GeolocationButtonProps> = ({
  onGeolocationSuccess,
  onGeolocationError,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleGeolocation = () => {
    if (navigator.geolocation) {
      setIsLoading(true);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          onGeolocationSuccess({ latitude, longitude });
          setIsLoading(false);
        },
        (error) => {
          onGeolocationError(error);
          setIsLoading(false);
        }
      );
    } else {
      alert('La geolocalización no es compatible con este navegador.');
    }
  };

  return (
    <button
      onClick={handleGeolocation}
      disabled={isLoading}
      className="bg-primary hover:bg-primaryHover text-textInverse font-bold py-2 px-4 rounded-lg shadow-md transition-all duration-300 ease-in-out flex items-center justify-center disabled:bg-disabled disabled:cursor-not-allowed"
    >
      {isLoading ? (
        <svg
          className="animate-spin -ml-1 mr-3 h-5 w-5 text-textInverse"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 mr-2"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
      )}
      {isLoading ? 'Buscando...' : 'Usar mi ubicación'}
    </button>
  );
};

export default GeolocateButton;
