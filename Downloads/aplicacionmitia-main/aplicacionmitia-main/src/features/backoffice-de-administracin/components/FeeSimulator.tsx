import React from 'react';

const FeeSimulator = () => {
  return (
    <div className="p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-bold mb-4">Simulador de Comisión</h2>
      <form>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="mb-4">
            <label htmlFor="professionalId" className="block text-sm font-medium text-gray-700">ID del Profesional</label>
            <input type="text" id="professionalId" name="professionalId" className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
          </div>
          <div className="mb-4">
            <label htmlFor="transactionAmount" className="block text-sm font-medium text-gray-700">Monto de la Transacción</label>
            <input type="number" id="transactionAmount" name="transactionAmount" className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
          </div>
          <div className="mb-4">
            <label htmlFor="antiquity" className="block text-sm font-medium text-gray-700">Antigüedad (días)</label>
            <input type="number" id="antiquity" name="antiquity" className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
          </div>
          <div className="mb-4">
            <label htmlFor="badges" className="block text-sm font-medium text-gray-700">Insignias (separadas por coma)</label>
            <input type="text" id="badges" name="badges" className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
          </div>
        </div>
        <div className="mt-6">
          <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">Simular Comisión</button>
        </div>
      </form>
      <div className="mt-6 p-4 border-t border-gray-200">
        <h3 className="text-lg font-medium">Resultado de la Simulación</h3>
        <p className="mt-2 text-sm text-gray-600">La comisión calculada es de: <span className="font-bold text-lg text-indigo-600">$15.00 (15%)</span></p>
        <p className="text-xs text-gray-500 mt-1">Regla aplicada: 'Comisión por defecto'</p>
      </div>
    </div>
  );
};

export default FeeSimulator;
