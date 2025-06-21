# Módulo de Gestión de Proyectos - FE Manager

Este módulo implementa el sistema de **clonación dinámica de repositorios** para el FE Manager Agent, permitiendo trabajar con proyectos almacenados en GitHub de forma automática y eficiente.

## 🔄 Flujo de Obtención del Directorio del Proyecto

### Clonación Dinámica

Cuando el sistema necesita trabajar con un proyecto, clona el repositorio desde `githubUrl` a un directorio temporal:

```javascript
// Crear directorio temporal dinámico
const tempDir = path.join(__dirname, 'temp', `backend_gen_${project._id}_${Date.now()}`);

// Clonar repositorio desde githubUrl
const git = simpleGit();
await git.clone(project.githubUrl, tempDir);
```

### Directorio Temporal

El path del proyecto se genera dinámicamente:
- **Patrón**: `/backend/temp/backend_gen_{projectId}_{timestamp}/`
- **Ejemplo**: `/backend/temp/backend_gen_507f1f77bcf86cd799439011_1703123456789/`

## 🏗️ Arquitectura del Módulo

### Componentes Principales

#### 1. ProjectCloner
- **Responsabilidad**: Clonación y gestión de repositorios
- **Funciones**:
  - Clonar repositorios desde GitHub
  - Generar directorios temporales únicos
  - Validar repositorios clonados
  - Limpiar directorios antiguos

#### 2. ProjectService
- **Responsabilidad**: Orquestación de alto nivel
- **Funciones**:
  - Configurar proyectos para procesamiento
  - Gestionar el ciclo de vida de proyectos
  - Validar configuraciones
  - Proporcionar información de proyectos

#### 3. ProjectUtils
- **Responsabilidad**: Análisis y utilidades
- **Funciones**:
  - Analizar estructura de proyectos
  - Detectar frameworks
  - Validar proyectos
  - Buscar archivos específicos

## 🚀 Uso del Módulo

### Configuración Básica

```typescript
import { ProjectService } from './project';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const projectService = new ProjectService(prisma);
```

### Configurar un Proyecto

```typescript
// Configurar proyecto (clona si es necesario)
const result = await projectService.setupProject(projectId);

if (result.success) {
  console.log('Proyecto configurado:', result.projectInfo.projectPath);
} else {
  console.error('Error:', result.error);
}
```

### Obtener Directorio del Proyecto

```typescript
// Obtener directorio (clona automáticamente si no existe)
const projectPath = await projectService.getProjectPath(projectId);

if (projectPath) {
  console.log('Directorio del proyecto:', projectPath);
}
```

### Analizar Estructura del Proyecto

```typescript
import { ProjectUtils } from './project';

// Analizar estructura
const structure = await ProjectUtils.analyzeProjectStructure(projectPath);
console.log('Framework detectado:', structure.framework);
console.log('Tiene package.json:', structure.hasPackageJson);

// Obtener rutas importantes
const paths = await ProjectUtils.getProjectPaths(projectPath);
console.log('Directorio src:', paths.src);
console.log('Directorio pages:', paths.pages);
```

## 🎯 Integración con el Orchestrator

El módulo se integra automáticamente con el `FeManagerOrchestrator`:

```typescript
// En orchestrator.ts
export interface OrchestratorDependencies {
  // ... otras dependencias
  prisma: PrismaClient;
}

class FeManagerOrchestrator {
  private projectService: ProjectService;

  constructor(redis: Redis, dependencies: OrchestratorDependencies) {
    // ... otras inicializaciones
    this.projectService = new ProjectService(dependencies.prisma);
  }

  async processStories(data: { stories: UserStory[], projectId: string }) {
    // 🔄 Configurar proyecto automáticamente
    const projectSetup = await this.projectService.setupProject(data.projectId);
    
    if (!projectSetup.success) {
      throw new Error(`Project setup failed: ${projectSetup.error}`);
    }

    // El directorio del proyecto está disponible en:
    // projectSetup.projectInfo.projectPath
    
    // ... resto del procesamiento
  }
}
```

## 📁 Estructura de Directorios

