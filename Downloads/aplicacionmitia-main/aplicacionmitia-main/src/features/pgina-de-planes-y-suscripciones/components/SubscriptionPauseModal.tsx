
import React, { useState } from 'react';
import { Button } from '../../../components/Button';

interface SubscriptionPauseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPause: (duration: number) => void;
}

const SubscriptionPauseModal: React.FC<SubscriptionPauseModalProps> = ({ isOpen, onClose, onPause }) => {
  const [duration, setDuration] = useState(1);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-overlay flex justify-center items-center z-50">
      <div className="bg-surface rounded-lg shadow-xl p-8 max-w-md w-full border border-border">
        <h2 className="text-2xl font-bold mb-4 text-text">Pausar Suscripción</h2>
        <p className="mb-6 text-textSecondary">
          Selecciona por cuánto tiempo deseas pausar tu suscripción. Tu perfil no será visible para nuevos
          pacientes durante este período.
        </p>
        <div className="mb-6">
          <label htmlFor="pause-duration" className="block text-sm font-medium text-text mb-2">
            Duración de la Pausa (en meses)
          </label>
          <select
            id="pause-duration"
            value={duration}
            onChange={(e) => setDuration(Number(e.target.value))}
            className="w-full p-2 border border-border rounded-md bg-backgroundSecondary text-text focus:ring-focus focus:border-focus"
          >
            <option value={1}>1 Mes</option>
            <option value={2}>2 Meses</option>
            <option value={3}>3 Meses</option>
          </select>
        </div>
        <div className="mt-8 flex justify-end space-x-4">
          <Button variant="secondary" onClick={onClose}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={() => onPause(duration)}>
            Confirmar Pausa
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionPauseModal;
