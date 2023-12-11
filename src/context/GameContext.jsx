import { createContext } from "react"

export const GameContext = createContext({})

export const GameProvider = ({ children }) => {
  return (
    <GameContext.Provider value={{
      
    }}
    >
      {children}
    </GameContext.Provider>
  )
}