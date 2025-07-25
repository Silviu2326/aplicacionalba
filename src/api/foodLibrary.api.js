// API para la biblioteca de alimentos
const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

// Base de datos mock de alimentos con información nutricional
const FOOD_DATABASE = [
  // Proteínas
  {
    id: 1,
    name: 'Pechuga de pollo',
    nameEn: 'Chicken breast',
    category: 'protein',
    standardPortion: { amount: 100, unit: 'g' },
    macros: {
      calories: 165,
      protein: 31,
      carbs: 0,
      fats: 3.6,
      fiber: 0
    },
    searchTerms: ['pollo', 'pechuga', 'chicken', 'breast', 'proteína']
  },
  {
    id: 2,
    name: 'Salmón',
    nameEn: 'Salmon',
    category: 'protein',
    standardPortion: { amount: 100, unit: 'g' },
    macros: {
      calories: 208,
      protein: 25.4,
      carbs: 0,
      fats: 12.4,
      fiber: 0
    },
    searchTerms: ['salmón', 'salmon', 'pescado', 'fish', 'omega']
  },
  {
    id: 3,
    name: 'Huevos',
    nameEn: 'Eggs',
    category: 'protein',
    standardPortion: { amount: 1, unit: 'pieza' },
    macros: {
      calories: 70,
      protein: 6,
      carbs: 0.6,
      fats: 5,
      fiber: 0
    },
    searchTerms: ['huevo', 'huevos', 'egg', 'eggs', 'proteína']
  },
  {
    id: 4,
    name: 'Atún en agua',
    nameEn: 'Tuna in water',
    category: 'protein',
    standardPortion: { amount: 100, unit: 'g' },
    macros: {
      calories: 116,
      protein: 25.5,
      carbs: 0,
      fats: 0.8,
      fiber: 0
    },
    searchTerms: ['atún', 'tuna', 'pescado', 'fish', 'lata']
  },
  
  // Carbohidratos
  {
    id: 5,
    name: 'Arroz integral',
    nameEn: 'Brown rice',
    category: 'carbs',
    standardPortion: { amount: 100, unit: 'g' },
    macros: {
      calories: 111,
      protein: 2.6,
      carbs: 23,
      fats: 0.9,
      fiber: 1.8
    },
    searchTerms: ['arroz', 'rice', 'integral', 'brown', 'carbohidrato']
  },
  {
    id: 6,
    name: 'Avena',
    nameEn: 'Oats',
    category: 'carbs',
    standardPortion: { amount: 50, unit: 'g' },
    macros: {
      calories: 190,
      protein: 6.7,
      carbs: 32.3,
      fats: 3.4,
      fiber: 5.4
    },
    searchTerms: ['avena', 'oats', 'cereal', 'desayuno', 'fibra']
  },
  {
    id: 7,
    name: 'Batata',
    nameEn: 'Sweet potato',
    category: 'carbs',
    standardPortion: { amount: 100, unit: 'g' },
    macros: {
      calories: 86,
      protein: 1.6,
      carbs: 20.1,
      fats: 0.1,
      fiber: 3
    },
    searchTerms: ['batata', 'sweet potato', 'camote', 'boniato', 'tubérculo']
  },
  {
    id: 8,
    name: 'Quinoa',
    nameEn: 'Quinoa',
    category: 'carbs',
    standardPortion: { amount: 100, unit: 'g' },
    macros: {
      calories: 120,
      protein: 4.4,
      carbs: 21.3,
      fats: 1.9,
      fiber: 2.8
    },
    searchTerms: ['quinoa', 'quinua', 'pseudocereal', 'proteína vegetal']
  },
  
  // Verduras
  {
    id: 9,
    name: 'Brócoli',
    nameEn: 'Broccoli',
    category: 'vegetables',
    standardPortion: { amount: 100, unit: 'g' },
    macros: {
      calories: 25,
      protein: 3,
      carbs: 5,
      fats: 0.3,
      fiber: 2.6
    },
    searchTerms: ['brócoli', 'broccoli', 'verdura', 'vegetable', 'verde']
  },
  {
    id: 10,
    name: 'Espinacas',
    nameEn: 'Spinach',
    category: 'vegetables',
    standardPortion: { amount: 100, unit: 'g' },
    macros: {
      calories: 23,
      protein: 2.9,
      carbs: 3.6,
      fats: 0.4,
      fiber: 2.2
    },
    searchTerms: ['espinacas', 'spinach', 'verdura', 'hoja verde', 'hierro']
  },
  
  // Frutas
  {
    id: 11,
    name: 'Plátano',
    nameEn: 'Banana',
    category: 'fruits',
    standardPortion: { amount: 1, unit: 'pieza' },
    macros: {
      calories: 89,
      protein: 1.1,
      carbs: 22.8,
      fats: 0.3,
      fiber: 2.6
    },
    searchTerms: ['plátano', 'banana', 'fruta', 'fruit', 'potasio']
  },
  {
    id: 12,
    name: 'Manzana',
    nameEn: 'Apple',
    category: 'fruits',
    standardPortion: { amount: 1, unit: 'pieza' },
    macros: {
      calories: 52,
      protein: 0.3,
      carbs: 13.8,
      fats: 0.2,
      fiber: 2.4
    },
    searchTerms: ['manzana', 'apple', 'fruta', 'fruit', 'fibra']
  },
  
  // Grasas saludables
  {
    id: 13,
    name: 'Aguacate',
    nameEn: 'Avocado',
    category: 'fats',
    standardPortion: { amount: 100, unit: 'g' },
    macros: {
      calories: 160,
      protein: 2,
      carbs: 8.5,
      fats: 14.7,
      fiber: 6.7
    },
    searchTerms: ['aguacate', 'avocado', 'palta', 'grasa saludable', 'omega']
  },
  {
    id: 14,
    name: 'Almendras',
    nameEn: 'Almonds',
    category: 'fats',
    standardPortion: { amount: 30, unit: 'g' },
    macros: {
      calories: 173,
      protein: 6.4,
      carbs: 6.1,
      fats: 14.8,
      fiber: 3.7
    },
    searchTerms: ['almendras', 'almonds', 'frutos secos', 'nuts', 'vitamina E']
  },
  {
    id: 15,
    name: 'Aceite de oliva',
    nameEn: 'Olive oil',
    category: 'fats',
    standardPortion: { amount: 1, unit: 'cucharada' },
    macros: {
      calories: 119,
      protein: 0,
      carbs: 0,
      fats: 13.5,
      fiber: 0
    },
    searchTerms: ['aceite', 'olive oil', 'oliva', 'grasa', 'cocinar']
  },
  
  // Lácteos
  {
    id: 16,
    name: 'Yogur griego natural',
    nameEn: 'Greek yogurt',
    category: 'dairy',
    standardPortion: { amount: 100, unit: 'g' },
    macros: {
      calories: 59,
      protein: 10,
      carbs: 3.6,
      fats: 0.4,
      fiber: 0
    },
    searchTerms: ['yogur', 'yogurt', 'griego', 'greek', 'probióticos', 'lácteo']
  },
  {
    id: 17,
    name: 'Leche desnatada',
    nameEn: 'Skim milk',
    category: 'dairy',
    standardPortion: { amount: 200, unit: 'ml' },
    macros: {
      calories: 68,
      protein: 6.8,
      carbs: 9.6,
      fats: 0.2,
      fiber: 0
    },
    searchTerms: ['leche', 'milk', 'desnatada', 'skim', 'calcio', 'lácteo']
  }
];

