import React from 'react';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

const StopGame = (props) => {
  return (
    <Link to="/">
      <Button className="stopGame" variant="danger">
        Go back to the Lobby
      </Button>
    </Link>
  );
};

export default StopGame;
