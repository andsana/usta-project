import React from 'react';
import './NoContentMessage.css';

interface NoPageMessageProps {
  message: string;
}

const NoContentMessage: React.FC<NoPageMessageProps> = ({ message }) => {
  return (
    <div className="no-message-wrapper">
      <div className="no-message">{message}</div>
    </div>
  );
};

export default NoContentMessage;
