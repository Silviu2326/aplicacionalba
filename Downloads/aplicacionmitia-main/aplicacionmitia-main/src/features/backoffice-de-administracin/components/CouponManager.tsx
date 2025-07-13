
import React, { useState } from 'react';
import CouponFormModal from './CouponFormModal';

const coupons = [
  { id: 1, code: 'SUMMER2024', value: 20, type: 'percentage', uses: 150, status: 'active' },
  { id: 2, code: 'WELCOME10', value: 10, type: 'fixed', uses: 300, status: 'active' },
  { id: 3, code: 'EXPIRED', value: 50, type: 'percentage', uses: 50, status: 'inactive' },
];

const CouponManager: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <div className="p-6 bg-backgroundSecondary rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-text">Gestor de Cupones</h2>
        <button
          onClick={handleOpenModal}
          className="px-4 py-2 bg-primary text-textInverse font-semibold rounded-lg hover:bg-primaryHover focus:outline-none focus:ring-2 focus:ring-primaryDark"
        >
          Crear Cupón
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-surface rounded-md">
          <thead>
            <tr className="border-b border-border">
              <th className="p-4 text-left text-textSecondary">Código</th>
              <th className="p-4 text-left text-textSecondary">Valor</th>
              <th className="p-4 text-left text-textSecondary">Tipo</th>
              <th className="p-4 text-left text-textSecondary">Usos</th>
              <th className="p-4 text-left text-textSecondary">Estado</th>
              <th className="p-4 text-left text-textSecondary">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {coupons.map((coupon) => (
              <tr key={coupon.id} className="border-b border-borderLight hover:bg-background">
                <td className="p-4 text-text">{coupon.code}</td>
                <td className="p-4 text-text">{coupon.type === 'percentage' ? `${coupon.value}%` : `$${coupon.value}`}</td>
                <td className="p-4 text-text capitalize">{coupon.type}</td>
                <td className="p-4 text-text">{coupon.uses}</td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded-full text-sm font-semibold ${
                    coupon.status === 'active' ? 'bg-success text-textInverse' : 'bg-muted text-text'
                  }`}>
                    {coupon.status === 'active' ? 'Activo' : 'Inactivo'}
                  </span>
                </td>
                <td className="p-4">
                  <button className="text-error hover:text-errorDark focus:outline-none">
                    Desactivar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {isModalOpen && <CouponFormModal onClose={handleCloseModal} />}
    </div>
  );
};

export default CouponManager;
