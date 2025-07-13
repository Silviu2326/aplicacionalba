import React from 'react';
import { motion } from 'framer-motion';
import clienteDashboard from '../assets/cliente-dashboard.svg';
import profesionalDashboard from '../assets/profesional-dashboard.svg';

interface DashboardPreviewProps {
  userType: 'Cliente' | 'Profesional';
}

const DashboardPreview: React.FC<DashboardPreviewProps> = ({ userType }) => {
  const imageUrl = userType === 'Cliente' ? clienteDashboard : profesionalDashboard;
  const text =
    userType === 'Cliente'
      ? 'Gestiona tus citas y sigue tu progreso.'
      : 'Organiza tu agenda y conecta con tus clientes.';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mt-8 p-6 border rounded-lg shadow-lg bg-surface border-border"
    >
      <h3 className="text-xl font-semibold text-text mb-4">
        Vista Previa del Panel de {userType}
      </h3>
      <p className="text-textSecondary mb-4">{text}</p>
      <div className="flex justify-center">
        <img
          src={imageUrl}
          alt={`Vista previa del panel de ${userType}`}
          className="rounded-md shadow-md"
        />
      </div>
    </motion.div>
  );
};

export default DashboardPreview;
