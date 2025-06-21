const express = require('express');
const { body } = require('express-validator');
const { authenticateToken } = require('../middleware/auth');
const {
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
} = require('../controllers/projectController');

// Importar la función del backend generator
const { generateBackendFromAPI: generateAdvancedBackend } = require('../backendGenerator');

const router = express.Router();

// Todas las rutas requieren autenticación
router.use(authenticateToken);

// Validation rules
const projectValidation = [
  body('name')
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('El nombre debe tener entre 2 y 100 caracteres'),
  body('description')
    .trim()
    .isLength({ min: 10, max: 500 })
    .withMessage('La descripción debe tener entre 10 y 500 caracteres'),
  body('status')
    .optional()
    .isIn(['planning', 'in-progress', 'completed', 'on-hold'])
    .withMessage('El estado debe ser: planning, in-progress, completed, o on-hold'),
  body('color')
    .optional()
    .matches(/^#[0-9A-F]{6}$/i)
    .withMessage('El color debe ser un código hexadecimal válido'),
  body('techStack')
    .optional()
    .isArray()
    .withMessage('El stack tecnológico debe ser un array'),
  body('githubUrl')
    .optional()
    .isURL()
    .withMessage('La URL de GitHub debe ser una URL válida')
];

const pageValidation = [
  body('name')
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('El nombre debe tener entre 2 y 100 caracteres'),
  body('description')
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage('La descripción no puede exceder 500 caracteres'),
  body('route')
    .trim()
    .notEmpty()
    .withMessage('La ruta es requerida')
];

const pageUpdateValidation = [
  body('name')
    .optional()
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('El nombre debe tener entre 2 y 100 caracteres'),
  body('description')
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage('La descripción no puede exceder 500 caracteres'),
  body('route')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('La ruta no puede estar vacía si se proporciona')
];

const userStoryValidation = [
  body('title')
    .trim()
    .isLength({ min: 5, max: 200 })
    .withMessage('El título debe tener entre 5 y 200 caracteres'),
  body('description')
    .trim()
    .isLength({ min: 10, max: 1000 })
    .withMessage('La descripción debe tener entre 10 y 1000 caracteres'),
  body('priority')
    .optional()
    .isIn(['low', 'medium', 'high'])
    .withMessage('La prioridad debe ser: low, medium, o high'),
  body('estimatedHours')
    .optional()
    .isInt({ min: 1, max: 1000 })
    .withMessage('Las horas estimadas deben ser un número entero entre 1 y 1000')
];

const githubUrlValidation = [
  body('githubUrl')
    .optional({ checkFalsy: true })
    .isURL()
    .withMessage('La URL de GitHub debe ser una URL válida')
    .custom((value) => {
      if (value && !value.includes('github.com')) {
        throw new Error('La URL debe ser de GitHub');
      }
      return true;
    })
];

// Routes

// GET /api/projects - Obtener todos los proyectos del usuario
router.get('/', getProjects);

// GET /api/projects/:id - Obtener un proyecto específico
router.get('/:id', getProject);

// POST /api/projects - Crear nuevo proyecto
router.post('/', projectValidation, createProject);

// PUT /api/projects/:id - Actualizar proyecto
router.put('/:id', projectValidation, updateProject);

// PUT /api/projects/:id/github - Actualizar URL de GitHub del proyecto
router.put('/:id/github', githubUrlValidation, updateGithubUrl);

// DELETE /api/projects/:id - Eliminar proyecto
router.delete('/:id', deleteProject);

// POST /api/projects/:id/pages - Agregar página a proyecto
router.post('/:id/pages', pageValidation, addPage);

// PUT /api/projects/:projectId/pages/:pageId - Actualizar página específica
router.put('/:projectId/pages/:pageId', pageUpdateValidation, updatePage);

// POST /api/projects/:projectId/pages/:pageId/generate-user-stories - Generar historias de usuario para página con IA
router.post('/:projectId/pages/:pageId/generate-user-stories', generateUserStoriesForPage);

// POST /api/projects/:projectId/pages/:pageId/user-stories - Agregar historia de usuario a página
router.post('/:projectId/pages/:pageId/user-stories', userStoryValidation, addUserStory);

// POST /api/projects/:id/sync - Sincronizar proyecto con repositorio GitHub
router.post('/:id/sync', syncProject);

// POST /api/projects/:projectId/pages/:pageId/generate-description - Generar descripción de página con IA
router.post('/:projectId/pages/:pageId/generate-description', generatePageDescription);

// Validación para el backend generator avanzado
const backendGeneratorValidation = [
  body('outputPath')
    .optional()
    .isString()
    .withMessage('La ruta de salida debe ser una cadena válida'),
  body('includeDatabase')
    .optional()
    .isBoolean()
    .withMessage('includeDatabase debe ser un valor booleano'),
  body('framework')
    .optional()
    .isIn(['express', 'fastify', 'koa'])
    .withMessage('El framework debe ser: express, fastify, o koa'),
  body('features')
    .optional()
    .isObject()
    .withMessage('Las características deben ser un objeto'),
  body('features.authentication')
    .optional()
    .isBoolean()
    .withMessage('authentication debe ser un valor booleano'),
  body('features.validation')
    .optional()
    .isBoolean()
    .withMessage('validation debe ser un valor booleano'),
  body('features.swagger')
    .optional()
    .isBoolean()
    .withMessage('swagger debe ser un valor booleano'),
  body('features.testing')
    .optional()
    .isBoolean()
    .withMessage('testing debe ser un valor booleano'),
  body('features.docker')
    .optional()
    .isBoolean()
    .withMessage('docker debe ser un valor booleano')
];

// POST /api/projects/:id/generate-backend - Generar backend completo desde archivos API del repositorio
router.post('/:id/generate-backend', generateBackendFromAPI);

// POST /api/projects/:id/generate-advanced-backend - Generar backend avanzado con opciones personalizadas
router.post('/:id/generate-advanced-backend', backendGeneratorValidation, async (req, res) => {
  try {
    const projectId = req.params.id;
    const userId = req.user.userId; // Cambiado de req.user.id a req.user.userId
    
    // Buscar el proyecto
    const Project = require('../models/Project');
    const project = await Project.findOne({ _id: projectId, userId });
    
    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Proyecto no encontrado'
      });
    }

    // Opciones del backend generator
    const options = {
      outputPath: req.body.outputPath || `./generated-backend-${project.name.toLowerCase().replace(/\s+/g, '-')}`,
      includeDatabase: req.body.includeDatabase !== undefined ? req.body.includeDatabase : true,
      framework: req.body.framework || 'express',
      features: {
        authentication: req.body.features?.authentication !== undefined ? req.body.features.authentication : true,
        validation: req.body.features?.validation !== undefined ? req.body.features.validation : true,
        swagger: req.body.features?.swagger !== undefined ? req.body.features.swagger : true,
        testing: req.body.features?.testing !== undefined ? req.body.features.testing : true,
        docker: req.body.features?.docker !== undefined ? req.body.features.docker : true,
        security: req.body.features?.security !== undefined ? req.body.features.security : true,
        logging: req.body.features?.logging !== undefined ? req.body.features.logging : true,
        metrics: req.body.features?.metrics !== undefined ? req.body.features.metrics : true
      }
    };

    console.log(`🚀 Iniciando generación de backend avanzado para proyecto: ${project.name}`);
    console.log('📋 Opciones:', options);

    // Generar el backend usando el generador avanzado
    const result = await generateAdvancedBackend(project, options);

    res.json({
      success: true,
      message: 'Backend avanzado generado exitosamente',
      data: result
    });

  } catch (error) {
    console.error('❌ Error generando backend avanzado:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor al generar el backend',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Error interno'
    });
  }
});

