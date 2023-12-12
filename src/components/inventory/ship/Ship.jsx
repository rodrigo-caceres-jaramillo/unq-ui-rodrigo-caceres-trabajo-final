import { useContext } from 'react';
import './Ship.css'
import { GameContext } from '../../../context/GameContext';

const Ship = ({ship}) => {
  const { selectShip, shipSelected } = useContext(GameContext)

  const renderShipLength = () => {
    const squares = [];
    for (let i = 0; i < ship.shipLength; i++) {
      squares.push(<div key={i} className="ship-square"></div>);
    }
    return squares;
  };

  return (
    <div className={`ship ${ shipSelected && shipSelected.name === ship.name ? 'selected-ship' : ''}`} onClick={() => selectShip(ship)}>
        <span className="ship-name">{ship.name}</span>
        <div className="ship-length">
          {renderShipLength()}
        </div>
    </div>
  )
}

export default Ship