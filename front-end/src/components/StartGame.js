import React from 'react';
import Button from 'react-bootstrap/Button';
import Popover from 'react-bootstrap/Popover';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import { Link } from 'react-router-dom';

const StartGame = (props) => {
  const popover = (
    <Popover id="popover-basic">
      <Popover.Title as="h3">Game Status</Popover.Title>
      <Popover.Content>
        Game <strong>STARTED</strong>
      </Popover.Content>
    </Popover>
  );
  return (
    <div>
      <OverlayTrigger trigger="click" placement="right" overlay={popover}>
        <Link to="/Trivia">
          <Button onClick={() => props.socket.emit('new game')}>Start Game</Button>
        </Link>
      </OverlayTrigger>
    </div>
  );
};

export default StartGame;