// GET /api/projects/:id/backend-generator/status - Obtener estado del generador de backend
router.get('/:id/backend-generator/status', async (req, res) => {
  try {
    const projectId = req.params.id;
    const userId = req.user.userId; // Cambiado de req.user.id a req.user.userId
    
    // Buscar el proyecto
    const Project = require('../models/Project');
    const project = await Project.findOne({ _id: projectId, userId });
    
    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Proyecto no encontrado'
      });
    }

    // Verificar si el proyecto tiene URL de GitHub
    const hasGithubUrl = !!project.githubUrl;
    const hasApiKey = !!process.env.GEMINI_API_KEY;

    res.json({
      success: true,
      data: {
        projectId: project._id,
        projectName: project.name,
        githubUrl: project.githubUrl,
        canGenerate: hasGithubUrl && hasApiKey,
        requirements: {
          githubUrl: hasGithubUrl,
          geminiApiKey: hasApiKey
        },
        supportedFrameworks: ['express', 'fastify', 'koa'],
        availableFeatures: {
          authentication: 'JWT + RBAC authentication system',
          validation: 'Zod/Celebrate input validation',
          swagger: 'OpenAPI documentation generation',
          testing: 'Jest + Supertest test suite',
          docker: 'Docker containerization',
          security: 'Helmet + CORS + Rate limiting',
          logging: 'Structured logging with Pino',
          metrics: 'Prometheus metrics collection'
        }
      }
    });

  } catch (error) {
    console.error('❌ Error obteniendo estado del generador:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Error interno'
    });
  }
});

module.exports = router;