
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../../components/Button'; 
import { startFreeTrial } from '../api';

// Assumption: A custom hook `useAuth` exists for checking authentication status.
// This is a placeholder implementation.
const useAuth = () => ({
  isAuthenticated: false, // Default to false to simulate a new user
  user: { id: 'user-123' } // Mock user data
});

const FreeTrialCard = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const handleStartTrial = async () => {
    if (!isAuthenticated) {
      // If user is not authenticated, redirect to login/register page.
      // The destination page should handle redirection back to plans after auth.
      navigate('/auth'); 
    } else {
      try {
        // If authenticated, call the API to start the trial period.
        await startFreeTrial();
        // On success, redirect to the professional's dashboard.
        navigate('/panel-del-profesional');
      } catch (error) {
        console.error('Error starting free trial:', error);
        // Optional: Show an error message to the user.
        alert('Hubo un error al iniciar tu prueba gratuita. Por favor, intenta de nuevo.');
      }
    }
  };

  return (
    <div className="bg-gradient-to-r from-primary to-accent border border-border rounded-lg p-8 mb-12 text-center shadow-lg">
      <h2 className="text-3xl font-bold text-textInverse mb-3">Prueba Premium, Gratis por 14 Días</h2>
      <p className="text-textInverse opacity-90 mb-6 max-w-2xl mx-auto">
        Explora todas las funcionalidades de nuestro plan Premium sin compromiso. No se requiere tarjeta de crédito.
      </p>
      <div className="flex justify-center">
        <Button
          onClick={handleStartTrial}
          variant="secondary"
          className="bg-surface hover:bg-card text-text font-bold py-3 px-8 rounded-full transition-transform transform hover:scale-105 shadow-md"
        >
          Comenzar Prueba Gratuita
        </Button>
      </div>
    </div>
  );
};

export default FreeTrialCard;
