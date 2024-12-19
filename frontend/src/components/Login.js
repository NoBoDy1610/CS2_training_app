import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Message from './Message'; // Import komponentu Message

const Login = () => {
	const navigate = useNavigate();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [message, setMessage] = useState({ type: '', text: '' }); // Obsługa komunikatów

	const handleLogin = async (e) => {
		e.preventDefault();

		// Reset komunikatu
		setMessage({ type: '', text: '' });

		try {
			const response = await axios.post('http://localhost:5000/login', {
				email,
				password,
			});

			if (response.status === 200) {
				localStorage.setItem('token', response.data.token); // Zapisz token w localStorage
				setMessage({ type: 'success', text: 'Logowanie zakończone sukcesem!' });

				// Przekierowanie na dashboard po zalogowaniu
				setTimeout(() => navigate('/'), 2000);
			}
		} catch (error) {
			setMessage({
				type: 'error',
				text: error.response?.data?.message || 'Nieprawidłowy email lub hasło.',
			});
		}
	};

	return (
		<div>
			<h2>Logowanie</h2>
			<Message type={message.type} text={message.text} /> {/* Wyświetlanie komunikatów */}
			<form onSubmit={handleLogin}>
				<div>
					<label>Email:</label>
					<input
						type="email"
						value={email}
						onChange={(e) => {
							setEmail(e.target.value);
							setMessage({ type: '', text: '' }); // Reset komunikatu podczas edycji
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
							setMessage({ type: '', text: '' }); // Reset komunikatu podczas edycji
						}}
						required
					/>
				</div>
				<button type="submit">Zaloguj</button>
			</form>
			<a href="/forgot-password">Zapomniałeś hasła?</a>
			<br />
			<a href="/register">Zarejestruj się</a>
		</div>
	);
};

export default Login;
