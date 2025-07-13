
import React, { useState, useEffect } from 'react';

interface JournalEntryEditorProps {
  entry?: any;
  onSave: (entry: any) => void;
  onClose: () => void;
}

export const JournalEntryEditor: React.FC<JournalEntryEditorProps> = ({ entry, onSave, onClose }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState<string[]>([]);

  useEffect(() => {
    if (entry) {
      setTitle(entry.title);
      setContent(entry.content);
      setTags(entry.tags || []);
    }
  }, [entry]);

  const handleSave = () => {
    onSave({
      id: entry?.id || Date.now().toString(),
      title,
      content,
      tags,
      date: new Date().toISOString(),
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-overlay flex justify-center items-center z-50">
      <div className="bg-card rounded-lg shadow-xl p-6 w-full max-w-2xl text-text">
        <h3 className="text-xl font-bold mb-4">{entry ? 'Editar Entrada' : 'Nueva Entrada'}</h3>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Título de la entrada"
          className="w-full p-2 border border-border bg-surface rounded-md mb-4"
        />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Escribe tus pensamientos..."
          className="w-full p-2 border border-border bg-surface rounded-md mb-4 h-48"
        />
        <div className="flex justify-end space-x-2">
          <button onClick={onClose} className="px-4 py-2 bg-muted rounded-md">Cancelar</button>
          <button onClick={handleSave} className="px-4 py-2 bg-primary text-textInverse rounded-md">Guardar</button>
        </div>
      </div>
    </div>
  );
};
