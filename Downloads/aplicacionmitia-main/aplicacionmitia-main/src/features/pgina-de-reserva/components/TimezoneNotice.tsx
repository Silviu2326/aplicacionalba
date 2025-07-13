// src/features/pgina-de-reserva/components/TimezoneNotice.tsx
import React from 'react';

const TimezoneNotice: React.FC = () => {
  const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  return (
    <div className="bg-gradient-surface p-4 rounded-xl border border-info/20 shadow-md" role="alert">
      <div className="flex items-start space-x-3">
        <div className="p-2 bg-info/10 rounded-lg flex-shrink-0">
          <svg className="w-5 h-5 text-info" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
          </svg>
        </div>
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-2">
            <h4 className="text-sm font-bold text-info">Tu Zona Horaria</h4>
            <div className="px-2 py-1 bg-info/10 rounded-full">
              <span className="text-xs font-medium text-info">{userTimezone}</span>
            </div>
          </div>
          <p className="text-sm text-textSecondary leading-relaxed">
            Todos los horarios de las citas se muestran automáticamente en tu zona horaria local para mayor comodidad.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TimezoneNotice;
