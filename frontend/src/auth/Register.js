import React, { useState } from 'react';
import axios from 'axios';
import Message from '../components/Message';

const Register = ({ switchToLogin }) => {
	const [username, setUsername] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [message, setMessage] = useState({ type: '', text: '' });

	const handleRegister = async (e) => {
		e.preventDefault();
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

			setMessage({ type: 'success', text: response.data.message });
		} catch (error) {
			setMessage({
				type: 'error',
				text:
					error.response?.data?.message ||
					'Wystąpił problem podczas rejestracji.',
			});
		}
	};

	return (
		<div>
			<h2>Rejestracja</h2>
			<Message type={message.type} text={message.text} />
			<form onSubmit={handleRegister}>
				<div>
					<label>Username:</label>
					<input
						type='text'
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						required
					/>
				</div>
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
				<div>
					<label>Potwierdź hasło:</label>
					<input
						type='password'
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
						required
					/>
				</div>
				<button type='submit'>Zarejestruj</button>
			</form>
			<p>
				Masz już konto?{' '}
				<button className='link-btn' onClick={switchToLogin}>
					Zaloguj się
				</button>
			</p>
		</div>
	);
};

export default Register;
