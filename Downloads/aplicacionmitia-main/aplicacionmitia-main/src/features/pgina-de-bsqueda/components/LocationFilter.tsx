import React, { useState } from 'react';
import { Button } from '../../../components/Button';

interface LocationFilterProps {
  onSearch: (location: string) => void;
}

const LocationFilter: React.FC<LocationFilterProps> = ({ onSearch }) => {
  const [location, setLocation] = useState('');

  const handleSearch = () => {
    if (location.trim()) {
      onSearch(location.trim());
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="flex items-center space-x-2">
      <input
        type="text"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Ciudad o código postal"
        className="border border-border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-focus bg-surface text-text placeholder-textMuted flex-1"
      />
      <Button onClick={handleSearch} variant="primary">
        Buscar
      </Button>
    </div>
  );
};

export default LocationFilter;
