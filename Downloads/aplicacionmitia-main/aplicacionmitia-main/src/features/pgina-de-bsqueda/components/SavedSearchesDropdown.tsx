import React, { useState } from 'react';

export interface SavedSearch {
  id: string;
  name: string;
  filters: any;
}

interface SavedSearchesDropdownProps {
  savedSearches: SavedSearch[];
  onSelect: (filters: any) => void;
  onDelete: (id: string) => void;
}

const SavedSearchesDropdown: React.FC<SavedSearchesDropdownProps> = ({ savedSearches, onSelect, onDelete }) => {
  const [isOpen, setIsOpen] = useState(false);

  if (!savedSearches.length) {
    return null;
  }

  return (
    <div className="relative inline-block text-left">
      <div>
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="inline-flex justify-center w-full rounded-md border border-border shadow-sm px-4 py-2 bg-surface text-sm font-medium text-textSecondary hover:bg-backgroundSecondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-focus"
        >
          Mis Búsquedas
          <svg className="-mr-1 ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
      </div>

      {isOpen && (
        <div className="origin-top-right absolute right-0 mt-2 w-64 rounded-md shadow-lg bg-card ring-1 ring-black ring-opacity-5 z-10">
          <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
            {savedSearches.map((search) => (
              <div key={search.id} className="flex items-center justify-between px-4 py-2 text-sm text-text hover:bg-surface">
                <button
                  onClick={() => {
                    onSelect(search.filters);
                    setIsOpen(false);
                  }}
                  className="flex-grow text-left"
                >
                  {search.name}
                </button>
                <button
                  onClick={() => onDelete(search.id)}
                  className="ml-2 text-error hover:text-errorDark"
                >
                  <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm4 0a1 1 0 012 0v6a1 1 0 11-2 0V8z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SavedSearchesDropdown;