import React, { useState, useEffect } from 'react';
import { usePaginadeBusqueda } from '../hooks/usePaginadeBusqueda';
import { getInsurances } from '../api';

const InsuranceFilter: React.FC = () => {
  const { setInsurance, insurance } = usePaginadeBusqueda();
  const [inputValue, setInputValue] = useState(insurance);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [allInsurances, setAllInsurances] = useState<string[]>([]);

  useEffect(() => {
    const fetchInsurances = async () => {
      const fetchedInsurances = await getInsurances();
      setAllInsurances(fetchedInsurances);
    };
    fetchInsurances();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    if (value.length > 0) {
      const filteredSuggestions = allInsurances.filter((ins) =>
        ins.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  };

  const handleSelect = (value: string) => {
    setInputValue(value);
    setInsurance(value);
    setSuggestions([]);
  };

  const clearFilter = () => {
    setInputValue('');
    setInsurance('');
    setSuggestions([]);
  };

  return (
    <div className="relative">
      <label htmlFor="insurance-filter" className="block text-sm font-medium text-text mb-2">
        Aseguradora
      </label>
      <div className="relative">
        <input
          id="insurance-filter"
          type="text"
          value={inputValue}
          onChange={handleChange}
          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-border focus:outline-none focus:ring-focus focus:border-focus sm:text-sm rounded-md bg-surface text-text placeholder-textMuted"
          placeholder="Buscar aseguradora..."
        />
        {inputValue && (
          <button
            onClick={clearFilter}
            className="absolute inset-y-0 right-0 pr-3 flex items-center"
            aria-label="Limpiar filtro"
          >
            <svg
              className="h-5 w-5 text-textMuted hover:text-text transition-colors"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        )}
      </div>
      {suggestions.length > 0 && (
        <ul className="absolute z-10 w-full bg-surface border border-border rounded-md mt-1 max-h-60 overflow-auto shadow-lg">
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              onClick={() => handleSelect(suggestion)}
              className="cursor-pointer hover:bg-backgroundSecondary p-2 text-textSecondary hover:text-text transition-colors"
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default InsuranceFilter;
