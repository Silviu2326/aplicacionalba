import React, { useState } from 'react';
import UserSearchInput from './UserSearchInput';
import UserTable from './UserTable';
import useBackoffice from '../hooks/useBackofficedeAdministracion';
import ConfirmationModal from './ConfirmationModal';


const UserManagement = ({ onImpersonate }) => {
  const {
    users,
    isLoading,
    error,
    searchUsers,
    toggleUserStatus,
  } = useBackoffice();
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const handleSearch = (term) => {
    setSearchTerm(term);
    searchUsers(term);
  };

  const handleToggleClick = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleConfirmToggle = () => {
    if (selectedUser) {
      toggleUserStatus(selectedUser.id);
      setSelectedUser(null);
    }
    setIsModalOpen(false);
  };

  const handleCancelToggle = () => {
    setSelectedUser(null);
    setIsModalOpen(false);
  };

  return (
    <div className="bg-surface p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-text">Gestión de Usuarios</h2>
      <UserSearchInput onSearch={handleSearch} />
      {isLoading && <p className="text-textMuted">Cargando...</p>}
      {error && <p className="text-error">{error}</p>}
      <UserTable users={users} onToggleStatus={handleToggleClick} onImpersonate={onImpersonate} />
      <ConfirmationModal
        isOpen={isModalOpen}
        onConfirm={handleConfirmToggle}
        onCancel={handleCancelToggle}
        message={`¿Estás seguro de que quieres cambiar el estado de la cuenta de ${selectedUser?.name}?`}
      />
    </div>
  );
};

export default UserManagement;