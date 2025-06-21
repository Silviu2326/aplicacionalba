import * as path from 'path';
import * as fs from 'fs/promises';
import { logger } from '../../../../shared/utils/logger';

export interface ProjectStructure {
  hasPackageJson: boolean;
  hasSrcFolder: boolean;
  hasPagesFolder: boolean;
  hasApiFolder: boolean;
  hasComponentsFolder: boolean;
  framework?: 'react' | 'vue' | 'angular' | 'svelte' | 'next' | 'nuxt' | 'unknown';
  packageManager?: 'npm' | 'yarn' | 'pnpm' | 'unknown';
}

export interface ProjectPaths {
  root: string;
  src?: string;
  pages?: string;
  components?: string;
  api?: string;
  public?: string;
  styles?: string;
}

/**
 * Utilidades para analizar y trabajar con la estructura de proyectos clonados
 */
export class ProjectUtils {
  /**
   * Analiza la estructura de un proyecto clonado
   */
  static async analyzeProjectStructure(projectPath: string): Promise<ProjectStructure> {
    try {
      logger.info('Analyzing project structure', { projectPath });

      const structure: ProjectStructure = {
        hasPackageJson: false,
        hasSrcFolder: false,
        hasPagesFolder: false,
        hasApiFolder: false,
        hasComponentsFolder: false
      };

      // Verificar archivos y carpetas principales
      const items = await fs.readdir(projectPath);
      
      for (const item of items) {
        const itemPath = path.join(projectPath, item);
        const stat = await fs.stat(itemPath);

        if (stat.isFile()) {
          switch (item) {
            case 'package.json':
              structure.hasPackageJson = true;
              break;
            case 'yarn.lock':
              structure.packageManager = 'yarn';
              break;
            case 'pnpm-lock.yaml':
              structure.packageManager = 'pnpm';
              break;
            case 'package-lock.json':
              if (!structure.packageManager) {
                structure.packageManager = 'npm';
              }
              break;
          }
        } else if (stat.isDirectory()) {
          switch (item) {
            case 'src':
              structure.hasSrcFolder = true;
              break;
            case 'pages':
              structure.hasPagesFolder = true;
              break;
            case 'api':
              structure.hasApiFolder = true;
              break;
            case 'components':
              structure.hasComponentsFolder = true;
              break;
          }
        }
      }

      // Detectar framework
      structure.framework = await this.detectFramework(projectPath, structure);
      
      // Establecer package manager por defecto
      if (!structure.packageManager) {
        structure.packageManager = 'npm';
      }

      logger.info('Project structure analyzed', {
        projectPath,
        structure
      });

      return structure;

    } catch (error) {
      logger.error('Error analyzing project structure', {
        projectPath,
        error: error.message
      });
      
      return {
        hasPackageJson: false,
        hasSrcFolder: false,
        hasPagesFolder: false,
        hasApiFolder: false,
        hasComponentsFolder: false,
        framework: 'unknown',
        packageManager: 'npm'
      };
    }
  }

  /**
   * Detecta el framework utilizado en el proyecto
   */
  private static async detectFramework(
    projectPath: string, 
    structure: ProjectStructure
  ): Promise<ProjectStructure['framework']> {
    try {
      if (!structure.hasPackageJson) {
        return 'unknown';
      }

      const packageJsonPath = path.join(projectPath, 'package.json');
      const packageJsonContent = await fs.readFile(packageJsonPath, 'utf-8');
      const packageJson = JSON.parse(packageJsonContent);

      const dependencies = {
        ...packageJson.dependencies,
        ...packageJson.devDependencies
      };

      // Detectar Next.js
      if (dependencies.next) {
        return 'next';
      }

      // Detectar Nuxt.js
      if (dependencies.nuxt || dependencies['@nuxt/core']) {
        return 'nuxt';
      }

      // Detectar React
      if (dependencies.react) {
        return 'react';
      }

      // Detectar Vue
      if (dependencies.vue) {
        return 'vue';
      }

      // Detectar Angular
      if (dependencies['@angular/core']) {
        return 'angular';
      }

      // Detectar Svelte
      if (dependencies.svelte) {
        return 'svelte';
      }

      return 'unknown';

    } catch (error) {
      logger.error('Error detecting framework', {
        projectPath,
        error: error.message
      });
      return 'unknown';
    }
  }

