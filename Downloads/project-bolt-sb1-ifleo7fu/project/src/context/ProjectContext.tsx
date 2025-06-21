import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Project, AppPage, UserStory, FileNode, ProjectContextType } from '../types';
import { projectService } from '../services/api';

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

const sampleFileStructure: FileNode[] = [
  {
    id: '1',
    name: 'src',
    type: 'folder',
    path: 'src',
    status: 'completed',
    lastModified: new Date('2024-01-20'),
    children: [
      {
        id: '2',
        name: 'components',
        type: 'folder',
        path: 'src/components',
        status: 'completed',
        lastModified: new Date('2024-01-20'),
        children: [
          {
            id: '3',
            name: 'Header.tsx',
            type: 'file',
            path: 'src/components/Header.tsx',
            extension: 'tsx',
            size: 2048,
            status: 'completed',
            description: 'Componente de cabecera principal',
            lastModified: new Date('2024-01-20'),
          },
          {
            id: '4',
            name: 'ProductCard.tsx',
            type: 'file',
            path: 'src/components/ProductCard.tsx',
            extension: 'tsx',
            size: 1536,
            status: 'completed',
            description: 'Tarjeta de producto para el catálogo',
            lastModified: new Date('2024-01-19'),
          },
          {
            id: '5',
            name: 'ShoppingCart.tsx',
            type: 'file',
            path: 'src/components/ShoppingCart.tsx',
            extension: 'tsx',
            size: 3072,
            status: 'modified',
            description: 'Componente del carrito de compras',
            lastModified: new Date('2024-01-22'),
          }
        ]
      },
      {
        id: '6',
        name: 'pages',
        type: 'folder',
        path: 'src/pages',
        status: 'modified',
        lastModified: new Date('2024-01-22'),
        children: [
          {
            id: '7',
            name: 'Home.tsx',
            type: 'file',
            path: 'src/pages/Home.tsx',
            extension: 'tsx',
            size: 2560,
            status: 'completed',
            description: 'Página principal con productos destacados',
            lastModified: new Date('2024-01-20'),
          },
          {
            id: '8',
            name: 'Catalog.tsx',
            type: 'file',
            path: 'src/pages/Catalog.tsx',
            extension: 'tsx',
            size: 4096,
            status: 'modified',
            description: 'Catálogo de productos con filtros',
            lastModified: new Date('2024-01-22'),
          },
          {
            id: '9',
            name: 'UserProfile.tsx',
            type: 'file',
            path: 'src/pages/UserProfile.tsx',
            extension: 'tsx',
            size: 1024,
            status: 'pending',
            description: 'Perfil de usuario y configuración',
            lastModified: new Date('2024-01-19'),
          }
        ]
      },
      {
        id: '10',
        name: 'hooks',
        type: 'folder',
        path: 'src/hooks',
        status: 'completed',
        lastModified: new Date('2024-01-18'),
        children: [
          {
            id: '11',
            name: 'useCart.ts',
            type: 'file',
            path: 'src/hooks/useCart.ts',
            extension: 'ts',
            size: 1280,
            status: 'completed',
            description: 'Hook para gestión del carrito',
            lastModified: new Date('2024-01-18'),
          },
          {
            id: '12',
            name: 'useAuth.ts',
            type: 'file',
            path: 'src/hooks/useAuth.ts',
            extension: 'ts',
            size: 896,
            status: 'pending',
            description: 'Hook para autenticación de usuarios',
            lastModified: new Date('2024-01-17'),
          }
        ]
      },
      {
        id: '13',
        name: 'styles',
        type: 'folder',
        path: 'src/styles',
        status: 'completed',
        lastModified: new Date('2024-01-16'),
        children: [
          {
            id: '14',
            name: 'globals.css',
            type: 'file',
            path: 'src/styles/globals.css',
            extension: 'css',
            size: 512,
            status: 'completed',
            description: 'Estilos globales de la aplicación',
            lastModified: new Date('2024-01-16'),
          }
        ]
      }
    ]
  },
  {
    id: '15',
    name: 'public',
    type: 'folder',
    path: 'public',
    status: 'completed',
    lastModified: new Date('2024-01-15'),
    children: [
      {
        id: '16',
        name: 'images',
        type: 'folder',
        path: 'public/images',
        status: 'completed',
        lastModified: new Date('2024-01-15'),
        children: [
          {
            id: '17',
            name: 'logo.svg',
            type: 'file',
            path: 'public/images/logo.svg',
            extension: 'svg',
            size: 256,
            status: 'completed',
            description: 'Logo de la aplicación',
            lastModified: new Date('2024-01-15'),
          }
        ]
      }
    ]
  },
  {
    id: '18',
    name: 'package.json',
    type: 'file',
    path: 'package.json',
    extension: 'json',
    size: 1024,
    status: 'modified',
    description: 'Configuración del proyecto y dependencias',
    lastModified: new Date('2024-01-21'),
  },
  {
    id: '19',
    name: 'README.md',
    type: 'file',
    path: 'README.md',
    extension: 'md',
    size: 768,
    status: 'pending',
    description: 'Documentación del proyecto',
    lastModified: new Date('2024-01-15'),
  }
];

