import React from 'react';
import '../styles/Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul className="nav-list">
        <li className="nav-item"><a href="/">Home</a></li>
        <li className="nav-item"><a href="/about">About</a></li>
        <li className="nav-item"><a href="/contact">Contact</a></li>
      </ul>
      <div className="auth-buttons">
        <button className="login-btn" onClick={() => window.location.href = '/login'}>Logowanie</button>
        <button className="register-btn" onClick={() => window.location.href = '/register'}>Rejestracja</button>
      </div>
    </nav>
  );
};

export default Navbar;
