import React, { useState } from "react";
import styles from "../styles/ReactionTimeGame.module.css";

const ReactionTimeGame = ({ token }) => {
  const [gameState, setGameState] = useState("start"); // "start", "waiting", "ready", "result", "error"
  const [reactionTime, setReactionTime] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [timeoutId, setTimeoutId] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null); // Dla ekranu błędu

  const startGame = () => {
    setGameState("waiting");
    setReactionTime(null);
    setErrorMessage(null);

    // Losowy czas (1-3 sekundy)
    const randomDelay = Math.floor(Math.random() * 2000) + 1000;

    const timeout = setTimeout(() => {
      setGameState("ready");
      setStartTime(Date.now());
    }, randomDelay);

    setTimeoutId(timeout);
  };

  const handleClick = () => {
    if (gameState === "waiting") {
      // Kliknięcie za wcześnie
      clearTimeout(timeoutId);
      setGameState("error");
      setErrorMessage("Too early! Wait for the green screen.");
    } else if (gameState === "ready") {
      const endTime = Date.now();
      const time = endTime - startTime;
      setReactionTime(time);
      setGameState("result");
    }
  };

  const saveScore = async () => {
    if (!token) {
      alert("You must be logged in to save your score!");
      return;
    }

    if (reactionTime) {
      try {
        const response = await fetch("http://localhost:5000/score", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token, time: reactionTime }),
        });

        if (response.ok) {
          alert("Score saved successfully!");
        } else {
          const data = await response.json();
          alert(`Error: ${data.error}`);
        }
      } catch (error) {
        console.error("Error saving score:", error);
        alert("Failed to save score. Please try again later.");
      }
    }
  };

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
          <h2>{errorMessage}</h2>
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
    </div>
  );
};

export default ReactionTimeGame;
