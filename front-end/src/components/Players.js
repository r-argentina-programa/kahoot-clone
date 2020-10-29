import ListGroup from "react-bootstrap/ListGroup";

// Este componente recibe la lista de jugadores (un array) y los renderea adecuadamente.
const Players = ({ players }) => {
  console.log("Players component:", players);

  return (
    <div>
      <ListGroup>
        {players.map((player, index) => (
          <ListGroup.Item key={`player-${index + 1}`} variant="dark">
            {player}
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
};

export default Players;
