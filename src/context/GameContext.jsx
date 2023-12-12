import { createContext, useState } from "react"
import { BOARD, SHIPS } from "./db"

export const GameContext = createContext({})

export const GameProvider = ({ children }) => {
  const [startGame, setStartGame] = useState(false)
  const [playerShips, setPlayerShips] = useState(SHIPS)
  const [playerDirection, setPlayerDirection] = useState(true)
  const [shipSelected, setShipSelected] = useState()
  const [playerBoard, setPlayerBoard] = useState(BOARD);

  const handleGameStart = () => {
    setStartGame(true)
  }

  const selectDirection = (direction) => {
    setPlayerDirection(direction)
    setShipSelected(null)
    console.log(playerDirection)
  }

  const selectShip = (ship) => {
    setShipSelected(ship)
  }

  const boardClick = ( rowIndex, columnIndex, hasShip) => {
    if(startGame){
      return
    }
    else if (shipSelected) {
      if (hasShip) {
        console.log("Ya hay un barco en esta posicion");
      } else if (hasEnoughtSpace(rowIndex, columnIndex)) {
          placeShip(rowIndex, columnIndex)
        } else {
          console.log("No se puede colocar en esa posicion");
      }
    }
  }

  const hasEnoughtSpace = (rowIndex, columnIndex) => {
    const shipLength = shipSelected.shipLength
    if (playerDirection) {
      if (columnIndex + shipLength > 10) {
        return false;
      }
      for (let i = columnIndex; i < columnIndex + shipLength; i++) {
        if (playerBoard[rowIndex][i] === 1) {
          return false;
        }
      }
    } else {
      if (rowIndex + shipLength > 10) {
        return false;
      }
      for (let i = rowIndex; i < rowIndex + shipLength; i++) {
        if (playerBoard[i][columnIndex] === 1) {
          return false;
        }
      }
    }
    return true;
  }

  const placeShip = (rowIndex, columnIndex) => {
    const shipLength = shipSelected.shipLength;
  
    if (playerDirection) {
      for (let i = columnIndex; i < columnIndex + shipLength; i++) {
        playerBoard[rowIndex][i] = 1;
      }
    } else {
      for (let i = rowIndex; i < rowIndex + shipLength; i++) {
        playerBoard[i][columnIndex] = 1;
      }
    }
    const updatedShips = playerShips.filter((ship) => ship !== shipSelected);
    setPlayerShips(updatedShips);
    setShipSelected(null);
    setPlayerBoard([...playerBoard]);
  };

  return (
    <GameContext.Provider value={{
      startGame,
      playerShips,
      playerDirection,
      shipSelected,
      playerBoard,
      setPlayerShips,
      handleGameStart,
      setShipSelected,
      selectDirection,
      selectShip,
      boardClick
    }}
    >
      {children}
    </GameContext.Provider>
  )
}