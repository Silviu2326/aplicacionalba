import React, { useState } from 'react';
import { usePaneldelProfesional } from '../hooks/usePaneldelProfesional';

const SecureChatInterface: React.FC = () => {
  const {
    conversations,
    selectedConversation,
    setSelectedConversation,
    messages,
    loadingMessages,
    handleSendMessage,
  } = usePaneldelProfesional();

  const [newMessage, setNewMessage] = useState('');

  const onSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim() === '') return;
    handleSendMessage(newMessage);
    setNewMessage('');
  };

  return (
    <div className="flex h-[calc(100vh-200px)] bg-backgroundSecondary text-text rounded-lg shadow-lg">
      {/* Columna de Conversaciones */}
      <div className="w-1/3 border-r border-border flex flex-col">
        <div className="p-4 border-b border-border">
          <h2 className="text-xl font-bold text-text">Mensajes</h2>
          <input
            type="text"
            placeholder="Buscar cliente..."
            className="w-full mt-2 p-2 rounded-lg bg-surface border border-border focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <div className="flex-grow overflow-y-auto">
          {conversations.map((convo) => (
            <div
              key={convo.id}
              className={`p-4 cursor-pointer flex items-center ${selectedConversation === convo.id ? 'bg-surface' : 'hover:bg-card'}`}
              onClick={() => setSelectedConversation(convo.id)}
            >
              <div className="relative mr-4">
                <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center text-xl font-bold text-white">
                  {convo.name.charAt(0)}
                </div>
                {convo.unread > 0 && (
                  <span className="absolute top-0 right-0 block h-3 w-3 rounded-full bg-accent ring-2 ring-backgroundSecondary" />
                )}
              </div>
              <div className="flex-grow">
                <div className="flex justify-between items-center">
                  <h3 className="font-semibold text-text">{convo.name}</h3>
                  <span className="text-xs text-textMuted">{convo.timestamp}</span>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-sm text-textMuted truncate">{convo.lastMessage}</p>
                  {convo.unread > 0 && (
                    <span className="bg-primary text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                      {convo.unread}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Columna de Chat */}
      <div className="w-2/3 flex flex-col">
        {selectedConversation ? (
          <>
            {/* Cabecera del Chat */}
            <div className="p-4 border-b border-border flex items-center">
              <div className="w-10 h-10 bg-gradient-secondary rounded-full flex items-center justify-center text-xl font-bold text-white mr-4">
                {conversations.find(c => c.id === selectedConversation)?.name.charAt(0)}
              </div>
              <div>
                <h3 className="font-bold text-lg text-text">
                  {conversations.find(c => c.id === selectedConversation)?.name}
                </h3>
                <p className="text-sm text-success">Online</p>
              </div>
            </div>

            {/* Historial de Mensajes */}
            <div className="flex-grow p-4 overflow-y-auto bg-surface">
              {loadingMessages ? (
                <div className="flex justify-center items-center h-full">
                  <p className="text-textMuted">Cargando mensajes...</p>
                </div>
              ) : (
                messages.map((msg, index) => (
                  <div key={index} className={`flex mb-4 ${msg.from === 'me' ? 'justify-end' : 'justify-start'}`}>
                    <div
                      className={`rounded-lg p-3 max-w-md ${
                        msg.from === 'me'
                          ? 'bg-primary text-white'
                          : 'bg-card text-textSecondary'
                      }`}
                    >
                      <p>{msg.text}</p>
                      <p className={`text-xs mt-1 ${msg.from === 'me' ? 'text-primaryLight' : 'text-textMuted'} text-right`}>
                        {msg.time}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Input de Mensaje */}
            <div className="p-4 bg-backgroundSecondary border-t border-border">
              <form onSubmit={onSendMessage} className="flex items-center">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Escribe un mensaje..."
                  className="w-full p-3 rounded-full bg-surface border border-border focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <button
                  type="submit"
                  className="ml-4 p-3 rounded-full bg-primary hover:bg-primaryHover text-white disabled:bg-muted"
                  disabled={!newMessage.trim()}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </button>
              </form>
            </div>
          </>
        ) : (
          <div className="flex items-center justify-center h-full">
            <p className="text-textMuted">Selecciona una conversación para empezar a chatear.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SecureChatInterface;
