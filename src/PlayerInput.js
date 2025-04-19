import React, { useState } from "react";

const PlayerInput = ({ onPlayersConfirmed }) => {
  const [playerOne, setPlayerOne] = useState("");
  const [playerTwo, setPlayerTwo] = useState("");
  const [error, setError] = useState("");

  const handlePlayersSubmit = (e) => {
    e.preventDefault();

    if (!playerOne.trim() || !playerTwo.trim()) {
      setError("Please enter both player names.");
      return;
    }
    if (playerOne.trim() === playerTwo.trim()) {
      setError("Player names must be different.");
      return;
    }

    onPlayersConfirmed({
      playerOne: playerOne.trim(),
      playerTwo: playerTwo.trim(),
    });
  };

  return (
    <div className="player-input-container">
      <h2>Enter player names</h2>
      {error && <div className="error">{error}</div>}
      <form onSubmit={handlePlayersSubmit}>
        <div className="input-group">
          <label htmlFor="playerOne">Player X: </label>
          <input
            type="text"
            id="playerOne"
            value={playerOne}
            onChange={(e) => setPlayerOne(e.target.value)}
            placeholder="Enter name for Player X"
          />
        </div>
        <div className="input-group">
          <label htmlFor="playerTwo">Player O: </label>
          <input
            type="text"
            id="playerTwo"
            value={playerTwo}
            onChange={(e) => setPlayerTwo(e.target.value)}
            placeholder="Enter name for Player O"
          />
        </div>
        <button type="submit" className="submit-button">
          {" "}
          Start Game{" "}
        </button>
      </form>
    </div>
  );
};

export default PlayerInput;
