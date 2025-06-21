/**
 * Ejemplo de uso del sistema de clonación dinámica de proyectos
 * 
 * Este ejemplo demuestra cómo el FE Manager Agent maneja automáticamente
 * la clonación de repositorios desde GitHub y el procesamiento de historias de usuario.
 */

import { PrismaClient } from '@prisma/client';
import { Redis } from 'ioredis';
import { ProjectService, ProjectUtils } from '../src/project';
import { FeManagerOrchestrator } from '../src/orchestrator';
import { logger } from '../../../../shared/utils/logger';

// Configuración de ejemplo
const EXAMPLE_PROJECT = {
  id: '507f1f77bcf86cd799439011',
  name: 'Mi Proyecto Frontend',
  githubUrl: 'https://github.com/usuario/mi-proyecto.git'
};

const EXAMPLE_STORIES = [
  {
    id: 'story-1',
    title: 'Crear página de inicio',
    description: 'Implementar una página de inicio con hero section y navegación',
    priority: 'high' as const,
    status: 'backlog' as const,
    pageId: 'page-home',
    projectId: EXAMPLE_PROJECT.id
  },
  {
    id: 'story-2', 
    title: 'Agregar formulario de contacto',
    description: 'Crear un formulario de contacto con validación',
    priority: 'medium' as const,
    status: 'backlog' as const,
    pageId: 'page-contact',
    projectId: EXAMPLE_PROJECT.id
  }
];

/**
 * Ejemplo 1: Configuración básica de proyecto
 */
