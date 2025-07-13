
import { useState } from 'react';

interface ReviewTextAreaProps {
  maxLength: number;
  minLength?: number;
  onTextChange: (text: string) => void;
  placeholder?: string;
}

export const ReviewTextArea = ({
  maxLength,
  minLength = 0,
  onTextChange,
  placeholder = 'Comparte los detalles de tu experiencia...',
}: ReviewTextAreaProps) => {
  const [text, setText] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = event.target.value;
    if (newText.length <= maxLength) {
      setText(newText);
      onTextChange(newText);
    }
  };

  const isLengthInvalid = text.length < minLength;

  return (
    <div className="w-full">
      <textarea
        value={text}
        onChange={handleChange}
        placeholder={placeholder}
        className="w-full p-4 border border-border rounded-lg focus:ring-focus focus:border-focus transition bg-background text-text"
        rows={6}
      />
      <div className="flex justify-between items-center mt-2 text-sm">
        <p className={`text-textMuted ${isLengthInvalid ? 'text-error' : ''}`}>
          {isLengthInvalid
            ? `Debe tener al menos ${minLength} caracteres.`
            : ''}
        </p>
        <p
          className={`font-medium ${
            text.length > maxLength ? 'text-error' : 'text-textSecondary'
          }`}
        >
          {text.length}/{maxLength}
        </p>
      </div>
    </div>
  );
};
