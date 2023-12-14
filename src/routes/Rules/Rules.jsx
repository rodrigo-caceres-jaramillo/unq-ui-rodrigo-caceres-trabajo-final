import GoBackButton from '../../components/GoBack/GoBackButton';
import './Rules.css'

const Rules = () => {
  return (
    <div id="rules">
      <GoBackButton />
      <h1>COMO JUGAR</h1>
      <div>
        <h3>Comienzo del juego</h3>
        <li>El jugador comenzará con su tablero vacío. El contará con un inventario con 4 barcos.</li>
        <li>El jugador tendrá que colocar sus barcos en el tablero, antes de seleccionar el barco puede decidir la orientación del mismo, y al hacer click sobre el tablero decidirá la casilla inicial del barco.</li>
        <li>La casilla inicial del barco en horizontal determina el primer espacio a la izquierda y en posición vertical indica el primer espacio arriba.</li>
        <li>Una vez esté satisfecho con sus posiciones, habrá un botón “Comenzar“ para ir a la siguiente etapa.</li>
        <h3>Comienza el combate</h3>
        <li>El jugador siempre comenzará el ataque. El jugador podrá ver sus barcos desplegados y los del rival.</li>
        <li>Para atacar, el jugador puede seleccionar una casilla del tablero enemigo.</li>
        <li>Una vez que se realiza el ataque, la casilla cambiará de color para representar el resultado: Azul = Agua y Rojo = acierto.</li>
        <li>Cuando un barco haya sido hundido se refleja en su lista correspondiente.</li>
        <h3>Termina el combate</h3>
        <li>Será el ganador el primer jugador que hunda los cuatro barcos de su oponente.</li>
      </div>
    </div>
  );
};

export default Rules