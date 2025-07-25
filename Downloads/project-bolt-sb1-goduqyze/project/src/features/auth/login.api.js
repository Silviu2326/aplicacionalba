// Authentication API functions
const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

// Iniciar sesión
export const login = async (credentials) => {
  try {
    // Simular delay de red
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    console.log('Login attempt:', credentials);
    
    // Usuario de prueba
    const testUser = {
      email: 'ana@fitcoach.com',
      password: '123456'
    };
    
    // Validar credenciales
    if (credentials.email === testUser.email && credentials.password === testUser.password) {
      return {
        success: true,
        user: {
          id: 1,
          name: 'Ana García',
          email: credentials.email,
          role: 'trainer',
          avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
          subscription: 'premium',
          phone: '+34 600 123 456',
          specialties: ['Pérdida de peso', 'Ganancia muscular', 'Nutrición deportiva'],
          experience: '5 años',
          certifications: ['ACSM-CPT', 'Nutrición Deportiva']
        },
        token: 'mock_jwt_token_' + Date.now(),
        refreshToken: 'mock_refresh_token_' + Date.now(),
        expiresIn: 86400 // 24 hours
      };
    } else if (credentials.email && credentials.password) {
      // Otros usuarios válidos (para testing)
      return {
        success: true,
        user: {
          id: Date.now(),
          name: 'Usuario Demo',
          email: credentials.email,
          role: 'trainer',
          avatar: null,
          subscription: 'basic'
        },
        token: 'mock_jwt_token_' + Date.now(),
        refreshToken: 'mock_refresh_token_' + Date.now(),
        expiresIn: 86400
      };
    } else {
      throw new Error('Credenciales inválidas');
    }
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

// Registrar nuevo usuario
export const register = async (userData) => {
  try {
    // TODO: Implementar llamada real a la API
    // const response = await fetch(`${BASE_URL}/auth/register`, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(userData),
    // });
    // if (!response.ok) throw new Error('Error during registration');
    // return await response.json();
    
    // Mock response for development
    console.log('Registration attempt:', userData);
    
    if (userData.email && userData.password) {
      return {
        success: true,
        user: {
          id: Date.now(),
          name: userData.name || 'Usuario',
          email: userData.email,
          role: 'trainer',
          avatar: null,
          subscription: 'free'
        },
        token: 'mock_jwt_token_' + Date.now(),
        refreshToken: 'mock_refresh_token_' + Date.now(),
        expiresIn: 86400
      };
    } else {
      throw new Error('Datos de registro inválidos');
    }
  } catch (error) {
    console.error('Registration error:', error);
    throw error;
  }
};

// Cerrar sesión
export const logout = async () => {
  try {
    // TODO: Implementar llamada real a la API
    // const token = localStorage.getItem('token');
    // const response = await fetch(`${BASE_URL}/auth/logout`, {
    //   method: 'POST',
    //   headers: {
    //     'Authorization': `Bearer ${token}`,
    //     'Content-Type': 'application/json',
    //   },
    // });
    // if (!response.ok) throw new Error('Error during logout');
    // return await response.json();
    
    // Mock response for development
    console.log('Logout successful');
    
    // Limpiar localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
    
    return {
      success: true,
      message: 'Sesión cerrada correctamente'
    };
  } catch (error) {
    console.error('Logout error:', error);
    throw error;
  }
};

// Refrescar token
export const refreshToken = async () => {
  try {
    // TODO: Implementar llamada real a la API
    // const refreshToken = localStorage.getItem('refreshToken');
    // const response = await fetch(`${BASE_URL}/auth/refresh`, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({ refreshToken }),
    // });
    // if (!response.ok) throw new Error('Error refreshing token');
    // return await response.json();
    
    // Mock response for development
    const storedRefreshToken = localStorage.getItem('refreshToken');
    
    if (storedRefreshToken) {
      return {
        success: true,
        token: 'mock_new_jwt_token_' + Date.now(),
        refreshToken: 'mock_new_refresh_token_' + Date.now(),
        expiresIn: 86400
      };
    } else {
      throw new Error('No refresh token available');
    }
  } catch (error) {
    console.error('Token refresh error:', error);
    throw error;
  }
};

// Obtener perfil del usuario actual
export const getCurrentUser = async () => {
  try {
    // TODO: Implementar llamada real a la API
    // const token = localStorage.getItem('token');
    // const response = await fetch(`${BASE_URL}/auth/me`, {
    //   method: 'GET',
    //   headers: {
    //     'Authorization': `Bearer ${token}`,
    //     'Content-Type': 'application/json',
    //   },
    // });
    // if (!response.ok) throw new Error('Error fetching user profile');
    // return await response.json();
    
    // Mock response for development
    const storedUser = localStorage.getItem('user');
    
    if (storedUser) {
      return {
        success: true,
        user: JSON.parse(storedUser)
      };
    } else {
      throw new Error('Usuario no autenticado');
    }
  } catch (error) {
    console.error('Get current user error:', error);
    throw error;
  }
};

// Actualizar perfil del usuario
export const updateProfile = async (profileData) => {
  try {
    // TODO: Implementar llamada real a la API
    // const token = localStorage.getItem('token');
    // const response = await fetch(`${BASE_URL}/auth/profile`, {
    //   method: 'PUT',
    //   headers: {
    //     'Authorization': `Bearer ${token}`,
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(profileData),
    // });
    // if (!response.ok) throw new Error('Error updating profile');
    // return await response.json();
    
    // Mock response for development
    console.log('Updating profile:', profileData);
    
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const updatedUser = { ...JSON.parse(storedUser), ...profileData };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      
      return {
        success: true,
        user: updatedUser
      };
    } else {
      throw new Error('Usuario no encontrado');
    }
  } catch (error) {
    console.error('Update profile error:', error);
    throw error;
  }
};

// Solicitar restablecimiento de contraseña
export const forgotPassword = async (email) => {
  try {
    // TODO: Implementar llamada real a la API
    // const response = await fetch(`${BASE_URL}/auth/forgot-password`, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({ email }),
    // });
    // if (!response.ok) throw new Error('Error requesting password reset');
    // return await response.json();
    
    // Mock response for development
    console.log('Password reset requested for:', email);
    
    return {
      success: true,
      message: 'Se ha enviado un enlace de restablecimiento a tu email'
    };
  } catch (error) {
    console.error('Forgot password error:', error);
    throw error;
  }
};

// Restablecer contraseña
export const resetPassword = async (token, newPassword) => {
  try {
    // TODO: Implementar llamada real a la API
    // const response = await fetch(`${BASE_URL}/auth/reset-password`, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({ token, newPassword }),
    // });
    // if (!response.ok) throw new Error('Error resetting password');
    // return await response.json();
    
    // Mock response for development
    console.log('Password reset completed for token:', token);
    
    return {
      success: true,
      message: 'Contraseña restablecida correctamente'
    };
  } catch (error) {
    console.error('Reset password error:', error);
    throw error;
  }
};