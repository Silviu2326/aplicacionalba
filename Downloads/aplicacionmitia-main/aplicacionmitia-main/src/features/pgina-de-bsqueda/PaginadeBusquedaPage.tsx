import React, { useState, useEffect } from 'react';
import { usePaginadeBusqueda } from './hooks/usePaginadeBusqueda';
import ViewToggle from './components/ViewToggle';
import ResultsMapView from './components/ResultsMapView';
import FiltersPanel from './components/FiltersPanel';
import ProfessionalCard from './components/ProfessionalCard';
import ComparisonTray from './components/ComparisonTray';
import ComparisonModal from './components/ComparisonModal';
import SaveSearchButton from './components/SaveSearchButton';
import SavedSearchesDropdown, { SavedSearch } from './components/SavedSearchesDropdown';
import { getUserSearches, saveUserSearch, deleteUserSearch } from './api';
import KeywordSearchBar from './components/KeywordSearchBar';
import SortOptions from './components/SortOptions';
import ResultsCounter from './components/ResultsCounter';
import { Link } from 'react-router-dom';

const PaginadeBusquedaPage: React.FC = () => {
  const { 
    professionals, 
    loading, 
    view,
    isAcceptingNewClients,
    setIsAcceptingNewClients,
    selectedModality,
    setSelectedModality,
    selectedLanguages,
    setSelectedLanguages,
    freeConsultation,
    setFreeConsultation,
    handleViewChange,
    comparisonList,
    handleToggleCompare,
    handleRemoveFromCompare,
    getComparedProfessionals,
    MAX_COMPARISON_ITEMS,
    applyFilters,
    currentFilters,
    keyword,
    setKeyword,
    fetchProfessionals,
    sort,
    handleSortChange,
    quizAnswers,
  } = usePaginadeBusqueda();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [savedSearches, setSavedSearches] = useState<SavedSearch[]>([]);
  
  // TODO: Replace with real authentication check
  const isUserAuthenticated = true; 

  useEffect(() => {
    if (isUserAuthenticated) {
      const fetchSearches = async () => {
        const searches = await getUserSearches();
        setSavedSearches(searches);
      };
      fetchSearches();
    }
  }, [isUserAuthenticated]);

  const handleSaveSearch = async (name: string) => {
    const newSearch = await saveUserSearch(currentFilters, name);
    setSavedSearches([...savedSearches, newSearch]);
  };

  const handleDeleteSearch = async (id: string) => {
    await deleteUserSearch(id);
    setSavedSearches(savedSearches.filter((s) => s.id !== id));
  };

  const handleSelectSearch = (filters: any) => {
    applyFilters(filters);
  };

  const comparedProfessionals = getComparedProfessionals();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-backgroundSecondary to-background p-4 md:p-8 text-text">
      <div className="max-w-7xl mx-auto">
        {/* Header con gradiente y animación */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent mb-4 animate-pulse">
            Encuentra tu Terapeuta Ideal
          </h1>
          <p className="text-lg text-textSecondary max-w-2xl mx-auto">
            Descubre profesionales de la salud mental que se adapten perfectamente a tus necesidades
          </p>
        </div>
        
        {/* Barra de herramientas mejorada */}
        <div className="bg-surface/80 backdrop-blur-sm rounded-2xl p-4 mb-6 shadow-lg border border-border/50">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 md:space-x-4">
            <div className="flex flex-wrap items-center gap-3">
              <SortOptions 
                currentSort={sort}
                onSortChange={handleSortChange}
                showCompatibilityOption={!!quizAnswers}
              />
              {isUserAuthenticated && (
                <div className="flex items-center space-x-2">
                  <SaveSearchButton onSave={handleSaveSearch} />
                  <SavedSearchesDropdown 
                    savedSearches={savedSearches}
                    onSelect={handleSelectSearch}
                    onDelete={handleDeleteSearch}
                  />
                </div>
              )}
            </div>
            <ViewToggle view={view} onViewChange={handleViewChange} />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Panel de filtros mejorado */}
          <div className="lg:col-span-1 space-y-4">
            <div className="sticky top-4">
              <KeywordSearchBar 
                keyword={keyword}
                setKeyword={setKeyword}
                onSearch={() => fetchProfessionals()}
              />
              <FiltersPanel 
                isAcceptingNewClients={isAcceptingNewClients}
                setIsAcceptingNewClients={setIsAcceptingNewClients}
                selectedModality={selectedModality}
                setSelectedModality={setSelectedModality}
                selectedLanguages={selectedLanguages}
                setSelectedLanguages={setSelectedLanguages}
                freeConsultation={freeConsultation}
                setFreeConsultation={setFreeConsultation}
              />
            </div>
          </div>
          
          {/* Área de resultados mejorada */}
          <div className="lg:col-span-3">
            <div className="mb-6">
              <ResultsCounter count={professionals.length} />
            </div>
            
            {!quizAnswers && (
              <div className="bg-gradient-to-r from-info/10 to-accent/10 border border-info/30 rounded-2xl p-6 mb-6 text-center shadow-lg backdrop-blur-sm">
                <div className="flex items-center justify-center mb-4">
                  <svg className="w-12 h-12 text-info mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                  <div>
                    <p className="font-bold text-lg text-info mb-2">¿Quieres encontrar a tu terapeuta ideal?</p>
                    <p className="text-sm text-info/80 mb-4">Completa nuestro cuestionario rápido para ver puntuaciones de compatibilidad personalizadas.</p>
                  </div>
                </div>
                <Link 
                  to="/" 
                  className="inline-flex items-center bg-gradient-to-r from-info to-accent text-white font-bold py-3 px-6 rounded-full hover:shadow-lg transform hover:scale-105 transition-all duration-300"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  Hacer el cuestionario
                </Link>
              </div>
            )}
            {loading ? (
              <div className="flex flex-col items-center justify-center py-16">
                <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary mb-4"></div>
                <p className="text-lg text-textSecondary animate-pulse">Buscando los mejores profesionales para ti...</p>
              </div>
            ) : (
              <>
                {view === 'list' && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                    {professionals.map((professional: any, index) => (
                      <div 
                        key={professional.id}
                        className="animate-fadeIn"
                        style={{ animationDelay: `${index * 0.1}s` }}
                      >
                        <ProfessionalCard
                          professional={professional}
                          isSelected={comparisonList.includes(professional.id)}
                          onToggleSelection={handleToggleCompare}
                        />
                      </div>
                    ))}
                  </div>
                )}
                {view === 'map' && (
                  <div className="bg-card rounded-2xl shadow-xl overflow-hidden border border-border/50">
                    <ResultsMapView professionals={professionals} />
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      <ComparisonTray
        selectedProfessionals={comparedProfessionals}
        onRemove={handleRemoveFromCompare}
        onCompare={() => setIsModalOpen(true)}
        maxSelection={MAX_COMPARISON_ITEMS}
      />

      {isModalOpen && (
        <ComparisonModal
          professionals={comparedProfessionals}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
};

export default PaginadeBusquedaPage;
