import React from 'react';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import '../styles/HostLobby.css';
const HostLobby = () => {
  return (
    <div>
      <div className="container">
        <Alert variant="dark">Here goes the PIN</Alert>
        <Button variant="primary">Start Game</Button>
      </div>
      <br />
      <br />
      <br />
      <br />
      <div>
        <Alert variant="dark">Players</Alert>
        <Alert variant="dark">Players</Alert>
        <Alert variant="dark">Players</Alert>
        <Alert variant="dark">Players</Alert>
      </div>
    </div>
  );
};

export default HostLobby;
