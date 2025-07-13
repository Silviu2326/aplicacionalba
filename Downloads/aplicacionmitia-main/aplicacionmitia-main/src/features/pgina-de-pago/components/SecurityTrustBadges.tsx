import React from 'react';

interface Badge {
  src: string;
  alt: string;
}

interface SecurityTrustBadgesProps {
  badges: Badge[];
}

const SecurityTrustBadges: React.FC<SecurityTrustBadgesProps> = ({ badges }) => {
  return (
    <div className="text-center my-4">
      <h3 className="text-sm font-semibold text-textSecondary mb-2">Tu seguridad es nuestra prioridad</h3>
      <div className="flex justify-center items-center space-x-4">
        {badges.map((badge, index) => (
          <div key={index} className="flex items-center space-x-2">
            <img src={badge.src} alt={badge.alt} className="h-8" />
            <span className="text-xs text-textMuted">{badge.alt}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SecurityTrustBadges;
