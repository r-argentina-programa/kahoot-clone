import React from 'react';
import Button from 'react-bootstrap/Button';
import Popover from 'react-bootstrap/Popover';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import { Link } from 'react-router-dom';

const StartGame = (props) => {
  return (
    <div>
      <Link to="/Trivia">
        <Button onClick={() => props.socket.emit('new game')}>Start Game</Button>
      </Link>
    </div>
  );
};

export default StartGame;
