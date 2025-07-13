import React from 'react';
import Button from '../../../components/Button';

interface QuickReplyButtonProps {
  text: string;
  onClick: () => void;
}

const QuickReplyButton: React.FC<QuickReplyButtonProps> = ({ text, onClick }) => {
  return (
    <Button onClick={onClick} variant="secondary" className="m-1">
      {text}
    </Button>
  );
};

export default QuickReplyButton;