// Obtener todos los alimentos de la biblioteca
export const getFoodLibrary = async (searchTerm = '', category = 'all') => {
  try {
    // TODO: Implementar llamada real a la API
    // const queryParams = new URLSearchParams({ search: searchTerm, category });
    // const response = await fetch(`${BASE_URL}/food-library?${queryParams}`);
    // if (!response.ok) throw new Error('Error fetching food library');
    // return await response.json();
    
    // Combinar alimentos estándar y personalizados
    const customFoods = await getCustomFoods();
    let allFoods = [...FOOD_DATABASE, ...customFoods];
    
    // Filtrar por categoría
    if (category !== 'all') {
      allFoods = allFoods.filter(food => food.category === category);
    }
    
    // Filtrar por término de búsqueda
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      allFoods = allFoods.filter(food => 
        food.searchTerms.some(term => term.toLowerCase().includes(searchLower)) ||
        food.name.toLowerCase().includes(searchLower) ||
        food.nameEn.toLowerCase().includes(searchLower)
      );
    }
    
    return allFoods;
  } catch (error) {
    console.error('Error getting food library:', error);
    throw error;
  }
};

// Buscar alimentos con autocompletado
export const searchFoods = async (searchTerm) => {
  try {
    // TODO: Implementar llamada real a la API
    // const response = await fetch(`${BASE_URL}/food-library/search?q=${encodeURIComponent(searchTerm)}`);
    // if (!response.ok) throw new Error('Error searching foods');
    // return await response.json();
    
    if (!searchTerm || searchTerm.length < 2) {
      return [];
    }
    
    const searchLower = searchTerm.toLowerCase();
    
    // Buscar en alimentos estándar
    const standardResults = FOOD_DATABASE.filter(food => 
      food.searchTerms.some(term => term.toLowerCase().includes(searchLower)) ||
      food.name.toLowerCase().includes(searchLower) ||
      food.nameEn.toLowerCase().includes(searchLower)
    );
    
    // Buscar en alimentos personalizados
    const customFoods = await getCustomFoods();
    const customResults = customFoods.filter(food => 
      food.searchTerms.some(term => term.toLowerCase().includes(searchLower)) ||
      food.name.toLowerCase().includes(searchLower) ||
      food.nameEn.toLowerCase().includes(searchLower)
    );
    
    // Combinar resultados y limitar a 10
    const allResults = [...standardResults, ...customResults];
    return allResults.slice(0, 10);
  } catch (error) {
    console.error('Error searching foods:', error);
    throw error;
  }
};

// Obtener alimento por ID
export const getFoodById = async (foodId) => {
  try {
    // TODO: Implementar llamada real a la API
    // const response = await fetch(`${BASE_URL}/food-library/${foodId}`);
    // if (!response.ok) throw new Error('Error fetching food');
    // return await response.json();
    
    const food = FOOD_DATABASE.find(f => f.id === parseInt(foodId));
    if (!food) {
      throw new Error('Alimento no encontrado');
    }
    return food;
  } catch (error) {
    console.error('Error getting food:', error);
    throw error;
  }
};

// Funciones para alimentos personalizados
export const getCustomFoods = async () => {
  try {
    const customFoods = JSON.parse(localStorage.getItem('customFoods') || '[]');
    return customFoods;
  } catch (error) {
    console.error('Error getting custom foods:', error);
    return [];
  }
};

export const saveCustomFood = async (foodData) => {
  try {
    const customFoods = await getCustomFoods();
    const newFood = {
      id: `custom_${Date.now()}`,
      name: foodData.name,
      nameEn: foodData.nameEn || foodData.name,
      category: 'custom',
      standardPortion: {
        amount: foodData.quantity,
        unit: foodData.unit
      },
      macros: {
        calories: foodData.calories,
        protein: foodData.protein,
        carbs: foodData.carbs,
        fats: foodData.fats,
        fiber: foodData.fiber
      },
      searchTerms: [foodData.name.toLowerCase()],
      isCustom: true,
      createdAt: new Date().toISOString()
    };
    
    const updatedCustomFoods = [...customFoods, newFood];
    localStorage.setItem('customFoods', JSON.stringify(updatedCustomFoods));
    return newFood;
  } catch (error) {
    console.error('Error saving custom food:', error);
    throw error;
  }
};

