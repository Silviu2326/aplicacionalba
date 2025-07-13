
import React from 'react';

interface Publication {
  id: string;
  title: string;
  excerpt: string;
  url: string;
  publicationDate: string;
  imageUrl?: string;
}

interface PublishedContentSectionProps {
  publications: Publication[];
}

const PublishedContentSection: React.FC<PublishedContentSectionProps> = ({ publications }) => {
  if (!publications || publications.length === 0) {
    return null;
  }

  return (
    <section className="bg-backgroundSecondary p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-text mb-6">Artículos y Publicaciones</h2>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {publications.slice(0, 5).map((publication) => (
          <div key={publication.id} className="bg-card rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 ease-in-out">
            {publication.imageUrl && (
              <img src={publication.imageUrl} alt={publication.title} className="w-full h-48 object-cover" />
            )}
            <div className="p-6">
              <p className="text-sm text-textMuted mb-2">{new Date(publication.publicationDate).toLocaleDateString()}</p>
              <h3 className="text-xl font-semibold text-text mb-3">{publication.title}</h3>
              <p className="text-textSecondary mb-4">{publication.excerpt}</p>
              <a
                href={publication.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block text-primary hover:text-primaryHover font-semibold transition-colors duration-300"
              >
                Leer más &rarr;
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PublishedContentSection;
