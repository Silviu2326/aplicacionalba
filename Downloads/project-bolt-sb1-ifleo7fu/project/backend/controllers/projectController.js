const { validationResult } = require('express-validator');
const { v4: uuidv4 } = require('uuid');
const Project = require('../models/Project');
const simpleGit = require('simple-git');
const { GoogleGenAI } = require('@google/genai');
const fs = require('fs-extra');
const path = require('path');

// Helper function to write Gemini responses to files
const writeGeminiResponseToFile = async (responseText, fileName, projectId) => {
  try {
    const responseDir = path.join(__dirname, '..', 'gemini-responses');
    await fs.ensureDir(responseDir);
    
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const fullFileName = `${projectId}_${fileName}_${timestamp}.txt`;
    const filePath = path.join(responseDir, fullFileName);
    
    await fs.writeFile(filePath, responseText, 'utf8');
    console.log(`📝 Respuesta de Gemini guardada en: ${filePath}`);
    
    return filePath;
  } catch (error) {
    console.error('❌ Error al escribir respuesta de Gemini:', error);
  }
};

// Helper function to cleanup temp directory with retry logic for Windows
const cleanupTempDir = async (tempDir, maxRetries = 15, delay = 2500) => {
  for (let i = 0; i < maxRetries; i++) {
    const attempt = i + 1;
    try {
      const exists = await fs.pathExists(tempDir);
      if (!exists) {
        console.log(`[Cleanup] Directorio temporal ${tempDir} ya no existe.`);
        return;
      }
      
      console.log(`[Cleanup] Intento ${attempt}/${maxRetries}: Eliminando ${tempDir}...`);
      await fs.remove(tempDir);
      
      const stillExistsAfterRemove = await fs.pathExists(tempDir);
      if (!stillExistsAfterRemove) {
        console.log(`[Cleanup] ✅ Directorio temporal ${tempDir} eliminado correctamente en intento ${attempt}.`);
        return;
      }
      
      console.warn(`[Cleanup] ⚠️ Directorio ${tempDir} aún existe después del intento de eliminación ${attempt} (sin error explícito de fs.remove). Forzando reintento si no es el último.`);
      if (attempt === maxRetries) {
        throw new Error(`Directorio ${tempDir} aún existe después del último intento (${attempt}) de eliminación.`);
      }
      // Force a retry by throwing a generic error
      throw new Error(`Directorio ${tempDir} persistió después del intento ${attempt}, forzando reintento.`);

    } catch (error) {
      const isLastError = attempt === maxRetries;
      const filePathInfo = error.path ? ` (archivo problemático: ${error.path})` : '';
      const errorCodeInfo = error.code ? ` (código: ${error.code})` : '';

      console.error(`[Cleanup] ⚠️ Intento ${attempt}/${maxRetries} de limpieza para ${tempDir} falló${filePathInfo}${errorCodeInfo}: ${error.message}`);

      if (isLastError) {
        console.error(`[Cleanup] ❌ Falló la limpieza final del directorio temporal ${tempDir} después de ${maxRetries} intentos.`);
        throw error; 
      }
      
      console.log(`[Cleanup] Reintentando en ${delay}ms...`);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
};

// @desc    Update GitHub URL for a project
// @route   PUT /api/projects/:id/github
// @access  Private
const updateGithubUrl = async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        error: 'Datos de entrada inválidos',
        details: errors.array()
      });
    }

    const { githubUrl } = req.body;

    const project = await Project.findOne({
      _id: req.params.id,
      userId: req.user.userId,
      isActive: true
    });

    if (!project) {
      return res.status(404).json({
        error: 'Proyecto no encontrado',
        message: 'El proyecto no existe o no tienes permisos para modificarlo'
      });
    }

    // Update GitHub URL
    project.githubUrl = githubUrl || '';
    const updatedProject = await project.save();

    res.json({
      message: 'URL de GitHub actualizada exitosamente',
      project: {
        id: updatedProject._id,
        name: updatedProject.name,
        githubUrl: updatedProject.githubUrl,
        updatedAt: updatedProject.updatedAt
      }
    });
  } catch (error) {
    console.error('Error al actualizar URL de GitHub:', error);
    res.status(500).json({
      error: 'Error interno del servidor',
      message: 'Error al actualizar URL de GitHub'
    });
  }
};

// @desc    Get all projects for authenticated user
// @route   GET /api/projects
// @access  Private
const getProjects = async (req, res) => {
  try {
    const projects = await Project.find({ 
      userId: req.user.userId,
      isActive: true 
    }).sort({ createdAt: -1 });

    res.json({
      projects: projects.map(project => ({
        id: project._id,
        name: project.name,
        description: project.description,
        status: project.status,
        color: project.color,
        techStack: project.techStack,
        githubUrl: project.githubUrl,
        createdAt: project.createdAt,
        updatedAt: project.updatedAt,
        pages: project.pages,
        totalUserStories: project.totalUserStories,
        completedUserStories: project.completedUserStories
      }))
    });
  } catch (error) {
    console.error('Error al obtener proyectos:', error);
    res.status(500).json({
      error: 'Error interno del servidor',
      message: 'Error al obtener proyectos'
    });
  }
};

// @desc    Get single project by ID
// @route   GET /api/projects/:id
// @access  Private
const getProject = async (req, res) => {
  try {
    const project = await Project.findOne({
      _id: req.params.id,
      userId: req.user.userId,
      isActive: true
    });

    if (!project) {
      return res.status(404).json({
        error: 'Proyecto no encontrado',
        message: 'El proyecto no existe o no tienes permisos para verlo'
      });
    }

    res.json({
      project: {
        id: project._id,
        name: project.name,
        description: project.description,
        status: project.status,
        color: project.color,
        techStack: project.techStack,
        githubUrl: project.githubUrl,
        createdAt: project.createdAt,
        updatedAt: project.updatedAt,
        pages: project.pages,
        totalUserStories: project.totalUserStories,
        completedUserStories: project.completedUserStories
      }
    });
  } catch (error) {
    console.error('Error al obtener proyecto:', error);
    res.status(500).json({
      error: 'Error interno del servidor',
      message: 'Error al obtener proyecto'
    });
  }
};

// @desc    Create new project
// @route   POST /api/projects
// @access  Private
const createProject = async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        error: 'Datos de entrada inválidos',
        details: errors.array()
      });
    }

    const { name, description, status, color, techStack, githubUrl } = req.body;

    console.log('createProject - Datos recibidos:', {
      name,
      description,
      status,
      color,
      techStack,
      githubUrl
    });

    const project = new Project({
      name,
      description,
      status: status || 'planning',
      color: color || '#3B82F6',
      techStack: techStack || [],
      githubUrl,
      userId: req.user.userId,
      pages: []
    });

    const savedProject = await project.save();

    console.log('createProject - Proyecto guardado:', savedProject);

    res.status(201).json({
      message: 'Proyecto creado exitosamente',
      project: {
        id: savedProject._id,
        name: savedProject.name,
        description: savedProject.description,
        status: savedProject.status,
        color: savedProject.color,
        techStack: savedProject.techStack,
        githubUrl: savedProject.githubUrl,
        createdAt: savedProject.createdAt,
        updatedAt: savedProject.updatedAt,
        pages: savedProject.pages
      }
    });
  } catch (error) {
    console.error('Error al crear proyecto:', error);
    res.status(500).json({
      error: 'Error interno del servidor',
      message: 'Error al crear proyecto'
    });
  }
};

// @desc    Update project
// @route   PUT /api/projects/:id
// @access  Private
const updateProject = async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        error: 'Datos de entrada inválidos',
        details: errors.array()
      });
    }

    const { name, description, status, color, techStack, githubUrl } = req.body;

    const project = await Project.findOne({
      _id: req.params.id,
      userId: req.user.userId,
      isActive: true
    });

    if (!project) {
      return res.status(404).json({
        error: 'Proyecto no encontrado',
        message: 'El proyecto no existe o no tienes permisos para modificarlo'
      });
    }

    // Update fields
    if (name !== undefined) project.name = name;
    if (description !== undefined) project.description = description;
    if (status !== undefined) project.status = status;
    if (color !== undefined) project.color = color;
    if (techStack !== undefined) project.techStack = techStack;
    if (githubUrl !== undefined) project.githubUrl = githubUrl;

    const updatedProject = await project.save();

    res.json({
      message: 'Proyecto actualizado exitosamente',
      project: {
        id: updatedProject._id,
        name: updatedProject.name,
        description: updatedProject.description,
        status: updatedProject.status,
        color: updatedProject.color,
        techStack: updatedProject.techStack,
        githubUrl: updatedProject.githubUrl,
        createdAt: updatedProject.createdAt,
        updatedAt: updatedProject.updatedAt,
        pages: updatedProject.pages
      }
    });
  } catch (error) {
    console.error('Error al actualizar proyecto:', error);
    res.status(500).json({
      error: 'Error interno del servidor',
      message: 'Error al actualizar proyecto'
    });
  }
};

