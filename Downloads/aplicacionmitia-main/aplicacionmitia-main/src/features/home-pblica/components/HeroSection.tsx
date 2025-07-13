import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../../components/Button';

const HeroSection: React.FC = () => {
  const navigate = useNavigate();

  const handleSearchClick = () => {
    navigate('/search');
  };

  const handleRegisterClick = () => {
    navigate('/auth');
  };

  return (
    <section className="bg-background text-text">
      <div className="container mx-auto flex flex-col items-center px-4 py-16 text-center md:py-32 md:px-10 lg:px-32 xl:max-w-3xl">
        <h1 className="text-4xl font-bold leading-none sm:text-5xl">
          Encuentra tu Bienestar: Terapia Accesible y Confiable
        </h1>
        <p className="px-8 mt-8 mb-12 text-base md:text-lg">
          Conecta con profesionales de la salud mental de forma segura y confidencial. En TheraFlow, te ayudamos a encontrar el apoyo que necesitas, cuando lo necesitas.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button
            onClick={handleSearchClick}
            variant="primary"
          >
            Buscar profesionales
          </Button>
          <Button
            onClick={handleRegisterClick}
            variant="secondary"
          >
            Regístrate
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
