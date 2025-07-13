
import React from 'react';
import { Button } from '../../../components/Button';
import { ProrationDetails } from '../types';

interface ProrationSummaryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  prorationDetails: ProrationDetails;
}

export const ProrationSummaryModal: React.FC<ProrationSummaryModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  prorationDetails,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-overlay bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4">Confirmar Cambio de Plan</h2>
        <p className="mb-6">Estás a punto de cambiar de tu plan '{prorationDetails.oldPlanName}' al plan '{prorationDetails.newPlanName}'.</p>
        <div className="space-y-2 text-gray-700">
            <div className="flex justify-between">
                <span>Crédito por tiempo no utilizado:</span>
                <span className="font-medium text-green-600">${prorationDetails.creditForUnusedTime.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
                <span>Cargo por el nuevo plan (prorrateado):</span>
                <span className="font-medium">${prorationDetails.chargeForNewPlan.toFixed(2)}</span>
            </div>
            <div className="border-t mt-4 pt-4 flex justify-between font-bold text-lg">
                <span>Total a pagar hoy:</span>
                <span>${prorationDetails.netCharge.toFixed(2)}</span>
            </div>
        </div>
        <div className="mt-8 flex justify-end space-x-4">
          <Button variant="secondary" onClick={onClose}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={onConfirm}>
            Confirmar y Pagar
          </Button>
        </div>
      </div>
    </div>
  );
};
