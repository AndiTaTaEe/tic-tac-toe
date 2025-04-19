import React, { useState } from "react";
import Board from "./Board.js";
import PlayerInput from "./PlayerInput.js";

const Game = () => {
  const [gameStarted, setGameStarted] = useState(false);
  const [players, setPlayers] = useState({
    playerOne: "",
    playerTwo: "",
  });
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  const handlePlayersConfirmed = (players) => {
    setPlayers(players);
    setGameStarted(true);
  };

  const onPlay = (nextSquares) => {
    const nextHistory = history.slice(0, currentMove + 1);
    setHistory(nextHistory.concat([nextSquares]));
    setCurrentMove(nextHistory.length);
  };

  const jumpToMove = (moveIndex) => {
    setCurrentMove(moveIndex);
  };

  const calculateWinner = (squares) => {
    if (!squares) {
      return null;
    }

    const rows = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
    ];

    for (let i = 0; i < rows.length; i++) {
      const [a, b, c] = rows[i];
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a];
      }
    }

    const cols = [
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
    ];

    for (let i = 0; i < cols.length; i++) {
      const [a, b, c] = cols[i];
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a];
      }
    }

    const diags = [
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < diags.length; i++) {
      const [a, b, c] = diags[i];
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a];
      }
    }
    return null;
  };

  const winner = calculateWinner(currentSquares);

  const moves = history.map((squares, moveIndex) => {
    if (currentMove === 0 && moveIndex > 0) {
      return null;
    }
    const description =
      moveIndex === 0 ? "Go to game start" : `Go to move #${moveIndex}`;

    return (
      <li key={moveIndex}>
        <button onClick={() => jumpToMove(moveIndex)}>{description}</button>
      </li>
    );
  });

  let status;
  if (winner) {
    const winnerName =
      winner === "X" ? players.playerOne || "X" : players.playerTwo || "O";
    status = `Winner: ${winnerName}`;
  } else if (
    currentSquares &&
    currentSquares.every((square) => square !== null)
  ) {
    status = "Draw!";
  } else {
    const playerName = xIsNext
      ? players.playerOne || "X"
      : players.playerTwo || "O";
    status = `Next player: ${playerName} (${xIsNext ? "X" : "O"})`;
  }

  if (!gameStarted) {
    return <PlayerInput onPlayersConfirmed={handlePlayersConfirmed} />;
  }

  return (
    <div className="game">
      <div className="status">{status}</div>
      <div className="game-board">
        <Board squares={currentSquares} onPlay={onPlay} xIsNext={xIsNext} calculateWinner={calculateWinner} />
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  );
};

export default Game;
