import { Link } from "react-router-dom"
import './Index.css'

const Index = () => {
  return (
    <div id="index">
      <h1>BATALLA NAVAL</h1>
      <Link to="/game" ><button className="to-game">Comenzar Juego</button></Link>
      <Link to="/rules" ><button className="to-rules">Como Jugar</button></Link>
    </div>
  )
}

export default Index