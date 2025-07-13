import React, { useState } from 'react';
import { Button } from '../../../components/Button';

const AddVideoLinkModal = ({ isOpen, onClose, onSave, reservationId }) => {
  const [url, setUrl] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) {
    return null;
  }

  const handleSave = () => {
    if (isValidUrl(url)) {
      onSave(reservationId, url);
      onClose();
    } else {
      setError('Por favor, introduce una URL válida.');
    }
  };

  const isValidUrl = (string) => {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  };

  const handleUrlChange = (e) => {
    setUrl(e.target.value);
    if (error) {
      setError('');
    }
  }

  return (
    <div className="fixed inset-0 bg-overlay bg-opacity-75 flex justify-center items-center z-50 backdrop-blur-sm">
      <div className="bg-surface p-6 rounded-lg shadow-xl border border-border w-full max-w-md mx-4 transform transition-all duration-300 scale-100">
        <div className="mb-6">
          <h2 className="text-text text-xl font-semibold mb-2">Añadir Enlace de Videollamada</h2>
          <p className="text-textMuted text-sm">Proporciona el enlace para la sesión virtual</p>
        </div>
        
        <div className="mb-6">
          <label htmlFor="video-link" className="block text-textSecondary text-sm font-medium mb-2">
            Enlace de la sesión
          </label>
          <input
            type="url"
            id="video-link"
            value={url}
            onChange={handleUrlChange}
            className="w-full px-4 py-3 bg-backgroundSecondary border border-border rounded-md text-text focus:outline-none focus:ring-2 focus:ring-focus focus:border-focus transition-colors duration-200"
            placeholder="https://meet.google.com/xyz-abc-def"
          />
          {error && (
            <div className="mt-2 p-2 bg-errorLight border border-error rounded-md">
              <p className="text-error text-sm flex items-center">
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {error}
              </p>
            </div>
          )}
          <p className="text-xs text-textMuted mt-2">
            Acepta enlaces de Google Meet, Zoom, Teams, etc.
          </p>
        </div>
        
        <div className="flex justify-end gap-3">
          <Button onClick={onClose} variant="secondary" className="px-4 py-2">
            Cancelar
          </Button>
          <Button onClick={handleSave} variant="primary" className="px-4 py-2">
            Guardar Enlace
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddVideoLinkModal;