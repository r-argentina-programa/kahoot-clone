import React from 'react';
import Button from 'react-bootstrap/Button';
import Popover from 'react-bootstrap/Popover';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
const Lobby = () => {
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
        <Button>Start Game</Button>
      </OverlayTrigger>
    </div>
  );
};

export default Lobby;
