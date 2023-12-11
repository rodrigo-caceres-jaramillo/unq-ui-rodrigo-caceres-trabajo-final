import { Link } from "react-router-dom"

export const Index = () => {
  return (
    <div>
      <button><Link to="/game" >Comenzar Juego</Link></button>
      <button><Link to="/rules" >Como Jugar</Link></button>
    </div>
  )
}