// @desc    Delete project
// @route   DELETE /api/projects/:id
// @access  Private
const deleteProject = async (req, res) => {
  try {
    const project = await Project.findOne({
      _id: req.params.id,
      userId: req.user.userId,
      isActive: true
    });

    if (!project) {
      return res.status(404).json({
        error: 'Proyecto no encontrado',
        message: 'El proyecto no existe o no tienes permisos para eliminarlo'
      });
    }

    // Soft delete
    project.isActive = false;
    await project.save();

    res.json({
      message: 'Proyecto eliminado exitosamente'
    });
  } catch (error) {
    console.error('Error al eliminar proyecto:', error);
    res.status(500).json({
      error: 'Error interno del servidor',
      message: 'Error al eliminar proyecto'
    });
  }
};

// @desc    Add page to project
// @route   POST /api/projects/:id/pages
// @access  Private
const addPage = async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        error: 'Datos de entrada inválidos',
        details: errors.array()
      });
    }

    const { name, description, route } = req.body;

    const project = await Project.findOne({
      _id: req.params.id,
      userId: req.user.userId,
      isActive: true
    });

    if (!project) {
      return res.status(404).json({
        error: 'Proyecto no encontrado',
        message: 'El proyecto no existe o no tienes permisos para modificarlo'
      });
    }

    const newPage = {
      id: uuidv4(),
      name,
      description: description || '',
      route,
      userStories: []
    };

    project.pages.push(newPage);
    await project.save();

    res.status(201).json({
      message: 'Página agregada exitosamente',
      page: newPage
    });
  } catch (error) {
    console.error('Error al agregar página:', error);
    res.status(500).json({
      error: 'Error interno del servidor',
      message: 'Error al agregar página'
    });
  }
};

// @desc    Add user story to page
// @route   POST /api/projects/:projectId/pages/:pageId/user-stories
// @access  Private
const addUserStory = async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        error: 'Datos de entrada inválidos',
        details: errors.array()
      });
    }

    const { title, description, priority, estimatedHours } = req.body;
    const { projectId, pageId } = req.params;

    const project = await Project.findOne({
      _id: projectId,
      userId: req.user.userId,
      isActive: true
    });

    if (!project) {
      return res.status(404).json({
        error: 'Proyecto no encontrado',
        message: 'El proyecto no existe o no tienes permisos para modificarlo'
      });
    }

    const page = project.pages.find(p => p.id === pageId);
    if (!page) {
      return res.status(404).json({
        error: 'Página no encontrada',
        message: 'La página no existe en este proyecto'
      });
    }

    const newUserStory = {
      id: uuidv4(),
      title,
      description,
      priority: priority || 'medium',
      status: 'pending',
      estimatedHours: estimatedHours || 0
    };

    page.userStories.push(newUserStory);
    await project.save();

    res.status(201).json({
      message: 'Historia de usuario agregada exitosamente',
      userStory: newUserStory
    });
  } catch (error) {
    console.error('Error al agregar historia de usuario:', error);
    res.status(500).json({
      error: 'Error interno del servidor',
      message: 'Error al agregar historia de usuario'
    });
  }
};

// @desc    Sincronizar proyecto con repositorio GitHub
// @route   POST /api/projects/:id/sync
// @access  Private
const syncProject = async (req, res) => {
  try {
    const project = await Project.findOne({
      _id: req.params.id,
      userId: req.user.userId,
      isActive: true
    });

    console.log(`\n🚀 Iniciando sincronización del proyecto: ${project.name}`);
    console.log(`👤 Usuario: ${req.user.userId}`);
    console.log(`🆔 ID del proyecto: ${project._id}`);

    if (!project) {
      console.log('❌ Proyecto no encontrado');
      return res.status(404).json({
        error: 'Proyecto no encontrado',
        message: 'El proyecto no existe o no tienes permisos para modificarlo'
      });
    }

    console.log(`🔗 GitHub URL: ${project.githubUrl}`);
    if (!project.githubUrl) {
      console.log('❌ URL de GitHub no configurada');
      return res.status(400).json({
        error: 'URL de GitHub requerida',
        message: 'El proyecto debe tener una URL de GitHub configurada para sincronizar'
      });
    }

    // Verificar que la API key de Gemini esté configurada
    console.log('🔑 Verificando configuración de Gemini API...');
    if (!process.env.GEMINI_API_KEY) {
      console.log('❌ API key de Gemini no configurada');
      return res.status(500).json({
        error: 'Configuración faltante',
        message: 'La API key de Google Gemini no está configurada'
      });
    }
    console.log('✅ API key de Gemini configurada correctamente');

      // Eliminar todas las páginas y user stories existentes antes de la sincronización
      console.log('🗑️ Eliminando páginas y user stories existentes...');
      project.pages = [];
      await project.save(); // Guardar el proyecto después de limpiar las páginas
      console.log('✅ Páginas y user stories eliminadas.');

      // Crear directorio temporal para clonar el repositorio
    const tempDir = path.join(__dirname, '..', 'temp', `repo_${project._id}`);
    console.log(`📁 Directorio temporal: ${tempDir}`);
    
    try {
      // Limpiar directorio temporal si existe
      console.log('🧹 Preparando directorio temporal...');
      await cleanupTempDir(tempDir);
      await fs.ensureDir(tempDir);
      console.log('✅ Directorio temporal preparado');

      // Clonar repositorio
      console.log(`📥 Clonando repositorio: ${project.githubUrl}`);
      const git = simpleGit();
      await git.clone(project.githubUrl, tempDir);
      console.log('✅ Repositorio clonado exitosamente');

      // Buscar carpeta de páginas (pages o Pages)
      console.log('🔍 Buscando carpeta de páginas...');
      const pagesDir = await findPagesDirectory(tempDir);
      
      if (!pagesDir) {
        console.log('❌ Carpeta de páginas no encontrada');
        return res.status(404).json({
          error: 'Carpeta de páginas no encontrada',
          message: 'No se encontró una carpeta "pages" o "Pages" en el repositorio'
        });
      }
      console.log(`✅ Carpeta de páginas encontrada: ${pagesDir}`);

      // Obtener todas las páginas
      console.log('🔍 Buscando archivos de páginas en:', pagesDir);
      const pageFiles = await getPageFiles(pagesDir);
      console.log('📄 Páginas encontradas:', pageFiles.length);
      
      if (pageFiles.length === 0) {
        console.log('❌ No se encontraron páginas en el directorio');
        return res.status(404).json({
          error: 'No se encontraron páginas',
          message: 'No se encontraron archivos de páginas en el repositorio'
        });
      }

      // Inicializar Google Gemini
      console.log('🤖 Inicializando Google Gemini...');
      console.log('🔑 API Key presente:', !!process.env.GEMINI_API_KEY);
      const client = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      console.log('✅ Cliente Gemini inicializado correctamente');

      const syncResults = [];
      
      // Procesar cada página
      for (const pageFile of pageFiles) {
        try {
          console.log(`\n🔄 Procesando página: ${pageFile.name}`);
          console.log(`📁 Ruta del archivo: ${pageFile.path}`);
          
          // Leer contenido de la página
          console.log('📖 Leyendo contenido del archivo...');
          const pageContent = await fs.readFile(pageFile.path, 'utf8');
          console.log(`📝 Contenido leído: ${pageContent.length} caracteres`);
          
          // Obtener componentes importados
          console.log('🔍 Analizando componentes importados...');
          const importedComponents = await getImportedComponents(pageFile.path, tempDir);
          console.log(`🧩 Componentes encontrados: ${importedComponents.length}`);
          
          // Crear prompt para Gemini
          console.log('📝 Creando prompt para Gemini...');
          const prompt = createGeminiPrompt(pageFile.name, pageContent, importedComponents);
          console.log(`📋 Prompt creado: ${prompt.length} caracteres`);
          
          // Obtener user stories usando Gemini
          console.log('🤖 Enviando solicitud a Gemini...');
          const response = await client.models.generateContent({
            model: 'gemini-2.5-pro-preview-06-05',
            contents: prompt
          });
          console.log('✅ Respuesta recibida de Gemini');
          console.log('📄 Procesando respuesta...');
          
          // Escribir respuesta de Gemini en archivo
          await writeGeminiResponseToFile(response.text, `sync_${pageFile.name}`, project._id);
          
          const userStories = parseGeminiResponse(response.text);
          console.log('[DEBUG] User stories recibidas de Gemini:', JSON.stringify(userStories, null, 2)); // Log para depuración
          console.log(`📚 User stories generadas: ${userStories.length}`);
          
          syncResults.push({
            pageName: pageFile.name,
            userStories: userStories,
            componentsAnalyzed: importedComponents.length
          });
          
          // Agregar user stories al proyecto
          console.log('💾 Guardando user stories en el proyecto...');
          await addUserStoriesToProject(project, pageFile.name, userStories);
          // project.save() se llama dentro de addUserStoriesToProject, por lo que se guarda por cada página.
          console.log('✅ User stories guardadas correctamente para la página:', pageFile.name);
          
        } catch (error) {
          console.error(`❌ Error procesando página ${pageFile.name}:`, error.message);
          console.error('📋 Stack trace:', error.stack);
          syncResults.push({
            pageName: pageFile.name,
            error: error.message,
            userStories: []
          });
        }
      }

      console.log('\n🧹 Limpiando directorio temporal...');
      // Limpiar directorio temporal con reintentos para Windows
      try {
        await cleanupTempDir(tempDir);
        console.log('✅ Directorio temporal eliminado');
      } catch (cleanupError) {
        console.log('⚠️ Error limpiando directorio temporal:', cleanupError.message);
      }

      const totalUserStories = syncResults.reduce((total, result) => total + (result.userStories?.length || 0), 0);
      console.log(`\n🎉 Sincronización completada:`);
      console.log(`📄 Páginas procesadas: ${pageFiles.length}`);
      console.log(`📚 Total user stories generadas: ${totalUserStories}`);

      res.json({
        message: 'Sincronización completada exitosamente',
        project: {
          id: project._id,
          name: project.name,
          githubUrl: project.githubUrl
        },
        results: {
          pagesProcessed: pageFiles.length,
          totalUserStories: totalUserStories,
          details: syncResults
        }
      });

    } catch (error) {
      console.error('❌ Error en el bloque interno de sincronización:', error.message);
      console.error('📋 Stack trace interno:', error.stack);
      // Limpiar directorio temporal en caso de error
      try {
        await cleanupTempDir(tempDir);
      } catch (cleanupError) {
        console.error('❌ Error limpiando directorio temporal:', cleanupError.message);
      }
      throw error;
    }

  } catch (error) {
    console.error('❌ Error general en sincronización de proyecto:', error.message);
    console.error('📋 Stack trace general:', error.stack);
    res.status(500).json({
      error: 'Error interno del servidor',
      message: 'Error durante la sincronización del proyecto',
      details: error.message
    });
  }
};

