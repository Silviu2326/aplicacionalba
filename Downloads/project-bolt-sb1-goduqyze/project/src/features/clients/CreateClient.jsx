import React, { useState } from 'react';
import { X, User, Mail, Phone, Calendar, Target, Save } from 'lucide-react';

const CreateClient = ({ isOpen, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    birthDate: '',
    goal: '',
    notes: '',
    emergencyContact: '',
    emergencyPhone: '',
    medicalConditions: '',
    experience: 'beginner'
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Limpiar error cuando el usuario empiece a escribir
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'El nombre es obligatorio';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'El email es obligatorio';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'El email no es válido';
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'El teléfono es obligatorio';
    }
    
    if (!formData.goal.trim()) {
      newErrors.goal = 'El objetivo es obligatorio';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      const newClient = {
        id: Date.now(), // En una app real, esto vendría del backend
        ...formData,
        status: 'active',
        joinDate: new Date().toISOString().split('T')[0],
        lastSession: null,
        progress: '0kg',
        avatar: formData.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
      };
      onSave(newClient);
      onClose();
      // Resetear formulario
      setFormData({
        name: '',
        email: '',
        phone: '',
        birthDate: '',
        goal: '',
        notes: '',
        emergencyContact: '',
        emergencyPhone: '',
        medicalConditions: '',
        experience: 'beginner'
      });
      setErrors({});
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-glass-pop">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/20">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-brand/10 backdrop-blur-sm border border-white/20 rounded-xl">
              <User size={24} className="text-brand" />
            </div>
            <div>
              <h2 className="text-2xl font-display font-bold text-neutral-900">Nuevo Cliente</h2>
              <p className="text-neutral-600">Completa la información del cliente</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/20 rounded-xl transition-all duration-300"
          >
            <X size={20} className="text-neutral-600" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Información Personal */}
          <div className="space-y-4">
            <h3 className="text-lg font-display font-semibold text-neutral-900 flex items-center space-x-2">
              <User size={18} className="text-brand" />
              <span>Información Personal</span>
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Nombre Completo *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full glass border-0 px-4 py-3 text-neutral-800 placeholder-neutral-500 focus:ring-2 focus:ring-brand/50 focus:outline-none transition-all duration-300 ${
                    errors.name ? 'ring-2 ring-red-500' : ''
                  }`}
                  placeholder="Ej: María López García"
                />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Fecha de Nacimiento
                </label>
                <input
                  type="date"
                  name="birthDate"
                  value={formData.birthDate}
                  onChange={handleChange}
                  className="w-full glass border-0 px-4 py-3 text-neutral-800 focus:ring-2 focus:ring-brand/50 focus:outline-none transition-all duration-300"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Email *
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400" size={18} />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full glass border-0 pl-10 pr-4 py-3 text-neutral-800 placeholder-neutral-500 focus:ring-2 focus:ring-brand/50 focus:outline-none transition-all duration-300 ${
                      errors.email ? 'ring-2 ring-red-500' : ''
                    }`}
                    placeholder="maria@email.com"
                  />
                </div>
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Teléfono *
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400" size={18} />
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className={`w-full glass border-0 pl-10 pr-4 py-3 text-neutral-800 placeholder-neutral-500 focus:ring-2 focus:ring-brand/50 focus:outline-none transition-all duration-300 ${
                      errors.phone ? 'ring-2 ring-red-500' : ''
                    }`}
                    placeholder="+34 600 123 456"
                  />
                </div>
                {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
              </div>
            </div>
          </div>

          {/* Información de Entrenamiento */}
          <div className="space-y-4">
            <h3 className="text-lg font-display font-semibold text-neutral-900 flex items-center space-x-2">
              <Target size={18} className="text-brand" />
              <span>Información de Entrenamiento</span>
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Objetivo Principal *
                </label>
                <input
                  type="text"
                  name="goal"
                  value={formData.goal}
                  onChange={handleChange}
                  className={`w-full glass border-0 px-4 py-3 text-neutral-800 placeholder-neutral-500 focus:ring-2 focus:ring-brand/50 focus:outline-none transition-all duration-300 ${
                    errors.goal ? 'ring-2 ring-red-500' : ''
                  }`}
                  placeholder="Ej: Perder peso, ganar músculo, mejorar resistencia"
                />
                {errors.goal && <p className="text-red-500 text-sm mt-1">{errors.goal}</p>}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Nivel de Experiencia
                </label>
                <select
                  name="experience"
                  value={formData.experience}
                  onChange={handleChange}
                  className="w-full glass border-0 px-4 py-3 text-neutral-800 focus:ring-2 focus:ring-brand/50 focus:outline-none transition-all duration-300"
                >
                  <option value="beginner">Principiante</option>
                  <option value="intermediate">Intermedio</option>
                  <option value="advanced">Avanzado</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Condiciones Médicas
              </label>
              <textarea
                name="medicalConditions"
                value={formData.medicalConditions}
                onChange={handleChange}
                rows={3}
                className="w-full glass border-0 px-4 py-3 text-neutral-800 placeholder-neutral-500 focus:ring-2 focus:ring-brand/50 focus:outline-none transition-all duration-300 resize-none"
                placeholder="Lesiones, alergias, medicamentos, etc."
              />
            </div>
          </div>

          {/* Contacto de Emergencia */}
          <div className="space-y-4">
            <h3 className="text-lg font-display font-semibold text-neutral-900 flex items-center space-x-2">
              <Phone size={18} className="text-brand" />
              <span>Contacto de Emergencia</span>
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Nombre del Contacto
                </label>
                <input
                  type="text"
                  name="emergencyContact"
                  value={formData.emergencyContact}
                  onChange={handleChange}
                  className="w-full glass border-0 px-4 py-3 text-neutral-800 placeholder-neutral-500 focus:ring-2 focus:ring-brand/50 focus:outline-none transition-all duration-300"
                  placeholder="Nombre del familiar o amigo"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Teléfono de Emergencia
                </label>
                <input
                  type="tel"
                  name="emergencyPhone"
                  value={formData.emergencyPhone}
                  onChange={handleChange}
                  className="w-full glass border-0 px-4 py-3 text-neutral-800 placeholder-neutral-500 focus:ring-2 focus:ring-brand/50 focus:outline-none transition-all duration-300"
                  placeholder="+34 600 000 000"
                />
              </div>
            </div>
          </div>

          {/* Notas Adicionales */}
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              Notas Adicionales
            </label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              rows={4}
              className="w-full glass border-0 px-4 py-3 text-neutral-800 placeholder-neutral-500 focus:ring-2 focus:ring-brand/50 focus:outline-none transition-all duration-300 resize-none"
              placeholder="Información adicional sobre el cliente, preferencias, horarios, etc."
            />
          </div>

          {/* Botones */}
          <div className="flex space-x-4 pt-6 border-t border-white/20">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 glass border-0 text-neutral-700 hover:text-brand transition-all duration-300 py-3 font-medium"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex-1 bg-gradient-to-r from-brand to-brand-light text-white hover:from-brand-light hover:to-brand transition-all duration-300 py-3 shadow-frosted font-semibold flex items-center justify-center space-x-2"
            >
              <Save size={18} />
              <span>Guardar Cliente</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateClient;