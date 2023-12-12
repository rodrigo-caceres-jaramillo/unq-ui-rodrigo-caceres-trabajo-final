import { useContext } from "react"
import Ship from "./ship/Ship"
import { GameContext } from "../../context/gameContext"
import './Inventory.css'

const Inventory = ({ships}) => {
  const { playerShips } = useContext(GameContext)
  
  return (
    <div id="inventory">
      <h2>Inventario</h2>
     <div className="buttons">
      <button>Horizontal</button>
      <button>Vertical</button>
     </div>
      {playerShips.map((ship) => (
        <Ship ship={ship} />
      ))}
    </div>
    )
  }

export default Inventory