// Función auxiliar para encontrar el directorio de páginas
const findPagesDirectory = async (repoDir) => {
  const possiblePaths = [
    path.join(repoDir, 'pages'),
    path.join(repoDir, 'Pages'),
    path.join(repoDir, 'src', 'pages'),
    path.join(repoDir, 'src', 'Pages'),
    path.join(repoDir, 'app', 'pages'),
    path.join(repoDir, 'app', 'Pages')
  ];

  for (const dirPath of possiblePaths) {
    if (await fs.pathExists(dirPath)) {
      return dirPath;
    }
  }
  
  return null;
};

// Función auxiliar para obtener archivos de páginas
const getPageFiles = async (pagesDir) => {
  const files = [];
  const items = await fs.readdir(pagesDir);
  
  for (const item of items) {
    const itemPath = path.join(pagesDir, item);
    const stat = await fs.stat(itemPath);
    
    if (stat.isFile()) {
      const ext = path.extname(item).toLowerCase();
      if (['.js', '.jsx', '.ts', '.tsx', '.vue'].includes(ext)) {
        files.push({
          name: path.basename(item, ext),
          path: itemPath,
          extension: ext
        });
      }
    }
  }
  
  return files;
};

// Función auxiliar para obtener componentes importados
const getImportedComponents = async (pageFilePath, repoDir) => {
  try {
    const pageContent = await fs.readFile(pageFilePath, 'utf8');
    const importRegex = /import\s+.*?from\s+['"]([^'"]+)['"]/g;
    const imports = [];
    let match;
    
    while ((match = importRegex.exec(pageContent)) !== null) {
      const importPath = match[1];
      
      // Solo procesar imports relativos (componentes locales)
      if (importPath.startsWith('./') || importPath.startsWith('../')) {
        const componentPath = path.resolve(path.dirname(pageFilePath), importPath);
        
        // Buscar el archivo con diferentes extensiones
        const possibleExtensions = ['.js', '.jsx', '.ts', '.tsx', '.vue'];
        for (const ext of possibleExtensions) {
          const fullPath = componentPath + ext;
          if (await fs.pathExists(fullPath)) {
            const componentContent = await fs.readFile(fullPath, 'utf8');
            imports.push({
              name: path.basename(importPath),
              path: fullPath,
              content: componentContent.substring(0, 2000) // Limitar contenido
            });
            break;
          }
        }
      }
    }
    
    return imports;
  } catch (error) {
    console.error('Error obteniendo componentes importados:', error);
    return [];
  }
};

// Función auxiliar para crear prompt de Gemini
const createGeminiPrompt = (pageName, pageContent, components) => {
  let prompt = `Analiza el siguiente código de una página React/Vue llamada "${pageName}" y extrae todas las funcionalidades desde la perspectiva del usuario final. 

Código de la página:
\`\`\`
${pageContent.substring(0, 3000)}
\`\`\`

`;
  
  if (components.length > 0) {
    prompt += `Componentes importados y utilizados:
`;
    components.forEach((comp, index) => {
      prompt += `\n${index + 1}. Componente: ${comp.name}
\`\`\`
${comp.content}
\`\`\`

`;
    });
  }
  
  prompt += `Por favor, identifica y lista todas las funcionalidades que un usuario puede realizar en esta página. Para cada funcionalidad, proporciona:

1. **Título**: Un título descriptivo de la funcionalidad
2. **Descripción**: Una descripción detallada de lo que puede hacer el usuario
3. **Criterios de Aceptación**: Lista de criterios específicos que deben cumplirse
4. **Prioridad**: Alta, Media o Baja

Formato de respuesta (JSON):
\`\`\`json
[
  {
    "title": "Título de la funcionalidad",
    "description": "Descripción detallada",
    "acceptanceCriteria": ["Criterio 1", "Criterio 2"],
    "priority": "Alta|Media|Baja"
  }
]
\`\`\`

Concentrate en las acciones que el usuario puede realizar, no en detalles técnicos de implementación.`;
  
  return prompt;
};

// Función auxiliar para parsear respuesta de Gemini
const parseGeminiResponse = (responseText) => {
  try {
    // Buscar JSON en la respuesta
    const jsonMatch = responseText.match(/```json\s*([\s\S]*?)\s*```/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[1]);
    }
    
    // Si no hay formato JSON, intentar parsear directamente
    const cleanResponse = responseText.replace(/```json|```/g, '').trim();
    return JSON.parse(cleanResponse);
  } catch (error) {
    console.error('Error parseando respuesta de Gemini:', error);
    // Retornar estructura básica en caso de error
    return [{
      title: 'Funcionalidad detectada',
      description: 'Se detectó funcionalidad pero no se pudo parsear correctamente',
      acceptanceCriteria: ['Revisar manualmente el análisis'],
      priority: 'Media'
    }];
  }
};

// Función auxiliar para agregar user stories al proyecto
const addUserStoriesToProject = async (project, pageName, userStoriesFromGemini) => {
  console.log(`[Sync] Agregando/actualizando user stories para la página: ${pageName}`);
  let page = project.pages.find(p => p.name === pageName);

  if (!page) {
    console.warn(`[Sync] Página "${pageName}" no encontrada en el proyecto. Creando nueva página...`);
    const generatedRoute = pageName
      .toLowerCase()
      .replace(/\s+/g, '-') // Reemplazar espacios con guiones
      .replace(/[^a-z0-9-\/]/g, ''); // Permitir solo alfanuméricos, guiones y barras

    const newPageData = {
      id: uuidv4(),
      name: pageName,
      description: `Página ${pageName} generada durante la sincronización.`,
      route: generatedRoute || pageName.toLowerCase().replace(/\s+/g, '-'), // Asegurar una ruta válida
      userStories: [] // Inicializar con array vacío
    };
    project.pages.push(newPageData);
    page = project.pages[project.pages.length - 1]; // Obtener la referencia a la página recién agregada
    console.log(`[Sync] Nueva página "${pageName}" creada con ID ${page.id} y ruta ${page.route}`);
  } else {
    console.log(`[Sync] Página "${pageName}" encontrada. ID: ${page.id}`);
  }

  // Limpiar historias de usuario existentes generadas por IA para esta página si es necesario,
  // o fusionar de forma inteligente. Por ahora, las reemplazaremos.
  // page.userStories = []; // Opción 1: Reemplazar todas
  
  console.log(`[Sync] Agregando ${userStoriesFromGemini.length} nuevas user stories a la página "${pageName}"`);

  const priorityMap = {
    'alta': 'high',
    'media': 'medium',
    'baja': 'low'
  };

  userStoriesFromGemini.forEach(storyData => {
    const mappedPriority = priorityMap[(storyData.priority || '').toLowerCase()] || 'medium';
    const newUserStory = {
      id: uuidv4(),
      title: storyData.title,
      description: storyData.description,
      priority: mappedPriority,
      status: 'completed', // Set status to completed for synced stories
      estimatedHours: storyData.estimatedHours || 0,
      // createdAt y updatedAt serán manejados por Mongoose si se definen en el schema
    };
    page.userStories.push(newUserStory);
  });
  
  console.log(`[Sync] Total user stories en página "${pageName}" después de agregar: ${page.userStories.length}`);

  try {
    await project.save(); // Guardar el proyecto para persistir las nuevas historias y/o páginas
    console.log(`[Sync] ✅ User stories para "${pageName}" guardadas/actualizadas exitosamente en el proyecto.`);
  } catch (error) {
    // Loguear el error completo, incluyendo el objeto de error si es una ValidationError
    console.error(`❌ Error agregando user stories al proyecto para la página "${pageName}":`, error.message);
    if (error.errors) {
        console.error('Detalles de validación:', JSON.stringify(error.errors, null, 2));
    }
    console.error('Stack trace del error en addUserStoriesToProject:', error.stack);
    throw error; // Re-lanzar para que syncProject lo maneje
  }
};

// @desc    Generate page description using AI
// @route   POST /api/projects/:projectId/pages/:pageId/generate-description
// @access  Private
const generatePageDescription = async (req, res) => {
  try {
    const { projectId, pageId } = req.params;
    console.log('🔍 generatePageDescription - Parámetros recibidos:', { projectId, pageId });
    console.log('👤 Usuario autenticado:', req.user?.userId);

    // Verificar que la API key de Gemini esté configurada
    if (!process.env.GEMINI_API_KEY) {
      console.log('❌ API key de Gemini no configurada');
      return res.status(500).json({
        error: 'Configuración faltante',
        message: 'La API key de Google Gemini no está configurada'
      });
    }

    console.log('🔍 Buscando proyecto con ID:', projectId);
    const project = await Project.findOne({
      _id: projectId,
      userId: req.user.userId,
      isActive: true
    });

    if (!project) {
      console.log('❌ Proyecto no encontrado para:', { projectId, userId: req.user.userId });
      return res.status(404).json({
        error: 'Proyecto no encontrado',
        message: 'El proyecto no existe o no tienes permisos para modificarlo'
      });
    }

    console.log('✅ Proyecto encontrado:', project.name);
    console.log('📄 Páginas en el proyecto:', project.pages.length);
    console.log('🔍 Buscando página con ID:', pageId);
    
    // Listar todas las páginas para debug
    project.pages.forEach((p, index) => {
      console.log(`  Página ${index}: ID=${p.id}, name=${p.name}`);
    });

    const page = project.pages.find(p => p.id === pageId);
    if (!page) {
      console.log('❌ Página no encontrada con ID:', pageId);
      return res.status(404).json({
        error: 'Página no encontrada',
        message: 'La página no existe en este proyecto'
      });
    }

    console.log('✅ Página encontrada:', page.name);

    console.log(`🤖 Generando descripción para la página: ${page.name}`);
    console.log(`📚 User stories disponibles: ${page.userStories.length}`);

    // Inicializar Google Gemini
    const client = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

    // Crear el prompt para generar la descripción
    const userStoriesText = page.userStories.map(story => 
      `- ${story.title}: ${story.description} (Prioridad: ${story.priority})`
    ).join('\n');

    const prompt = `
Actúa como un analista de producto experto. Basándote en el nombre de la página y las historias de usuario proporcionadas, genera una descripción clara y concisa de la página.

Nombre de la página: "${page.name}"
Ruta de la página: "${page.route || 'No especificada'}"

Historias de usuario asociadas:
${userStoriesText || 'No hay historias de usuario definidas aún.'}

Instrucciones:
1. Genera una descripción de 2-4 oraciones que explique claramente el propósito y funcionalidad de esta página
2. La descripción debe ser técnica pero comprensible
3. Incluye las funcionalidades principales basándote en las historias de usuario
4. Mantén un tono profesional y directo
5. Si no hay historias de usuario, basa la descripción únicamente en el nombre y ruta de la página

Responde únicamente con la descripción, sin explicaciones adicionales.`;

    console.log('📝 Enviando solicitud a Gemini para generar descripción...');
    
    try {
      const response = await client.models.generateContent({
        model: 'gemini-1.5-pro',
        contents: prompt
      });
      
      // Escribir respuesta de Gemini en archivo
      await writeGeminiResponseToFile(response.text, `description_${page.name}`, projectId);
      
      const generatedDescription = response.text.trim();

      console.log('✅ Descripción generada exitosamente');
      console.log(`📄 Descripción: ${generatedDescription}`);

      res.json({
        message: 'Descripción generada exitosamente',
        description: generatedDescription,
        pageInfo: {
          id: page.id,
          name: page.name,
          route: page.route,
          userStoriesCount: page.userStories.length
        }
      });

    } catch (geminiError) {
      console.error('❌ Error al generar descripción con Gemini:', geminiError);
      res.status(500).json({
        error: 'Error al generar descripción',
        message: 'No se pudo generar la descripción usando IA. Inténtalo de nuevo.'
      });
    }

  } catch (error) {
    console.error('Error al generar descripción de página:', error);
    res.status(500).json({
      error: 'Error interno del servidor',
      message: 'Error al generar descripción de página'
    });
  }
};


