
import React, { useState, useEffect } from 'react';
import PayoutDetailModal from './PayoutDetailModal';
import { getPendingPayouts, processPayout } from '../api';

const PayoutQueue = () => {
  const [payouts, setPayouts] = useState([]);
  const [selectedPayout, setSelectedPayout] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPayouts = async () => {
      try {
        setIsLoading(true);
        const pendingPayouts = await getPendingPayouts();
        setPayouts(pendingPayouts);
        setError(null);
      } catch (err) {
        setError('Failed to fetch payouts');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPayouts();
  }, []);

  const handleReviewClick = (payout) => {
    setSelectedPayout(payout);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedPayout(null);
  };

  const handleApprove = async (payoutId) => {
    try {
      await processPayout(payoutId);
      setPayouts(payouts.filter(p => p.id !== payoutId));
      handleCloseModal();
    } catch (err) {
      setError('Failed to process payout');
      console.error(err);
    }
  };

  if (isLoading) {
    return <div className="text-center p-8">Loading payouts...</div>;
  }

  if (error) {
    return <div className="text-center p-8 text-error">{error}</div>;
  }

  return (
    <div className="bg-surface shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4 text-text">Cola de Pagos Pendientes</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-surface">
          <thead className="bg-background">
            <tr>
              <th className="text-left py-3 px-4 font-semibold text-sm text-textMuted uppercase">Profesional</th>
              <th className="text-left py-3 px-4 font-semibold text-sm text-textMuted uppercase">Monto Total</th>
              <th className="text-left py-3 px-4 font-semibold text-sm text-textMuted uppercase">Acciones</th>
            </tr>
          </thead>
          <tbody className="text-textSecondary">
            {payouts.map((payout) => (
              <tr key={payout.id} className="border-b border-borderLight hover:bg-backgroundSecondary">
                <td className="py-3 px-4">{payout.professionalName}</td>
                <td className="py-3 px-4">${payout.amount.toFixed(2)}</td>
                <td className="py-3 px-4">
                  <button
                    onClick={() => handleReviewClick(payout)}
                    className="bg-primary hover:bg-primaryHover text-white font-bold py-2 px-4 rounded transition duration-300"
                  >
                    Revisar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {payouts.length === 0 && !isLoading && (
          <p className="text-center py-8 text-textMuted">No hay pagos pendientes.</p>
        )}
      </div>
      {isModalOpen && selectedPayout && (
        <PayoutDetailModal
          payout={selectedPayout}
          onClose={handleCloseModal}
          onApprove={handleApprove}
        />
      )}
    </div>
  );
};

export default PayoutQueue;
