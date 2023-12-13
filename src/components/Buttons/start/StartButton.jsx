import { useContext } from 'react'
import './StartButton.css'
import { GameContext } from '../../../context/GameContext'

const StartButton = () => {
  const { handleGameStart, playerShips } = useContext(GameContext)
  return <button className="start"  onClick={handleGameStart}>Start Game</button>
}

export default StartButton