const initialProjects: Project[] = [
  {
    id: '1',
    name: 'E-commerce Platform',
    description: 'Una plataforma completa de comercio electrónico con carrito de compras y pagos',
    status: 'development',
    color: '#3B82F6',
    techStack: ['React', 'TypeScript', 'Tailwind CSS', 'Node.js', 'MongoDB'],
    fileStructure: sampleFileStructure,
    pages: [
      {
        id: '1',
        title: 'Página de Inicio',
        description: 'Landing page principal con productos destacados',
        status: 'completed',
        priority: 'high',
        createdAt: new Date('2024-01-15'),
        updatedAt: new Date('2024-01-20'),
        userStories: [
          {
            id: '1',
            title: 'Como visitante quiero ver productos destacados',
            description: 'Mostrar una selección de productos populares en la página principal',
            acceptanceCriteria: [
              'Se muestran al menos 8 productos destacados',
              'Cada producto muestra imagen, nombre y precio',
              'Los productos son clickeables'
            ],
            priority: 'high',
            estimatedHours: 8,
            status: 'done',
            createdAt: new Date('2024-01-15'),
            updatedAt: new Date('2024-01-20'),
          },
          {
            id: '2',
            title: 'Como visitante quiero ver el banner principal',
            description: 'Banner promocional con ofertas especiales',
            acceptanceCriteria: [
              'Banner responsive',
              'Botón de call-to-action visible',
              'Imagen de alta calidad'
            ],
            priority: 'medium',
            estimatedHours: 4,
            status: 'done',
            createdAt: new Date('2024-01-16'),
            updatedAt: new Date('2024-01-20'),
          }
        ]
      },
      {
        id: '2',
        title: 'Catálogo de Productos',
        description: 'Listado de productos con filtros y búsqueda',
        status: 'in-progress',
        priority: 'high',
        createdAt: new Date('2024-01-16'),
        updatedAt: new Date('2024-01-22'),
        userStories: [
          {
            id: '3',
            title: 'Como usuario quiero filtrar productos por categoría',
            description: 'Sistema de filtros para encontrar productos específicos',
            acceptanceCriteria: [
              'Filtros por categoría, precio y marca',
              'Resultados se actualizan en tiempo real',
              'Contador de resultados visible'
            ],
            priority: 'high',
            estimatedHours: 12,
            status: 'in-progress',
            createdAt: new Date('2024-01-18'),
            updatedAt: new Date('2024-01-22'),
          },
          {
            id: '4',
            title: 'Como usuario quiero buscar productos',
            description: 'Barra de búsqueda con autocompletado',
            acceptanceCriteria: [
              'Búsqueda por nombre y descripción',
              'Sugerencias automáticas',
              'Búsqueda rápida sin recargar página'
            ],
            priority: 'medium',
            estimatedHours: 6,
            status: 'todo',
            createdAt: new Date('2024-01-19'),
            updatedAt: new Date('2024-01-19'),
          }
        ]
      },
      {
        id: '3',
        title: 'Carrito de Compras',
        description: 'Funcionalidad del carrito y checkout',
        status: 'in-progress',
        priority: 'medium',
        createdAt: new Date('2024-01-18'),
        updatedAt: new Date('2024-01-23'),
        userStories: [
          {
            id: '5',
            title: 'Como usuario quiero agregar productos al carrito',
            description: 'Funcionalidad para añadir y gestionar productos en el carrito',
            acceptanceCriteria: [
              'Botón agregar al carrito en cada producto',
              'Contador de productos en el carrito',
              'Persistencia del carrito en localStorage'
            ],
            priority: 'high',
            estimatedHours: 10,
            status: 'done',
            createdAt: new Date('2024-01-20'),
            updatedAt: new Date('2024-01-23'),
          }
        ]
      },
      {
        id: '4',
        title: 'Panel de Usuario',
        description: 'Perfil de usuario y historial de pedidos',
        status: 'todo',
        priority: 'medium',
        createdAt: new Date('2024-01-19'),
        updatedAt: new Date('2024-01-19'),
        userStories: []
      },
    ],
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-23'),
  },
  {
    id: '2',
    name: 'Blog Personal',
    description: 'Blog con sistema de comentarios y administración de contenido',
    status: 'planning',
    color: '#10B981',
    techStack: ['Next.js', 'TypeScript', 'Prisma', 'PostgreSQL'],
    fileStructure: [],
    pages: [
      {
        id: '5',
        title: 'Página Principal',
        description: 'Lista de artículos recientes',
        status: 'todo',
        priority: 'high',
        createdAt: new Date('2024-01-20'),
        updatedAt: new Date('2024-01-20'),
        userStories: [
          {
            id: '6',
            title: 'Como visitante quiero ver artículos recientes',
            description: 'Lista paginada de los últimos artículos del blog',
            acceptanceCriteria: [
              'Mostrar 10 artículos por página',
              'Paginación funcional',
              'Extracto de cada artículo visible'
            ],
            priority: 'high',
            estimatedHours: 6,
            status: 'todo',
            createdAt: new Date('2024-01-20'),
            updatedAt: new Date('2024-01-20'),
          }
        ]
      },
      {
        id: '6',
        title: 'Vista de Artículo',
        description: 'Página individual del artículo con comentarios',
        status: 'todo',
        priority: 'high',
        createdAt: new Date('2024-01-20'),
        updatedAt: new Date('2024-01-20'),
        userStories: []
      },
    ],
    createdAt: new Date('2024-01-20'),
    updatedAt: new Date('2024-01-20'),
  },
];

