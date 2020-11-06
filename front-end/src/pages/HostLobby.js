import React, { useState, useEffect } from 'react';
import Alert from 'react-bootstrap/Alert';
import { Link, useLocation } from 'react-router-dom';
import '../styles/HostLobby.css';
import Trivia from './Trivia';
import socketIO from 'socket.io-client';
import Players from '../components/Players';
import Button from 'react-bootstrap/esm/Button';
const HostLobby = (props) => {
  const [players, setPlayers] = useState([]);
  // const [socket, setSocket] = useState(null);
  // const [triviaData, setTriviaData] = useState({ options: [] });
  const data = useLocation();
  const pin = data.state;

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
  // este es el mock del objeto que vendria del back que me pasaste

  useEffect(() => {
    fetch(`/trivia/${pin}/${props.trivia}`).then(() => {
      const socket = socketIO(`/${pin}`);
      props.setSocket(socket);
    });
  }, [pin, props.trivia]);

  useEffect(() => {
    if (props.socket) {
      props.socket.emit('next-question');
      props.socket.on('question', (triviaData) => {
        const newTriviaData = triviaData;
        props.setTriviaData(newTriviaData);
        console.log(triviaData);
      });
      props.socket.on('playerlist', (players) => {
        const newPlayers = players;
        setPlayers(newPlayers);
        console.log(players);
      });
    }
  }, [props.socket]);

  console.log(props.triviaData);

  return (
    <div>
      <div className="container">
        <Alert variant="dark">The pin is {pin}</Alert>
        <Link to="/host/trivia">
          <Button>Start Game</Button>
        </Link>
      </div>
      <br />
      <br />
      <br />
      <br />
      <div>
        <Players players={players} />
        {/* <Alert variant="dark">Players</Alert>
        <Alert variant="dark">Players</Alert>
        <Alert variant="dark">Players</Alert>
        <Alert variant="dark">Players</Alert> */}
      </div>
    </div>
  );
};

export default HostLobby;
