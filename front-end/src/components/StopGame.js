import React from 'react';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
const StopGame = () => {
  return (
    <Link to="/">
      <Button variant="danger">Go back to the Lobby</Button>
    </Link>
  );
};

export default StopGame;
