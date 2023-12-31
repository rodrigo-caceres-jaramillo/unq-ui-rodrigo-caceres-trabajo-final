import { createContext, useEffect, useState } from "react"
import { SHIPS } from "./db"
import { toast } from "react-toastify"
import WinnerMessage from "../components/WinnerMesssage/WinnerMessage"

export const GameContext = createContext({})

export const GameProvider = ({ children }) => {
  //Generañ
  const [startGame, setStartGame] = useState(false)
  const [gameOver, setGameOver] = useState(false)
  const [winner, setWinner] = useState()
  const generateInitialBoard = () => {
    return Array.from({ length: 10 }, () => Array(10).fill(0));
  }
  //Player
  const [playerShips, setPlayerShips] = useState([...SHIPS])
  const [playerDirection, setPlayerDirection] = useState(true)
  const [shipSelected, setShipSelected] = useState()
  const [playerBoard, setPlayerBoard] = useState(generateInitialBoard);
  const [playerPlacedShips, setPlayerPlacedShips] = useState()
  const [playerWins, setPlayerWins] = useState(0)
  //Computer
  const [computerShips, setComputerShips] = useState([...SHIPS])
  const [computerBoard, setComputerBoard] = useState(generateInitialBoard);
  const [computerPlacedShips, setComputerPlacedShips] = useState()
  const [computerWins, setComputerWins] = useState(0)

  useEffect(() => {
    if (startGame) {
      if(computerPlacedShips.length === 0){
        setWinner("Jugador")
        setPlayerWins((prev) => prev + 1)
        setGameOver(true)
      } else if(playerPlacedShips.length === 0){
        setWinner("Computadora")
        setComputerWins((prev) => prev + 1)
        setGameOver(true)
      }
    }
  }, [computerPlacedShips, playerPlacedShips, startGame])

  const handleGameStart = () => {
    placeComputerBoar()
    setStartGame(true)
  }

  const handleRestartStart = () => {
    setStartGame(false)
    setGameOver(false)
    setWinner()
    setPlayerBoard(generateInitialBoard)
    setComputerBoard(generateInitialBoard)
    setPlayerShips([...SHIPS])
    setComputerShips([...SHIPS])
    setPlayerPlacedShips()
    setComputerPlacedShips()
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
        toast.error('Ya hay un barco en esa posicion', {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          });
      } else if (hasEnoughSpace(shipSelected, rowIndex, columnIndex, playerDirection, playerBoard)) {
        const updatedPlayerBoard = placeShip(shipSelected, rowIndex, columnIndex, playerDirection, playerBoard);
        const updatedShips = playerShips.filter((ship) => ship !== shipSelected);
        setPlayerBoard(updatedPlayerBoard);
        setPlayerShips(updatedShips);
        setPlayerPlacedShips((prev) => (prev ? [...prev, shipSelected] : [shipSelected])); // Agregar el barco a la lista de barcos colocados por el jugador
        setShipSelected(null);
      } else {
        toast.error('Posicion Invalida', {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          });
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
        return false
      }
      for (let i = columnIndex; i < columnIndex + shipLength; i++) {
        if (board[rowIndex][i] > 9) {
          return false
        }
      }
    } else {
      if (rowIndex + shipLength > 9) {
        return false
      }
      for (let i = rowIndex; i < rowIndex + shipLength; i++) {
        if (board[i][columnIndex] > 9) {
          return false
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
      if(computer) {
        const updatedShipsPlaced = computerPlacedShips.filter(ship => ship.code !== code);
        setComputerPlacedShips(updatedShipsPlaced);
        toast.success(`Barco Enemigo Hundido`, {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          });
      } else {
        const updatedShipsPlaced = playerPlacedShips.filter(ship => ship.code !== code);
        setPlayerPlacedShips(updatedShipsPlaced);
        toast.warn(`Barco Aliado Hundido`, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          });
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
      playerWins,
      computerWins,
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
      {gameOver? <WinnerMessage winner={winner} /> : null}
      {children}
    </GameContext.Provider>
  )
}