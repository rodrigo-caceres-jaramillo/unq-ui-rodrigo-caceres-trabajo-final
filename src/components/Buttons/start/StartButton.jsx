import { useContext } from 'react'
import './StartButton.css'
import { GameContext } from '../../../context/gameContext'

const StartButton = () => {
  const { handleGameStart } = useContext(GameContext)

  return <button className="start" onClick={handleGameStart}>Start Game</button>
}

export default StartButton