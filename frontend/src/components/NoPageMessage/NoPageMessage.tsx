import React from 'react';
import './NoPageMessage.css';

interface NoPageMessageProps {
  message: string;
}

const NoPageMessage: React.FC<NoPageMessageProps> = ({ message }) => {
  return <div className="no-project-message">{message}</div>;
};

export default NoPageMessage;
