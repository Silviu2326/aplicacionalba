
import React, { useState } from 'react';
import { Button } from '../../../components/Button';

const CancellationPolicyEditor: React.FC = () => {
  const [hours, setHours] = useState<number>(24);
  const [percentage, setPercentage] = useState<number>(50);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSave = async () => {
    setIsLoading(true);
    try {
      console.log({
        cancellationPolicy: {
          hours,
          percentage,
        },
      });
      // Simular llamada a API
      await new Promise(resolve => setTimeout(resolve, 1000));
      alert('Política de cancelación guardada exitosamente.');
    } catch (error) {
      alert('Error al guardar la política de cancelación.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-surface p-6 rounded-lg shadow-lg border border-border transition-all duration-300 hover:shadow-xl">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-text mb-2">
          Política de Cancelación
        </h2>
        <p className="text-textMuted text-sm">
          Define las condiciones para cancelaciones de sesiones.
        </p>
      </div>

      <div className="space-y-6">
        <div>
          <label htmlFor="cancellation-hours" className="block text-sm font-medium text-textSecondary mb-2">
            Plazo de Cancelación (horas)
          </label>
          <input
            type="number"
            id="cancellation-hours"
            value={hours}
            onChange={(e) => setHours(parseInt(e.target.value, 10))}
            className="w-full px-4 py-3 bg-backgroundSecondary border border-border rounded-md focus:ring-2 focus:ring-focus focus:border-focus focus:outline-none text-text transition-colors duration-200"
            placeholder="Ej. 24"
            min="1"
            max="168"
          />
          <p className="text-xs text-textMuted mt-1">
            Tiempo mínimo requerido antes de la sesión para cancelar
          </p>
        </div>

        <div>
          <label htmlFor="penalty-percentage" className="block text-sm font-medium text-textSecondary mb-2">
            Porcentaje de Penalización
          </label>
          <select
            id="penalty-percentage"
            value={percentage}
            onChange={(e) => setPercentage(parseInt(e.target.value, 10))}
            className="w-full px-4 py-3 bg-backgroundSecondary border border-border rounded-md focus:ring-2 focus:ring-focus focus:border-focus focus:outline-none text-text transition-colors duration-200"
          >
            <option value={0}>0% (Sin penalización)</option>
            <option value={25}>25% (Penalización baja)</option>
            <option value={50}>50% (Penalización media)</option>
            <option value={75}>75% (Penalización alta)</option>
            <option value={100}>100% (Sin reembolso)</option>
          </select>
          <p className="text-xs text-textMuted mt-1">
            Porcentaje del costo que se retiene en caso de cancelación tardía
          </p>
        </div>
      </div>

      <div className="mt-8 p-4 bg-backgroundSecondary rounded-md border-l-4 border-info">
        <h4 className="text-sm font-semibold text-text mb-2">Vista previa de la política:</h4>
        <p className="text-sm text-textSecondary">
          Las cancelaciones realizadas con menos de <span className="font-semibold text-text">{hours} horas</span> de antelación 
          tendrán una penalización del <span className="font-semibold text-text">{percentage}%</span> del costo de la sesión.
        </p>
      </div>

      <div className="mt-6">
        <Button
          onClick={handleSave}
          variant="primary"
          className="w-full"
          disabled={isLoading}
        >
          {isLoading ? 'Guardando...' : 'Guardar Política'}
        </Button>
      </div>
    </div>
  );
};

export default CancellationPolicyEditor;
