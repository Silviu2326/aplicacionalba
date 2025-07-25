import React from 'react';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';

// Layouts
import DashboardLayout from '../layouts/DashboardLayout';
import AuthLayout from '../layouts/AuthLayout';

// Pages
import DashboardPage from '../features/dashboard/Dashboard.page';
import ClientsPage from '../features/clients/Clients.page';
import DietsPage from '../features/diets/Diets.page';
import EditDietPage from '../features/diets/EditDiet.page';
import WorkoutsPage from '../features/workouts/Workouts.page';
import EditWorkoutPage from '../features/workouts/EditWorkout.page';
import PaymentsPage from '../features/payments/Payments.page';
import LoginPage from '../features/auth/Login.page';
import SharedWorkoutPage from '../pages/SharedWorkout.page';
import SharedDietPage from '../pages/SharedDiet.page';

// Hook para verificar autenticación
const useAuth = () => {
  const token = localStorage.getItem('token');
  const user = localStorage.getItem('user');
  
  // Verificar que tanto el token como el usuario existan
  return !!(token && user);
};

// Componente de ruta protegida
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
};

// Componente de ruta pública (solo para usuarios no autenticados)
const PublicRoute = ({ children }) => {
  const isAuthenticated = useAuth();
  
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }
  
  return children;
};

// Configuración del router
const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/dashboard" replace />
  },
  {
    path: '/login',
    element: (
      <PublicRoute>
        <AuthLayout>
          <LoginPage />
        </AuthLayout>
      </PublicRoute>
    )
  },
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: 'dashboard',
        element: <DashboardPage />
      },
      {
        path: 'clients',
        element: <ClientsPage />
      },
      {
        path: 'diets',
        element: <DietsPage />
      },
      {
        path: 'diets/edit/:id',
        element: <EditDietPage />
      },
      {
        path: 'diets/new',
        element: <EditDietPage />
      },
      {
        path: 'workouts',
        element: <WorkoutsPage />
      },
      {
        path: 'workouts/edit/:id',
        element: <EditWorkoutPage />
      },
      {
        path: 'workouts/new',
        element: <EditWorkoutPage />
      },
      {
        path: 'payments',
        element: <PaymentsPage />
      }
    ]
  },
  {
    path: '/shared/workout/:shareToken',
    element: <SharedWorkoutPage />
  },
  {
    path: '/shared/diet/:token',
    element: <SharedDietPage />
  },
  {
    path: '*',
    element: (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">404</h1>
          <p className="text-gray-600 mb-6">Página no encontrada</p>
          <a
            href="/dashboard"
            className="inline-block bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Volver al Dashboard
          </a>
        </div>
      </div>
    )
  }
]);

const AppRouter = () => {
  return <RouterProvider router={router} />;
};

export default AppRouter;