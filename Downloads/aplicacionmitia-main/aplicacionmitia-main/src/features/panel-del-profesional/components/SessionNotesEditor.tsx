
import React, { useState } from 'react';

interface SessionNotesEditorProps {
  sessionId: string;
  professionalId: string;
  initialNotes?: string;
}

const SessionNotesEditor: React.FC<SessionNotesEditorProps> = ({ sessionId, professionalId, initialNotes = '' }) => {
  const [notes, setNotes] = useState(initialNotes);
  const [isSaving, setIsSaving] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    console.log('Saving notes for session:', sessionId, 'by professional:', professionalId);
    // Aquí iría la llamada a la API para guardar las notas.
    // await saveSessionNotes(sessionId, professionalId, notes);
    
    setTimeout(() => {
      setIsSaving(false);
      setShowConfirmation(true);
      setTimeout(() => setShowConfirmation(false), 2000);
    }, 1000);
  };

  return (
    <div className="bg-card p-6 rounded-lg shadow-lg w-full max-w-2xl mx-auto border border-border">
      <h2 className="text-2xl font-bold text-text mb-4">Notas de la Sesión</h2>
      <p className="text-textMuted mb-6">
        Estas notas son privadas y solo visibles para ti. Utiliza este espacio para registrar el progreso y planificar futuras intervenciones.
      </p>
      
      <div className="relative">
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="w-full h-64 p-4 bg-backgroundSecondary text-text rounded-md border border-borderLight focus:ring-2 focus:ring-focus focus:border-focus transition-colors duration-200"
          placeholder="Escribe tus notas aquí..."
        />
        {/* Aquí se podrían añadir controles de formato de texto en el futuro */}
      </div>

      <div className="mt-6 flex items-center justify-end space-x-4">
        {showConfirmation && (
          <span className="text-success transition-opacity duration-300 ease-in-out">
            ¡Guardado!
          </span>
        )}
        <button
          onClick={handleSave}
          disabled={isSaving}
          className="px-6 py-2 bg-primary text-textInverse font-semibold rounded-lg shadow-md hover:bg-primaryHover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:bg-disabled disabled:cursor-not-allowed transition-all duration-200"
        >
          {isSaving ? 'Guardando...' : 'Guardar Notas'}
        </button>
      </div>
    </div>
  );
};

export default SessionNotesEditor;
