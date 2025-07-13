import React from 'react';
import { GoogleLogin, CredentialResponse } from '@react-oauth/google';

interface SocialLoginButtonsProps {
  onGoogleSuccess: (response: CredentialResponse) => void;
  onGoogleFailure: () => void;
}

const SocialLoginButtons: React.FC<SocialLoginButtonsProps> = ({ onGoogleSuccess, onGoogleFailure }) => {
  return (
    <div className="flex flex-col items-center justify-center w-full">
        <p className="text-textMuted mb-4">O continúa con</p>
        <div className="w-full max-w-xs">
            <GoogleLogin
                onSuccess={onGoogleSuccess}
                onError={onGoogleFailure}
                theme="filled_black"
                text="continue_with"
                shape="rectangular"
                logo_alignment="center"
                width="320px"
            />
        </div>
    </div>
  );
};

export default SocialLoginButtons;