// @desc    Update page
// @route   PUT /api/projects/:projectId/pages/:pageId
// @access  Private
const updatePage = async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        error: 'Datos de entrada inválidos',
        details: errors.array()
      });
    }

    const { name, description, route } = req.body;
    const { projectId, pageId } = req.params;

    console.log('🔍 updatePage - Parámetros recibidos:', { projectId, pageId });
    console.log('👤 Usuario autenticado:', req.user?.userId);
    console.log('📝 Datos a actualizar:', { name, description, route });

    const project = await Project.findOne({
      _id: projectId,
      userId: req.user.userId,
      isActive: true
    });

    if (!project) {
      console.log('❌ Proyecto no encontrado para:', { projectId, userId: req.user.userId });
      return res.status(404).json({
        error: 'Proyecto no encontrado',
        message: 'El proyecto no existe o no tienes permisos para modificarlo'
      });
    }

    console.log('✅ Proyecto encontrado:', project.name);
    console.log('📄 Páginas en el proyecto:', project.pages.length);
    console.log('🔍 Buscando página con ID:', pageId);
    
    const pageIndex = project.pages.findIndex(p => p.id === pageId);
    if (pageIndex === -1) {
      console.log('❌ Página no encontrada con ID:', pageId);
      return res.status(404).json({
        error: 'Página no encontrada',
        message: 'La página no existe en este proyecto'
      });
    }

    console.log('✅ Página encontrada:', project.pages[pageIndex].name);

    // Update page fields
    if (name !== undefined) project.pages[pageIndex].name = name;
    if (description !== undefined) project.pages[pageIndex].description = description;
    if (route !== undefined) project.pages[pageIndex].route = route;
    
    project.pages[pageIndex].updatedAt = new Date();

    await project.save();

    console.log('✅ Página actualizada exitosamente');

    res.json({
      message: 'Página actualizada exitosamente',
      page: project.pages[pageIndex]
    });

  } catch (error) {
    console.error('Error al actualizar página:', error);
    res.status(500).json({
      error: 'Error interno del servidor',
      message: 'Error al actualizar página'
    });
  }
};// @desc    Generate backend structure from GitHub repository API folder
// @route   POST /api/projects/:id/generate-backend
// @access  Private
const generateBackendFromAPI = async (req, res) => {
  try {
    const projectId = req.params.id;
    const { outputPath = './generated-backend', includeDatabase = true, framework = 'express' } = req.body;
    
    console.log('🚀 generateBackendFromAPI - Iniciando generación de backend');
    console.log('📋 Parámetros:', { projectId, outputPath, includeDatabase, framework });
    console.log('👤 Usuario:', req.user?.userId);

    // Verificar que la API key de Gemini esté configurada
    if (!process.env.GEMINI_API_KEY) {
      console.log('❌ API key de Gemini no configurada');
      return res.status(500).json({
        error: 'Configuración faltante',
        message: 'La API key de Google Gemini no está configurada'
      });
    }

    const project = await Project.findOne({
      _id: projectId,
      userId: req.user.userId,
      isActive: true
    });

    if (!project) {
      console.log('❌ Proyecto no encontrado');
      return res.status(404).json({
        error: 'Proyecto no encontrado',
        message: 'El proyecto no existe o no tienes permisos para modificarlo'
      });
    }

    if (!project.githubUrl) {
      console.log('❌ URL de GitHub no configurada');
      return res.status(400).json({
        error: 'URL de GitHub requerida',
        message: 'El proyecto debe tener una URL de GitHub configurada'
      });
    }

    console.log(`✅ Proyecto encontrado: ${project.name}`);
    console.log(`🔗 GitHub URL: ${project.githubUrl}`);

    // Crear directorio temporal para clonar el repositorio
    const tempDir = path.join(__dirname, '..', 'temp', `backend_gen_${project._id}_${Date.now()}`);
    console.log(`📁 Directorio temporal: ${tempDir}`);
    
    try {
      // Preparar directorio temporal
      console.log('🧹 Preparando directorio temporal...');
      await cleanupTempDir(tempDir);
      await fs.ensureDir(tempDir);
      console.log('✅ Directorio temporal preparado');

      // Clonar repositorio
      console.log(`📥 Clonando repositorio: ${project.githubUrl}`);
      const git = simpleGit();
      await git.clone(project.githubUrl, tempDir);
      console.log('✅ Repositorio clonado exitosamente');

      // Buscar carpeta API
      console.log('🔍 Buscando carpeta API...');
      const apiDir = await findAPIDirectory(tempDir);
      
      if (!apiDir) {
        console.log('❌ Carpeta API no encontrada');
        return res.status(404).json({
          error: 'Carpeta API no encontrada',
          message: 'No se encontró una carpeta "api", "API", "routes" o "endpoints" en el repositorio'
        });
      }
      console.log(`✅ Carpeta API encontrada: ${apiDir}`);

      // Analizar archivos API
      console.log('🔍 Analizando archivos API...');
      const apiFiles = await getAPIFiles(apiDir);
      console.log(`📄 Archivos API encontrados: ${apiFiles.length}`);
      
      if (apiFiles.length === 0) {
        console.log('❌ No se encontraron archivos API');
        return res.status(404).json({
          error: 'No se encontraron archivos API',
          message: 'No se encontraron archivos de API en el directorio especificado'
        });
      }

      // Inicializar Google Gemini
      console.log('🤖 Inicializando Google Gemini...');
      const client = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      console.log('✅ Cliente Gemini inicializado correctamente');

      const backendStructure = {
        models: [],
        controllers: [],
        routes: [],
        middleware: [], // Se mantiene por si el análisis general lo sugiere
        config: []      // Se mantiene por si el análisis general lo sugiere
      };

      // Procesar cada archivo API
      for (const apiFile of apiFiles) {
        try {
          console.log(`\n🔄 Procesando archivo API: ${apiFile.name} para generar backend completo`);
          console.log(`📁 Ruta del archivo: ${apiFile.path}`);
          
          console.log('📖 Leyendo contenido del archivo...');
          const apiContent = await fs.readFile(apiFile.path, 'utf8');
          console.log(`📝 Contenido leído: ${apiContent.length} caracteres`);

          // --- Generar Modelos ---
          console.log('📝 Creando prompt para Modelos...');
          const modelsPrompt = createTargetedBackendAnalysisPrompt(apiFile.name, apiContent, framework, includeDatabase, 'models');
          console.log(`🤖 Enviando solicitud a Gemini para Modelos...`);
          let response = await client.models.generateContent({
            model: 'gemini-2.5-pro-preview-06-05',
            contents: modelsPrompt
          });
          console.log('✅ Respuesta recibida de Gemini para Modelos');
          console.log('🤖 Respuesta cruda de Gemini (Modelos):', response.text);
          
          // Escribir respuesta de Gemini en archivo
          await writeGeminiResponseToFile(response.text, 'modelos', projectId);
          
          let analysis = parseBackendAnalysisResponse(response.text);
          console.log(`📚 Análisis de Modelos completado para: ${apiFile.name}`);
          console.log('🔍 Análisis parseado de Gemini (Modelos):', JSON.stringify(analysis, null, 2));
          if (analysis.models) backendStructure.models.push(...analysis.models);
          // Opcionalmente, si el análisis de modelos sugiere otros componentes:
          // if (analysis.middleware) backendStructure.middleware.push(...analysis.middleware);
          // if (analysis.config) backendStructure.config.push(...analysis.config);

          // --- Generar Controladores ---
          console.log('📝 Creando prompt para Controladores...');
          const controllersPrompt = createTargetedBackendAnalysisPrompt(apiFile.name, apiContent, framework, includeDatabase, 'controllers');
          console.log(`🤖 Enviando solicitud a Gemini para Controladores...`);
          response = await client.models.generateContent({
            model: 'gemini-2.5-pro-preview-06-05',
            contents: controllersPrompt
          });
          console.log('✅ Respuesta recibida de Gemini para Controladores');
          console.log('🤖 Respuesta cruda de Gemini (Controladores):', response.text);
          
          // Escribir respuesta de Gemini en archivo
          await writeGeminiResponseToFile(response.text, 'controladores', projectId);
          
          analysis = parseBackendAnalysisResponse(response.text);
          console.log(`📚 Análisis de Controladores completado para: ${apiFile.name}`);
          console.log('🔍 Análisis parseado de Gemini (Controladores):', JSON.stringify(analysis, null, 2));
          if (analysis.controllers) backendStructure.controllers.push(...analysis.controllers);
          // Opcionalmente:
          // if (analysis.middleware) backendStructure.middleware.push(...analysis.middleware);
          // if (analysis.config) backendStructure.config.push(...analysis.config);

          // --- Generar Rutas ---
          console.log('📝 Creando prompt para Rutas...');
          const routesPrompt = createTargetedBackendAnalysisPrompt(apiFile.name, apiContent, framework, includeDatabase, 'routes');
          console.log(`🤖 Enviando solicitud a Gemini para Rutas...`);
          response = await client.models.generateContent({
            model: 'gemini-2.5-pro-preview-06-05',
            contents: routesPrompt
          });
          console.log('✅ Respuesta recibida de Gemini para Rutas');
          console.log('🤖 Respuesta cruda de Gemini (Rutas):', response.text);
          
          // Escribir respuesta de Gemini en archivo
          await writeGeminiResponseToFile(response.text, 'rutas', projectId);
          
          analysis = parseBackendAnalysisResponse(response.text);
          console.log(`📚 Análisis de Rutas completado para: ${apiFile.name}`);
          console.log('🔍 Análisis parseado de Gemini (Rutas):', JSON.stringify(analysis, null, 2));
          if (analysis.routes) backendStructure.routes.push(...analysis.routes);
          // Opcionalmente:
          // if (analysis.middleware) backendStructure.middleware.push(...analysis.middleware);
          // if (analysis.config) backendStructure.config.push(...analysis.config);
          
        } catch (error) {
          console.error(`❌ Error procesando archivo API ${apiFile.name}:`, error.message);
        }
      }

      // Generar archivos del backend
      console.log('\n🏗️ Generando estructura del backend...');
      const generatedFiles = await generateBackendFiles(backendStructure, outputPath, framework, includeDatabase, client);
      
      console.log('\n🧹 Limpiando directorio temporal...');
      try {
        await cleanupTempDir(tempDir);
        console.log('✅ Directorio temporal eliminado');
      } catch (cleanupError) {
        console.log('⚠️ Error limpiando directorio temporal:', cleanupError.message);
      }

      console.log(`\n🎉 Generación de backend completada:`);
      console.log(`📄 Archivos API analizados: ${apiFiles.length}`);
      console.log(`🏗️ Archivos generados: ${generatedFiles.length}`);

      res.json({
        message: 'Backend generado exitosamente',
        project: {
          id: project._id,
          name: project.name,
          githubUrl: project.githubUrl
        },
        results: {
          apiFilesAnalyzed: apiFiles.length,
          generatedFiles: generatedFiles.length,
          outputPath: outputPath,
          framework: framework,
          includeDatabase: includeDatabase,
          structure: {
            models: backendStructure.models.length,
            controllers: backendStructure.controllers.length,
            routes: backendStructure.routes.length,
            middleware: backendStructure.middleware.length,
            config: backendStructure.config.length
          },
          files: generatedFiles
        }
      });

    } catch (error) {
      console.error('❌ Error en el proceso de generación:', error);
      
      // Limpiar directorio temporal en caso de error
      try {
        await cleanupTempDir(tempDir);
      } catch (cleanupError) {
        console.log('⚠️ Error limpiando directorio temporal después del error:', cleanupError.message);
      }
      
      throw error;
    }

  } catch (error) {
    console.error('Error al generar backend:', error);
    res.status(500).json({
      error: 'Error interno del servidor',
      message: 'Error al generar backend desde API'
    });
  }
};

