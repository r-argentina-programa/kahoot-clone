import StartGame from './StartGame';
import Players from './Players';
import StopGame from './StopGame';

// Este componente Lobby recibe la lista de jugadores y se la pasa al componente Players
const Lobby = (props) => {
  console.log('Lobby component:', props.players);

  return (
    <div>
      <StartGame socket={props.socket} />
      <br />
      <Players players={props.players} />
      <br />
      <br />
      <br />
      <br />
      <StopGame />
    </div>
  );
};

export default Lobby;
