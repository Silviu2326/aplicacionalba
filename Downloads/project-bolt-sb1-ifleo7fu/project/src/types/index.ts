export interface AppPage {
  id: string;
  title: string;
  description: string;
  status: 'todo' | 'in-progress' | 'done';
  priority: 'low' | 'medium' | 'high';
  type: 'page' | 'epic' | 'bug';
  storyPoints?: number;
  dueDate?: Date;
  createdAt: Date;
  updatedAt: Date;
  userStories?: UserStory[];
  fileStructure?: FileNode[];
}

export interface UserStory {
  id: string;
  title: string;
  description: string;
  acceptanceCriteria: AcceptanceCriteria[];
  priority: 'low' | 'medium' | 'high';
  estimatedHours?: number;
  storyPoints?: number;
  status: 'todo' | 'in-progress' | 'done';
  type: 'page' | 'epic' | 'bug';
  dueDate?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface AcceptanceCriteria {
  id: string;
  text: string;
  completed: boolean;
  ciTestPassed?: boolean;
  lastChecked?: Date;
}

export interface FileNode {
  id: string;
  name: string;
  type: 'file' | 'folder';
  path: string;
  extension?: string;
  size?: number;
  children?: FileNode[];
  description?: string;
  status?: 'created' | 'modified' | 'pending' | 'completed';
  lastModified?: Date;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  status: 'planning' | 'development' | 'testing' | 'deployed';
  pages: AppPage[];
  createdAt: Date;
  updatedAt: Date;
  color: string;
  githubUrl?: string;
  fileStructure?: FileNode[];
  techStack?: string[];
}

export interface ProjectContextType {
  projects: Project[];
  currentProject: Project | null;
  isLoading: boolean;
  addProject: (project: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>) => Promise<Project | undefined>;
  updateProject: (id: string, project: Partial<Project>) => Promise<void>;
  deleteProject: (id: string) => Promise<void>;
  setCurrentProject: (project: Project | null) => void;
  addPage: (projectId: string, page: Omit<AppPage, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
  updatePage: (projectId: string, pageId: string, page: Partial<AppPage>) => void;
  deletePage: (projectId: string, pageId: string) => void;
  movePage: (projectId: string, pageId: string, newStatus: AppPage['status']) => void;
  addUserStory: (projectId: string, pageId: string, userStory: Omit<UserStory, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
  updateUserStory: (projectId: string, pageId: string, userStoryId: string, userStory: Partial<UserStory>) => void;
  deleteUserStory: (projectId: string, pageId: string, userStoryId: string) => void;
  moveUserStory: (projectId: string, pageId: string, userStoryId: string, newStatus: UserStory['status']) => void;
  addFileNode: (projectId: string, parentPath: string, fileNode: Omit<FileNode, 'id'>) => void;
  updateFileNode: (projectId: string, fileId: string, fileData: Partial<FileNode>) => void;
  deleteFileNode: (projectId: string, fileId: string) => void;
}