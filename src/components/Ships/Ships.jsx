import Ship from "../inventory/ship/Ship"

const Ships = ({ships, text}) => {
  return (
    <div id="inventory">
      <h2>{text}</h2>
      {ships.map((ship, index) => (
        <Ship ship={ship} key={index}/>
      ))}
    </div>
    )
}

export default Ships