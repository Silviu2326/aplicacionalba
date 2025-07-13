import React from 'react';

const CommissionRuleBuilder = () => {
  return (
    <div className="p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-bold mb-4">Crear/Editar Regla de Comisión</h2>
      <form>
        <div className="mb-4">
          <label htmlFor="ruleName" className="block text-sm font-medium text-gray-700">Nombre de la Regla</label>
          <input type="text" id="ruleName" name="ruleName" className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
        </div>
        <div className="mb-4">
          <label htmlFor="condition" className="block text-sm font-medium text-gray-700">Condición (ej. 'antigüedad &gt; 365')</label>
          <input type="text" id="condition" name="condition" className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
        </div>
        <div className="mb-4">
          <label htmlFor="commissionValue" className="block text-sm font-medium text-gray-700">Valor de la Comisión (%)</label>
          <input type="number" id="commissionValue" name="commissionValue" className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
        </div>
        <div className="mb-4">
          <label htmlFor="priority" className="block text-sm font-medium text-gray-700">Prioridad</label>
          <input type="number" id="priority" name="priority" className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
        </div>
        <div className="flex items-center">
          <input id="isActive" name="isActive" type="checkbox" className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
          <label htmlFor="isActive" className="ml-2 block text-sm text-gray-900">Activa</label>
        </div>
        <div className="mt-6">
          <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">Guardar Regla</button>
        </div>
      </form>
    </div>
  );
};

export default CommissionRuleBuilder;
