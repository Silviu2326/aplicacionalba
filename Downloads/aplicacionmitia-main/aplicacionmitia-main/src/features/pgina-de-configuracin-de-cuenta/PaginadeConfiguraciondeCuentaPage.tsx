import React from 'react';
import { Button } from '../../components/Button';

const PaginadeConfiguraciondeCuentaPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h1 className="text-3xl font-bold mb-4">Configuración de Cuenta</h1>
          <p className="text-gray-600 mb-6">
            Permite cambiar datos personales, contraseña y preferencias.
          </p>
          <div className="space-x-4">
            <Button variant="primary">Guardar Cambios</Button>
            <Button variant="secondary">Cancelar</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaginadeConfiguraciondeCuentaPage;