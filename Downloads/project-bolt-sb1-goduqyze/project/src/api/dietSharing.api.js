// API para compartir dietas
const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

// Mock storage para enlaces compartidos de dietas
let sharedDiets = new Map();

// Generar un enlace de solo lectura para una dieta
export const generateDietShareLink = async (dietId, options = {}) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        // Generar token único
        const shareToken = generateUniqueToken();
        
        // Configuración por defecto
        const shareConfig = {
          dietId: parseInt(dietId),
          shareToken,
          createdAt: new Date().toISOString(),
          expiresAt: options.expiresAt || null, // null = sin expiración
          showNutritionistInfo: options.showNutritionistInfo !== false, // true por defecto
          isActive: true,
          viewCount: 0,
          lastViewed: null,
          ...options
        };
        
        // Guardar en storage mock
        sharedDiets.set(shareToken, shareConfig);
        
        // Generar URL completa
        const shareUrl = `${window.location.origin}/shared/diet/${shareToken}`;
        
        resolve({
          success: true,
          data: {
            shareToken,
            shareUrl,
            config: shareConfig
          },
          message: 'Enlace de compartir generado exitosamente'
        });
      } catch (error) {
        reject({
          success: false,
          error: 'Error al generar enlace de compartir'
        });
      }
    }, 300);
  });
};

// Obtener dieta compartida por token
export const getSharedDiet = async (shareToken) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        const shareConfig = sharedDiets.get(shareToken);
        
        if (!shareConfig) {
          reject({
            success: false,
            error: 'Enlace no válido o expirado'
          });
          return;
        }
        
        // Verificar si el enlace está activo
        if (!shareConfig.isActive) {
          reject({
            success: false,
            error: 'Este enlace ha sido desactivado'
          });
          return;
        }
        
        // Verificar expiración
        if (shareConfig.expiresAt && new Date() > new Date(shareConfig.expiresAt)) {
          reject({
            success: false,
            error: 'Este enlace ha expirado'
          });
          return;
        }
        
        // Incrementar contador de vistas
        shareConfig.viewCount += 1;
        shareConfig.lastViewed = new Date().toISOString();
        
        // Mock diet data - en producción vendría de la base de datos
        const dietData = {
          id: shareConfig.dietId,
          name: 'Plan Nutricional Personalizado',
          description: 'Dieta balanceada para pérdida de peso y mejora de la composición corporal',
          category: 'weight_loss',
          calories: 1800,
          protein: 140,
          carbs: 180,
          fats: 60,
          fiber: 30,
          duration: '8 semanas',
          mealPlan: [
            {
              id: 1,
              type: 'Desayuno',
              foods: [
                {
                  id: 1,
                  name: 'Avena con frutas',
                  quantity: '80g',
                  calories: 320,
                  protein: 12,
                  carbs: 54,
                  fats: 6
                },
                {
                  id: 2,
                  name: 'Yogur griego',
                  quantity: '150g',
                  calories: 130,
                  protein: 15,
                  carbs: 9,
                  fats: 4
                }
              ]
            },
            {
              id: 2,
              type: 'Almuerzo',
              foods: [
                {
                  id: 3,
                  name: 'Pechuga de pollo',
                  quantity: '150g',
                  calories: 248,
                  protein: 46,
                  carbs: 0,
                  fats: 5
                },
                {
                  id: 4,
                  name: 'Arroz integral',
                  quantity: '100g',
                  calories: 111,
                  protein: 3,
                  carbs: 23,
                  fats: 1
                },
                {
                  id: 5,
                  name: 'Ensalada mixta',
                  quantity: '200g',
                  calories: 40,
                  protein: 2,
                  carbs: 8,
                  fats: 0
                }
              ]
            }
          ],
          nutritionist: {
            name: 'Dr. María González',
            specialization: 'Nutrición Deportiva',
            license: 'NUT-12345'
          }
        };
        
        resolve({
          success: true,
          data: {
            diet: dietData,
            shareConfig: {
              shareToken,
              createdAt: shareConfig.createdAt,
              viewCount: shareConfig.viewCount,
              showNutritionistInfo: shareConfig.showNutritionistInfo
            }
          }
        });
      } catch (error) {
        reject({
          success: false,
          error: 'Error al obtener dieta compartida'
        });
      }
    }, 500);
  });
};

// Desactivar enlace compartido
export const deactivateDietShareLink = async (shareToken) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        const shareConfig = sharedDiets.get(shareToken);
        
        if (!shareConfig) {
          reject({
            success: false,
            error: 'Enlace no encontrado'
          });
          return;
        }
        
        shareConfig.isActive = false;
        
        resolve({
          success: true,
          message: 'Enlace desactivado exitosamente'
        });
      } catch (error) {
        reject({
          success: false,
          error: 'Error al desactivar enlace'
        });
      }
    }, 200);
  });
};

// Obtener estadísticas de enlaces compartidos
export const getDietShareStats = async (dietId) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const dietShares = Array.from(sharedDiets.values())
        .filter(share => share.dietId === parseInt(dietId));
      
      const stats = {
        totalShares: dietShares.length,
        activeShares: dietShares.filter(share => share.isActive).length,
        totalViews: dietShares.reduce((sum, share) => sum + share.viewCount, 0),
        lastShared: dietShares.length > 0 
          ? Math.max(...dietShares.map(share => new Date(share.createdAt).getTime()))
          : null
      };
      
      resolve({
        success: true,
        data: stats
      });
    }, 200);
  });
};

// Obtener todos los enlaces compartidos de un nutricionista
export const getNutritionistSharedDiets = async (nutritionistId) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // En producción, esto filtrarían por nutritionistId
      const nutritionistShares = Array.from(sharedDiets.entries()).map(([token, config]) => ({
        shareToken: token,
        dietId: config.dietId,
        dietName: 'Plan Nutricional Personalizado', // Mock data
        createdAt: config.createdAt,
        expiresAt: config.expiresAt,
        isActive: config.isActive,
        viewCount: config.viewCount,
        lastViewed: config.lastViewed,
        shareUrl: `${window.location.origin}/shared/diet/${token}`
      }));
      
      resolve({
        success: true,
        data: nutritionistShares
      });
    }, 300);
  });
};

// Función auxiliar para generar tokens únicos
function generateUniqueToken() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < 32; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

// Validar token de compartir
export const validateDietShareToken = async (shareToken) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const shareConfig = sharedDiets.get(shareToken);
      const isValid = shareConfig && 
                     shareConfig.isActive && 
                     (!shareConfig.expiresAt || new Date() <= new Date(shareConfig.expiresAt));
      
      resolve({
        success: true,
        data: { isValid }
      });
    }, 100);
  });
};