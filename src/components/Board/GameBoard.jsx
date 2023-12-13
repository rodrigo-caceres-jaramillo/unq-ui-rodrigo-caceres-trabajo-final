import BoardSquare from "./square/BoardSquare"
import './GameBoard.css'

const GameBoard = ({ title, board, own}) => {

  const renderBoard = () => {
    return board.map((row, rowIndex) => {
      return row.map((cell, columnIndex) => {
        return (
          <BoardSquare
            key={`${rowIndex}-${columnIndex}`}
            rowIndex={rowIndex}
            columnIndex={columnIndex}
            hasShip={cell === 1}
            striked={cell === 2}
            water= {cell ===3}
            own={own}
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