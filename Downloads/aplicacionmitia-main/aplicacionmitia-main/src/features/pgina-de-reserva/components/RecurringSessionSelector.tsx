
import React, { useState } from 'react';

interface RecurringSessionSelectorProps {
  onRecurringChange: (isRecurring: boolean, frequency: string, sessions: number) => void;
}

export const RecurringSessionSelector: React.FC<RecurringSessionSelectorProps> = ({ onRecurringChange }) => {
  const [isRecurring, setIsRecurring] = useState(false);
  const [frequency, setFrequency] = useState('semanal');
  const [sessions, setSessions] = useState(4);

  const handleRecurringToggle = () => {
    const newIsRecurring = !isRecurring;
    setIsRecurring(newIsRecurring);
    onRecurringChange(newIsRecurring, frequency, sessions);
  };

  const handleFrequencyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newFrequency = e.target.value;
    setFrequency(newFrequency);
    onRecurringChange(isRecurring, newFrequency, sessions);
  };

  const handleSessionsChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newSessions = parseInt(e.target.value, 10);
    setSessions(newSessions);
    onRecurringChange(isRecurring, frequency, newSessions);
  };

  return (
    <div className="p-4 rounded-lg bg-card border border-border mt-4">
      <div className="flex items-center justify-between">
        <label htmlFor="recurring-toggle" className="text-text font-medium">
          Reservar sesión recurrente
        </label>
        <div
          onClick={handleRecurringToggle}
          className={`w-14 h-8 flex items-center bg-gray-600 rounded-full p-1 cursor-pointer transition-colors duration-300 ${isRecurring ? 'bg-primary' : 'bg-surface'}`}
        >
          <div
            className={`bg-white w-6 h-6 rounded-full shadow-md transform transition-transform duration-300 ${isRecurring ? 'translate-x-6' : ''}`}
          ></div>
        </div>
        <input id="recurring-toggle" type="checkbox" className="hidden" checked={isRecurring} onChange={() => {}} />
      </div>

      {isRecurring && (
        <div className="mt-4 space-y-4">
          <div>
            <label htmlFor="frequency" className="block text-sm font-medium text-textSecondary mb-1">
              Frecuencia
            </label>
            <select
              id="frequency"
              value={frequency}
              onChange={handleFrequencyChange}
              className="w-full p-2 rounded-md bg-surface border border-border text-text focus:ring-2 focus:ring-focus"
            >
              <option value="semanal">Semanal</option>
              <option value="quincenal">Quincenal</option>
            </select>
          </div>
          <div>
            <label htmlFor="sessions" className="block text-sm font-medium text-textSecondary mb-1">
              Número de sesiones
            </label>
            <select
              id="sessions"
              value={sessions}
              onChange={handleSessionsChange}
              className="w-full p-2 rounded-md bg-surface border border-border text-text focus:ring-2 focus:ring-focus"
            >
              <option value={4}>4 semanas</option>
              <option value={8}>8 semanas</option>
              <option value={12}>12 semanas</option>
            </select>
          </div>
        </div>
      )}
    </div>
  );
};