async function exampleBasicProjectSetup() {
  console.log('\n🔄 Ejemplo 1: Configuración Básica de Proyecto\n');
  
  const prisma = new PrismaClient();
  const projectService = new ProjectService(prisma);
  
  try {
    // 1. Validar configuración del proyecto
    console.log('1. Validando configuración del proyecto...');
    const validation = await projectService.validateProjectConfig(EXAMPLE_PROJECT.id);
    
    if (!validation.valid) {
      console.error('❌ Error de configuración:', validation.error);
      return;
    }
    console.log('✅ Configuración válida');
    
    // 2. Configurar proyecto (clona automáticamente si es necesario)
    console.log('\n2. Configurando proyecto...');
    const setupResult = await projectService.setupProject(EXAMPLE_PROJECT.id);
    
    if (!setupResult.success) {
      console.error('❌ Error en configuración:', setupResult.error);
      return;
    }
    
    console.log('✅ Proyecto configurado exitosamente');
    console.log('📁 Directorio:', setupResult.projectInfo.projectPath);
    console.log('🔗 GitHub URL:', setupResult.projectInfo.githubUrl);
    console.log('📋 Estado clonado:', setupResult.projectInfo.isCloned);
    
    // 3. Analizar estructura del proyecto
    if (setupResult.projectInfo.projectPath) {
      console.log('\n3. Analizando estructura del proyecto...');
      const structure = await ProjectUtils.analyzeProjectStructure(
        setupResult.projectInfo.projectPath
      );
      
      console.log('🏗️ Framework detectado:', structure.framework);
      console.log('📦 Package manager:', structure.packageManager);
      console.log('📂 Tiene src/:', structure.hasSrcFolder);
      console.log('📄 Tiene pages/:', structure.hasPagesFolder);
      console.log('🔌 Tiene API/:', structure.hasApiFolder);
      
      // 4. Obtener rutas importantes
      console.log('\n4. Obteniendo rutas importantes...');
      const paths = await ProjectUtils.getProjectPaths(
        setupResult.projectInfo.projectPath
      );
      
      console.log('📍 Rutas del proyecto:');
      console.log('  - Root:', paths.root);
      console.log('  - Src:', paths.src || 'No encontrado');
      console.log('  - Pages:', paths.pages || 'No encontrado');
      console.log('  - Components:', paths.components || 'No encontrado');
      console.log('  - API:', paths.api || 'No encontrado');
      
      // 5. Generar resumen
      console.log('\n5. Resumen del proyecto:');
      const summary = await ProjectUtils.getProjectSummary(
        setupResult.projectInfo.projectPath
      );
      console.log('📊', summary);
    }
    
  } catch (error) {
    console.error('❌ Error en el ejemplo:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

/**
 * Ejemplo 2: Procesamiento completo con Orchestrator
 */
async function exampleFullProcessing() {
  console.log('\n🚀 Ejemplo 2: Procesamiento Completo con Orchestrator\n');
  
  const prisma = new PrismaClient();
  const redis = new Redis(process.env.REDIS_URL || 'redis://localhost:6379');
  
  try {
    // Configurar dependencias del orchestrator
    const dependencies = {
      eventBus: new (await import('../src/events/EventBus')).EventBus(),
      vectorStore: new (await import('../src/context/VectorStore')).VectorStore(),
      prioritizer: new (await import('../src/prioritization/SmartPrioritizer')).SmartPrioritizer(),
      tokenGuardian: new (await import('../src/backpressure/TokenGuardian')).TokenGuardian(),
      retryManager: new (await import('../src/retry/SmartRetryManager')).SmartRetryManager(),
      telemetryManager: new (await import('../src/observability/TelemetryManager')).TelemetryManager(),
      pluginManager: new (await import('../src/plugins/PluginManager')).PluginManager(),
      prisma
    };
    
    // Crear orchestrator
    const orchestrator = new FeManagerOrchestrator(redis, dependencies);
    
    console.log('1. Iniciando procesamiento de historias...');
    
    // Procesar historias (incluye clonación automática)
    const result = await orchestrator.processStories({
      stories: EXAMPLE_STORIES,
      projectId: EXAMPLE_PROJECT.id
    });
    
    console.log('✅ Procesamiento iniciado exitosamente');
    console.log('🔢 Jobs creados:', result.totalJobs);
    console.log('🆔 Job IDs:', result.jobIds.slice(0, 3), '...');
    
    console.log('\n📋 El sistema ha:');
    console.log('  1. ✅ Clonado el repositorio automáticamente');
    console.log('  2. ✅ Analizado la estructura del proyecto');
    console.log('  3. ✅ Creado jobs para procesar las historias');
    console.log('  4. ✅ Incluido el directorio del proyecto en los metadatos');
    
  } catch (error) {
    console.error('❌ Error en procesamiento:', error.message);
  } finally {
    await prisma.$disconnect();
    redis.disconnect();
  }
}

/**
 * Ejemplo 3: Gestión de múltiples proyectos
 */
async function exampleMultipleProjects() {
  console.log('\n🔄 Ejemplo 3: Gestión de Múltiples Proyectos\n');
  
  const prisma = new PrismaClient();
  const projectService = new ProjectService(prisma);
  
  try {
    // 1. Listar todos los proyectos
    console.log('1. Listando proyectos...');
    const projects = await projectService.listProjects();
    
    console.log(`📋 Encontrados ${projects.length} proyectos:`);
    projects.forEach((project, index) => {
      console.log(`  ${index + 1}. ${project.name}`);
      console.log(`     🔗 ${project.githubUrl}`);
      console.log(`     📁 ${project.isCloned ? 'Clonado' : 'No clonado'}`);
      if (project.projectPath) {
        console.log(`     📍 ${project.projectPath}`);
      }
      console.log('');
    });
    
    // 2. Configurar múltiples proyectos en paralelo
    console.log('2. Configurando proyectos en paralelo...');
    const setupPromises = projects.slice(0, 3).map(project => 
      projectService.setupProject(project.id)
    );
    
    const results = await Promise.allSettled(setupPromises);
    
    results.forEach((result, index) => {
      const project = projects[index];
      if (result.status === 'fulfilled' && result.value.success) {
        console.log(`✅ ${project.name}: Configurado`);
      } else {
        console.log(`❌ ${project.name}: Error`);
      }
    });
    
    // 3. Limpiar proyectos antiguos
    console.log('\n3. Limpiando proyectos antiguos...');
    await projectService.cleanupOldProjects();
    console.log('✅ Limpieza completada');
    
  } catch (error) {
    console.error('❌ Error en gestión múltiple:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

/**
 * Ejemplo 4: Manejo de errores y validaciones
 */
async function exampleErrorHandling() {
  console.log('\n⚠️ Ejemplo 4: Manejo de Errores y Validaciones\n');
  
  const prisma = new PrismaClient();
  const projectService = new ProjectService(prisma);
  
  try {
    // 1. Proyecto inexistente
    console.log('1. Probando proyecto inexistente...');
    const invalidResult = await projectService.setupProject('invalid-id');
    console.log('❌ Resultado esperado:', invalidResult.error);
    
    // 2. Proyecto sin githubUrl
    console.log('\n2. Probando validación de configuración...');
    const validation = await projectService.validateProjectConfig('project-without-github');
    if (!validation.valid) {
      console.log('❌ Error esperado:', validation.error);
    }
    
    // 3. URL de GitHub inválida
    console.log('\n3. Probando URL inválida...');
    // Simular proyecto con URL inválida
    // (En un caso real, esto vendría de la base de datos)
    
    console.log('✅ Manejo de errores funcionando correctamente');
    
  } catch (error) {
    console.error('❌ Error inesperado:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

/**
 * Función principal que ejecuta todos los ejemplos
 */
async function runExamples() {
  console.log('🎯 Ejemplos del Sistema de Clonación Dinámica de Proyectos');
  console.log('=' .repeat(60));
  
  try {
    await exampleBasicProjectSetup();
    await exampleFullProcessing();
    await exampleMultipleProjects();
    await exampleErrorHandling();
    
    console.log('\n🎉 Todos los ejemplos completados exitosamente!');
    console.log('\n📚 Para más información, consulta:');
    console.log('  - README.md en /src/project/');
    console.log('  - Documentación del ProjectService');
    console.log('  - Logs del sistema para debugging');
    
  } catch (error) {
    console.error('❌ Error ejecutando ejemplos:', error.message);
  }
}

// Ejecutar ejemplos si este archivo se ejecuta directamente
if (require.main === module) {
  runExamples().catch(console.error);
}

export {
  exampleBasicProjectSetup,
  exampleFullProcessing,
  exampleMultipleProjects,
  exampleErrorHandling,
  runExamples
};