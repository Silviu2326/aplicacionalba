import React, { useState } from 'react';

interface SaveSearchButtonProps {
  onSave: (name: string) => void;
  disabled?: boolean;
}

const SaveSearchButton: React.FC<SaveSearchButtonProps> = ({ onSave, disabled }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchName, setSearchName] = useState('');

  const handleSave = () => {
    if (searchName.trim()) {
      onSave(searchName);
      setSearchName('');
      setIsModalOpen(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        disabled={disabled}
        className="px-4 py-2 text-sm font-medium text-text bg-primary rounded-md hover:bg-primaryHover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-focus disabled:bg-disabled disabled:cursor-not-allowed"
      >
        Guardar Búsqueda
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-overlay">
          <div className="bg-surface rounded-lg shadow-lg p-6 w-full max-w-md">
            <h2 className="text-lg font-semibold text-text mb-4">Guardar Búsqueda</h2>
            <p className="text-textSecondary mb-4">
              Dale un nombre a tu configuración de búsqueda actual para acceder a ella más tarde.
            </p>
            <input
              type="text"
              value={searchName}
              onChange={(e) => setSearchName(e.target.value)}
              placeholder="Ej. Terapeutas de ansiedad en CDMX"
              className="w-full px-3 py-2 mb-4 text-text bg-backgroundSecondary border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-focus"
            />
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 text-sm font-medium text-textSecondary bg-card rounded-md hover:bg-border"
              >
                Cancelar
              </button>
              <button
                onClick={handleSave}
                disabled={!searchName.trim()}
                className="px-4 py-2 text-sm font-medium text-text bg-primary rounded-md hover:bg-primaryHover disabled:bg-disabled"
              >
                Guardar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SaveSearchButton;