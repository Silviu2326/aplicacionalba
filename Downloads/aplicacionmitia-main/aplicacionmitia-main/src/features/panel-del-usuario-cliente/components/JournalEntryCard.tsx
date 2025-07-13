
import React from 'react';

interface JournalEntryCardProps {
  entry: any;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export const JournalEntryCard: React.FC<JournalEntryCardProps> = ({ entry, onEdit, onDelete }) => {
  return (
    <div className="bg-card p-4 rounded-lg border border-border">
      <div className="flex justify-between items-start">
        <div>
          <h4 className="font-bold text-lg text-text">{entry.title}</h4>
          <p className="text-sm text-textMuted">{new Date(entry.date).toLocaleDateString()}</p>
        </div>
        <div className="flex space-x-2">
          <button onClick={() => onEdit(entry.id)} className="text-primary hover:underline">Editar</button>
          <button onClick={() => onDelete(entry.id)} className="text-error hover:underline">Eliminar</button>
        </div>
      </div>
      <p className="mt-2 text-textSecondary">{entry.content}</p>
      <div className="mt-2 flex space-x-2">
        {entry.tags?.map((tag: string) => (
          <span key={tag} className="px-2 py-1 bg-primaryLight text-primaryDark text-xs font-semibold rounded-full">{tag}</span>
        ))}
      </div>
    </div>
  );
};
