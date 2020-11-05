import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import { useLocation } from 'react-router-dom';
import '../styles/HostLobby.css';
import Trivia from './Trivia';
import socketIO from 'socket.io-client';
const HostLobby = (props) => {
  const [socket, setSocket] = useState(null);
  const [triviaData, setTriviaData] = useState({ options: [] });
  console.log(props.trivia);
  const data = useLocation();
  const pin = data.state;
  console.log(pin);
  useEffect(() => {
    fetch(`/trivia/${pin}/${props.trivia}`).then(() => {
      const socket = socketIO(`/${pin}`);
      setSocket(socketIO(`/${pin}`));
      socket.on('/players', (data) => {
        console.log('esto viene del socket', data);
      });
      socket.on('/admin', (data) => {
        console.log('el admin es', data);
      });
      socket.on('/playerlist', (data) => {
        console.log('los players son', data);
      });
    });
    socket.on('question', (triviaData) => {
      const newTriviaData = triviaData;
      setTriviaData(newTriviaData);
    });
  }, [triviaData]);

  return (
    <div>
      <div className="container">
        <Alert variant="dark">The pin is {pin}</Alert>
        <Button variant="primary">
          <Trivia socket={socket} triviaData={triviaData} />
        </Button>
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
