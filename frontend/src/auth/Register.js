import React, { useState } from 'react';
import axios from 'axios';
import Message from '../components/Message';

const Register = ({ switchToLogin }) => {
	const [formData, setFormData] = useState({
		username: '',
		email: '',
		password: '',
		confirmPassword: '',
	});
	const [message, setMessage] = useState({ type: '', text: '' });

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setMessage({ type: '', text: '' });

		// Walidacja
		if (formData.password !== formData.confirmPassword) {
			setMessage({ type: 'error', text: 'Hasła się nie zgadzają.' });
			return;
		}

		try {
			const response = await axios.post('http://localhost:5000/register', {
				username: formData.username,
				email: formData.email,
				password: formData.password,
			});

			setMessage({
				type: 'success',
				text: 'Rejestracja zakończona sukcesem! Możesz się teraz zalogować.',
			});

			// Automatyczna zmiana widoku modala na logowanie
			setTimeout(() => {
				switchToLogin(); // Przełącz na widok logowania
			}, 2000);
		} catch (error) {
			// Obsługa szczegółowych błędów
			if (error.response) {
				setMessage({
					type: 'error',
					text:
						error.response.data.message ||
						'Wystąpił problem podczas rejestracji.',
				});
			} else {
				setMessage({
					type: 'error',
					text: 'Nie udało się połączyć z serwerem.',
				});
			}
		}
	};

	return (
		<div>
			<h2>Rejestracja</h2>
			<Message type={message.type} text={message.text} />
			<form onSubmit={handleSubmit}>
				<div>
					<label>Username:</label>
					<input
						type='text'
						name='username'
						value={formData.username}
						onChange={handleChange}
						required
					/>
				</div>
				<div>
					<label>Email:</label>
					<input
						type='email'
						name='email'
						value={formData.email}
						onChange={handleChange}
						required
					/>
				</div>
				<div>
					<label>Hasło:</label>
					<input
						type='password'
						name='password'
						value={formData.password}
						onChange={handleChange}
						required
					/>
				</div>
				<div>
					<label>Potwierdź hasło:</label>
					<input
						type='password'
						name='confirmPassword'
						value={formData.confirmPassword}
						onChange={handleChange}
						required
					/>
				</div>
				<button type='submit'>Zarejestruj</button>
			</form>
			<div>
				<p>Masz już konto?</p>
				<button className='link-btn' onClick={switchToLogin}>
					Zaloguj się
				</button>
			</div>
		</div>
	);
};

export default Register;
