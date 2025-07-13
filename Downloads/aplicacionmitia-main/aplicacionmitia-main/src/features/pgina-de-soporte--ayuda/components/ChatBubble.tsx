import React from 'react';

interface ChatBubbleProps {
  message: {
    id: number;
    text: string;
    isUser: boolean;
  };
}

const ChatBubble: React.FC<ChatBubbleProps> = ({ message }) => {
  const bubbleClasses = message.isUser
    ? 'bg-primary text-textInverse self-end'
    : 'bg-surface text-text self-start';

  return (
    <div className={`rounded-lg px-4 py-2 max-w-xs ${bubbleClasses}`}>
      {message.text}
    </div>
  );
};

export default ChatBubble;
