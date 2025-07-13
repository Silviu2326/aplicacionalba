import React from 'react';

interface SuggestedCategoriesProps {
  categories: string[];
  onSelectCategory: (category: string) => void;
}

const SuggestedCategories: React.FC<SuggestedCategoriesProps> = ({ categories, onSelectCategory }) => {
  if (categories.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-wrap gap-2 mt-2">
      <span className="text-sm text-textMuted">Sugerencias:</span>
      {categories.map((category) => (
        <button
          key={category}
          type="button"
          onClick={() => onSelectCategory(category)}
          className="px-3 py-1 text-sm font-medium text-textInverse bg-primary rounded-full hover:bg-primaryHover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-focus"
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default SuggestedCategories;
