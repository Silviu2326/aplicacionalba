import * as path from 'path';
import * as fs from 'fs/promises';
import { simpleGit, SimpleGit } from 'simple-git';
import { logger } from '../../../../shared/utils/logger';
import { PrismaClient } from '@prisma/client';

export interface ProjectConfig {
  _id: string;
  name: string;
  githubUrl: string;
  tempDir?: string;
}

export interface CloneResult {
  success: boolean;
  projectPath: string;
  tempDir: string;
  error?: string;
}

/**
 * Maneja la clonación dinámica de repositorios desde githubUrl
 * Genera directorios temporales únicos para cada proyecto
 */
export class ProjectCloner {
  private prisma: PrismaClient;
  private baseDir: string;
  private git: SimpleGit;

  constructor(prisma: PrismaClient, baseDir?: string) {
    this.prisma = prisma;
    this.baseDir = baseDir || path.join(__dirname, '../../temp');
    this.git = simpleGit();
  }

  /**
   * Clona un proyecto desde su githubUrl a un directorio temporal
   */
  async cloneProject(projectId: string): Promise<CloneResult> {
    try {
      logger.info('Starting project clone', { projectId });

      // Obtener configuración del proyecto desde la base de datos
      const project = await this.getProjectConfig(projectId);
      if (!project) {
        throw new Error(`Project not found: ${projectId}`);
      }

      if (!project.githubUrl) {
        throw new Error(`Project ${projectId} does not have a githubUrl configured`);
      }

      // Generar directorio temporal único
      const tempDir = this.generateTempDir(project._id);
      
      // Asegurar que el directorio base existe
      await this.ensureBaseDir();

      // Limpiar directorio si ya existe
      await this.cleanupTempDir(tempDir);

      logger.info('Cloning repository', {
        projectId,
        githubUrl: project.githubUrl,
        tempDir
      });

      // Clonar repositorio
      await this.git.clone(project.githubUrl, tempDir, {
        '--depth': 1, // Clone shallow para mayor velocidad
        '--single-branch': null
      });

      // Verificar que la clonación fue exitosa
      const isValidRepo = await this.validateClonedRepo(tempDir);
      if (!isValidRepo) {
        throw new Error('Cloned repository is not valid or empty');
      }

      logger.info('Project cloned successfully', {
        projectId,
        tempDir,
        projectPath: tempDir
      });

      return {
        success: true,
        projectPath: tempDir,
        tempDir
      };

    } catch (error) {
      logger.error('Error cloning project', {
        projectId,
        error: error.message,
        stack: error.stack
      });

      return {
        success: false,
        projectPath: '',
        tempDir: '',
        error: error.message
      };
    }
  }

  /**
   * Obtiene la configuración del proyecto desde la base de datos
   */
  private async getProjectConfig(projectId: string): Promise<ProjectConfig | null> {
    try {
      const project = await this.prisma.$queryRaw`
        SELECT id as _id, name, githubUrl 
        FROM projects 
        WHERE id = ${projectId}
      ` as any[];

      if (!project || project.length === 0) {
        return null;
      }

      return {
        _id: project[0]._id,
        name: project[0].name,
        githubUrl: project[0].githubUrl
      };
    } catch (error) {
      logger.error('Error getting project config', {
        projectId,
        error: error.message
      });
      return null;
    }
  }

  /**
   * Genera un directorio temporal único para el proyecto
   */
  private generateTempDir(projectId: string): string {
    const timestamp = Date.now();
    const dirName = `backend_gen_${projectId}_${timestamp}`;
    return path.join(this.baseDir, dirName);
  }

  /**
   * Asegura que el directorio base existe
   */
  private async ensureBaseDir(): Promise<void> {
    try {
      await fs.access(this.baseDir);
    } catch {
      await fs.mkdir(this.baseDir, { recursive: true });
      logger.info('Created base directory', { baseDir: this.baseDir });
    }
  }

  /**
   * Limpia un directorio temporal si existe
   */
  private async cleanupTempDir(tempDir: string): Promise<void> {
    try {
      await fs.access(tempDir);
      await fs.rm(tempDir, { recursive: true, force: true });
      logger.info('Cleaned up existing temp directory', { tempDir });
    } catch {
      // El directorio no existe, no hay nada que limpiar
    }
  }

  /**
   * Valida que el repositorio clonado es válido
   */
  private async validateClonedRepo(tempDir: string): Promise<boolean> {
    try {
      // Verificar que el directorio existe
      await fs.access(tempDir);

      // Verificar que contiene archivos
      const files = await fs.readdir(tempDir);
      if (files.length === 0) {
        return false;
      }

      // Verificar que es un repositorio git válido
      const gitDir = path.join(tempDir, '.git');
      try {
        await fs.access(gitDir);
        return true;
      } catch {
        // No es un repositorio git, pero puede ser válido si tiene archivos
        return files.length > 1; // Más de solo .git
      }
    } catch {
      return false;
    }
  }

  /**
   * Obtiene el directorio del proyecto clonado
   */
  async getProjectDirectory(projectId: string): Promise<string | null> {
    try {
      // Buscar directorios temporales existentes para este proyecto
      const baseDir = await fs.readdir(this.baseDir);
      const projectDirs = baseDir.filter(dir => 
        dir.startsWith(`backend_gen_${projectId}_`)
      );

      if (projectDirs.length === 0) {
        return null;
      }

      // Retornar el más reciente
      const sortedDirs = projectDirs.sort().reverse();
      const latestDir = path.join(this.baseDir, sortedDirs[0]);

      // Verificar que el directorio existe y es válido
      const isValid = await this.validateClonedRepo(latestDir);
      return isValid ? latestDir : null;

    } catch (error) {
      logger.error('Error getting project directory', {
        projectId,
        error: error.message
      });
      return null;
    }
  }

  /**
   * Limpia todos los directorios temporales de un proyecto
   */
  async cleanupProject(projectId: string): Promise<void> {
    try {
      const baseDir = await fs.readdir(this.baseDir);
      const projectDirs = baseDir.filter(dir => 
        dir.startsWith(`backend_gen_${projectId}_`)
      );

      for (const dir of projectDirs) {
        const fullPath = path.join(this.baseDir, dir);
        await fs.rm(fullPath, { recursive: true, force: true });
        logger.info('Cleaned up project directory', { 
          projectId, 
          directory: fullPath 
        });
      }
    } catch (error) {
      logger.error('Error cleaning up project', {
        projectId,
        error: error.message
      });
    }
  }

  /**
   * Limpia directorios temporales antiguos (más de 24 horas)
   */
  async cleanupOldDirectories(): Promise<void> {
    try {
      const baseDir = await fs.readdir(this.baseDir);
      const now = Date.now();
      const maxAge = 24 * 60 * 60 * 1000; // 24 horas en milisegundos

      for (const dir of baseDir) {
        if (dir.startsWith('backend_gen_')) {
          const parts = dir.split('_');
          if (parts.length >= 4) {
            const timestamp = parseInt(parts[parts.length - 1]);
            if (!isNaN(timestamp) && (now - timestamp) > maxAge) {
              const fullPath = path.join(this.baseDir, dir);
              await fs.rm(fullPath, { recursive: true, force: true });
              logger.info('Cleaned up old directory', { directory: fullPath });
            }
          }
        }
      }
    } catch (error) {
      logger.error('Error cleaning up old directories', {
        error: error.message
      });
    }
  }
}

export default ProjectCloner;