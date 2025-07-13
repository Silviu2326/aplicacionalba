// src/features/pgina-de-registrologin/components/ProfileTypeSelector.tsx
import React from 'react';

type ProfileType = 'cliente' | 'profesional' | null;

interface ProfileTypeSelectorProps {
  selectedType: ProfileType;
  onSelect: (type: 'cliente' | 'profesional') => void;
  disabled?: boolean;
}

const ProfileTypeSelector: React.FC<ProfileTypeSelectorProps> = ({
  selectedType,
  onSelect,
  disabled = false,
}) => {
  const getButtonClasses = (type: 'cliente' | 'profesional') => {
    const baseClasses =
      'w-full p-4 rounded-lg border-2 transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background focus:ring-focus';
    const selectedClasses =
      'bg-primary border-primary shadow-lg scale-105';
    const unselectedClasses =
      'bg-surface border-border hover:bg-backgroundSecondary hover:border-borderLight';
    const disabledClasses = 'bg-muted border-muted cursor-not-allowed';

    if (disabled) {
      return `${baseClasses} ${disabledClasses}`;
    }

    return `${baseClasses} ${
      selectedType === type ? selectedClasses : unselectedClasses
    }`;
  };

  return (
    <div className="w-full">
      <h3 className="text-lg font-semibold text-text mb-4 text-center">
        Elige tu tipo de perfil
      </h3>
      <div className="flex flex-col md:flex-row gap-4">
        <button
          type="button"
          onClick={() => onSelect('cliente')}
          className={getButtonClasses('cliente')}
          disabled={disabled}
          aria-pressed={selectedType === 'cliente'}
        >
          <div className="text-center">
            <h4 className="font-bold text-xl text-text">Cliente</h4>
            <p className="text-sm text-textSecondary mt-1">
              Busca y reserva sesiones con profesionales de la salud mental.
            </p>
          </div>
        </button>
        <button
          type="button"
          onClick={() => onSelect('profesional')}
          className={getButtonClasses('profesional')}
          disabled={disabled}
          aria-pressed={selectedType === 'profesional'}
        >
          <div className="text-center">
            <h4 className="font-bold text-xl text-text">Profesional</h4>
            <p className="text-sm text-textSecondary mt-1">
              Ofrece tus servicios y gestiona tus citas en la plataforma.
            </p>
          </div>
        </button>
      </div>
    </div>
  );
};

export default ProfileTypeSelector;
