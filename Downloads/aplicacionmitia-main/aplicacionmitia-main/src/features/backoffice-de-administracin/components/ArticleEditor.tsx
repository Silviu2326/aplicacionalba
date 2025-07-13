
import React, { useState, useEffect } from 'react';
import TaxonomyManager from './TaxonomyManager';

// Mock data for categories - replace with API call
const mockCategories = [
  { id: 'cat1', name: 'Salud Mental' },
  { id: 'cat2', name: 'Terapia de Pareja' },
  { id: 'cat3', name: 'Ansiedad' },
];

export const ArticleEditor = ({ article, onSave, onCancel }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [status, setStatus] = useState('draft');
  const [selectedCategories, setSelectedCategories] = useState([]);

  useEffect(() => {
    if (article) {
      setTitle(article.title);
      setContent(article.content);
      setStatus(article.status);
      setSelectedCategories(article.categories.map(cat => cat.id));
    }
  }, [article]);

  const handleSave = () => {
    const newArticle = {
      ...article,
      title,
      content,
      status,
      categories: mockCategories.filter(cat => selectedCategories.includes(cat.id)),
    };
    onSave(newArticle);
  };

  const handleCategoryChange = (categoryId) => {
    setSelectedCategories(prev =>
      prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  return (
    <div className="bg-card p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">{article ? 'Editar Artículo' : 'Crear Artículo'}</h2>
      
      <div className="mb-4">
        <label htmlFor="title" className="block text-sm font-medium text-textSecondary">Título</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mt-1 block w-full px-3 py-2 bg-surface border border-border rounded-md shadow-sm focus:outline-none focus:ring-focus focus:border-focus sm:text-sm"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="content" className="block text-sm font-medium text-textSecondary">Contenido</label>
        <textarea
          id="content"
          rows="10"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="mt-1 block w-full px-3 py-2 bg-surface border border-border rounded-md shadow-sm focus:outline-none focus:ring-focus focus:border-focus sm:text-sm"
          placeholder="Escribe tu artículo aquí..."
        ></textarea>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-textSecondary">Categorías</label>
        <div className="mt-2 space-y-2">
            {mockCategories.map(category => (
              <div key={category.id} className="flex items-center">
                <input
                  id={`category-${category.id}`}
                  name="categories"
                  type="checkbox"
                  checked={selectedCategories.includes(category.id)}
                  onChange={() => handleCategoryChange(category.id)}
                  className="h-4 w-4 text-primary focus:ring-focus border-border rounded"
                />
                <label htmlFor={`category-${category.id}`} className="ml-3 text-sm text-textSecondary">
                  {category.name}
                </label>
              </div>
            ))}
        </div>
        <div className="mt-4">
          <TaxonomyManager taxonomyType="article" />
        </div>
      </div>

      <div className="mb-6">
        <label htmlFor="status" className="block text-sm font-medium text-textSecondary">Estado</label>
        <select
          id="status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-border focus:outline-none focus:ring-focus focus:border-focus sm:text-sm rounded-md"
        >
          <option value="draft">Borrador</option>
          <option value="published">Publicado</option>
        </select>
      </div>

      <div className="flex justify-end space-x-4">
        <button
          onClick={onCancel}
          className="px-4 py-2 bg-surface text-text rounded-md hover:bg-borderLight"
        >
          Cancelar
        </button>
        <button
          onClick={handleSave}
          className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primaryHover"
        >
          Guardar
        </button>
      </div>
    </div>
  );
};
