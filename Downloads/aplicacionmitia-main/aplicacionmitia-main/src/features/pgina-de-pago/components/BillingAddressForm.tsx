import React, { useState } from 'react';
import { Button } from '../../../components/Button';

interface BillingAddress {
  name: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
}

interface BillingAddressFormProps {
  onSubmit: (address: BillingAddress) => void;
}

export const BillingAddressForm: React.FC<BillingAddressFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<BillingAddress>({
    name: '',
    address: '',
    city: '',
    postalCode: '',
    country: 'ES', // Default to Spain
  });
  const [errors, setErrors] = useState<Partial<BillingAddress>>({});
  const [showForm, setShowForm] = useState(false);

  const validate = (): boolean => {
    const newErrors: Partial<BillingAddress> = {};
    if (!formData.name) newErrors.name = 'El nombre es obligatorio.';
    if (!formData.address) newErrors.address = 'La dirección es obligatoria.';
    if (!formData.city) newErrors.city = 'La ciudad es obligatoria.';
    if (!formData.postalCode) newErrors.postalCode = 'El código postal es obligatorio.';
    if (!formData.country) newErrors.country = 'El país es obligatorio.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(formData);
      setShowForm(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  if (!showForm) {
    return (
      <div className="my-6">
        <button 
          onClick={() => setShowForm(true)}
          className="w-full flex items-center justify-center px-6 py-3 border border-dashed border-border rounded-lg text-textSecondary hover:text-text hover:border-primary transition-colors duration-300 bg-surface hover:bg-primary/5"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
          Añadir dirección de facturación
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 p-8 bg-surface rounded-2xl shadow-lg border border-borderLight">
      <h3 className="text-xl font-bold text-text">Dirección de Facturación</h3>
      
      <div className="grid grid-cols-1 gap-6">
        {/* Name Input */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-textMuted mb-1">Nombre completo</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Ej: Ana García"
            className={`w-full px-4 py-3 bg-backgroundSecondary border rounded-lg focus:ring-2 transition-colors duration-300 ${errors.name ? 'border-error focus:ring-error/50' : 'border-border focus:border-primary focus:ring-primary/50'}`}
          />
          {errors.name && <p className="text-xs text-error mt-2">{errors.name}</p>}
        </div>

        {/* Address Input */}
        <div>
          <label htmlFor="address" className="block text-sm font-medium text-textMuted mb-1">Dirección</label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Ej: Calle Falsa 123"
            className={`w-full px-4 py-3 bg-backgroundSecondary border rounded-lg focus:ring-2 transition-colors duration-300 ${errors.address ? 'border-error focus:ring-error/50' : 'border-border focus:border-primary focus:ring-primary/50'}`}
          />
          {errors.address && <p className="text-xs text-error mt-2">{errors.address}</p>}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* City Input */}
          <div>
            <label htmlFor="city" className="block text-sm font-medium text-textMuted mb-1">Ciudad</label>
            <input
              type="text"
              id="city"
              name="city"
              value={formData.city}
              onChange={handleChange}
              placeholder="Ej: Madrid"
              className={`w-full px-4 py-3 bg-backgroundSecondary border rounded-lg focus:ring-2 transition-colors duration-300 ${errors.city ? 'border-error focus:ring-error/50' : 'border-border focus:border-primary focus:ring-primary/50'}`}
            />
            {errors.city && <p className="text-xs text-error mt-2">{errors.city}</p>}
          </div>

          {/* Postal Code Input */}
          <div>
            <label htmlFor="postalCode" className="block text-sm font-medium text-textMuted mb-1">Código Postal</label>
            <input
              type="text"
              id="postalCode"
              name="postalCode"
              value={formData.postalCode}
              onChange={handleChange}
              placeholder="Ej: 28001"
              className={`w-full px-4 py-3 bg-backgroundSecondary border rounded-lg focus:ring-2 transition-colors duration-300 ${errors.postalCode ? 'border-error focus:ring-error/50' : 'border-border focus:border-primary focus:ring-primary/50'}`}
            />
            {errors.postalCode && <p className="text-xs text-error mt-2">{errors.postalCode}</p>}
          </div>
        </div>

        {/* Country Select */}
        <div>
          <label htmlFor="country" className="block text-sm font-medium text-textMuted mb-1">País</label>
          <select
            id="country"
            name="country"
            value={formData.country}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-backgroundSecondary border border-border rounded-lg focus:ring-2 focus:border-primary focus:ring-primary/50 transition-colors duration-300"
          >
            <option value="ES">España</option>
            <option value="MX">México</option>
            <option value="AR">Argentina</option>
            <option value="CO">Colombia</option>
            <option value="US">United States</option>
          </select>
        </div>
      </div>

      <div className="flex justify-end items-center gap-4 pt-4">
        <Button type="button" onClick={() => setShowForm(false)} variant="secondary">
          Cancelar
        </Button>
        <Button type="submit" variant="primary">
          Guardar Dirección
        </Button>
      </div>
    </form>
  );
};
