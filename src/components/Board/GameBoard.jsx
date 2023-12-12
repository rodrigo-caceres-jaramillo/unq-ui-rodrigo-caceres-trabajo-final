import BoardSquare from "./square/BoardSquare"
import './GameBoard.css'

const GameBoard = ({title}) => {
  const squares = []
  
  for (let i = 0; i < 100; i++) {
    squares.push(<BoardSquare key={i}/>)
    }
  
  return (
    <div className="game-board">
      <h1>{title}</h1>
      <div className="board">{squares}</div>
    </div>   
  )
}

export default GameBoard