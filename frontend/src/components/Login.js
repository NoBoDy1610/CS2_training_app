import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
	const navigate = useNavigate();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');

	const handleLogin = async () => {
		try {
			const response = await fetch('http://localhost:5000/login', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ email, password }),
			});

			const data = await response.json();

			if (response.ok) {
				localStorage.setItem('token', data.token); // Zapisz token w localStorage
				console.log('Zalogowano pomyślnie');
			} else {
				alert(data.message); // Wyświetl komunikat błędu
			}
		} catch (err) {
			console.error('Błąd logowania:', err);
			alert('Wystąpił błąd przy logowaniu');
		}
	};

	return (
		<div>
			<h2>Logowanie</h2>
			{error && <p>{error}</p>}
			<form onSubmit={handleLogin}>
				<div>
					<label>Email:</label>
					<input
						type='email'
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						required
					/>
				</div>
				<div>
					<label>Hasło:</label>
					<input
						type='password'
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
					/>
				</div>
				<button type='submit'>Zaloguj</button>
			</form>
			<a href='/forgot-password'>Zapomniałeś hasła?</a>
			<br />
			<a href='/register'>Zarejestruj się</a>
		</div>
	);
};

export default Login;
