import { useContext } from "react"
import { GameContext } from "../../context/GameContext"
import './GameCounter.css'

const GameCounter = () => {
  const { playerWins, computerWins} = useContext(GameContext)

  return (
    <div className="counter">
      <div className="block">Jugador: {playerWins} </div>
      <div className="block">Computadora: {computerWins} </div>
    </div>)
}

export default GameCounter