import React from 'react';

interface ProfileDescriptionProps {
  aboutMe: string;
}

const ProfileDescription: React.FC<ProfileDescriptionProps> = ({ aboutMe }) => {
  if (!aboutMe) {
    return null;
  }

  return (
    <div className="bg-card p-6 rounded-lg shadow-lg mt-6">
      <h2 className="text-2xl font-bold text-text mb-4">Sobre mí</h2>
      <p className="text-textSecondary whitespace-pre-wrap">{aboutMe}</p>
    </div>
  );
};

export default ProfileDescription;