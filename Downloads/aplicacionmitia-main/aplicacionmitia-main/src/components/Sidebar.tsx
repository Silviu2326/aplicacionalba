import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

interface SidebarProps {
  onLogout?: () => void;
  userType?: string | null;
}

const Sidebar: React.FC<SidebarProps> = ({ onLogout, userType }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  // TODO: Implement usePWA hook to manage PWA installation state.
  // const { isInstallable } = usePWA();

  const navigationItems = [
    { 
      path: '/', 
      label: 'Home pública',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
        </svg>
      )
    },

    { 
      path: '/search', 
      label: 'Búsqueda',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
        </svg>
      )
    },
    { 
      path: '/professional/1', 
      label: 'Ficha Profesional',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
        </svg>
      )
    },
    { 
      path: '/booking/1', 
      label: 'Reserva',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
        </svg>
      )
    },
    { 
      path: '/payment/1', 
      label: 'Pago',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
          <path fillRule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clipRule="evenodd" />
        </svg>
      )
    },
    { 
      path: '/valoracion', 
      label: 'Valoración',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      )
    },
    { 
      path: '/panel-usuario', 
      label: 'Panel Usuario',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
        </svg>
      )
    },
    { 
      path: '/panel-profesional', 
      label: 'Panel Profesional',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clipRule="evenodd" />
          <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z" />
        </svg>
      )
    },
    { 
      path: '/planes-suscripciones', 
      label: 'Planes y Suscripciones',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path d="M4 3a2 2 0 100 4h12a2 2 0 100-4H4z" />
          <path fillRule="evenodd" d="M3 8a2 2 0 012-2v9a2 2 0 002 2h6a2 2 0 002-2V6a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8z" clipRule="evenodd" />
        </svg>
      )
    },
    { 
      path: '/admin', 
      label: 'Administración',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
        </svg>
      )
    },
    { 
      path: '/soporte', 
      label: 'Soporte',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-2 0c0 .993-.241 1.929-.668 2.754l-1.524-1.525a3.997 3.997 0 00.078-2.183l1.562-1.562C15.802 8.249 16 9.1 16 10zm-5.165 3.913l1.58 1.58A5.98 5.98 0 0110 16a5.976 5.976 0 01-2.516-.552l1.562-1.562a4.006 4.006 0 001.789.027zm-4.677-2.796a4.002 4.002 0 01-.041-2.08l-1.588-1.588A5.98 5.98 0 004 10c0 .954.223 1.856.619 2.657l1.539-1.54zm1.088-6.45A5.974 5.974 0 0110 4c.954 0 1.856.223 2.657.619l-1.54 1.54a4.002 4.002 0 00-2.346.033L7.246 4.668zM12 10a2 2 0 11-4 0 2 2 0 014 0z" clipRule="evenodd" />
        </svg>
      )
    },
    
   
  ];

  return (
    <div className={`${isCollapsed ? 'w-16' : 'w-64'} bg-surface shadow-xl h-full overflow-y-auto border-r border-border transition-all duration-300 ease-in-out`}>
      {/* Toggle Button */}
      <div className="flex justify-end p-2">
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-2 rounded-lg bg-card hover:bg-primary text-textSecondary hover:text-textInverse transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-focus"
          aria-label={isCollapsed ? 'Expandir sidebar' : 'Colapsar sidebar'}
        >
          <svg 
            className={`w-5 h-5 transition-transform duration-300 ${isCollapsed ? 'rotate-180' : ''}`} 
            fill="currentColor" 
            viewBox="0 0 20 20"
          >
            <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
      
      <div className={`${isCollapsed ? 'px-2' : 'px-6'} pb-6 transition-all duration-300`}>
        {/* Header with gradient background */}
        {!isCollapsed && (
          <div className="mb-8">
            <div className="bg-gradient-primary p-4 rounded-lg mb-2">
              <h1 className="text-2xl font-bold text-textInverse text-center">TheraFlow</h1>
            </div>
            <p className="text-textMuted text-sm text-center">Panel de navegación</p>
          </div>
        )}
        
        {/* Collapsed Logo */}
        {isCollapsed && (
          <div className="mb-6 flex justify-center">
            <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
              <span className="text-textInverse font-bold text-lg">T</span>
            </div>
          </div>
        )}
        
        <nav className="space-y-1">
          {navigationItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `group flex items-center w-full text-left ${isCollapsed ? 'px-2 py-3 justify-center' : 'px-4 py-3'} rounded-lg transition-all duration-200 ${
                  isActive
                    ? 'bg-primary text-textInverse shadow-md transform scale-[1.02]'
                    : 'text-textSecondary hover:bg-card hover:text-text hover:transform hover:scale-[1.01]'
                }`
              }
              title={isCollapsed ? item.label : undefined}
            >
              {isCollapsed ? (
                <div className="w-6 h-6 flex items-center justify-center">
                  {item.icon}
                </div>
              ) : (
                <div className="flex items-center w-full">
                  <div className="mr-3 flex-shrink-0">
                    {item.icon}
                  </div>
                  <span className="font-medium truncate">{item.label}</span>
                </div>
              )}
            </NavLink>
          ))}
          
          {/* Separator */}
          <div className="my-4 border-t border-border"></div>
          
          {/* PWA Installation Link */}
          {/* When the usePWA hook is ready, the link will be displayed conditionally */}
          {/* isInstallable && ( */}
          <NavLink
            to="/instalar-pwa"
            className={({ isActive }) =>
              `group flex items-center w-full text-left ${isCollapsed ? 'px-2 py-3 justify-center' : 'px-4 py-3'} rounded-lg transition-all duration-200 ${
                isActive
                  ? 'bg-accent text-textInverse shadow-md transform scale-[1.02]'
                  : 'text-textSecondary hover:bg-card hover:text-text hover:transform hover:scale-[1.01]'
              }`
            }
            title={isCollapsed ? 'Instalar aplicación' : undefined}
          >
            {isCollapsed ? (
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            ) : (
              <div className="flex items-center w-full">
                <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
                <span className="font-medium">Instalar aplicación</span>
              </div>
            )}
          </NavLink>
          {/* ) */}
        </nav>
        
        {/* User Info and Logout */}
        {!isCollapsed && (
          <div className="mt-8 pt-4 border-t border-border">
            <div className="text-center mb-4">
              <p className="text-textMuted text-xs mb-1">Usuario: {userType || 'Desconocido'}</p>
              <div className="flex justify-center mb-3">
                <div className="w-2 h-2 bg-success rounded-full mr-1"></div>
                <span className="text-textMuted text-xs">En línea</span>
              </div>
              {onLogout && (
                <button
                  onClick={onLogout}
                  className="w-full px-3 py-2 text-sm bg-error text-textInverse rounded-lg hover:bg-errorHover transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-focus"
                >
                  Cerrar Sesión
                </button>
              )}
            </div>
            <div className="text-center">
              <p className="text-textMuted text-xs">Versión 1.0.0</p>
            </div>
          </div>
        )}
        
        {/* Collapsed Footer */}
        {isCollapsed && (
          <div className="mt-8 pt-4 border-t border-border">
            <div className="flex justify-center mb-3">
              <div className="w-2 h-2 bg-success rounded-full" title="En línea"></div>
            </div>
            {onLogout && (
              <div className="flex justify-center">
                <button
                  onClick={onLogout}
                  className="p-2 bg-error text-textInverse rounded-lg hover:bg-errorHover transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-focus"
                  title="Cerrar Sesión"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
