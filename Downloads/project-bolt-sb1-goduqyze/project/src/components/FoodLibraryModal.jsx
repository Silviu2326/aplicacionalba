import React, { useState, useEffect, useRef } from 'react';
import { X, Search, Heart, Plus, Filter, Star, ChefHat, Trash2 } from 'lucide-react';
import { 
  getFoodLibrary, 
  searchFoods, 
  getFavoriteFoods, 
  addToFavorites, 
  removeFromFavorites,
  getFoodCategories,
  deleteCustomFood 
} from '../api/foodLibrary.api';
import CreateCustomFoodModal from './CreateCustomFoodModal';

const FoodLibraryModal = ({ isOpen, onClose, onSelectFood }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [allFoods, setAllFoods] = useState([]);
  const [favoriteFoods, setFavoriteFoods] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('search'); // 'search' | 'favorites'
  const [showCreateModal, setShowCreateModal] = useState(false);
  const searchInputRef = useRef(null);
  const suggestionsRef = useRef(null);

  const categories = getFoodCategories();

  // Cargar datos iniciales
  useEffect(() => {
    if (isOpen) {
      loadInitialData();
    }
  }, [isOpen]);

  // Búsqueda con autocompletado
  useEffect(() => {
    const delayedSearch = setTimeout(() => {
      if (searchTerm.length >= 2) {
        performSearch();
      } else {
        setSearchResults([]);
        setShowSuggestions(false);
      }
    }, 300);

    return () => clearTimeout(delayedSearch);
  }, [searchTerm]);

  // Cerrar sugerencias al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        suggestionsRef.current && 
        !suggestionsRef.current.contains(event.target) &&
        !searchInputRef.current.contains(event.target)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const loadInitialData = async () => {
    setLoading(true);
    try {
      const [foods, favorites] = await Promise.all([
        getFoodLibrary('', selectedCategory),
        getFavoriteFoods()
      ]);
      setAllFoods(foods);
      setFavoriteFoods(favorites);
    } catch (error) {
      console.error('Error loading food library:', error);
    } finally {
      setLoading(false);
    }
  };

  const performSearch = async () => {
    try {
      const results = await searchFoods(searchTerm);
      setSearchResults(results);
      setShowSuggestions(true);
    } catch (error) {
      console.error('Error searching foods:', error);
    }
  };

  const handleCategoryChange = async (category) => {
    setSelectedCategory(category);
    try {
      const foods = await getFoodLibrary('', category);
      setAllFoods(foods);
    } catch (error) {
      console.error('Error filtering by category:', error);
    }
  };

  const handleToggleFavorite = async (food) => {
    try {
      const isFavorite = favoriteFoods.some(fav => fav.id === food.id);
      
      if (isFavorite) {
        await removeFromFavorites(food.id);
        setFavoriteFoods(prev => prev.filter(fav => fav.id !== food.id));
      } else {
        await addToFavorites(food.id);
        setFavoriteFoods(prev => [...prev, food]);
      }
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
  };

  const handleSelectFood = (food) => {
    onSelectFood({
      id: food.id,
      name: food.name,
      quantity: food.standardPortion.amount,
      unit: food.standardPortion.unit,
      calories: food.macros.calories,
      protein: food.macros.protein,
      carbs: food.macros.carbs,
      fats: food.macros.fats,
      fiber: food.macros.fiber
    });
    setSearchTerm('');
    setShowSuggestions(false);
  };

  const handleSearchInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchInputFocus = () => {
    if (searchResults.length > 0) {
      setShowSuggestions(true);
    }
  };

  const handleCreateCustomFood = async (customFood) => {
      // Recargar los datos para incluir el nuevo alimento personalizado
      await loadData();
      setShowCreateModal(false);
      // Opcionalmente seleccionar el alimento recién creado
      handleSelectFood(customFood);
    };
 
   const handleDeleteCustomFood = async (foodId) => {
     try {
       await deleteCustomFood(foodId);
       // Recargar los datos para reflejar la eliminación
       await loadData();
       // También remover de favoritos si estaba ahí
       setFavoriteFoods(prev => prev.filter(fav => fav.id !== foodId));
     } catch (error) {
       console.error('Error deleting custom food:', error);
     }
   };

  const FoodCard = ({ food, showAddButton = true }) => {
    const isFavorite = favoriteFoods.some(fav => fav.id === food.id);
    const isCustomFood = food.isCustom || food.source === 'custom';
    
    return (
      <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-medium text-gray-900">{food.name}</h3>
              {isCustomFood && (
                <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                  <ChefHat className="h-3 w-3" />
                  Personalizado
                </span>
              )}
            </div>
            <p className="text-sm text-gray-500">{food.nameEn}</p>
            <p className="text-xs text-gray-400 mt-1">
              {food.standardPortion.amount} {food.standardPortion.unit}
            </p>
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={() => handleToggleFavorite(food)}
              className={`p-1 rounded-full transition-colors ${
                isFavorite 
                  ? 'text-red-500 hover:text-red-600' 
                  : 'text-gray-400 hover:text-red-500'
              }`}
            >
              <Heart className={`h-4 w-4 ${isFavorite ? 'fill-current' : ''}`} />
            </button>
            {isCustomFood && (
              <button
                onClick={() => handleDeleteCustomFood(food.id)}
                className="p-1 rounded-full text-gray-400 hover:text-red-500 transition-colors"
                title="Eliminar alimento personalizado"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-2 text-xs text-gray-600 mb-3">
          <div>Calorías: <span className="font-medium">{food.macros.calories}</span></div>
          <div>Proteína: <span className="font-medium">{food.macros.protein}g</span></div>
          <div>Carbos: <span className="font-medium">{food.macros.carbs}g</span></div>
          <div>Grasas: <span className="font-medium">{food.macros.fats}g</span></div>
        </div>
        
        {showAddButton && (
          <button
            onClick={() => handleSelectFood(food)}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="h-4 w-4" />
            Agregar
          </button>
        )}
      </div>
    );
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Biblioteca de Alimentos</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex justify-between items-center border-b border-gray-200">
          <div className="flex">
            <button
              onClick={() => setActiveTab('search')}
              className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
                activeTab === 'search'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <Search className="h-4 w-4 inline mr-2" />
              Buscar Alimentos
            </button>
            <button
              onClick={() => setActiveTab('favorites')}
              className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
                activeTab === 'favorites'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <Star className="h-4 w-4 inline mr-2" />
              Favoritos ({favoriteFoods.length})
            </button>
          </div>
          
          <div className="px-6">
            <button
              onClick={() => setShowCreateModal(true)}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 transition-colors"
            >
              <ChefHat className="h-4 w-4" />
              Crear Alimento
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-hidden">
          {activeTab === 'search' && (
            <div className="h-full flex flex-col">
              {/* Search and Filters */}
              <div className="p-6 border-b border-gray-200">
                <div className="flex gap-4 mb-4">
                  {/* Search Input */}
                  <div className="flex-1 relative">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <input
                        ref={searchInputRef}
                        type="text"
                        placeholder="Buscar alimentos... (ej: pollo, chicken, proteína)"
                        value={searchTerm}
                        onChange={handleSearchInputChange}
                        onFocus={handleSearchInputFocus}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    
                    {/* Suggestions Dropdown */}
                    {showSuggestions && searchResults.length > 0 && (
                      <div 
                        ref={suggestionsRef}
                        className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-lg shadow-lg z-10 max-h-60 overflow-y-auto mt-1"
                      >
                        {searchResults.map((food) => (
                          <button
                            key={food.id}
                            onClick={() => handleSelectFood(food)}
                            className="w-full text-left px-4 py-3 hover:bg-gray-50 border-b border-gray-100 last:border-b-0"
                          >
                            <div className="flex items-center justify-between">
                              <div>
                                <div className="font-medium text-gray-900">{food.name}</div>
                                <div className="text-sm text-gray-500">
                                  {food.macros.calories} kcal • {food.standardPortion.amount} {food.standardPortion.unit}
                                </div>
                              </div>
                              <Plus className="h-4 w-4 text-blue-600" />
                            </div>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                  
                  {/* Category Filter */}
                  <div className="flex items-center gap-2">
                    <Filter className="h-4 w-4 text-gray-400" />
                    <select
                      value={selectedCategory}
                      onChange={(e) => handleCategoryChange(e.target.value)}
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      {Object.entries(categories).map(([key, label]) => (
                        <option key={key} value={key}>{label}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Food Grid */}
              <div className="flex-1 overflow-y-auto p-6">
                {loading ? (
                  <div className="flex items-center justify-center h-32">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {allFoods.map((food) => (
                      <FoodCard key={food.id} food={food} />
                    ))}
                  </div>
                )}
                
                {!loading && allFoods.length === 0 && (
                  <div className="text-center py-12">
                    <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No se encontraron alimentos</h3>
                    <p className="text-gray-600">Intenta con otros términos de búsqueda o cambia la categoría.</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'favorites' && (
            <div className="h-full overflow-y-auto p-6">
              {favoriteFoods.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {favoriteFoods.map((food) => (
                    <FoodCard key={food.id} food={food} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Heart className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No tienes alimentos favoritos</h3>
                  <p className="text-gray-600 mb-4">
                    Agrega alimentos a favoritos haciendo clic en el corazón para acceder rápidamente a ellos.
                  </p>
                  <button
                    onClick={() => setActiveTab('search')}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Explorar Alimentos
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
        
        {/* Create Custom Food Modal */}
         <CreateCustomFoodModal
           isOpen={showCreateModal}
           onClose={() => setShowCreateModal(false)}
           onFoodCreated={handleCreateCustomFood}
         />
      </div>
    </div>
  );
};

export default FoodLibraryModal;