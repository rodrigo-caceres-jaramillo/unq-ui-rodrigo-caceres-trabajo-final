import { useContext } from "react"
import Inventory from "../../components/inventory/Inventory"
import GameBoard from "../../components/Board/GameBoard"
import './Game.css'
import RestartButton from "../../components/Buttons/restart/RestartButton"
import StartButton from "../../components/Buttons/start/StartButton"
import { GameContext } from "../../context/GameContext"

const Game = () => {
  const { startGame } = useContext(GameContext)

  return (
    <div id="game">
      {startGame ? <RestartButton/> : null}
      <StartButton />
      <div className="content">
      <GameBoard title={"Tu Tablero"}/>
      {startGame ? <GameBoard title={"Computadora"}/> : <Inventory />}
      </div>
    </div>
  )
}

export default Game