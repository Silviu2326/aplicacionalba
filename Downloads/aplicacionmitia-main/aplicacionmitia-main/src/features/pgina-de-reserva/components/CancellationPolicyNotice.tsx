// src/features/pgina-de-reserva/components/CancellationPolicyNotice.tsx
import React from 'react';

interface CancellationPolicyNoticeProps {
  isAccepted: boolean;
  onAcceptanceChange: (isAccepted: boolean) => void;
}

const CancellationPolicyNotice: React.FC<CancellationPolicyNoticeProps> = ({
  isAccepted,
  onAcceptanceChange,
}) => {
  return (
    <div className="bg-gradient-surface p-6 rounded-xl border border-border shadow-lg">
      <div className="flex items-center space-x-3 mb-6">
        <div className="p-2 bg-warning/10 rounded-lg">
          <svg className="w-6 h-6 text-warning" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-text">
          Política de cancelación
        </h3>
      </div>
      
      <div className="space-y-4 mb-6">
        <div className="flex items-start space-x-3 p-3 bg-success/5 rounded-lg border-l-4 border-success">
          <svg className="w-5 h-5 text-success mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          <div>
            <p className="text-sm font-medium text-success mb-1">Cancelación gratuita</p>
            <p className="text-sm text-textSecondary">
              Puedes cancelar tu reserva hasta 24 horas antes de la cita sin costo adicional.
            </p>
          </div>
        </div>
        
        <div className="flex items-start space-x-3 p-3 bg-warning/5 rounded-lg border-l-4 border-warning">
          <svg className="w-5 h-5 text-warning mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          <div>
            <p className="text-sm font-medium text-warning mb-1">Cancelación con cargo</p>
            <p className="text-sm text-textSecondary">
              Las cancelaciones realizadas con menos de 24 horas de anticipación tendrán un cargo del 50% del valor total.
            </p>
          </div>
        </div>
        
        <div className="flex items-start space-x-3 p-3 bg-error/5 rounded-lg border-l-4 border-error">
          <svg className="w-5 h-5 text-error mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
          </svg>
          <div>
            <p className="text-sm font-medium text-error mb-1">Sin reembolso</p>
            <p className="text-sm text-textSecondary">
              No se realizarán reembolsos por cancelaciones el mismo día de la cita.
            </p>
          </div>
        </div>
      </div>
      
      <label className={`
        flex items-start space-x-3 cursor-pointer p-4 rounded-lg border-2 transition-all duration-300
        ${
          isAccepted
            ? 'bg-primary/5 border-primary'
            : 'bg-backgroundSecondary border-border hover:border-primary/50'
        }
      `}>
        <div className="relative flex-shrink-0 mt-0.5">
          <input
            type="checkbox"
            checked={isAccepted}
            onChange={(e) => onAcceptanceChange(e.target.checked)}
            className="sr-only"
          />
          <div className={`
            w-5 h-5 rounded border-2 transition-all duration-300 flex items-center justify-center
            ${
              isAccepted
                ? 'bg-primary border-primary'
                : 'bg-white border-border'
            }
          `}>
            {isAccepted && (
              <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            )}
          </div>
        </div>
        <div className="flex-1">
          <p className={`
            text-sm font-medium transition-colors duration-300
            ${
              isAccepted
                ? 'text-primary'
                : 'text-textSecondary'
            }
          `}>
            He leído y acepto la política de cancelación
          </p>
          <p className="text-xs text-textMuted mt-1">
            Es obligatorio aceptar los términos para continuar con la reserva
          </p>
        </div>
      </label>
    </div>
  );
};

export default CancellationPolicyNotice;
