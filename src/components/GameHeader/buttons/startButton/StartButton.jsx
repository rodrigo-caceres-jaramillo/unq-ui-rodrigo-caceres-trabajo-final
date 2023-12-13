import { useContext } from 'react'
import './../Buttons.css'
import { GameContext } from '../../../../context/GameContext'


const StartButton = () => {
  const { handleGameStart} = useContext(GameContext)
  
  return <button className="header-button" onClick={handleGameStart}>Start Game</button>
}

export default StartButton