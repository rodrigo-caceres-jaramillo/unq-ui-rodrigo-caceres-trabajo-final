import { useContext } from "react"
import Inventory from "../../components/inventory/Inventory"
import GameBoard from "../../components/Board/GameBoard"
import './Game.css'
import { GameContext } from "../../context/GameContext"
import GameHeader from "../../components/GameHeader/GameHeader"

const Game = () => {
  const { startGame, playerBoard, computerBoard } = useContext(GameContext)

  return (
    <div id="game">
      <GameHeader />
      <div className="content">
      <GameBoard title={"Tu Tablero"} board={playerBoard} own={true}/>
      {startGame ? <GameBoard title={"Computadora"} board={computerBoard} own={false}/> : <Inventory />}
      </div>
    </div>
  )
}

export default Game