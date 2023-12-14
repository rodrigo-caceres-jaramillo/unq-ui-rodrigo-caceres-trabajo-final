import { useContext } from "react"
import { GameContext } from "../../context/GameContext"

import './GameHeader.css'
import StartButton from "./buttons/startButton/StartButton"
import RestartButton from "./buttons/restartButton/RestartButton"

const GameHeader = () => {
  const { startGame, playerShips} = useContext(GameContext)
  return (
    <div className="game-header">
      {startGame ? <h2>ATACA AL OPONENTE</h2> : <h2>PREPARA TUS BARCOS</h2>}
      <div className="buttons">
        {!startGame && playerShips.length === 0 && <StartButton />}
        <RestartButton/>
      </div>
    </div>
  )
}

export default GameHeader