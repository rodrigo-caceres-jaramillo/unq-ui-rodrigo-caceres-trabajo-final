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
            code={cell}
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