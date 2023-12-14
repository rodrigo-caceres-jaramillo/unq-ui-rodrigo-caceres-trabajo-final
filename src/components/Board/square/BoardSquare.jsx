import { useContext } from 'react'
import './BoardSquare.css'
import { GameContext } from '../../../context/GameContext'

const BoardSquare = ({rowIndex, columnIndex, code, own}) => {
  const { startGame, placeClick, shipSelected, attackClick } = useContext(GameContext)

  const hadlerClick = () => { 
    if(!startGame) {
      placeClick(rowIndex, columnIndex, code > 9)
    } else {
      if(own || code === 2 || code ===3){
        return
      }else{
        attackClick(rowIndex, columnIndex, code)
      }
    }
  }

  return <div 
            className={`square 
              ${shipSelected ? 'selected' : ''}
              ${own && startGame? 'placed' : ''} 
              ${!own ? 'attacking' : ''} 
              ${code > 9  ? 'ship' : ''} 
              ${code === 2 ? 'strike' : ''}
              ${code === 3 ? 'water' : ''}`}
            onClick={() => hadlerClick()}/>
}

export default BoardSquare