import ListGroup from 'react-bootstrap/ListGroup';
import React from 'react';

// Este componente recibe la lista de jugadores (un array) y los renderea adecuadamente.
const Players = (props) => {
  console.log('Players component:', props.players);

  return (
    <div>
      <ListGroup>
        {props.players.map((player, index) => (
          <ListGroup.Item key={`player-${index + 1}`} variant="dark">
            {player}
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
};

export default Players;
