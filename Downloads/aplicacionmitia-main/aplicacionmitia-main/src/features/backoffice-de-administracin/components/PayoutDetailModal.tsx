
import React from 'react';

const PayoutDetailModal = ({ payout, onClose, onApprove }) => {
  if (!payout) return null;

  const handleApproveClick = () => {
    onApprove(payout.id);
  };

  return (
    <div className="fixed inset-0 bg-overlay flex justify-center items-center z-50">
      <div className="bg-surface rounded-lg shadow-xl p-8 max-w-2xl w-full border border-border">
        <h3 className="text-2xl font-bold mb-4 text-text">Detalle del Pago</h3>
        <div className="mb-6">
          <p className="text-lg text-textSecondary"><span className="font-semibold text-text">Profesional:</span> {payout.professionalName}</p>
          <p className="text-lg text-textSecondary"><span className="font-semibold text-text">Monto Total:</span> <span className="text-success font-bold">${payout.amount.toFixed(2)}</span></p>
        </div>

        <h4 className="text-xl font-semibold mb-3 text-text">Desglose de Transacciones</h4>
        <div className="overflow-y-auto max-h-60 border border-borderLight rounded-md">
          <table className="min-w-full">
            <thead className="bg-background sticky top-0">
              <tr>
                <th className="text-left py-2 px-4 font-semibold text-sm text-textMuted uppercase">Fecha</th>
                <th className="text-left py-2 px-4 font-semibold text-sm text-textMuted uppercase">Paciente</th>
                <th className="text-right py-2 px-4 font-semibold text-sm text-textMuted uppercase">Monto</th>
              </tr>
            </thead>
            <tbody className="text-textSecondary bg-surface">
              {payout.transactions.map(tx => (
                <tr key={tx.id} className="border-b border-borderLight last:border-b-0">
                  <td className="py-2 px-4">{tx.date}</td>
                  <td className="py-2 px-4">{tx.patient}</td>
                  <td className="py-2 px-4 text-right">${tx.amount.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-8 flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="bg-muted hover:bg-opacity-80 text-textInverse font-bold py-2 px-6 rounded transition duration-300"
          >
            Cerrar
          </button>
          <button
            onClick={handleApproveClick}
            className="bg-success hover:bg-successDark text-white font-bold py-2 px-6 rounded transition duration-300"
          >
            Aprobar Pago
          </button>
        </div>
      </div>
    </div>
  );
};

export default PayoutDetailModal;
