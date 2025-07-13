import { useState } from 'react';

interface Message {
  id: number;
  text: string;
  isUser: boolean;
}

const useSupportChat = () => {
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: '¡Hola! ¿Cómo puedo ayudarte hoy?', isUser: false }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const sendMessage = (text: string) => {
    const newUserMessage: Message = {
      id: Date.now(),
      text,
      isUser: true,
    };
    setMessages((prev) => [...prev, newUserMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate bot response
    setTimeout(() => {
      let botResponseText = '';
      const lowerCaseText = text.toLowerCase();

      if (lowerCaseText.includes('contraseña')) {
        botResponseText = 'Puedes cambiar tu contraseña en la sección de "Configuración de cuenta".';
      } else if (lowerCaseText.includes('planes')) {
        botResponseText = 'Puedes ver nuestros planes en la página de "Planes y Suscripciones".';
      } else if (lowerCaseText.includes('hablar con un humano')) {
        botResponseText = 'Claro, te transferiré con un agente. Por favor, crea un ticket de soporte.';
      } else {
        botResponseText = 'Lo siento, no he entendido tu pregunta. ¿Puedes reformularla? También puedes escribir "hablar con un humano" para contactar con soporte.';
      }
      
      const newBotMessage: Message = {
        id: Date.now() + 1,
        text: botResponseText,
        isUser: false,
      };
      setIsTyping(false);
      setMessages((prev) => [...prev, newBotMessage]);
    }, 1000);
  };

  return {
    messages,
    inputValue,
    setInputValue,
    sendMessage,
    isTyping,
  };
};

export default useSupportChat;
