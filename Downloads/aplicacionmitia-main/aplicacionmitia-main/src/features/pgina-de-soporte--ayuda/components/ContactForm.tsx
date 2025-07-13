import React, { useState } from 'react';
import { Button } from '../../../components/Button';
import { usePaginadeSoporteAyuda } from '../hooks/usePaginadeSoporteAyuda';

interface ContactFormProps {
  prefillData?: {
    name: string;
    email: string;
  };
}

export const ContactForm: React.FC<ContactFormProps> = ({ prefillData }) => {
  const [formData, setFormData] = useState({
    name: prefillData?.name || '',
    email: prefillData?.email || '',
    subject: '',
    message: '',
    category: 'general',
  });
  const [errors, setErrors] = useState<Partial<typeof formData>>({});

  const { submitForm, isSending, isSuccess, error } = usePaginadeSoporteAyuda();

  const validate = () => {
    const newErrors: Partial<typeof formData> = {};
    if (!formData.name) newErrors.name = 'El nombre es obligatorio.';
    if (!formData.email) {
      newErrors.email = 'El email es obligatorio.';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'El formato del email no es válido.';
    }
    if (!formData.subject) newErrors.subject = 'El asunto es obligatorio.';
    if (!formData.message) newErrors.message = 'El mensaje es obligatorio.';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      await submitForm(formData);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  if (isSuccess) {
    return (
      <div className="p-4 text-center bg-successLight border border-success text-successDark rounded">
        <p className="font-bold">¡Mensaje enviado con éxito!</p>
        <p>Gracias por contactarnos. Te responderemos pronto.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 p-8 bg-backgroundSecondary shadow-md rounded-lg">
      <h2 className="text-2xl font-bold text-text">Formulario de Contacto</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="form-group">
          <label htmlFor="name" className="block text-sm font-medium text-textSecondary">Nombre</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={`mt-1 block w-full px-3 py-2 bg-backgroundSecondary border ${errors.name ? 'border-error' : 'border-border'} rounded-md shadow-sm focus:outline-none focus:ring-focus focus:border-focus sm:text-sm`}
          />
          {errors.name && <p className="mt-2 text-sm text-error">{errors.name}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="email" className="block text-sm font-medium text-textSecondary">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`mt-1 block w-full px-3 py-2 bg-backgroundSecondary border ${errors.email ? 'border-error' : 'border-border'} rounded-md shadow-sm focus:outline-none focus:ring-focus focus:border-focus sm:text-sm`}
          />
          {errors.email && <p className="mt-2 text-sm text-error">{errors.email}</p>}
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="category" className="block text-sm font-medium text-textSecondary">Categoría</label>
        <select
          id="category"
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-border focus:outline-none focus:ring-focus focus:border-focus sm:text-sm rounded-md"
        >
          <option value="general">Consulta General</option>
          <option value="technical">Problema Técnico</option>
          <option value="billing">Facturación</option>
          <option value="suggestion">Sugerencia</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="subject" className="block text-sm font-medium text-textSecondary">Asunto</label>
        <input
          type="text"
          id="subject"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          className={`mt-1 block w-full px-3 py-2 bg-backgroundSecondary border ${errors.subject ? 'border-error' : 'border-border'} rounded-md shadow-sm focus:outline-none focus:ring-focus focus:border-focus sm:text-sm`}
        />
        {errors.subject && <p className="mt-2 text-sm text-error">{errors.subject}</p>}
      </div>

      <div className="form-group">
        <label htmlFor="message" className="block text-sm font-medium text-textSecondary">Mensaje</label>
        <textarea
          id="message"
          name="message"
          rows={4}
          value={formData.message}
          onChange={handleChange}
          className={`mt-1 block w-full px-3 py-2 bg-backgroundSecondary border ${errors.message ? 'border-error' : 'border-border'} rounded-md shadow-sm focus:outline-none focus:ring-focus focus:border-focus sm:text-sm`}
        ></textarea>
        {errors.message && <p className="mt-2 text-sm text-error">{errors.message}</p>}
      </div>

      {error && (
        <div className="p-4 bg-errorLight border border-error text-errorDark rounded">
          <p className="font-bold">Error al enviar</p>
          <p>{error}</p>
        </div>
      )}

      <div className="text-right">
        <Button type="submit" disabled={isSending}>
          {isSending ? 'Enviando...' : 'Enviar Consulta'}
        </Button>
      </div>
    </form>
  );
};