```
backend/
├── agents/
│   └── fe-manager/
│       └── src/
│           ├── project/              # 📦 Módulo de gestión de proyectos
│           │   ├── ProjectCloner.ts  # Clonación de repositorios
│           │   ├── ProjectService.ts # Servicio principal
│           │   ├── ProjectUtils.ts   # Utilidades y análisis
│           │   ├── index.ts         # Exportaciones
│           │   └── README.md        # Esta documentación
│           └── orchestrator.ts      # Integrado con ProjectService
└── temp/                           # 🗂️ Proyectos clonados
    └── backend_gen_507f1f77bcf86cd799439011_1703123456789/
        ├── src/                    # Código del proyecto objetivo
        ├── pages/                  # Páginas del proyecto
        └── package.json           # Configuración del proyecto
```

## ⚙️ Configuración Requerida

### En el Modelo Project

Para que el sistema funcione correctamente, el modelo `Project` debe tener configurado:

```json
{
  "_id": "507f1f77bcf86cd799439011",
  "name": "Mi Proyecto Frontend",
  "githubUrl": "https://github.com/usuario/mi-proyecto.git"
}
```

### Variables de Entorno

No se requieren variables de entorno adicionales. El sistema utiliza:
- La configuración de la base de datos existente (Prisma)
- Directorios temporales generados dinámicamente

## 🔧 Funcionalidades Avanzadas

### Limpieza Automática

```typescript
// Limpiar directorios antiguos (>24 horas)
await projectService.cleanupOldProjects();

// Limpiar proyecto específico
await projectService.cleanupProject(projectId);
```

### Actualización de Proyectos

```typescript
// Re-clonar proyecto (útil para actualizaciones)
const result = await projectService.refreshProject(projectId);
```

### Validación de Configuración

```typescript
// Validar que el proyecto tiene githubUrl configurado
const validation = await projectService.validateProjectConfig(projectId);

if (!validation.valid) {
  console.error('Error de configuración:', validation.error);
}
```

### Listado de Proyectos

```typescript
// Listar todos los proyectos con su estado
const projects = await projectService.listProjects();

projects.forEach(project => {
  console.log(`${project.name}: ${project.isCloned ? 'Clonado' : 'No clonado'}`);
});
```

## 🛡️ Manejo de Errores

El módulo incluye manejo robusto de errores:

- **Repositorio no encontrado**: Error claro con URL problemática
- **Falta githubUrl**: Validación antes de intentar clonar
- **Permisos de directorio**: Creación automática de directorios padre
- **Repositorio corrupto**: Validación post-clonación
- **Limpieza fallida**: Logs detallados sin interrumpir el flujo

## 📊 Logging y Observabilidad

Todos los componentes incluyen logging detallado:

```typescript
// Ejemplos de logs generados
logger.info('Starting project clone', { projectId });
logger.info('Project setup completed', { projectId, projectPath });
logger.error('Failed to setup project', { projectId, error });
```

## 🔄 Flujo Completo de Ejemplo

```typescript
// 1. Usuario crea proyecto con githubUrl
const project = {
  name: "Mi App React",
  githubUrl: "https://github.com/usuario/mi-app-react.git"
};

// 2. Sistema procesa historias de usuario
const stories = [/* historias de usuario */];

// 3. Orchestrator configura proyecto automáticamente
const result = await orchestrator.processStories({
  stories,
  projectId: project._id
});

// 4. El sistema:
//    - Clona el repositorio a: /backend/temp/backend_gen_{id}_{timestamp}/
//    - Analiza la estructura del proyecto
//    - Procesa las historias con acceso al código fuente
//    - Genera código basado en el proyecto real
```

## 🎯 Beneficios

1. **Flexibilidad**: No requiere configuración manual de directorios
2. **Concurrencia**: Múltiples proyectos pueden procesarse simultáneamente
3. **Actualización**: Fácil re-clonación para obtener cambios
4. **Limpieza**: Gestión automática de espacio en disco
5. **Validación**: Verificación de configuración y estructura
6. **Observabilidad**: Logging completo para debugging

Este módulo transforma el FE Manager de un sistema que requiere configuración manual a uno completamente dinámico y autónomo.