// @desc    Generate user stories for a specific page using AI
// @route   POST /api/projects/:projectId/pages/:pageId/generate-user-stories
// @access  Private
const generateUserStoriesForPage = async (req, res) => {
  try {
    const { projectId, pageId } = req.params;
    const { numUserStories = 5, userStoryType = '' } = req.body;
    
    console.log('🔍 generateUserStoriesForPage - Parámetros recibidos:', { projectId, pageId, numUserStories, userStoryType });
    console.log('👤 Usuario autenticado:', req.user?.userId);

    // Verificar que la API key de Gemini esté configurada
    if (!process.env.GEMINI_API_KEY) {
      console.log('❌ API key de Gemini no configurada');
      return res.status(500).json({
        error: 'Configuración faltante',
        message: 'La API key de Google Gemini no está configurada'
      });
    }

    const project = await Project.findOne({
      _id: projectId,
      userId: req.user.userId,
      isActive: true
    });

    if (!project) {
      console.log('❌ Proyecto no encontrado para:', { projectId, userId: req.user.userId });
      return res.status(404).json({
        error: 'Proyecto no encontrado',
        message: 'El proyecto no existe o no tienes permisos para modificarlo'
      });
    }

    console.log('✅ Proyecto encontrado:', project.name);
    
    const page = project.pages.find(p => p.id === pageId);
    if (!page) {
      console.log('❌ Página no encontrada con ID:', pageId);
      return res.status(404).json({
        error: 'Página no encontrada',
        message: 'La página no existe en este proyecto'
      });
    }

    console.log('✅ Página encontrada:', page.name);

    // Verificar si el proyecto tiene URL de GitHub
    if (!project.githubUrl) {
      console.log('❌ URL de GitHub no configurada');
      return res.status(400).json({
        error: 'URL de GitHub requerida',
        message: 'El proyecto debe tener una URL de GitHub configurada para generar historias de usuario'
      });
    }

    // Crear directorio temporal para clonar el repositorio
    const tempDir = path.join(__dirname, '..', 'temp', `repo_${project._id}_${Date.now()}`);
    console.log(`📁 Directorio temporal: ${tempDir}`);
    
    try {
      // Limpiar directorio temporal si existe
      console.log('🧹 Preparando directorio temporal...');
      await cleanupTempDir(tempDir);
      await fs.ensureDir(tempDir);
      console.log('✅ Directorio temporal preparado');

      // Clonar repositorio
      console.log(`📥 Clonando repositorio: ${project.githubUrl}`);
      const git = simpleGit();
      await git.clone(project.githubUrl, tempDir);
      console.log('✅ Repositorio clonado exitosamente');

      // Buscar carpeta de páginas
      console.log('🔍 Buscando carpeta de páginas...');
      const pagesDir = await findPagesDirectory(tempDir);
      
      if (!pagesDir) {
        console.log('❌ Carpeta de páginas no encontrada');
        return res.status(404).json({
          error: 'Carpeta de páginas no encontrada',
          message: 'No se encontró una carpeta "pages" o "Pages" en el repositorio'
        });
      }
      console.log(`✅ Carpeta de páginas encontrada: ${pagesDir}`);

      // Buscar el archivo específico de la página
      console.log(`🔍 Buscando archivo para la página: ${page.name}`);
      const pageFiles = await getPageFiles(pagesDir);
      const targetPageFile = pageFiles.find(file => 
        file.name.toLowerCase().includes(page.name.toLowerCase()) ||
        page.name.toLowerCase().includes(file.name.toLowerCase())
      );

      if (!targetPageFile) {
        console.log('❌ Archivo de página no encontrado');
        return res.status(404).json({
          error: 'Archivo de página no encontrado',
          message: `No se encontró el archivo correspondiente a la página "${page.name}" en el repositorio`
        });
      }

      console.log(`✅ Archivo de página encontrado: ${targetPageFile.path}`);

      // Leer contenido de la página
      console.log('📖 Leyendo contenido del archivo...');
      const pageContent = await fs.readFile(targetPageFile.path, 'utf8');
      console.log(`📝 Contenido leído: ${pageContent.length} caracteres`);
      
      // Obtener componentes importados
      console.log('🔍 Analizando componentes importados...');
      const importedComponents = await getImportedComponents(targetPageFile.path, tempDir);
      console.log(`🧩 Componentes encontrados: ${importedComponents.length}`);
      
      // Crear prompt personalizado para Gemini
       console.log('📝 Creando prompt personalizado para Gemini...');
       const prompt = createUserStoriesPrompt(page.name, pageContent, importedComponents, numUserStories, userStoryType, page.description, page.userStories);
       console.log(`📋 Prompt creado: ${prompt.length} caracteres`);
       console.log(`📄 Descripción de página: ${page.description || 'Sin descripción'}`);
       console.log(`📚 Historias existentes: ${page.userStories ? page.userStories.length : 0}`);
      
      // Inicializar Google Gemini
      console.log('🤖 Inicializando Google Gemini...');
      const client = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      console.log('✅ Cliente Gemini inicializado correctamente');
      
      // Obtener user stories usando Gemini
      console.log('🤖 Enviando solicitud a Gemini...');
      const response = await client.models.generateContent({
        model: 'gemini-2.5-pro-preview-06-05',
        contents: prompt
      });
      console.log('✅ Respuesta recibida de Gemini');
      
      // Escribir respuesta de Gemini en archivo
      await writeGeminiResponseToFile(response.text, `generate_stories_${page.name}`, projectId);
      
      const userStories = parseGeminiResponse(response.text);
      console.log(`📚 User stories generadas: ${userStories.length}`);
      
      // Agregar las nuevas user stories a la página
      console.log('💾 Agregando user stories a la página...');
      const priorityMap = {
        'alta': 'high',
        'media': 'medium', 
        'baja': 'low'
      };

      userStories.forEach(storyData => {
        const mappedPriority = priorityMap[(storyData.priority || '').toLowerCase()] || 'medium';
        const newUserStory = {
          id: uuidv4(),
          title: storyData.title,
          description: storyData.description,
          priority: mappedPriority,
          status: 'pending',
          estimatedHours: storyData.estimatedHours || 0
        };
        page.userStories.push(newUserStory);
      });

      await project.save();
      console.log('✅ User stories agregadas exitosamente');

      // Limpiar directorio temporal
      console.log('🧹 Limpiando directorio temporal...');
      try {
        await cleanupTempDir(tempDir);
        console.log('✅ Directorio temporal eliminado');
      } catch (cleanupError) {
        console.log('⚠️ Error limpiando directorio temporal:', cleanupError.message);
      }

      res.json({
        message: 'Historias de usuario generadas exitosamente',
        userStoriesCount: userStories.length,
        userStories: userStories
      });

    } catch (error) {
      console.error('❌ Error en el proceso de generación:', error);
      
      // Limpiar directorio temporal en caso de error
      try {
        await cleanupTempDir(tempDir);
      } catch (cleanupError) {
        console.log('⚠️ Error limpiando directorio temporal después del error:', cleanupError.message);
      }
      
      throw error;
    }

  } catch (error) {
    console.error('Error al generar historias de usuario:', error);
    res.status(500).json({
      error: 'Error interno del servidor',
      message: 'Error al generar historias de usuario con IA'
    });
  }
};

// Función auxiliar para encontrar el directorio de API
const findAPIDirectory = async (repoDir) => {
  const possiblePaths = [
    path.join(repoDir, 'api'),
    path.join(repoDir, 'API'),
    path.join(repoDir, 'apis'),
    path.join(repoDir, 'APIS'),
    path.join(repoDir, 'src', 'api'),
    path.join(repoDir, 'src', 'API'),
    path.join(repoDir, 'src', 'apis'),
    path.join(repoDir, 'src', 'APIS'),
    path.join(repoDir, 'routes'),
    path.join(repoDir, 'src', 'routes'),
    path.join(repoDir, 'endpoints'),
    path.join(repoDir, 'src', 'endpoints'),
    path.join(repoDir, 'server', 'api'),
    path.join(repoDir, 'backend', 'api'),
    path.join(repoDir, 'backend', 'routes')
  ];

  for (const dirPath of possiblePaths) {
    if (await fs.pathExists(dirPath)) {
      return dirPath;
    }
  }
  
  return null;
};

// Función auxiliar para obtener archivos de API
const getAPIFiles = async (apiDir) => {
  const files = [];
  
  const processDirectory = async (dirPath) => {
    const items = await fs.readdir(dirPath);
    
    for (const item of items) {
      const itemPath = path.join(dirPath, item);
      const stat = await fs.stat(itemPath);
      
      if (stat.isDirectory()) {
        // Recursivamente procesar subdirectorios
        await processDirectory(itemPath);
      } else if (stat.isFile()) {
        const ext = path.extname(item).toLowerCase();
        if (['.js', '.jsx', '.ts', '.tsx', '.json', '.yaml', '.yml'].includes(ext)) {
          files.push({
            name: path.basename(item, ext),
            path: itemPath,
            extension: ext,
            relativePath: path.relative(apiDir, itemPath)
          });
        }
      }
    }
  };
  
  await processDirectory(apiDir);
  return files;
};

