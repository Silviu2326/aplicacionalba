import { useEffect, useRef, useState } from 'react';
import { Message, MessageBubble } from './MessageBubble';
import { MessageInput } from './MessageInput';
import { ArrowLeftIcon } from '@heroicons/react/24/solid';

interface SecureChatInterfaceProps {
  professional: { id: string; name: string; avatar: string };
  messages: Message[];
  onSendMessage: (professionalId: string, message: string) => Promise<void>;
  onGoBack: () => void;
  isSending: boolean;
}

export const SecureChatInterface = ({
  professional,
  messages,
  onSendMessage,
  onGoBack,
  isSending,
}: SecureChatInterfaceProps) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (message: string) => {
    onSendMessage(professional.id, message);
  };

  return (
    <div className="flex flex-col h-full bg-background rounded-lg shadow-lg">
      <div className="flex items-center p-4 bg-surface rounded-t-lg border-b border-border">
        <button onClick={onGoBack} className="p-2 rounded-full hover:bg-backgroundSecondary mr-4">
          <ArrowLeftIcon className="h-6 w-6 text-textSecondary" />
        </button>
        <img src={professional.avatar} alt={professional.name} className="h-10 w-10 rounded-full mr-4" />
        <h2 className="text-lg font-bold text-text">{professional.name}</h2>
      </div>
      <div className="flex-grow p-4 overflow-y-auto bg-backgroundSecondary">
        {messages.length > 0 ? (
          messages.map((msg) => <MessageBubble key={msg.id} message={msg} />)
        ) : (
          <div className="text-center text-textMuted mt-8">
            No hay mensajes todavía. ¡Inicia la conversación!
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      <MessageInput onSendMessage={handleSendMessage} isSending={isSending} />
    </div>
  );
};
