import React from 'react';
import InsuranceFilter from './InsuranceFilter';
import LocationFilter from './LocationFilter';
import CategoryFilter from './CategoryFilter';
import AvailabilityFilter from './AvailabilityFilter';
import SortOptions from './SortOptions';
import AcceptingNewClientsFilter from './AcceptingNewClientsFilter';
import SessionModalityFilter from './SessionModalityFilter';
import LanguageFilter from './LanguageFilter';
import FreeConsultationFilter from './FreeConsultationFilter';

interface FiltersPanelProps {
  isAcceptingNewClients: boolean;
  setIsAcceptingNewClients: (value: boolean) => void;
  selectedModality: string;
  setSelectedModality: (value: string) => void;
  selectedLanguages: string[];
  setSelectedLanguages: (languages: string[]) => void;
  freeConsultation: boolean;
  setFreeConsultation: (value: boolean) => void;
}

const FiltersPanel: React.FC<FiltersPanelProps> = ({ 
  isAcceptingNewClients, 
  setIsAcceptingNewClients,
  selectedModality,
  setSelectedModality,
  selectedLanguages,
  setSelectedLanguages,
  freeConsultation,
  setFreeConsultation,
}) => {
  return (
    <div className="bg-gradient-to-br from-surface to-surface/80 backdrop-blur-sm p-6 rounded-2xl shadow-xl space-y-6 border border-border/50 hover:shadow-2xl transition-all duration-300">
      <div className="flex items-center mb-6">
        <svg className="w-6 h-6 text-primary mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
        </svg>
        <h2 className="text-xl font-bold bg-gradient-to-r from-text to-textSecondary bg-clip-text text-transparent">
          Filtros de Búsqueda
        </h2>
      </div>
      <div className="space-y-5">
        <div className="p-4 bg-backgroundSecondary/50 rounded-xl border border-border/30 hover:border-primary/30 transition-colors duration-200">
          <LocationFilter />
        </div>
        
        <div className="p-4 bg-backgroundSecondary/50 rounded-xl border border-border/30 hover:border-primary/30 transition-colors duration-200">
          <CategoryFilter />
        </div>
        
        <div className="p-4 bg-backgroundSecondary/50 rounded-xl border border-border/30 hover:border-primary/30 transition-colors duration-200">
          <LanguageFilter
            selectedLanguages={selectedLanguages}
            onChange={setSelectedLanguages}
          />
        </div>
        
        <div className="p-4 bg-backgroundSecondary/50 rounded-xl border border-border/30 hover:border-primary/30 transition-colors duration-200">
          <SessionModalityFilter 
            selectedModality={selectedModality}
            onChange={setSelectedModality}
          />
        </div>
        
        <div className="p-4 bg-backgroundSecondary/50 rounded-xl border border-border/30 hover:border-primary/30 transition-colors duration-200">
          <AvailabilityFilter />
        </div>
        
        <div className="p-4 bg-backgroundSecondary/50 rounded-xl border border-border/30 hover:border-primary/30 transition-colors duration-200">
          <InsuranceFilter />
        </div>
        
        <div className="p-4 bg-backgroundSecondary/50 rounded-xl border border-border/30 hover:border-primary/30 transition-colors duration-200">
          <AcceptingNewClientsFilter 
            isAcceptingNewClients={isAcceptingNewClients}
            setIsAcceptingNewClients={setIsAcceptingNewClients}
          />
        </div>
        
        <div className="p-4 bg-backgroundSecondary/50 rounded-xl border border-border/30 hover:border-primary/30 transition-colors duration-200">
          <FreeConsultationFilter
            isChecked={freeConsultation}
            onChange={setFreeConsultation}
          />
        </div>
        
        <div className="p-4 bg-backgroundSecondary/50 rounded-xl border border-border/30 hover:border-primary/30 transition-colors duration-200">
          <SortOptions />
        </div>
      </div>
    </div>
  );
};

export default FiltersPanel;

