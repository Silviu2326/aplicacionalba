import React, { useState, useRef, useEffect } from 'react';
import { FiSend, FiRefreshCw, FiMessageCircle, FiUser, FiCpu } from 'react-icons/fi';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
}

const InteractivePWADemo: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: "¡Hola! Bienvenido a la demo interactiva.", sender: 'bot' },
    { id: 2, text: "Escribe un mensaje para ver cómo funciona.", sender: 'bot' },
  ]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSendMessage = () => {
    if (inputValue.trim() === '') return;

    const userMessage: Message = {
      id: Date.now(),
      text: inputValue,
      sender: 'user',
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');

    setTimeout(() => {
      const botMessage: Message = {
        id: Date.now() + 1,
        text: "Este es un mensaje de respuesta automático.",
        sender: 'bot',
      };
      setMessages(prev => [...prev, botMessage]);
    }, 1200);
  };
  
  const handleResetDemo = () => {
    setMessages([
        { id: 1, text: "¡Hola! Bienvenido a la demo interactiva.", sender: 'bot' },
        { id: 2, text: "Escribe un mensaje para ver cómo funciona.", sender: 'bot' },
    ]);
    setInputValue('');
  }

  return (
    <div className="relative flex flex-col h-full overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-0 w-20 h-20 bg-gradient-to-br from-primary/30 via-accent/20 to-secondary/30 rounded-full blur-lg animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-16 h-16 bg-gradient-to-tl from-info/30 via-success/20 to-warning/30 rounded-full blur-md animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 right-4 w-12 h-12 bg-gradient-to-r from-accent/20 to-primary/20 rounded-full blur-xl animate-spin-slow"></div>
      </div>

      {/* Main chat container */}
      <div className="relative flex flex-col h-full backdrop-blur-sm bg-white/5 border border-white/10 rounded-2xl p-4 shadow-xl">
        {/* Chat header */}
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-accent to-primary flex items-center justify-center shadow-lg">
              <FiMessageCircle size={16} className="text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-text">Demo Interactiva</h3>
              <p className="text-xs text-textSecondary">Prueba la funcionalidad</p>
            </div>
          </div>
          
          <button 
            onClick={handleResetDemo}
            className="group flex items-center gap-2 px-3 py-1.5 bg-white/10 hover:bg-white/20 border border-white/20 rounded-full transition-all duration-300 transform hover:scale-105"
          >
            <FiRefreshCw size={14} className="text-textSecondary group-hover:text-accent transition-colors group-hover:rotate-180 duration-300" />
            <span className="text-xs text-textSecondary group-hover:text-accent transition-colors">Reset</span>
          </button>
        </div>

        {/* Messages area */}
        <div className="flex-grow overflow-y-auto pr-2 space-y-3 scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent">
          {messages.map((msg, index) => (
            <div
              key={msg.id}
              className={`flex items-end gap-2 animate-fade-in-up ${
                msg.sender === 'user' ? 'justify-end' : 'justify-start'
              }`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Avatar for bot messages */}
               {msg.sender === 'bot' && (
                 <div className="w-6 h-6 rounded-full bg-gradient-to-br from-secondary to-info flex items-center justify-center shadow-md flex-shrink-0">
                   <FiCpu size={12} className="text-white" />
                 </div>
               )}
              
              {/* Message bubble */}
              <div
                className={`relative max-w-[75%] px-4 py-2.5 rounded-2xl shadow-lg transform transition-all duration-300 hover:scale-[1.02] ${
                  msg.sender === 'user'
                    ? 'bg-gradient-to-br from-primary to-accent text-white rounded-br-md'
                    : 'bg-white/10 backdrop-blur-sm border border-white/20 text-text rounded-bl-md'
                }`}
              >
                <p className="text-sm leading-relaxed">{msg.text}</p>
                
                {/* Message tail */}
                <div className={`absolute bottom-0 w-3 h-3 transform rotate-45 ${
                  msg.sender === 'user'
                    ? 'right-0 translate-x-1 bg-gradient-to-br from-primary to-accent'
                    : 'left-0 -translate-x-1 bg-white/10 border-l border-b border-white/20'
                }`}></div>
              </div>
              
              {/* Avatar for user messages */}
              {msg.sender === 'user' && (
                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-md flex-shrink-0">
                  <FiUser size={12} className="text-white" />
                </div>
              )}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        
        {/* Input area */}
        <div className="mt-4 pt-3 border-t border-white/10">
          <div className="flex items-center gap-3">
            <div className="relative flex-grow">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Escribe un mensaje..."
                className="w-full bg-white/10 backdrop-blur-sm border border-white/20 rounded-full py-3 px-4 pr-12 text-text placeholder-textSecondary focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent/50 transition-all duration-300"
              />
              
              {/* Send button inside input */}
              <button
                onClick={handleSendMessage}
                disabled={!inputValue.trim()}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-gradient-to-br from-accent to-primary hover:from-primary hover:to-accent disabled:from-surface disabled:to-surface text-white rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110 disabled:scale-100 disabled:cursor-not-allowed shadow-lg"
              >
                <FiSend size={14} className={`transition-transform duration-300 ${
                  inputValue.trim() ? 'translate-x-0' : 'translate-x-1'
                }`} />
              </button>
            </div>
          </div>
          
          {/* Typing indicator placeholder */}
          <div className="mt-2 h-4 flex items-center">
            <div className="flex items-center gap-1 opacity-0">
              <div className="w-1.5 h-1.5 bg-textSecondary rounded-full animate-bounce"></div>
              <div className="w-1.5 h-1.5 bg-textSecondary rounded-full animate-bounce delay-100"></div>
              <div className="w-1.5 h-1.5 bg-textSecondary rounded-full animate-bounce delay-200"></div>
              <span className="text-xs text-textSecondary ml-2">Escribiendo...</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InteractivePWADemo;
