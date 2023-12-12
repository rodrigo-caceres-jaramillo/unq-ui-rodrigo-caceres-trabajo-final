import { useContext } from 'react'
import './BoardSquare.css'
import { GameContext } from '../../../context/GameContext'

const BoardSquare = ({rowIndex, columnIndex, hasShip, striked}) => {
  const { boardClick, shipSelected } = useContext(GameContext)

  return <div 
            className={`square ${shipSelected ? 'active' : ''} ${hasShip ? 'ship' : ''} ${striked ? 'striked' : ''}`}
            onClick={() => boardClick(rowIndex, columnIndex, hasShip)}/>
}

export default BoardSquare