import React from 'react';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

const StopGame = (props) => {
  const socket = props.socket;

  function emitDisconnect(socket) {
    return socket.emit('disconnect');
  }

  return (
    <Link to="/">
      <Button onClick={emitDisconnect(socket)} variant="danger">
        Go back to the Lobby
      </Button>
    </Link>
  );
};

export default StopGame;
