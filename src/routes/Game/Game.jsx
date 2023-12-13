import { useContext } from "react"
import Inventory from "../../components/inventory/Inventory"
import GameBoard from "../../components/Board/GameBoard"
import './Game.css'
import RestartButton from "../../components/Buttons/restart/RestartButton"
import StartButton from "../../components/Buttons/start/StartButton"
import { GameContext } from "../../context/GameContext"

const Game = () => {
  const { startGame, playerBoard, computerBoard, playerShips} = useContext(GameContext)

  return (
    <div id="game">
      {startGame ? <RestartButton/> : null}
      {playerShips.length === 0 ? <StartButton /> : null}
      <div className="content">
      <GameBoard title={"Tu Tablero"} board={playerBoard} />
      {startGame ? <GameBoard title={"Computadora"} board={computerBoard} computer/> : <Inventory />}
      </div>
    </div>
  )
}

export default Game