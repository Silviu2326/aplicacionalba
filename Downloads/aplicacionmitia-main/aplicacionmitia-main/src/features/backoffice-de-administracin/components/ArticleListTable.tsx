
import React from 'react';

export const ArticleListTable = ({ articles, onEdit, onDelete }) => {
  return (
    <div className="bg-card p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Gestor de Contenidos</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-border">
          <thead className="bg-surface">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-textMuted uppercase tracking-wider">
                Título
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-textMuted uppercase tracking-wider">
                Categorías
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-textMuted uppercase tracking-wider">
                Estado
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-textMuted uppercase tracking-wider">
                Fecha de Creación
              </th>
              <th scope="col" className="relative px-6 py-3">
                <span className="sr-only">Acciones</span>
              </th>
            </tr>
          </thead>
          <tbody className="bg-card divide-y divide-border">
            {articles.map(article => (
              <tr key={article.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-text">{article.title}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-textMuted">
                    {article.categories.map(cat => cat.name).join(', ')}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    article.status === 'published' ? 'bg-successLight text-successDark' : 'bg-warningLight text-warningDark'
                  }`}>
                    {article.status === 'published' ? 'Publicado' : 'Borrador'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-textMuted">
                  {new Date(article.created_at).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button onClick={() => onEdit(article)} className="text-primary hover:text-primaryDark mr-4">
                    Editar
                  </button>
                  <button onClick={() => onDelete(article.id)} className="text-error hover:text-errorDark">
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
