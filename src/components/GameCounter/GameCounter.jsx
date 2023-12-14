import { useContext } from "react"
import { GameContext } from "../../context/GameContext"

const GameCounter = () => {
  const { playerWins, computerWins} = useContext(GameContext)

  return (
    <div className="counter">
      <span>Jugador:</span>
      <span>{playerWins}</span>
      <span>Computadora:</span>
      <span>{computerWins}</span>
    </div>)
}

export default GameCounter