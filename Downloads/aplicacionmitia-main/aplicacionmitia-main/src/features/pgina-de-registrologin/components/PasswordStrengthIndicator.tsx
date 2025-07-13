
import React from 'react';

interface PasswordStrengthIndicatorProps {
  password?: string;
}

const PasswordStrengthIndicator: React.FC<PasswordStrengthIndicatorProps> = ({ password = '' }) => {
  const calculateStrength = (pass: string) => {
    let score = 0;
    if (!pass) return 0;

    // Award points for length
    if (pass.length >= 8) score++;
    if (pass.length >= 12) score++;

    // Award points for character types
    if (/[a-z]/.test(pass)) score++;
    if (/[A-Z]/.test(pass)) score++;
    if (/\d/.test(pass)) score++;
    if (/[^a-zA-Z0-9]/.test(pass)) score++;
    
    // More granular score
    let finalScore = 0;
    if (pass.length < 8) finalScore = 0;
    else if (score <= 2) finalScore = 1; // Weak
    else if (score <= 4) finalScore = 2; // Medium
    else finalScore = 3; // Strong

    return finalScore;
  };

  const strength = calculateStrength(password);
  const strengthText = ['Débil', 'Media', 'Fuerte'];
  const strengthColor = ['bg-error', 'bg-warning', 'bg-success'];

  const getStrengthLabel = () => {
    if (strength > 0) {
      return strengthText[strength - 1];
    }
    return 'Muy Débil';
  };

  const getStrengthColor = () => {
    if (strength > 0) {
      return strengthColor[strength - 1];
    }
    return 'bg-error';
  }

  if (!password) return null;

  return (
    <div className="mt-2">
      <div className="flex justify-between items-center mb-1">
        <span className="text-sm font-semibold text-textSecondary">Fortaleza de la contraseña:</span>
        <span className={`text-sm font-bold ${
            strength === 1 ? 'text-error' : strength === 2 ? 'text-warning' : 'text-success'
        }`}>
            {getStrengthLabel()}
        </span>
      </div>
      <div className="w-full bg-backgroundSecondary rounded-full h-2.5">
        <div
          className={`h-2.5 rounded-full transition-all duration-300 ${getStrengthColor()}`}
          style={{ width: `${(strength / 3) * 100}%` }}
        ></div>
      </div>
      <p className="text-xs text-textMuted mt-1">
        Usa 8+ caracteres con mayúsculas, minúsculas, números y símbolos para una contraseña fuerte.
      </p>
    </div>
  );
};

export default PasswordStrengthIndicator;
