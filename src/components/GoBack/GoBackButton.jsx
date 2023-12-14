import { Link } from "react-router-dom"
import './GoBackButton.css'

const GoBackButton = () => { 
  return <Link to="/" ><button className="go-back">INICIO</button></Link>
}

export default GoBackButton