
import { useState, useEffect, useCallback } from 'react';
import { getCategories, getProfessionals, getInsurances } from '../api';
import { DateRange } from '../components/AvailabilityFilter';

interface Category {
  id: string;
  name: string;
}

interface Professional {
  id: string;
  name: string;
  location: {
    lat: number;
    lng: number;
  };
  acceptsNewClients: boolean;
  modality: string[];
  matchScore?: number;
  matchReasons?: string[];
  languages: string[];
  freeConsultation?: boolean;
  // Add other professional properties as needed
}

export const usePaginadeBusqueda = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [insurances, setInsurances] = useState<string[]>([]);
  const [professionals, setProfessionals] = useState<Professional[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  const [selectedDateRange, setSelectedDateRange] = useState<DateRange>({ from: undefined, to: undefined });
  const [insurance, setInsurance] = useState('');
  const [sort, setSort] = useState('relevance'); // Default sort
  const [isAcceptingNewClients, setIsAcceptingNewClients] = useState(false);
  const [freeConsultation, setFreeConsultation] = useState(false);
  const [keyword, setKeyword] = useState('');
  const [selectedModality, setSelectedModality] = useState('');
  const [loading, setLoading] = useState(false);
  const [view, setView] = useState<'list' | 'map'>('list');
  const [geolocationStatus, setGeolocationStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [geolocationError, setGeolocationError] = useState<string | null>(null);
  const [comparisonList, setComparisonList] = useState<string[]>([]);
  const [quizAnswers, setQuizAnswers] = useState<any | null>(null);
  const MAX_COMPARISON_ITEMS = 4;

  useEffect(() => {
    const fetchInitialData = async () => {
      const fetchedCategories = await getCategories();
      setCategories(fetchedCategories);
      const fetchedInsurances = await getInsurances();
      setInsurances(fetchedInsurances);
    };
    fetchInitialData();

    const storedAnswers = localStorage.getItem('quizAnswers');
    if (storedAnswers) {
      setQuizAnswers(JSON.parse(storedAnswers));
    }
  }, []);

  const fetchProfessionals = useCallback(async (coords?: { latitude: number; longitude: number }) => {
    setLoading(true);
    // Pass sort, coords and quizAnswers to the API call
    const fetchedProfessionals = await getProfessionals(selectedCategories, selectedDateRange, insurance, sort, isAcceptingNewClients, keyword, selectedModality, selectedLanguages, freeConsultation, coords, quizAnswers);
    const professionalsWithLocation = fetchedProfessionals.map(p => ({
      ...p,
      location: {
        lat: 40.416775 + (Math.random() - 0.5) * 2, // Randomize around Madrid
        lng: -3.703790 + (Math.random() - 0.5) * 2
      }
    }));
    setProfessionals(professionalsWithLocation);
    setLoading(false);
  }, [selectedCategories, selectedDateRange, insurance, sort, isAcceptingNewClients, keyword, selectedModality, selectedLanguages, freeConsultation, quizAnswers]);


  useEffect(() => {
    if (geolocationStatus !== 'loading') {
      fetchProfessionals();
    }
  }, [fetchProfessionals, geolocationStatus]);

  const handleCategorySelectionChange = (categoryIds: string[]) => {
    setSelectedCategories(categoryIds);
  };

  const handleDateChange = (range: DateRange) => {
    setSelectedDateRange(range);
  };

  const handleViewChange = (newView: 'list' | 'map') => {
    setView(newView);
  };

  const handleSortChange = (newSort: string) => {
    setSort(newSort);
  };

  const handleGeolocationSuccess = (coords: { latitude: number; longitude: number }) => {
    setGeolocationStatus('success');
    setGeolocationError(null);
    fetchProfessionals(coords);
  };

  const handleGeolocationError = (error: GeolocationPositionError) => {
    setGeolocationStatus('error');
    switch (error.code) {
      case error.PERMISSION_DENIED:
        setGeolocationError("Se denegó el permiso para la geolocalización.");
        break;
      case error.POSITION_UNAVAILABLE:
        setGeolocationError("La información de ubicación no está disponible.");
        break;
      case error.TIMEOUT:
        setGeolocationError("Se agotó el tiempo de espera de la solicitud de geolocalización.");
        break;
      default:
        setGeolocationError("Ocurrió un error desconocido.");
        break;
    }
  };

  const handleToggleCompare = (professionalId: string) => {
    setComparisonList(prevList => {
      if (prevList.includes(professionalId)) {
        return prevList.filter(id => id !== professionalId);
      }
      if (prevList.length < MAX_COMPARISON_ITEMS) {
        return [...prevList, professionalId];
      }
      // Optionally, show a notification that the limit is reached
      return prevList;
    });
  };

  const handleRemoveFromCompare = (professionalId: string) => {
    setComparisonList(prevList => prevList.filter(id => id !== professionalId));
  };

  const getComparedProfessionals = () => {
    return professionals.filter(p => comparisonList.includes(p.id));
  };

  const applyFilters = (filters: any) => {
    setSelectedCategories(filters.categoryIds || []);
    setSelectedLanguages(filters.languages || []);
    setSelectedDateRange(filters.dateRange || { from: undefined, to: undefined });
    setInsurance(filters.insurance || '');
    setSort(filters.sort || 'relevance');
    setIsAcceptingNewClients(filters.isAcceptingNewClients || false);
    setFreeConsultation(filters.freeConsultation || false);
    setKeyword(filters.keyword || '');
    setSelectedModality(filters.modality || '');
  };

  const currentFilters = {
    categoryIds: selectedCategories,
    languages: selectedLanguages,
    dateRange: selectedDateRange,
    insurance,
    sort,
    isAcceptingNewClients,
    freeConsultation,
    keyword,
    modality: selectedModality,
  };

  return {
    categories,
    insurances,
    professionals,
    loading,
    view,
    selectedDateRange,
    sort,
    keyword,
    setKeyword,
    insurance,
    isAcceptingNewClients,
    setIsAcceptingNewClients,
    freeConsultation,
    setFreeConsultation,
    geolocationStatus,
    geolocationError,
    comparisonList,
    selectedModality,
    setSelectedModality,
    selectedLanguages,
    setSelectedLanguages,
    handleCategorySelectionChange,
    handleDateChange,
    handleViewChange,
    handleSortChange,
    setInsurance,
    handleGeolocationSuccess,
    handleGeolocationError,
    handleToggleCompare,
    handleRemoveFromCompare,
    getComparedProfessionals,
    MAX_COMPARISON_ITEMS,
    applyFilters,
    currentFilters,
    fetchProfessionals,
    quizAnswers,
  };
};
