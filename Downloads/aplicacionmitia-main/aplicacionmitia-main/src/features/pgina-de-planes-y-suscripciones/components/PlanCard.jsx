import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/Button';

const PlanCard = ({ plan, billingCycle, isPopular }) => {
  const { id, name, price, features } = plan;
  const navigate = useNavigate();
  const [isRedirecting, setIsRedirecting] = useState(false);

  const handleSubscription = () => {
    setIsRedirecting(true);
    // TODO: Verificar si el usuario está autenticado.
    // Si no lo está, redirigir a /pgina-de-registrologin.
    // Ejemplo: if (!isAuthenticated) { navigate('/pgina-de-registrologin'); return; }

    console.log(`Redirigiendo al pago para el plan: ${id}`);
    navigate('/pgina-de-pago', { state: { planId: id } });
  };

  return (
    <div
      className={`bg-card rounded-lg p-6 flex flex-col shadow-lg transition-transform duration-300 hover:scale-105 ${
        isPopular ? 'border-2 border-accent' : 'border border-border'
      }`}
    >
      {isPopular && (
        <div className="bg-accent text-white text-xs font-bold rounded-full px-3 py-1 self-start mb-4">
          Más Popular
        </div>
      )}
      <h3 className="text-2xl font-bold text-text mb-2">{name}</h3>
      <div className="flex items-baseline mb-6">
        <span className="text-4xl font-extrabold text-text">
          ${billingCycle === 'monthly' ? price.monthly : price.annually}
        </span>
        <span className="text-lg text-textMuted ml-2">
          /{billingCycle === 'monthly' ? 'mes' : 'año'}
        </span>
      </div>
      <ul className="space-y-4 mb-8 flex-grow">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center">
            <svg
              className={`w-6 h-6 mr-3 ${
                feature.included ? 'text-success' : 'text-muted'
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {feature.included ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                ></path>
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              )}
            </svg>
            <span className="text-textSecondary">{feature.name}</span>
          </li>
        ))}
      </ul>
      <Button
        variant={isPopular ? 'primary' : 'secondary'}
        onClick={handleSubscription}
        disabled={isRedirecting}
      >
        {isRedirecting ? 'Redirigiendo...' : (isPopular ? 'Comenzar Ahora' : 'Suscribirse')}
      </Button>
    </div>
  );
};

export default PlanCard;
