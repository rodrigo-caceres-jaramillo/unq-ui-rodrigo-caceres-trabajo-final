import { useContext } from "react"
import { GameContext } from "../../../context/GameContext"

const PlayAgainButton = () => {
  const { handleRestartStart} = useContext(GameContext)

  return <button className="header-button" onClick={handleRestartStart}>Jugar de nuevo</button>
}

export default PlayAgainButton