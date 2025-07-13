import React from 'react';

export const IosInstallGuide: React.FC = () => {
  return (
    <div className="bg-surface-light p-4 rounded-lg border border-border-light">
      <h2 className="text-xl font-semibold mb-3 text-primary">Instrucciones para iOS</h2>
      <ol className="list-decimal list-inside space-y-2 text-textSecondary">
        <li>Abre esta página en <strong>Safari</strong>.</li>
        <li>Toca el botón de <strong>Compartir</strong> (un cuadrado con una flecha hacia arriba).</li>
        <li>Desplázate hacia abajo y selecciona <strong>"Añadir a la pantalla de inicio"</strong>.</li>
        <li>Confirma tocando <strong>"Añadir"</strong> en la esquina superior derecha.</li>
      </ol>
    </div>
  );
};