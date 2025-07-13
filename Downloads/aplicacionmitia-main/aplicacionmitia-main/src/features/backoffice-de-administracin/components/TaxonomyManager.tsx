
import React, { useState, useEffect } from 'react';
import { getTaxonomy, addTaxonomy, updateTaxonomy, deleteTaxonomy } from '../api';

interface TaxonomyItem {
  id: number;
  name: string;
}

interface TaxonomyManagerProps {
  taxonomyType: 'article' | 'professional'; // Extend with more types as needed
}

const TaxonomyManager: React.FC<TaxonomyManagerProps> = ({ taxonomyType }) => {
  const [items, setItems] = useState<TaxonomyItem[]>([]);
  const [newItemName, setNewItemName] = useState('');
  const [editingItem, setEditingItem] = useState<TaxonomyItem | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [taxonomyName, setTaxonomyName] = useState('');
  const [apiBaseUrl, setApiBaseUrl] = useState('');

  useEffect(() => {
    if (taxonomyType === 'article') {
      setTaxonomyName('Categorías de Artículos');
      setApiBaseUrl('/api/articles/categories');
    } else if (taxonomyType === 'professional') {
      setTaxonomyName('Especialidades de Profesionales');
      setApiBaseUrl('/api/professionals/specialties');
    }
    // Add other taxonomy types here
  }, [taxonomyType]);

  useEffect(() => {
    if (!apiBaseUrl) return;

    const fetchItems = async () => {
      try {
        setIsLoading(true);
        const data = await getTaxonomy(apiBaseUrl);
        setItems(data);
        setError(null);
      } catch (err) {
        setError(`Error al cargar ${taxonomyName}.`);
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchItems();
  }, [apiBaseUrl, taxonomyName]);

  const handleAddItem = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItemName.trim()) return;

    try {
      const newItem = await addTaxonomy(apiBaseUrl, { name: newItemName });
      setItems([...items, newItem]);
      setNewItemName('');
    } catch (err) {
      setError(`Error al añadir el nuevo ítem.`);
      console.error(err);
    }
  };

  const handleDeleteItem = async (id: number) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este ítem?')) {
      try {
        await deleteTaxonomy(apiBaseUrl, id);
        setItems(items.filter((item) => item.id !== id));
      } catch (err) {
        setError(`Error al eliminar el ítem.`);
        console.error(err);
      }
    }
  };

  const handleEditItem = (item: TaxonomyItem) => {
    setEditingItem({ ...item });
  };

  const handleUpdateItem = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem || !editingItem.name.trim()) return;

    try {
      const updatedItem = await updateTaxonomy(apiBaseUrl, editingItem.id, { name: editingItem.name });
      setItems(items.map((item) => (item.id === editingItem.id ? updatedItem : item)));
      setEditingItem(null);
    } catch (err) {
      setError(`Error al actualizar el ítem.`);
      console.error(err);
    }
  };

  const handleCancelEdit = () => {
    setEditingItem(null);
  };

  if (!taxonomyName) {
    return <div className="text-error">Tipo de taxonomía no especificado.</div>;
  }

  return (
    <div className="bg-card p-6 rounded-lg shadow-lg w-full max-w-2xl mx-auto my-8">
      <h3 className="text-xl font-bold text-text mb-4 border-b border-border pb-2">Gestionar {taxonomyName}</h3>

      {error && <p className="text-error mb-4">{error}</p>}

      <form onSubmit={handleAddItem} className="flex gap-4 mb-6">
        <input
          type="text"
          value={newItemName}
          onChange={(e) => setNewItemName(e.target.value)}
          placeholder={`Añadir nueva ${taxonomyName.slice(0, -1).toLowerCase()}`}
          className="flex-grow bg-surface border border-border rounded-md py-2 px-4 text-text focus:outline-none focus:ring-2 focus:ring-focus"
        />
        <button type="submit" className="bg-primary hover:bg-primaryHover text-textInverse font-bold py-2 px-4 rounded-md transition-colors duration-300">
          Añadir
        </button>
      </form>

      {isLoading ? (
        <p className="text-textMuted">Cargando...</p>
      ) : (
        <ul className="space-y-4">
          {items.map((item) => (
            <li key={item.id} className="bg-surface p-4 rounded-md flex items-center justify-between shadow">
              {editingItem && editingItem.id === item.id ? (
                <form onSubmit={handleUpdateItem} className="flex-grow flex items-center gap-4">
                  <input
                    type="text"
                    value={editingItem.name}
                    onChange={(e) => setEditingItem({ ...editingItem, name: e.target.value })}
                    className="flex-grow bg-backgroundSecondary border border-border rounded-md py-1 px-3 text-text focus:outline-none focus:ring-2 focus:ring-focus"
                    autoFocus
                  />
                  <div className="flex gap-2">
                    <button type="submit" className="text-success hover:text-successDark transition-colors duration-300">
                      Guardar
                    </button>
                    <button type="button" onClick={handleCancelEdit} className="text-textMuted hover:text-text transition-colors duration-300">
                      Cancelar
                    </button>
                  </div>
                </form>
              ) : (
                <>
                  <span className="text-textSecondary">{item.name}</span>
                  <div className="flex items-center gap-4">
                    <button onClick={() => handleEditItem(item)} className="text-accent hover:text-accentHover transition-colors duration-300">
                      Editar
                    </button>
                    <button onClick={() => handleDeleteItem(item.id)} className="text-error hover:text-errorDark transition-colors duration-300">
                      Eliminar
                    </button>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TaxonomyManager;
