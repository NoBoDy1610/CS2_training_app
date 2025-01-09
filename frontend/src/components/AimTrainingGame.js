import React, { useState, useEffect } from 'react';
import styles from '../styles/AimTrainingGame.module.css';

const AimTrainingGame = () => {
	const [gameState, setGameState] = useState('start');
	const [score, setScore] = useState(0);
	const [timeLeft, setTimeLeft] = useState(60);
	const [circles, setCircles] = useState([]);
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [scores, setScores] = useState([]);
	const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
	const [isScoreSaved, setIsScoreSaved] = useState(false);
	const [numCircles, setNumCircles] = useState(4);
	const [circleSize, setCircleSize] = useState(50);

	const gridPositions = [
		{ x: '10%', y: '10%' },
		{ x: '10%', y: '50%' },
		{ x: '10%', y: '90%' },
		{ x: '50%', y: '10%' },
		{ x: '50%', y: '50%' },
		{ x: '50%', y: '90%' },
		{ x: '90%', y: '10%' },
		{ x: '90%', y: '50%' },
		{ x: '90%', y: '90%' },
	];

	const circleSizes = {
		verySmall: 30,
		small: 40,
		medium: 50,
		large: 60,
		veryLarge: 70,
	};

	useEffect(() => {
		const token = sessionStorage.getItem('token');
		setIsLoggedIn(!!token);
		if (token) fetchScores();
	}, []);

	useEffect(() => {
		if (gameState === 'playing' && timeLeft > 0) {
			const timer = setTimeout(() => setTimeLeft((prev) => prev - 1), 1000);
			return () => clearTimeout(timer);
		} else if (timeLeft === 0) {
			setGameState('finished');
		}
	}, [gameState, timeLeft]);

	const fetchScores = async () => {
		const token = sessionStorage.getItem('token');
		if (!token) {
			console.error('Brak tokena. Użytkownik musi się zalogować.');
			return;
		}

		try {
			const response = await fetch(
				'http://localhost:5000/aim-training-scores',
				{
					method: 'GET',
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);

			if (response.ok) {
				const data = await response.json();
				setScores(data);
			} else {
				console.error('Błąd podczas pobierania wyników:', response.statusText);
			}
		} catch (error) {
			console.error('Błąd podczas komunikacji z serwerem:', error);
		}
	};

	const startGame = () => {
		setGameState('playing');
		setScore(0);
		setTimeLeft(60);
		setIsScoreSaved(false);
		generateCircles();
	};

	const resetGame = () => {
		setGameState('start');
		setScore(0);
		setTimeLeft(60);
		setCircles([]);
	};

	const generateCircles = () => {
		const shuffledPositions = [...gridPositions].sort(
			() => Math.random() - 0.5
		);
		setCircles(shuffledPositions.slice(0, numCircles));
	};

	const handleCircleClick = (index) => {
		if (gameState !== 'playing') return;
		setScore((prev) => prev + 1);

		const availablePositions = gridPositions.filter(
			(pos) => !circles.includes(pos)
		);
		const newPosition =
			availablePositions[Math.floor(Math.random() * availablePositions.length)];
		setCircles((prev) =>
			prev.map((circle, i) => (i === index ? newPosition : circle))
		);
	};

	const saveScore = async () => {
		const token = sessionStorage.getItem('token');
		if (!isLoggedIn) {
			alert('Musisz się zalogować, aby zapisać wynik!');
			return;
		}

		try {
			const response = await fetch(
				'http://localhost:5000/aim-training-scores',
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${token}`,
					},
					body: JSON.stringify({ points: score }),
				}
			);

			if (response.ok) {
				alert('Wynik zapisany pomyślnie!');
				fetchScores();
			} else {
				const data = await response.json();
				alert(`Nie udało się zapisać wyniku: ${data.error}`);
			}
		} catch (error) {
			console.error('Błąd podczas zapisywania wyniku:', error);
			alert(
				'Wystąpił błąd podczas zapisywania wyniku. Spróbuj ponownie później.'
			);
		}
	};

	const sortScores = (key) => {
		let direction = 'asc';
		if (sortConfig.key === key && sortConfig.direction === 'asc') {
			direction = 'desc';
		}

		const sortedScores = [...scores].sort((a, b) => {
			if (key === 'points')
				return direction === 'asc' ? a.points - b.points : b.points - a.points;
			if (key === 'date')
				return direction === 'asc'
					? new Date(a.date) - new Date(b.date)
					: new Date(b.date) - new Date(a.date);
			return 0;
		});

		setScores(sortedScores);
		setSortConfig({ key, direction });
	};

	const getSortArrow = (key) => {
		if (sortConfig.key !== key) return '↕';
		return sortConfig.direction === 'asc' ? '↑' : '↓';
	};

	return (
		<div className={styles.aimTrainingGame}>
			<h1>Gra Celności</h1>
			<div>
				<label>
					Liczba kulek (1-8):
					<input
						type='number'
						value={numCircles}
						min={1}
						max={8}
						onChange={(e) =>
							setNumCircles(Math.min(8, Math.max(1, e.target.value)))
						}
					/>
				</label>
				<label>
					Rozmiar kulek:
					<select
						value={circleSize}
						onChange={(e) => setCircleSize(circleSizes[e.target.value])}
					>
						<option value='verySmall'>Bardzo Mała</option>
						<option value='small'>Mała</option>
						<option value='medium'>Średnia</option>
						<option value='large'>Duża</option>
						<option value='veryLarge'>Bardzo Duża</option>
					</select>
				</label>
			</div>
			<div className={styles.gameBoard}>
				{circles.map((circle, index) => (
					<div
						key={index}
						className={styles.circle}
						style={{
							width: `${circleSize}px`,
							height: `${circleSize}px`,
							left: circle.x,
							top: circle.y,
						}}
						onClick={() => handleCircleClick(index)}
					></div>
				))}
			</div>
			<div>
				<p>Wynik: {score}</p>
				<p>Pozostały czas: {timeLeft}s</p>
				{gameState === 'playing' && (
					<button onClick={resetGame}>Zresetuj</button>
				)}
				{gameState === 'finished' && (
					<button onClick={saveScore}>Zapisz wynik</button>
				)}
				{gameState === 'start' && (
					<button onClick={startGame}>Rozpocznij grę</button>
				)}
			</div>
			<div>
				<h3>Twoje wyniki:</h3>
				<table>
					<thead>
						<tr>
							<th>#</th>
							<th onClick={() => sortScores('points')}>
								Wynik {getSortArrow('points')}
							</th>
							<th onClick={() => sortScores('date')}>
								Data {getSortArrow('date')}
							</th>
						</tr>
					</thead>
					<tbody>
						{scores.map((score, index) => (
							<tr key={index}>
								<td>{index + 1}</td>
								<td>{score.points}</td>
								<td>{new Date(score.date).toLocaleString()}</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default AimTrainingGame;
