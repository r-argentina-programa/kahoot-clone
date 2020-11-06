import React, { useState, useEffect } from 'react';
import Alert from 'react-bootstrap/Alert';
import { Link, useLocation } from 'react-router-dom';
import '../styles/HostLobby.css';
import socketIO from 'socket.io-client';
import Players from '../components/Players';
import Button from 'react-bootstrap/esm/Button';

const HostLobby = (props) => {
  const [players, setPlayers] = useState([]);
  const data = useLocation();
  const pin = data.state;
  const { socket, setTriviaData } = props;

  useEffect(() => {
    if (!props.socket) {
      console.log('fetching...');
      fetch(`/trivia/${pin}/${props.trivia}`).then(() => {
        const socket = socketIO(`/${pin}`);
        props.setSocket(socket);
      });
    }
  }, [pin, props]);

  useEffect(() => {
    if (socket) {
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
    <div>
      <div className="container">
        <Alert variant="dark">The pin is {pin}</Alert>
        <Link to="/host/trivia">
          <Button onClick={() => props.socket.emit('start-game')}>Start Game</Button>
        </Link>
      </div>
      <br />
      <br />
      <br />
      <br />
      <div>
        <Players players={players} />
      </div>
    </div>
  );
};

export default HostLobby;

// useEffect(() => {
//   fetch(`/trivia/${pin}/${props.trivia}`).then(() => {
//     const socket = socketIO(`/${pin}`);
//     setSocket(socket);
//   });
// });

// useEffect(() => {
//   console.log(socket);
//   socket.on('question', (triviaData) => {
//     const newTriviaData = triviaData;
//     setTriviaData(newTriviaData);
//   });
// }, [socket, triviaData]);

// const question = {
//   question: 'Which is the biggest country?',
//   options: ['Uruguay', 'BRAZIL', 'Paraguay', 'Peru'],
// };

// const [socket, setSocket] = useState(null);
// const [triviaData, setTriviaData] = useState({ options: [] });
