import React, { useState, useEffect } from 'react';
import TrainingPlans from './TrainingPlans';
import '../styles/Account.css';

const Profile = () => {
	const [user, setUser] = useState(null);
	const [error, setError] = useState(null);
	const [currentPassword, setCurrentPassword] = useState('');
	const [newPassword, setNewPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [priority, setPriority] = useState('reaction');
	const [results, setResults] = useState([]); // Lista wyników

	useEffect(() => {
		const fetchProfile = async () => {
			try {
				const token = sessionStorage.getItem('token');
				if (!token) return;

				const response = await fetch('http://localhost:5000/profile', {
					method: 'GET',
					headers: {
						Authorization: `Bearer ${token}`,
						'Content-Type': 'application/json',
					},
				});

				if (!response.ok) {
					throw new Error(`Błąd: ${response.status} ${response.statusText}`);
				}

				const data = await response.json();
				setUser(data);
			} catch (err) {
				setError(err.message);
			}
		};

		const fetchResults = async () => {
			try {
				const token = sessionStorage.getItem('token');
				if (!token) return;

				const response = await fetch('http://localhost:5000/results', {
					method: 'GET',
					headers: {
						Authorization: `Bearer ${token}`,
						'Content-Type': 'application/json',
					},
				});

				if (!response.ok) {
					throw new Error('Nie udało się pobrać wyników');
				}

				const data = await response.json();

				setResults(data);
			} catch (err) {}
		};

		fetchProfile();
		fetchResults();
	}, []);

	const handleChangePassword = async () => {
		if (newPassword !== confirmPassword) {
			alert('Nowe hasło i potwierdzenie muszą być identyczne!');
			return;
		}

		if (newPassword === currentPassword) {
			alert('Nowe hasło nie może być takie samo jak obecne.');
			return;
		}

		try {
			const token = sessionStorage.getItem('token');
			if (!token) return;

			const response = await fetch('http://localhost:5000/change-password', {
				method: 'POST',
				headers: {
					Authorization: `Bearer ${token}`,
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ currentPassword, newPassword }),
			});

			if (!response.ok) {
				throw new Error('Błąd zmiany hasła');
			}

			alert('Hasło zostało zmienione!');
			setCurrentPassword('');
			setNewPassword('');
			setConfirmPassword('');
		} catch (err) {
			alert('Błąd: ' + err.message);
		}
	};

	if (error) return <p className='error'>Błąd: {error}</p>;
	if (!user) return <p className='loading'>Ładowanie...</p>;

	return (
		<div className='profile-container'>
			<h2 className='profile-title'>Profil</h2>
			<p className='profile-info'>
				<strong>Email:</strong> {user.email}
			</p>
			<p className='profile-info'>
				<strong>Username:</strong> {user.username}
			</p>

			{/* Sekcja wyników */}
			<div className='results-section'>
				<h3>Twoje wyniki</h3>
				{results.length > 0 ? (
					<>
						{/* Tabela czasu reakcji */}
						<h4>Czas reakcji</h4>
						<table className='results-table'>
							<thead>
								<tr>
									<th>#</th>
									<th>Wynik (ms)</th>
									<th>Data</th>
								</tr>
							</thead>
							<tbody>
								{results
									.filter((result) => result.type === 'reactionTime')
									.map(
										(result, index) =>
											result.time !== undefined && (
												<tr key={index}>
													<td>{index + 1}</td>
													<td>{result.time}</td>
													<td>{new Date(result.date).toLocaleString()}</td>
												</tr>
											)
									)}
							</tbody>
						</table>

						{/* Tabela celności */}
						<h4>Celność</h4>
						<table className='results-table'>
							<thead>
								<tr>
									<th>#</th>
									<th>Wynik</th>
									<th>Data</th>
								</tr>
							</thead>
							<tbody>
								{results
									.filter((result) => result.type === 'aimTraining')
									.map(
										(result, index) =>
											result.points !== undefined && (
												<tr key={index}>
													<td>{index + 1}</td>
													<td>{result.points}</td>
													<td>{new Date(result.date).toLocaleString()}</td>
												</tr>
											)
									)}
							</tbody>
						</table>
					</>
				) : (
					<p className='no-results'>Brak dostępnych wyników.</p>
				)}
			</div>

			{/* Sekcja zmiany hasła */}
			<div className='password-change'>
				<h3>Zmiana hasła</h3>
				<input
					type='password'
					placeholder='Aktualne hasło'
					value={currentPassword}
					onChange={(e) => setCurrentPassword(e.target.value)}
				/>
				<input
					type='password'
					placeholder='Nowe hasło'
					value={newPassword}
					onChange={(e) => setNewPassword(e.target.value)}
				/>
				<input
					type='password'
					placeholder='Potwierdź nowe hasło'
					value={confirmPassword}
					onChange={(e) => setConfirmPassword(e.target.value)}
				/>
				<button className='btn' onClick={handleChangePassword}>
					Zmień hasło
				</button>
			</div>

			{/* Sekcja planu treningowego */}
			<div className='training-section'>
				<h3>Personalizacja treningu</h3>
				<select
					className='select-training'
					value={priority}
					onChange={(e) => setPriority(e.target.value)}
				>
					<option value='reaction'>Czas reakcji</option>
					<option value='aimTraining'>Celność</option>
					<option value='tactics'>Taktyka</option>
				</select>
				<p className='training-description'>
					Twój plan będzie dostosowany do priorytetu: {priority}
				</p>

				<TrainingPlans priority={priority} />
			</div>
		</div>
	);
};

export default Profile;
