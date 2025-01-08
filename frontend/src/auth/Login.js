import React, { useState } from 'react';
import axios from 'axios';
import styles from '../styles/Login.module.css';

const Login = ({
	onLoginSuccess,
	switchToRegister,
	switchToForgotPassword,
}) => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [errorMessage, setErrorMessage] = useState('');

	const handleLogin = async (e) => {
		e.preventDefault();
		setErrorMessage('');

		// Walidacja pól przed wysłaniem
		if (!email || !password) {
			setErrorMessage('Wszystkie pola są wymagane!');
			return;
		}

		try {
			const response = await axios.post('http://localhost:5000/login', {
				email,
				password,
			});

			if (response.status === 200) {
				localStorage.setItem('token', response.data.token); // Zapis tokena
				onLoginSuccess(); // Informujemy o sukcesie logowania
			}
		} catch (error) {
			const errorMsg =
				error.response?.data?.message ||
				'Błąd podczas logowania. Spróbuj ponownie.';
			setErrorMessage(errorMsg);
		}
	};

	return (
		<div className={styles.loginModal}>
			<h2>Logowanie</h2>
			{errorMessage && <p className={styles.error}>{errorMessage}</p>}
			<form onSubmit={handleLogin}>
				<div className={styles.formGroup}>
					<label>Email:</label>
					<input
						type='email'
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						required
					/>
				</div>
				<div className={styles.formGroup}>
					<label>Hasło:</label>
					<input
						type='password'
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
					/>
				</div>
				<button type='submit' className={styles.loginButton}>
					Zaloguj
				</button>
			</form>
			<div className={styles.links}>
				<button className={styles.linkButton} onClick={switchToRegister}>
					Zarejestruj się
				</button>
				<button className={styles.linkButton} onClick={switchToForgotPassword}>
					Zapomniałem hasła
				</button>
			</div>
		</div>
	);
};

export default Login;
