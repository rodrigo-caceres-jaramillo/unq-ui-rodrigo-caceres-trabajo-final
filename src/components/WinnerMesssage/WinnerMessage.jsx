import PlayAgainButton from "./playAgain/PlayAgainButton"
import './WinnerMessage.css'

const WinnerMessage = ({winner}) => {
  return (
    <div className="winner-modal">
      <div className="content">
        <h2>GANADOR: {winner}</h2>
        <PlayAgainButton />
      </div>
    </div>
    
    )
}

export default WinnerMessage