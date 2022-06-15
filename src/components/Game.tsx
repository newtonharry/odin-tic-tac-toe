import React, { useEffect, useState } from "react";
import "./Game.css";

type Cell = string;

type Cells = Cell[];

type Props = {
  gameType: number;
};

export const Game: React.FC<Props> = ({ gameType }) => {
  const [cells, setCells] = useState<Cells>([
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
  ]);
  const [winner, setWinner] = useState<string | null>(null);
  const [shape, setShape] = useState<Cell>("X");

  const placeTurn = (index: number) => {
    // If the game is multiplayer set the clicked cell to the current turn choice
    // If the game is against the computer and if the current turn is the players, set the clicked cell to the current choice, otherwise let the computer make the choice
    if (cells[index] === "" && winner == null) {
      setCells(
        cells.map((cell, i) => {
          if (i === index) {
            return shape;
          }
          return cell;
        })
      );
      setShape(shape === "X" ? "O" : "X");
    }
  };

  const resetBoard = () => {
    setCells(cells.map((cell) => ""));
    setShape("");
    setWinner(null);
  };

  // Check for a winner
  useEffect(() => {
    let potentialWins = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    potentialWins.every((win) => {
      if (
        cells[win[0]] !== "" &&
        cells[win[0]] === cells[win[1]] &&
        cells[win[0]] == cells[win[2]]
      ) {
        setWinner(cells[win[0]]);
        return false; // Break out of the loop
      }
      // If the loop has not broken out, there is no winner
      if (cells.every((cell) => cell !== "")) {
        setWinner("draw");
      }
      return true;
    });
  }, [cells]);

  return (
    <>
      <div className="game-result">
        {winner && (
          <h2 className="fade-in-text">
            {winner === "draw" ? "It's a draw!" : `${winner} wins!`}
          </h2>
        )}
      </div>
      <div className="game-board">
        {cells.map((cell, index) => (
          <div
            onClick={(event) => placeTurn(index)}
            key={index}
            className="cell"
          >
            {cell !== "" && <p className={"fade-in-text"}>{cell}</p>}
          </div>
        ))}
      </div>
      <button className="reset" onClick={resetBoard}>
        Reset
      </button>
    </>
  );
};
