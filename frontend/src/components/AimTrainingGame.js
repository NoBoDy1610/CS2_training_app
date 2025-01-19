import React, { useState, useEffect } from 'react';
import styles from '../styles/AimTrainingGame.module.css';

const AimTrainingGame = () => {
	const [gameState, setGameState] = useState('start');
	const [score, setScore] = useState(0);
	const [timeLeft, setTimeLeft] = useState(60);
	const [circles, setCircles] = useState([]);
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [scores, setScores] = useState([]);
	const [numCircles, setNumCircles] = useState(4);
	const [circleSizeKey, setCircleSizeKey] = useState('medium');
	const [circleSize, setCircleSize] = useState(50);
	const [isScoreSaved, setIsScoreSaved] = useState(false);
	const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
	const [enableMovement, setEnableMovement] = useState(false);
	const [showModal, setShowModal] = useState(false);
	const [tempSettings, setTempSettings] = useState({
		numCircles: 4,
		circleSizeKey: 'medium',
		enableMovement: false,
	});

	const gridRows = 3;
	const gridCols = 3;
	const circleSizes = {
		verySmall: 30,
		small: 40,
		medium: 50,
		large: 60,
		veryLarge: 70,
	};

	useEffect(() => {
		setCircleSize(circleSizes[circleSizeKey]);
		// eslint-disable-next-line
	}, [circleSizeKey]);

	useEffect(() => {
		if (enableMovement && gameState === 'playing') {
			const interval = setInterval(() => {
				setCircles((prevCircles) =>
					prevCircles.map((circle) => {
						const cellWidth = 600 / gridCols;
						const cellLeft = circle.cellX * cellWidth;
						const cellRight = cellLeft + cellWidth - circleSize;

						let newX = circle.x + circle.speedX;

						if (newX <= cellLeft || newX >= cellRight) {
							circle.speedX *= -1;
							newX = Math.max(cellLeft, Math.min(newX, cellRight));
						}

						return { ...circle, x: newX };
					})
				);
			}, 16);
			return () => clearInterval(interval);
		}
		// eslint-disable-next-line
	}, [enableMovement, gameState]);

	useEffect(() => {
		const token = sessionStorage.getItem('token');
		setIsLoggedIn(!!token);
		if (token) fetchScores();

		const handleLogin = () => {
			setIsLoggedIn(true);
			fetchScores();
		};

		const handleLogout = () => {
			setIsLoggedIn(false);
			setScores([]);
			resetGame();
		};

		window.addEventListener('userLoggedIn', handleLogin);
		window.addEventListener('userLoggedOut', handleLogout);

		return () => {
			window.removeEventListener('userLoggedIn', handleLogin);
			window.removeEventListener('userLoggedOut', handleLogout);
		};
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

	const generateGridPositions = () => {
		const positions = [];
		for (let row = 0; row < gridRows; row++) {
			for (let col = 0; col < gridCols; col++) {
				positions.push({ cellX: col, cellY: row });
			}
		}
		return positions;
	};

	const generateCircles = () => {
		const positions = generateGridPositions();
		const shuffledPositions = positions.sort(() => Math.random() - 0.5);
		const newCircles = shuffledPositions.slice(0, numCircles).map((pos) => ({
			cellX: pos.cellX,
			cellY: pos.cellY,
			x: pos.cellX * (600 / gridCols) + 600 / gridCols / 2 - circleSize / 2,
			y: pos.cellY * (600 / gridRows) + 600 / gridRows / 2 - circleSize / 2,
			speedX: Math.random() > 0.5 ? 2 : -2,
		}));
		setCircles(newCircles);
	};

	const handleCircleClick = (index) => {
		if (gameState !== 'playing') return;

		setScore((prev) => prev + 1);

		const positions = generateGridPositions();
		const availablePositions = positions.filter(
			(pos) =>
				!circles.some(
					(circle, circleIndex) =>
						circleIndex !== index &&
						circle.cellX === pos.cellX &&
						circle.cellY === pos.cellY
				)
		);

		if (availablePositions.length === 0) return;

		const newPosition =
			availablePositions[Math.floor(Math.random() * availablePositions.length)];

		setCircles((prev) =>
			prev.map((circle, circleIndex) =>
				circleIndex === index
					? {
							...circle,
							x:
								newPosition.cellX * (600 / gridCols) +
								600 / gridCols / 2 -
								circleSize / 2,
							y:
								newPosition.cellY * (600 / gridRows) +
								600 / gridRows / 2 -
								circleSize / 2,
							cellX: newPosition.cellX,
							cellY: newPosition.cellY,
							speedX: Math.random() > 0.5 ? 2 : -2,
					  }
					: circle
			)
		);
	};

	const sortScores = (key) => {
		let direction = 'asc';
		if (sortConfig.key === key && sortConfig.direction === 'asc') {
			direction = 'desc';
		}

		const sortedScores = [...scores].sort((a, b) => {
			if (key === 'points') {
				return direction === 'asc' ? a.points - b.points : b.points - a.points;
			}
			if (key === 'date') {
				return direction === 'asc'
					? new Date(a.date) - new Date(b.date)
					: new Date(b.date) - new Date(a.date);
			}
			return 0;
		});

		setScores(sortedScores);
		setSortConfig({ key, direction });
	};

	const getSortArrow = (key) => {
		if (!sortConfig.key) return '↕';
		if (sortConfig.key !== key) return '↕';
		return sortConfig.direction === 'asc' ? '↑' : '↓';
	};

	const saveScore = async () => {
		const token = sessionStorage.getItem('token');
		if (!isLoggedIn) {
			alert('Musisz się zalogować, aby zapisać wynik!');
			return;
		}

		if (isScoreSaved) {
			alert('Ten wynik został już zapisany!');
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
				setIsScoreSaved(true);
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

	const openModal = () => {
		setTempSettings({
			numCircles,
			circleSizeKey,
			enableMovement,
		});
		setShowModal(true);
	};

	const saveSettings = () => {
		setNumCircles(tempSettings.numCircles);
		setCircleSizeKey(tempSettings.circleSizeKey);
		setEnableMovement(tempSettings.enableMovement);
		setShowModal(false);
	};

	const cancelSettings = () => {
		setShowModal(false);
	};
	return (
		<div className={styles.aimTrainingGame}>
			<h1>Ćwiczenie Celności</h1>
			<button
				className={styles.settingsButton}
				onClick={openModal}
				disabled={gameState !== 'start'}
			>
				Ustawienia
			</button>
			<div className={styles.gameBoard}>
				{generateGridPositions().map((pos, index) => (
					<div
						key={index}
						className={styles.gridCell}
						style={{
							position: 'absolute',
							width: `${100 / gridCols}%`,
							height: `${100 / gridRows}%`,
							left: `calc(${(index % gridCols) * (100 / gridCols)}%)`,
							top: `calc(${Math.floor(index / gridCols) * (100 / gridRows)}%)`,
							border: '1px solid #ddd',
						}}
					></div>
				))}

				{circles.map((circle, index) => (
					<div
						key={index}
						className={styles.circle}
						style={{
							width: `${circleSize}px`,
							height: `${circleSize}px`,
							left: `${circle.x}px`,
							top: `${circle.y}px`,
							position: 'absolute',
						}}
						onClick={() => handleCircleClick(index)}
					></div>
				))}
				{gameState === 'finished' && (
					<div className={styles.finalScore}>Wynik: {score}</div>
				)}
			</div>
			<div className={styles.infoBar}>
				<p>Wynik: {score}</p>
				<p>Pozostały czas: {timeLeft}s</p>
				{gameState === 'playing' && (
					<button onClick={resetGame}>Zresetuj</button>
				)}
				{gameState === 'finished' && (
					<>
						<button onClick={saveScore}>Zapisz wynik</button>
						<button onClick={resetGame}>Nowa gra</button>
					</>
				)}
				{gameState === 'start' && (
					<button onClick={startGame}>Rozpocznij grę</button>
				)}
			</div>
			{showModal && (
				<div className={styles.modalOverlay}>
					<div className={styles.modal}>
						<h2>Ustawienia Gry</h2>
						<label>
							Liczba kulek (1-7):
							<select
								value={tempSettings.numCircles}
								onChange={(e) =>
									setTempSettings((prev) => ({
										...prev,
										numCircles: Number(e.target.value),
									}))
								}
							>
								{[...Array(7).keys()].map((num) => (
									<option key={num + 1} value={num + 1}>
										{num + 1}
									</option>
								))}
							</select>
						</label>
						<label>
							Rozmiar kulek:
							<select
								value={tempSettings.circleSizeKey}
								onChange={(e) =>
									setTempSettings((prev) => ({
										...prev,
										circleSizeKey: e.target.value,
									}))
								}
							>
								<option value='verySmall'>Bardzo Mała</option>
								<option value='small'>Mała</option>
								<option value='medium'>Średnia</option>
								<option value='large'>Duża</option>
								<option value='veryLarge'>Bardzo Duża</option>
							</select>
						</label>
						<label>
							<input
								type='checkbox'
								checked={tempSettings.enableMovement}
								onChange={(e) =>
									setTempSettings((prev) => ({
										...prev,
										enableMovement: e.target.checked,
									}))
								}
							/>
							Poruszanie się kulek
						</label>
						<div className={styles.modalButtons}>
							<button onClick={saveSettings}>Zapisz</button>
							<button onClick={cancelSettings}>Anuluj</button>
						</div>
					</div>
				</div>
			)}
			<div className={styles.scoresContainer}>
				<h3 className={styles.scoresTitle}>Twoje wyniki:</h3>
				<table className={styles.scoresTable}>
					<thead>
						<tr>
							<th>#</th>
							<th onClick={() => sortScores('points')}>
								Wynik (ms) {getSortArrow('points')}
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
