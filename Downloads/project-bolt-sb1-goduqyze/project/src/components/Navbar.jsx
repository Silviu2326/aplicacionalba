import React from 'react';
import { Menu, Bell, User, Search } from 'lucide-react';
import Button from './Button';

const Navbar = ({ onToggleSidebar }) => {
  // Obtener usuario del localStorage
  const getUserFromStorage = () => {
    try {
      const userData = localStorage.getItem('user');
      return userData ? JSON.parse(userData) : null;
    } catch {
      return null;
    }
  };

  const user = getUserFromStorage();

  return (
    <nav className="glass-mid border-b border-white/20 px-6 py-4 backdrop-blur-xl">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button
            variant="secondary"
            size="sm"
            onClick={onToggleSidebar}
            className="lg:hidden p-2 border-0"
          >
            <Menu size={20} />
          </Button>
          
          <div className="hidden md:block">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Buscar clientes, rutinas..."
                className="pl-10 pr-4 py-3 w-80 glass border-0 placeholder-neutral-500 text-neutral-800 focus:ring-2 focus:ring-brand/50 focus:outline-none"
              />
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <button className="p-2 text-neutral-600 hover:text-brand hover:bg-white/20 rounded-xl transition-colors">
            <Bell size={20} />
          </button>
          
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-brand to-brand-light rounded-2xl flex items-center justify-center overflow-hidden shadow-frosted">
              {user?.avatar ? (
                <img 
                  src={user.avatar} 
                  alt={user.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <User size={16} className="text-white" />
              )}
            </div>
            <div className="hidden md:block">
              <p className="text-sm font-semibold text-neutral-900">{user?.name || 'Usuario'}</p>
              <p className="text-xs text-neutral-600">
                {user?.role === 'trainer' ? 'Entrenadora Personal' : 'Usuario'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;