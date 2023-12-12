import './Ship.css'

const Ship = ({ship}) => {
  const renderShipLength = () => {
    const squares = [];
    for (let i = 0; i < ship.shipLength; i++) {
      squares.push(<div key={i} className="ship-square"></div>);
    }
    return squares;
  };

  return (
    <div className="ship">
        <span className="ship-name">{ship.name}</span>
        <div className="ship-length">
          {renderShipLength()}
        </div>
    </div>
  )
}

export default Ship