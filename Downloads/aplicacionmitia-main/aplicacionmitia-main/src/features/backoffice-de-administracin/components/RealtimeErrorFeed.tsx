import React from 'react';

const RealtimeErrorFeed = ({ errors }) => {
  return (
    <div className="bg-surface p-6 rounded-lg shadow border border-border">
      <h2 className="text-xl font-semibold mb-4 text-textSecondary">Feed de Errores en Tiempo Real</h2>
      <div className="space-y-4">
        {errors.map(error => (
          <div key={error.id} className="p-3 bg-errorLight border-l-4 border-error">
            <p className="font-semibold text-errorDark">{error.message}</p>
            <p className="text-sm text-textMuted">{error.time}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RealtimeErrorFeed;
