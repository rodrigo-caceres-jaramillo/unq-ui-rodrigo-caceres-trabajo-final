import { createContext, useState } from "react"
import { SHIPS } from "./db"

export const GameContext = createContext({})

export const GameProvider = ({ children }) => {
  const [startGame, setStartGame] = useState(false)
  const [shipSelected, setShipSelected] = useState()
  // Player
  const [playerShips, setPlayerShips] = useState(SHIPS)
  const [playerDirection, setPlayerDirection] = useState("horizontal")
  // Computer
  const [computerShips, setComputerShips] = useState(SHIPS)

  const handleGameStart = () => {
      setStartGame(true)
      console.log(startGame)
  }

  return (
    <GameContext.Provider value={{
      startGame,
      playerShips,
      setPlayerShips,
      handleGameStart,
    }}
    >
      {children}
    </GameContext.Provider>
  )
}