import React from 'react';
import '../styles/Message.css';

const Message = ({ type, text }) => {
	if (!text) return null; // Jeśli nie ma tekstu, nic nie wyświetla się

	return <div className={`message ${type}`}>{text}</div>;
};

export default Message;
