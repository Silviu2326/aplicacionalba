import React from 'react';

const CommissionRuleList = () => {
  // Dummy data, will be replaced by API data
  const rules = [
    { id: 1, name: 'Comisión por defecto', condition: 'true', value: 15, priority: 100, isActive: true },
    { id: 2, name: 'Profesionales antiguos', condition: 'antiguedad > 365', value: 10, priority: 10, isActive: true },
    { id: 3, name: 'Insignia "Top Pro"', condition: 'insignias CONTAINS "top-pro"', value: 8, priority: 5, isActive: false },
  ];

  return (
    <div className="p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-bold mb-4">Lista de Reglas de Comisión</h2>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Condición</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Comisión (%)</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Prioridad</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
            <th scope="col" className="relative px-6 py-3">
              <span className="sr-only">Editar</span>
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {rules.map((rule) => (
            <tr key={rule.id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{rule.name}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{rule.condition}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{rule.value}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{rule.priority}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm">
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                  rule.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {rule.isActive ? 'Activa' : 'Inactiva'}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <a href="#" className="text-indigo-600 hover:text-indigo-900">Editar</a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CommissionRuleList;
