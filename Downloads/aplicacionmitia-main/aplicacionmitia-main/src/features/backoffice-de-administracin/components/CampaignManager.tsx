import React, { useState } from 'react';
import { Button } from '../../../components/Button';
import Table from '../../../components/Table';

interface Campaign {
  id: string;
  name: string;
  segment: string;
  status: 'Enviada' | 'Programada' | 'Borrador';
  scheduledAt: string | null;
}

interface Segment {
  id: string;
  name: string;
}

interface CampaignManagerProps {
  campaigns: Campaign[];
  segments: Segment[];
  onSave: (campaign: any) => void;
  isLoading: boolean;
}

const CampaignManager: React.FC<CampaignManagerProps> = ({ campaigns, segments, onSave, isLoading }) => {
  const [campaignName, setCampaignName] = useState('');
  const [selectedSegment, setSelectedSegment] = useState('');
  const [message, setMessage] = useState('');
  const [scheduledAt, setScheduledAt] = useState('');

  const handleSave = () => {
    if (campaignName && selectedSegment && message) {
      onSave({
        name: campaignName,
        segment: segments.find(s => s.id === selectedSegment)?.name,
        message,
        scheduledAt: scheduledAt || null,
      });
      // Reset form
      setCampaignName('');
      setSelectedSegment('');
      setMessage('');
      setScheduledAt('');
    }
  };

  const columns = [
    { key: 'name', label: 'Nombre Campaña' },
    { key: 'segment', label: 'Segmento' },
    { key: 'status', label: 'Estado' },
    { key: 'scheduledAt', label: 'Fecha de Envío/Programación' },
  ];

  const renderRow = (row: Campaign) => (
    <tr key={row.id} className="bg-surface border-b border-border hover:bg-backgroundSecondary">
      <td className="p-4 text-text">{row.name}</td>
      <td className="p-4 text-textSecondary">{row.segment}</td>
      <td className="p-4">
        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
          row.status === 'Enviada' ? 'bg-success text-successDark' :
          row.status === 'Programada' ? 'bg-warning text-warningDark' :
          'bg-muted text-text'
        }`}>
          {row.status}
        </span>
      </td>
      <td className="p-4 text-textMuted">{row.scheduledAt || 'No programada'}</td>
    </tr>
  );

  return (
    <div className="p-6 bg-card rounded-lg shadow-lg mt-6">
      <h2 className="text-2xl font-bold text-text mb-4">Gestor de Campañas</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Campaign Creation Form */}
        <div className="p-4 bg-surface rounded-md">
          <h3 className="text-lg font-semibold text-text mb-3">Crear Nueva Campaña</h3>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Nombre de la Campaña"
              value={campaignName}
              onChange={(e) => setCampaignName(e.target.value)}
              className="w-full p-2 bg-backgroundSecondary border border-border rounded-md text-text"
            />
            <select
              value={selectedSegment}
              onChange={(e) => setSelectedSegment(e.target.value)}
              className="w-full p-2 bg-backgroundSecondary border border-border rounded-md text-text"
            >
              <option value="">Seleccionar Segmento</option>
              {segments.map(seg => <option key={seg.id} value={seg.id}>{seg.name}</option>)}
            </select>
            <textarea
              placeholder="Mensaje de la campaña..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={4}
              className="w-full p-2 bg-backgroundSecondary border border-border rounded-md text-text"
            />
            <input
              type="datetime-local"
              value={scheduledAt}
              onChange={(e) => setScheduledAt(e.target.value)}
              className="w-full p-2 bg-backgroundSecondary border border-border rounded-md text-text"
            />
            <Button variant="primary" onClick={handleSave} disabled={isLoading}>
              {isLoading ? 'Guardando...' : 'Guardar Campaña'}
            </Button>
          </div>
        </div>

        {/* Campaigns Table */}
        <div className="p-4 bg-surface rounded-md">
            <h3 className="text-lg font-semibold text-text mb-3">Campañas Existentes</h3>
            <div className="overflow-x-auto">
                <table className="min-w-full text-left">
                    <thead className="bg-backgroundSecondary">
                    <tr>
                        {columns.map(col => (
                        <th key={col.key} className="p-3 text-textSecondary font-semibold text-sm">
                            {col.label}
                        </th>
                        ))}
                    </tr>
                    </thead>
                    <tbody>
                        {campaigns.map(renderRow)}
                    </tbody>
                </table>
            </div>
        </div>
      </div>
    </div>
  );
};

export default CampaignManager;