
import React from 'react';

interface PersonalNoteProps {
  note: string;
  setNote: (note: string) => void;
  maxLength?: number;
}

const PersonalNote: React.FC<PersonalNoteProps> = ({ note, setNote, maxLength = 500 }) => {
  const remainingChars = maxLength - note.length;
  const isNearLimit = remainingChars < 50;
  const isAtLimit = remainingChars === 0;

  return (
    <div className="bg-gradient-surface p-6 rounded-xl border border-border shadow-lg">
      <div className="flex items-center space-x-3 mb-4">
        <div className="p-2 bg-accent/10 rounded-lg">
          <svg className="w-6 h-6 text-accent" fill="currentColor" viewBox="0 0 20 20">
            <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
          </svg>
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-bold text-text">
            Nota Personal para el Profesional
          </h3>
          <p className="text-sm text-textMuted">
            Comparte información adicional que consideres relevante (opcional)
          </p>
        </div>
      </div>
      
      <div className="relative">
        <textarea
          id="personal-note"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          maxLength={maxLength}
          className={`
            w-full p-4 bg-backgroundSecondary border-2 rounded-xl transition-all duration-300
            focus:ring-4 focus:ring-primary/20 focus:border-primary
            placeholder-textMuted text-text resize-none
            ${
              note.length > 0
                ? 'border-primary/50'
                : 'border-border hover:border-primary/30'
            }
          `}
          placeholder="Ejemplo: Me gustaría enfocarme en técnicas de manejo de la ansiedad y estrés laboral. También tengo experiencia previa con terapia cognitivo-conductual..."
          rows={5}
        />
        
        {note.length > 0 && (
          <div className="absolute top-3 right-3">
            <div className="p-1 bg-primary/10 rounded-full">
              <svg className="w-4 h-4 text-primary" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
        )}
      </div>
      
      <div className="flex items-center justify-between mt-4">
        <div className="flex items-center space-x-2">
          <svg className="w-4 h-4 text-info" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
          <span className="text-xs text-info">
            Esta información será privada y solo visible para el profesional
          </span>
        </div>
        
        <div className={`
          px-3 py-1 rounded-full text-xs font-medium transition-colors duration-300
          ${
            isAtLimit
              ? 'bg-error/10 text-error'
              : isNearLimit
              ? 'bg-warning/10 text-warning'
              : 'bg-success/10 text-success'
          }
        `}>
          {remainingChars} caracteres restantes
        </div>
      </div>
      
      {note.length > 0 && (
        <div className="mt-4 p-3 bg-primary/5 border border-primary/20 rounded-lg">
          <div className="flex items-start space-x-2">
            <svg className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
            <p className="text-xs text-primary">
              Tu nota será incluida en la reserva y ayudará al profesional a prepararse mejor para la sesión.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default PersonalNote;
