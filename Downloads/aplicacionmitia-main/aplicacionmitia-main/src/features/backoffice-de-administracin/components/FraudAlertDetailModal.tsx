import React from 'react';
import AdminUserProfileView from './AdminUserProfileView';
import { FraudAlert } from '../types';
import { Button } from '../../../components/Button';

interface FraudAlertDetailModalProps {
  alert: FraudAlert | null;
  isOpen: boolean;
  onClose: () => void;
  onAssign: (alertId: string) => void;
  onResolve: (alertId: string) => void;
  onIgnore: (alertId: string) => void;
  onSuspendUser: (userId: string) => void;
}

const FraudAlertDetailModal: React.FC<FraudAlertDetailModalProps> = ({
  alert,
  isOpen,
  onClose,
  onAssign,
  onResolve,
  onIgnore,
  onSuspendUser,
}) => {
  if (!isOpen || !alert) {
    return null;
  }

  const riskColorClasses = {
    Alto: 'text-error',
    Medio: 'text-warning',
    Bajo: 'text-success',
  };

  return (
    <div className="fixed inset-0 bg-overlay flex items-center justify-center z-50">
      <div className="bg-card rounded-lg shadow-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-text">Detalle de Alerta de Fraude</h2>
          <button onClick={onClose} className="text-textMuted hover:text-text">&times;</button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 bg-surface p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-textSecondary mb-2">Información de la Alerta</h3>
            <p><strong>ID:</strong> {alert.id}</p>
            <p><strong>Tipo:</strong> {alert.type}</p>
            <p><strong>Nivel de Riesgo:</strong> <span className={riskColorClasses[alert.riskLevel]}>{alert.riskLevel} ({alert.riskScore})</span></p>
            <p><strong>Estado:</strong> {alert.status}</p>
            <p><strong>Fecha:</strong> {new Date(alert.timestamp).toLocaleString()}</p>
            <p className="mt-4"><strong>Detalles:</strong></p>
            <p className="text-textMuted bg-background p-3 rounded-md">{alert.details}</p>
          </div>

          <div className="bg-surface p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-textSecondary mb-2">Acciones Rápidas</h3>
            <div className="flex flex-col space-y-2">
              <Button onClick={() => onAssign(alert.id)} variant="secondary">Asignarme Tarea</Button>
              <Button onClick={() => onResolve(alert.id)} variant="success">Marcar como Resuelta</Button>
              <Button onClick={() => onIgnore(alert.id)} variant="muted">Ignorar Alerta</Button>
              <Button onClick={() => onSuspendUser(alert.userId)} variant="danger">Suspender Usuario</Button>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <h3 className="text-xl font-semibold text-textSecondary mb-3">Perfil del Usuario Implicado</h3>
          {/* AdminUserProfileView needs a userId prop */}
          <AdminUserProfileView userId={alert.userId} />
        </div>
      </div>
    </div>
  );
};

export default FraudAlertDetailModal;