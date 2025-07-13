import React, { useState } from 'react';

const tips = [
  '¿Qué fue lo más útil de la sesión?',
  '¿Cómo describirías el estilo de comunicación del profesional?',
  '¿Sentiste que el profesional entendió tus necesidades?',
  '¿Recomendarías a este profesional a un amigo? ¿Por qué?',
  '¿Hubo algo específico que te ayudara a sentirte cómodo?',
];

const ReviewWritingTips: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentTip, setCurrentTip] = useState(tips[0]);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      // Rotate tip when opening
      const randomIndex = Math.floor(Math.random() * tips.length);
      setCurrentTip(tips[randomIndex]);
    }
  };

  return (
    <div className="my-4 p-4 bg-backgroundSecondary rounded-lg">
      <button
        onClick={toggleOpen}
        className="w-full text-left font-semibold text-text flex justify-between items-center"
      >
        <span>¿No sabes qué escribir?</span>
        <span>{isOpen ? '▲' : '▼'}</span>
      </button>
      {isOpen && (
        <div className="mt-3 text-sm text-textSecondary">
          <p>Aquí tienes algunas ideas para empezar:</p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>{currentTip}</li>
            <li>¿Qué fue lo más útil?</li>
            <li>¿Cómo fue la comunicación?</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default ReviewWritingTips;
