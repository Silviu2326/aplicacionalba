import React from 'react';

interface SessionSummaryModalProps {
  isOpen: boolean;
  onClose: () => void;
  summary: {
    date: string;
    therapistName: string;
    content: string;
  } | null;
}

const SessionSummaryModal: React.FC<SessionSummaryModalProps> = ({ isOpen, onClose, summary }) => {
  if (!isOpen || !summary) {
    return null;
  }

  const handlePrint = () => {
    const printableContent = `
      <html>
        <head>
          <title>Resumen de Sesión</title>
          <style>
            body { font-family: sans-serif; }
            h1 { color: #1D4ED8; }
            h2 { color: #10B981; }
          </style>
        </head>
        <body>
          <h1>Resumen de Sesión</h1>
          <h2>Fecha: ${new Date(summary.date).toLocaleDateString()}</h2>
          <h2>Terapeuta: ${summary.therapistName}</h2>
          <hr />
          <div>${summary.content}</div>
        </body>
      </html>
    `;
    const printWindow = window.open('', '_blank');
    printWindow?.document.write(printableContent);
    printWindow?.document.close();
    printWindow?.print();
    printWindow?.close();
  };


  return (
    <div className="fixed inset-0 bg-overlay flex items-center justify-center z-50">
      <div className="bg-card p-6 rounded-lg shadow-lg max-w-2xl w-full m-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-text">Resumen de la Sesión</h2>
          <button onClick={onClose} className="text-textMuted hover:text-text">
            &times;
          </button>
        </div>
        <div className="mb-4">
          <p className="text-textSecondary">
            <span className="font-bold">Fecha:</span> {new Date(summary.date).toLocaleDateString()}
          </p>
          <p className="text-textSecondary">
            <span className="font-bold">Terapeuta:</span> {summary.therapistName}
          </p>
        </div>
        <div className="bg-surface p-4 rounded-md max-h-80 overflow-y-auto text-textSecondary">
          <p>{summary.content}</p>
        </div>
        <div className="flex justify-end mt-6">
          <button
            onClick={handlePrint}
            className="bg-primary hover:bg-primaryHover text-white font-bold py-2 px-4 rounded mr-2 transition-colors duration-300"
          >
            Imprimir / Guardar PDF
          </button>
          <button
            onClick={onClose}
            className="bg-muted hover:bg-border text-white font-bold py-2 px-4 rounded transition-colors duration-300"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};

export default SessionSummaryModal;
