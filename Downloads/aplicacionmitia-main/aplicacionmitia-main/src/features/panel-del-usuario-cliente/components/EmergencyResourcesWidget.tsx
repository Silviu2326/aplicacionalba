
import React, { useState } from 'react';
import { EmergencyContactForm } from './EmergencyContactForm';
import { usePaneldelUsuarioCliente } from '../hooks/usePaneldelUsuarioCliente';
import { EmergencyContact } from '../api';

const crisisLines = [
  { name: 'Línea de Prevención del Suicidio', phone: '988' },
  { name: 'Línea de Ayuda para Crisis de Salud Mental', phone: '800-950-NAMI' },
];

export const EmergencyResourcesWidget = () => {
  const { 
    emergencyContacts, 
    addEmergencyContact, 
    updateEmergencyContact, 
    deleteEmergencyContact,
    isLoading,
  } = usePaneldelUsuarioCliente();

  const [isFormVisible, setIsFormVisible] = useState(false);
  const [editingContact, setEditingContact] = useState<EmergencyContact | null>(null);

  const handleAdd = (contact: Omit<EmergencyContact, 'id'>) => {
    addEmergencyContact(contact);
    setIsFormVisible(false);
  };

  const handleUpdate = (updatedContact: EmergencyContact) => {
    if (updatedContact.id) {
      updateEmergencyContact(updatedContact.id, updatedContact);
    }
    setEditingContact(null);
    setIsFormVisible(false);
  };

  const handleDelete = (id: string) => {
    deleteEmergencyContact(id);
  };

  const handleEdit = (contact: EmergencyContact) => {
    setEditingContact(contact);
    setIsFormVisible(true);
  };

  const handleAddNew = () => {
    setEditingContact(null);
    setIsFormVisible(true);
  };

  const handleSave = (contact: EmergencyContact | Omit<EmergencyContact, 'id'>) => {
    if ('id' in contact && contact.id) {
      handleUpdate(contact as EmergencyContact);
    } else {
      handleAdd(contact as Omit<EmergencyContact, 'id'>);
    }
  };

  return (
    <div className="bg-card border border-errorDark rounded-lg p-6 shadow-lg">
      <h2 className="text-2xl font-bold text-errorLight mb-4">Ayuda Urgente</h2>
      
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-text mb-2">Líneas de Ayuda Nacional</h3>
        <ul className="space-y-2">
          {crisisLines.map((line, index) => (
            <li key={index} className="flex justify-between items-center bg-surface p-3 rounded-md">
              <span className="text-textSecondary">{line.name}</span>
              <a href={`tel:${line.phone}`} className="text-primary hover:text-primaryHover font-semibold">
                {line.phone}
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-text mb-2">Mis Contactos de Emergencia</h3>
        {isLoading ? (
          <p className="text-textMuted">Cargando contactos...</p>
        ) : emergencyContacts.length > 0 ? (
          <ul className="space-y-3">
            {emergencyContacts.map((contact) => (
              <li key={contact.id} className="flex justify-between items-center bg-surface p-3 rounded-md">
                <div>
                  <p className="font-semibold text-textSecondary">{contact.name}</p>
                  <p className="text-textMuted">{contact.phone}</p>
                </div>
                <div className="flex items-center space-x-3">
                  <button onClick={() => handleEdit(contact)} className="text-accent hover:text-accentHover">
                    Editar
                  </button>
                  <button onClick={() => handleDelete(contact.id)} className="text-error hover:text-errorDark">
                    Eliminar
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-textMuted">No has añadido ningún contacto de emergencia.</p>
        )}
        <button 
          onClick={handleAddNew}
          className="mt-4 w-full bg-primary hover:bg-primaryHover text-white font-bold py-2 px-4 rounded-md transition duration-300"
        >
          Añadir Contacto
        </button>
      </div>

      {isFormVisible && (
        <div className="fixed inset-0 bg-overlay flex items-center justify-center z-50">
          <div className="bg-backgroundSecondary rounded-lg p-8 max-w-md w-full">
            <EmergencyContactForm
              onSave={handleSave}
              onCancel={() => setIsFormVisible(false)}
              contact={editingContact}
            />
          </div>
        </div>
      )}

      <div className="mt-6 text-center text-sm text-textMuted">
        <p className="font-bold">Descargo de Responsabilidad:</p>
        <p>Esta es una herramienta de acceso rápido. En una emergencia real, por favor llama a los servicios de emergencia locales (ej. 911).</p>
      </div>
    </div>
  );
};
