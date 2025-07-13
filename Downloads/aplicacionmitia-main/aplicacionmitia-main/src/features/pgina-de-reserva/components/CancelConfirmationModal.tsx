import React from 'react';
import { Button } from '@/components/Button';

interface CancelConfirmationModalProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

const CancelConfirmationModal: React.FC<CancelConfirmationModalProps> = ({ isOpen, onConfirm, onCancel }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-8 shadow-2xl max-w-sm w-full">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Confirmar Cancelación</h2>
        <p className="text-gray-600 mb-6">¿Estás seguro de que quieres cancelar el proceso de reserva? Perderás toda la información seleccionada.</p>
        <div className="flex justify-end gap-4">
          <Button onClick={onCancel} variant="secondary">
            Volver
          </Button>
          <Button onClick={onConfirm} variant="danger">
            Sí, Cancelar
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CancelConfirmationModal;
