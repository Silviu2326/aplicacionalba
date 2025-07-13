
import React from 'react';

interface Professional {
  id: string;
  name: string;
  avatar: string;
  specialties: string[];
  price: number;
  availability: string;
  rating: number;
}

interface ComparisonModalProps {
  professionals: Professional[];
  onClose: () => void;
}

const ComparisonModal: React.FC<ComparisonModalProps> = ({ professionals, onClose }) => {
  if (professionals.length === 0) {
    return null;
  }

  const renderFeature = (label: string, value: any, highlight = false) => (
    <div className={`p-4 border-b border-border ${highlight ? 'bg-warningLight font-bold' : ''}`}>
      <p className="font-semibold text-textMuted">{label}</p>
      <p className="text-text">{Array.isArray(value) ? value.join(', ') : value}</p>
    </div>
  );

  const highestRating = Math.max(...professionals.map(p => p.rating));
  const lowestPrice = Math.min(...professionals.map(p => p.price));

  return (
    <div className="fixed inset-0 bg-overlay z-50 flex justify-center items-center">
      <div className="bg-surface rounded-lg shadow-xl w-full max-w-6xl mx-4 my-8">
        <div className="p-6 border-b border-border flex justify-between items-center">
          <h2 className="text-2xl font-bold">Comparar Profesionales</h2>
          <button onClick={onClose} className="text-textMuted hover:text-text text-2xl">&times;</button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-6 overflow-x-auto">
          {professionals.map((prof) => (
            <div key={prof.id} className="border border-border rounded-lg shadow-md">
              <div className="p-4 bg-backgroundSecondary rounded-t-lg text-center">
                <img src={prof.avatar} alt={prof.name} className="w-24 h-24 rounded-full mx-auto mb-4" />
                <h3 className="text-xl font-bold">{prof.name}</h3>
              </div>
              <div className="divide-y divide-border">
                {renderFeature('Especialidades', prof.specialties)}
                {renderFeature('Precio por sesión', `${prof.price}`, prof.price === lowestPrice)}
                {renderFeature('Disponibilidad', prof.availability)}
                {renderFeature('Valoración', `${prof.rating} / 5`, prof.rating === highestRating)}
              </div>
            </div>
          ))}
        </div>
        <div className="p-6 border-t border-border text-right">
          <button
            onClick={onClose}
            className="bg-muted hover:bg-border text-textInverse font-bold py-2 px-4 rounded"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ComparisonModal;
