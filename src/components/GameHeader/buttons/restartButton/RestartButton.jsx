import { useContext } from 'react'
import './../Buttons.css'
import { GameContext } from '../../../../context/GameContext'

const RestartButton = () => {
  const { handleRestartStart} = useContext(GameContext)

  return <button className="header-button" onClick={handleRestartStart}>Reset Game</button>
}

export default RestartButton