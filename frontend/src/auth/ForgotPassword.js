import React, { useState } from 'react';
import axios from 'axios';
import Message from '../components/Message';

const ForgotPassword = ({ switchToLogin }) => {
	const [email, setEmail] = useState('');
	const [message, setMessage] = useState({ type: '', text: '' });

	const handleForgotPassword = async (e) => {
		e.preventDefault();
		setMessage({ type: '', text: '' });

		try {
			await axios.post('http://localhost:5000/forgot-password', { email });
			setMessage({
				type: 'success',
				text: 'Na podany adres został wysłany link do odzyskiwania hasła.',
			});
		} catch (error) {
			setMessage({
				type: 'error',
				text: 'Wystąpił problem podczas próby resetowania hasła.',
			});
		}
	};

	return (
		<div>
			<h2>Zapomniałeś hasła?</h2>
			<Message type={message.type} text={message.text} />
			<form onSubmit={handleForgotPassword}>
				<div>
					<label>Podaj swój adres e-mail:</label>
					<input
						type='email'
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						required
					/>
				</div>
				<button type='submit'>Wyślij link</button>
			</form>
			<p>
				Pamiętasz swoje hasło?{' '}
				<button className='link-btn' onClick={switchToLogin}>
					Zaloguj się
				</button>
			</p>
		</div>
	);
};

export default ForgotPassword;
