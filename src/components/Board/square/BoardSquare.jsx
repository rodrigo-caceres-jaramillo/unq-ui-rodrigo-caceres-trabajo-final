import { useContext } from 'react'
import './BoardSquare.css'
import { GameContext } from '../../../context/GameContext'

const BoardSquare = ({rowIndex, columnIndex, hasShip, striked, water, computer}) => {
  const { startGame, placeClick, shipSelected, attackClick } = useContext(GameContext)

  const hadlerClick = () => { 
    if(!startGame) {
      placeClick(rowIndex, columnIndex, hasShip)
    } else {
      attackClick(rowIndex, columnIndex, hasShip, computer)
    }
  }

  return <div 
            className={`square 
              ${shipSelected ? 'selected' : ''} 
              ${hasShip ? 'ship' : ''} 
              ${striked ? 'strike' : ''}
              ${water ? 'water' : ''}`}
            onClick={() => hadlerClick()}/>
}

export default BoardSquare