  /**
   * Obtiene las rutas importantes del proyecto
   */
  static async getProjectPaths(projectPath: string): Promise<ProjectPaths> {
    const structure = await this.analyzeProjectStructure(projectPath);
    
    const paths: ProjectPaths = {
      root: projectPath
    };

    // Rutas comunes
    const possiblePaths = {
      src: ['src', 'source'],
      pages: ['pages', 'src/pages', 'app/pages'],
      components: ['components', 'src/components', 'app/components'],
      api: ['api', 'src/api', 'pages/api', 'app/api'],
      public: ['public', 'static', 'assets'],
      styles: ['styles', 'css', 'src/styles', 'src/css']
    };

    for (const [key, possibleDirs] of Object.entries(possiblePaths)) {
      for (const dir of possibleDirs) {
        const fullPath = path.join(projectPath, dir);
        try {
          await fs.access(fullPath);
          const stat = await fs.stat(fullPath);
          if (stat.isDirectory()) {
            paths[key as keyof ProjectPaths] = fullPath;
            break;
          }
        } catch {
          // Directorio no existe, continuar
        }
      }
    }

    return paths;
  }

  /**
   * Busca archivos específicos en el proyecto
   */
  static async findFiles(
    projectPath: string, 
    patterns: string[], 
    maxDepth: number = 3
  ): Promise<string[]> {
    const foundFiles: string[] = [];

    const searchDir = async (dir: string, currentDepth: number) => {
      if (currentDepth > maxDepth) return;

      try {
        const items = await fs.readdir(dir);
        
        for (const item of items) {
          const itemPath = path.join(dir, item);
          const stat = await fs.stat(itemPath);

          if (stat.isFile()) {
            for (const pattern of patterns) {
              if (item.includes(pattern) || item.match(new RegExp(pattern))) {
                foundFiles.push(itemPath);
              }
            }
          } else if (stat.isDirectory() && !item.startsWith('.') && item !== 'node_modules') {
            await searchDir(itemPath, currentDepth + 1);
          }
        }
      } catch (error) {
        // Ignorar errores de acceso a directorios
      }
    };

    await searchDir(projectPath, 0);
    return foundFiles;
  }

  /**
   * Verifica si el proyecto es válido para el procesamiento
   */
  static async validateProject(projectPath: string): Promise<{ valid: boolean; issues: string[] }> {
    const issues: string[] = [];
    
    try {
      const structure = await this.analyzeProjectStructure(projectPath);
      
      // Verificaciones básicas
      if (!structure.hasPackageJson) {
        issues.push('No package.json found');
      }
      
      if (structure.framework === 'unknown') {
        issues.push('Unknown or unsupported framework');
      }
      
      if (!structure.hasSrcFolder && !structure.hasPagesFolder) {
        issues.push('No src or pages folder found');
      }

      // Verificar que el directorio no esté vacío
      const items = await fs.readdir(projectPath);
      if (items.length === 0) {
        issues.push('Project directory is empty');
      }

      return {
        valid: issues.length === 0,
        issues
      };

    } catch (error) {
      return {
        valid: false,
        issues: [`Error validating project: ${error.message}`]
      };
    }
  }

  /**
   * Obtiene información del package.json
   */
  static async getPackageInfo(projectPath: string): Promise<any> {
    try {
      const packageJsonPath = path.join(projectPath, 'package.json');
      const content = await fs.readFile(packageJsonPath, 'utf-8');
      return JSON.parse(content);
    } catch (error) {
      logger.error('Error reading package.json', {
        projectPath,
        error: error.message
      });
      return null;
    }
  }

  /**
   * Genera un resumen del proyecto para logging
   */
  static async getProjectSummary(projectPath: string): Promise<string> {
    try {
      const structure = await this.analyzeProjectStructure(projectPath);
      const packageInfo = await this.getPackageInfo(projectPath);
      
      const summary = [
        `Framework: ${structure.framework}`,
        `Package Manager: ${structure.packageManager}`,
        `Has Src: ${structure.hasSrcFolder}`,
        `Has Pages: ${structure.hasPagesFolder}`,
        `Has API: ${structure.hasApiFolder}`
      ];

      if (packageInfo?.name) {
        summary.unshift(`Name: ${packageInfo.name}`);
      }

      if (packageInfo?.version) {
        summary.push(`Version: ${packageInfo.version}`);
      }

      return summary.join(', ');

    } catch (error) {
      return `Error analyzing project: ${error.message}`;
    }
  }
}

export default ProjectUtils;