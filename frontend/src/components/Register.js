import React, { useState } from 'react';
import axios from 'axios';
import Message from './Message';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState({ type: '', text: '' }); // Obsługa spójnych komunikatów

  const handleRegister = async (e) => {
    e.preventDefault();

    // Reset komunikatu
    setMessage({ type: '', text: '' });

    if (password !== confirmPassword) {
      setMessage({ type: 'error', text: 'Hasła się nie zgadzają.' });
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/register', {
        username,
        email,
        password,
      });

      // Ustawienie wiadomości sukcesu
      setMessage({ type: 'success', text: response.data.message });

      // Czyszczenie pól formularza
      setUsername('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
    } catch (error) {
      setMessage({
        type: 'error',
        text: error.response?.data?.message || 'Wystąpił problem podczas rejestracji.',
      });
    }
  };

  // Funkcja do resetowania błędu podczas edycji
  const clearMessage = () => {
    setMessage({ type: '', text: '' });
  };

  return (
    <div>
      <h2>Rejestracja</h2>
      <Message type={message.type} text={message.text} />
      <form onSubmit={handleRegister}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
              clearMessage(); // Reset komunikatu podczas edycji
            }}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              clearMessage(); // Reset komunikatu podczas edycji
            }}
            required
          />
        </div>
        <div>
          <label>Hasło:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              clearMessage(); // Reset komunikatu podczas edycji
            }}
            required
          />
        </div>
        <div>
          <label>Potwierdź hasło:</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
              clearMessage(); // Reset komunikatu podczas edycji
            }}
            required
          />
        </div>
        <button type="submit">Zarejestruj</button>
      </form>
    </div>
  );
};

export default Register;
