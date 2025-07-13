import React from 'react';
import Table from '../../../components/Table';
import { Button } from '../../../components/Button';

interface UserSegment {
  id: string;
  name: string;
  userCount: number;
  createdAt: string;
}

interface UserSegmentTableProps {
  segments: UserSegment[];
  isLoading: boolean;
}

const UserSegmentTable: React.FC<UserSegmentTableProps> = ({ segments, isLoading }) => {
  const columns = [
    { key: 'name', label: 'Nombre del Segmento' },
    { key: 'userCount', label: 'Usuarios' },
    { key: 'createdAt', label: 'Fecha de Creación' },
    { key: 'actions', label: 'Acciones' },
  ];

  const renderRow = (row: UserSegment) => (
    <tr key={row.id} className="bg-surface border-b border-border hover:bg-backgroundSecondary">
      <td className="p-4 text-text">{row.name}</td>
      <td className="p-4 text-textSecondary">{row.userCount}</td>
      <td className="p-4 text-textMuted">{row.createdAt}</td>
      <td className="p-4 flex gap-2">
        <Button variant="secondary" size="sm">Editar</Button>
        <Button variant="danger" size="sm">Eliminar</Button>
      </td>
    </tr>
  );

  return (
    <div className="p-4 bg-card rounded-lg shadow-md mt-6">
      <h2 className="text-xl font-bold text-text mb-4">Segmentos de Usuarios Guardados</h2>
      {isLoading ? (
        <p className="text-textSecondary">Cargando segmentos...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full text-left">
            <thead className="bg-backgroundSecondary">
              <tr>
                {columns.map(col => (
                  <th key={col.key} className="p-4 text-textSecondary font-semibold">
                    {col.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {segments.map(renderRow)}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default UserSegmentTable;