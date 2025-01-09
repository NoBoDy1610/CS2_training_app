import React, { useState, useEffect } from 'react';
import styles from '../styles/ReactionTimeGame.module.css';

const ReactionTimeGame = () => {
	const [gameState, setGameState] = useState('start');
	const [reactionTime, setReactionTime] = useState(null);
	const [startTime, setStartTime] = useState(null);
	const [timeoutId, setTimeoutId] = useState(null);
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [scores, setScores] = useState([]);
	const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
	const [isScoreSaved, setIsScoreSaved] = useState(false); // Zapobieganie wielokrotnemu zapisowi

	useEffect(() => {
		const token = sessionStorage.getItem('token');
		setIsLoggedIn(!!token);
		if (token) fetchScores();
	  }, []);
	  

	  useEffect(() => {
		const token = sessionStorage.getItem('token');
		setIsLoggedIn(!!token);
	  
		const handleLogin = () => {
		  setIsLoggedIn(true);
		  fetchScores();
		};
	  
		const handleLogout = () => {
		  setIsLoggedIn(false);
		  setScores([]);
		};
	  
		window.addEventListener('userLoggedIn', handleLogin);
		window.addEventListener('userLoggedOut', handleLogout);
	  
		return () => {
		  window.removeEventListener('userLoggedIn', handleLogin);
		  window.removeEventListener('userLoggedOut', handleLogout);
		};
	  }, []);
	  

	const startGame = () => {
		setGameState('waiting');
		setReactionTime(null);
		setIsScoreSaved(false); // Reset możliwości zapisu wyniku

		const randomDelay = Math.floor(Math.random() * 2000) + 1000;
		const timeout = setTimeout(() => {
			setGameState('ready');
			setStartTime(Date.now());
		}, randomDelay);

		setTimeoutId(timeout);
	};

	const handleClick = () => {
		if (gameState === 'waiting') {
			clearTimeout(timeoutId);
			setGameState('error');
		} else if (gameState === 'ready') {
			const endTime = Date.now();
			setReactionTime(endTime - startTime);
			setGameState('result');
		}
	};

	const fetchScores = async () => {
		const token = sessionStorage.getItem('token');
		if (!token) {
			console.error('Brak tokena. Użytkownik musi się zalogować.');
			return;
		}
	
		try {
			const response = await fetch('http://localhost:5000/scores', {
				method: 'GET',
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
	
			if (response.ok) {
				const data = await response.json();
				setScores(data); // Ustaw wyniki
			} else {
				console.error('Błąd podczas pobierania wyników:', response.statusText);
			}
		} catch (error) {
			console.error('Błąd podczas komunikacji z serwerem:', error);
		}
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
	
		if (!token) {
			alert('Nie udało się zapisać wyniku. Zaloguj się ponownie.');
			return;
		}
	
		try {
			const response = await fetch('http://localhost:5000/score', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`, // Przesyłanie tokena w nagłówkach
				},
				body: JSON.stringify({ time: reactionTime }),
			});
	
			if (response.ok) {
				alert('Wynik zapisany pomyślnie!');
				setIsScoreSaved(true); // Zablokuj ponowny zapis
				fetchScores(); // Odśwież wyniki
			} else {
				const data = await response.json();
				alert(`Nie udało się zapisać wyniku: ${data.error}`);
			}
		} catch (error) {
			alert(
				'Wystąpił błąd podczas zapisywania wyniku. Spróbuj ponownie później.'
			);
			console.error('Błąd zapisu wyniku:', error);
		}
	};
	
	const sortScores = (key) => {
		let direction = 'asc';
		if (sortConfig.key === key && sortConfig.direction === 'asc') {
			direction = 'desc';
		}

		const sortedScores = [...scores].sort((a, b) => {
			if (key === 'time') {
				return direction === 'asc' ? a.time - b.time : b.time - a.time;
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
		if (sortConfig.key !== key) {
			return '↕';
		}
		return sortConfig.direction === 'asc' ? '↑' : '↓';
	};

	const getResultDetails = () => {
		if (reactionTime <= 250) {
			return { icon: '⚡', message: 'Niesamowita szybkość!' };
		} else if (reactionTime > 250 && reactionTime <= 350) {
			return { icon: '👌', message: 'Dobrze, ale możesz zrobić to lepiej!' };
		} else {
			return { icon: '🐢', message: 'Zbyt wolno! Spróbuj ponownie.' };
		}
	};

	return (
		<div className={styles.reactionTimeGame}>
			{/* Kontener główny gry */}
			<div className={styles.gameContainer}>
				{gameState === 'start' && (
					<div className={styles.startScreen}>
						<h1>Czas reakcji</h1>
						<button className={styles.startButton} onClick={startGame}>
							Start gry
						</button>
					</div>
				)}

				{gameState === 'waiting' && (
					<div
						className={`${styles.gameScreen} ${styles.waiting}`}
						onClick={handleClick}
					>
						Zaczekaj na zielone...
					</div>
				)}

				{gameState === 'ready' && (
					<div
						className={`${styles.gameScreen} ${styles.ready}`}
						onClick={handleClick}
					>
						Kliknij teraz!
					</div>
				)}

				{gameState === 'error' && (
					<div className={`${styles.gameScreen} ${styles.error}`}>
						<div className={styles.errorContent}>
							<h2 className={styles.errorTitle}>Za wcześnie!</h2>
							<p className={styles.errorMessage}>
								Poczekaj na zielony ekran i spróbuj ponownie.
							</p>
							<button
								className={styles.retryButton}
								onClick={() => setGameState('start')}
							>
								Spróbuj ponownie
							</button>
						</div>
					</div>
				)}

				{gameState === 'result' && (
					<div className={styles.resultScreen}>
						<div className={styles.resultIcon}>{getResultDetails().icon}</div>
						<h2>Twój czas reakcji</h2>
						<p className={styles.reactionTime}>{reactionTime}ms</p>
						<p>{getResultDetails().message}</p>
						<div className={styles.resultButtons}>
							<button className={styles.saveButton} onClick={saveScore}>
								Zapisz wynik
							</button>
							<button
								className={styles.retryButton}
								onClick={() => setGameState('start')}
							>
								Spróbuj ponownie
							</button>
						</div>
					</div>
				)}
			</div>

			{/* Sekcja wyników */}
			<div className={styles.scoresSection}>
				<h3>Twoje wyniki:</h3>
				{isLoggedIn ? (
					scores.length > 0 ? (
						<table className={styles.scoresTable}>
							<thead>
								<tr>
									<th>#</th>
									<th onClick={() => sortScores('time')}>
										Wynik (ms) {getSortArrow('time')}
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
										<td>{score.time}</td>
										<td>{new Date(score.date).toLocaleString()}</td>
									</tr>
								))}
							</tbody>
						</table>
					) : (
						<p className={styles.noScoresMessage}>
							Brak wyników. Rozpocznij grę, aby zobaczyć swoje wyniki!
						</p>
					)
				) : (
					<p className={styles.noScoresMessage}>
						Zaloguj się, aby zobaczyć swoje wyniki!
					</p>
				)}
			</div>
		</div>
	);
};

export default ReactionTimeGame;
