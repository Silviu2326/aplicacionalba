import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { authService } from '../services/api';

export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
}

export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  register: (email: string, password: string, name: string) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Verificar si hay un token guardado y validar con el backend
    const checkAuth = async () => {
      const token = localStorage.getItem('token');
      console.log('🔍 Token encontrado en localStorage:', token);
      if (token) {
        try {
          const userData = await authService.getMe();
          console.log('✅ Token válido, usuario autenticado:', userData.user);
          setUser(userData.user);
        } catch (error) {
          console.log('❌ Token inválido, limpiando localStorage');
          // Token inválido, limpiar localStorage
          localStorage.removeItem('token');
          localStorage.removeItem('user');
        }
      } else {
        console.log('ℹ️ No hay token en localStorage');
      }
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    try {
      const response = await authService.login(email, password);
      
      if (response.token && response.user) {
        // Guardar token y datos del usuario
        console.log('🔐 Login exitoso, guardando token:', response.token);
        localStorage.setItem('token', response.token);
        localStorage.setItem('user', JSON.stringify(response.user));
        setUser(response.user);
        setIsLoading(false);
        return true;
      }
      
      setIsLoading(false);
      return false;
    } catch (error) {
      console.error('Error en login:', error);
      setIsLoading(false);
      return false;
    }
  };

  const register = async (email: string, password: string, name: string): Promise<boolean> => {
    setIsLoading(true);
    
    try {
      const response = await authService.register(email, password, name);
      
      if (response.token && response.user) {
        // Guardar token y datos del usuario
        console.log('🔐 Registro exitoso, guardando token:', response.token);
        localStorage.setItem('token', response.token);
        localStorage.setItem('user', JSON.stringify(response.user));
        setUser(response.user);
        setIsLoading(false);
        return true;
      }
      
      setIsLoading(false);
      return false;
    } catch (error) {
      console.error('Error en registro:', error);
      setIsLoading(false);
      return false;
    }
  };

  const logout = () => {
    console.log('🚪 Cerrando sesión, eliminando token');
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    logout,
    register
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}