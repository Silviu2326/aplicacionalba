import React, { useState, useRef, useEffect } from 'react';
import ChatBubble from './ChatBubble';
import QuickReplyButton from './QuickReplyButton';
import useSupportChat from '../hooks/useSupportChat';

const SupportChatbotWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { messages, inputValue, setInputValue, sendMessage, isTyping } = useSupportChat();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      sendMessage(inputValue);
    }
  };

  const handleQuickReplyClick = (text: string) => {
    sendMessage(text);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-4 right-4 bg-primary text-textInverse p-4 rounded-full shadow-lg hover:bg-primaryHover transition-colors"
        aria-label="Abrir chat de ayuda"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      </button>

      {isOpen && (
        <div className="fixed bottom-20 right-4 w-80 h-96 bg-surface rounded-lg shadow-xl flex flex-col">
          <header className="bg-primary text-textInverse p-4 rounded-t-lg">
            <h2 className="text-lg font-semibold">Soporte</h2>
          </header>

          <main className="flex-1 p-4 overflow-y-auto">
            <div className="flex flex-col space-y-2">
              {messages.map((msg) => (
                <ChatBubble key={msg.id} message={msg} />
              ))}
              {isTyping && (
                <div className="self-start">
                  <div className="rounded-lg px-4 py-2 max-w-xs bg-surface text-text">
                    Escribiendo...
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </main>

          <div className="p-2 border-t border-border">
              <div className="flex flex-wrap">
                  <QuickReplyButton text="¿Cómo cambio mi contraseña?" onClick={() => handleQuickReplyClick('¿Cómo cambio mi contraseña?')} />
                  <QuickReplyButton text="¿Cuáles son los planes?" onClick={() => handleQuickReplyClick('¿Cuáles son los planes?')} />
              </div>
          </div>

          <footer className="p-4 border-t border-border">
            <form onSubmit={handleSendMessage} className="flex">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Escribe un mensaje..."
                className="flex-1 px-3 py-2 bg-backgroundSecondary border border-border rounded-l-md focus:outline-none focus:ring-2 focus:ring-focus text-text"
              />
              <button type="submit" className="bg-primary text-textInverse px-4 py-2 rounded-r-md hover:bg-primaryHover">
                Enviar
              </button>
            </form>
          </footer>
        </div>
      )}
    </>
  );
};

export default SupportChatbotWidget;
