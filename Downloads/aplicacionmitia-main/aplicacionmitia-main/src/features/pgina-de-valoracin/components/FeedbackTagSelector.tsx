import React, { useState } from 'react';

const tagsPositivos = ['Puntualidad', 'Escucha activa', 'Entorno seguro', 'Empatía', 'Claridad'];
const tagsMejora = ['Retrasos', 'Interrupciones', 'Poca profundidad', 'Falta de seguimiento'];

interface FeedbackTagSelectorProps {
  onTagsChange: (tags: string[]) => void;
}

const FeedbackTagSelector: React.FC<FeedbackTagSelectorProps> = ({ onTagsChange }) => {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const handleTagClick = (tag: string) => {
    const newSelectedTags = selectedTags.includes(tag)
      ? selectedTags.filter((t) => t !== tag)
      : [...selectedTags, tag];
    setSelectedTags(newSelectedTags);
    onTagsChange(newSelectedTags);
  };

  const renderTags = (tags: string[], group: 'positive' | 'improvement') => (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag) => {
        const isSelected = selectedTags.includes(tag);
        const baseClasses = 'cursor-pointer rounded-full px-4 py-2 text-sm font-medium transition-colors';
        const selectedClasses = group === 'positive' 
          ? 'bg-success text-textInverse' 
          : 'bg-warning text-textInverse';
        const unselectedClasses = 'bg-backgroundSecondary text-text hover:bg-surface';
        
        return (
          <span
            key={tag}
            onClick={() => handleTagClick(tag)}
            className={`${baseClasses} ${isSelected ? selectedClasses : unselectedClasses}`}
          >
            {tag}
          </span>
        );
      })}
    </div>
  );

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-text mb-3">Aspectos positivos</h3>
        {renderTags(tagsPositivos, 'positive')}
      </div>
      <div>
        <h3 className="text-lg font-semibold text-text mb-3">Áreas de mejora</h3>
        {renderTags(tagsMejora, 'improvement')}
      </div>
    </div>
  );
};

export default FeedbackTagSelector;