export function ProjectProvider({ children }: { children: ReactNode }) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [currentProject, setCurrentProject] = useState<Project | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Cargar proyectos desde el backend al inicializar
  useEffect(() => {
    const loadProjects = async () => {
      try {
        const response = await projectService.getProjects();
        if (response.projects) {
          setProjects(response.projects);
        } else {
          // Si no hay proyectos, usar array vacío
          setProjects([]);
        }
      } catch (error) {
        console.error('Error cargando proyectos:', error);
        // En caso de error, usar array vacío
        setProjects([]);
      } finally {
        setIsLoading(false);
      }
    };

    loadProjects();
  }, []);

  const addProject = async (projectData: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      const response = await projectService.createProject({
        name: projectData.name,
        description: projectData.description,
        color: projectData.color,
        techStack: projectData.techStack || [],
      });
      
      if (response.project) {
        setProjects(prev => [...prev, response.project]);
        return response.project;
      }
    } catch (error) {
      console.error('Error creando proyecto:', error);
      // Fallback: crear proyecto localmente
      const newProject: Project = {
        ...projectData,
        id: Date.now().toString(),
        createdAt: new Date(),
        updatedAt: new Date(),
        fileStructure: [],
        techStack: projectData.techStack || [],
      };
      setProjects(prev => [...prev, newProject]);
      return newProject;
    }
  };

  const updateProject = async (id: string, projectData: Partial<Project>) => {
    try {
      const response = await projectService.updateProject(id, {
        name: projectData.name,
        description: projectData.description,
        status: projectData.status,
        color: projectData.color,
        techStack: projectData.techStack,
        githubUrl: projectData.githubUrl,
      });
      
      if (response.project) {
        setProjects(prev => 
          prev.map(project => 
            project.id === id 
              ? { ...project, ...response.project, updatedAt: new Date() }
              : project
          )
        );
        if (currentProject?.id === id) {
          setCurrentProject(prev => prev ? { ...prev, ...response.project, updatedAt: new Date() } : null);
        }
        return;
      }
    } catch (error) {
      console.error('Error actualizando proyecto:', error);
    }
    
    // Fallback: actualizar localmente
    setProjects(prev => 
      prev.map(project => 
        project.id === id 
          ? { ...project, ...projectData, updatedAt: new Date() }
          : project
      )
    );
    if (currentProject?.id === id) {
      setCurrentProject(prev => prev ? { ...prev, ...projectData, updatedAt: new Date() } : null);
    }
  };

  const deleteProject = async (id: string) => {
    try {
      const response = await projectService.deleteProject(id);
      
      if (response.message) {
        setProjects(prev => prev.filter(project => project.id !== id));
        if (currentProject?.id === id) {
          setCurrentProject(null);
        }
        return;
      }
    } catch (error) {
      console.error('Error eliminando proyecto:', error);
    }
    
    // Fallback: eliminar localmente
    setProjects(prev => prev.filter(project => project.id !== id));
    if (currentProject?.id === id) {
      setCurrentProject(null);
    }
  };

  const addPage = async (projectId: string, pageData: Omit<AppPage, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      const response = await projectService.addPage(projectId, {
        title: pageData.title,
        description: pageData.description,
        priority: pageData.priority,
      });
      
      if (response.page) {
        const newPage = response.page;
        setProjects(prev => 
          prev.map(project => 
            project.id === projectId 
              ? { ...project, pages: [...project.pages, newPage], updatedAt: new Date() }
              : project
          )
        );

        if (currentProject?.id === projectId) {
          setCurrentProject(prev => 
            prev ? { ...prev, pages: [...prev.pages, newPage], updatedAt: new Date() } : null
          );
        }
        return;
      }
    } catch (error) {
      console.error('Error agregando página:', error);
    }
    
    // Fallback: crear página localmente
    const newPage: AppPage = {
      ...pageData,
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date(),
      userStories: [],
    };
    
    setProjects(prev => 
      prev.map(project => 
        project.id === projectId 
          ? { ...project, pages: [...project.pages, newPage], updatedAt: new Date() }
          : project
      )
    );

    if (currentProject?.id === projectId) {
      setCurrentProject(prev => 
        prev ? { ...prev, pages: [...prev.pages, newPage], updatedAt: new Date() } : null
      );
    }
  };

  const updatePage = (projectId: string, pageId: string, pageData: Partial<AppPage>) => {
    setProjects(prev => 
      prev.map(project => 
        project.id === projectId 
          ? {
              ...project,
              pages: project.pages.map(page => 
                page.id === pageId 
                  ? { ...page, ...pageData, updatedAt: new Date() }
                  : page
              ),
              updatedAt: new Date(),
            }
          : project
      )
    );

    if (currentProject?.id === projectId) {
      setCurrentProject(prev => 
        prev ? {
          ...prev,
          pages: prev.pages.map(page => 
            page.id === pageId 
              ? { ...page, ...pageData, updatedAt: new Date() }
              : page
          ),
          updatedAt: new Date(),
        } : null
      );
    }
  };

  const deletePage = (projectId: string, pageId: string) => {
    setProjects(prev => 
      prev.map(project => 
        project.id === projectId 
          ? {
              ...project,
              pages: project.pages.filter(page => page.id !== pageId),
              updatedAt: new Date(),
            }
          : project
      )
    );

    if (currentProject?.id === projectId) {
      setCurrentProject(prev => 
        prev ? {
          ...prev,
          pages: prev.pages.filter(page => page.id !== pageId),
          updatedAt: new Date(),
        } : null
      );
    }
  };

  const movePage = (projectId: string, pageId: string, newStatus: AppPage['status']) => {
    updatePage(projectId, pageId, { status: newStatus });
  };

  const addUserStory = async (projectId: string, pageId: string, userStoryData: Omit<UserStory, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      const response = await projectService.addUserStory(projectId, pageId, {
        title: userStoryData.title,
        description: userStoryData.description,
        acceptanceCriteria: userStoryData.acceptanceCriteria,
        priority: userStoryData.priority,
        estimatedHours: userStoryData.estimatedHours,
      });
      
      if (response.userStory) {
        const newUserStory = response.userStory;
        setProjects(prev => 
          prev.map(project => 
            project.id === projectId 
              ? {
                  ...project,
                  pages: project.pages.map(page => 
                    page.id === pageId 
                      ? { 
                          ...page, 
                          userStories: [...(page.userStories || []), newUserStory],
                          updatedAt: new Date()
                        }
                      : page
                  ),
                  updatedAt: new Date(),
                }
              : project
          )
        );

        if (currentProject?.id === projectId) {
          setCurrentProject(prev => 
            prev ? {
              ...prev,
              pages: prev.pages.map(page => 
                page.id === pageId 
                  ? { 
                      ...page, 
                      userStories: [...(page.userStories || []), newUserStory],
                      updatedAt: new Date()
                    }
                  : page
              ),
              updatedAt: new Date(),
            } : null
          );
        }
        return;
      }
    } catch (error) {
      console.error('Error agregando user story:', error);
    }
    
    // Fallback: crear user story localmente
    const newUserStory: UserStory = {
      ...userStoryData,
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    setProjects(prev => 
      prev.map(project => 
        project.id === projectId 
          ? {
              ...project,
              pages: project.pages.map(page => 
                page.id === pageId 
                  ? { 
                      ...page, 
                      userStories: [...(page.userStories || []), newUserStory],
                      updatedAt: new Date()
                    }
                  : page
              ),
              updatedAt: new Date(),
            }
          : project
      )
    );

    if (currentProject?.id === projectId) {
      setCurrentProject(prev => 
        prev ? {
          ...prev,
          pages: prev.pages.map(page => 
            page.id === pageId 
              ? { 
                  ...page, 
                  userStories: [...(page.userStories || []), newUserStory],
                  updatedAt: new Date()
                }
              : page
          ),
          updatedAt: new Date(),
        } : null
      );
    }
  };

  const updateUserStory = (projectId: string, pageId: string, userStoryId: string, userStoryData: Partial<UserStory>) => {
    setProjects(prev => 
      prev.map(project => 
        project.id === projectId 
          ? {
              ...project,
              pages: project.pages.map(page => 
                page.id === pageId 
                  ? {
                      ...page,
                      userStories: (page.userStories || []).map(story => 
                        story.id === userStoryId 
                          ? { ...story, ...userStoryData, updatedAt: new Date() }
                          : story
                      ),
                      updatedAt: new Date(),
                    }
                  : page
              ),
              updatedAt: new Date(),
            }
          : project
      )
    );

    if (currentProject?.id === projectId) {
      setCurrentProject(prev => 
        prev ? {
          ...prev,
          pages: prev.pages.map(page => 
            page.id === pageId 
              ? {
                  ...page,
                  userStories: (page.userStories || []).map(story => 
                    story.id === userStoryId 
                      ? { ...story, ...userStoryData, updatedAt: new Date() }
                      : story
                  ),
                  updatedAt: new Date(),
                }
              : page
          ),
          updatedAt: new Date(),
        } : null
      );
    }
  };

  const deleteUserStory = (projectId: string, pageId: string, userStoryId: string) => {
    setProjects(prev => 
      prev.map(project => 
        project.id === projectId 
          ? {
              ...project,
              pages: project.pages.map(page => 
                page.id === pageId 
                  ? {
                      ...page,
                      userStories: (page.userStories || []).filter(story => story.id !== userStoryId),
                      updatedAt: new Date(),
                    }
                  : page
              ),
              updatedAt: new Date(),
            }
          : project
      )
    );

    if (currentProject?.id === projectId) {
      setCurrentProject(prev => 
        prev ? {
          ...prev,
          pages: prev.pages.filter(page => page.id !== pageId),
          updatedAt: new Date(),
        } : null
      );
    }
  };

  const moveUserStory = (projectId: string, pageId: string, userStoryId: string, newStatus: UserStory['status']) => {
    updateUserStory(projectId, pageId, userStoryId, { status: newStatus });
  };

  // File structure management
  const findFileNodeById = (nodes: FileNode[], id: string): FileNode | null => {
    for (const node of nodes) {
      if (node.id === id) return node;
      if (node.children) {
        const found = findFileNodeById(node.children, id);
        if (found) return found;
      }
    }
    return null;
  };

  const addFileNode = (projectId: string, parentPath: string, fileNodeData: Omit<FileNode, 'id'>) => {
    const newFileNode: FileNode = {
      ...fileNodeData,
      id: Date.now().toString(),
    };

    setProjects(prev => 
      prev.map(project => {
        if (project.id !== projectId) return project;
        
        const fileStructure = project.fileStructure || [];
        
        if (parentPath === '') {
          // Add to root
          return {
            ...project,
            fileStructure: [...fileStructure, newFileNode],
            updatedAt: new Date(),
          };
        }

        // Add to specific parent
        const addToParent = (nodes: FileNode[]): FileNode[] => {
          return nodes.map(node => {
            if (node.path === parentPath && node.type === 'folder') {
              return {
                ...node,
                children: [...(node.children || []), newFileNode],
              };
            }
            if (node.children) {
              return {
                ...node,
                children: addToParent(node.children),
              };
            }
            return node;
          });
        };

        return {
          ...project,
          fileStructure: addToParent(fileStructure),
          updatedAt: new Date(),
        };
      })
    );

    if (currentProject?.id === projectId) {
      setCurrentProject(prev => {
        if (!prev) return null;
        
        const fileStructure = prev.fileStructure || [];
        
        if (parentPath === '') {
          return {
            ...prev,
            fileStructure: [...fileStructure, newFileNode],
            updatedAt: new Date(),
          };
        }

        const addToParent = (nodes: FileNode[]): FileNode[] => {
          return nodes.map(node => {
            if (node.path === parentPath && node.type === 'folder') {
              return {
                ...node,
                children: [...(node.children || []), newFileNode],
              };
            }
            if (node.children) {
              return {
                ...node,
                children: addToParent(node.children),
              };
            }
            return node;
          });
        };

        return {
          ...prev,
          fileStructure: addToParent(fileStructure),
          updatedAt: new Date(),
        };
      });
    }
  };

  const updateFileNode = (projectId: string, fileId: string, fileData: Partial<FileNode>) => {
    setProjects(prev => 
      prev.map(project => {
        if (project.id !== projectId) return project;
        
        const updateInNodes = (nodes: FileNode[]): FileNode[] => {
          return nodes.map(node => {
            if (node.id === fileId) {
              return { ...node, ...fileData, lastModified: new Date() };
            }
            if (node.children) {
              return {
                ...node,
                children: updateInNodes(node.children),
              };
            }
            return node;
          });
        };

        return {
          ...project,
          fileStructure: updateInNodes(project.fileStructure || []),
          updatedAt: new Date(),
        };
      })
    );

    if (currentProject?.id === projectId) {
      setCurrentProject(prev => {
        if (!prev) return null;
        
        const updateInNodes = (nodes: FileNode[]): FileNode[] => {
          return nodes.map(node => {
            if (node.id === fileId) {
              return { ...node, ...fileData, lastModified: new Date() };
            }
            if (node.children) {
              return {
                ...node,
                children: updateInNodes(node.children),
              };
            }
            return node;
          });
        };

        return {
          ...prev,
          fileStructure: updateInNodes(prev.fileStructure || []),
          updatedAt: new Date(),
        };
      });
    }
  };

  const deleteFileNode = (projectId: string, fileId: string) => {
    setProjects(prev => 
      prev.map(project => {
        if (project.id !== projectId) return project;
        
        const removeFromNodes = (nodes: FileNode[]): FileNode[] => {
          return nodes.filter(node => {
            if (node.id === fileId) return false;
            if (node.children) {
              node.children = removeFromNodes(node.children);
            }
            return true;
          });
        };

        return {
          ...project,
          fileStructure: removeFromNodes(project.fileStructure || []),
          updatedAt: new Date(),
        };
      })
    );

    if (currentProject?.id === projectId) {
      setCurrentProject(prev => {
        if (!prev) return null;
        
        const removeFromNodes = (nodes: FileNode[]): FileNode[] => {
          return nodes.filter(node => {
            if (node.id === fileId) return false;
            if (node.children) {
              node.children = removeFromNodes(node.children);
            }
            return true;
          });
        };

        return {
          ...prev,
          fileStructure: removeFromNodes(prev.fileStructure || []),
          updatedAt: new Date(),
        };
      });
    }
  };

  return (
    <ProjectContext.Provider value={{
      projects,
      currentProject,
      isLoading,
      addProject,
      updateProject,
      deleteProject,
      setCurrentProject,
      addPage,
      updatePage,
      deletePage,
      movePage,
      addUserStory,
      updateUserStory,
      deleteUserStory,
      moveUserStory,
      addFileNode,
      updateFileNode,
      deleteFileNode,
    }}>
      {children}
    </ProjectContext.Provider>
  );
}

export function useProject() {
  const context = useContext(ProjectContext);
  if (context === undefined) {
    throw new Error('useProject must be used within a ProjectProvider');
  }
  return context;
}