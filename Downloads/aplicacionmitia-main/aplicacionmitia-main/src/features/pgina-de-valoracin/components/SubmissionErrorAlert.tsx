
import React from 'react';

interface SubmissionErrorAlertProps {
  message: string;
  onClose: () => void;
}

const SubmissionErrorAlert: React.FC<SubmissionErrorAlertProps> = ({ message, onClose }) => {
  if (!message) {
    return null;
  }

  return (
    <div className="bg-errorLight border border-error text-error px-4 py-3 rounded relative" role="alert">
      <strong className="font-bold">Error: </strong>
      <span className="block sm:inline">{message}</span>
      <button
        onClick={onClose}
        className="absolute top-0 bottom-0 right-0 px-4 py-3"
        aria-label="Cerrar"
      >
        <svg className="fill-current h-6 w-6 text-error" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
          <title>Cerrar</title>
          <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
        </svg>
      </button>
    </div>
  );
};

export default SubmissionErrorAlert;
