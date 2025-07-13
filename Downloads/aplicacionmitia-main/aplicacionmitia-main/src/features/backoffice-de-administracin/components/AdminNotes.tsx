import React, { useState } from 'react';

interface Note {
  id: number;
  text: string;
  createdAt: string;
  author: string;
}

const AdminNotes: React.FC<{ userId: string }> = ({ userId }) => {
  const [notes, setNotes] = useState<Note[]>([
    {
      id: 1,
      text: 'El usuario reportó un problema con la pasarela de pagos el 15/07/2025.',
      createdAt: '2025-07-15T10:00:00Z',
      author: 'AdminUser1',
    },
    {
      id: 2,
      text: 'Se contactó al usuario para verificar su identidad. Pendiente de respuesta.',
      createdAt: '2025-07-16T14:30:00Z',
      author: 'AdminUser2',
    },
  ]);
  const [newNote, setNewNote] = useState('');

  const handleAddNote = () => {
    if (newNote.trim() === '') return;

    const note: Note = {
      id: notes.length + 1,
      text: newNote,
      createdAt: new Date().toISOString(),
      author: 'CurrentUserAdmin', // This would be dynamically set in a real app
    };

    setNotes([...notes, note]);
    setNewNote('');
  };

  return (
    <div className="bg-surface p-6 rounded-lg shadow-lg">
      <h3 className="text-xl font-bold text-text mb-4">Notas Administrativas</h3>
      <div className="space-y-4">
        <textarea
          className="w-full p-3 bg-backgroundSecondary text-textSecondary rounded-md border border-border focus:ring-2 focus:ring-focus focus:border-focus transition"
          rows={4}
          placeholder="Añadir una nueva nota sobre el usuario..."
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
        />
        <button
          onClick={handleAddNote}
          className="px-4 py-2 bg-primary text-textInverse font-semibold rounded-md hover:bg-primaryHover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors"
        >
          Añadir Nota
        </button>
      </div>
      <div className="mt-6 space-y-4">
        {notes.length > 0 ? (
          notes.map((note) => (
            <div key={note.id} className="bg-card p-4 rounded-md border border-borderLight">
              <p className="text-textSecondary">{note.text}</p>
              <div className="text-right text-xs text-textMuted mt-2">
                <span>{note.author} - </span>
                <span>{new Date(note.createdAt).toLocaleString()}</span>
              </div>
            </div>
          ))
        ) : (
          <p className="text-textMuted">No hay notas para este usuario.</p>
        )}
      </div>
    </div>
  );
};

export default AdminNotes;
