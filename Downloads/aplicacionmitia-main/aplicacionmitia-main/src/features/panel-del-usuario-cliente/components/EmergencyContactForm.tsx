
import React, { useState, useEffect } from 'react';

export const EmergencyContactForm = ({ onSave, onCancel, contact }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  useEffect(() => {
    if (contact) {
      setName(contact.name);
      setPhone(contact.phone);
    }
  }, [contact]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && phone) {
      onSave({ ...contact, name, phone });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h3 className="text-xl font-semibold text-text">
        {contact ? 'Editar' : 'Añadir'} Contacto de Emergencia
      </h3>
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-textSecondary mb-2">
          Nombre
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full bg-surface border border-border rounded-md p-3 text-text focus:outline-none focus:ring-2 focus:ring-focus"
          required
        />
      </div>
      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-textSecondary mb-2">
          Teléfono
        </label>
        <input
          type="tel"
          id="phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full bg-surface border border-border rounded-md p-3 text-text focus:outline-none focus:ring-2 focus:ring-focus"
          required
        />
      </div>
      <div className="flex justify-end space-x-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 bg-muted hover:bg-border text-text rounded-md transition duration-300"
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-primary hover:bg-primaryHover text-white font-bold rounded-md transition duration-300"
        >
          Guardar
        </button>
      </div>
    </form>
  );
};
