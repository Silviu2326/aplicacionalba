import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Plus, Calendar, Users, LayoutGrid, FileText, BookOpen, FolderTree, Github, RefreshCw, Edit3, Save, X, Trash2, Clock, GitBranch, AlertTriangle, CheckCircle, ArrowRight, Activity, MessageSquare, Code, ChevronLeft, ChevronRight, Bot, Terminal, FileCode, Shield, Palette, Package } from 'lucide-react';
import { useProject } from '../context/ProjectContext';
import { AppPage, UserStory, FileNode } from '../types';
import PageCard from '../components/PageCard';
import UserStoryCard from '../components/UserStoryCard';
import NewPageModal from '../components/NewPageModal';
import NewUserStoryModal from '../components/NewUserStoryModal';
import FileTreeNode from '../components/FileTreeNode';
import NewFileModal from '../components/NewFileModal';
import AuthModal from '../components/AuthModal';
import ColorsModal from '../components/ColorsModal';
import ComponentsModal from '../components/ComponentsModal';
import KanbanView from '../components/views/KanbanView';
import PagesView from '../components/views/PagesView';
import StructureView from '../components/views/StructureView';
import TimelineView from '../components/views/TimelineView';
import DependenciesView from '../components/views/DependenciesView';
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Textarea } from "@/components/ui/textarea"; // Added import
// import { toast } from "@/components/ui/use-toast";

type ViewMode = 'kanban' | 'pages' | 'structure' | 'timeline' | 'dependencies';

const kanbanColumns = [
  { id: 'todo', title: 'Por Hacer', color: 'bg-white/5 border-white/20 backdrop-blur-sm' },
  { id: 'in-progress', title: 'En Progreso', color: 'bg-blue-500/10 border-blue-400/30 backdrop-blur-sm' },
  { id: 'done', title: 'Completado', color: 'bg-green-500/10 border-green-400/30 backdrop-blur-sm' },
];

const userStoryColumns = [
  { id: 'pending', title: 'Por Hacer', color: 'bg-white/5 border-white/20 backdrop-blur-sm' },
  { id: 'in-progress', title: 'En Progreso', color: 'bg-blue-500/10 border-blue-400/30 backdrop-blur-sm' },
  { id: 'completed', title: 'Completado', color: 'bg-green-500/10 border-green-400/30 backdrop-blur-sm' },
];

// Generar semanas para la vista Timeline
const generateWeeks = () => {
  const weeks = [];
  const today = new Date();
  const startOfWeek = new Date(today.setDate(today.getDate() - today.getDay()));
  
  for (let i = 0; i < 8; i++) {
    const weekStart = new Date(startOfWeek);
    weekStart.setDate(startOfWeek.getDate() + (i * 7));
    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekStart.getDate() + 6);
    
    weeks.push({
      id: `week-${i}`,
      start: weekStart,
      end: weekEnd,
      label: `Semana ${i + 1}`,
      dateRange: `${weekStart.getDate()}/${weekStart.getMonth() + 1} - ${weekEnd.getDate()}/${weekEnd.getMonth() + 1}`
    });
  }
  
  return weeks;
};

