import PlayAgainButton from "./playAgain/PlayAgainButton"

const WinnerMessage = ({winner}) => {
  return (
    <div className="winner">
      <h2>{winner}</h2>
      <PlayAgainButton />
    </div>
    )
}

export default WinnerMessage