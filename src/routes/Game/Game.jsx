import { useContext } from "react"
import Inventory from "../../components/inventory/Inventory"
import GameBoard from "../../components/Board/GameBoard"
import './Game.css'
import { GameContext } from "../../context/GameContext"
import GameHeader from "../../components/GameHeader/GameHeader"
import Ships from "../../components/Ships/Ships"
import GameCounter from "../../components/GameCounter/GameCounter"

const Game = () => {
  const { startGame, playerBoard, computerBoard, playerPlacedShips, computerPlacedShips } = useContext(GameContext)

  return (
    <div id="game">
      <GameHeader />
      <div className="content">
        {startGame ? <Ships ships={playerPlacedShips} text={"Aliados"} /> : null}
        <GameBoard title={"Tu Tablero"} board={playerBoard} own={true}/>
        {startGame ? <GameBoard title={"Computadora"} board={computerBoard} own={false}/> : <Inventory />}
        {startGame ? <Ships ships={computerPlacedShips} text={"Enemigos"} /> : null}
      </div>
      <GameCounter />
    </div>
  )
}

export default Game