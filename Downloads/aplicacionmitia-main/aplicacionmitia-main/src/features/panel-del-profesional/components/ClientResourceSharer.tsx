import React from 'react';

const sharedResources = [
  { id: 1, name: 'Guía de Mindfulness.pdf', date: '2023-10-27' },
  { id: 2, name: 'Técnicas de Relajación.mp3', date: '2023-10-25' },
  { id: 3, name: 'Artículo sobre Ansiedad Social', url: 'https://example.com/ansiedad-social', date: '2023-10-22' },
];

const ClientResourceSharer: React.FC = () => {
  return (
    <div className="bg-card p-6 rounded-lg shadow-lg text-text">
      <h3 className="text-xl font-semibold mb-4 text-textSecondary">Recursos Compartidos</h3>

      {/* Upload Area */}
      <div className="border-2 border-dashed border-border rounded-lg p-8 text-center mb-6 hover:border-primary transition-colors">
        <input type="file" className="hidden" id="file-upload" />
        <label htmlFor="file-upload" className="cursor-pointer">
          <p className="text-textMuted">Arrastra y suelta un archivo o <span className="text-primary font-semibold">selecciónalo</span></p>
          <p className="text-xs text-textMuted mt-1">PDF, MP3, o enlaces externos</p>
        </label>
      </div>

      {/* Shared Resources List */}
      <div>
        <h4 className="font-semibold mb-3 text-textSecondary">Archivos Compartidos</h4>
        <ul className="space-y-3">
          {sharedResources.map((resource) => (
            <li
              key={resource.id}
              className="bg-surface p-3 rounded-md flex items-center justify-between"
            >
              <div className="flex items-center">
                <span className="mr-3 text-primary">
                  {resource.url ? '🔗' : '📄'}
                </span>
                <div>
                  <p className="font-medium text-text">{resource.name}</p>
                  <p className="text-xs text-textMuted">Subido: {resource.date}</p>
                </div>
              </div>
              <button className="bg-error text-white px-3 py-1 rounded-md hover:bg-errorDark transition-colors text-sm font-semibold">
                Eliminar
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ClientResourceSharer;
