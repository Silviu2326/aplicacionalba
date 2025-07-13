import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from './Button';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-surface shadow-xl fixed w-full top-0 z-50 border-b border-border backdrop-blur-sm bg-opacity-95">
      <nav className="container mx-auto px-3 sm:px-4 md:px-6 py-3 sm:py-4">
        <div className="flex justify-between items-center">
          {/* Logo with gradient */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-primary rounded-lg flex items-center justify-center transform group-hover:scale-105 transition-transform duration-200">
              <span className="text-textInverse font-bold text-sm sm:text-lg">T</span>
            </div>
            <div className="hidden xs:block">
              <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-text group-hover:text-primary transition-colors duration-200">
                TheraFlow
              </h1>
              <p className="text-xs text-textMuted -mt-1 hidden sm:block">Plataforma de terapia</p>
            </div>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-4 xl:space-x-6">
            {/* Navigation Links */}
            <div className="flex items-center space-x-2 xl:space-x-4">
              <Link 
                to="/search" 
                className="text-textSecondary hover:text-text transition-colors duration-200 font-medium flex items-center space-x-1 text-sm xl:text-base"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                </svg>
                <span className="hidden xl:inline">Buscar</span>
              </Link>
              <Link 
                to="/planes-suscripciones" 
                className="text-textSecondary hover:text-text transition-colors duration-200 font-medium flex items-center space-x-1 text-sm xl:text-base"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M4 3a2 2 0 100 4h12a2 2 0 100-4H4z" />
                  <path fillRule="evenodd" d="M3 8a2 2 0 012-2v9a2 2 0 002 2h6a2 2 0 002-2V6a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8z" clipRule="evenodd" />
                </svg>
                <span className="hidden xl:inline">Planes</span>
              </Link>
              <Link 
                to="/soporte" 
                className="text-textSecondary hover:text-text transition-colors duration-200 font-medium flex items-center space-x-1 text-sm xl:text-base"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-2 0c0 .993-.241 1.929-.668 2.754l-1.524-1.525a3.997 3.997 0 00.078-2.183l1.562-1.562C15.802 8.249 16 9.1 16 10zm-5.165 3.913l1.58 1.58A5.98 5.98 0 0110 16a5.976 5.976 0 01-2.516-.552l1.562-1.562a4.006 4.006 0 001.789.027zm-4.677-2.796a4.002 4.002 0 01-.041-2.08l-1.588-1.588A5.98 5.98 0 004 10c0 .954.223 1.856.619 2.657l1.539-1.54zm1.088-6.45A5.974 5.974 0 0110 4c.954 0 1.856.223 2.657.619l-1.54 1.54a4.002 4.002 0 00-2.346.033L7.246 4.668zM12 10a2 2 0 11-4 0 2 2 0 014 0z" clipRule="evenodd" />
                </svg>
                <span className="hidden xl:inline">Soporte</span>
              </Link>
            </div>
            
            {/* Auth Buttons */}
            <div className="flex items-center space-x-2 xl:space-x-3">
              <Link to="/auth">
                <Button variant="secondary" size="sm" className="text-xs xl:text-sm">
                  <svg className="w-4 h-4 xl:mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3 3a1 1 0 011 1v12a1 1 0 11-2 0V4a1 1 0 011-1zm7.707 3.293a1 1 0 010 1.414L9.414 9H17a1 1 0 110 2H9.414l1.293 1.293a1 1 0 01-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="hidden xl:inline">Iniciar Sesión</span>
                </Button>
              </Link>
              <Link to="/auth?mode=signup">
                <Button variant="primary" size="sm" className="text-xs xl:text-sm">
                  <svg className="w-4 h-4 xl:mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z" />
                  </svg>
                  <span className="hidden xl:inline">Registrarse</span>
                </Button>
              </Link>
            </div>
          </div>
          
          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="p-2 rounded-lg bg-card hover:bg-primary text-textSecondary hover:text-textInverse focus:outline-none focus:ring-2 focus:ring-focus transition-all duration-200"
              aria-label="toggle menu"
            >
              <svg 
                viewBox="0 0 24 24" 
                className={`h-6 w-6 fill-current transition-transform duration-300 ${isOpen ? 'rotate-90' : ''}`}
              >
                {isOpen ? (
                  <path d="M6 18L18 6M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                ) : (
                  <path
                    fillRule="evenodd"
                    d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {isOpen && (
          <div className="lg:hidden mt-4 sm:mt-6 pb-4 border-t border-border pt-4">
            <div className="space-y-3 sm:space-y-4">
              {/* Mobile Navigation Links */}
              <div className="space-y-1 sm:space-y-2">
                <Link 
                  to="/search" 
                  className="flex items-center space-x-3 text-textSecondary hover:text-text transition-colors duration-200 p-2 sm:p-3 rounded-lg hover:bg-card"
                  onClick={() => setIsOpen(false)}
                >
                  <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                  </svg>
                  <span className="font-medium text-sm sm:text-base">Buscar Profesionales</span>
                </Link>
                <Link 
                  to="/planes-suscripciones" 
                  className="flex items-center space-x-3 text-textSecondary hover:text-text transition-colors duration-200 p-2 sm:p-3 rounded-lg hover:bg-card"
                  onClick={() => setIsOpen(false)}
                >
                  <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M4 3a2 2 0 100 4h12a2 2 0 100-4H4z" />
                    <path fillRule="evenodd" d="M3 8a2 2 0 012-2v9a2 2 0 002 2h6a2 2 0 002-2V6a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8z" clipRule="evenodd" />
                  </svg>
                  <span className="font-medium text-sm sm:text-base">Planes y Precios</span>
                </Link>
                <Link 
                  to="/soporte" 
                  className="flex items-center space-x-3 text-textSecondary hover:text-text transition-colors duration-200 p-2 sm:p-3 rounded-lg hover:bg-card"
                  onClick={() => setIsOpen(false)}
                >
                  <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-2 0c0 .993-.241 1.929-.668 2.754l-1.524-1.525a3.997 3.997 0 00.078-2.183l1.562-1.562C15.802 8.249 16 9.1 16 10zm-5.165 3.913l1.58 1.58A5.98 5.98 0 0110 16a5.976 5.976 0 01-2.516-.552l1.562-1.562a4.006 4.006 0 001.789.027zm-4.677-2.796a4.002 4.002 0 01-.041-2.08l-1.588-1.588A5.98 5.98 0 004 10c0 .954.223 1.856.619 2.657l1.539-1.54zm1.088-6.45A5.974 5.974 0 0110 4c.954 0 1.856.223 2.657.619l-1.54 1.54a4.002 4.002 0 00-2.346.033L7.246 4.668zM12 10a2 2 0 11-4 0 2 2 0 014 0z" clipRule="evenodd" />
                  </svg>
                  <span className="font-medium text-sm sm:text-base">Soporte y Ayuda</span>
                </Link>
              </div>
              
              {/* Mobile Auth Buttons */}
              <div className="space-y-2 sm:space-y-3 pt-3 sm:pt-4 border-t border-border">
                <Link to="/auth" className="block" onClick={() => setIsOpen(false)}>
                  <Button variant="secondary" className="w-full justify-center text-sm sm:text-base py-2 sm:py-3">
                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M3 3a1 1 0 011 1v12a1 1 0 11-2 0V4a1 1 0 011-1zm7.707 3.293a1 1 0 010 1.414L9.414 9H17a1 1 0 110 2H9.414l1.293 1.293a1 1 0 01-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Iniciar Sesión
                  </Button>
                </Link>
                <Link to="/auth?mode=signup" className="block" onClick={() => setIsOpen(false)}>
                  <Button variant="primary" className="w-full justify-center text-sm sm:text-base py-2 sm:py-3">
                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z" />
                    </svg>
                    Registrarse Gratis
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
