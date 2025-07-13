
import React from 'react';

interface TermsConsentCheckboxProps {
  hasConsented: boolean;
  onConsentChange: (consented: boolean) => void;
}

const TermsConsentCheckbox: React.FC<TermsConsentCheckboxProps> = ({ hasConsented, onConsentChange }) => {
  return (
    <div className="flex items-center mt-4">
      <input
        id="terms-consent"
        type="checkbox"
        checked={hasConsented}
        onChange={(e) => onConsentChange(e.target.checked)}
        className="h-4 w-4 text-primary focus:ring-focus border-border rounded"
      />
      <label htmlFor="terms-consent" className="ml-2 block text-sm text-text">
        Acepto los{' '}
        <a href="/terminos-del-servicio" target="_blank" rel="noopener noreferrer" className="font-medium text-primary hover:text-primaryHover">
          Términos del Servicio
        </a>{' '}
        y la{' '}
        <a href="/politica-de-cancelacion" target="_blank" rel="noopener noreferrer" className="font-medium text-primary hover:text-primaryHover">
          Política de Cancelación
        </a>
        .
      </label>
    </div>
  );
};

export default TermsConsentCheckbox;
