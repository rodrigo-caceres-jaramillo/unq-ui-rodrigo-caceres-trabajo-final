import { useContext } from 'react'
import './../Buttons.css'
import { GameContext } from '../../../../context/GameContext'


const StartButton = () => {
  const { handleGameStart} = useContext(GameContext)
  
  return <button className="header-button" onClick={handleGameStart}>Comenzar</button>
}

export default StartButton