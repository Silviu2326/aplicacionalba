import React, { useState, useEffect } from 'react';
import { Button } from '../../../../components/Button'; // Ajusta la ruta si es necesario

// Mock de la API, reemplazar con la llamada real en api.ts
const getCurrentSubscription = async () => {
  // Simula una llamada a la API
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        planId: 'plan_profesional',
        name: 'Profesional',
        status: 'active',
        nextBillingDate: '2025-08-12',
      });
    }, 500);
  });
};

// Mock de datos de planes, esto debería venir de una fuente de datos o API
const plans = [
  {
    id: 'plan_basico',
    name: 'Básico',
    price: '$10/mes',
    features: ['Perfil público', 'Gestión de 10 clientes', 'Soporte por email'],
  },
  {
    id: 'plan_profesional',
    name: 'Profesional',
    price: '$25/mes',
    features: ['Perfil destacado', 'Clientes ilimitados', 'Soporte prioritario', 'Estadísticas avanzadas'],
  },
  {
    id: 'plan_premium',
    name: 'Premium',
    price: '$50/mes',
    features: ['Todo lo de Profesional', 'Publicaciones en el blog', 'Webinar mensual', 'Consultoría 1-a-1'],
  },
];

const SubscriptionManagement = () => {
  const [currentSubscription, setCurrentSubscription] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);

  useEffect(() => {
    const fetchSubscription = async () => {
      setIsLoading(true);
      try {
        const subscription = await getCurrentSubscription();
        setCurrentSubscription(subscription);
      } catch (error) {
        console.error("Error al obtener la suscripción:", error);
        // Manejar el error, por ejemplo, mostrando un mensaje al usuario
      } finally {
        setIsLoading(false);
      }
    };

    fetchSubscription();
  }, []);

  const handlePlanChangeClick = (plan) => {
    setSelectedPlan(plan);
    setShowConfirmationModal(true);
  };

  const handleConfirmPlanChange = () => {
    // Lógica para llamar a la API y cambiar el plan (PUT /api/v1/subscriptions)
    console.log(`Cambiando al plan: ${selectedPlan.name}`);
    // Aquí iría la llamada a la API, por ejemplo:
    // changeSubscription(selectedPlan.id).then(...)
    setShowConfirmationModal(false);
    // Simular actualización de la UI
    setCurrentSubscription({
        ...currentSubscription,
        planId: selectedPlan.id,
        name: selectedPlan.name,
    });
  };

  const handleCancelSubscription = () => {
    // Lógica para el flujo de cancelación
    console.log("Iniciando flujo de cancelación de suscripción.");
    // Podría mostrar otro modal o redirigir a una página de retención
  }

  if (isLoading) {
    return <div className="text-center p-8 text-textSecondary">Cargando tu información de suscripción...</div>;
  }

  return (
    <div className="p-6 bg-backgroundSecondary rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold text-text mb-4">Gestiona tu Suscripción</h2>
      {currentSubscription ? (
         <p className="text-textMuted mb-8">
            Tu plan actual es <span className="font-semibold text-primary">{currentSubscription.name}</span>.
            Tu próxima fecha de facturación es el {new Date(currentSubscription.nextBillingDate).toLocaleDateString()}.
        </p>
      ) : (
        <p className="text-textMuted mb-8">No tienes una suscripción activa. Elige un plan para empezar.</p>
      )}

      <div className="grid md:grid-cols-3 gap-8">
        {plans.map((plan) => {
          const isCurrentPlan = plan.id === currentSubscription?.planId;
          return (
            <div
              key={plan.id}
              className={`p-6 rounded-lg border-2 ${
                isCurrentPlan ? 'border-primary shadow-primary/20 shadow-xl' : 'border-border'
              } bg-card flex flex-col`}
            >
              <h3 className="text-2xl font-bold text-accent mb-4">{plan.name}</h3>
              <p className="text-4xl font-extrabold text-text mb-6">{plan.price}</p>
              <ul className="space-y-2 text-textSecondary flex-grow mb-6">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <svg className="w-5 h-5 text-success mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                    {feature}
                  </li>
                ))}
              </ul>
              <Button
                onClick={() => handlePlanChangeClick(plan)}
                disabled={isCurrentPlan}
                variant={isCurrentPlan ? 'secondary' : 'primary'}
              >
                {isCurrentPlan ? 'Plan Actual' : 'Cambiar a este Plan'}
              </Button>
            </div>
          );
        })}
      </div>
      
      <div className="mt-12 text-center">
          <Button variant="danger" onClick={handleCancelSubscription}>
              Cancelar Suscripción
          </Button>
          <p className="text-xs text-textMuted mt-2">La cancelación será efectiva al final de tu ciclo de facturación.</p>
      </div>

      {showConfirmationModal && selectedPlan && (
        <div className="fixed inset-0 bg-overlay flex items-center justify-center z-50">
          <div className="bg-surface p-8 rounded-lg shadow-2xl max-w-md w-full">
            <h3 className="text-2xl font-bold text-text mb-4">Confirmar Cambio de Plan</h3>
            <p className="text-textSecondary mb-6">
              Estás a punto de cambiar a nuestro plan <span className="font-semibold text-accent">{selectedPlan.name}</span>.
            </p>
            <div className="bg-backgroundSecondary p-4 rounded-md mb-6">
                <p className="text-sm text-textMuted">Se realizará un cargo prorrateado y tu nuevo ciclo de facturación comenzará hoy.</p>
                {/* Aquí se podría mostrar un desglose del costo */}
            </div>
            <div className="flex justify-end gap-4">
              <Button variant="secondary" onClick={() => setShowConfirmationModal(false)}>
                Cancelar
              </Button>
              <Button variant="primary" onClick={handleConfirmPlanChange}>
                Confirmar Cambio
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SubscriptionManagement;
