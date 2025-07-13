
import React, { useState } from 'react';
import Table from '../../../components/Table';
import FeedbackItemDetail from './FeedbackItemDetail';
import FeedbackTagManager from './FeedbackTagManager';

const FeedbackQueue: React.FC = () => {
  // Mock data for now
  const [feedbackData, setFeedbackData] = useState([
    { id: 1, user_id: 101, content: 'This is great!', status: 'new', tags: ['positive'] },
    { id: 2, user_id: 102, content: 'Please add feature X.', status: 'planned', tags: ['feature-request'] },
    { id: 3, user_id: 103, content: 'I found a bug on the login page.', status: 'new', tags: ['bug'] },
  ]);

  const [selectedFeedback, setSelectedFeedback] = useState<any>(null);
  const [filter, setFilter] = useState('all');

  const columns = React.useMemo(
    () => [
      { Header: 'ID', accessor: 'id' },
      { Header: 'Content', accessor: 'content' },
      { Header: 'Status', accessor: 'status' },
      {
        Header: 'Tags',
        accessor: 'tags',
        Cell: ({ value }: { value: string[] }) => (
          <div className="flex flex-wrap gap-1">
            {value.map((tag, index) => (
              <span key={index} className="bg-accent text-white px-2 py-1 rounded-full text-xs">
                {tag}
              </span>
            ))}
          </div>
        ),
      },
      {
        Header: 'Actions',
        Cell: ({ row }: any) => (
          <button
            onClick={() => setSelectedFeedback(row.original)}
            className="bg-primary hover:bg-primaryHover text-white font-bold py-2 px-4 rounded"
          >
            View Details
          </button>
        ),
      },
    ],
    []
  );

  return (
    <div className="space-y-8">
      {/* Header con filtros modernos */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-secondary/5 to-accent/5 rounded-2xl blur-xl"></div>
        <div className="relative bg-gradient-to-r from-surface/80 to-card/80 backdrop-blur-sm rounded-2xl p-6 border border-borderLight/30">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h2 className="text-3xl font-black bg-gradient-to-r from-text via-primary to-secondary bg-clip-text text-transparent mb-2">
                Cola de Feedback
              </h2>
              <p className="text-textMuted">Gestiona y revisa el feedback de los usuarios</p>
            </div>
            
            {/* Filtros con diseño moderno */}
            <div className="flex items-center space-x-2 bg-backgroundSecondary/50 backdrop-blur-sm rounded-xl p-2 border border-borderLight/20">
              {[
                { key: 'all', label: 'Todos', icon: '📋' },
                { key: 'pending', label: 'Pendientes', icon: '⏳' },
                { key: 'reviewed', label: 'Revisados', icon: '✅' }
              ].map((item) => (
                <button
                  key={item.key}
                  onClick={() => setFilter(item.key)}
                  className={`relative px-4 py-2 rounded-lg transition-all duration-300 transform hover:scale-105 ${
                    filter === item.key
                      ? 'bg-gradient-to-r from-primary to-primaryDark text-textInverse shadow-lg shadow-primary/25'
                      : 'text-textSecondary hover:bg-surface/50 hover:text-text'
                  }`}
                >
                  <span className="mr-2">{item.icon}</span>
                  {item.label}
                  {filter === item.key && (
                    <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Tabla de feedback modernizada */}
        <div className="md:col-span-2">
          <div className="bg-gradient-to-br from-surface/60 to-card/60 backdrop-blur-xl rounded-2xl border border-borderLight/30 shadow-xl overflow-hidden">
            <div className="p-6 border-b border-borderLight/20">
              <h3 className="text-xl font-bold text-text mb-2">Lista de Feedback</h3>
              <p className="text-textMuted text-sm">Total: {feedbackData.length} elementos</p>
            </div>
            <div className="overflow-x-auto">
              <Table columns={columns} data={feedbackData} />
            </div>
          </div>
        </div>
        
        {/* Panel de detalles modernizado */}
        <div>
          {selectedFeedback ? (
            <div className="bg-gradient-to-br from-surface/60 to-card/60 backdrop-blur-xl rounded-2xl border border-borderLight/30 shadow-xl overflow-hidden">
              <div className="p-6 border-b border-borderLight/20 bg-gradient-to-r from-primary/10 to-secondary/10">
                <h3 className="text-xl font-bold text-text mb-1">Detalles del Feedback</h3>
                <p className="text-textMuted text-sm">ID: {selectedFeedback.id}</p>
              </div>
              <FeedbackItemDetail
                feedback={selectedFeedback}
                onClose={() => setSelectedFeedback(null)}
              />
            </div>
          ) : (
            <div className="bg-gradient-to-br from-surface/40 to-card/40 backdrop-blur-xl rounded-2xl border border-borderLight/20 p-8 text-center shadow-lg">
              <div className="w-16 h-16 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📝</span>
              </div>
              <h3 className="text-lg font-semibold text-text mb-2">Selecciona un elemento</h3>
              <p className="text-textMuted">Haz clic en cualquier fila de la tabla para ver los detalles del feedback</p>
            </div>
          )}
          <div className="mt-6">
            <FeedbackTagManager />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedbackQueue;
