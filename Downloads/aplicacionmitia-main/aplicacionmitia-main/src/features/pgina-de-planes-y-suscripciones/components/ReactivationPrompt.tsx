
import React from 'react';
import { Button } from '../../../components/Button';

interface ReactivationPromptProps {
  planName: string;
  onReactivate: () => void;
}

const ReactivationPrompt: React.FC<ReactivationPromptProps> = ({ planName, onReactivate }) => {
  return (
    <div className="bg-warningLight border-l-4 border-warning text-warningDark p-4 mb-8" role="alert">
      <p className="font-bold">Suscripción Cancelada</p>
      <p>
        Tu plan '{planName}' ha sido cancelado. Puedes reactivarlo en cualquier momento para recuperar
        el acceso a todas las funcionalidades.
      </p>
      <Button onClick={onReactivate} className="mt-4" variant="primary">
        Reactivar Suscripción
      </Button>
    </div>
  );
};

export default ReactivationPrompt;
