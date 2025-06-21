import { PrismaClient } from '@prisma/client';
import { ProjectCloner, CloneResult } from './ProjectCloner';
import { logger } from '../../../../shared/utils/logger';

export interface ProjectInfo {
  id: string;
  name: string;
  githubUrl: string;
  projectPath?: string;
  isCloned: boolean;
}

export interface ProjectSetupResult {
  success: boolean;
  projectInfo: ProjectInfo;
  cloneResult?: CloneResult;
  error?: string;
}

/**
 * Servicio principal para gestionar proyectos y su clonación dinámica
 */
export class ProjectService {
  private prisma: PrismaClient;
  private projectCloner: ProjectCloner;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
    this.projectCloner = new ProjectCloner(prisma);
  }

  /**
   * Configura un proyecto para su uso, clonándolo si es necesario
   */
  async setupProject(projectId: string): Promise<ProjectSetupResult> {
    try {
      logger.info('Setting up project', { projectId });

      // Verificar si el proyecto ya está clonado
      const existingPath = await this.projectCloner.getProjectDirectory(projectId);
      
      if (existingPath) {
        logger.info('Project already cloned', { projectId, path: existingPath });
        
        const projectInfo = await this.getProjectInfo(projectId);
        if (projectInfo) {
          projectInfo.projectPath = existingPath;
          projectInfo.isCloned = true;
          
          return {
            success: true,
            projectInfo
          };
        }
      }

      // Clonar el proyecto
      const cloneResult = await this.projectCloner.cloneProject(projectId);
      
      if (!cloneResult.success) {
        return {
          success: false,
          projectInfo: {
            id: projectId,
            name: '',
            githubUrl: '',
            isCloned: false
          },
          cloneResult,
          error: cloneResult.error
        };
      }

      // Obtener información del proyecto
      const projectInfo = await this.getProjectInfo(projectId);
      if (!projectInfo) {
        return {
          success: false,
          projectInfo: {
            id: projectId,
            name: '',
            githubUrl: '',
            isCloned: false
          },
          error: 'Project not found in database'
        };
      }

      projectInfo.projectPath = cloneResult.projectPath;
      projectInfo.isCloned = true;

      logger.info('Project setup completed', {
        projectId,
        projectPath: cloneResult.projectPath
      });

      return {
        success: true,
        projectInfo,
        cloneResult
      };

    } catch (error) {
      logger.error('Error setting up project', {
        projectId,
        error: error.message,
        stack: error.stack
      });

      return {
        success: false,
        projectInfo: {
          id: projectId,
          name: '',
          githubUrl: '',
          isCloned: false
        },
        error: error.message
      };
    }
  }

  /**
   * Obtiene información básica del proyecto desde la base de datos
   */
  async getProjectInfo(projectId: string): Promise<ProjectInfo | null> {
    try {
      const project = await this.prisma.$queryRaw`
        SELECT id, name, githubUrl 
        FROM projects 
        WHERE id = ${projectId}
      ` as any[];

      if (!project || project.length === 0) {
        return null;
      }

      const projectData = project[0];
      const existingPath = await this.projectCloner.getProjectDirectory(projectId);

      return {
        id: projectData.id,
        name: projectData.name,
        githubUrl: projectData.githubUrl,
        projectPath: existingPath || undefined,
        isCloned: !!existingPath
      };

    } catch (error) {
      logger.error('Error getting project info', {
        projectId,
        error: error.message
      });
      return null;
    }
  }

  /**
   * Obtiene el directorio del proyecto, clonándolo si es necesario
   */
  async getProjectPath(projectId: string): Promise<string | null> {
    try {
      // Verificar si ya está clonado
      let projectPath = await this.projectCloner.getProjectDirectory(projectId);
      
      if (projectPath) {
        return projectPath;
      }

      // Clonar si no existe
      const setupResult = await this.setupProject(projectId);
      
      if (setupResult.success && setupResult.projectInfo.projectPath) {
        return setupResult.projectInfo.projectPath;
      }

      return null;

    } catch (error) {
      logger.error('Error getting project path', {
        projectId,
        error: error.message
      });
      return null;
    }
  }

  /**
   * Verifica si un proyecto tiene githubUrl configurado
   */
  async validateProjectConfig(projectId: string): Promise<{ valid: boolean; error?: string }> {
    try {
      const projectInfo = await this.getProjectInfo(projectId);
      
      if (!projectInfo) {
        return {
          valid: false,
          error: 'Project not found'
        };
      }

      if (!projectInfo.githubUrl) {
        return {
          valid: false,
          error: 'Project does not have githubUrl configured'
        };
      }

      // Validar formato de URL
      try {
        new URL(projectInfo.githubUrl);
      } catch {
        return {
          valid: false,
          error: 'Invalid githubUrl format'
        };
      }

      return { valid: true };

    } catch (error) {
      return {
        valid: false,
        error: error.message
      };
    }
  }

  /**
   * Limpia los archivos temporales de un proyecto
   */
  async cleanupProject(projectId: string): Promise<void> {
    await this.projectCloner.cleanupProject(projectId);
  }

  /**
   * Limpia directorios temporales antiguos
   */
  async cleanupOldProjects(): Promise<void> {
    await this.projectCloner.cleanupOldDirectories();
  }

  /**
   * Re-clona un proyecto (útil para actualizaciones)
   */
  async refreshProject(projectId: string): Promise<ProjectSetupResult> {
    try {
      logger.info('Refreshing project', { projectId });

      // Limpiar versión existente
      await this.cleanupProject(projectId);

      // Clonar nuevamente
      return await this.setupProject(projectId);

    } catch (error) {
      logger.error('Error refreshing project', {
        projectId,
        error: error.message
      });

      return {
        success: false,
        projectInfo: {
          id: projectId,
          name: '',
          githubUrl: '',
          isCloned: false
        },
        error: error.message
      };
    }
  }

  /**
   * Lista todos los proyectos con su estado de clonación
   */
  async listProjects(): Promise<ProjectInfo[]> {
    try {
      const projects = await this.prisma.$queryRaw`
        SELECT id, name, githubUrl 
        FROM projects 
        ORDER BY name
      ` as any[];

      const projectInfos: ProjectInfo[] = [];

      for (const project of projects) {
        const existingPath = await this.projectCloner.getProjectDirectory(project.id);
        
        projectInfos.push({
          id: project.id,
          name: project.name,
          githubUrl: project.githubUrl,
          projectPath: existingPath || undefined,
          isCloned: !!existingPath
        });
      }

      return projectInfos;

    } catch (error) {
      logger.error('Error listing projects', {
        error: error.message
      });
      return [];
    }
  }
}

export default ProjectService;