import React, { useState } from 'react';
import axios from 'axios';
import Message from '../components/Message';

const Login = ({ switchToRegister, switchToForgotPassword }) => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [message, setMessage] = useState({ type: '', text: '' });

	const handleLogin = async (e) => {
		e.preventDefault();
		setMessage({ type: '', text: '' });

		try {
			const response = await axios.post('http://localhost:5000/login', {
				email,
				password,
			});

			if (response.status === 200) {
				localStorage.setItem('token', response.data.token);
				setMessage({ type: 'success', text: 'Logowanie zakończone sukcesem!' });
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
			<Message type={message.type} text={message.text} />
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
			<p>
				Nie masz konta?{' '}
				<button className='link-btn' onClick={switchToRegister}>
					Zarejestruj się
				</button>
			</p>
			<p>
				Zapomniałeś hasła?{' '}
				<button className='link-btn' onClick={switchToForgotPassword}>
					Odzyskaj hasło
				</button>
			</p>
		</div>
	);
};

export default Login;
