import React, { useState, useEffect } from 'react';
import Alert from 'react-bootstrap/Alert';
import { Link, useLocation } from 'react-router-dom';
import '../styles/HostLobby.css';
import socketIO from 'socket.io-client';
import Players from '../components/Players';
import Button from 'react-bootstrap/Button';

const HostLobby = (props) => {
  const [players, setPlayers] = useState([]);
  const data = useLocation();
  const pin = data.state;
  const { socket, setTriviaData, BASE_URL } = props;

  console.log('el pin es', pin);

  useEffect(() => {
    console.log('hostsocket', props.socket);
    if (!props.socket) {
      fetch(`/trivia/${pin}/${props.trivia}`).then(() => {
        let newSocketHost;
        if (BASE_URL === 'http://localhost:5000') {
          newSocketHost = socketIO(`/${pin}`);
        } else {
          newSocketHost = socketIO(`${BASE_URL}/${pin}`);
        }
        props.setSocket(newSocketHost);
      });
    }
  }, [pin, props, BASE_URL]);

  useEffect(() => {
    if (socket) {
      console.log('hey');
      socket.on('question', (triviaData) => {
        const newTriviaData = triviaData;
        setTriviaData(newTriviaData);
      });
      socket.on('playerlist', (players) => {
        const newPlayers = players;
        setPlayers(newPlayers);
      });
    }
  }, [socket, setTriviaData]);

  return (
    <React.Fragment>
      <div className="container h-center">
        <Alert className="pin-host-lobby" variant="dark">
          The PIN is {pin}
        </Alert>
        <Link to="/host/trivia">
          <Button onClick={() => props.socket.emit('start-game')} className="start-game-btn">
            Start Game
          </Button>
        </Link>
      </div>
      <div>
        <Players players={players} />
      </div>
    </React.Fragment>
  );
};

export default HostLobby;
