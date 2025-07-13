import React from 'react';

interface ProfileHeaderProps {
  fullName: string;
  profilePictureUrl: string;
  specialties: string[];
  title: string;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  fullName,
  profilePictureUrl,
  specialties,
  title,
}) => {
  return (
    <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
      {/* Avatar con efectos mejorados */}
      <div className="relative group">
        <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent rounded-full blur-lg opacity-30 group-hover:opacity-50 transition-opacity duration-300 transform scale-110"></div>
        <div className="relative">
          <img
            src={profilePictureUrl}
            alt={fullName}
            className="w-36 h-36 md:w-40 md:h-40 rounded-full object-cover border-4 border-gradient-to-r from-primary to-accent shadow-2xl transform group-hover:scale-105 transition-transform duration-300"
          />
          {/* Badge de verificación */}
          <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-gradient-to-r from-success to-secondary rounded-full flex items-center justify-center shadow-lg border-4 border-card">
            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
      </div>
      
      {/* Información del profesional */}
      <div className="text-center md:text-left flex-1">
        <div className="mb-4">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-text via-primaryLight to-accent bg-clip-text text-transparent mb-2 leading-tight">
            {fullName}
          </h1>
          <p className="text-xl text-textSecondary font-medium">{title}</p>
        </div>
        
        {/* Especialidades con diseño mejorado */}
        <div className="flex flex-wrap justify-center md:justify-start gap-3">
          {specialties.map((specialty, index) => (
            <span
              key={index}
              className="relative group/badge overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent rounded-full blur opacity-30 group-hover/badge:opacity-50 transition-opacity"></div>
              <span className="relative bg-gradient-to-r from-primary/20 to-accent/20 backdrop-blur-sm text-text text-sm font-semibold px-4 py-2 rounded-full border border-primary/30 hover:border-accent/50 transition-all duration-300 hover:scale-105 hover:shadow-lg">
                {specialty}
              </span>
            </span>
          ))}
        </div>
        
        {/* Indicadores de estado */}
        <div className="flex items-center justify-center md:justify-start gap-4 mt-6">
          <div className="flex items-center gap-2 bg-success/20 backdrop-blur-sm px-3 py-1.5 rounded-full border border-success/30">
            <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
            <span className="text-success text-sm font-medium">Disponible ahora</span>
          </div>
          <div className="flex items-center gap-2 bg-info/20 backdrop-blur-sm px-3 py-1.5 rounded-full border border-info/30">
            <svg className="w-4 h-4 text-info" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="text-info text-sm font-medium">4.9 (127 reseñas)</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;