// Nueva o modificada función para prompts específicos
const createTargetedBackendAnalysisPrompt = (fileName, fileContent, framework, includeDatabase, targetType) => {
  let specificInstructions = '';
  let responseFormat = {};

  switch (targetType) {
    case 'models':
      specificInstructions = `Identifica las entidades de datos necesarias y genera SOLO los modelos de datos ${includeDatabase ? 'con esquemas de base de datos (MongoDB/Mongoose)' : 'simples'}.`;
      responseFormat = {
        "models": [
          {
            "name": "NombreModelo",
            "fileName": "nombreModelo.js",
            "content": "código completo del modelo",
            "description": "descripción del modelo"
          }
        ]
      };
      break;
    case 'controllers':
      specificInstructions = "Crea SOLO los controladores con toda la lógica de negocio, basándote en los posibles modelos que se podrían haber generado.";
      responseFormat = {
        "controllers": [
          {
            "name": "NombreController",
            "fileName": "nombreController.js",
            "content": "código completo del controlador",
            "description": "descripción del controlador"
          }
        ]
      };
      break;
    case 'routes':
      specificInstructions = "Define SOLO las rutas completas con middleware de validación, basándote en los posibles controladores que se podrían haber generado.";
      responseFormat = {
        "routes": [
          {
            "name": "NombreRoute",
            "fileName": "nombreRoute.js",
            "content": "código completo de las rutas",
            "description": "descripción de las rutas"
          }
        ]
      };
      break;
    default:
      // Fallback al prompt general si el tipo no es reconocido, o lanzar error
      return createBackendAnalysisPrompt(fileName, fileContent, framework, includeDatabase); 
  }

  let prompt = `Analiza el siguiente archivo de API/endpoint llamado "${fileName}" y genera la estructura específica para ${targetType.toUpperCase()} en ${framework} con Node.js.

Contenido del archivo:
\`\`\`
${fileContent.substring(0, 4000)}
\`\`\`

Instrucciones Específicas para ${targetType.toUpperCase()}:
1. ${specificInstructions}
2. Incluye manejo de errores completo.
3. Agrega validación de datos si aplica.
4. Implementa respuestas HTTP apropiadas si aplica.
5. Usa async/await para operaciones asíncronas.
6. Incluye comentarios explicativos en el código.
${includeDatabase && targetType === 'models' ? '- Usa Mongoose para modelos de MongoDB' : ''}
- Sigue patrones RESTful para las APIs si aplica.

Formato de respuesta (JSON):
\`\`\`json
${JSON.stringify(responseFormat, null, 2)}
\`\`\`

Asegúrate de:
- Usar las mejores prácticas de ${framework}
- Generar SOLO los componentes de tipo ${targetType.toUpperCase()}.
`;
  
  return prompt;
};

// Función auxiliar para crear prompt de análisis de backend
const createBackendAnalysisPrompt = (fileName, fileContent, framework, includeDatabase) => {
  let prompt = `Analiza el siguiente archivo de API/endpoint llamado "${fileName}" y genera la estructura completa de backend en ${framework} con Node.js.

Contenido del archivo:
\`\`\`
${fileContent.substring(0, 4000)}
\`\`\`

Instrucciones:
1. Analiza los endpoints, métodos HTTP, parámetros y respuestas
2. Identifica las entidades de datos necesarias
3. Genera modelos de datos ${includeDatabase ? 'con esquemas de base de datos (MongoDB/Mongoose)' : 'simples'}
4. Crea controladores con toda la lógica de negocio
5. Define rutas completas con middleware de validación
6. Incluye middleware de autenticación y validación si es necesario
7. Agrega configuración básica del servidor

Formato de respuesta (JSON):
\`\`\`json
{
  "models": [
    {
      "name": "NombreModelo",
      "fileName": "nombreModelo.js",
      "content": "código completo del modelo",
      "description": "descripción del modelo"
    }
  ],
  "controllers": [
    {
      "name": "NombreController",
      "fileName": "nombreController.js",
      "content": "código completo del controlador",
      "description": "descripción del controlador"
    }
  ],
  "routes": [
    {
      "name": "NombreRoute",
      "fileName": "nombreRoute.js",
      "content": "código completo de las rutas",
      "description": "descripción de las rutas"
    }
  ],
  "middleware": [
    {
      "name": "NombreMiddleware",
      "fileName": "nombreMiddleware.js",
      "content": "código completo del middleware",
      "description": "descripción del middleware"
    }
  ],
  "config": [
    {
      "name": "NombreConfig",
      "fileName": "nombreConfig.js",
      "content": "código completo de configuración",
      "description": "descripción de la configuración"
    }
  ]
}
\`\`\`

Asegúrate de:
- Usar las mejores prácticas de ${framework}
- Incluir manejo de errores completo
- Agregar validación de datos
- Implementar respuestas HTTP apropiadas
- Usar async/await para operaciones asíncronas
- Incluir comentarios explicativos en el código
${includeDatabase ? '- Usar Mongoose para modelos de MongoDB' : '- Usar estructuras de datos simples'}
- Seguir patrones RESTful para las APIs`;
  
  return prompt;
};

// Función auxiliar para parsear respuesta de análisis de backend
const parseBackendAnalysisResponse = (responseText) => {
  try {
    // Buscar JSON en la respuesta
    const jsonMatch = responseText.match(/```json\s*([\s\S]*?)\s*```/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[1]);
    }
    
    // Si no hay formato JSON, intentar parsear directamente
    const cleanResponse = responseText.replace(/```json|```/g, '').trim();
    return JSON.parse(cleanResponse);
  } catch (error) {
    console.error('Error parseando respuesta de análisis de backend:', error);
    // Retornar estructura básica en caso de error
    return {
      models: [],
      controllers: [],
      routes: [],
      middleware: [],
      config: []
    };
  }
};

// Función auxiliar para generar archivos del backend
const generateBackendFiles = async (backendStructure, outputPath, framework, includeDatabase, geminiClient) => {
  const generatedFiles = [];
  
  try {
    // Crear directorio de salida
    const fullOutputPath = path.resolve(outputPath);
    await fs.ensureDir(fullOutputPath);
    
    // Crear estructura de directorios
    const directories = ['models', 'controllers', 'routes', 'middleware', 'config'];
    for (const dir of directories) {
      await fs.ensureDir(path.join(fullOutputPath, dir));
    }
    
    // Generar archivos de modelos
    for (const model of backendStructure.models) {
      const filePath = path.join(fullOutputPath, 'models', model.fileName);
      await fs.writeFile(filePath, model.content, 'utf8');
      generatedFiles.push({
        type: 'model',
        name: model.name,
        fileName: model.fileName,
        path: filePath,
        description: model.description
      });
    }
    
    // Generar archivos de controladores
    for (const controller of backendStructure.controllers) {
      const filePath = path.join(fullOutputPath, 'controllers', controller.fileName);
      await fs.writeFile(filePath, controller.content, 'utf8');
      generatedFiles.push({
        type: 'controller',
        name: controller.name,
        fileName: controller.fileName,
        path: filePath,
        description: controller.description
      });
    }
    
    // Generar archivos de rutas
    for (const route of backendStructure.routes) {
      const filePath = path.join(fullOutputPath, 'routes', route.fileName);
      await fs.writeFile(filePath, route.content, 'utf8');
      generatedFiles.push({
        type: 'route',
        name: route.name,
        fileName: route.fileName,
        path: filePath,
        description: route.description
      });
    }
    
    // Generar archivos de middleware
    for (const middleware of backendStructure.middleware) {
      const filePath = path.join(fullOutputPath, 'middleware', middleware.fileName);
      await fs.writeFile(filePath, middleware.content, 'utf8');
      generatedFiles.push({
        type: 'middleware',
        name: middleware.name,
        fileName: middleware.fileName,
        path: filePath,
        description: middleware.description
      });
    }
    
    // Generar archivos de configuración
    for (const config of backendStructure.config) {
      const filePath = path.join(fullOutputPath, 'config', config.fileName);
      await fs.writeFile(filePath, config.content, 'utf8');
      generatedFiles.push({
        type: 'config',
        name: config.name,
        fileName: config.fileName,
        path: filePath,
        description: config.description
      });
    }
    
    // Generar package.json
    const packageJsonContent = await generatePackageJson(framework, includeDatabase, geminiClient);
    const packageJsonPath = path.join(fullOutputPath, 'package.json');
    await fs.writeFile(packageJsonPath, packageJsonContent, 'utf8');
    generatedFiles.push({
      type: 'config',
      name: 'PackageJson',
      fileName: 'package.json',
      path: packageJsonPath,
      description: 'Configuración de dependencias del proyecto'
    });
    
    // Generar server.js principal
    const serverContent = await generateMainServer(framework, includeDatabase, geminiClient);
    const serverPath = path.join(fullOutputPath, 'server.js');
    await fs.writeFile(serverPath, serverContent, 'utf8');
    generatedFiles.push({
      type: 'config',
      name: 'MainServer',
      fileName: 'server.js',
      path: serverPath,
      description: 'Archivo principal del servidor'
    });
    
    // Generar README.md
    const readmeContent = generateReadme(framework, includeDatabase, generatedFiles);
    const readmePath = path.join(fullOutputPath, 'README.md');
    await fs.writeFile(readmePath, readmeContent, 'utf8');
    generatedFiles.push({
      type: 'documentation',
      name: 'README',
      fileName: 'README.md',
      path: readmePath,
      description: 'Documentación del proyecto generado'
    });
    
    console.log(`✅ Generados ${generatedFiles.length} archivos en ${fullOutputPath}`);
    return generatedFiles;
    
  } catch (error) {
    console.error('Error generando archivos del backend:', error);
    throw error;
  }
};

