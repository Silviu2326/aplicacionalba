
import React from 'react';

interface Option {
  value: string;
  label: string;
  icon?: string;
}

interface QuizStepProps {
  question: string;
  options: Option[];
  onSelect: (value: string) => void;
}

const QuizStep: React.FC<QuizStepProps> = ({ question, options, onSelect }) => {
  return (
    <div className="text-center">
      <h3 className="text-2xl font-bold mb-6 text-text">{question}</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {options.map((option) => (
          <button
            key={option.value}
            onClick={() => onSelect(option.value)}
            className="bg-surface p-6 rounded-lg shadow-md hover:shadow-lg hover:bg-card transition-all duration-300 flex flex-col items-center"
          >
            {option.icon && <span className="text-4xl mb-2">{option.icon}</span>}
            <span className="text-lg text-text">{option.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuizStep;
