import React, { useState, useEffect } from "react";
import styles from "../styles/ReactionTimeGame.module.css";
import Modal from "./Modal";
import Login from "../auth/Login";

const ReactionTimeGame = () => {
  const [gameState, setGameState] = useState("start"); // "start", "waiting", "ready", "result", "error"
  const [reactionTime, setReactionTime] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [timeoutId, setTimeoutId] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Stan logowania
  const [showLoginModal, setShowLoginModal] = useState(false); // Modal logowania
  const [scores, setScores] = useState([]); // Historia wyników użytkownika
  const [pendingScore, setPendingScore] = useState(null); // Wynik oczekujący na zapis po zalogowaniu

  // Sprawdzanie, czy użytkownik jest zalogowany
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token); // Sprawdź, czy token istnieje
  }, []);

  // Losowanie czasu i przygotowanie do gry
  const startGame = () => {
    setGameState("waiting");
    setReactionTime(null);

    const randomDelay = Math.floor(Math.random() * 2000) + 1000;
    const timeout = setTimeout(() => {
      setGameState("ready");
      setStartTime(Date.now());
    }, randomDelay);

    setTimeoutId(timeout);
  };

  // Obsługa kliknięcia w czasie gry
  const handleClick = () => {
    if (gameState === "waiting") {
      clearTimeout(timeoutId);
      setGameState("error");
    } else if (gameState === "ready") {
      const endTime = Date.now();
      setReactionTime(endTime - startTime);
      setGameState("result");
    }
  };

  // Pobieranie wyników użytkownika
  const fetchScores = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch("http://localhost:5000/scores", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setScores(data); // Ustaw historię wyników
      } else {
        console.error("Błąd podczas pobierania wyników:", response.statusText);
      }
    } catch (error) {
      console.error("Błąd podczas komunikacji z serwerem:", error);
    }
  };

  // Zapis wyniku
  const saveScore = async () => {
    if (!isLoggedIn) {
      setPendingScore(reactionTime); // Ustaw wynik oczekujący
      setShowLoginModal(true); // Otwórz modal logowania
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:5000/score", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ time: reactionTime }),
      });

      if (response.ok) {
        alert("Wynik zapisany pomyślnie!");
        fetchScores(); // Odśwież historię wyników
      } else {
        const data = await response.json();
        console.error("Błąd podczas zapisywania wyniku:", data.error);
        alert(`Nie udało się zapisać wyniku: ${data.error}`);
      }
    } catch (error) {
      console.error("Błąd podczas komunikacji z serwerem:", error);
      alert("Wystąpił błąd podczas zapisywania wyniku. Spróbuj ponownie później.");
    }
  };

  // Obsługa sukcesu logowania
  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    setShowLoginModal(false); // Zamknij modal logowania
    if (pendingScore !== null) {
      setReactionTime(pendingScore);
      saveScore(); // Zapisz wynik oczekujący
      setPendingScore(null); // Wyzeruj wynik oczekujący
    }
    fetchScores(); // Pobierz historię wyników
  };

  // Ikony i komunikaty w zależności od wyniku
  const getResultDetails = () => {
    if (reactionTime <= 250) {
      return { icon: "⚡", message: "Amazing speed!" };
    } else if (reactionTime > 250 && reactionTime <= 350) {
      return { icon: "❗", message: "Good, but you can do better!" };
    } else {
      return { icon: "🐢", message: "Too slow! Try again." };
    }
  };

  return (
    <div className={styles.reactionTimeGame}>
      {gameState === "start" && (
        <div className={styles.startScreen}>
          <h1>Reaction Time</h1>
          <button className={styles.startButton} onClick={startGame}>
            Start Game
          </button>
        </div>
      )}

      {gameState === "waiting" && (
        <div className={`${styles.gameScreen} ${styles.waiting}`} onClick={handleClick}>
          Wait for GREEN...
        </div>
      )}

      {gameState === "ready" && (
        <div className={`${styles.gameScreen} ${styles.ready}`} onClick={handleClick}>
          Click NOW!
        </div>
      )}

      {gameState === "error" && (
        <div className={`${styles.gameScreen} ${styles.error}`}>
          <h2>Too early! Wait for the green screen.</h2>
          <button className={styles.retryButton} onClick={() => setGameState("start")}>
            Try Again
          </button>
        </div>
      )}

      {gameState === "result" && (
        <div className={styles.resultScreen}>
          <div className={styles.resultIcon}>{getResultDetails().icon}</div>
          <h2>Reaction Time</h2>
          <p className={styles.reactionTime}>{reactionTime}ms</p>
          <p>{getResultDetails().message}</p>
          <div className={styles.resultButtons}>
            <button className={styles.saveButton} onClick={saveScore}>
              Save Score
            </button>
            <button className={styles.retryButton} onClick={() => setGameState("start")}>
              Try Again
            </button>
          </div>
        </div>
      )}

      <div>
        <h3>Your Scores:</h3>
        <ul>
          {scores.map((score, index) => (
            <li key={index}>
              Czas: {score.time}ms, Data: {new Date(score.date).toLocaleString()}
            </li>
          ))}
        </ul>
      </div>

      {showLoginModal && (
        <Modal onClose={() => setShowLoginModal(false)}>
          <Login onLoginSuccess={handleLoginSuccess} />
        </Modal>
      )}
    </div>
  );
};

export default ReactionTimeGame;
