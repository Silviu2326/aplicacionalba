
import React, { useState } from 'react';

interface ValidatedCouponFieldProps {
  applyCoupon: (code: string) => Promise<boolean>;
  removeCoupon: () => void;
  appliedCoupon: string | null;
}

const ValidatedCouponField: React.FC<ValidatedCouponFieldProps> = ({ applyCoupon, removeCoupon, appliedCoupon }) => {
  const [couponCode, setCouponCode] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleApplyCoupon = async () => {
    setError(null);
    setSuccess(null);
    const isValid = await applyCoupon(couponCode);
    if (isValid) {
      setSuccess('Cupón aplicado con éxito');
    } else {
      setError('El código del cupón no es válido');
    }
  };

  const handleRemoveCoupon = () => {
    removeCoupon();
    setCouponCode('');
    setError(null);
    setSuccess(null);
  };

  return (
    <div className="w-full max-w-md p-4 bg-surface shadow-md rounded-lg border border-border">
      <h2 className="text-lg font-semibold mb-4 text-text">Código de Descuento</h2>
      {appliedCoupon ? (
        <div className="flex items-center justify-between">
          <p className="text-success">Cupón aplicado: {appliedCoupon}</p>
          <button
            onClick={handleRemoveCoupon}
            className="text-error hover:text-errorHover"
          >
            Quitar
          </button>
        </div>
      ) : (
        <div className="flex items-center space-x-2">
          <input
            type="text"
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value)}
            placeholder="Introduce tu código de cupón"
            className="flex-grow p-2 border border-border bg-backgroundSecondary text-text rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            disabled={!!appliedCoupon}
          />
          <button
            onClick={handleApplyCoupon}
            className="px-4 py-2 bg-primary text-textInverse rounded-md hover:bg-primaryHover focus:outline-none focus:ring-2 focus:ring-primary"
            disabled={!couponCode || !!appliedCoupon}
          >
            Aplicar
          </button>
        </div>
      )}
      {error && <p className="text-error mt-2">{error}</p>}
      {success && <p className="text-success mt-2">{success}</p>}
    </div>
  );
};

export default ValidatedCouponField;
