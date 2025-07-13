
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Home, ShieldCheck, Users, MessageSquare, HelpCircle, LogOut, ChevronLeft, ChevronRight } from 'lucide-react';

interface NavItem {
  to: string;
  label: string;
  icon: React.ReactNode;
}

interface AdminSidebarProps {
  navItems: NavItem[];
}

const AdminSidebar: React.FC<AdminSidebarProps> = ({ navItems }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className={`transition-all duration-500 ease-in-out bg-gradient-to-b from-backgroundSecondary/95 via-surface/90 to-backgroundSecondary/95 backdrop-blur-xl text-text flex flex-col border-r border-borderLight/30 shadow-2xl relative ${isCollapsed ? 'w-20' : 'w-72'}`}>
      {/* Efectos decorativos */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-secondary/5 pointer-events-none"></div>
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-accent to-secondary"></div>
      
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-borderLight/30 relative z-10">
        {!isCollapsed && (
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-primaryDark rounded-xl flex items-center justify-center shadow-lg">
              <ShieldCheck className="w-6 h-6 text-textInverse" />
            </div>
            <div>
              <h1 className="text-xl font-black bg-gradient-to-r from-text to-primaryLight bg-clip-text text-transparent">Admin</h1>
              <p className="text-xs text-textMuted">Panel de Control</p>
            </div>
          </div>
        )}
        <button 
          onClick={() => setIsCollapsed(!isCollapsed)} 
          className="p-3 rounded-xl hover:bg-surface/50 transition-all duration-300 transform hover:scale-110 bg-gradient-to-r from-surface/30 to-card/30 backdrop-blur-sm border border-borderLight/20 shadow-lg"
        >
          {isCollapsed ? 
            <ChevronRight size={20} className="text-primary" /> : 
            <ChevronLeft size={20} className="text-primary" />
          }
        </button>
      </div>
      
      {/* Navigation */}
      <nav className="flex-grow px-4 py-6 space-y-2 relative z-10">
        {navItems.map((item, index) => (
          <NavLink
            key={item.to}
            to={item.to}
            end
            className={({ isActive }) =>
              `group relative flex items-center px-4 py-3 rounded-xl transition-all duration-300 transform hover:scale-105 ${
                isActive 
                  ? 'bg-gradient-to-r from-primary to-primaryDark text-textInverse shadow-lg shadow-primary/25' 
                  : 'text-textSecondary hover:bg-gradient-to-r hover:from-surface/50 hover:to-card/50 hover:text-text backdrop-blur-sm'
              } ${isCollapsed ? 'justify-center' : ''}`
            }
            title={isCollapsed ? item.label : undefined}
            style={{ animationDelay: `${index * 50}ms` }}
          >
            {/* Efecto de brillo para elementos activos */}
            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            
            <div className="relative z-10 flex items-center w-full">
              <div className="flex-shrink-0">
                {item.icon}
              </div>
              {!isCollapsed && (
                <span className="ml-4 font-medium transition-all duration-300 group-hover:translate-x-1">
                  {item.label}
                </span>
              )}
            </div>
            
            {/* Indicador activo */}
            {!isCollapsed && (
              <div className="absolute right-2 w-2 h-2 bg-accent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            )}
          </NavLink>
        ))}
      </nav>
      
      {/* Footer */}
      <div className="px-4 py-6 border-t border-borderLight/30 relative z-10">
        <NavLink
          to="/logout"
          className={`group relative flex items-center px-4 py-3 rounded-xl transition-all duration-300 transform hover:scale-105 text-textSecondary hover:bg-gradient-to-r hover:from-error/20 hover:to-errorDark/20 hover:text-error backdrop-blur-sm ${isCollapsed ? 'justify-center' : ''}`}
          title={isCollapsed ? 'Cerrar Sesión' : undefined}
        >
          <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          
          <div className="relative z-10 flex items-center w-full">
            <div className="flex-shrink-0">
              <LogOut size={20} />
            </div>
            {!isCollapsed && (
              <span className="ml-4 font-medium transition-all duration-300 group-hover:translate-x-1">
                Cerrar Sesión
              </span>
            )}
          </div>
        </NavLink>
      </div>
    </div>
  );
};

export default AdminSidebar;
