
import React from 'react';
import { Button } from "../../../components/Button";
import { UsageProgressBar } from './UsageProgressBar';
import { SubscriptionStatus } from '../hooks/usePaneldelUsuarioCliente';

interface SubscriptionStatusWidgetProps {
  subscription: SubscriptionStatus | null;
}

export const SubscriptionStatusWidget: React.FC<SubscriptionStatusWidgetProps> = ({ subscription }) => {
  if (!subscription) {
    return (
      <div className="bg-card border border-border p-6 rounded-lg shadow-lg text-center transition-all duration-300 hover:shadow-xl">
        <h3 className="text-lg font-semibold mb-4 text-text">No tienes ningún plan activo</h3>
        <p className="text-textSecondary mb-6">
          Explora nuestros planes para acceder a sesiones y gestionar tu bienestar.
        </p>
        <Button variant="primary">
          Ver Planes
        </Button>
      </div>
    );
  }

  const { planName, usedSessions, totalSessions, nextBillingDate, planType } = subscription;
  const remainingSessions = totalSessions - usedSessions;

  return (
    <div className="bg-card border border-border p-6 rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl">
      <h3 className="text-lg font-semibold mb-4 text-text">{planName}</h3>

      {planType === 'paquete' && (
        <div>
          <p className="text-textSecondary mb-2">
            {usedSessions} de {totalSessions} sesiones utilizadas
          </p>
          <UsageProgressBar current={usedSessions} total={totalSessions} />
          <p className="text-right text-sm text-textMuted mt-2">
            Te quedan {remainingSessions} sesiones
          </p>
        </div>
      )}

      {planType === 'suscripcion' && (
        <div className="text-center">
          <p className="text-textSecondary mb-4">
            Tu plan se renueva el: <span className="font-semibold text-text">{nextBillingDate}</span>
          </p>
        </div>
      )}

      <div className="mt-6 text-center">
        <Button variant="primary">
          {planType === 'paquete' ? 'Comprar más sesiones' : 'Gestionar suscripción'}
        </Button>
      </div>
    </div>
  );
};
