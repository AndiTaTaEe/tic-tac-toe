import React from "react";
import Square from "./Square.js";

const Board = ({ squares = Array(9).fill(null), onPlay, xIsNext, calculateWinner }) => {
  const handleClick = (i) => {
    if (!squares){
      return ;
    }
    const nextSquares = squares.slice();

    const winner = calculateWinner(squares);
    if (winner || squares[i] !== null) {
      return;
    }
    nextSquares[i] = xIsNext ? "X" : "O";
    onPlay(nextSquares);
  };

  

  return (
    <>
      <div className="board-row">
        <Square value={squares[0]} onClick={() => handleClick(0)}></Square>
        <Square value={squares[1]} onClick={() => handleClick(1)}></Square>
        <Square value={squares[2]} onClick={() => handleClick(2)}></Square>
      </div>

      <div className="board-row">
        <Square value={squares[3]} onClick={() => handleClick(3)}></Square>
        <Square value={squares[4]} onClick={() => handleClick(4)}></Square>
        <Square value={squares[5]} onClick={() => handleClick(5)}></Square>
      </div>

      <div className="board-row">
        <Square value={squares[6]} onClick={() => handleClick(6)}></Square>
        <Square value={squares[7]} onClick={() => handleClick(7)}></Square>
        <Square value={squares[8]} onClick={() => handleClick(8)}></Square>
      </div>
    </>
  );
};

export default Board;
