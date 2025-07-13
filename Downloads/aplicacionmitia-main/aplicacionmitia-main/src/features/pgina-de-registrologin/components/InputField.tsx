import React from 'react';

interface InputFieldProps {
  type: string;
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  placeholder?: string;
}

const InputField: React.FC<InputFieldProps> = ({
  type,
  label,
  name,
  value,
  onChange,
  error,
  placeholder,
}) => {
  return (
    <div className="mb-4">
      <label htmlFor={name} className="block text-sm font-medium text-textSecondary">
        {label}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`mt-1 block w-full px-3 py-2 border ${
          error ? 'border-error' : 'border-border'
        } rounded-md shadow-sm bg-surface placeholder-textMuted text-text focus:outline-none focus:ring-focus focus:border-focus sm:text-sm`}
      />
      {error && <p className="mt-2 text-sm text-error">{error}</p>}
    </div>
  );
};

export default InputField;
