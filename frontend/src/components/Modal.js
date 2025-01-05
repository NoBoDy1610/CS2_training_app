import React from 'react';
import '../styles/Modal.css';

const Modal = ({ children, closeModal }) => {
  return (
    <div className="modal-overlay" onClick={closeModal}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={closeModal}>×</button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
