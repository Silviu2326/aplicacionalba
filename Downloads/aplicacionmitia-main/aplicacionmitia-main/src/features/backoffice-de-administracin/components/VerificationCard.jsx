import React, { useState } from 'react';
import { Button } from '../../../components/Button';

export const VerificationCard = ({ professional, onClose, onReject }) => {
  const [reason, setReason] = useState('');

  const handleReject = () => {
    onReject(professional.id, reason);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-overlay flex items-center justify-center">
      <div className="bg-surface p-6 rounded-lg shadow-lg w-1/3">
        <h2 className="text-xl font-bold mb-4 text-text">Rechazar Profesional</h2>
        <p className="mb-4 text-textSecondary">
          Estás a punto de rechazar a <strong>{professional.name}</strong>.
        </p>
        <textarea
          className="w-full p-2 border border-border rounded mb-4 bg-background text-text"
          placeholder="Motivo del rechazo (opcional)"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
        ></textarea>
        <div className="flex justify-end space-x-2">
          <Button onClick={onClose} variant="secondary">
            Cancelar
          </Button>
          <Button onClick={handleReject} variant="danger">
            Rechazar
          </Button>
        </div>
      </div>
    </div>
  );
};
