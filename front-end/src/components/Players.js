import React, { useState, useEffect } from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import io from 'socket.io-client';

const socket = io.connect('http://localhost:5000');
socket.on('players', () => console.log('CONNECTED'));
const Players = () => {
  const [state, setState] = useState([]);

  useEffect(() => {
    socket.on('players', (data) => {
      console.log(data);
      const newState = data;
      setState(newState);
      return () => {
        setState([]);
        socket.disconnect();
      };
    });
  }, [state]);

  return (
    <div>
      <ListGroup>
        {state.map((player) => (
          <ListGroup.Item variant="dark">{player}</ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
};

export default Players;
