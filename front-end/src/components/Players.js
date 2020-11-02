import ListGroup from 'react-bootstrap/ListGroup';
import React from 'react';

const Players = (props) => {
  return (
    <div>
      <ListGroup>
        {props.players.map((player, index) => (
          <ListGroup.Item key={`player-${index + 1}`} variant={'dark'}>
            {player}
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
};

export default Players;
