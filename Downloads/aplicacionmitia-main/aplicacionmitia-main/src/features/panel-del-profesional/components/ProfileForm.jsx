import React, { useState } from 'react';
import { FaUser, FaCamera, FaEdit, FaSave, FaTimes, FaUserTie, FaDollarSign, FaPlus, FaStar } from 'react-icons/fa';

const ProfileForm = ({ profile, onSave, loading }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: profile?.name || '',
    bio: profile?.bio || '',
    specialties: profile?.specialties || [],
    hourlyRate: profile?.hourlyRate || '',
    profilePicture: profile?.profilePicture || null,
  });
  const [newSpecialty, setNewSpecialty] = useState('');
  const [imagePreview, setImagePreview] = useState(profile?.profilePicture || null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setFormData(prev => ({
          ...prev,
          profilePicture: file
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const addSpecialty = () => {
    if (newSpecialty.trim() && !formData.specialties.includes(newSpecialty.trim())) {
      setFormData(prev => ({
        ...prev,
        specialties: [...prev.specialties, newSpecialty.trim()]
      }));
      setNewSpecialty('');
    }
  };

  const removeSpecialty = (specialty) => {
    setFormData(prev => ({
      ...prev,
      specialties: prev.specialties.filter(s => s !== specialty)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await onSave(formData);
      setIsEditing(false);
    } catch (error) {
      console.error('Error saving profile:', error);
    }
  };

  const handleCancel = () => {
    setFormData({
      name: profile?.name || '',
      bio: profile?.bio || '',
      specialties: profile?.specialties || [],
      hourlyRate: profile?.hourlyRate || '',
      profilePicture: profile?.profilePicture || null,
    });
    setImagePreview(profile?.profilePicture || null);
    setIsEditing(false);
  };

  if (loading) {
    return (
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-surface/80 to-card/60 backdrop-blur-xl rounded-2xl border border-borderLight/50 shadow-xl"></div>
        <div className="relative p-6">
          <div className="animate-pulse space-y-6">
            {/* Header skeleton */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-primary/20 to-accent/20 rounded-xl"></div>
                <div>
                  <div className="h-6 bg-gradient-to-r from-backgroundSecondary/60 to-surface/40 rounded-lg w-48 mb-2"></div>
                  <div className="h-4 bg-gradient-to-r from-backgroundSecondary/40 to-surface/30 rounded w-32"></div>
                </div>
              </div>
              <div className="h-10 bg-gradient-to-r from-primary/20 to-accent/20 rounded-xl w-24"></div>
            </div>
            
            {/* Profile picture and name skeleton */}
            <div className="flex items-center space-x-6">
              <div className="w-24 h-24 bg-gradient-to-r from-primary/20 to-accent/20 rounded-full"></div>
              <div className="flex-1">
                <div className="h-6 bg-gradient-to-r from-backgroundSecondary/60 to-surface/40 rounded-lg w-2/3 mb-2"></div>
                <div className="h-4 bg-gradient-to-r from-backgroundSecondary/40 to-surface/30 rounded w-1/2"></div>
              </div>
            </div>
            
            {/* Form fields skeleton */}
            <div className="space-y-4">
              <div className="h-20 bg-gradient-to-r from-backgroundSecondary/40 to-surface/30 rounded-xl"></div>
              <div className="h-16 bg-gradient-to-r from-backgroundSecondary/40 to-surface/30 rounded-xl"></div>
              <div className="h-12 bg-gradient-to-r from-backgroundSecondary/40 to-surface/30 rounded-xl"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      {/* Efecto de resplandor de fondo */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-accent/10 rounded-2xl blur-xl opacity-50"></div>
      
      {/* Contenedor principal */}
      <div className="relative bg-gradient-to-br from-surface/95 to-card/90 backdrop-blur-xl rounded-2xl border border-borderLight/50 shadow-2xl overflow-hidden">
        {/* Header modernizado */}
        <div className="p-6 border-b border-borderLight/30">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent rounded-xl blur opacity-50 animate-pulse"></div>
                <div className="relative w-12 h-12 bg-gradient-to-r from-primary to-accent rounded-xl flex items-center justify-center shadow-lg">
                  <FaUserTie className="text-textInverse text-xl" />
                </div>
              </div>
              <div>
                <h2 className="text-2xl font-bold bg-gradient-to-r from-text to-primaryLight bg-clip-text text-transparent">Perfil Profesional</h2>
                <p className="text-textSecondary text-sm">Gestiona tu información profesional</p>
              </div>
            </div>
            
            {/* Botones de acción modernizados */}
            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                className="group relative overflow-hidden px-6 py-3 rounded-xl font-semibold"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent rounded-xl blur opacity-50 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative bg-gradient-to-r from-primary to-accent text-textInverse rounded-xl px-6 py-3 flex items-center space-x-2 transform group-hover:scale-105 transition-transform duration-300">
                  <FaEdit />
                  <span>Editar</span>
                </div>
              </button>
            ) : (
              <div className="flex space-x-3">
                <button
                  onClick={handleCancel}
                  className="px-6 py-3 bg-gradient-to-r from-backgroundSecondary/60 to-surface/40 backdrop-blur-sm border border-borderLight/50 rounded-xl text-textSecondary font-medium hover:text-text hover:border-borderLight transition-all duration-300 flex items-center space-x-2"
                >
                  <FaTimes />
                  <span>Cancelar</span>
                </button>
                <button
                  onClick={handleSubmit}
                  className="group relative overflow-hidden px-6 py-3 rounded-xl font-semibold"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-success to-successLight rounded-xl blur opacity-50 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative bg-gradient-to-r from-success to-successLight text-textInverse rounded-xl px-6 py-3 flex items-center space-x-2 transform group-hover:scale-105 transition-transform duration-300">
                    <FaSave />
                    <span>Guardar</span>
                  </div>
                </button>
              </div>
            )}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-8">
          {/* Foto de perfil modernizada */}
          <div className="flex items-center space-x-6">
            <div className="relative group">
              {/* Efecto de resplandor para la foto */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary/30 to-accent/30 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              <div className="relative w-28 h-28 rounded-full overflow-hidden bg-gradient-to-r from-backgroundSecondary/60 to-surface/40 backdrop-blur-sm border-4 border-borderLight/50 shadow-xl">
                {imagePreview ? (
                  <img
                    src={imagePreview}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-textMuted bg-gradient-to-r from-primary/10 to-accent/10">
                    <FaUser className="text-4xl" />
                  </div>
                )}
              </div>
              
              {isEditing && (
                <label className="absolute bottom-0 right-0 w-10 h-10 bg-gradient-to-r from-primary to-accent text-textInverse rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition-transform duration-300 shadow-lg border-2 border-surface">
                  <FaCamera className="text-sm" />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>
              )}
            </div>
            
            {/* Campo de nombre modernizado */}
            <div className="flex-1">
              <label className="block text-sm font-semibold text-textSecondary mb-3">
                Nombre completo
              </label>
              {isEditing ? (
                <div className="relative">
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gradient-to-r from-backgroundSecondary/60 to-surface/40 backdrop-blur-sm border border-borderLight/50 rounded-xl text-text placeholder-textMuted focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all duration-300"
                    placeholder="Tu nombre completo"
                  />
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary/5 to-accent/5 opacity-0 focus-within:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                </div>
              ) : (
                <p className="text-xl font-bold bg-gradient-to-r from-text to-primaryLight bg-clip-text text-transparent">
                  {profile?.name || 'Sin nombre'}
                </p>
              )}
            </div>
          </div>

          {/* Biografía modernizada */}
          <div className="relative">
            <div className="absolute top-0 left-0 w-1 h-6 bg-gradient-to-b from-primary to-accent rounded-full"></div>
            <label className="block text-sm font-semibold text-textSecondary mb-3 ml-4">
              Biografía profesional
            </label>
            {isEditing ? (
              <div className="relative">
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-4 py-3 bg-gradient-to-r from-backgroundSecondary/60 to-surface/40 backdrop-blur-sm border border-borderLight/50 rounded-xl text-text placeholder-textMuted focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all duration-300 resize-none"
                  placeholder="Describe tu experiencia, formación y enfoque profesional..."
                />
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary/5 to-accent/5 opacity-0 focus-within:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>
            ) : (
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-info/5 to-infoLight/5 rounded-xl blur"></div>
                <p className="relative text-text bg-gradient-to-r from-backgroundSecondary/60 to-surface/40 backdrop-blur-sm p-4 rounded-xl border border-borderLight/30">
                  {profile?.bio || 'Sin biografía'}
                </p>
              </div>
            )}
          </div>

          {/* Especialidades modernizadas */}
          <div className="relative">
            <div className="absolute top-0 left-0 w-1 h-6 bg-gradient-to-b from-accent to-primary rounded-full"></div>
            <label className="block text-sm font-semibold text-textSecondary mb-3 ml-4 flex items-center space-x-2">
              <span>Especialidades</span>
              <FaStar className="text-accent" />
            </label>
            
            <div className="flex flex-wrap gap-3 mb-4">
              {formData.specialties.map((specialty, index) => (
                <div key={index} className="group relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 rounded-full blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <span className="relative inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-gradient-to-r from-primary to-accent text-textInverse shadow-lg">
                    {specialty}
                    {isEditing && (
                      <button
                        type="button"
                        onClick={() => removeSpecialty(specialty)}
                        className="ml-2 text-textInverse hover:text-error transition-colors duration-200"
                      >
                        <FaTimes className="text-xs" />
                      </button>
                    )}
                  </span>
                </div>
              ))}
            </div>
            
            {isEditing && (
              <div className="flex space-x-3">
                <div className="relative flex-1">
                  <input
                    type="text"
                    value={newSpecialty}
                    onChange={(e) => setNewSpecialty(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSpecialty())}
                    className="w-full px-4 py-3 bg-gradient-to-r from-backgroundSecondary/60 to-surface/40 backdrop-blur-sm border border-borderLight/50 rounded-xl text-text placeholder-textMuted focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all duration-300"
                    placeholder="Agregar especialidad"
                  />
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary/5 to-accent/5 opacity-0 focus-within:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                </div>
                <button
                  type="button"
                  onClick={addSpecialty}
                  className="group relative overflow-hidden px-6 py-3 rounded-xl font-semibold"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-accent to-accentLight rounded-xl blur opacity-50 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative bg-gradient-to-r from-accent to-accentLight text-textInverse rounded-xl px-6 py-3 flex items-center space-x-2 transform group-hover:scale-105 transition-transform duration-300">
                    <FaPlus />
                    <span>Agregar</span>
                  </div>
                </button>
              </div>
            )}
          </div>

          {/* Tarifa por hora modernizada */}
          <div className="relative">
            <div className="absolute top-0 left-0 w-1 h-6 bg-gradient-to-b from-success to-successLight rounded-full"></div>
            <label className="block text-sm font-semibold text-textSecondary mb-3 ml-4 flex items-center space-x-2">
              <span>Tarifa por hora (USD)</span>
              <FaDollarSign className="text-success" />
            </label>
            {isEditing ? (
              <div className="relative">
                <input
                  type="number"
                  name="hourlyRate"
                  value={formData.hourlyRate}
                  onChange={handleInputChange}
                  min="0"
                  step="0.01"
                  className="w-full px-4 py-3 bg-gradient-to-r from-backgroundSecondary/60 to-surface/40 backdrop-blur-sm border border-borderLight/50 rounded-xl text-text placeholder-textMuted focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all duration-300"
                  placeholder="0.00"
                />
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary/5 to-accent/5 opacity-0 focus-within:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>
            ) : (
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-success/10 to-successLight/10 rounded-xl blur"></div>
                <div className="relative bg-gradient-to-r from-success/20 to-successLight/20 backdrop-blur-sm p-4 rounded-xl border border-success/30">
                  <p className="text-2xl font-bold bg-gradient-to-r from-success to-successLight bg-clip-text text-transparent">
                    ${profile?.hourlyRate || '0.00'} USD
                  </p>
                </div>
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileForm;
