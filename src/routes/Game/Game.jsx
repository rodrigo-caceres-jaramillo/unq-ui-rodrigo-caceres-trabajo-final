import { useContext } from "react"
import { GameContext } from "../../context/gameContext"
import Inventory from "../../components/inventory/Inventory"
import GameBoard from "../../components/Board/GameBoard"
import './Game.css'
import StartButton from "../../components/Buttons/Start/StartButton"
import RestartButton from "../../components/Buttons/restart/RestartButton"

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