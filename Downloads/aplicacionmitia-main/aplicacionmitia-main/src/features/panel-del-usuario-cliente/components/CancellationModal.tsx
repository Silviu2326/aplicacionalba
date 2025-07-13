
import React from 'react';
import { Button } from '@/components/Button';

interface CancellationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  policy: string;
  isRefundable: boolean;
}

const CancellationModal: React.FC<CancellationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  policy,
  isRefundable,
}) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-overlay z-50 flex justify-center items-center">
      <div className="bg-surface border border-border rounded-lg p-8 shadow-2xl max-w-md w-full transition-all duration-300">
        <h2 className="text-2xl font-bold mb-4 text-text">Confirmar Cancelación</h2>
        <p className="text-textSecondary mb-6">{policy}</p>
        
        {isRefundable ? (
          <p className="text-success font-semibold mb-6">
            Esta cancelación es elegible para un reembolso completo.
          </p>
        ) : (
          <p className="text-error font-semibold mb-6">
            Esta cancelación no es reembolsable según nuestra política.
          </p>
        )}

        <div className="flex justify-end gap-4">
          <Button onClick={onClose} variant="secondary">
            Volver
          </Button>
          <Button onClick={onConfirm} variant="danger">
            Confirmar Cancelación
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CancellationModal;
