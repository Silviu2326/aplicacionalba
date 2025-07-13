import React, { useState } from 'react';
import { useBackofficedeAdministracion } from '../hooks/useBackofficedeAdministracion';
import Table from '../../../components/Table';
import { Button } from '../../../components/Button';
import { VerificationCard } from './VerificationCard';

export const ProfessionalVerificationQueue = () => {
  const { professionals, approveProfessional, rejectProfessional, isLoading, error } = useBackofficedeAdministracion();
  const [selectedProfessional, setSelectedProfessional] = useState(null);

  const handleApprove = (professionalId) => {
    approveProfessional(professionalId);
  };

  const handleReject = (professionalId, reason) => {
    rejectProfessional(professionalId, reason);
  };

  const columns = [
    { header: 'Nombre', accessor: 'name' },
    { header: 'Especialidad', accessor: 'specialty' },
    {
      header: 'Acciones',
      cell: (professional) => (
        <div className="flex space-x-2">
          <Button onClick={() => handleApprove(professional.id)} variant="primary">
            Aprobar
          </Button>
          <Button onClick={() => setSelectedProfessional(professional)} variant="danger">
            Rechazar
          </Button>
        </div>
      ),
    },
  ];

  if (isLoading) {
    return <div className="text-text">Cargando...</div>;
  }

  if (error) {
    return <div className="text-error">Error: {error.message}</div>;
  }

  return (
    <div className="container mx-auto p-4 bg-surface rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4 text-text">Cola de Verificación de Profesionales</h1>
      <Table columns={columns} data={professionals} />
      {selectedProfessional && (
        <VerificationCard
          professional={selectedProfessional}
          onClose={() => setSelectedProfessional(null)}
          onReject={handleReject}
        />
      )}
    </div>
  );
};
