const API_BASE_URL = 'http://localhost:3001/api';

// Función para hacer peticiones autenticadas
const apiRequest = async (endpoint: string, options: RequestInit = {}) => {
  const token = localStorage.getItem('token');
  console.log(`🌐 Haciendo petición a ${endpoint} con token completo:`, token || 'Sin token');
  
  const config: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
    ...options,
  };

  const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
  
  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Error de conexión' }));
    throw new Error(error.message || 'Error en la petición');
  }
  
  return response.json();
};

// Servicios de autenticación
export const authService = {
  login: async (email: string, password: string) => {
    return apiRequest('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  },

  register: async (email: string, password: string, name: string) => {
    return apiRequest('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ email, password, name }),
    });
  },

  getMe: async () => {
    return apiRequest('/auth/me');
  },

  verifyToken: async (token: string) => {
    return apiRequest('/auth/verify-token', {
      method: 'POST',
      body: JSON.stringify({ token }),
    });
  },
};

// Servicios de proyectos
export const projectService = {
  getProjects: async () => {
    return apiRequest('/projects');
  },

  getProject: async (id: string) => {
    return apiRequest(`/projects/${id}`);
  },

  createProject: async (projectData: {
    name: string;
    description: string;
    color: string;
    techStack?: string[];
  }) => {
    return apiRequest('/projects', {
      method: 'POST',
      body: JSON.stringify(projectData),
    });
  },

  updateProject: async (id: string, projectData: {
    name?: string;
    description?: string;
    status?: string;
    color?: string;
    techStack?: string[];
    githubUrl?: string;
  }) => {
    return apiRequest(`/projects/${id}`, {
      method: 'PUT',
      body: JSON.stringify(projectData),
    });
  },

  deleteProject: async (id: string) => {
    return apiRequest(`/projects/${id}`, {
      method: 'DELETE',
    });
  },

  addPage: async (projectId: string, pageData: {
    title: string;
    description: string;
    priority: 'low' | 'medium' | 'high';
  }) => {
    return apiRequest(`/projects/${projectId}/pages`, {
      method: 'POST',
      body: JSON.stringify(pageData),
    });
  },

  addUserStory: async (projectId: string, pageId: string, storyData: {
    title: string;
    description: string;
    acceptanceCriteria: string[];
    priority: 'low' | 'medium' | 'high';
    estimatedHours?: number;
  }) => {
    return apiRequest(`/projects/${projectId}/pages/${pageId}/stories`, {
      method: 'POST',
      body: JSON.stringify(storyData),
    });
  },
};

// Servicios de usuarios
export const userService = {
  getProfile: async () => {
    return apiRequest('/users/profile');
  },

  updateProfile: async (profileData: {
    name?: string;
    email?: string;
  }) => {
    return apiRequest('/users/profile', {
      method: 'PUT',
      body: JSON.stringify(profileData),
    });
  },

  changePassword: async (passwordData: {
    currentPassword: string;
    newPassword: string;
  }) => {
    return apiRequest('/users/change-password', {
      method: 'POST',
      body: JSON.stringify(passwordData),
    });
  },

  getStats: async () => {
    return apiRequest('/users/stats');
  },
};

export default apiRequest;