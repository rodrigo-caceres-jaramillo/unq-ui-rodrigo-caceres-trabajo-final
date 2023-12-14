import { useContext } from 'react';
import './Ship.css'
import { GameContext } from '../../../context/GameContext';

const Ship = ({ship, isClickeable}) => {
  const { selectShip, shipSelected } = useContext(GameContext)

  const renderShipLength = () => {
    const squares = [];
    for (let i = 0; i < ship.shipLength; i++) {
      squares.push(<div key={i} className="ship-square"></div>);
    }
    return squares;
  };

  const hadlerSelect= () => {
    if (isClickeable){
      selectShip(ship)
    } else {
      return
    }
    
  }

  return (
    <div className={`ship 
      ${ shipSelected && shipSelected.name === ship.name ? 'selected-ship' : ''}
      ${ isClickeable  ? 'clickeable' : ''}`} onClick={() => hadlerSelect()}>
        <span className="ship-name">{ship.name}</span>
        <div className="ship-length">
          {renderShipLength()}
        </div>
    </div>
  )
}

export default Ship