export default function ProjectEdit() {
  const { id } = useParams<{ id: string }>();
  const { 
    projects, 
    setCurrentProject, 
    currentProject, 
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
    updateProject
  } = useProject();
  
  const [viewMode, setViewMode] = useState<ViewMode>('kanban');
  const [isPageModalOpen, setIsPageModalOpen] = useState(false);
  const [isUserStoryModalOpen, setIsUserStoryModalOpen] = useState(false);
  const [isFileModalOpen, setIsFileModalOpen] = useState(false);
  const [editingPage, setEditingPage] = useState<AppPage | undefined>();
  const [editingUserStory, setEditingUserStory] = useState<UserStory | undefined>();
  const [editingFile, setEditingFile] = useState<FileNode | undefined>();
  const [selectedPageId, setSelectedPageId] = useState<string>('');
  const [selectedParentNode, setSelectedParentNode] = useState<FileNode | undefined>();
  const [isEditingGithubUrl, setIsEditingGithubUrl] = useState(false);
  const [githubUrlInput, setGithubUrlInput] = useState('');
  const [wipLimits, setWipLimits] = useState({
    'in-progress': 2
  });
  const [isIaGenerateModalOpen, setIsIaGenerateModalOpen] = useState(false);
  const [numUserStories, setNumUserStories] = useState<number>(5); // Default to 5 stories
  const [userStoryType, setUserStoryType] = useState<string>('');
  const [selectedPageIdForIa, setSelectedPageIdForIa] = useState<string | null>(null);
  const [isEditPageDescriptionModalOpen, setIsEditPageDescriptionModalOpen] = useState(false);
  const [editingPageDescription, setEditingPageDescription] = useState('');
  const [selectedPageForDescriptionEdit, setSelectedPageForDescriptionEdit] = useState<AppPage | null>(null);
  const [draggedPage, setDraggedPage] = useState<AppPage | null>(null);
  const [pageWeekAssignments, setPageWeekAssignments] = useState<{[pageId: string]: string}>({});
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [sidebarTab, setSidebarTab] = useState<'activity' | 'logs'>('activity');
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isColorsModalOpen, setIsColorsModalOpen] = useState(false);
  const [isComponentsModalOpen, setIsComponentsModalOpen] = useState(false);
  const [isEditingProject, setIsEditingProject] = useState(false);
  const [editingProjectData, setEditingProjectData] = useState({
    name: '',
    description: '',
    color: '',
    techStack: [] as string[]
  });

  // Mock data para Activity Feed
  const activityFeed = [
    {
      id: '1',
      type: 'commit',
      title: 'feat: Add user authentication',
      description: 'Implemented JWT-based authentication system',
      author: 'John Doe',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      icon: GitBranch,
      color: 'text-green-400'
    },
    {
      id: '2',
      type: 'pr',
      title: 'Pull Request #42: Update dashboard UI',
      description: 'Merged changes to improve dashboard responsiveness',
      author: 'Jane Smith',
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
      icon: Code,
      color: 'text-blue-400'
    },
    {
      id: '3',
      type: 'comment',
      title: 'Comment on issue #15',
      description: 'Suggested improvements for the login flow',
      author: 'Mike Johnson',
      timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
      icon: MessageSquare,
      color: 'text-yellow-400'
    }
  ];

  // Mock data para Agent Logs
  const agentLogs = [
    {
      id: '1',
      agent: 'FE-Logic',
      action: 'Generated component',
      target: 'UserProfile.tsx',
      status: 'completed',
      timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000),
      details: 'Created React component with TypeScript interfaces',
      icon: FileCode,
      color: 'text-green-400'
    },
    {
      id: '2',
      agent: 'BE-Draft',
      action: 'Created API endpoint',
      target: '/api/users/profile',
      status: 'completed',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      details: 'Generated Express.js route with validation middleware',
      icon: Terminal,
      color: 'text-blue-400'
    },
    {
      id: '3',
      agent: 'Static-Scan',
      action: 'Code analysis',
      target: 'src/components/',
      status: 'in-progress',
      timestamp: new Date(Date.now() - 30 * 60 * 1000),
      details: 'Scanning for potential security vulnerabilities',
      icon: Bot,
      color: 'text-yellow-400'
    }
  ];

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 60) {
      return `${diffInMinutes}m ago`;
    } else if (diffInMinutes < 1440) {
      return `${Math.floor(diffInMinutes / 60)}h ago`;
    } else {
      return `${Math.floor(diffInMinutes / 1440)}d ago`;
    }
  };

  useEffect(() => {
    console.log('ProjectEdit - useEffect ejecutado');
    console.log('ProjectEdit - id:', id);
    console.log('ProjectEdit - projects:', projects);
    if (id) {
      const project = projects.find(p => p.id === id);
      console.log('ProjectEdit - proyecto encontrado:', project);
      setCurrentProject(project || null);
    }
  }, [id, projects, setCurrentProject]);

  const handleAddPage = async (pageData: Omit<AppPage, 'id' | 'createdAt' | 'updatedAt'>) => {
    if (currentProject) {
      await addPage(currentProject.id, pageData);
    }
  };

  const handleUpdatePage = (pageData: Omit<AppPage, 'id' | 'createdAt' | 'updatedAt'>) => {
    if (currentProject && editingPage) {
      updatePage(currentProject.id, editingPage.id, pageData);
      setEditingPage(undefined);
    }
  };

  const handleDeletePage = (pageId: string) => {
    if (currentProject) {
      deletePage(currentProject.id, pageId);
    }
  };


  const handleAddUserStory = async (userStoryData: Omit<UserStory, 'id' | 'createdAt' | 'updatedAt'>) => {
    if (currentProject && selectedPageId) {
      await addUserStory(currentProject.id, selectedPageId, userStoryData);
    }
  };

  const handleUpdateUserStory = (userStoryData: Omit<UserStory, 'id' | 'createdAt' | 'updatedAt'>) => {
    if (currentProject && editingUserStory && selectedPageId) {
      updateUserStory(currentProject.id, selectedPageId, editingUserStory.id, userStoryData);
      setEditingUserStory(undefined);
    }
  };

  const handleDeleteUserStory = (pageId: string, userStoryId: string) => {
    if (currentProject) {
      deleteUserStory(currentProject.id, pageId, userStoryId);
    }
  };

  const handleEditUserStory = (pageId: string, userStory: UserStory) => {
    setSelectedPageId(pageId);
    setEditingUserStory(userStory);
    setIsUserStoryModalOpen(true);
  };

  const handleAddFile = (fileData: Omit<FileNode, 'id'>) => {
    if (currentProject) {
      const parentPath = selectedParentNode?.path || '';
      addFileNode(currentProject.id, parentPath, fileData);
    }
  };

  const handleUpdateFile = (fileData: Omit<FileNode, 'id'>) => {
    if (currentProject && editingFile) {
      updateFileNode(currentProject.id, editingFile.id, fileData);
      setEditingFile(undefined);
    }
  };

  const handleDeleteFile = (fileId: string) => {
    if (currentProject) {
      deleteFileNode(currentProject.id, fileId);
    }
  };

  const handleEditFile = (file: FileNode) => {
    setEditingFile(file);
    setIsFileModalOpen(true);
  };

  const handleAddChildFile = (parentNode: FileNode) => {
    setSelectedParentNode(parentNode);
    setIsFileModalOpen(true);
  };

  const handleClosePageModal = () => {
    setIsPageModalOpen(false);
    setEditingPage(undefined);
  };

  const handleCloseUserStoryModal = () => {
    setIsUserStoryModalOpen(false);
    setEditingUserStory(undefined);
    setSelectedPageId('');
  };

  const handleCloseFileModal = () => {
    setIsFileModalOpen(false);
    setEditingFile(undefined);
    setSelectedParentNode(undefined);
  };

  const handleOpenIaGenerateModal = (pageId: string) => {
    setSelectedPageIdForIa(pageId);
    setIsIaGenerateModalOpen(true);
  };

  const handleCloseIaGenerateModal = () => {
    setIsIaGenerateModalOpen(false);
    setSelectedPageIdForIa(null);
    setNumUserStories(5);
    setUserStoryType('');
  };

  const handleGenerateStoriesWithIa = async () => {
    if (!selectedPageIdForIa) {
      console.error('No hay página seleccionada');
      return;
    }

    try {
      console.log('Generando historias con IA para página:', selectedPageIdForIa);
      console.log('Número de historias:', numUserStories);
      console.log('Tipo:', userStoryType);
      
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('No hay token de autenticación');
        return;
      }

      const response = await fetch(`http://localhost:3001/api/projects/${currentProject.id}/pages/${selectedPageIdForIa}/generate-user-stories`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          numUserStories: parseInt(numUserStories),
          userStoryType: userStoryType
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error al generar historias de usuario:', errorData);
        alert(`Error: ${errorData.message || 'No se pudieron generar las historias de usuario'}`);
        return;
      }

      const data = await response.json();
      console.log('Historias de usuario generadas exitosamente:', data);
      
      // Mostrar mensaje de éxito
      alert(`Se generaron ${data.userStoriesCount} historias de usuario exitosamente`);
      
      // Sincronizar proyecto para actualizar la vista
      await handleSyncProject();
      
    } catch (error) {
      console.error('Error al generar historias de usuario:', error);
      alert('Error al generar historias de usuario. Por favor, inténtalo de nuevo.');
    } finally {
      handleCloseIaGenerateModal();
    }
  };

  const handleOpenEditPageDescriptionModal = (page: AppPage) => {
    setSelectedPageForDescriptionEdit(page);
    setEditingPageDescription(page.description ?? ''); // usa ?? por si viene undefined
    setIsEditPageDescriptionModalOpen(true);
  };
  
  const handleCloseEditPageDescriptionModal = () => {
    setIsEditPageDescriptionModalOpen(false);
    setSelectedPageForDescriptionEdit(null);
    setEditingPageDescription('');
  };

  const handleUpdatePageDescription = async () => {
    if (!selectedPageForDescriptionEdit || !currentProject) return;
    
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:3001/api/projects/${currentProject.id}/pages/${selectedPageForDescriptionEdit.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          name: selectedPageForDescriptionEdit.name,
          description: editingPageDescription,
          route: selectedPageForDescriptionEdit.route
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error actualizando descripción de página');
      }

      const data = await response.json();
      
      // Actualizar el proyecto en el contexto local
      if (updateProject) {
        const updatedPages = currentProject.pages.map(p => 
          p.id === selectedPageForDescriptionEdit.id ? { ...p, description: editingPageDescription } : p
        );
        updateProject({ ...currentProject, pages: updatedPages });
      }
      
      console.log('✅ Descripción de página actualizada exitosamente');
      handleCloseEditPageDescriptionModal();
      
    } catch (error) {
      console.error('Error actualizando descripción de página:', error);
      alert('Error actualizando descripción de página: ' + (error instanceof Error ? error.message : 'Error desconocido'));
    }
  };

  const handleGeneratePageDescriptionWithAI = async () => {
    if (!selectedPageForDescriptionEdit || !currentProject) return;
    
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:3001/api/projects/${currentProject.id}/pages/${selectedPageForDescriptionEdit.id}/generate-description`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error generando descripción con IA');
      }

      const data = await response.json();
      
      // Actualizar el campo de descripción con la descripción generada
      setEditingPageDescription(data.description);
      
      console.log('✅ Descripción generada exitosamente:', data.description);
      
    } catch (error) {
      console.error('Error generando descripción con IA:', error);
      alert('Error generando descripción con IA: ' + (error instanceof Error ? error.message : 'Error desconocido'));
    }
  };

  const handleEditGithubUrl = () => {
    setGithubUrlInput(currentProject?.githubUrl || '');
    setIsEditingGithubUrl(true);
  };

  const handleSaveGithubUrl = async () => {
    if (currentProject) {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`http://localhost:3001/api/projects/${currentProject.id}/github`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({ githubUrl: githubUrlInput.trim() || null })
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Error actualizando URL de GitHub');
        }

        const data = await response.json();
        
        // Actualizar el proyecto en el contexto local
        await updateProject(currentProject.id, { githubUrl: data.project.githubUrl });
        
        setIsEditingGithubUrl(false);
        setGithubUrlInput('');
      } catch (error) {
        console.error('Error actualizando URL de GitHub:', error);
        alert('Error actualizando URL de GitHub: ' + (error instanceof Error ? error.message : 'Error desconocido'));
      }
    }
  };

  const handleCancelGithubUrl = () => {
    setIsEditingGithubUrl(false);
    setGithubUrlInput('');
  };

  const handleRemoveGithubUrl = async () => {
    if (currentProject && currentProject.githubUrl) {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`http://localhost:3001/api/projects/${currentProject.id}/github`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({ githubUrl: null })
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Error eliminando URL de GitHub');
        }

        const data = await response.json();
        
        // Actualizar el proyecto en el contexto local
        await updateProject(currentProject.id, { githubUrl: null });
        
      } catch (error) {
        console.error('Error eliminando URL de GitHub:', error);
        alert('Error eliminando URL de GitHub: ' + (error instanceof Error ? error.message : 'Error desconocido'));
      }
    }
  };

  const handleSyncProject = async () => {
    if (currentProject && currentProject.githubUrl) {
      const confirmSync = window.confirm(
        '¿Estás seguro de que quieres sincronizar el proyecto? Esto analizará el repositorio de GitHub y generará historias de usuario automáticamente usando IA. El proceso puede tomar varios minutos.'
      );
      
      if (!confirmSync) return;
      
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`http://localhost:3001/api/projects/${currentProject.id}/sync`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Error sincronizando proyecto');
        }

        const data = await response.json();
        
        // Recargar el proyecto para mostrar las nuevas historias de usuario
        window.location.reload();
        
        alert(`Sincronización completada exitosamente. Se generaron ${data.userStoriesCount} historias de usuario.`);
        
      } catch (error) {
        console.error('Error sincronizando proyecto:', error);
        alert('Error sincronizando proyecto: ' + (error instanceof Error ? error.message : 'Error desconocido'));
      }
    } else {
      alert('Para sincronizar el proyecto, primero debes agregar una URL de repositorio de GitHub.');
    }
  };

  const handleEditProject = () => {
    if (currentProject) {
      setEditingProjectData({
        name: currentProject.name,
        description: currentProject.description,
        color: currentProject.color,
        techStack: currentProject.techStack || []
      });
      setIsEditingProject(true);
    }
  };

  const handleSaveProject = async () => {
    if (!currentProject) return;
    
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:3001/api/projects/${currentProject.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(editingProjectData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error actualizando proyecto');
      }

      const data = await response.json();
      
      // Actualizar el proyecto en el contexto local
      if (updateProject) {
        await updateProject(currentProject.id, editingProjectData);
      }
      
      setIsEditingProject(false);
      console.log('✅ Proyecto actualizado exitosamente');
      
    } catch (error) {
      console.error('Error actualizando proyecto:', error);
      alert('Error actualizando proyecto: ' + (error instanceof Error ? error.message : 'Error desconocido'));
    }
  };

  const handleCancelEditProject = () => {
    setIsEditingProject(false);
    setEditingProjectData({
      name: '',
      description: '',
      color: '',
      techStack: []
    });
  };

  const handleAddTechStack = (tech: string) => {
    if (tech.trim() && !editingProjectData.techStack.includes(tech.trim())) {
      setEditingProjectData(prev => ({
        ...prev,
        techStack: [...prev.techStack, tech.trim()]
      }));
    }
  };

  const handleRemoveTechStack = (index: number) => {
    setEditingProjectData(prev => ({
      ...prev,
      techStack: prev.techStack.filter((_, i) => i !== index)
    }));
  };

  const handleEditPage = (page: AppPage) => {
    setEditingPage(page);
    setIsPageModalOpen(true);
  };

  const handleDragStart = (e: React.DragEvent, itemId: string, itemType: 'page' | 'userStory', pageId?: string) => {
    e.dataTransfer.setData('text/plain', JSON.stringify({ itemId, itemType, pageId }));
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, newStatus: string) => {
    e.preventDefault();
    const data = JSON.parse(e.dataTransfer.getData('text/plain'));
    
    if (currentProject) {
      if (data.itemType === 'page') {
        movePage(currentProject.id, data.itemId, newStatus as AppPage['status']);
      } else if (data.itemType === 'userStory' && data.pageId) {
        moveUserStory(currentProject.id, data.pageId, data.itemId, newStatus as UserStory['status']);
      }
    }
  };

  const openUserStoryModal = (pageId: string) => {
    setSelectedPageId(pageId);
    setIsUserStoryModalOpen(true);
  };

  const handleToggleUserStoryComplete = (pageId: string, userStoryId: string, completed: boolean) => {
    // Esta función ya no modifica el status de las historias
    // Solo se mantiene para compatibilidad, pero el estado se maneja localmente en cada vista
    console.log(`Toggle story ${userStoryId} to ${completed ? 'completed' : 'not completed'}`);
  };

  const handleExecuteCompletedStories = (pageId: string) => {
    if (!currentProject) return;
    
    const page = currentProject.pages.find((p: AppPage) => p.id === pageId);
    if (!page) return;
    
    const completedStories = (page.userStories || []).filter((story: UserStory) => story.status === 'done');
    
    console.log(`Ejecutando ${completedStories.length} historias completadas de la página: ${page.title}`);
    console.log('Historias a ejecutar:', completedStories.map((story: UserStory) => story.title));
    
    // Aquí puedes agregar la lógica específica para ejecutar las historias
    // Por ejemplo: generar código, crear archivos, ejecutar scripts, etc.
  };

  console.log('ProjectEdit - currentProject antes del render:', currentProject);
  
  if (!currentProject) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/30 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
          <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-yellow-500/30 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-pink-500/30 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
        </div>
        
        <div className="text-center relative z-10">
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 shadow-2xl">
            <h2 className="text-2xl font-bold text-white mb-2">Proyecto no encontrado</h2>
            <p className="text-gray-300">El proyecto que buscas no existe o no tienes permisos para verlo.</p>
          </div>
        </div>
      </div>
    );
  }
  
  console.log('ProjectEdit - currentProject.githubUrl:', currentProject.githubUrl);
  console.log('ProjectEdit - currentProject completo:', JSON.stringify(currentProject, null, 2));

  const getPagesByStatus = (status: AppPage['status']) => {
    return currentProject.pages.filter(page => page.status === status);
  };

  const getUserStoriesByStatus = (pageId: string, status: UserStory['status']) => {
    const page = currentProject.pages.find(p => p.id === pageId);
    return page?.userStories?.filter(story => story.status === status) || [];
  };

  const getFileStats = () => {
    const countFiles = (nodes: FileNode[]): { files: number; folders: number; completed: number; pending: number } => {
      let stats = { files: 0, folders: 0, completed: 0, pending: 0 };
      
      nodes.forEach(node => {
        if (node.type === 'file') {
          stats.files++;
          if (node.status === 'completed') stats.completed++;
          if (node.status === 'pending') stats.pending++;
        } else {
          stats.folders++;
          if (node.children) {
            const childStats = countFiles(node.children);
            stats.files += childStats.files;
            stats.folders += childStats.folders;
            stats.completed += childStats.completed;
            stats.pending += childStats.pending;
          }
        }
      });
      
      return stats;
    };

    return countFiles(currentProject.fileStructure || []);
  };

  const fileStats = getFileStats();
  const weeks = generateWeeks();

  // Funciones para la vista Timeline
  const handleTimelineDragStart = (e: React.DragEvent, page: AppPage) => {
    setDraggedPage(page);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleTimelineDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleTimelineDrop = (e: React.DragEvent, weekId: string) => {
    e.preventDefault();
    if (draggedPage) {
      setPageWeekAssignments(prev => ({
        ...prev,
        [draggedPage.id]: weekId
      }));
      setDraggedPage(null);
    }
  };

  // Función para detectar dependencias
  const analyzeDependencies = () => {
    const dependencies = [];
    const pages = currentProject.pages;
    
    pages.forEach(page => {
      const pageData = {
        id: page.id,
        name: page.title,
        type: 'page',
        status: page.status,
        hasBackend: Math.random() > 0.3, // Simulación
        hasComponents: (page.userStories?.length || 0) > 0,
        endpoints: Math.floor(Math.random() * 5) + 1,
        orphaned: Math.random() > 0.8
      };
      
      dependencies.push(pageData);
    });
    
    return dependencies;
  };

  const dependencyData = analyzeDependencies();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden flex">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/30 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-yellow-500/30 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-pink-500/30 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>
      
      {/* Main Content */}
      <div className={`flex-1 transition-all duration-300 ${isSidebarOpen ? 'mr-8' : 'mr-0'}`}>
        <div className="max-w-none mx-auto px-4 sm:px-6 lg:px-8 pt-8 relative z-10">
        {/* Project Header */}
        <div className="mb-8">
          {!isEditingProject ? (
            <>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div 
                    className="w-6 h-6 rounded-full"
                    style={{ backgroundColor: currentProject.color }}
                  />
                  <h1 className="text-3xl font-bold text-white">{currentProject.name}</h1>
                </div>
                <button
                  onClick={handleEditProject}
                  className="flex items-center space-x-2 px-4 py-2 bg-blue-500/20 backdrop-blur-sm text-blue-300 border border-blue-400/30 rounded-lg hover:bg-blue-500/30 transition-all duration-200 shadow-lg"
                >
                  <Edit3 className="h-4 w-4" />
                  <span>Editar Proyecto</span>
                </button>
              </div>
              <p className="text-gray-300 mb-4">{currentProject.description}</p>
            </>
          ) : (
            <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6 mb-4 border border-white/20 shadow-lg">
              <h3 className="text-lg font-semibold text-white mb-4">Editar Proyecto</h3>
              
              <div className="space-y-4">
                {/* Nombre del proyecto */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Nombre del proyecto
                  </label>
                  <input
                    type="text"
                    value={editingProjectData.name}
                    onChange={(e) => setEditingProjectData(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full px-3 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-white placeholder-gray-400"
                    placeholder="Nombre del proyecto"
                  />
                </div>

                {/* Descripción */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Descripción
                  </label>
                  <textarea
                    value={editingProjectData.description}
                    onChange={(e) => setEditingProjectData(prev => ({ ...prev, description: e.target.value }))}
                    rows={3}
                    className="w-full px-3 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-white placeholder-gray-400 resize-none"
                    placeholder="Descripción del proyecto"
                  />
                </div>

                {/* Color */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Color del proyecto
                  </label>
                  <div className="flex items-center space-x-3">
                    <input
                      type="color"
                      value={editingProjectData.color}
                      onChange={(e) => setEditingProjectData(prev => ({ ...prev, color: e.target.value }))}
                      className="w-12 h-10 rounded-lg border border-white/20 bg-transparent cursor-pointer"
                    />
                    <span className="text-sm text-gray-400">{editingProjectData.color}</span>
                  </div>
                </div>

                {/* Tech Stack */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Stack Tecnológico
                  </label>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {editingProjectData.techStack.map((tech, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-3 py-1 bg-blue-500/20 backdrop-blur-sm text-blue-300 border border-blue-400/30 text-sm rounded-full"
                      >
                        {tech}
                        <button
                          onClick={() => handleRemoveTechStack(index)}
                          className="ml-2 text-blue-400 hover:text-red-400 transition-colors"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      placeholder="Agregar tecnología (ej: React, Node.js)"
                      className="flex-1 px-3 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-white placeholder-gray-400"
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          handleAddTechStack(e.currentTarget.value);
                          e.currentTarget.value = '';
                        }
                      }}
                    />
                    <button
                      onClick={(e) => {
                        const input = e.currentTarget.previousElementSibling as HTMLInputElement;
                        if (input) {
                          handleAddTechStack(input.value);
                          input.value = '';
                        }
                      }}
                      className="px-4 py-2 bg-blue-500/20 backdrop-blur-sm text-blue-300 border border-blue-400/30 rounded-lg hover:bg-blue-500/30 transition-all duration-200"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                {/* Botones de acción */}
                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    onClick={handleCancelEditProject}
                    className="flex items-center space-x-2 px-4 py-2 bg-gray-500/20 backdrop-blur-sm text-gray-300 border border-gray-400/30 rounded-lg hover:bg-gray-500/30 transition-all duration-200"
                  >
                    <X className="h-4 w-4" />
                    <span>Cancelar</span>
                  </button>
                  <button
                    onClick={handleSaveProject}
                    className="flex items-center space-x-2 px-4 py-2 bg-green-500/20 backdrop-blur-sm text-green-300 border border-green-400/30 rounded-lg hover:bg-green-500/30 transition-all duration-200"
                  >
                    <Save className="h-4 w-4" />
                    <span>Guardar</span>
                  </button>
                </div>
              </div>
            </div>
          )}
          
          {/* GitHub Repository Section */}
          <div className="bg-white/10 backdrop-blur-lg rounded-lg p-4 mb-4 border border-white/20 shadow-lg">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <Github className="h-4 w-4 text-gray-300" />
                  <span className="text-sm font-medium text-white">Repositorio GitHub</span>
                </div>
                
                {currentProject.githubUrl && !isEditingGithubUrl ? (
                  <div className="flex items-center space-x-2">
                    <code className="text-sm text-gray-300 bg-white/10 backdrop-blur-sm px-2 py-1 rounded border border-white/20">
                      {currentProject.githubUrl}
                    </code>
                    <a
                      href={currentProject.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:text-blue-300 text-sm transition-colors"
                    >
                      Ver repositorio
                    </a>
                    <button
                      onClick={handleEditGithubUrl}
                      className="text-gray-400 hover:text-white p-1 transition-colors"
                      title="Editar URL"
                    >
                      <Edit3 className="h-4 w-4" />
                    </button>
                    <button
                      onClick={handleRemoveGithubUrl}
                      className="text-red-400 hover:text-red-300 p-1 transition-colors"
                      title="Eliminar URL"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ) : isEditingGithubUrl ? (
                  <div className="flex items-center space-x-2">
                    <input
                      type="url"
                      value={githubUrlInput}
                      onChange={(e) => setGithubUrlInput(e.target.value)}
                      placeholder="https://github.com/usuario/repositorio"
                      className="flex-1 px-3 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-sm text-white placeholder-gray-400"
                    />
                    <button
                      onClick={handleSaveGithubUrl}
                      className="flex items-center space-x-1 px-3 py-2 bg-green-500/20 backdrop-blur-sm text-green-300 border border-green-400/30 rounded-lg hover:bg-green-500/30 transition-all duration-200 text-sm shadow-lg"
                    >
                      <Save className="h-4 w-4" />
                      <span>Guardar</span>
                    </button>
                    <button
                      onClick={handleCancelGithubUrl}
                      className="flex items-center space-x-1 px-3 py-2 bg-gray-500/20 backdrop-blur-sm text-gray-300 border border-gray-400/30 rounded-lg hover:bg-gray-500/30 transition-all duration-200 text-sm shadow-lg"
                    >
                      <X className="h-4 w-4" />
                      <span>Cancelar</span>
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-400 italic">No hay repositorio configurado</span>
                    <button
                      onClick={handleEditGithubUrl}
                      className="flex items-center space-x-1 px-3 py-2 bg-blue-500/20 backdrop-blur-sm text-blue-300 border border-blue-400/30 rounded-lg hover:bg-blue-500/30 transition-all duration-200 text-sm shadow-lg"
                    >
                      <Plus className="h-4 w-4" />
                      <span>Agregar repositorio</span>
                    </button>
                  </div>
                )}

        {/* Vista Timeline (Mini-Gantt) */}
        {viewMode === 'timeline' && (
          <TimelineView
            currentProject={currentProject}
            weeks={weeks}
            pageWeekAssignments={pageWeekAssignments}
            handleTimelineDragOver={handleTimelineDragOver}
            handleTimelineDrop={handleTimelineDrop}
            handleTimelineDragStart={handleTimelineDragStart}
          />
        )}

        {/* Vista Dependencias */}
        {viewMode === 'dependencies' && (
          <DependenciesView
            dependencyData={dependencyData}
          />
        )}
              </div>
              
              {currentProject.githubUrl && !isEditingGithubUrl && (
                <button
                  className="flex items-center space-x-2 px-4 py-2 bg-blue-500/20 backdrop-blur-sm text-blue-300 border border-blue-400/30 rounded-lg hover:bg-blue-500/30 transition-all duration-200 shadow-lg"
                  onClick={handleSyncProject}
                >
                  <RefreshCw className="h-4 w-4" />
                  <span>Sincronizar</span>
                </button>
              )}
            </div>
          </div>
          
          <div className="flex items-center space-x-6 text-sm text-gray-300">
            <div className="flex items-center space-x-1">
              <Calendar className="h-4 w-4" />
              <span>Creado el {new Date(currentProject.createdAt).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Users className="h-4 w-4" />
              <span>{currentProject.pages.length} páginas</span>
            </div>

            {currentProject.techStack && currentProject.techStack.length > 0 && (
              <div className="flex items-center space-x-2">
                <span>Stack:</span>
                <div className="flex space-x-1">
                  {currentProject.techStack.slice(0, 3).map((tech, index) => (
                    <span key={index} className="px-2 py-1 bg-blue-500/20 backdrop-blur-sm text-blue-300 border border-blue-400/30 text-xs rounded-full">
                      {tech}
                    </span>
                  ))}
                  {currentProject.techStack.length > 3 && (
                    <span className="text-gray-400 text-xs">+{currentProject.techStack.length - 3}</span>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* View Toggle and Actions */}
        <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
          <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-lg rounded-lg p-1 border border-white/20 shadow-lg">
            <button
              onClick={() => setViewMode('kanban')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-all duration-200 ${
                viewMode === 'kanban'
                  ? 'bg-blue-500/30 backdrop-blur-sm text-white border border-blue-400/50 shadow-lg'
                  : 'text-gray-300 hover:text-white hover:bg-white/10'
              }`}
            >
              <LayoutGrid className="h-4 w-4" />
              <span>Vista Kanban</span>
            </button>
            <button
              onClick={() => setViewMode('pages')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-all duration-200 ${
                viewMode === 'pages'
                  ? 'bg-blue-500/30 backdrop-blur-sm text-white border border-blue-400/50 shadow-lg'
                  : 'text-gray-300 hover:text-white hover:bg-white/10'
              }`}
            >
              <FileText className="h-4 w-4" />
              <span>Vista por Páginas</span>
            </button>
            <button
              onClick={() => setViewMode('structure')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-all duration-200 ${
                viewMode === 'structure'
                  ? 'bg-blue-500/30 backdrop-blur-sm text-white border border-blue-400/50 shadow-lg'
                  : 'text-gray-300 hover:text-white hover:bg-white/10'
              }`}
            >
              <FolderTree className="h-4 w-4" />
              <span>Vista Estructura</span>
            </button>
            <button
              onClick={() => setViewMode('timeline')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-all duration-200 ${
                viewMode === 'timeline'
                  ? 'bg-purple-500/30 backdrop-blur-sm text-white border border-purple-400/50 shadow-lg'
                  : 'text-gray-300 hover:text-white hover:bg-white/10'
              }`}
            >
              <Clock className="h-4 w-4" />
              <span>Timeline</span>
            </button>
            <button
              onClick={() => setViewMode('dependencies')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-all duration-200 ${
                viewMode === 'dependencies'
                  ? 'bg-orange-500/30 backdrop-blur-sm text-white border border-orange-400/50 shadow-lg'
                  : 'text-gray-300 hover:text-white hover:bg-white/10'
              }`}
            >
              <GitBranch className="h-4 w-4" />
              <span>Dependencias</span>
            </button>
          </div>

          <div className="flex space-x-3">
            {/* Botones de configuración */}
            <button
              onClick={() => setIsAuthModalOpen(true)}
              className="flex items-center space-x-2 bg-blue-500/20 backdrop-blur-sm text-blue-300 border border-blue-400/30 px-4 py-2 rounded-lg hover:bg-blue-500/30 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              <Shield className="h-5 w-5" />
              <span>Autenticación</span>
            </button>
            <button
              onClick={() => setIsColorsModalOpen(true)}
              className="flex items-center space-x-2 bg-purple-500/20 backdrop-blur-sm text-purple-300 border border-purple-400/30 px-4 py-2 rounded-lg hover:bg-purple-500/30 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              <Palette className="h-5 w-5" />
              <span>Colores</span>
            </button>
            <button
              onClick={() => setIsComponentsModalOpen(true)}
              className="flex items-center space-x-2 bg-green-500/20 backdrop-blur-sm text-green-300 border border-green-400/30 px-4 py-2 rounded-lg hover:bg-green-500/30 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              <Package className="h-5 w-5" />
              <span>Componentes</span>
            </button>
            
            {viewMode === 'structure' && (
              <button
                onClick={() => setIsFileModalOpen(true)}
                className="flex items-center space-x-2 bg-gray-500/20 backdrop-blur-sm text-gray-300 border border-gray-400/30 px-4 py-2 rounded-lg hover:bg-gray-500/30 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                <Plus className="h-5 w-5" />
                <span>Nuevo Archivo</span>
              </button>
            )}
            <button
              onClick={() => setIsPageModalOpen(true)}
              className="flex items-center space-x-2 bg-blue-500/20 backdrop-blur-sm text-blue-300 border border-blue-400/30 px-4 py-2 rounded-lg hover:bg-blue-500/30 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              <Plus className="h-5 w-5" />
              <span>Nueva Página</span>
            </button>
          </div>
        </div>

        {/* Structure View */}
        {viewMode === 'structure' && (
          <StructureView
            currentProject={currentProject}
            fileStats={fileStats}
            handleEditFile={handleEditFile}
            handleDeleteFile={handleDeleteFile}
            handleAddChildFile={handleAddChildFile}
            setIsFileModalOpen={setIsFileModalOpen}
          />
        )}

        {/* Kanban View */}
        {viewMode === 'kanban' && (
          <KanbanView
            currentProject={currentProject}
            userStoryColumns={userStoryColumns}
            getUserStoriesByStatus={getUserStoriesByStatus}
            handleDragOver={handleDragOver}
            handleDrop={handleDrop}
            handleDragStart={handleDragStart}
            openUserStoryModal={openUserStoryModal}
            handleOpenIaGenerateModal={handleOpenIaGenerateModal}
            handleOpenEditPageDescriptionModal={handleOpenEditPageDescriptionModal}
            handleEditUserStory={handleEditUserStory}
            handleDeleteUserStory={handleDeleteUserStory}
            handleToggleUserStoryComplete={handleToggleUserStoryComplete}
            setIsPageModalOpen={setIsPageModalOpen}
          />
        )}

        {/* Pages View */}
        {viewMode === 'pages' && (
          <PagesView
            currentProject={currentProject}
            userStoryColumns={userStoryColumns}
            getUserStoriesByStatus={getUserStoriesByStatus}
            handleDragOver={handleDragOver}
            handleDrop={handleDrop}
            handleDragStart={handleDragStart}
            openUserStoryModal={openUserStoryModal}
            handleOpenIaGenerateModal={handleOpenIaGenerateModal}
            handleOpenEditPageDescriptionModal={handleOpenEditPageDescriptionModal}
            handleEditUserStory={handleEditUserStory}
            handleDeleteUserStory={handleDeleteUserStory}
            handleToggleUserStoryComplete={handleToggleUserStoryComplete}
            onExecuteCompletedStories={handleExecuteCompletedStories}
            setIsPageModalOpen={setIsPageModalOpen}
            handleEditPage={handleEditPage}
          />
        )}
      </div>

      <NewPageModal 
        isOpen={isPageModalOpen} 
        onClose={handleClosePageModal}
        onSubmit={editingPage ? handleUpdatePage : handleAddPage}
        initialPage={editingPage}
      />

      <NewUserStoryModal 
        isOpen={isUserStoryModalOpen} 
        onClose={handleCloseUserStoryModal}
        onSubmit={editingUserStory ? handleUpdateUserStory : handleAddUserStory}
        initialUserStory={editingUserStory}
      />

      <NewFileModal
        isOpen={isFileModalOpen}
        onClose={handleCloseFileModal}
        onSubmit={editingFile ? handleUpdateFile : handleAddFile}
        parentNode={selectedParentNode}
        initialFile={editingFile}
      />

      {/* Modal para generar historias con IA */}
      {isIaGenerateModalOpen && selectedPageIdForIa && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm overflow-y-auto h-full w-full flex items-center justify-center z-50">
          <div className="bg-white/10 backdrop-blur-lg border border-white/20 p-6 rounded-lg shadow-xl w-full max-w-md">
            <div className="mb-4">
              <h3 className="text-lg font-semibold mb-2 text-white">Generar Historias de Usuario con IA</h3>
              <p className="text-sm text-gray-300">
                Configura las opciones para la generación automática de historias de usuario para la página seleccionada.
              </p>
            </div>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                {/* <Label htmlFor="numUserStories" className="text-right">
                  Número
                </Label> */}
                <label htmlFor="numUserStories" className="text-right text-white">
                  Número
                </label>
                {/* <Input
                  id="numUserStories"
                  type="number"
                  value={numUserStories}
                  onChange={(e) => setNumUserStories(parseInt(e.target.value, 10))}
                  min="1"
                  max="20"
                  className="col-span-3"
                /> */}
                <input
                  id="numUserStories"
                  type="number"
                  value={numUserStories}
                  onChange={(e) => setNumUserStories(parseInt(e.target.value, 10))}
                  min="1"
                  max="20"
                  className="col-span-3 mt-1 block w-full px-3 py-2 bg-white/10 backdrop-blur-sm border border-white/30 text-white placeholder-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-400 focus:border-indigo-400 sm:text-sm"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                {/* <Label htmlFor="userStoryType" className="text-right">
                  Tipo (Opcional)
                </Label> */}
                <label htmlFor="userStoryType" className="text-right text-white">
                  Tipo (Opcional)
                </label>
                {/* <Input
                  id="userStoryType"
                  value={userStoryType}
                  onChange={(e) => setUserStoryType(e.target.value)}
                  placeholder="Ej: para administradores"
                  className="col-span-3"
                /> */}
                <input
                  id="userStoryType"
                  type="text"
                  value={userStoryType}
                  onChange={(e) => setUserStoryType(e.target.value)}
                  placeholder="Ej: para administradores"
                  className="col-span-3 mt-1 block w-full px-3 py-2 bg-white/10 backdrop-blur-sm border border-white/30 text-white placeholder-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-400 focus:border-indigo-400 sm:text-sm"
                />
              </div>
            </div>
            <div className="flex justify-end space-x-2 pt-4">
              {/* <Button variant="outline" onClick={handleCloseIaGenerateModal}>Cancelar</Button> */}
              {/* <Button onClick={handleGenerateStoriesWithIa}>Generar Historias</Button> */}
              <button type="button" onClick={handleCloseIaGenerateModal} className="px-4 py-2 text-sm font-medium text-gray-300 bg-white/10 backdrop-blur-sm border border-white/30 rounded-md shadow-sm hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-400">Cancelar</button>
              <button type="button" onClick={handleGenerateStoriesWithIa} className="px-4 py-2 text-sm font-medium text-white bg-indigo-500/20 backdrop-blur-sm border border-indigo-400/30 rounded-md shadow-sm hover:bg-indigo-500/30 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-400">Generar Historias</button>
            </div>
          </div>
        </div>
      )}

      {/* Modal para editar descripción de página */}
      {isEditPageDescriptionModalOpen && selectedPageForDescriptionEdit && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm overflow-y-auto h-full w-full flex items-center justify-center z-50">
          <div className="bg-white/10 backdrop-blur-lg border border-white/20 p-6 rounded-lg shadow-xl w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-white">Editar Descripción de la Página</h3>
              <button onClick={handleCloseEditPageDescriptionModal} className="text-gray-300 hover:text-white">
                <X className="h-5 w-5" />
              </button>
            </div>
            <form onSubmit={(e) => { e.preventDefault(); handleUpdatePageDescription(); }}>
              <div className="mb-4">
                <label htmlFor="pageDescription" className="block text-sm font-medium text-white mb-1">
                  Descripción
                </label>
                {/* <Textarea
                  value={editingPageDescription}
                  onChange={(e) => setEditingPageDescription(e.target.value)}
                  placeholder="Descripción de la página"
                  className="w-full h-40 mb-4"
                /> */}
                <textarea
                  id="pageDescription"
                  value={editingPageDescription}
                  onChange={(e) => setEditingPageDescription(e.target.value)}
                  rows={4}
                  className="mt-1 block w-full px-3 py-2 bg-white/10 backdrop-blur-sm border border-white/30 text-white placeholder-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-400 focus:border-indigo-400 sm:text-sm"
                  placeholder="Introduce la nueva descripción para la página..."
                />
                <div className="flex justify-end space-x-2 mt-2">
                  {/* <Button variant="outline" onClick={handleCloseEditPageDescriptionModal}>Cancelar</Button> */}
                  {/* <Button onClick={() => console.log('TODO: Implement AI description generation for pageId:', selectedPageForDescriptionEdit?.id)}>Generar con IA</Button> */}
                  {/* <Button onClick={handleUpdatePageDescription}>Actualizar Descripción</Button> */}
                  <button type="button" onClick={handleCloseEditPageDescriptionModal} className="px-4 py-2 text-sm font-medium text-gray-300 bg-white/10 backdrop-blur-sm border border-white/30 rounded-md shadow-sm hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-400">Cancelar</button>
                  <button type="button" onClick={handleGeneratePageDescriptionWithAI} className="px-4 py-2 text-sm font-medium text-white bg-blue-500/20 backdrop-blur-sm border border-blue-400/30 rounded-md shadow-sm hover:bg-blue-500/30 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400">Generar con IA</button>
                  <button type="button" onClick={handleUpdatePageDescription} className="px-4 py-2 text-sm font-medium text-white bg-indigo-500/20 backdrop-blur-sm border border-indigo-400/30 rounded-md shadow-sm hover:bg-indigo-500/30 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-400">Actualizar Descripción</button>
                </div>
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={handleCloseEditPageDescriptionModal}
                  className="px-4 py-2 text-sm font-medium text-gray-300 bg-white/10 backdrop-blur-sm border border-white/30 rounded-md hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-400"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-white bg-yellow-500/20 backdrop-blur-sm border border-yellow-400/30 rounded-md hover:bg-yellow-500/30 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-400"
                >
                  Guardar Cambios
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Sidebar Toggle Button */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className={`fixed top-1/2 transform -translate-y-1/2 z-50 bg-white/10 backdrop-blur-lg border border-white/20 rounded-l-lg p-2 transition-all duration-300 hover:bg-white/20 ${
          isSidebarOpen ? 'right-80' : 'right-0'
        }`}
      >
        {isSidebarOpen ? (
          <ChevronRight className="h-5 w-5 text-white" />
        ) : (
          <ChevronLeft className="h-5 w-5 text-white" />
        )}
      </button>

      {/* Activity Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-80 bg-white/10 backdrop-blur-lg border-l border-white/20 transform transition-transform duration-300 z-40 ${
          isSidebarOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Sidebar Header */}
          <div className="p-4 border-b border-white/20">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-white flex items-center space-x-2">
                <Activity className="h-5 w-5" />
                <span>Panel de Actividad</span>
              </h2>
              <button
                onClick={() => setIsSidebarOpen(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            {/* Tab Navigation */}
            <div className="flex space-x-1 bg-white/5 rounded-lg p-1">
              <button
                onClick={() => setSidebarTab('activity')}
                className={`flex-1 px-3 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                  sidebarTab === 'activity'
                    ? 'bg-white/20 text-white shadow-sm'
                    : 'text-gray-300 hover:text-white hover:bg-white/10'
                }`}
              >
                <div className="flex items-center justify-center space-x-2">
                  <Activity className="h-4 w-4" />
                  <span>Activity Feed</span>
                </div>
              </button>
              <button
                onClick={() => setSidebarTab('logs')}
                className={`flex-1 px-3 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                  sidebarTab === 'logs'
                    ? 'bg-white/20 text-white shadow-sm'
                    : 'text-gray-300 hover:text-white hover:bg-white/10'
                }`}
              >
                <div className="flex items-center justify-center space-x-2">
                  <Bot className="h-4 w-4" />
                  <span>Agent Logs</span>
                </div>
              </button>
            </div>
          </div>

          {/* Sidebar Content */}
          <div className="flex-1 overflow-y-auto p-4">
            {sidebarTab === 'activity' ? (
              <div className="space-y-4">
                <h3 className="text-sm font-medium text-gray-300 mb-3">Actividad Reciente</h3>
                {activityFeed.map((item) => {
                  const IconComponent = item.icon;
                  return (
                    <div
                      key={item.id}
                      className="bg-white/5 backdrop-blur-sm rounded-lg p-3 border border-white/10 hover:bg-white/10 transition-colors"
                    >
                      <div className="flex items-start space-x-3">
                        <div className={`flex-shrink-0 ${item.color}`}>
                          <IconComponent className="h-5 w-5" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-white truncate">
                            {item.title}
                          </p>
                          <p className="text-xs text-gray-300 mt-1">
                            {item.description}
                          </p>
                          <div className="flex items-center justify-between mt-2">
                            <span className="text-xs text-gray-400">
                              by {item.author}
                            </span>
                            <span className="text-xs text-gray-400">
                              {formatTimeAgo(item.timestamp)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="space-y-4">
                <h3 className="text-sm font-medium text-gray-300 mb-3">Logs de Agentes</h3>
                {agentLogs.map((log) => {
                  const IconComponent = log.icon;
                  return (
                    <div
                      key={log.id}
                      className="bg-white/5 backdrop-blur-sm rounded-lg p-3 border border-white/10 hover:bg-white/10 transition-colors"
                    >
                      <div className="flex items-start space-x-3">
                        <div className={`flex-shrink-0 ${log.color}`}>
                          <IconComponent className="h-5 w-5" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-2 mb-1">
                            <span className="text-sm font-medium text-white">
                              {log.agent}
                            </span>
                            <span
                              className={`px-2 py-1 text-xs rounded-full ${
                                log.status === 'completed'
                                  ? 'bg-green-500/20 text-green-300'
                                  : log.status === 'in-progress'
                                  ? 'bg-yellow-500/20 text-yellow-300'
                                  : 'bg-red-500/20 text-red-300'
                              }`}
                            >
                              {log.status}
                            </span>
                          </div>
                          <p className="text-xs text-gray-300 mb-1">
                            {log.action}: <code className="bg-white/10 px-1 rounded">{log.target}</code>
                          </p>
                          <p className="text-xs text-gray-400 mb-2">
                            {log.details}
                          </p>
                          <span className="text-xs text-gray-400">
                            {formatTimeAgo(log.timestamp)}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Sidebar Footer */}
          {/* Sidebar Footer */}
          <div className="p-4 border-t border-white/20">
            <div className="text-xs text-gray-400 text-center">
              Contexto en tiempo real • Sin salir de la vista
            </div>
          </div>
        </div>      {/* ← cierra .flex flex-col h-full */}
      </div>        {/* ← cierra .fixed top-0 right-0 … */}

      {/* Modales de Configuración */}
      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
      />
      
      <ColorsModal 
        isOpen={isColorsModalOpen} 
        onClose={() => setIsColorsModalOpen(false)} 
      />
      
      <ComponentsModal 
        isOpen={isComponentsModalOpen} 
        onClose={() => setIsComponentsModalOpen(false)} 
      />
    </div>   
    </div>     
  );               // fin del return
}                  // fin de ProjectEdit
