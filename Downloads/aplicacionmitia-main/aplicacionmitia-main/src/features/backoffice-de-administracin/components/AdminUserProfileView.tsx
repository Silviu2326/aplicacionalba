import React, { useState } from 'react';
import AdminNotes from './AdminNotes';
import RiskScoreIndicator from './RiskScoreIndicator';

type Tab = 'Datos' | 'Sesiones' | 'Pagos' | 'Actividad' | 'Notas';

interface AdminUserProfileViewProps {
    userId: string;
    riskScore?: number;
}

const AdminUserProfileView: React.FC<AdminUserProfileViewProps> = ({ userId, riskScore }) => {
  const [activeTab, setActiveTab] = useState<Tab>('Datos');

  const renderContent = () => {
    switch (activeTab) {
      case 'Datos':
        return <div className="p-4 bg-surface rounded-b-lg text-text">Contenido de Datos Personales para el usuario {userId}</div>;
      case 'Sesiones':
        return <div className="p-4 bg-surface rounded-b-lg text-text">Contenido de Sesiones</div>;
      case 'Pagos':
        return <div className="p-4 bg-surface rounded-b-lg text-text">Contenido de Pagos</div>;
      case 'Actividad':
        return <div className="p-4 bg-surface rounded-b-lg text-text">Contenido de Actividad Reciente</div>;
      case 'Notas':
        return <AdminNotes userId={userId} />;
      default:
        return null;
    }
  };

  const renderTab = (tabName: Tab) => {
    const isActive = activeTab === tabName;
    return (
      <button
        key={tabName}
        onClick={() => setActiveTab(tabName)}
        className={`px-4 py-2 font-semibold border-b-2 transition-colors ${
          isActive
            ? 'border-primary text-primary'
            : 'border-transparent text-textMuted hover:text-text'
        }`}
      >
        {tabName}
      </button>
    );
  };

  return (
    <div className="p-6 bg-backgroundSecondary rounded-lg shadow-md">
      <div className="flex justify-between items-start mb-4">
        <div>
            <h2 className="text-2xl font-bold text-text">Perfil de Usuario</h2>
            <p className="text-textMuted">ID de Usuario: {userId}</p>
        </div>
        <div className="flex flex-col items-end space-y-2">
            {riskScore && <RiskScoreIndicator riskScore={riskScore} />}
            <div className="flex space-x-2">
                <button className="px-3 py-1 bg-warning text-textInverse rounded-md hover:bg-warningDark text-sm">Suplantar</button>
                <button className="px-3 py-1 bg-info text-textInverse rounded-md hover:bg-infoDark text-sm">Enviar Correo</button>
                <button className="px-3 py-1 bg-error text-textInverse rounded-md hover:bg-errorDark text-sm">Desactivar</button>
            </div>
        </div>
      </div>

      <div className="border-b border-border">
        <nav className="flex space-x-4">
          {renderTab('Datos')}
          {renderTab('Sesiones')}
          {renderTab('Pagos')}
          {renderTab('Actividad')}
          {renderTab('Notas')}
        </nav>
      </div>
      
      <div className="mt-4">
        {renderContent()}
      </div>
    </div>
  );
};

export default AdminUserProfileView;