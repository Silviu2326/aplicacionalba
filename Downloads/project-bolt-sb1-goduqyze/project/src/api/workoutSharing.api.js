// API para compartir rutinas de entrenamiento
const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

// Mock storage para enlaces compartidos
let sharedWorkouts = new Map();

// Generar un enlace de solo lectura para una rutina
export const generateShareLink = async (workoutId, options = {}) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        // Generar token único
        const shareToken = generateUniqueToken();
        
        // Configuración por defecto
        const shareConfig = {
          workoutId: parseInt(workoutId),
          shareToken,
          createdAt: new Date().toISOString(),
          expiresAt: options.expiresAt || null, // null = sin expiración
          allowComments: options.allowComments || false,
          showTrainerInfo: options.showTrainerInfo !== false, // true por defecto
          isActive: true,
          viewCount: 0,
          lastViewed: null,
          ...options
        };
        
        // Guardar en storage mock
        sharedWorkouts.set(shareToken, shareConfig);
        
        // Generar URL completa
        const shareUrl = `${window.location.origin}/shared/workout/${shareToken}`;
        
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

// Obtener rutina compartida por token
export const getSharedWorkout = async (shareToken) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        const shareConfig = sharedWorkouts.get(shareToken);
        
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
        
        // Mock workout data - en producción vendría de la base de datos
        const workoutData = {
          id: shareConfig.workoutId,
          name: 'Rutina de Fuerza - Principiante',
          description: 'Rutina básica de fuerza para desarrollar masa muscular y mejorar la condición física general',
          category: 'strength',
          difficulty: 'beginner',
          duration: 45,
          targetMuscles: ['Pecho', 'Espalda', 'Piernas', 'Hombros'],
          exercises: [
            {
              id: 1,
              name: 'Sentadillas',
              muscleGroup: 'Piernas',
              sets: 3,
              reps: '12-15',
              rest: '60s',
              notes: 'Mantener la espalda recta y bajar hasta 90 grados',
              equipment: 'Peso corporal'
            },
            {
              id: 2,
              name: 'Press de banca',
              muscleGroup: 'Pecho',
              sets: 3,
              reps: '10-12',
              rest: '90s',
              notes: 'Controlar el movimiento, especialmente en la bajada',
              equipment: 'Barra y discos'
            },
            {
              id: 3,
              name: 'Remo con barra',
              muscleGroup: 'Espalda',
              sets: 3,
              reps: '10-12',
              rest: '90s',
              notes: 'Mantener el torso firme y tirar hacia el abdomen',
              equipment: 'Barra y discos'
            },
            {
              id: 4,
              name: 'Press militar',
              muscleGroup: 'Hombros',
              sets: 3,
              reps: '8-10',
              rest: '90s',
              notes: 'Mantener el core activado durante todo el movimiento',
              equipment: 'Barra y discos'
            }
          ],
          warmup: [
            { exercise: 'Caminar en cinta', duration: '5 min' },
            { exercise: 'Movilidad articular', duration: '5 min' }
          ],
          cooldown: [
            { exercise: 'Estiramientos estáticos', duration: '10 min' }
          ],
          trainerInfo: shareConfig.showTrainerInfo ? {
            name: 'Carlos Martínez',
            title: 'Entrenador Personal Certificado',
            experience: '5 años de experiencia',
            specialties: ['Fuerza', 'Hipertrofia', 'Rehabilitación']
          } : null,
          createdDate: '2024-01-15'
        };
        
        resolve({
          success: true,
          data: {
            workout: workoutData,
            shareConfig: {
              allowComments: shareConfig.allowComments,
              showTrainerInfo: shareConfig.showTrainerInfo,
              viewCount: shareConfig.viewCount,
              createdAt: shareConfig.createdAt
            }
          }
        });
      } catch (error) {
        reject({
          success: false,
          error: 'Error al obtener rutina compartida'
        });
      }
    }, 500);
  });
};

// Obtener estadísticas de enlaces compartidos
export const getShareStats = async (workoutId) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const workoutShares = Array.from(sharedWorkouts.values())
        .filter(share => share.workoutId === parseInt(workoutId));
      
      const stats = {
        totalShares: workoutShares.length,
        activeShares: workoutShares.filter(share => share.isActive).length,
        totalViews: workoutShares.reduce((sum, share) => sum + share.viewCount, 0),
        lastShared: workoutShares.length > 0 
          ? Math.max(...workoutShares.map(share => new Date(share.createdAt).getTime()))
          : null
      };
      
      resolve({
        success: true,
        data: stats
      });
    }, 200);
  });
};

// Desactivar enlace compartido
export const deactivateShareLink = async (shareToken) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shareConfig = sharedWorkouts.get(shareToken);
      
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
    }, 200);
  });
};

// Obtener todos los enlaces compartidos de un entrenador
export const getTrainerSharedWorkouts = async (trainerId) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // En producción, esto filtrarían por trainerId
      const trainerShares = Array.from(sharedWorkouts.entries()).map(([token, config]) => ({
        shareToken: token,
        workoutId: config.workoutId,
        workoutName: 'Rutina de Fuerza - Principiante', // Mock data
        createdAt: config.createdAt,
        expiresAt: config.expiresAt,
        isActive: config.isActive,
        viewCount: config.viewCount,
        lastViewed: config.lastViewed,
        shareUrl: `${window.location.origin}/shared/workout/${token}`
      }));
      
      resolve({
        success: true,
        data: trainerShares
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
export const validateShareToken = async (shareToken) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const shareConfig = sharedWorkouts.get(shareToken);
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