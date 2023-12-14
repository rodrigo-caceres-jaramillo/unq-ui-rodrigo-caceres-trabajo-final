import { useContext } from "react"
import Ship from "./ship/Ship"
import './Inventory.css'
import { GameContext } from "../../context/GameContext"

const Inventory = () => {
  const { playerShips, selectDirection, playerDirection } = useContext(GameContext)
  
  return (
    <div id="inventory">
      <h2>Inventario</h2>
     <div className="buttons">
      <button className={playerDirection ? "axis selected" : "axis"} onClick={() => selectDirection(true)}>Horizontal</button>
      <button className={playerDirection ? "axis" : "axis selected"} onClick={() => selectDirection(false)}>Vertical</button>
     </div>
      {playerShips.map((ship, index) => (
        <Ship ship={ship} key={index} isClickeable={true}/>
      ))}
    </div>
    )
}

export default Inventory