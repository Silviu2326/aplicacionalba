
import React, { useState, useEffect } from 'react';
import { Button } from "../../../components/Button";
import { usePaneldelUsuarioCliente, UserProfile } from '../hooks/usePaneldelUsuarioCliente';
import { FaUser, FaCamera, FaEdit, FaSave, FaTimes, FaCog } from 'react-icons/fa';

export const ProfileEditor: React.FC = () => {
  const { user: initialUser, isLoading, error, success, updateProfile } = usePaneldelUsuarioCliente();
  
  const [isEditing, setIsEditing] = useState(false);
  const [user, setUser] = useState<Partial<UserProfile>>({});

  useEffect(() => {
    if (initialUser) {
      setUser(initialUser);
    }
  }, [initialUser]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setUser({ ...user, profilePicture: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    await updateProfile(user);
    if (!error) {
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setUser(initialUser || {});
    setIsEditing(false);
  };

  if (isLoading && !initialUser) {
    return <div>Cargando perfil...</div>;
  }

  if (!user) {
    return <div>No se pudo cargar el perfil.</div>;
  }

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-10">
      {/* Background decorative elements mejorados */}
      <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-primary opacity-5 rounded-full -translate-y-20 translate-x-20"></div>
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-secondary opacity-5 rounded-full translate-y-16 -translate-x-16"></div>
      <div className="absolute top-1/3 left-1/4 w-24 h-24 bg-gradient-to-r from-accent/10 to-info/10 rounded-full blur-2xl animate-pulse"></div>
      
      <div className="relative z-10">
        {/* Header ultra moderno */}
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center space-x-6">
            <div className="w-16 h-16 bg-gradient-to-br from-primary to-primaryDark rounded-2xl flex items-center justify-center shadow-2xl transform rotate-3 hover:rotate-6 transition-transform duration-300">
              <FaUser className="h-8 w-8 text-white" />
            </div>
            <div>
              <h2 className="text-4xl font-black bg-gradient-to-r from-text via-primary to-secondary bg-clip-text text-transparent">Mi Perfil</h2>
              <p className="text-textMuted text-lg font-medium">Gestiona tu información personal con estilo</p>
            </div>
          </div>
          {!isEditing && (
            <button
              onClick={() => setIsEditing(true)}
              className="flex items-center space-x-3 bg-gradient-to-r from-primary to-primaryDark hover:from-primaryDark hover:to-primary text-white px-8 py-4 rounded-2xl font-bold shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105 hover:-rotate-1"
            >
              <FaEdit className="h-5 w-5" />
              <span>Editar Perfil</span>
            </button>
          )}
        </div>

        {error && (
          <div className="bg-gradient-to-r from-error via-errorDark to-error text-white p-6 rounded-2xl mb-8 shadow-2xl border-2 border-error/30 relative overflow-hidden group animate-pulse">
            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative z-10 flex items-center space-x-4">
              <div className="w-8 h-8 bg-white/20 rounded-xl flex items-center justify-center shadow-lg backdrop-blur-sm">
                <span className="text-lg font-bold">!</span>
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-lg mb-1">Error</h4>
                <span className="text-white/90">{error}</span>
              </div>
            </div>
          </div>
        )}
        {success && (
          <div className="bg-gradient-to-r from-success via-successDark to-success text-white p-6 rounded-2xl mb-8 shadow-2xl border-2 border-success/30 relative overflow-hidden group animate-pulse">
            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative z-10 flex items-center space-x-4">
              <div className="w-8 h-8 bg-white/20 rounded-xl flex items-center justify-center shadow-lg backdrop-blur-sm">
                <span className="text-lg font-bold">✓</span>
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-lg mb-1">Éxito</h4>
                <span className="text-white/90">{success}</span>
              </div>
            </div>
          </div>
        )}

        <div className="bg-gradient-surface rounded-2xl p-8 shadow-xl border border-borderLight mb-8">
          <div className="flex items-center space-x-8">
            <div className="relative group">
              <div className="w-32 h-32 rounded-2xl overflow-hidden shadow-2xl border-4 border-white/20 group-hover:border-primary/30 transition-all duration-300">
                <img
                  src={user.profilePicture || `https://ui-avatars.com/api/?name=${user.name}+${user.lastName}&background=3B82F6&color=F8FAFC`}
                  alt="Foto de perfil"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              {isEditing && (
                <label
                  htmlFor="profilePictureInput"
                  className="absolute -bottom-2 -right-2 bg-gradient-primary hover:bg-gradient-to-r hover:from-primary hover:to-primaryDark text-white p-3 rounded-xl cursor-pointer transition-all duration-300 transform hover:scale-110 shadow-lg"
                >
                  <FaCamera className="h-5 w-5" />
                  <input
                    id="profilePictureInput"
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                </label>
              )}
            </div>
            <div className="flex-1">
              <div className="mb-4">
                <h3 className="text-2xl font-bold text-text mb-2">{user.name} {user.lastName}</h3>
                <p className="text-textMuted text-lg flex items-center">
                  <span className="w-2 h-2 bg-success rounded-full mr-2"></span>
                  {user.email}
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <div className="bg-primary/10 text-primary px-4 py-2 rounded-lg font-medium">
                  Cliente Activo
                </div>
                <div className="bg-success/10 text-success px-4 py-2 rounded-lg font-medium">
                  Verificado
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-surface/90 via-card/90 to-surface/90 backdrop-blur-xl rounded-3xl p-10 shadow-2xl border border-borderLight/50 relative overflow-hidden mb-8">
          {/* Efectos decorativos del formulario */}
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary via-secondary to-accent"></div>
          <div className="absolute -top-8 -right-8 w-16 h-16 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-full blur-xl animate-pulse"></div>
          
          <div className="relative z-10">
            <h4 className="text-3xl font-black text-text mb-8 flex items-center">
              <div className="w-12 h-12 bg-gradient-to-br from-secondary to-secondaryDark rounded-2xl flex items-center justify-center mr-4 shadow-lg transform rotate-3 hover:rotate-6 transition-transform duration-300">
                <FaEdit className="h-6 w-6 text-white" />
              </div>
              <span className="bg-gradient-to-r from-text to-secondary bg-clip-text text-transparent">
                Información Personal
              </span>
            </h4>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label htmlFor="name" className="block text-lg font-bold text-text mb-3 flex items-center">
                  <span className="mr-2">👤</span>
                  Nombre
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="name"
                    value={user.name || ''}
                    onChange={(e) => setUser({ ...user, name: e.target.value })}
                    disabled={!isEditing}
                    className={`w-full px-6 py-4 rounded-2xl border-2 font-medium transition-all duration-300 text-lg shadow-lg hover:shadow-xl transform hover:scale-[1.02] ${
                      isEditing 
                        ? 'border-borderLight bg-gradient-to-r from-surface to-card text-text placeholder-textMuted focus:outline-none focus:ring-4 focus:ring-primary/20 focus:border-primary' 
                        : 'border-transparent bg-background/50 text-textMuted cursor-not-allowed'
                    }`}
                    placeholder="Ingresa tu nombre"
                  />
                  {isEditing && (
                    <>
                      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary/0 to-primary/0 hover:from-primary/5 hover:to-secondary/5 transition-all duration-300 pointer-events-none"></div>
                      <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                        <FaEdit className="h-5 w-5 text-primary" />
                      </div>
                    </>
                  )}
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="lastName" className="block text-lg font-bold text-text mb-3 flex items-center">
                  <span className="mr-2">📝</span>
                  Apellidos
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="lastName"
                    value={user.lastName || ''}
                    onChange={(e) => setUser({ ...user, lastName: e.target.value })}
                    disabled={!isEditing}
                    className={`w-full px-6 py-4 rounded-2xl border-2 font-medium transition-all duration-300 text-lg shadow-lg hover:shadow-xl transform hover:scale-[1.02] ${
                      isEditing 
                        ? 'border-borderLight bg-gradient-to-r from-surface to-card text-text placeholder-textMuted focus:outline-none focus:ring-4 focus:ring-primary/20 focus:border-primary' 
                        : 'border-transparent bg-background/50 text-textMuted cursor-not-allowed'
                    }`}
                    placeholder="Ingresa tus apellidos"
                  />
                  {isEditing && (
                    <>
                      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary/0 to-primary/0 hover:from-primary/5 hover:to-secondary/5 transition-all duration-300 pointer-events-none"></div>
                      <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                        <FaEdit className="h-5 w-5 text-primary" />
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {isEditing && (
          <div className="flex flex-col sm:flex-row gap-6 mt-10">
            <button
              onClick={handleSave}
              disabled={isLoading}
              className="flex-1 bg-gradient-to-r from-primary to-primaryDark hover:from-primaryDark hover:to-primary text-white px-8 py-5 rounded-2xl font-bold text-lg shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105 hover:-rotate-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center space-x-3 relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 to-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative z-10 flex items-center space-x-3">
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-6 w-6 border-2 border-white border-t-transparent"></div>
                    <span>Guardando...</span>
                  </>
                ) : (
                  <>
                    <FaSave className="h-5 w-5" />
                    <span>Guardar Cambios</span>
                  </>
                )}
              </div>
            </button>
            <button
              onClick={handleCancel}
              disabled={isLoading}
              className="flex-1 bg-gradient-to-r from-surface to-card hover:from-card hover:to-surface text-textMuted hover:text-text border-2 border-borderLight hover:border-primary/50 px-8 py-5 rounded-2xl font-bold text-lg transition-all duration-300 transform hover:scale-105 hover:rotate-1 shadow-lg hover:shadow-xl flex items-center justify-center space-x-3 relative overflow-hidden group disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary/0 to-primary/0 group-hover:from-primary/5 group-hover:to-secondary/5 transition-all duration-300"></div>
              <div className="relative z-10 flex items-center space-x-3">
                <FaTimes className="h-5 w-5" />
                <span>Cancelar</span>
              </div>
            </button>
          </div>
        )}

        <div className="bg-gradient-surface rounded-2xl p-8 shadow-xl border border-borderLight">
          <div className="flex items-start space-x-6">
            <div className="w-12 h-12 bg-gradient-to-r from-info to-infoDark rounded-xl flex items-center justify-center shadow-lg">
              <FaCog className="h-6 w-6 text-white" />
            </div>
            <div className="flex-1">
              <h4 className="text-xl font-bold text-text mb-3">Configuración Avanzada</h4>
              <p className="text-textMuted mb-6 leading-relaxed">
                Gestiona opciones avanzadas como seguridad, privacidad y configuración de la cuenta.
              </p>
              <a 
                href="/configuracion-cuenta" 
                className="inline-flex items-center space-x-2 bg-gradient-to-r from-info to-infoDark text-white px-6 py-3 rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                <FaCog className="h-4 w-4" />
                <span>Ir a Configuración</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
