
import React from 'react';

interface ReviewGuidelinesCheckboxProps {
  isChecked: boolean;
  onChange: (isChecked: boolean) => void;
}

const ReviewGuidelinesCheckbox: React.FC<ReviewGuidelinesCheckboxProps> = ({ isChecked, onChange }) => {
  return (
    <div className="flex items-center gap-3 p-4 rounded-lg bg-backgroundSecondary">
      <input
        type="checkbox"
        id="guidelines-checkbox"
        checked={isChecked}
        onChange={(e) => onChange(e.target.checked)}
        className="h-5 w-5 rounded border-border bg-surface text-primary focus:ring-primary focus:ring-offset-backgroundSecondary"
      />
      <label htmlFor="guidelines-checkbox" className="text-sm text-textSecondary">
        He leído y acepto las{' '}
        <a
          href="/community-guidelines" // This could be a modal trigger
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold text-primary hover:text-primaryHover underline transition-colors"
        >
          directrices de la comunidad
        </a>
        .
      </label>
    </div>
  );
};

export default ReviewGuidelinesCheckbox;
