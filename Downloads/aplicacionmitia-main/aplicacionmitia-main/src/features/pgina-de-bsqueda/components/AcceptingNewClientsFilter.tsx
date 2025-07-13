// src/features/pgina-de-bsqueda/components/AcceptingNewClientsFilter.tsx
import React from 'react';

interface Props {
  isAcceptingNewClients: boolean;
  setIsAcceptingNewClients: (value: boolean) => void;
}

const AcceptingNewClientsFilter: React.FC<Props> = ({ isAcceptingNewClients, setIsAcceptingNewClients }) => {
  return (
    <div className="p-4 border-b border-border">
      <h3 className="font-semibold text-lg mb-3 text-text">Disponibilidad Inmediata</h3>
      <div className="flex items-center justify-between">
        <span className="text-textSecondary">Acepta nuevos clientes</span>
        <label htmlFor="accepting-new-clients-toggle" className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            id="accepting-new-clients-toggle"
            className="sr-only peer"
            checked={isAcceptingNewClients}
            onChange={(e) => setIsAcceptingNewClients(e.target.checked)}
          />
          <div className="w-11 h-6 bg-muted rounded-full peer peer-focus:ring-4 peer-focus:ring-focus peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-border after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
        </label>
      </div>
      <p className="text-sm text-textMuted mt-2">
        Muestra solo profesionales que actualmente aceptan nuevos pacientes.
      </p>
    </div>
  );
};

export default AcceptingNewClientsFilter;
