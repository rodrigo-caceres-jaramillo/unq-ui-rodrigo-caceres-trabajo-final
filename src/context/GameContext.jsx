import { createContext, useEffect, useState } from "react"
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
  const [playerPlacedShips, setPlayerPlacedShips] = useState()
  //Computer
  const [computerShips, setComputerShips] = useState([...SHIPS])
  const [computerBoard, setComputerBoard] = useState(generateInitialBoard);
  const [computerPlacedShips, setComputerPlacedShips] = useState()

  useEffect(() => {
    if (startGame) {
      if(computerPlacedShips.length === 0){
        console.log("Gana el jugador")
      } else if(computerPlacedShips.length === 0){
      console.log("Gana la computadora")
      }
    }
  }, [computerPlacedShips, playerPlacedShips, startGame])

    

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
    const copyComputerBoard = [...computerBoard]
    const shipsToPlace = [...computerShips]

    while (shipsToPlace.length > 0) {
      const isHorizontal = Math.random() < 0.5
      const rowIndex = Math.floor(Math.random() * 10)
      const columnIndex = Math.floor(Math.random() * 10)
      const shipToPlace = shipsToPlace[0]
      if (hasEnoughSpace(shipToPlace, rowIndex, columnIndex, isHorizontal, copyComputerBoard)) {
        placeShip(shipToPlace, rowIndex, columnIndex, isHorizontal, copyComputerBoard)
        shipsToPlace.shift();
        setComputerPlacedShips((prev) => (prev ? [...prev, shipToPlace] : [shipToPlace]))
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
    if (startGame) {
      return;
    } else if (shipSelected) {
      if (hasShip) {
        console.log("Ya hay un barco en esta posicion");
      } else if (hasEnoughSpace(shipSelected, rowIndex, columnIndex, playerDirection, playerBoard)) {
        const updatedPlayerBoard = placeShip(shipSelected, rowIndex, columnIndex, playerDirection, playerBoard);
        const updatedShips = playerShips.filter((ship) => ship !== shipSelected);
        setPlayerBoard(updatedPlayerBoard);
        setPlayerShips(updatedShips);
        setPlayerPlacedShips((prev) => (prev ? [...prev, shipSelected] : [shipSelected])); // Agregar el barco a la lista de barcos colocados por el jugador
        setShipSelected(null);
      } else {
        console.log("No se puede colocar en esa posicion");
      }
    }
  };

  const placeShip = (ship, rowIndex, columnIndex, direction, board) => {
    const shipLength = ship.shipLength;
    const shipCode = ship.code
    if (direction) {
      for (let i = columnIndex; i < columnIndex + shipLength; i++) {
        board[rowIndex][i] = shipCode;
      }
    } else {
      for (let i = rowIndex; i < rowIndex + shipLength; i++) {
        board[i][columnIndex] = shipCode;
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
        if (board[rowIndex][i] > 9) {
          return false;
        }
      }
    } else {
      if (rowIndex + shipLength > 9) {
        return false;
      }
      for (let i = rowIndex; i < rowIndex + shipLength; i++) {
        if (board[i][columnIndex] > 9) {
          return false;
        }
      }
    }
    return true;
  }

  const attackClick = ( rowIndex, columnIndex, code) => {
      handleAttack(code, rowIndex, columnIndex, true)
      attackPlayer()
  }

  const updatePlacedShips= (code, board, computer) => {
    if (isShipSunked(code, board)){
      console.log(`Barco con código ${code} completamente hundido.`)
      if(computer) {
        const updatedShipsPlaced = computerPlacedShips.filter(ship => ship.code !== code);
        setComputerPlacedShips(updatedShipsPlaced);
      } else {
        const updatedShipsPlaced = playerPlacedShips.filter(ship => ship.code !== code);
        setPlayerPlacedShips(updatedShipsPlaced);
      }
    }
  }

  const isShipSunked = (code, board) => {
    let remainingCells = 0
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[i].length; j++) {
        if (board[i][j] === code) {
          remainingCells++
      }
    }
    }
    return remainingCells === 0
  }

  const handleAttack = (code, rowIndex, columnIndex, computer) => {
    const updatedBoard = computer ? [...computerBoard] : [...playerBoard]
    updatedBoard[rowIndex][columnIndex] = code > 9 ? 2 : 3

    if (computer) {
      setComputerBoard(updatedBoard)
      updatePlacedShips(code, computerBoard, true)
    } else {
      setPlayerBoard(updatedBoard)
      updatePlacedShips(code, playerBoard, false)
    }
  }

  const attackPlayer = () => {
    let randomRow, randomColumn
    do {
      randomRow = Math.floor(Math.random() * 10)
      randomColumn = Math.floor(Math.random() * 10)
    } while (playerBoard[randomRow][randomColumn] === 2 || playerBoard[randomRow][randomColumn] === 3)
    const code = playerBoard[randomRow][randomColumn]
    handleAttack(code, randomRow, randomColumn, false)
  }

  return (
    <GameContext.Provider value={{
      startGame,
      playerShips,
      playerDirection,
      shipSelected,
      playerBoard,
      computerBoard,
      playerPlacedShips,
      computerPlacedShips,
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