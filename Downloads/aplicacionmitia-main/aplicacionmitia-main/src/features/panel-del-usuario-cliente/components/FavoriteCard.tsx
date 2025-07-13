import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "../../../components/Button";

interface FavoriteCardProps {
  id: string;
  name: string;
  photo: string;
  specialty: string;
  isOnline: boolean;
  onDelete: (id: string) => void;
}

const FavoriteCard: React.FC<FavoriteCardProps> = ({ id, name, photo, specialty, isOnline, onDelete }) => {
  const handleDelete = () => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este profesional de tus favoritos?')) {
      onDelete(id);
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-lg flex items-center justify-between transition-all duration-300 hover:shadow-xl hover:border-borderLight">
      <div className="flex items-center">
        <img src={photo} alt={name} className="w-16 h-16 rounded-full object-cover border-2 border-borderLight" />
        <div className="ml-4">
          <h3 className="text-lg font-semibold text-text">{name}</h3>
          <p className="text-textSecondary">{specialty}</p>
          <div className="flex items-center mt-1">
            <span className={`h-3 w-3 rounded-full ${isOnline ? 'bg-success' : 'bg-muted'}`}></span>
            <p className="ml-2 text-sm text-textMuted">{isOnline ? 'Online' : 'Offline'}</p>
          </div>
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <Link to={`/professional/${id}`}>
          <Button variant="secondary">Ver Perfil</Button>
        </Link>
        <Link to={`/booking/${id}`}>
          <Button variant="primary">Reservar Ahora</Button>
        </Link>
        <Button onClick={handleDelete} variant="danger">
          Eliminar de Favoritos
        </Button>
      </div>
    </div>
  );
};

export default FavoriteCard;
