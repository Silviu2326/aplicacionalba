import React from 'react';
import { Button } from '../../../components/Button';

interface ImpersonationModeBannerProps {
  impersonatedUser: string;
  onEndImpersonation: () => void;
}

const ImpersonationModeBanner: React.FC<ImpersonationModeBannerProps> = ({ impersonatedUser, onEndImpersonation }) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-warning text-textInverse p-4 flex justify-between items-center shadow-lg z-50">
      <p className="text-sm font-medium">
        Estás suplantando a <span className="font-bold">{impersonatedUser}</span>. Todas las acciones se realizarán en su nombre.
      </p>
      <Button onClick={onEndImpersonation} variant="danger" className="ml-4">
        Finalizar Suplantación
      </Button>
    </div>
  );
};

export default ImpersonationModeBanner;
