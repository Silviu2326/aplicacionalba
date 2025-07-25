import React from 'react';
import ErrorBoundary from '../components/ErrorBoundary';

const AuthLayout = ({ children }) => {
  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
        {children}
      </div>
    </ErrorBoundary>
  );
};

export default AuthLayout;