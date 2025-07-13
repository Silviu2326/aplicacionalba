
import React, { useState } from 'react';
import { JournalEntryCard } from './JournalEntryCard';
import { JournalEntryEditor } from './JournalEntryEditor';
import { DUMMY_ENTRIES } from '../utils/dummy-data'; // Asegúrate de crear este archivo con datos de ejemplo

export const PrivateJournal: React.FC = () => {
  const [entries, setEntries] = useState(DUMMY_ENTRIES);
  const [isEditing, setIsEditing] = useState<string | null>(null);

  const handleSave = (entry: any) => {
    if (isEditing) {
      setEntries(entries.map((e) => (e.id === isEditing ? entry : e)));
    } else {
      setEntries([entry, ...entries]);
    }
    setIsEditing(null);
  };

  const handleEdit = (id: string) => {
    setIsEditing(id);
  };

  const handleDelete = (id: string) => {
    setEntries(entries.filter((e) => e.id !== id));
  };

  const currentEntry = isEditing ? entries.find((e) => e.id === isEditing) : null;

  return (
    <div className="p-6 bg-surface rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-textSecondary">Mi Diario Privado</h2>
      <p className="text-sm text-textMuted mb-6">
        <span className="font-semibold">Importante:</span> Este diario es completamente privado. Tus entradas no serán compartidas con tu terapeuta ni con nadie más.
      </p>
      
      <div className="mb-6">
        <button
          onClick={() => setIsEditing('new')}
          className="bg-primary hover:bg-primaryHover text-textInverse font-bold py-2 px-4 rounded-lg transition duration-300"
        >
          Crear Nueva Entrada
        </button>
      </div>

      {isEditing && (
        <JournalEntryEditor
          entry={currentEntry}
          onSave={handleSave}
          onClose={() => setIsEditing(null)}
        />
      )}

      <div className="space-y-4">
        {entries.map((entry) => (
          <JournalEntryCard
            key={entry.id}
            entry={entry}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
};
