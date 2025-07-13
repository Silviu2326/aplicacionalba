import React, { useState } from 'react';
import DocumentListItem from './DocumentListItem';
import { Table } from '../../../components/Table'; // Assuming Table is exported from here

// Define a type for the document props
interface Document {
  id: string;
  name: string;
  sharedAt: string;
  type: 'pdf' | 'word' | 'image' | 'other';
  url: string;
}

interface SharedResourcesSectionProps {
  resources: Document[];
  isLoading: boolean;
}

const SharedResourcesSection: React.FC<SharedResourcesSectionProps> = ({ resources, isLoading }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredResources = resources.filter((resource) =>
    resource.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) {
    return <div className="text-center p-8 text-textSecondary">Cargando recursos...</div>;
  }

  if (resources.length === 0) {
    return (
      <div className="bg-backgroundSecondary border border-borderLight p-8 rounded-lg text-center">
        <h3 className="text-xl font-semibold text-text">No hay recursos compartidos</h3>
        <p className="text-textSecondary mt-2">
          Tu terapeuta aún no ha compartido ningún recurso contigo.
        </p>
      </div>
    );
  }

  const columns = [
    {
      Header: 'Nombre',
      accessor: 'name',
    },
    {
      Header: 'Fecha',
      accessor: 'sharedAt',
    },
    {
        Header: 'Tipo',
        accessor: 'type',
    },
    {
      Header: 'Acción',
      accessor: 'action',
    },
  ];

  return (
    <div className="bg-card border border-border shadow-lg rounded-lg p-6 transition-all duration-300 hover:shadow-xl">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-text">Mis Recursos</h2>
        <input
          type="text"
          placeholder="Buscar por nombre..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border border-border bg-surface rounded-md px-4 py-2 text-text focus:outline-none focus:ring-2 focus:ring-focus focus:border-focus"
        />
      </div>

      {filteredResources.length > 0 ? (
        <div className="space-y-2">
          {filteredResources.map((doc) => (
            <DocumentListItem key={doc.id} document={doc} />
          ))}
        </div>
      ) : (
        <p className="text-textSecondary text-center py-4">
          No se encontraron documentos con ese nombre.
        </p>
      )}
    </div>
  );
};

export default SharedResourcesSection;
