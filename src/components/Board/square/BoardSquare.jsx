import { useContext } from 'react'
import './BoardSquare.css'
import { GameContext } from '../../../context/GameContext'

const BoardSquare = ({rowIndex, columnIndex, hasShip, striked, computer}) => {
  const { placeClick, shipSelected, attackClick } = useContext(GameContext)

  const hadlerClick = () => { 
    if(computer) {
      attackClick()
    } else {
      placeClick(rowIndex, columnIndex, hasShip)
    }
  }

  return <div 
            className={`square ${shipSelected ? 'active' : ''} ${hasShip ? 'ship' : ''} ${striked ? 'striked' : ''}`}
            onClick={() => hadlerClick()}/>
}

export default BoardSquare