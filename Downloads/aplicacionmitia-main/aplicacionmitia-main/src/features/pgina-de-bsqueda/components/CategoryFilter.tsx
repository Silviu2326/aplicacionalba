
import React, { useState } from 'react';

interface Category {
  id: string;
  name: string;
}

interface CategoryFilterProps {
  categories: Category[];
  onSelectionChange: (selectedCategoryIds: string[]) => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({ categories = [], onSelectionChange }) => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const handleCategoryToggle = (categoryId: string) => {
    const newSelectedCategories = selectedCategories.includes(categoryId)
      ? selectedCategories.filter((id) => id !== categoryId)
      : [...selectedCategories, categoryId];
    setSelectedCategories(newSelectedCategories);
    onSelectionChange(newSelectedCategories);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-2 text-left bg-surface text-text rounded-md focus:outline-none focus:ring-2 focus:ring-focus border border-border hover:bg-backgroundSecondary transition-colors"
      >
        Categoría de servicio
        <svg className={`float-right h-5 w-5 transform transition-transform ${isOpen ? 'rotate-180' : ''}`} fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
      </button>
      {isOpen && (
        <div className="absolute z-10 w-full mt-2 bg-surface rounded-md shadow-lg border border-border">
          <ul className="max-h-60 overflow-auto">
            {categories.map((category) => (
              <li
                key={category.id}
                className="px-4 py-2 cursor-pointer hover:bg-backgroundSecondary text-textSecondary hover:text-text transition-colors"
                onClick={() => handleCategoryToggle(category.id)}
              >
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(category.id)}
                  onChange={() => handleCategoryToggle(category.id)}
                  className="mr-2 h-4 w-4 text-primary focus:ring-focus border-border bg-surface rounded"
                />
                {category.name}
              </li>
            ))}
          </ul>
        </div>
      )}
      <div className="flex flex-wrap gap-2 mt-2">
        {selectedCategories.map((categoryId) => {
          const category = categories.find((c) => c.id === categoryId);
          return (
            <span key={categoryId} className="px-3 py-1 text-sm rounded-full bg-primary text-textInverse flex items-center">
              {category?.name}
              <button
                onClick={() => handleCategoryToggle(categoryId)}
                className="ml-2 text-textInverse hover:text-textMuted transition-colors"
              >
                &times;
              </button>
            </span>
          );
        })}
      </div>
    </div>
  );
};

export default CategoryFilter;
