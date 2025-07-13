import React from 'react';

interface ViewSummaryButtonProps {
  onClick: () => void;
}

const ViewSummaryButton: React.FC<ViewSummaryButtonProps> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="bg-secondary hover:bg-secondaryHover text-white font-bold py-2 px-4 rounded transition-colors duration-300"
    >
      Ver Resumen
    </button>
  );
};

export default ViewSummaryButton;
