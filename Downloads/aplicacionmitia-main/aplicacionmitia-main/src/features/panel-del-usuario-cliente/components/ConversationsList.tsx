import React from 'react';
import { BellIcon } from '@heroicons/react/24/solid';
import { Professional } from '../hooks/usePaneldelUsuarioCliente';

interface ConversationsListProps {
  professionals: Professional[];
  onSelectConversation: (professional: Professional) => void;
  activeConversationId?: string | null;
}

const ConversationsList: React.FC<ConversationsListProps> = ({
  professionals,
  onSelectConversation,
  activeConversationId,
}) => {
  return (
    <div className="bg-surface rounded-lg shadow-md">
      <h3 className="p-4 text-lg font-bold border-b border-border text-text">Conversaciones</h3>
      <ul className="divide-y divide-border">
        {professionals.map((prof) => (
          <li
            key={prof.id}
            onClick={() => onSelectConversation(prof)}
            className={`p-4 flex items-center cursor-pointer transition-colors ${
              activeConversationId === prof.id ? 'bg-primary/10' : 'hover:bg-backgroundSecondary'
            }`}
          >
            <img src={prof.avatar} alt={prof.name} className="h-12 w-12 rounded-full mr-4" />
            <div className="flex-grow">
              <p className="font-semibold text-textSecondary">{prof.name}</p>
              <p className="text-sm text-textMuted truncate">Último mensaje...</p>
            </div>
            <div className="flex flex-col items-end">
              <span className="text-xs text-textMuted mb-1">hace 2h</span>
              <span className="flex items-center justify-center h-5 w-5 bg-primary rounded-full text-xs text-white">
                2
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ConversationsList;
