
import React from 'react';

interface Credential {
  name: string;
  verified: boolean;
  icon: string;
  verificationDate?: string;
}

interface CredentialBadgeProps {
  credential: Credential;
}

const CredentialBadge: React.FC<CredentialBadgeProps> = ({ credential }) => {
  if (!credential.verified) {
    return null;
  }

  const tooltipText = `Verificado por TheraFlow el ${credential.verificationDate || new Date().toLocaleDateString()}`;

  return (
    <div
      className="group relative inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium bg-success text-text shadow-sm"
      title={tooltipText}
    >
      <span className="mr-2">{credential.icon}</span>
      <span>{credential.name}</span>
      <div className="absolute bottom-full mb-2 hidden group-hover:block w-max">
        <div className="bg-gray-800 text-white text-xs rounded py-1 px-2">
          {tooltipText}
        </div>
        <div className="w-3 h-3 -mt-1.5 rotate-45 bg-gray-800 mx-auto"></div>
      </div>
    </div>
  );
};

export default CredentialBadge;
