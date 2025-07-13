
import { CheckCircleIcon, ClockIcon } from '@heroicons/react/24/solid';

export interface Message {
  id: string;
  text: string;
  sender: 'user' | 'professional';
  timestamp: string;
  status: 'sending' | 'sent' | 'read';
}

interface MessageBubbleProps {
  message: Message;
}

export const MessageBubble = ({ message }: MessageBubbleProps) => {
  const isUser = message.sender === 'user';

  const getStatusIndicator = () => {
    if (message.status === 'sending') {
      return <ClockIcon className="h-4 w-4 text-textMuted" title="Enviando..." />;
    }
    if (message.status === 'sent') {
      return <CheckCircleIcon className="h-4 w-4 text-textMuted" title="Enviado" />;
    }
    if (message.status === 'read') {
      return <CheckCircleIcon className="h-4 w-4 text-primary" title="Leído" />;
    }
    return null;
  };

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
      <div
        className={`rounded-lg px-4 py-2 max-w-xs lg:max-w-md ${
          isUser ? 'bg-primary text-white' : 'bg-card text-textSecondary'
        }`}
      >
        <p className="text-sm">{message.text}</p>
        <div className="flex items-center justify-end mt-1">
          <span className={`text-xs ${isUser ? 'text-primaryLight' : 'text-textMuted'}`}>
            {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
          {isUser && <div className="ml-2">{getStatusIndicator()}</div>}
        </div>
      </div>
    </div>
  );
};
