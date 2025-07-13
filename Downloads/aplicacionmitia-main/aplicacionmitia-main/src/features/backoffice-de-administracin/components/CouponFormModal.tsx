
import React from 'react';

interface CouponFormModalProps {
  onClose: () => void;
}

const CouponFormModal: React.FC<CouponFormModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-overlay flex items-center justify-center z-50">
      <div className="bg-card p-8 rounded-lg shadow-2xl w-full max-w-md m-4">
        <h2 className="text-2xl font-bold text-text mb-6">Crear Nuevo Cupón</h2>
        <form>
          <div className="mb-4">
            <label htmlFor="code" className="block text-textSecondary mb-2">Código del Cupón</label>
            <input
              type="text"
              id="code"
              className="w-full px-4 py-2 bg-surface border border-border rounded-lg text-text focus:outline-none focus:ring-2 focus:ring-focus"
              placeholder="EJ: VERANO2024"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="value" className="block text-textSecondary mb-2">Valor del Descuento</label>
            <input
              type="number"
              id="value"
              className="w-full px-4 py-2 bg-surface border border-border rounded-lg text-text focus:outline-none focus:ring-2 focus:ring-focus"
              placeholder="25"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="type" className="block text-textSecondary mb-2">Tipo de Descuento</label>
            <select
              id="type"
              className="w-full px-4 py-2 bg-surface border border-border rounded-lg text-text focus:outline-none focus:ring-2 focus:ring-focus"
            >
              <option value="percentage">Porcentaje (%)</option>
              <option value="fixed">Monto Fijo ($)</option>
            </select>
          </div>
          <div className="mb-6">
            <label htmlFor="expiration" className="block text-textSecondary mb-2">Fecha de Expiración</label>
            <input
              type="date"
              id="expiration"
              className="w-full px-4 py-2 bg-surface border border-border rounded-lg text-text focus:outline-none focus:ring-2 focus:ring-focus"
            />
          </div>
          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-muted text-text font-semibold rounded-lg hover:bg-border"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-primary text-textInverse font-semibold rounded-lg hover:bg-primaryHover"
            >
              Crear Cupón
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CouponFormModal;
