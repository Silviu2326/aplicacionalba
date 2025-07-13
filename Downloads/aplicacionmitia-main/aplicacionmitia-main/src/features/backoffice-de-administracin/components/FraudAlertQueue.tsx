import React, { useState, useMemo } from 'react';
import { FraudAlert } from '../types';
import FraudAlertDetailModal from './FraudAlertDetailModal';
import Table from '@/components/Table';
import RiskScoreIndicator from './RiskScoreIndicator';

interface FraudAlertQueueProps {
  alerts: FraudAlert[];
  isLoading: boolean;
}

const FraudAlertQueue: React.FC<FraudAlertQueueProps> = ({ alerts, isLoading }) => {
  const [selectedAlert, setSelectedAlert] = useState<FraudAlert | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleViewDetails = (alert: FraudAlert) => {
    setSelectedAlert(alert);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedAlert(null);
  };

  // Dummy action handlers
  const handleAssign = (alertId: string) => console.log(`Assigned alert ${alertId}`);
  const handleResolve = (alertId: string) => console.log(`Resolved alert ${alertId}`);
  const handleIgnore = (alertId: string) => console.log(`Ignored alert ${alertId}`);
  const handleSuspendUser = (userId: string) => console.log(`Suspended user ${userId}`);

  const columns = useMemo(() => [
    { Header: 'Fecha', accessor: 'timestamp', Cell: ({ value }: { value: string }) => new Date(value).toLocaleString() },
    { Header: 'Tipo de Alerta', accessor: 'type' },
    { 
      Header: 'Nivel de Riesgo', 
      accessor: 'riskScore',
      Cell: ({ value }: { value: number }) => <RiskScoreIndicator riskScore={value} />
    },
    { Header: 'Estado', accessor: 'status' },
    { Header: 'ID de Usuario', accessor: 'userId' },
    {
      Header: 'Acciones',
      accessor: 'id',
      Cell: ({ row }: { row: { original: FraudAlert } }) => (
        <button 
          onClick={() => handleViewDetails(row.original)}
          className="text-primary hover:text-primaryHover font-semibold"
        >
          Ver Detalles
        </button>
      ),
    },
  ], []);

  return (
    <div className="bg-surface p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-text mb-4">Cola de Alertas de Fraude</h2>
      <Table columns={columns} data={alerts} isLoading={isLoading} />
      <FraudAlertDetailModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        alert={selectedAlert}
        onAssign={handleAssign}
        onResolve={handleResolve}
        onIgnore={handleIgnore}
        onSuspendUser={handleSuspendUser}
      />
    </div>
  );
};

export default FraudAlertQueue;