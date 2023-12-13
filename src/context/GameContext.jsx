import { createContext, useState } from "react"
import { SHIPS } from "./db"

export const GameContext = createContext({})

export const GameProvider = ({ children }) => {
  const [startGame, setStartGame] = useState(false)
  const generateInitialBoard = () => {
    return Array.from({ length: 10 }, () => Array(10).fill(0));
  }
  //Player
  const [playerShips, setPlayerShips] = useState([...SHIPS])
  const [playerDirection, setPlayerDirection] = useState(true)
  const [shipSelected, setShipSelected] = useState()
  const [playerBoard, setPlayerBoard] = useState(generateInitialBoard);
  //Computer
  const [computerShips, setComputerShips] = useState([...SHIPS])
  const [computerBoard, setComputerBoard] = useState(generateInitialBoard);

  const handleGameStart = () => {
    placeComputerBoar()
    setStartGame(true)
  }

  const handleRestartStart = () => {
    setStartGame(false)
    setPlayerBoard(generateInitialBoard)
    setComputerBoard(generateInitialBoard)
    setPlayerShips([...SHIPS])
    setComputerShips([...SHIPS])
    setShipSelected()
  }

  const placeComputerBoar = () => {
    const copyComputerBoard = [...computerBoard];
    const shipsToPlace = [...computerShips];

    while (shipsToPlace.length > 0) {
      const isHorizontal = Math.random() < 0.5;
      const rowIndex = Math.floor(Math.random() * 10);
      const columnIndex = Math.floor(Math.random() * 10);
      const shipToPlace = shipsToPlace[0];
      if (hasEnoughSpace(shipToPlace, rowIndex, columnIndex, isHorizontal, copyComputerBoard)) {
        placeShip(shipToPlace, rowIndex, columnIndex, isHorizontal, copyComputerBoard);
        shipsToPlace.shift();
    }
  }
  setComputerBoard(copyComputerBoard);
  setComputerShips()
}

  const selectDirection = (direction) => {
    setPlayerDirection(direction)
    setShipSelected(null)
  }

  const selectShip = (ship) => {
    setShipSelected(ship)
  }

  const placeClick = (rowIndex, columnIndex, hasShip) => {
    if(startGame){
      return
    }
    else if (shipSelected) {
      if (hasShip) {
        console.log("Ya hay un barco en esta posicion");
      } else if (hasEnoughSpace(shipSelected, rowIndex, columnIndex, playerDirection, playerBoard)) {
          const updatedPlayerBoard = placeShip(shipSelected, rowIndex, columnIndex, playerDirection, playerBoard)
          const updatedShips = playerShips.filter((ship) => ship !== shipSelected);
          setPlayerBoard(updatedPlayerBoard)
          setPlayerShips(updatedShips)
          setShipSelected(null)
        } else {
          console.log("No se puede colocar en esa posicion");
      }
    }
  }

  const placeShip = (ship, rowIndex, columnIndex, direction, board) => {
    const shipLength = ship.shipLength;
    if (direction) {
      for (let i = columnIndex; i < columnIndex + shipLength; i++) {
        board[rowIndex][i] = 1;
      }
    } else {
      for (let i = rowIndex; i < rowIndex + shipLength; i++) {
        board[i][columnIndex] = 1;
      }
    }
    return [...board]
  };

  const hasEnoughSpace = (ship, rowIndex, columnIndex, direction, board) => {
    const shipLength = ship.shipLength
    if (direction) {
      if (columnIndex + shipLength > 10) {
        return false;
      }
      for (let i = columnIndex; i < columnIndex + shipLength; i++) {
        if (board[rowIndex][i] === 1) {
          return false;
        }
      }
    } else {
      if (rowIndex + shipLength > 10) {
        return false;
      }
      for (let i = rowIndex; i < rowIndex + shipLength; i++) {
        if (board[i][columnIndex] === 1) {
          return false;
        }
      }
    }
    return true;
  }

  const attackClick = ( rowIndex, columnIndex, hasShip) => {
    if (hasShip) {
      handleAttack(rowIndex, columnIndex, true, true)
    } else {
      handleAttack(rowIndex, columnIndex, false, true)
    }
    attackPlayer()
  }
  
  const handleAttack = (rowIndex, columnIndex, hit, computer) => {
    var updatedBoard = []
    if (computer) {
      updatedBoard = [...computerBoard];
    } else {
      updatedBoard = [...playerBoard];
    }
    updatedBoard[rowIndex][columnIndex] = hit ? 2 : 3;
    if (computer) {
      setComputerBoard(updatedBoard)
    } else {
      setPlayerBoard(updatedBoard);
    }
  }

  const attackPlayer = () => {
    let randomRow, randomColumn;
    do {
      randomRow = Math.floor(Math.random() * 10);
      randomColumn = Math.floor(Math.random() * 10);
    } while (playerBoard[randomRow][randomColumn] === 2 || playerBoard[randomRow][randomColumn] === 3);
  
    const hasShip = playerBoard[randomRow][randomColumn] === 1;
    handleAttack(randomRow, randomColumn, hasShip, false);
  }

  return (
    <GameContext.Provider value={{
      startGame,
      playerShips,
      playerDirection,
      shipSelected,
      playerBoard,
      computerBoard,
      setPlayerShips,
      handleGameStart,
      setShipSelected,
      selectDirection,
      selectShip,
      placeClick,
      attackClick,
      handleRestartStart
    }}
    >
      {children}
    </GameContext.Provider>
  )
}