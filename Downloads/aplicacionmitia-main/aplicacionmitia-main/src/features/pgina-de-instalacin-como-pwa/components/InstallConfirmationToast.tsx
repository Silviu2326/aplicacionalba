import { useEffect } from 'react';

interface InstallConfirmationToastProps {
  onClose: () => void;
}

const InstallConfirmationToast = ({ onClose }: InstallConfirmationToastProps) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 6000); // 6 seconds

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed bottom-5 right-5 bg-success text-white p-4 rounded-lg shadow-lg animate-fade-in-up">
      <p className="font-bold">¡Éxito!</p>
      <p>TheraFlow se está instalando en tu dispositivo.</p>
      <p className="text-sm mt-2 text-successLight">Búscanos en tu lista de aplicaciones.</p>
    </div>
  );
};

export default InstallConfirmationToast;
