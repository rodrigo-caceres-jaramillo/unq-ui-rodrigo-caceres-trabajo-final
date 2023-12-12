import BoardSquare from "./square/BoardSquare"
import './GameBoard.css'
import { useContext } from "react"
import { GameContext } from "../../context/GameContext"

const GameBoard = ({ title }) => {
  const { playerBoard } = useContext(GameContext);

  const renderBoard = () => {
    return playerBoard.map((row, rowIndex) => {
      return row.map((cell, columnIndex) => {
        return (
          <BoardSquare
            key={`${rowIndex}-${columnIndex}`}
            rowIndex={rowIndex}
            columnIndex={columnIndex}
            hasShip={cell === 1}
            striked={cell === 2}
          />
        );
      });
    });
  };

  return (
    <div className="game-board">
      <h1>{title}</h1>
      <div className="board">{renderBoard()}</div>
    </div>
  );
};

export default GameBoard