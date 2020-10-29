import StartGame from "./StartGame";
import Players from "./Players";
import StopGame from "./StopGame";

// Este componente Lobby recibe la lista de jugadores y se la pasa al componente Players
const Lobby = ({ players }) => {
  console.log("Lobby component:", players);

  return (
    <div>
      <StartGame />
      <br />
      <Players players={players} />
      <br />
      <br />
      <br />
      <br />
      <StopGame />
    </div>
  );
};

export default Lobby;
