import React from 'react';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

const StartGame = (props) => {
  return (
    <Link to="/Trivia">
      <Button className="startGame" onClick={() => props.socket.emit('new game')}>
        Start Game
      </Button>
    </Link>
  );
};

export default StartGame;
