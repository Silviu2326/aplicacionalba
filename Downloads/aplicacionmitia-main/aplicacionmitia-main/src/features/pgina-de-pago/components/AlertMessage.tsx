import React from 'react';

interface AlertMessageProps {
  message: string;
  type: 'error' | 'warning' | 'success';
}

const AlertMessage: React.FC<AlertMessageProps> = ({ message, type }) => {
  const baseClasses = 'p-4 rounded-lg';
  const typeClasses = {
    error: 'bg-error text-white',
    warning: 'bg-warning text-black',
    success: 'bg-success text-white',
  };

  return (
    <div className={`${baseClasses} ${typeClasses[type]}`}>
      {message}
    </div>
  );
};

export default AlertMessage;