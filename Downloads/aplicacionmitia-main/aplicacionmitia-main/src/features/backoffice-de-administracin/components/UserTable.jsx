import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../../../components/Button';

const UserTable = ({ users, onToggleStatus, onImpersonate }) => {
  const columns = [
    { 
      Header: 'Nombre', 
      accessor: 'name',
      Cell: ({ row }) => (
        <Link to={`/admin/usuarios/${row.original.id}`} className="text-primary hover:underline">
          {row.original.name}
        </Link>
      )
    },
    { Header: 'Email', accessor: 'email' },
    { Header: 'Rol', accessor: 'role' },
    {
      Header: 'Estado',
      accessor: 'status',
      Cell: ({ value }) => (
        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
          value === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        }`}>
          {value}
        </span>
      ),
    },
    {
      Header: 'Acciones',
      Cell: ({ row }) => (
        <div className="flex space-x-2">
          <Button onClick={() => onToggleStatus(row.original)} variant="secondary" size="sm">
            {row.original.status === 'active' ? 'Desactivar' : 'Activar'}
          </Button>
          <Button onClick={() => onImpersonate(row.original.name)} variant="primary" size="sm">
            Suplantar
          </Button>
        </div>
      ),
    },
  ];

  const data = React.useMemo(() => users, [users]);

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-700">
        <thead className="bg-gray-800">
          <tr>
            {columns.map(column => (
              <th key={column.Header} className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                {column.Header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-gray-900 divide-y divide-gray-700">
          {data.map((row, i) => (
            <tr key={i}>
              {columns.map(column => (
                <td key={column.Header} className="px-6 py-4 whitespace-nowrap text-sm text-gray-200">
                  {column.Cell ? column.Cell({ row, value: row[column.accessor] }) : row[column.accessor]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;