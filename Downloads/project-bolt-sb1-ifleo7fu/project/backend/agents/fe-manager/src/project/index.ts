/**
 * Módulo de gestión de proyectos para FE Manager
 * 
 * Este módulo proporciona funcionalidades para:
 * - Clonación dinámica de repositorios desde githubUrl
 * - Gestión de directorios temporales
 * - Análisis de estructura de proyectos
 * - Validación y configuración de proyectos
 */

export { ProjectCloner } from './ProjectCloner';
export type { ProjectConfig, CloneResult } from './ProjectCloner';

export { ProjectService } from './ProjectService';
export type { 
  ProjectInfo, 
  ProjectSetupResult 
} from './ProjectService';

export { ProjectUtils } from './ProjectUtils';
export type { 
  ProjectStructure, 
  ProjectPaths 
} from './ProjectUtils';

// Re-exportar tipos útiles
export type {
  ProjectConfig as IProjectConfig,
  CloneResult as ICloneResult,
  ProjectInfo as IProjectInfo,
  ProjectSetupResult as IProjectSetupResult,
  ProjectStructure as IProjectStructure,
  ProjectPaths as IProjectPaths
};

/**
 * Configuración por defecto para el módulo de proyectos
 */
export const PROJECT_CONFIG = {
  // Directorio base para proyectos temporales
  TEMP_DIR_BASE: 'temp',
  
  // Patrón para nombres de directorios temporales
  TEMP_DIR_PATTERN: 'backend_gen_{projectId}_{timestamp}',
  
  // Tiempo máximo para mantener directorios temporales (24 horas)
  MAX_TEMP_DIR_AGE: 24 * 60 * 60 * 1000,
  
  // Profundidad máxima para búsqueda de archivos
  MAX_SEARCH_DEPTH: 3,
  
  // Opciones de clonación de git
  GIT_CLONE_OPTIONS: {
    '--depth': 1,
    '--single-branch': null
  },
  
  // Frameworks soportados
  SUPPORTED_FRAMEWORKS: [
    'react',
    'vue', 
    'angular',
    'svelte',
    'next',
    'nuxt'
  ] as const,
  
  // Package managers soportados
  SUPPORTED_PACKAGE_MANAGERS: [
    'npm',
    'yarn',
    'pnpm'
  ] as const
};

/**
 * Tipos de framework soportados
 */
export type SupportedFramework = typeof PROJECT_CONFIG.SUPPORTED_FRAMEWORKS[number];

/**
 * Tipos de package manager soportados
 */
export type SupportedPackageManager = typeof PROJECT_CONFIG.SUPPORTED_PACKAGE_MANAGERS[number];

/**
 * Utilidad para crear una instancia del ProjectService
 */
export function createProjectService(prisma: any) {
  return new ProjectService(prisma);
}

/**
 * Utilidad para crear una instancia del ProjectCloner
 */
export function createProjectCloner(prisma: any, baseDir?: string) {
  return new ProjectCloner(prisma, baseDir);
}

/**
 * Función de utilidad para validar una URL de GitHub
 */
export function validateGithubUrl(url: string): boolean {
  try {
    const parsedUrl = new URL(url);
    return (
      parsedUrl.hostname === 'github.com' ||
      parsedUrl.hostname === 'www.github.com'
    );
  } catch {
    return false;
  }
}

/**
 * Función de utilidad para generar un nombre de directorio temporal
 */
export function generateTempDirName(projectId: string): string {
  const timestamp = Date.now();
  return `backend_gen_${projectId}_${timestamp}`;
}

/**
 * Función de utilidad para parsear un nombre de directorio temporal
 */
export function parseTempDirName(dirName: string): { projectId: string; timestamp: number } | null {
  const match = dirName.match(/^backend_gen_(.+)_(\d+)$/);
  if (!match) return null;
  
  return {
    projectId: match[1],
    timestamp: parseInt(match[2], 10)
  };
}

export default {
  ProjectCloner,
  ProjectService,
  ProjectUtils,
  PROJECT_CONFIG,
  createProjectService,
  createProjectCloner,
  validateGithubUrl,
  generateTempDirName,
  parseTempDirName
};