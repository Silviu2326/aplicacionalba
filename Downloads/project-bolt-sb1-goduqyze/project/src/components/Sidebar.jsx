import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  Users, 
  Apple, 
  Dumbbell, 
  CreditCard, 
  LogOut,
  X
} from 'lucide-react';

const Sidebar = ({ isOpen, onClose }) => {
  const location = useLocation();

  const menuItems = [
    { path: '/dashboard', icon: Home, label: 'Dashboard' },
    { path: '/clients', icon: Users, label: 'Clientes' },
    { path: '/diets', icon: Apple, label: 'Dietas' },
    { path: '/workouts', icon: Dumbbell, label: 'Entrenamientos' },
    { path: '/payments', icon: CreditCard, label: 'Pagos' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <>
      {/* Overlay móvil */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 lg:hidden z-40"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed top-0 left-0 z-50 w-64 h-full bg-neutral-900 border-r border-neutral-700 transform transition-transform duration-300
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="flex items-center justify-between p-6 border-b border-neutral-700">
          <div className="flex items-center space-x-3">
            <Dumbbell size={24} className="text-brand" />
            <h1 className="text-xl font-bold text-white">FitCoach Pro</h1>
          </div>
          
          <button 
            onClick={onClose}
            className="lg:hidden p-2 hover:bg-neutral-800 transition-colors"
          >
            <X size={20} className="text-white" />
          </button>
        </div>

        <nav className="p-4 space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);
            
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={onClose}
                className={`
                  flex items-center space-x-3 px-4 py-3 transition-colors
                  ${active 
                    ? 'bg-brand text-white' 
                    : 'text-neutral-300 hover:bg-neutral-800 hover:text-white'
                  }
                `}
              >
                <Icon size={20} />
                <span className="font-medium">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-neutral-700">
          <button className="flex items-center space-x-3 px-4 py-3 w-full text-neutral-300 hover:bg-neutral-800 hover:text-white transition-colors">
            <LogOut size={20} />
            <span className="font-medium">Cerrar Sesión</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;