// Función auxiliar para generar package.json
const generatePackageJson = async (framework, includeDatabase, geminiClient) => {
  const basePackage = {
    "name": "generated-backend",
    "version": "1.0.0",
    "description": "Backend generado automáticamente desde análisis de API",
    "main": "server.js",
    "scripts": {
      "start": "node server.js",
      "dev": "nodemon server.js",
      "test": "echo \"Error: no test specified\" && exit 1"
    },
    "dependencies": {
      "express": "^4.18.2",
      "cors": "^2.8.5",
      "helmet": "^7.0.0",
      "morgan": "^1.10.0",
      "dotenv": "^16.3.1",
      "express-validator": "^7.0.1"
    },
    "devDependencies": {
      "nodemon": "^3.0.1"
    }
  };
  
  if (includeDatabase) {
    basePackage.dependencies.mongoose = "^7.5.0";
  }
  
  return JSON.stringify(basePackage, null, 2);
};

// Función auxiliar para generar servidor principal
const generateMainServer = async (framework, includeDatabase, geminiClient) => {
  let serverContent = `const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(helmet());
app.use(cors());
app.use(morgan('combined'));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

`;
  
  if (includeDatabase) {
    serverContent += `// Database connection
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/generated-backend', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ Conectado a MongoDB'))
.catch(err => console.error('❌ Error conectando a MongoDB:', err));

`;
  }
  
  serverContent += `// Routes
// TODO: Importar y usar las rutas generadas
// app.use('/api', require('./routes'));

// Health check
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: 'Error interno del servidor',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Algo salió mal'
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Ruta no encontrada',
    message: \`La ruta \${req.originalUrl} no existe\`
  });
});

app.listen(PORT, () => {
  console.log(\`🚀 Servidor ejecutándose en puerto \${PORT}\`);
  console.log(\`📍 Health check: http://localhost:\${PORT}/health\`);
});

module.exports = app;`;
  
  return serverContent;
};

// Función auxiliar para generar README
const generateReadme = (framework, includeDatabase, generatedFiles) => {
  let readme = `# Backend Generado Automáticamente

Este backend fue generado automáticamente mediante análisis de archivos API usando IA.

## Características

- **Framework**: ${framework}
- **Base de datos**: ${includeDatabase ? 'MongoDB con Mongoose' : 'Sin base de datos'}
- **Archivos generados**: ${generatedFiles.length}

## Estructura del Proyecto

\`\`\`
├── models/          # Modelos de datos
├── controllers/     # Lógica de negocio
├── routes/          # Definición de rutas
├── middleware/      # Middleware personalizado
├── config/          # Configuraciones
├── server.js        # Archivo principal
├── package.json     # Dependencias
└── README.md        # Este archivo
\`\`\`

## Instalación

1. Instalar dependencias:
\`\`\`bash
npm install
\`\`\`

2. Configurar variables de entorno:
\`\`\`bash
cp .env.example .env
# Editar .env con tus configuraciones
\`\`\`

${includeDatabase ? '3. Asegúrate de tener MongoDB ejecutándose\n\n' : ''}## Ejecución

### Desarrollo
\`\`\`bash
npm run dev
\`\`\`

### Producción
\`\`\`bash
npm start
\`\`\`

## Archivos Generados

`;
  
  const groupedFiles = generatedFiles.reduce((acc, file) => {
    if (!acc[file.type]) acc[file.type] = [];
    acc[file.type].push(file);
    return acc;
  }, {});
  
  Object.keys(groupedFiles).forEach(type => {
    readme += `\n### ${type.charAt(0).toUpperCase() + type.slice(1)}s\n\n`;
    groupedFiles[type].forEach(file => {
      readme += `- **${file.fileName}**: ${file.description}\n`;
    });
  });
  
  readme += `\n## Notas Importantes

- Este código fue generado automáticamente y puede requerir ajustes
- Revisa y prueba todas las funcionalidades antes de usar en producción
- Agrega validaciones adicionales según tus necesidades
- Configura adecuadamente las variables de entorno

## Health Check

Una vez ejecutando, puedes verificar el estado del servidor en:
\`\`\`
GET http://localhost:3000/health
\`\`\`

---

*Generado automáticamente el ${new Date().toLocaleString()}*`;
  
  return readme;
};

// Función auxiliar para crear prompt específico para user stories
const createUserStoriesPrompt = (pageName, pageContent, components, numUserStories, userStoryType, pageDescription, existingUserStories) => {
  let prompt = `Analiza el siguiente código de una página React/Vue llamada "${pageName}" y genera exactamente ${numUserStories} historias de usuario desde la perspectiva del usuario final.`;
  
  if (userStoryType && userStoryType.trim() !== '') {
    prompt += ` Enfócate especialmente en funcionalidades relacionadas con: ${userStoryType}.`;
  }
  
  // Agregar descripción de la página si existe
  if (pageDescription && pageDescription.trim() !== '') {
    prompt += `

**Descripción de la página:**
${pageDescription}`;
  }
  
  // Agregar historias de usuario existentes si las hay
  if (existingUserStories && existingUserStories.length > 0) {
    prompt += `

**Historias de usuario existentes (NO duplicar estas funcionalidades):**
`;
    existingUserStories.forEach((story, index) => {
      prompt += `${index + 1}. ${story.title}: ${story.description}
`;
    });
    prompt += `
IMPORTANTE: Las nuevas historias deben ser DIFERENTES y COMPLEMENTARIAS a las existentes, no duplicadas.`;
  }
  
  prompt += `

Código de la página:
\`\`\`
${pageContent.substring(0, 3000)}
\`\`\`

`;
  
  if (components.length > 0) {
    prompt += `Componentes importados y utilizados:
`;
    components.forEach((comp, index) => {
      prompt += `
${index + 1}. Componente: ${comp.name}
\`\`\`
${comp.content.substring(0, 1000)}
\`\`\`

`;
    });
  }
  
  prompt += `Por favor, genera exactamente ${numUserStories} historias de usuario NUEVAS que representen funcionalidades adicionales que un usuario puede realizar en esta página. Para cada historia, proporciona:

1. **Título**: Un título descriptivo y conciso
2. **Descripción**: Una descripción detallada siguiendo el formato "Como [tipo de usuario], quiero [funcionalidad] para [beneficio]"
3. **Criterios de Aceptación**: Lista de 2-4 criterios específicos que deben cumplirse
4. **Prioridad**: Alta, Media o Baja
5. **Horas Estimadas**: Estimación en horas (número entero entre 1 y 40)

Formato de respuesta (JSON):
\`\`\`json
[
  {
    "title": "Título de la historia de usuario",
    "description": "Como [usuario], quiero [funcionalidad] para [beneficio]",
    "acceptanceCriteria": ["Criterio 1", "Criterio 2", "Criterio 3"],
    "priority": "Alta|Media|Baja",
    "estimatedHours": 8
  }
]
\`\`\`

Concentrate en las acciones que el usuario puede realizar, no en detalles técnicos de implementación. Asegúrate de generar exactamente ${numUserStories} historias NUEVAS que no dupliquen las existentes.`;
  
  return prompt;
};

module.exports = {
  getProjects,
  getProject,
  createProject,
  updateProject,
  updateGithubUrl,
  deleteProject,
  addPage,
  updatePage,
  addUserStory,
  syncProject,
  generatePageDescription,
  generateUserStoriesForPage,
  generateBackendFromAPI
};