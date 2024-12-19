import React from 'react';
import '../styles/Message.css';

const Message = ({ type, text }) => {
  if (!text) return null; // Jeśli nie ma tekstu, nie wyświetlaj niczego

  return (
    <div className={`message ${type}`}>
      {text}
    </div>
  );
};

export default Message;
