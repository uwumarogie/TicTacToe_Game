import React, { useState } from "react";
import "./App.css";

const App = () => {
  const initialBoardState = Array(9).fill(null);

  const [board, setBoard] = useState(initialBoardState);
  const [player, setPlayer] = useState("X");

  const handleSquareClick = (index) => {
    if (board[index] !== null) {
      return;
    }

    const newBoard = [...board];
    newBoard[index] = player;

    setBoard(newBoard);
    setPlayer(player === "X" ? "O" : "X");
  };

  const getWinner = () => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    const winner = lines.find(
      ([a, b, c]) => board[a] && board[a] === board[b] && board[a] === board[c]
    );

    if (winner) {
      return board[winner[0]];
    }
    return null;
  };

  const renderSquare = (index) => (
    <button className="square" onClick={() => handleSquareClick(index)}>
      {board[index]}
    </button>
  );

  const resetBoard = () => {
    setBoard(initialBoardState);
    setPlayer("X");
  };

  const winner = getWinner();

  return (
    <div className="board">
      <div className="status">{winner ? `Winner: ${winner}` : `DRAW`}</div>
      {[0, 1, 2].map((row) => (
        <div className="row" key={row}>
          {[0, 1, 2].map((col) => renderSquare(row * 3 + col))}
        </div>
      ))}

      <div className="reset-button">
        <button type="reset" onClick={resetBoard}>
          Reset
        </button>
      </div>
    </div>
  );
};

export default App;
