import React, { useState } from 'react';
import axios from 'axios';

const ForgotPassword = () => {
	const [email, setEmail] = useState('');
	const [message, setMessage] = useState('');
	const [error, setError] = useState('');

	const handleForgotPassword = async (e) => {
		e.preventDefault();
		try {
			const response = await axios.post(
				'/forgot-password',
				{ email }
			);
			setMessage('Na podany adres został wysłany link do odzyskiwania hasła');
		} catch (error) {
			setError('Wystąpił problem podczas próby resetowania hasła');
		}
	};

	return (
		<div>
			<h2>Zapomniałeś hasła?</h2>
			{message && <p>{message}</p>}
			{error && <p>{error}</p>}
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
		</div>
	);
};

export default ForgotPassword;
