import React from 'react';
import AppRouter from './app/router';
import ErrorBoundary from './components/ErrorBoundary';
import './styles/tailwind.css';

function App() {
  return (
    <ErrorBoundary>
      <AppRouter />
    </ErrorBoundary>
  );
}

export default App;