export const deleteCustomFood = async (foodId) => {
  try {
    const customFoods = await getCustomFoods();
    const updatedCustomFoods = customFoods.filter(food => food.id !== foodId);
    localStorage.setItem('customFoods', JSON.stringify(updatedCustomFoods));
    return true;
  } catch (error) {
    console.error('Error deleting custom food:', error);
    throw error;
  }
};

// Obtener alimentos favoritos del usuario
export const getFavoriteFoods = async () => {
  try {
    // TODO: Implementar llamada real a la API
    // const response = await fetch(`${BASE_URL}/food-library/favorites`);
    // if (!response.ok) throw new Error('Error fetching favorite foods');
    // return await response.json();
    
    // Mock data - en una implementación real, esto vendría del backend
    const favoriteIds = JSON.parse(localStorage.getItem('favoriteFoods') || '[]');
    const standardFoods = FOOD_DATABASE.filter(food => favoriteIds.includes(food.id));
    const customFoods = await getCustomFoods();
    const favoriteCustomFoods = customFoods.filter(food => favoriteIds.includes(food.id));
    return [...standardFoods, ...favoriteCustomFoods];
  } catch (error) {
    console.error('Error getting favorite foods:', error);
    throw error;
  }
};

// Agregar alimento a favoritos
export const addToFavorites = async (foodId) => {
  try {
    // TODO: Implementar llamada real a la API
    // const response = await fetch(`${BASE_URL}/food-library/favorites`, {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ foodId })
    // });
    // if (!response.ok) throw new Error('Error adding to favorites');
    // return await response.json();
    
    // Mock implementation usando localStorage
    const favoriteIds = JSON.parse(localStorage.getItem('favoriteFoods') || '[]');
    if (!favoriteIds.includes(foodId)) {
      favoriteIds.push(foodId);
      localStorage.setItem('favoriteFoods', JSON.stringify(favoriteIds));
    }
    return { success: true, message: 'Alimento agregado a favoritos' };
  } catch (error) {
    console.error('Error adding to favorites:', error);
    throw error;
  }
};

// Remover alimento de favoritos
export const removeFromFavorites = async (foodId) => {
  try {
    // TODO: Implementar llamada real a la API
    // const response = await fetch(`${BASE_URL}/food-library/favorites/${foodId}`, {
    //   method: 'DELETE'
    // });
    // if (!response.ok) throw new Error('Error removing from favorites');
    // return await response.json();
    
    // Mock implementation usando localStorage
    const favoriteIds = JSON.parse(localStorage.getItem('favoriteFoods') || '[]');
    const updatedFavorites = favoriteIds.filter(id => id !== foodId);
    localStorage.setItem('favoriteFoods', JSON.stringify(updatedFavorites));
    return { success: true, message: 'Alimento removido de favoritos' };
  } catch (error) {
    console.error('Error removing from favorites:', error);
    throw error;
  }
};

// Obtener categorías de alimentos
export const getFoodCategories = async () => {
  try {
    // Simular delay de API
    await new Promise(resolve => setTimeout(resolve, 50));
    
    return [
      { id: 'all', name: 'Todos', nameEn: 'All' },
      { id: 'protein', name: 'Proteínas', nameEn: 'Proteins' },
      { id: 'carbs', name: 'Carbohidratos', nameEn: 'Carbohydrates' },
      { id: 'vegetables', name: 'Vegetales', nameEn: 'Vegetables' },
      { id: 'fruits', name: 'Frutas', nameEn: 'Fruits' },
      { id: 'fats', name: 'Grasas saludables', nameEn: 'Healthy Fats' },
      { id: 'dairy', name: 'Lácteos', nameEn: 'Dairy' },
      { id: 'custom', name: 'Alimentos personalizados', nameEn: 'Custom Foods' }
    ];
  } catch (error) {
    console.error('Error fetching food categories:', error);
    throw error;
  }
};