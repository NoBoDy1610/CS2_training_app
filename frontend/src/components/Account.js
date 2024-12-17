import React, { useState } from 'react';

const Account = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [result, setResult] = useState('');

	const handleSubmit = async (e) => {
		e.preventDefault();
		setResult(''); // Czyści poprzedni wynik

		try {
			const response = await fetch('http://localhost:5000/api/login', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ email, password }),
			});

			if (!response.ok) {
				const errorData = await response.json();
				throw new Error(errorData.message || `HTTP error! Status: ${response.status}`);
			}

			const data = await response.json();
			setResult(`Zalogowano pomyślnie! Token: ${data.token}`);
			console.log('Token:', data.token);

			// Zapisz token w localStorage
			localStorage.setItem('authToken', data.token);
		} catch (error) {
			setResult(`Błąd logowania: ${error.message}`);
		}
	};

	return (
		<div>
			<h1>Logowanie</h1>
			<form onSubmit={handleSubmit}>
				<label htmlFor="email">Email:</label>
				<input
					type="email"
					id="email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					required
				/>
				<br />
				<br />
				<label htmlFor="password">Hasło:</label>
				<input
					type="password"
					id="password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					required
				/>
				<br />
				<br />
				<button type="submit">Zaloguj</button>
			</form>
			<p>{result}</p>
		</div>
	);
};

export default Account;
