import React from 'react';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import { useLocation } from 'react-router-dom';
import '../styles/HostLobby.css';
const HostLobby = (props) => {
  console.log(props.trivia);
  const data = useLocation();
  const pin = data.state;
  console.log(pin);
  return (
    <div>
      <div className="container">
        <Alert variant="dark">The pin is {pin}</Alert>
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
